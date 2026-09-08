import type { Difficulty, PracticeQuestion } from './question-bank';

export type CalculationPart = { label: string; prompt: string; numericAnswer: number; displayAnswer: string; unit: string; tolerance: number; explanation: string };
export type CalculationQuestion = PracticeQuestion & { parts: CalculationPart[]; formulae: string[]; sourceId: string; sourcePage: number; sourceLabel: string };

const C_KMS = 299792.458, G = 6.6743e-11, AU = 1.495978707e11, PC = 3.085677581e16, MPC_KM = 3.085677581e19, LY = 9.4607e15, MSUN = 1.98847e30, YEAR = 365.25 * 86400;
const sig = (value: number, digits = 3) => Number(value.toPrecision(digits));
const random = (min: number, max: number, step = 1) => Math.round((min + Math.random() * (max - min)) / step) * step;
const show = (value: number) => { const absolute = Math.abs(value); return absolute >= 1e5 || (absolute > 0 && absolute < 0.001) ? value.toExponential(3) : String(sig(value, 4)); };
const part = (label: string, prompt: string, numericAnswer: number, unit: string, explanation: string, tolerance = 0.035): CalculationPart => ({ label, prompt, numericAnswer, displayAnswer: show(numericAnswer), unit, explanation, tolerance });
const finish = (question: Omit<CalculationQuestion, 'id' | 'difficulty' | 'source' | 'answer' | 'explanation'>, difficulty: Difficulty): CalculationQuestion => ({ ...question, id: `calc-${question.sourceId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, difficulty, source: 'document', answer: question.parts.map((item) => `${item.label}: ${item.displayAnswer} ${item.unit}`).join('; '), explanation: `Adapted from ${question.sourceId} on page ${question.sourcePage} of Practice_calculations (2).pdf.` });

export const calculationTopics = ['Mixed multi-step', 'Galaxy redshift & distance', 'Angular size & remnants', 'Galaxy clusters', 'Black holes & AGN', 'Binary systems', 'Standard candles', 'Energetics & globulars'] as const;

function redshiftChain(difficulty: Difficulty) {
  const rest = [656.28, 486.13, 500.7][Math.floor(Math.random() * 3)], z = random(8, 72) / 1000, observed = rest * (1 + z), h0 = [65, 70, 72][Math.floor(Math.random() * 3)];
  const velocity = C_KMS * z, distance = velocity / h0, age = MPC_KM / h0 / (1e9 * YEAR);
  return finish({ topic: 'Galaxy redshift & distance', prompt: `A galaxy's spectral line has a laboratory wavelength of ${rest.toFixed(2)} nm and is observed at ${observed.toFixed(2)} nm. Assume H₀ = ${h0} km s⁻¹ Mpc⁻¹ and use the low-redshift approximation. Work through the full distance chain.`, choices: undefined, sourceId: 'T2-14 / T2-97', sourcePage: 31, sourceLabel: 'Practice calculations PDF · redshift chain', formulae: ['z = (λobs − λrest)/λrest', 'v ≈ cz', 'd = v/H₀', 'tH = 1/H₀'], parts: [
    part('a', 'Calculate the redshift z.', z, '', `z = (${observed.toFixed(2)} − ${rest.toFixed(2)})/${rest.toFixed(2)} = ${show(z)}.`, 0.012),
    part('b', 'Calculate the recessional velocity.', velocity, 'km s⁻¹', `v ≈ cz = ${C_KMS.toLocaleString()}(${show(z)}) = ${show(velocity)} km s⁻¹.`),
    part('c', 'Estimate the galaxy’s distance.', distance, 'Mpc', `d = v/H₀ = ${show(velocity)}/${h0} = ${show(distance)} Mpc.`),
    part('d', 'Estimate the Hubble time.', age, 'Gyr', `Convert 1/H₀ to seconds and then gigayears: ${show(age)} Gyr.`),
  ] }, difficulty);
}

function angularRemnant(difficulty: Difficulty) {
  const distanceMly = random(35, 95) / 10, angle = random(8, 28) / 10, density = random(6, 18) * 1e-22, h0 = 70;
  const diameterLy = distanceMly * 1e6 * angle / 206265, radiusM = diameterLy * LY / 2, massSolar = density * (4 / 3) * Math.PI * radiusM ** 3 / MSUN;
  const distanceMpc = distanceMly / 3.26156, velocity = h0 * distanceMpc, deltaLambda = 121.6 * velocity / C_KMS;
  return finish({ topic: 'Angular size & remnants', prompt: `A roughly spherical supernova remnant subtends ${angle.toFixed(1)} arcsec in a galaxy ${distanceMly.toFixed(1)} million light-years away. Treat its density as ${density.toExponential(1)} kg m⁻³ and use H₀ = ${h0} km s⁻¹ Mpc⁻¹.`, choices: undefined, sourceId: 'T2-13', sourcePage: 30, sourceLabel: 'Practice calculations PDF · SNR chain', formulae: ['D = dθ/206265', 'M = ρ(4πr³/3)', 'v = H₀d', 'Δλ/λ₀ ≈ v/c'], parts: [
    part('a', 'Find the remnant’s physical diameter.', diameterLy, 'ly', `D = ${distanceMly.toFixed(1)}×10⁶(${angle.toFixed(1)})/206265 = ${show(diameterLy)} ly.`),
    part('b', 'Estimate the remnant’s mass.', massSolar, 'M☉', `Convert half the diameter to meters, find the spherical volume, and multiply by density: ${show(massSolar)} M☉.`, 0.06),
    part('c', 'Estimate the host galaxy’s recessional velocity.', velocity, 'km s⁻¹', `${distanceMly.toFixed(1)} Mly = ${show(distanceMpc)} Mpc, so v = H₀d = ${show(velocity)} km s⁻¹.`),
    part('d', 'For Lyα at 121.6 nm, calculate the expected wavelength shift.', deltaLambda, 'nm', `Δλ = λ₀v/c = 121.6(${show(velocity)})/${C_KMS.toLocaleString()} = ${show(deltaLambda)} nm.`, 0.05),
  ] }, difficulty);
}

function galaxyCluster(difficulty: Difficulty) {
  const zCenter = random(30, 75) / 1000, halfRange = random(18, 35) / 10000, zMin = zCenter - halfRange, zMax = zCenter + halfRange, angleArcmin = random(25, 55), h0 = 70;
  const velocity = C_KMS * zCenter, dispersion = C_KMS * halfRange, distanceMpc = velocity / h0, diameterMpc = distanceMpc * (angleArcmin / 60) * Math.PI / 180, radiusM = diameterMpc / 2 * 1e6 * PC, virialMass = 3 * (dispersion * 1000) ** 2 * radiusM / G / MSUN;
  return finish({ topic: 'Galaxy clusters', prompt: `A nearly spherical galaxy cluster has member redshifts from ${zMin.toFixed(4)} to ${zMax.toFixed(4)} and an angular diameter of ${angleArcmin} arcmin. Use H₀ = ${h0} km s⁻¹ Mpc⁻¹. Approximate the one-dimensional velocity dispersion from half the redshift range.`, choices: undefined, sourceId: 'T2-104', sourcePage: 125, sourceLabel: 'Practice calculations PDF · cluster virial chain', formulae: ['v ≈ cz', 'σv ≈ c(zmax−zmin)/2', 'd = v/H₀', 'D ≈ dθ', 'M ≈ 3σ²R/G'], parts: [
    part('a', 'Calculate the cluster’s mean recessional velocity.', velocity, 'km s⁻¹', `Use the midpoint redshift ${zCenter.toFixed(4)}: v ≈ cz = ${show(velocity)} km s⁻¹.`),
    part('b', 'Estimate its velocity dispersion.', dispersion, 'km s⁻¹', `σv ≈ c(${zMax.toFixed(4)}−${zMin.toFixed(4)})/2 = ${show(dispersion)} km s⁻¹.`),
    part('c', 'Estimate the cluster distance.', distanceMpc, 'Mpc', `d = v/H₀ = ${show(distanceMpc)} Mpc.`),
    part('d', 'Find the cluster’s physical diameter.', diameterMpc, 'Mpc', `Convert ${angleArcmin}′ to radians and use D ≈ dθ: ${show(diameterMpc)} Mpc.`),
    part('e', 'Use the virial estimate to find the cluster mass.', virialMass, 'M☉', `With R = D/2, M ≈ 3σ²R/G = ${show(virialMass)} M☉.`, 0.08),
  ] }, difficulty);
}

function blackHoleOrbit(difficulty: Difficulty) {
  const mass = random(25, 80) * 1e5, periodYears = random(12, 32), periFraction = [0.35, 0.4, 0.5][Math.floor(Math.random() * 3)];
  const semiAu = Math.cbrt(mass * periodYears ** 2), periAu = semiAu * periFraction, apoAu = 2 * semiAu - periAu, eccentricity = (apoAu - periAu) / (apoAu + periAu), velocity = Math.sqrt(G * mass * MSUN * (2 / (periAu * AU) - 1 / (semiAu * AU))), schwarzschild = 2 * G * mass * MSUN / (299792458 ** 2) / 1000;
  return finish({ topic: 'Black holes & AGN', prompt: `A star orbits a ${mass.toExponential(2)} M☉ supermassive black hole with a period of ${periodYears} years. Its periapsis is ${periFraction.toFixed(2)} times the semimajor axis. Treat the star’s mass as negligible.`, choices: undefined, sourceId: 'T2-111', sourcePage: 132, sourceLabel: 'Practice calculations PDF · black-hole orbit', formulae: ['P² = a³/M (yr, AU, M☉)', 'v² = GM(2/r−1/a)', 'e = (ra−rp)/(ra+rp)', 'Rs = 2GM/c²'], parts: [
    part('a', 'Calculate the semimajor axis.', semiAu, 'AU', `a = (MP²)^(1/3) = ${show(semiAu)} AU.`),
    part('b', 'Calculate the star’s speed at periapsis.', velocity, 'm s⁻¹', `Use r = ${show(periAu)} AU in the vis-viva equation: ${show(velocity)} m s⁻¹.`, 0.05),
    part('c', 'Calculate the orbital eccentricity.', eccentricity, '', `ra = 2a − rp = ${show(apoAu)} AU, giving e = ${show(eccentricity)}.`),
    part('d', 'Calculate the black hole’s Schwarzschild radius.', schwarzschild, 'km', `Rs = 2GM/c² = ${show(schwarzschild)} km.`),
  ] }, difficulty);
}

function quasarLifetime(difficulty: Difficulty) {
  const luminosity = random(25, 85) * 1e39, fuelMass = random(40, 180) * 1e6, efficiency = random(8, 24) / 100, availableEnergy = efficiency * fuelMass * MSUN * 299792458 ** 2, lifetimeYears = availableEnergy / luminosity / YEAR, eddingtonMass = luminosity / 1.26e31;
  return finish({ topic: 'Black holes & AGN', prompt: `A quasar radiates at ${luminosity.toExponential(2)} W and can accrete ${fuelMass.toExponential(2)} M☉ with an efficiency of ${(efficiency * 100).toFixed(1)}%. Assume constant luminosity.`, choices: undefined, sourceId: 'T2-114 / T2-116', sourcePage: 135, sourceLabel: 'Practice calculations PDF · quasar lifetime', formulae: ['E = ηMc²', 't = E/L', 'LEdd = 1.26×10³¹(M/M☉) W'], parts: [
    part('a', 'Calculate the energy available for radiation.', availableEnergy, 'J', `E = ηMc² = ${show(availableEnergy)} J.`, 0.05),
    part('b', 'Estimate the quasar lifetime.', lifetimeYears, 'yr', `t = E/L and convert seconds to years: ${show(lifetimeYears)} yr.`, 0.05),
    part('c', 'If it radiates at the Eddington limit, estimate the minimum black-hole mass.', eddingtonMass, 'M☉', `M/M☉ = L/(1.26×10³¹ W) = ${show(eddingtonMass)}.`, 0.05),
  ] }, difficulty);
}

function binarySystem(difficulty: Difficulty) {
  const periodDays = random(18, 65), v1 = random(60, 140, 5), v2 = random(150, 300, 5), periodSeconds = periodDays * 86400, r1 = v1 * 1000 * periodSeconds / (2 * Math.PI), r2 = v2 * 1000 * periodSeconds / (2 * Math.PI), separationAu = (r1 + r2) / AU, periodYears = periodDays / 365.25, totalMass = separationAu ** 3 / periodYears ** 2, m1 = totalMass * v2 / (v1 + v2), m2 = totalMass - m1;
  return finish({ topic: 'Binary systems', prompt: `A circular, edge-on spectroscopic binary has a period of ${periodDays} days. The two stars have radial-velocity semiamplitudes of ${v1} and ${v2} km s⁻¹.`, choices: undefined, sourceId: 'T2-7 / T2-12', sourcePage: 24, sourceLabel: 'Practice calculations PDF · binary chain', formulae: ['ri = viP/2π', 'a = r1+r2', 'Mtot = a³/P²', 'M1/M2 = v2/v1'], parts: [
    part('a', 'Calculate the separation of the two stars.', separationAu, 'AU', `Find both orbital radii from viP/2π and add them: ${show(separationAu)} AU.`, 0.05),
    part('b', 'Calculate the system’s total mass.', totalMass, 'M☉', `In AU and years, Mtot = a³/P² = ${show(totalMass)} M☉.`, 0.06),
    part('c', `Calculate the mass of the star moving at ${v1} km s⁻¹.`, m1, 'M☉', `The slower star is more massive: M1 = Mtot·v2/(v1+v2) = ${show(m1)} M☉.`, 0.06),
    part('d', `Calculate the mass of the star moving at ${v2} km s⁻¹.`, m2, 'M☉', `M2 = Mtot·v1/(v1+v2) = ${show(m2)} M☉.`, 0.06),
  ] }, difficulty);
}

function cepheidChain(difficulty: Difficulty) {
  const period = random(8, 42), apparent = random(60, 150) / 10, absolute = -2.43 * (Math.log10(period) - 1) - 4.05, distancePc = 10 ** ((apparent - absolute + 5) / 5), luminosity = 10 ** ((4.83 - absolute) / 2.5);
  return finish({ topic: 'Standard candles', prompt: `A Classical Cepheid has a period of ${period} days and mean apparent V magnitude ${apparent.toFixed(1)}. Use MV = −2.43(log₁₀P − 1) − 4.05 and ignore extinction.`, choices: undefined, sourceId: 'T2-11 / T2-18', sourcePage: 28, sourceLabel: 'Practice calculations PDF · Cepheid ladder', formulae: ['MV = −2.43(log₁₀P−1)−4.05', 'm−M = 5log₁₀d−5', 'L/L☉ = 10^((4.83−M)/2.5)'], parts: [
    part('a', 'Calculate the Cepheid’s absolute magnitude.', absolute, 'mag', `Substitute P = ${period} days: MV = ${show(absolute)}.`, 0.02),
    part('b', 'Calculate its distance.', distancePc / 1000, 'kpc', `Use the distance modulus and convert parsecs to kpc: ${show(distancePc / 1000)} kpc.`, 0.04),
    part('c', 'Estimate its visible luminosity.', luminosity, 'L☉', `L/L☉ = 10^((4.83−M)/2.5) = ${show(luminosity)}.`, 0.05),
  ] }, difficulty);
}

function supernovaEnergy(difficulty: Difficulty) {
  const flux = random(8, 32) * 1e-7, distanceKly = random(12, 45), days = random(18, 45), progenitor = random(14, 28), remnant = random(14, 24) / 10, ejectaSpeed = random(35, 85) * 100, distanceM = distanceKly * 1000 * LY, radiated = flux * 4 * Math.PI * distanceM ** 2 * days * 86400, kinetic = 0.5 * (progenitor - remnant) * MSUN * (ejectaSpeed * 1000) ** 2, percentage = (radiated + kinetic) / 1e46 * 100;
  return finish({ topic: 'Energetics & globulars', prompt: `A supernova ${distanceKly} thousand light-years away has a mean observed flux of ${flux.toExponential(2)} W m⁻² for ${days} days. A ${progenitor} M☉ progenitor leaves a ${remnant.toFixed(1)} M☉ remnant; the ejecta move at ${ejectaSpeed.toLocaleString()} km s⁻¹.`, choices: undefined, sourceId: 'T3-1', sourcePage: 139, sourceLabel: 'Practice calculations PDF · supernova energetics', formulae: ['L = 4πd²F', 'Erad = Lt', 'KE = ½Mv²'], parts: [
    part('a', 'Estimate the energy radiated as photons during the observing interval.', radiated, 'J', `Use L = 4πd²F, then multiply by ${days} days: ${show(radiated)} J.`, 0.06),
    part('b', 'Estimate the kinetic energy of the ejecta.', kinetic, 'J', `Mejecta = (${progenitor}−${remnant.toFixed(1)}) M☉; KE = ½Mv² = ${show(kinetic)} J.`, 0.06),
    part('c', 'What percentage of a 1.00×10⁴⁶ J explosion model is represented by those two energies?', percentage, '%', `(Erad+KE)/10⁴⁶ × 100 = ${show(percentage)}%.`, 0.07),
  ] }, difficulty);
}

function globularVirial(difficulty: Difficulty) {
  const stars = random(35, 90) * 10000, averageMass = random(5, 9) / 10, density = random(2, 8) / 10, imbhFraction = random(10, 30) / 10000, massSolar = stars * averageMass, radiusPc = Math.cbrt(3 * stars / (4 * Math.PI * density)), massKg = massSolar * MSUN, radiusM = radiusPc * PC, potential = -3 * G * massKg ** 2 / (5 * radiusM), kinetic = -potential / 2, imbhMass = massKg * imbhFraction, schwarzschildKm = 2 * G * imbhMass / 299792458 ** 2 / 1000;
  return finish({ topic: 'Energetics & globulars', prompt: `Model a globular cluster as a uniform sphere containing ${stars.toLocaleString()} stars of average mass ${averageMass.toFixed(1)} M☉ at a number density of ${density.toFixed(1)} stars pc⁻³. An intermediate-mass black hole contains ${(imbhFraction * 100).toFixed(2)}% of the cluster mass.`, choices: undefined, sourceId: 'T2-117', sourcePage: 138, sourceLabel: 'Practice calculations PDF · globular virial chain', formulae: ['M = N⟨m⟩', 'R = [3N/(4πn)]^(1/3)', 'U = −3GM²/(5R)', 'K = −U/2', 'Rs = 2GM/c²'], parts: [
    part('a', 'Estimate the cluster mass.', massSolar, 'M☉', `M = N⟨m⟩ = ${show(massSolar)} M☉.`),
    part('b', 'Estimate the cluster radius.', radiusPc, 'pc', `Solve N = n(4πR³/3): R = ${show(radiusPc)} pc.`, 0.05),
    part('c', 'Estimate its gravitational potential energy.', potential, 'J', `For a uniform sphere, U = −3GM²/(5R) = ${show(potential)} J.`, 0.07),
    part('d', 'Assuming virial equilibrium, estimate the total kinetic energy.', kinetic, 'J', `2K+U=0, so K = −U/2 = ${show(kinetic)} J.`, 0.07),
    part('e', 'Calculate the IMBH Schwarzschild radius.', schwarzschildKm, 'km', `Use ${(imbhFraction * 100).toFixed(2)}% of the cluster mass in Rs = 2GM/c²: ${show(schwarzschildKm)} km.`, 0.07),
  ] }, difficulty);
}

const makers = [redshiftChain, angularRemnant, galaxyCluster, blackHoleOrbit, quasarLifetime, binarySystem, cepheidChain, supernovaEnergy, globularVirial];
const topicMakers: Record<string, Array<(difficulty: Difficulty) => CalculationQuestion>> = {
  'Mixed multi-step': makers, 'Galaxy redshift & distance': [redshiftChain], 'Angular size & remnants': [angularRemnant], 'Galaxy clusters': [galaxyCluster], 'Black holes & AGN': [blackHoleOrbit, quasarLifetime], 'Binary systems': [binarySystem], 'Standard candles': [cepheidChain], 'Energetics & globulars': [supernovaEnergy, globularVirial],
};
export function makeCalculation(topic: string, difficulty: Difficulty): CalculationQuestion { const pool = topicMakers[topic] ?? makers; return pool[Math.floor(Math.random() * pool.length)](difficulty); }
