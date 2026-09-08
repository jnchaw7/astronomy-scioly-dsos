'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, ImageIcon, Images, Layers3, RefreshCw, Target, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { makeComprehensiveDsoQuiz, type DsoQuizQuestion } from './comprehensive-quiz';
import { dsoImages } from './dso-data';
import type { GalaxyProfile } from './galaxy-study-data';

type KnowledgeTrack = 'general' | 'specific' | 'master';
type QuizScope = 'mixed' | 'identification' | 'knowledge';
type QuizFormat = 'mcq' | 'frq';
type AnswerState = 'idle' | 'correct' | 'incorrect';
type DsoImage = (typeof dsoImages)[number];
type MasterCandidate =
  | { id: string; kind: 'identification'; profile: GalaxyProfile; image: DsoImage }
  | { id: string; kind: 'knowledge'; profile: GalaxyProfile; question: DsoQuizQuestion };
type MasterItem = MasterCandidate & { format?: QuizFormat };
type Result = { id: string; objectKey: string; kind: 'identification' | 'knowledge'; correct: boolean };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const asset = (path: string) => `${basePath}${path}`;
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9+]/g, ' ').replace(/\s+/g, ' ').trim();
const answerWords = (value: string) => normalize(value).split(' ').filter((word) => word.length > 2 && !['the', 'and', 'for', 'with', 'from', 'that', 'this', 'about', 'into', 'its', 'are', 'was', 'were'].includes(word));

function isFreeResponseCorrect(response: string, answer: string) {
  const typed = normalize(response), expected = normalize(answer);
  if (!typed || !expected) return false;
  if (typed === expected || (typed.length >= 5 && expected.includes(typed)) || (expected.length >= 5 && typed.includes(expected))) return true;
  const expectedWords = Array.from(new Set(answerWords(answer))), typedWords = new Set(answerWords(response));
  const matches = expectedWords.filter((word) => typedWords.has(word)).length;
  const required = expectedWords.length <= 4 ? expectedWords.length : Math.min(4, Math.ceil(expectedWords.length * 0.35));
  return matches >= required;
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function buildMasterSet(profiles: GalaxyProfile[], requestedLength: number, scope: QuizScope): MasterItem[] {
  const minimumCoverage = scope === 'mixed' ? profiles.length * 2 : profiles.length;
  const actualLength = Math.max(requestedLength, minimumCoverage);
  const imageGroups = new Map(profiles.map((profile) => [profile.key, shuffle(dsoImages.filter((image) => image.name === profile.imageName).map((image): MasterCandidate => ({ id: `id:${profile.key}:${image.id}`, kind: 'identification', profile, image }))) ]));
  const knowledgeGroups = new Map(profiles.map((profile) => [profile.key, shuffle(makeComprehensiveDsoQuiz(profile).map((question): MasterCandidate => ({ id: `fact:${question.id}`, kind: 'knowledge', profile, question }))) ]));
  const chosen: MasterCandidate[] = [];

  shuffle(profiles).forEach((profile) => {
    const image = imageGroups.get(profile.key)?.[0], fact = knowledgeGroups.get(profile.key)?.[0];
    if (scope !== 'knowledge' && image) chosen.push(image);
    if (scope !== 'identification' && fact) chosen.push(fact);
  });

  const allowed = profiles.flatMap((profile) => scope === 'identification'
    ? imageGroups.get(profile.key) ?? []
    : scope === 'knowledge'
      ? knowledgeGroups.get(profile.key) ?? []
      : [...(imageGroups.get(profile.key) ?? []), ...(knowledgeGroups.get(profile.key) ?? [])]);
  const used = new Set(chosen.map((item) => item.id));
  chosen.push(...shuffle(allowed.filter((item) => !used.has(item.id))).slice(0, Math.max(0, actualLength - chosen.length)));

  let knowledgeIndex = 0;
  return shuffle(chosen.slice(0, actualLength)).map((item) => {
    if (item.kind === 'identification') return item;
    const format: QuizFormat = knowledgeIndex === 1 || (knowledgeIndex > 1 && knowledgeIndex % 3 === 1) ? 'frq' : 'mcq';
    knowledgeIndex += 1;
    return { ...item, format };
  });
}

export function MasterQuizMode({ profiles, initialKey, setTrack }: { profiles: GalaxyProfile[]; initialKey: string; setTrack(value: KnowledgeTrack): void }) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([initialKey]);
  const [scope, setScope] = useState<QuizScope>('mixed');
  const [length, setLength] = useState(20);
  const [phase, setPhase] = useState<'builder' | 'quiz' | 'results'>('builder');
  const [items, setItems] = useState<MasterItem[]>([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<AnswerState>('idle');
  const [response, setResponse] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [results, setResults] = useState<Result[]>([]);

  const selectedProfiles = useMemo(() => profiles.filter((profile) => selectedKeys.includes(profile.key)), [profiles, selectedKeys]);
  const availableFacts = useMemo(() => selectedProfiles.reduce((total, profile) => total + makeComprehensiveDsoQuiz(profile).length, 0), [selectedProfiles]);
  const availableImages = useMemo(() => selectedProfiles.reduce((total, profile) => total + dsoImages.filter((image) => image.name === profile.imageName).length, 0), [selectedProfiles]);
  const current = items[index];
  const correctCount = results.filter((result) => result.correct).length;

  function toggle(key: string) {
    setSelectedKeys((old) => old.includes(key) ? old.filter((item) => item !== key) : [...old, key]);
  }
  function start() {
    if (!selectedProfiles.length) return;
    const nextItems = buildMasterSet(selectedProfiles, length, scope);
    setItems(nextItems); setIndex(0); setResults([]); setResponse(''); setSelectedChoice(''); setStatus('idle'); setPhase('quiz');
  }
  function record(correct: boolean) {
    if (!current || status !== 'idle') return;
    setStatus(correct ? 'correct' : 'incorrect');
    setResults((old) => [...old, { id: current.id, objectKey: current.profile.key, kind: current.kind, correct }]);
  }
  function submitText() {
    if (!current || !response.trim() || status !== 'idle') return;
    if (current.kind === 'identification') {
      record([current.profile.name, current.profile.imageName, ...current.profile.aliases].some((name) => normalize(name) === normalize(response)));
    } else {
      record(isFreeResponseCorrect(response, current.question.answer));
    }
  }
  function choose(choice: string) {
    if (!current || current.kind !== 'knowledge' || status !== 'idle') return;
    setSelectedChoice(choice);
    record(normalize(choice) === normalize(current.question.answer));
  }
  function next() {
    if (status === 'idle') return;
    if (index + 1 >= items.length) { setPhase('results'); return; }
    setIndex((value) => value + 1); setStatus('idle'); setResponse(''); setSelectedChoice('');
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, select, button, [contenteditable="true"]')) return;
      if (phase !== 'quiz' || !current) return;
      if (event.key === 'Enter' && status !== 'idle') { event.preventDefault(); next(); return; }
      if (current.kind !== 'knowledge' || current.format !== 'mcq' || status !== 'idle') return;
      const choiceIndex = 'abcd'.indexOf(event.key.toLowerCase());
      const choice = current.question.choices?.[choiceIndex];
      if (choice) choose(choice);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const pathTabs = <Tabs value="master" onValueChange={(value) => setTrack(value as KnowledgeTrack)}><TabsList className="h-11 w-full max-w-2xl rounded-xl bg-white/5 p-1"><TabsTrigger value="general" className="h-9 px-4"><Layers3 />General galaxies</TabsTrigger><TabsTrigger value="specific" className="h-9 px-4"><Target />Specific DSO</TabsTrigger><TabsTrigger value="master" className="h-9 px-4"><Trophy />Master set</TabsTrigger></TabsList></Tabs>;

  if (phase === 'builder') return <div className="space-y-6">
    <section className="rounded-[26px] border border-white/10 bg-card p-5 sm:p-8"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Galaxy practice path</p>{pathTabs}<div className="mt-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Custom exam builder</p><h2 className="mt-2 font-display text-3xl font-semibold">Choose the DSOs you want to master</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">Select one object for a focused check or any combination for a mixed exam. Every selected object is represented when the set is long enough.</p></div><div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setSelectedKeys(profiles.map((profile) => profile.key))} className="border-white/10 bg-white/5">Select all</Button><Button type="button" variant="outline" onClick={() => setSelectedKeys([])} className="border-white/10 bg-white/5">Clear</Button></div></div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{profiles.map((profile) => { const checked = selectedKeys.includes(profile.key), image = dsoImages.find((item) => item.name === profile.imageName), factCount = makeComprehensiveDsoQuiz(profile).length; return <button type="button" key={profile.key} onClick={() => toggle(profile.key)} className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${checked ? 'border-cyan-300/45 bg-cyan-300/[0.07]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}><span className="size-16 shrink-0 overflow-hidden rounded-xl bg-black">{image && <img src={asset(image.image)} alt="" className="h-full w-full object-cover" />}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{profile.name}</span><span className="mt-1 block text-[11px] text-slate-500">{factCount} facts · {dsoImages.filter((item) => item.name === profile.imageName).length} images</span></span><span className={`grid size-6 shrink-0 place-items-center rounded-full border ${checked ? 'border-cyan-300 bg-cyan-300 text-slate-950' : 'border-white/20'}`}>{checked && <Check className="size-4" />}</span></button>; })}</div>
    </section>
    <section className="grid gap-5 rounded-[26px] border border-violet-300/15 bg-card p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-7"><label className="grid gap-2 text-xs text-slate-400">Question mix<select value={scope} onChange={(event) => setScope(event.target.value as QuizScope)} className="h-11 rounded-xl border border-white/10 bg-[#111a2a] px-3 text-sm text-slate-100 outline-none"><option value="mixed">Images + knowledge</option><option value="identification">Image identification only</option><option value="knowledge">Knowledge only (MCQ + FRQ)</option></select></label><label className="grid gap-2 text-xs text-slate-400">Set length<select value={length} onChange={(event) => setLength(Number(event.target.value))} className="h-11 rounded-xl border border-white/10 bg-[#111a2a] px-3 text-sm text-slate-100 outline-none">{[10, 20, 30, 50].map((value) => <option key={value} value={value}>{value} questions</option>)}</select></label><Button type="button" onClick={start} disabled={!selectedKeys.length} className="h-11 bg-cyan-300 px-6 text-slate-950 hover:bg-cyan-200"><Trophy />Start master set</Button><div className="sm:col-span-3 flex flex-wrap gap-2 text-xs text-slate-500"><Badge className="bg-cyan-300/10 text-cyan-200">{selectedKeys.length} DSOs selected</Badge><span>{availableImages} supplied images</span><span>·</span><span>{availableFacts} multi-source fact questions</span>{length < selectedKeys.length * (scope === 'mixed' ? 2 : 1) && <span className="text-amber-200">· Set expands to {selectedKeys.length * (scope === 'mixed' ? 2 : 1)} so every selected DSO gets {scope === 'mixed' ? 'both an image and a fact question' : 'a question'}.</span>}</div></section>
  </div>;

  if (phase === 'results') {
    const percent = results.length ? Math.round(correctCount / results.length * 100) : 0;
    return <div className="space-y-6"><section className="rounded-[26px] border border-white/10 bg-card p-6 text-center sm:p-10"><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300"><Trophy className="size-8" /></span><p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Master set complete</p><h2 className="mt-2 font-display text-5xl font-semibold">{percent}%</h2><p className="mt-2 text-sm text-slate-400">{correctCount} correct out of {results.length}</p><div className="mx-auto mt-7 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">{selectedProfiles.map((profile) => { const objectResults = results.filter((result) => result.objectKey === profile.key), ids = objectResults.filter((result) => result.kind === 'identification'), facts = objectResults.filter((result) => result.kind === 'knowledge'); return <div key={profile.key} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left"><p className="font-medium">{profile.name}</p><p className="mt-2 text-xs text-slate-400">Images: {ids.filter((result) => result.correct).length}/{ids.length}</p><p className="mt-1 text-xs text-slate-400">Knowledge: {facts.filter((result) => result.correct).length}/{facts.length}</p></div>; })}</div><div className="mt-7 flex flex-wrap justify-center gap-3"><Button type="button" variant="outline" onClick={() => setPhase('builder')} className="border-white/10 bg-white/5"><ChevronLeft />Edit DSO set</Button><Button type="button" onClick={start} className="bg-cyan-300 text-slate-950 hover:bg-cyan-200"><RefreshCw />New questions, same set</Button></div></section></div>;
  }

  if (!current) return null;
  const isText = current.kind === 'identification' || current.format === 'frq';
  const answer = current.kind === 'identification' ? current.profile.name : current.question.answer;
  const explanation = current.kind === 'identification' ? current.image.context : current.question.explanation;
  return <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_290px]"><section className="overflow-hidden rounded-[26px] border border-white/10 bg-card"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-8"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">Master set · {scope}</p><p className="mt-1 text-sm text-slate-400">Question {index + 1} of {items.length}</p></div><Badge className="bg-violet-300/10 text-violet-200">{current.profile.name}</Badge></div><Progress value={(index + Number(status !== 'idle')) / items.length * 100} />
    {current.kind === 'identification' ? <><div className="aspect-[16/9] bg-black"><img src={asset(current.image.image)} alt="Unlabeled DSO for identification" className="h-full w-full object-contain" /></div><div className="p-5 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300"><ImageIcon className="mr-2 inline size-4" />Image identification</p><h2 className="mt-3 font-display text-2xl font-semibold">Identify this DSO</h2></div></> : <div className="p-5 sm:p-8"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">{current.format === 'frq' ? 'Free response' : 'Multiple choice'}</p><Badge className="bg-white/5 text-slate-300">{current.question.sourceLabel}</Badge></div><p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-slate-500">{current.question.section}{current.question.subsection ? ` · ${current.question.subsection}` : ''}</p><h2 className="mt-3 max-w-4xl font-display text-2xl font-semibold leading-snug sm:text-3xl">{current.question.prompt}</h2></div>}
    <div className={`${current.kind === 'identification' ? 'px-5 pb-6 sm:px-8 sm:pb-8' : 'px-5 pb-6 sm:px-8 sm:pb-8'}`}>{isText ? <form onSubmit={(event) => { event.preventDefault(); if (status === 'idle') submitText(); else next(); }} className="flex flex-col gap-3 sm:flex-row"><Input autoFocus value={response} onChange={(event) => setResponse(event.target.value)} disabled={status !== 'idle'} placeholder={current.kind === 'identification' ? 'Object name or catalog number' : 'Type a short response'} className="h-11 flex-1 border-white/10 bg-white/5" /><Button type="submit" autoFocus={status !== 'idle'} className="h-11 bg-cyan-300 text-slate-950 hover:bg-cyan-200">{status === 'idle' ? 'Check answer' : 'Next question'} <ChevronRight /></Button></form> : <div className="grid gap-3">{current.kind === 'knowledge' && current.question.choices?.map((choice, choiceIndex) => { const isAnswer = normalize(choice) === normalize(current.question.answer), picked = choice === selectedChoice, tone = status === 'idle' ? 'border-white/10 hover:border-cyan-300/40 hover:bg-white/5' : isAnswer ? 'border-emerald-300/40 bg-emerald-300/10' : picked ? 'border-rose-300/40 bg-rose-300/10' : 'border-white/5 opacity-55'; return <button type="button" key={choice} onClick={() => choose(choice)} disabled={status !== 'idle'} className={`flex items-start gap-3 rounded-2xl border p-4 text-left text-sm transition ${tone}`}><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white/5 text-xs font-semibold text-slate-400">{String.fromCharCode(65 + choiceIndex)}</span><span className="pt-1">{choice}</span></button>; })}</div>}
      {status !== 'idle' && <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className={`text-sm font-semibold ${status === 'correct' ? 'text-emerald-300' : 'text-rose-300'}`}>{status === 'correct' ? 'Correct' : `Answer: ${answer}`}</p><p className="mt-2 text-sm leading-relaxed text-slate-400">{explanation}</p>{!isText && <Button type="button" autoFocus onClick={next} className="mt-4 bg-cyan-300 text-slate-950 hover:bg-cyan-200">Next question <ChevronRight /></Button>}<p className="mt-3 text-[11px] text-slate-500">Press Enter to continue.</p></div>}</div>
  </section><aside className="space-y-5"><section className="rounded-[22px] border border-cyan-300/15 bg-gradient-to-br from-cyan-300/8 to-violet-400/5 p-5"><Trophy className="size-5 text-cyan-300" /><p className="mt-3 font-medium">Live score</p><p className="mt-2 font-display text-4xl font-semibold">{correctCount}<span className="text-lg text-slate-500">/{results.length}</span></p><p className="mt-3 text-xs leading-relaxed text-slate-400">This set includes {selectedProfiles.length} selected DSO{selectedProfiles.length === 1 ? '' : 's'}.</p></section><section className="rounded-[22px] border border-white/10 bg-card p-5"><Images className="size-5 text-violet-300" /><p className="mt-3 text-sm font-medium">Question sources</p><p className="mt-2 text-xs leading-relaxed text-slate-400">Supplied DSO images, DSOs 2027 spreadsheet, mentor slideshow priorities, document captions, and reference articles.</p></section></aside></div>;
}
