import { galaxyProfiles, makeGalaxyStudyQuestions, type GalaxyProfile } from './galaxy-study-data';
import { spreadsheetDsoFacts } from './dso-spreadsheet-data';
import { dsoArticles } from './study-article-data';
import type { PracticeQuestion } from './question-bank';

export type DsoQuizQuestion = PracticeQuestion & {
  objectKey: string;
  sourceLabel: 'DSOs 2027 spreadsheet' | 'Mentor slideshow' | 'Reference document' | 'Mentor DSO profile';
  frqPrompt?: string;
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const objectNames = galaxyProfiles.flatMap((profile) => [profile.name, profile.imageName, ...profile.aliases]).filter((value) => value.length > 2).sort((a, b) => b.length - a.length);

function withoutObjectNames(value: string) {
  return objectNames
    .reduce((text, name) => text.replace(new RegExp(escapeRegex(name), 'gi'), 'this object'), value)
    .replace(/this object\s*=\s*this object/gi, 'a galaxy with a distinct catalog identity')
    .replace(/(?:this object\s*){2,}/gi, 'this object ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shuffled<T>(items: T[], seed: string) {
  const score = (value: T, index: number) => Array.from(`${seed}:${index}:${String(value)}`).reduce((sum, character) => sum + character.charCodeAt(0), 0) % 997;
  return items.map((value, index) => ({ value, score: score(value, index) })).sort((a, b) => a.score - b.score).map(({ value }) => value);
}

function choices(answer: string, distractors: string[], seed: string) {
  const cleanAnswer = withoutObjectNames(answer);
  const candidates = Array.from(new Set(distractors.map((value) => withoutObjectNames(value)).filter((value) => value.length >= 2 && value !== cleanAnswer)));
  const selectedDistractors = shuffled(candidates, `${seed}:distractors`).slice(0, 3);
  return shuffled([cleanAnswer, ...selectedDistractors], `${seed}:choices`);
}

function sourceQuestion(question: PracticeQuestion, profile: GalaxyProfile): DsoQuizQuestion {
  const field = question.id.slice(profile.key.length + 1);
  const frqPrompts: Record<string, string> = {
    morphology: `Give the morphological classification of ${profile.name}.`,
    distance: `Approximately how far from Earth is ${profile.name}?`,
    association: `What group, cluster, host, or companion relationship is associated with ${profile.name}?`,
    visualSignature: `Give one visual feature that can distinguish ${profile.name} in an image.`,
    definingFact: `State one scientifically important fact about ${profile.name}.`,
    discovery: `Who discovered ${profile.name}, or what major historical observation is associated with it?`,
  };
  return { ...question, objectKey: profile.key, sourceLabel: 'Mentor DSO profile', section: 'Mentor DSO profile', subsection: profile.name, frqPrompt: frqPrompts[field] };
}

function spreadsheetPrompt(label: string, profile: GalaxyProfile) {
  const prompts: Record<string, [string, string]> = {
    Description: [`Which description most accurately characterizes ${profile.name}?`, `Briefly characterize ${profile.name}.`],
    '(Galaxy) Type': [`What type or morphological classification best describes ${profile.name}?`, `Give the type or morphological classification of ${profile.name}.`],
    'Size (longest diameter)': [`What is the approximate longest diameter of ${profile.name}?`, `Give the approximate longest diameter of ${profile.name}.`],
    'Mass (M☉)': [`What is the approximate mass listed for ${profile.name}?`, `Give the approximate mass of ${profile.name}.`],
    Redshift: [`What redshift is listed for ${profile.name}?`, `Give the approximate redshift of ${profile.name}.`],
    Distance: [`What is the approximate distance to ${profile.name}?`, `Approximately how far away is ${profile.name}?`],
    'Apparent Magnitude': [`What is the approximate apparent magnitude of ${profile.name}?`, `Give the approximate apparent magnitude of ${profile.name}.`],
    'Member of': [`Which larger group or system contains ${profile.name}?`, `What larger group or system contains ${profile.name}?`],
    'Spiral Arms': [`Which statement correctly describes the spiral-arm structure of ${profile.name}?`, `Describe the spiral-arm structure of ${profile.name}.`],
    'Globular clusters': [`Which statement correctly describes the globular-cluster population of ${profile.name}?`, `What is notable about the globular-cluster population of ${profile.name}?`],
    'Star Formation Rate (M☉/yr)': [`What star-formation rate is listed for ${profile.name}?`, `Give the approximate star-formation rate of ${profile.name}.`],
  };
  return prompts[label] ?? [`Which value is correct for ${profile.name}?`, `Give the ${label.toLowerCase()} of ${profile.name}.`];
}

type FactKind = 'size' | 'distance' | 'redshift' | 'mass' | 'companions' | 'environment' | 'morphology' | 'interaction' | 'starburst-driver' | 'star-clusters' | 'star-formation' | 'nucleus' | 'wavelength' | 'history' | 'visual' | 'other';

function factKind(fact: string, context = ''): FactKind {
  const text = `${context} ${fact}`.toLowerCase();
  if (/diameter|physical size|longest diameter|kiloparsec|\bkpc\b/.test(text)) return 'size';
  if (/distance|light-years|light years|megaparsec|\bmpc\b/.test(text)) return 'distance';
  if (/redshift|\bz\s*=/.test(text)) return 'redshift';
  if (/\bmass\b|solar masses|m☉/.test(text)) return 'mass';
  if (/satellite|companion|two galaxies|galaxy pair|components? (?:are|named)|consists of/.test(text)) return 'companions';
  if (/local group|virgo cluster|member of|environment|galactic bulge|milky way bulge/.test(text)) return 'environment';
  if (/gas compression|compressed gas|gas inflow|shock.*gas|drives? the starburst|triggers? the starburst/.test(text)) return 'starburst-driver';
  if (/super star cluster|young massive cluster|globular cluster/.test(text)) return 'star-clusters';
  if (/collision|collid|interact|merg|tidal|unequal pair|ring wave|density wave|head-on/.test(text)) return 'interaction';
  if (/morpholog|classif|spiral|elliptical|irregular|lenticular|barred|peculiar/.test(text)) return 'morphology';
  if (/star.?formation|starburst|stellar population|metallicity/.test(text)) return 'star-formation';
  if (/black hole|active nucleus|\bagn\b|central engine|nuclear source/.test(text)) return 'nucleus';
  if (/x-ray|gamma|radio|infrared|ultraviolet|near-ir|mid-ir|far-ir|multiwavelength|wavelength/.test(text)) return 'wavelength';
  if (/discover|observed|history|century|\b(18|19|20)\d{2}\b/.test(text)) return 'history';
  if (/recogn|appearance|dust lane|inclined|edge-on|face-on|arms|spokes|tails|knots|shape|bright bulge/.test(text)) return 'visual';
  return 'other';
}

function directFactPrompt(profile: GalaxyProfile, kind: FactKind) {
  const prompts: Record<Exclude<FactKind, 'other'>, string> = {
    size: `What is the approximate physical size or diameter of ${profile.name}?`,
    distance: `Approximately how far away is ${profile.name}?`,
    redshift: `What is the approximate redshift of ${profile.name}?`,
    mass: `What is the approximate mass of ${profile.name}?`,
    companions: `Which galaxies or companions make up the ${profile.name} system?`,
    environment: `What larger group, cluster, or galactic environment contains ${profile.name}?`,
    morphology: `What is the morphology or galaxy type of ${profile.name}?`,
    interaction: `What interaction or collision process best explains the structure of ${profile.name}?`,
    'starburst-driver': `What physical mechanism drives the starburst in ${profile.name}?`,
    'star-clusters': `What best describes the compact star-cluster population of ${profile.name}?`,
    'star-formation': `What best describes the star formation or stellar population in ${profile.name}?`,
    nucleus: `What is known about the nucleus or central compact object of ${profile.name}?`,
    wavelength: `Which wavelength-dependent observation is associated with ${profile.name}?`,
    history: `What discovery or historical observation is associated with ${profile.name}?`,
    visual: `Which visual feature is most useful for recognizing ${profile.name}?`,
  };
  return kind === 'other' ? null : prompts[kind];
}

export function makeComprehensiveDsoQuiz(profile: GalaxyProfile): DsoQuizQuestion[] {
  const otherProfiles = galaxyProfiles.filter((item) => item.key !== profile.key);
  const article = dsoArticles.find((item) => item.key === profile.key);
  const sourceFactPool = dsoArticles.flatMap((item) => [
    ...item.mentorPriority.map((point) => ({ objectKey: item.key, point, context: 'Mentor emphasis' })),
    ...item.sections.flatMap((section) => section.keyPoints.map((point) => ({ objectKey: item.key, point, context: section.title }))),
  ]).filter((item) => !/\bconstellations?\b/i.test(item.point));
  const matchedDistractors = (kind: FactKind) => sourceFactPool.filter((item) => item.objectKey !== profile.key && factKind(item.point, item.context) === kind).map((item) => item.point);
  const questions: DsoQuizQuestion[] = makeGalaxyStudyQuestions(profile).map((question) => sourceQuestion({ ...question, topic: profile.name, difficulty: 'Core', source: 'document' }, profile));

  const preferredSpreadsheetLabels = ['Description', '(Galaxy) Type', 'Size (longest diameter)', 'Mass (M☉)', 'Redshift', 'Distance', 'Apparent Magnitude', 'Member of', 'Spiral Arms', 'Globular clusters', 'Star Formation Rate (M☉/yr)'];
  const spreadsheetFacts = (spreadsheetDsoFacts[profile.key] ?? []).filter((fact) => preferredSpreadsheetLabels.includes(fact.label) && fact.value.length <= 190);
  spreadsheetFacts.forEach((fact, index) => {
    const distractors = otherProfiles.flatMap((other) => (spreadsheetDsoFacts[other.key] ?? []).filter((candidate) => candidate.label === fact.label && candidate.value.length <= 190).map((candidate) => candidate.value));
    const answer = withoutObjectNames(fact.value), options = choices(answer, distractors, `${profile.key}:sheet:${index}`);
    if (options.length < 4) return;
    const [prompt, frqPrompt] = spreadsheetPrompt(fact.label, profile);
    questions.push({ id: `${profile.key}-sheet-${index}`, objectKey: profile.key, sourceLabel: 'DSOs 2027 spreadsheet', topic: profile.name, difficulty: 'Invitational', source: 'document', section: `DSOs 2027 spreadsheet · ${fact.sheet}`, subsection: fact.label, prompt, frqPrompt, choices: options, answer, explanation: `${fact.subject} — ${fact.label}: ${fact.value}` });
  });

  article?.mentorPriority.forEach((point, index) => {
    if (/\bconstellations?\b/i.test(point)) return;
    const kind = factKind(point, 'Mentor emphasis'), prompt = directFactPrompt(profile, kind);
    if (!prompt) return;
    const distractors = matchedDistractors(kind);
    const answer = withoutObjectNames(point), options = choices(answer, distractors, `${profile.key}:slide:${index}`);
    if (options.length < 4) return;
    questions.push({ id: `${profile.key}-slide-${index}`, objectKey: profile.key, sourceLabel: 'Mentor slideshow', topic: profile.name, difficulty: 'Invitational', source: 'document', section: article.deck, subsection: 'Mentor emphasis', prompt, choices: options, answer, explanation: point });
  });

  article?.sections.forEach((section, sectionIndex) => section.keyPoints.slice(0, 3).forEach((point, pointIndex) => {
    if (/\bconstellations?\b/i.test(point)) return;
    const kind = factKind(point, section.title), prompt = directFactPrompt(profile, kind);
    if (!prompt) return;
    const distractors = matchedDistractors(kind);
    const answer = withoutObjectNames(point), options = choices(answer, distractors, `${profile.key}:doc:${sectionIndex}:${pointIndex}`);
    if (options.length < 4) return;
    questions.push({ id: `${profile.key}-document-${sectionIndex}-${pointIndex}`, objectKey: profile.key, sourceLabel: 'Reference document', topic: profile.name, difficulty: pointIndex === 0 ? 'Core' : 'Nationals', source: 'document', section: 'Object reference documents', subsection: section.title, prompt, choices: options, answer, explanation: `${point} ${section.paragraphs[0] ?? ''}` });
  }));

  return Array.from(new Map(questions.map((question) => [question.id, question])).values());
}
