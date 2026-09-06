export type GalaxyProfile = {
  key: string;
  name: string;
  imageName: string;
  nasaQuery?: string;
  aliases: string[];
  constellation: string;
  morphology: string;
  distance: string;
  association: string;
  discovery: string;
  visualSignature: string;
  definingFact: string;
};

export type GalaxyStudyQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answer: string;
  explanation: string;
};

export const generalGalaxyQuestionIds = [
  'source-5972',
  'source-6024',
  'source-6171',
  'source-6682',
  'source-6687',
  'source-6692',
  'source-6697',
  'source-6707',
  'source-6717',
  'source-6727',
  'source-6771',
  'source-6873',
  'source-6885',
  'source-6891',
  'source-6937',
  'source-6944',
  'source-6973',
];

export const galaxyProfiles: GalaxyProfile[] = [
  {
    key: 'andromeda',
    name: 'Andromeda Galaxy',
    imageName: 'Andromeda Galaxy',
    nasaQuery: 'Andromeda Galaxy',
    aliases: ['M31', 'NGC 224'],
    constellation: 'Andromeda',
    morphology: 'Barred spiral galaxy',
    distance: 'About 2.5 million light-years',
    association: 'The Local Group',
    discovery: 'Al-Sufi described it in 964 CE; Edwin Hubble used Cepheids to establish its extragalactic distance in 1924.',
    visualSignature: 'A large, highly inclined spiral disk, often shown with the satellites M32 and M110.',
    definingFact: 'It is the nearest major galaxy to the Milky Way and is moving toward us.',
  },
  {
    key: 'sombrero',
    name: 'Sombrero Galaxy',
    imageName: 'Sombrero Galaxy',
    nasaQuery: 'Sombrero Galaxy',
    aliases: ['M104', 'NGC 4594'],
    constellation: 'Virgo',
    morphology: 'Peculiar galaxy, commonly classified SA(s)a or E',
    distance: 'About 30 million light-years',
    association: 'Virgo II Groups',
    discovery: 'Pierre Méchain discovered it in 1781; Vesto Slipher measured its large redshift and rotation in 1912.',
    visualSignature: 'A bright central bulge crossed by a sharp dust lane in a nearly edge-on disk.',
    definingFact: 'Its unusually large halo and rich globular-cluster system complicate its spiral-versus-elliptical classification.',
  },
  {
    key: 'm51',
    name: 'Whirlpool Galaxy',
    imageName: 'M51',
    nasaQuery: 'Whirlpool Galaxy',
    aliases: ['M51a', 'NGC 5194'],
    constellation: 'Canes Venatici',
    morphology: 'Interacting grand-design spiral galaxy with a Seyfert 2 nucleus',
    distance: 'About 23.5 million light-years',
    association: 'M51 Group; interacting with NGC 5195',
    discovery: 'Charles Messier discovered M51a in 1773; Lord Rosse sketched its spiral structure in 1845.',
    visualSignature: 'Two prominent spiral arms connected visually to the smaller companion NGC 5195.',
    definingFact: 'The companion interaction strengthens the spiral pattern and triggers star formation along the arms.',
  },
  {
    key: 'ngc-4536',
    name: 'NGC 4536',
    imageName: 'NGC 4536',
    aliases: ['UGC 7732', 'PGC 41823'],
    constellation: 'Virgo',
    morphology: 'SAB(rs)bc intermediate spiral and starburst galaxy',
    distance: 'About 49 million light-years',
    association: 'M61 Group within the Virgo II Groups',
    discovery: 'William Herschel discovered it on January 24, 1784.',
    visualSignature: 'Loosely wound arms with blue star clusters, red H II regions, dark dust lanes, and a weak central bar.',
    definingFact: 'Gas concentrated in a ring around its nucleus fuels strong star formation; SN 1981B occurred here.',
  },
  {
    key: 'mcg-07-33-027',
    name: 'MCG+07-33-027',
    imageName: 'MCG+07-33-027',
    nasaQuery: 'MCG 07 33 027',
    aliases: ['PGC 56779', 'LEDA 56779'],
    constellation: 'Hercules',
    morphology: 'Face-on Sa spiral and isolated starburst galaxy',
    distance: 'About 329 million light-years',
    association: 'A field galaxy, not a known group or cluster member',
    discovery: 'Hubble observations highlighted the galaxy in 2016.',
    visualSignature: 'A face-on disk with two clear spiral arms and bright, gas-rich star-forming regions.',
    definingFact: 'Its isolation makes the trigger for its strong starburst unclear; SN 2005bk occurred here.',
  },
  {
    key: 'ngc-1569',
    name: 'NGC 1569',
    imageName: 'NGC 1569',
    nasaQuery: 'NGC 1569',
    aliases: ['Arp 210', 'UGC 3056'],
    constellation: 'Camelopardalis',
    morphology: 'IBm dwarf irregular starburst galaxy',
    distance: 'About 11 million light-years',
    association: 'IC 342/Maffei Group',
    discovery: 'William Herschel discovered it on November 4, 1788.',
    visualSignature: 'A compact irregular body with brilliant super star clusters and filaments of ionized hydrogen.',
    definingFact: 'Its recent star formation rate per unit area is extreme, and it contains the super star clusters A1, A2, and B.',
  },
  {
    key: 'antennae',
    name: 'Antennae Galaxies',
    imageName: 'Antennae Galaxies',
    nasaQuery: 'Antennae Galaxies',
    aliases: ['NGC 4038/4039', 'Arp 244'],
    constellation: 'Corvus',
    morphology: 'Interacting pair of spiral galaxies in a starburst phase',
    distance: 'About 72 million light-years',
    association: 'NGC 4038 Group',
    discovery: 'William Herschel discovered the pair in 1785.',
    visualSignature: 'Two merging cores with long curved tidal tails that resemble insect antennae.',
    definingFact: 'The collision has produced more than 1,000 young super star clusters.',
  },
  {
    key: 'arp-143',
    name: 'Arp 143',
    imageName: 'Arp 143',
    aliases: ['NGC 2444/2445', 'VV 117'],
    constellation: 'Lynx',
    morphology: 'Interacting system containing a lenticular galaxy and a distorted ring galaxy',
    distance: 'About 135 million light-years',
    association: 'LGG 148 galaxy group',
    discovery: 'Édouard Stephan discovered the pair in 1877.',
    visualSignature: 'A blue triangular star-forming region in NGC 2445 beside the older, gas-poor NGC 2444.',
    definingFact: 'A head-on encounter produced a ring and bridge of young stars; the youngest stars lie near NGC 2445’s center.',
  },
  {
    key: 'arp-147',
    name: 'Arp 147',
    imageName: 'Arp 147',
    aliases: ['IC 298/298A', 'VV 787'],
    constellation: 'Cetus',
    morphology: 'Interacting pair dominated by a collision-made ring galaxy',
    distance: 'About 430 to 440 million light-years',
    association: 'Not part of a known galaxy group',
    discovery: 'Stéphane Javelle discovered the system in 1893.',
    visualSignature: 'The pair resembles the number 10: an edge-on left galaxy and a clumpy blue ring on the right.',
    definingFact: 'The expanding star-forming ring contains nine bright X-ray sources associated with stellar-mass black holes.',
  },
  {
    key: 'cartwheel',
    name: 'Cartwheel Galaxy',
    imageName: 'Cartwheel Galaxy',
    nasaQuery: 'Cartwheel Galaxy',
    aliases: ['ESO 350-40', 'PGC 2248'],
    constellation: 'Sculptor',
    morphology: 'S pec lenticular ring galaxy',
    distance: 'About 500 million light-years',
    association: 'Dominant member of the Cartwheel Galaxy group',
    discovery: 'Fritz Zwicky discovered it in 1941.',
    visualSignature: 'A bright outer ring connected to a compact inner ring by spoke-like structures.',
    definingFact: 'A smaller galaxy passed through its disk roughly 200 to 300 million years ago, driving an expanding star-forming wave.',
  },
  {
    key: 'm82',
    name: 'M82',
    imageName: 'M82',
    nasaQuery: 'M82',
    aliases: ['Cigar Galaxy', 'NGC 3034'],
    constellation: 'Ursa Major',
    morphology: 'Nearly edge-on I0 starburst galaxy',
    distance: 'About 11.4 to 12.4 million light-years',
    association: 'M81 Group; strongly affected by M81',
    discovery: 'Johann Elert Bode discovered M82 with M81 in 1774.',
    visualSignature: 'A narrow edge-on body with dusty starburst regions and a bipolar superwind extending above and below the disk.',
    definingFact: 'It hosts M82 X-1, the pulsar M82 X-2, and the Type Ia supernova SN 2014J.',
  },
  {
    key: 'gw170817',
    name: 'GW170817',
    imageName: 'GW170817',
    nasaQuery: 'GW170817',
    aliases: ['AT 2017gfo', 'SSS17a'],
    constellation: 'Hydra',
    morphology: 'Binary neutron-star merger and kilonova hosted by NGC 4993',
    distance: 'About 130 million light-years (40 Mpc)',
    association: 'Host galaxy NGC 4993',
    discovery: 'LIGO and Virgo detected the merger on August 17, 2017; telescopes found its electromagnetic counterpart soon after.',
    visualSignature: 'A fading optical or infrared point source near NGC 4993, often paired with localization maps or multiwavelength light curves.',
    definingFact: 'It was the first gravitational-wave event with a confirmed electromagnetic counterpart and provided evidence for r-process heavy-element production.',
  },
  {
    key: 'terzan-5',
    name: 'Terzan 5',
    imageName: 'Terzan 5',
    nasaQuery: 'Terzan 5',
    aliases: ['Terzan 5 stellar system'],
    constellation: 'Sagittarius',
    morphology: 'Dense globular-cluster-like stellar system in the Galactic bulge',
    distance: 'About 19,000 light-years (5.9 kpc)',
    association: 'Milky Way Galactic bulge',
    discovery: 'Agop Terzan discovered it in 1968.',
    visualSignature: 'An extremely crowded, dust-reddened star field with many compact X-ray and radio sources.',
    definingFact: 'It contains multiple stellar populations and one of the largest known populations of millisecond pulsars in a Galactic stellar system.',
  },
];

function mixedChoices(answer: string, distractors: string[], seed: number) {
  const choices = [answer, ...Array.from(new Set(distractors.filter((item) => item !== answer))).slice(0, 3)];
  return choices
    .map((value, index) => ({ value, order: (index * 7 + seed * 5) % 11 }))
    .sort((a, b) => a.order - b.order)
    .map((item) => item.value);
}

export function makeGalaxyStudyQuestions(profile: GalaxyProfile): GalaxyStudyQuestion[] {
  const others = galaxyProfiles.filter((item) => item.key !== profile.key);
  const templates = [
    {
      field: 'constellation' as const,
      prompt: `Which constellation contains ${profile.name}?`,
      explanation: `${profile.name} lies in ${profile.constellation}.`,
    },
    {
      field: 'morphology' as const,
      prompt: `Which classification best matches ${profile.name}?`,
      explanation: `${profile.name} is described in the mentor materials as a ${profile.morphology.toLowerCase()}.`,
    },
    {
      field: 'distance' as const,
      prompt: `About how far from Earth is ${profile.name}?`,
      explanation: `The mentor materials give ${profile.distance.toLowerCase()}.`,
    },
    {
      field: 'association' as const,
      prompt: `Which environment or companion relationship belongs to ${profile.name}?`,
      explanation: `${profile.name}: ${profile.association}.`,
    },
    {
      field: 'visualSignature' as const,
      prompt: `Which visual clue best identifies ${profile.name}?`,
      explanation: profile.visualSignature,
    },
    {
      field: 'definingFact' as const,
      prompt: `Which statement from the mentor materials describes ${profile.name}?`,
      explanation: profile.definingFact,
    },
    {
      field: 'discovery' as const,
      prompt: `Which discovery note belongs to ${profile.name}?`,
      explanation: profile.discovery,
    },
  ];

  return templates.map((template, index) => {
    const answer = profile[template.field];
    const offset = (galaxyProfiles.indexOf(profile) + index) % others.length;
    const distractors = [...others.slice(offset), ...others.slice(0, offset)].map((item) => item[template.field]);
    return {
      id: `${profile.key}-${template.field}`,
      prompt: template.prompt,
      choices: mixedChoices(answer, distractors, index + galaxyProfiles.indexOf(profile)),
      answer,
      explanation: template.explanation,
    };
  });
}
