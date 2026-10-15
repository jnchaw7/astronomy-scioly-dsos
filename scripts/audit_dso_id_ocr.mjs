// QA helper: OCR the generated ID figures and report visible answer labels.
// Supply a local Tesseract English model via --lang-path; no network access is used.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createWorker } from 'tesseract.js';

const project = path.resolve(import.meta.dirname, '..');
const bank = path.join(project, 'public/dso-id-bank');
const langIndex = process.argv.indexOf('--lang-path');
const langPath = langIndex >= 0 ? process.argv[langIndex + 1] : '/tmp';
const output = path.join(project, 'tmp-dso-ocr-audit.json');
const patterns = {
  'andromeda-galaxy': /andromeda|\bm\s*31\b|messier\s*31/i,
  'sombrero-galaxy': /sombrero|\bm\s*104\b|ngc\s*4594/i,
  m51: /whirlpool|\bm\s*51\b|ngc\s*5194/i,
  'ngc-4536': /ngc\s*4536/i,
  'mcg-07-33-027': /mcg\s*[+−-]?\s*07\s*[−-]\s*33\s*[−-]\s*027/i,
  'ngc-1569': /ngc\s*1569/i,
  'antennae-galaxies': /antennae|ngc\s*4038|ngc\s*4039/i,
  'arp-143': /arp\s*143|ngc\s*2444|ngc\s*2445/i,
  'arp-147': /arp\s*147/i,
  'cartwheel-galaxy': /cartwheel|eso\s*350\s*[−-]\s*40/i,
  m82: /cigar|\bm\s*82\b|ngc\s*3034/i,
  gw170817: /gw\s*170817|grb\s*170817|at\s*2017gfo|ngc\s*4993/i,
  'terzan-5': /terzan\s*5/i,
};

const names = (await fs.readdir(bank)).filter((name) => name.endsWith('.webp')).sort();
const worker = await createWorker('eng', 1, { langPath, cachePath: langPath, gzip: false });
const results = [];
for (let index = 0; index < names.length; index += 1) {
  const name = names[index];
  const slug = name.split('-pdf-')[0];
  const { data } = await worker.recognize(path.join(bank, name));
  const lines = data.text.split('\n').map((line) => line.trim()).filter(Boolean);
  const matches = lines.filter((line) => patterns[slug]?.test(line));
  if (matches.length) results.push({ name, matches, text: data.text });
  if ((index + 1) % 25 === 0) process.stderr.write(`OCR ${index + 1}/${names.length}\n`);
}
await worker.terminate();
await fs.writeFile(output, JSON.stringify({ scanned: names.length, flagged: results }, null, 2));
console.log(JSON.stringify({ scanned: names.length, flagged: results.length, output }));
