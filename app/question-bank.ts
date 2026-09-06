export type Difficulty = 'Foundations' | 'Core' | 'Invitational' | 'Nationals' | 'MIT-style';

export type PracticeQuestion = {
  id: string;
  topic: string;
  difficulty: Difficulty;
  prompt: string;
  choices?: string[];
  answer: string;
  explanation: string;
  source: 'local' | 'ai' | 'document';
  section?: string;
  subsection?: string;
};

export const topics = [
  'Galaxies',
  'Stellar evolution',
  'Spectra & light',
  'Distance methods',
  'Variable stars',
  'Compact objects',
  'Multiwavelength astronomy',
] as const;

export const difficulties: Difficulty[] = ['Foundations', 'Core', 'Invitational', 'Nationals', 'MIT-style'];

export const knowledgeQuestions: PracticeQuestion[] = [
  {
    id: 'gal-01', topic: 'Galaxies', difficulty: 'Foundations', source: 'local',
    prompt: 'Which observation is the strongest direct evidence that spiral arms are density-wave patterns rather than permanently fixed groups of stars?',
    choices: ['Stars of many ages pass through the arms', 'All arms rotate at the same angular speed as nearby stars', 'Only old red stars occur between arms', 'Spiral galaxies contain dark matter halos'],
    answer: 'Stars of many ages pass through the arms',
    explanation: 'Gas and stars enter and leave a density-wave arm. Gas is compressed there, so young stars trace the arm even though the material is not permanently attached to it.',
  },
  {
    id: 'gal-02', topic: 'Galaxies', difficulty: 'Core', source: 'local',
    prompt: 'A galaxy has a smooth light profile, little cold gas, and an old stellar population. Which classification is most consistent with those observations?',
    choices: ['Elliptical', 'Late-type spiral', 'Irregular', 'Blue compact dwarf'],
    answer: 'Elliptical',
    explanation: 'Ellipticals are generally gas-poor and dominated by older stars, producing smooth light distributions and little current star formation.',
  },
  {
    id: 'gal-03', topic: 'Galaxies', difficulty: 'Invitational', source: 'local',
    prompt: 'Why can a collisional ring galaxy show intense star formation in its outer ring?',
    choices: ['A propagating density wave compresses disk gas', 'The central black hole ejects newborn stars', 'Dark matter converts directly into molecular gas', 'The ring is a foreground gravitational lens'],
    answer: 'A propagating density wave compresses disk gas',
    explanation: 'A near head-on encounter can drive a radially expanding compression wave through the disk, triggering star formation as it moves outward.',
  },
  {
    id: 'gal-04', topic: 'Galaxies', difficulty: 'Nationals', source: 'local',
    prompt: 'Two otherwise similar spiral galaxies are viewed face-on and edge-on. Which measurement is most strongly altered by orientation?',
    choices: ['Observed dust extinction through the disk', 'Rest mass of the central black hole', 'Age of the oldest globular clusters', 'Total dark-matter halo mass'],
    answer: 'Observed dust extinction through the disk',
    explanation: 'An edge-on line of sight crosses a much longer path through the dusty disk, increasing extinction and reddening.',
  },
  {
    id: 'star-01', topic: 'Stellar evolution', difficulty: 'Core', source: 'local',
    prompt: 'Immediately after a low-mass star exhausts hydrogen in its core, what primarily causes its envelope to expand?',
    choices: ['Hydrogen-shell burning around a contracting helium core', 'The onset of core carbon fusion', 'A sudden decrease in opacity', 'Electron degeneracy in the envelope'],
    answer: 'Hydrogen-shell burning around a contracting helium core',
    explanation: 'The inert helium core contracts and heats while hydrogen burns in a surrounding shell; the increased energy output expands and cools the envelope.',
  },
  {
    id: 'star-02', topic: 'Stellar evolution', difficulty: 'Nationals', source: 'local',
    prompt: 'Why does increasing electron degeneracy pressure not stop a white dwarf from approaching the Chandrasekhar limit indefinitely?',
    choices: ['Electrons become relativistic, changing the pressure-density relation', 'The ions lose all thermal energy', 'Hydrogen fusion restarts in the center', 'Neutrino pressure always dominates'],
    answer: 'Electrons become relativistic, changing the pressure-density relation',
    explanation: 'At high density the degenerate electrons become relativistic. Their pressure then rises too slowly with density to support arbitrary mass.',
  },
  {
    id: 'spec-01', topic: 'Spectra & light', difficulty: 'Core', source: 'local',
    prompt: 'A cool cloud lies in front of a hot, continuous source. What spectrum is most likely observed?',
    choices: ['A continuous spectrum crossed by absorption lines', 'Only bright emission lines', 'A featureless black spectrum', 'A spectrum with no wavelength dependence'],
    answer: 'A continuous spectrum crossed by absorption lines',
    explanation: 'The hot source supplies a continuum and the cooler foreground gas selectively absorbs photons at atomic transition wavelengths.',
  },
  {
    id: 'spec-02', topic: 'Spectra & light', difficulty: 'Invitational', source: 'local',
    prompt: 'Why is the 21-cm hydrogen line especially useful for mapping the Milky Way?',
    choices: ['Radio waves penetrate interstellar dust and Doppler shifts trace gas motion', 'It is emitted only by newly formed O stars', 'Its wavelength is unaffected by relative motion', 'It directly measures stellar metallicity'],
    answer: 'Radio waves penetrate interstellar dust and Doppler shifts trace gas motion',
    explanation: 'Neutral hydrogen emits at 21 cm. That radio emission passes through dust, while line-of-sight velocities are recovered from its Doppler shift.',
  },
  {
    id: 'dist-01', topic: 'Distance methods', difficulty: 'Invitational', source: 'local',
    prompt: 'Why are Type Ia supernovae useful as distance indicators after light-curve calibration?',
    choices: ['Their calibrated peak luminosities are similar', 'They all occur at the same redshift', 'Their spectra contain no absorption', 'They are unaffected by host-galaxy dust'],
    answer: 'Their calibrated peak luminosities are similar',
    explanation: 'The light-curve shape–luminosity relation standardizes their peak luminosity, allowing apparent brightness to give a distance.',
  },
  {
    id: 'var-01', topic: 'Variable stars', difficulty: 'Nationals', source: 'local',
    prompt: 'A Cepheid has a longer pulsation period than another Cepheid of the same class. What does the period–luminosity relation imply?',
    choices: ['It has a greater intrinsic luminosity', 'It must be closer to Earth', 'It has a lower intrinsic luminosity', 'It must have lower metallicity'],
    answer: 'It has a greater intrinsic luminosity',
    explanation: 'For a given Cepheid class, a longer pulsation period corresponds to a higher absolute luminosity.',
  },
  {
    id: 'compact-01', topic: 'Compact objects', difficulty: 'Invitational', source: 'local',
    prompt: 'What produces most of the X-rays in a typical accreting stellar-mass black-hole binary?',
    choices: ['Hot inner accretion flow near the compact object', 'The cool companion photosphere', 'Neutral hydrogen in the outer galaxy', 'The system’s dark-matter halo'],
    answer: 'Hot inner accretion flow near the compact object',
    explanation: 'Gravitational energy heats gas in the inner accretion disk or corona to temperatures high enough to radiate strongly in X-rays.',
  },
  {
    id: 'multi-01', topic: 'Multiwavelength astronomy', difficulty: 'MIT-style', source: 'local',
    prompt: 'A galaxy is faint in visible light, bright in far-infrared, and strong in radio continuum. Which interpretation best joins those observations?',
    choices: ['Dust-obscured star formation reprocesses starlight and supernovae accelerate radio-emitting electrons', 'The galaxy contains only old metal-poor stars', 'All three signals are caused by gravitational lensing', 'Its gas is too cold to form stars'],
    answer: 'Dust-obscured star formation reprocesses starlight and supernovae accelerate radio-emitting electrons',
    explanation: 'Dust absorbs ultraviolet/visible light from young stars and reradiates in the infrared; supernova remnants supply cosmic-ray electrons that make synchrotron radio emission.',
  },
];

export function pickKnowledgeQuestion(topic: string, difficulty: Difficulty, avoid: string[] = []) {
  const exact = knowledgeQuestions.filter((q) => q.topic === topic && q.difficulty === difficulty && !avoid.includes(q.id));
  const sameTopic = knowledgeQuestions.filter((q) => q.topic === topic && !avoid.includes(q.id));
  const available = exact.length ? exact : sameTopic.length ? sameTopic : knowledgeQuestions.filter((q) => !avoid.includes(q.id));
  const pool = available.length ? available : knowledgeQuestions;
  return pool[Math.floor(Math.random() * pool.length)];
}
