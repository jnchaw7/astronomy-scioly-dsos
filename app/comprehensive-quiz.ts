import { dsoImages } from './dso-data';
import { galaxyProfiles, makeGalaxyStudyQuestions, type GalaxyProfile } from './galaxy-study-data';
import { spreadsheetDsoFacts } from './dso-spreadsheet-data';
import { dsoArticles } from './study-article-data';
import type { PracticeQuestion } from './question-bank';

export type DsoQuizQuestion = PracticeQuestion & {
  objectKey: string;
  sourceLabel: 'DSOs 2027 spreadsheet' | 'Mentor slideshow' | 'Reference document' | 'Mentor DSO profile';
};

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const objectNames = galaxyProfiles.flatMap((profile) => [profile.name, profile.imageName, ...profile.aliases]).filter((value) => value.length > 2).sort((a, b) => b.length - a.length);

function withoutObjectNames(value: string) {
  return objectNames.reduce((text, name) => text.replace(new RegExp(escapeRegex(name), 'gi'), 'this object'), value).replace(/\s+/g, ' ').trim();
}

function shuffled<T>(items: T[], seed: string) {
  const score = (value: T, index: number) => Array.from(`${seed}:${index}:${String(value)}`).reduce((sum, character) => sum + character.charCodeAt(0), 0) % 997;
  return items.map((value, index) => ({ value, score: score(value, index) })).sort((a, b) => a.score - b.score).map(({ value }) => value);
}

function choices(answer: string, distractors: string[], seed: string) {
  const unique = Array.from(new Set([answer, ...distractors].map((value) => withoutObjectNames(value)).filter((value) => value.length >= 2)));
  return shuffled(unique.slice(0, 4), seed);
}

function sourceQuestion(question: PracticeQuestion, profile: GalaxyProfile): DsoQuizQuestion {
  return { ...question, objectKey: profile.key, sourceLabel: 'Mentor DSO profile', section: 'Mentor DSO profile', subsection: profile.name };
}

export function makeComprehensiveDsoQuiz(profile: GalaxyProfile): DsoQuizQuestion[] {
  const otherProfiles = galaxyProfiles.filter((item) => item.key !== profile.key);
  const article = dsoArticles.find((item) => item.key === profile.key);
  const questions: DsoQuizQuestion[] = makeGalaxyStudyQuestions(profile).map((question) => sourceQuestion({ ...question, topic: profile.name, difficulty: 'Core', source: 'document' }, profile));

  const preferredSpreadsheetLabels = ['Description', 'Constellation', '(Galaxy) Type', 'Size (longest diameter)', 'Mass (M☉)', 'Redshift', 'Distance', 'Apparent Magnitude', 'Member of', 'Spiral Arms', 'Globular clusters', 'Star Formation Rate (M☉/yr)'];
  const spreadsheetFacts = (spreadsheetDsoFacts[profile.key] ?? []).filter((fact) => preferredSpreadsheetLabels.includes(fact.label) && fact.value.length <= 190);
  spreadsheetFacts.forEach((fact, index) => {
    const distractors = otherProfiles.flatMap((other) => (spreadsheetDsoFacts[other.key] ?? []).filter((candidate) => candidate.label === fact.label && candidate.value.length <= 190).map((candidate) => candidate.value));
    const answer = withoutObjectNames(fact.value), options = choices(answer, distractors, `${profile.key}:sheet:${index}`);
    if (options.length < 4) return;
    questions.push({ id: `${profile.key}-sheet-${index}`, objectKey: profile.key, sourceLabel: 'DSOs 2027 spreadsheet', topic: profile.name, difficulty: 'Invitational', source: 'document', section: `DSOs 2027 spreadsheet · ${fact.sheet}`, subsection: fact.label, prompt: `According to the DSO spreadsheet, which ${fact.label.toLowerCase()} entry belongs to ${profile.name}?`, choices: options, answer, explanation: `${fact.subject} — ${fact.label}: ${fact.value}` });
  });

  article?.mentorPriority.forEach((point, index) => {
    const distractors = otherProfiles.flatMap((other) => dsoArticles.find((item) => item.key === other.key)?.mentorPriority ?? []);
    const answer = withoutObjectNames(point), options = choices(answer, distractors, `${profile.key}:slide:${index}`);
    if (options.length < 4) return;
    questions.push({ id: `${profile.key}-slide-${index}`, objectKey: profile.key, sourceLabel: 'Mentor slideshow', topic: profile.name, difficulty: 'Invitational', source: 'document', section: article.deck, subsection: 'Mentor emphasis', prompt: `Which statement is emphasized in the mentor slideshow for ${profile.name}?`, choices: options, answer, explanation: point });
  });

  article?.sections.forEach((section, sectionIndex) => section.keyPoints.slice(0, 3).forEach((point, pointIndex) => {
    const distractors = otherProfiles.flatMap((other) => dsoArticles.find((item) => item.key === other.key)?.sections.flatMap((item) => item.keyPoints) ?? []);
    const answer = withoutObjectNames(point), options = choices(answer, distractors, `${profile.key}:doc:${sectionIndex}:${pointIndex}`);
    if (options.length < 4) return;
    questions.push({ id: `${profile.key}-document-${sectionIndex}-${pointIndex}`, objectKey: profile.key, sourceLabel: 'Reference document', topic: profile.name, difficulty: pointIndex === 0 ? 'Core' : 'Nationals', source: 'document', section: 'Object reference documents', subsection: section.title, prompt: `Which fact belongs in the “${section.title}” section for ${profile.name}?`, choices: options, answer, explanation: `${point} ${section.paragraphs[0] ?? ''}` });
  }));

  const captions = Array.from(new Set(dsoImages.filter((image) => image.name === profile.imageName).map((image) => image.context.split(/(?<=[.!?])\s+/)[0]).filter((caption) => caption.length >= 35 && caption.length <= 190)));
  captions.slice(0, 3).forEach((caption, index) => {
    const distractors = otherProfiles.flatMap((other) => dsoImages.filter((image) => image.name === other.imageName).map((image) => image.context.split(/(?<=[.!?])\s+/)[0]).filter((item) => item.length >= 35 && item.length <= 190));
    const answer = withoutObjectNames(caption), options = choices(answer, distractors, `${profile.key}:caption:${index}`);
    if (options.length < 4) return;
    questions.push({ id: `${profile.key}-caption-${index}`, objectKey: profile.key, sourceLabel: 'Reference document', topic: profile.name, difficulty: 'Core', source: 'document', section: 'DSO Images 26_27.docx', subsection: 'Image captions', prompt: `Which supplied image caption belongs to ${profile.name}?`, choices: options, answer, explanation: caption });
  });

  return Array.from(new Map(questions.map((question) => [question.id, question])).values());
}
