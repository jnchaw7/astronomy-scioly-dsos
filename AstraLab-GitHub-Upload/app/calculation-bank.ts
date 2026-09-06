import type { Difficulty, PracticeQuestion } from './question-bank';

export type CalculationQuestion = PracticeQuestion & {
  numericAnswer: number;
  unit: string;
  tolerance: number;
  formula: string;
};

const sig = (value: number, digits = 3) => Number(value.toPrecision(digits));
const random = (min: number, max: number, step = 1) => Math.round((min + Math.random() * (max - min)) / step) * step;

export const calculationTopics = ['Distance modulus', 'Parallax', 'Wien’s law', 'Luminosity & flux', 'Hubble law', 'Redshift', 'Small-angle formula'] as const;

export function makeCalculation(topic: string, difficulty: Difficulty): CalculationQuestion {
  const id = `calc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  if (topic === 'Parallax') {
    const p = random(2, 80, 0.5) / 1000;
    const answer = 1 / p;
    return { id, topic, difficulty, source: 'local', prompt: `A star has a parallax of ${(p * 1000).toFixed(1)} milliarcseconds. Find its distance in parsecs.`, answer: String(sig(answer)), numericAnswer: answer, unit: 'pc', tolerance: 0.015, formula: 'd(pc) = 1 / p(arcsec)', explanation: `Convert ${p * 1000} mas to ${p.toFixed(4)} arcsec, then take the reciprocal: d = ${sig(answer)} pc.` };
  }
  if (topic === 'Wien’s law') {
    const temperature = random(2800, 18000, 100);
    const answer = 2.898e6 / temperature;
    return { id, topic, difficulty, source: 'local', prompt: `Approximate the peak wavelength in nanometers for a ${temperature.toLocaleString()} K blackbody.`, answer: String(sig(answer)), numericAnswer: answer, unit: 'nm', tolerance: 0.02, formula: 'λmax(nm) = 2.898 × 10⁶ / T(K)', explanation: `λmax = 2.898 × 10⁶ / ${temperature} = ${sig(answer)} nm.` };
  }
  if (topic === 'Luminosity & flux') {
    const luminosity = random(2, 90) * 1e35;
    const mpc = random(2, 45);
    const meters = mpc * 3.086e22;
    const answer = luminosity / (4 * Math.PI * meters ** 2);
    return { id, topic, difficulty, source: 'local', prompt: `A source has luminosity ${luminosity.toExponential(2)} W and lies ${mpc} Mpc away. Ignoring extinction, find its flux in W m⁻².`, answer: answer.toExponential(3), numericAnswer: answer, unit: 'W m⁻²', tolerance: 0.04, formula: 'F = L / (4πd²)', explanation: `Convert the distance to meters and use the inverse-square law: F = ${answer.toExponential(3)} W m⁻².` };
  }
  if (topic === 'Hubble law') {
    const h0 = 70;
    const velocity = random(700, 14000, 70);
    const answer = velocity / h0;
    return { id, topic, difficulty, source: 'local', prompt: `Assume H₀ = ${h0} km s⁻¹ Mpc⁻¹. A galaxy’s recession velocity is ${velocity.toLocaleString()} km s⁻¹. Estimate its distance.`, answer: String(sig(answer)), numericAnswer: answer, unit: 'Mpc', tolerance: 0.015, formula: 'v = H₀d', explanation: `d = v/H₀ = ${velocity}/${h0} = ${sig(answer)} Mpc.` };
  }
  if (topic === 'Redshift') {
    const rest = random(380, 700);
    const z = random(1, 35) / 100;
    const observed = rest * (1 + z);
    return { id, topic, difficulty, source: 'local', prompt: `A spectral line with rest wavelength ${rest} nm is observed at ${observed.toFixed(1)} nm. Calculate the redshift z.`, answer: String(sig(z)), numericAnswer: z, unit: '', tolerance: 0.02, formula: 'z = (λobs − λrest) / λrest', explanation: `z = (${observed.toFixed(1)} − ${rest})/${rest} = ${sig(z)}.` };
  }
  if (topic === 'Small-angle formula') {
    const distance = random(2, 25) * 1e6;
    const angle = random(2, 45);
    const answer = distance * angle / 206265;
    return { id, topic, difficulty, source: 'local', prompt: `A structure in a galaxy ${distance / 1e6} Mpc away spans ${angle} arcseconds. Estimate its physical diameter in parsecs.`, answer: String(sig(answer)), numericAnswer: answer, unit: 'pc', tolerance: 0.025, formula: 'D = dθ / 206,265 (θ in arcsec)', explanation: `D = ${(distance).toExponential(2)} × ${angle} / 206,265 = ${sig(answer)} pc.` };
  }
  const absolute = -random(3, 20);
  const distance = random(2, 45) * 1e6;
  const apparent = absolute + 5 * Math.log10(distance) - 5;
  return { id, topic: 'Distance modulus', difficulty, source: 'local', prompt: `A standard candle has absolute magnitude M = ${absolute} and apparent magnitude m = ${apparent.toFixed(2)}. Find its distance in parsecs.`, answer: distance.toExponential(3), numericAnswer: distance, unit: 'pc', tolerance: 0.025, formula: 'm − M = 5 log₁₀(d) − 5', explanation: `Rearrange to d = 10^((m−M+5)/5), giving approximately ${distance.toExponential(3)} pc.` };
}
