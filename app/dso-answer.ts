const GENERIC_OBJECT_SUFFIX = /\s+(?:galaxy|galaxies|stellar system|system)$/i;
const CATALOG_PREFIX = /\b(mcg|ngc|ugc|pgc|leda|arp|ic|vv|eso|m)\s+(?=\d)/g;

export function normalizeDsoAnswer(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(CATALOG_PREFIX, '$1');
}

function answerVariants(label: string) {
  const variants = [label];
  const shortened = label.replace(GENERIC_OBJECT_SUFFIX, '').trim();
  if (shortened && shortened !== label) variants.push(shortened);
  return variants.map(normalizeDsoAnswer).filter(Boolean);
}

export function isDsoAnswerCorrect(response: string, labels: readonly string[]) {
  const candidate = normalizeDsoAnswer(response);
  if (!candidate) return false;
  return labels.some((label) => answerVariants(label).includes(candidate));
}
