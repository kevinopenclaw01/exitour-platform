#!/usr/bin/env node
// 아이디어 재판소 평결 집계기 — 가중치·공식은 references/rubric.md와 같은 값을 쓴다.
//
//   node verdict.mjs <사건폴더>            배심원 평결표를 집계해 07-평결집계.json을 쓴다
//   node verdict.mjs <사건폴더> --brief    평의용 익명 요약 06b-평의자료.md를 쓴다
//   node verdict.mjs <사건폴더> --bundle   모든 기록을 재판기록.md 하나로 합친다

import fs from 'node:fs';
import path from 'node:path';

const CRITERIA = [
  { key: 'problem', label: '문제의 실재성', weight: 15 },
  { key: 'market', label: '시장 규모·성장성', weight: 12 },
  { key: 'differentiation', label: '차별성·해자', weight: 12 },
  { key: 'feasibility', label: '실행 가능성', weight: 10 },
  { key: 'business_model', label: '수익 모델·단위경제', weight: 12 },
  { key: 'gtm', label: '고객 획득 경로', weight: 12 },
  { key: 'timing', label: '타이밍', weight: 9 },
  { key: 'risk', label: '리스크·규제', weight: 9 },
  { key: 'scalability', label: '확장성', weight: 9 },
];

const TIERS = [
  { min: 80, verdict: '무죄', code: 'GO', meaning: '실행하라' },
  { min: 65, verdict: '조건부 무죄', code: 'GO-IF', meaning: '조건을 이행하면 실행하라' },
  { min: 50, verdict: '집행유예', code: 'PIVOT', meaning: '피벗하거나 검증한 뒤 재심하라' },
  { min: -Infinity, verdict: '유죄', code: 'NO-GO', meaning: '현재 형태로는 기각한다' },
];

const VOTES = ['GO', 'PIVOT', 'NO-GO'];
const BALLOT_FILE = /^06-배심원-(\d+)\.json$/;
const QUORUM = 3;
const RESCUE_MIN_SCORE = 35;

const round1 = (x) => Math.round(x * 10) / 10;
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const stdev = (xs) => {
  const m = mean(xs);
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
};

function readJson(file) {
  // 배심원이 코드 블록 표시를 붙여 썼어도 읽을 수 있게 한다.
  const text = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').trim();
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return JSON.parse(fenced ? fenced[1] : text);
}

function normalizeVote(v) {
  const s = String(v ?? '').toUpperCase().replace(/[\s_]/g, '');
  if (s === 'GO') return 'GO';
  if (s === 'PIVOT') return 'PIVOT';
  if (s === 'NO-GO' || s === 'NOGO') return 'NO-GO';
  return null;
}

function loadCourt(caseDir) {
  const file = path.join(caseDir, '00-법정구성.json');
  if (!fs.existsSync(file)) return null;
  try {
    return readJson(file);
  } catch {
    return null;
  }
}

function loadBallots(caseDir, court) {
  const jurorInfo = new Map((court?.roles?.jurors ?? []).map((j) => [Number(j.no), j]));
  const ballots = [];
  const rejected = [];

  for (const name of fs.readdirSync(caseDir).sort()) {
    const m = name.match(BALLOT_FILE);
    if (!m) continue;
    const no = Number(m[1]);
    let raw;
    try {
      raw = readJson(path.join(caseDir, name));
    } catch (e) {
      rejected.push({ file: name, reason: `JSON을 읽을 수 없음: ${e.message}` });
      continue;
    }

    const problems = [];
    const scores = {};
    for (const c of CRITERIA) {
      const s = Number(raw?.scores?.[c.key]);
      if (!Number.isInteger(s) || s < 1 || s > 10) problems.push(`${c.key}=${raw?.scores?.[c.key]}`);
      else scores[c.key] = s;
    }
    const vote = normalizeVote(raw?.vote);
    if (!vote) problems.push(`vote=${raw?.vote}`);
    if (problems.length) {
      rejected.push({ file: name, reason: `잘못된 값: ${problems.join(', ')}` });
      continue;
    }

    const info = jurorInfo.get(no) ?? {};
    ballots.push({
      no,
      persona: info.persona ?? null,
      model: info.model ?? null,
      scores,
      total: round1(CRITERIA.reduce((sum, c) => sum + scores[c.key] * c.weight, 0) / 10),
      vote,
      reason: raw.reason ?? '',
      top_concern: raw.top_concern ?? '',
      condition: raw.condition ?? '',
      persuaded_by: raw.persuaded_by ?? '',
      revised: Boolean(raw.revision_note),
      revision_note: raw.revision_note ?? null,
    });
  }
  return { ballots, rejected };
}

function tally(caseDir) {
  const court = loadCourt(caseDir);
  const { ballots, rejected } = loadBallots(caseDir, court);
  const n = ballots.length;
  if (n < QUORUM) {
    const err = new Error(`배심원 정족수 미달: 유효한 평결표 ${n}장 (최소 ${QUORUM}장 필요)`);
    err.rejected = rejected;
    throw err;
  }

  const totals = ballots.map((b) => b.total).sort((a, b) => a - b);
  const trimmed = n >= 5 ? totals.slice(1, -1) : totals;
  const finalScore = round1(mean(trimmed));
  const spread = round1(stdev(totals));

  const fatalThreshold = Math.max(2, Math.ceil(n / 3));
  const criteria = CRITERIA.map((c) => {
    const xs = ballots.map((b) => b.scores[c.key]);
    const lowCount = xs.filter((s) => s <= 3).length;
    return {
      key: c.key,
      label: c.label,
      weight: c.weight,
      mean: round1(mean(xs)),
      min: Math.min(...xs),
      max: Math.max(...xs),
      low_count: lowCount,
      fatal: lowCount >= fatalThreshold,
    };
  });
  const fatalFlaws = criteria.filter((c) => c.fatal).map((c) => c.label);

  const votes = Object.fromEntries(VOTES.map((v) => [v, ballots.filter((b) => b.vote === v).length]));

  // 점수와 배심원의 표가 정면으로 어긋나는 판결을 막는 상한·하한 규칙 (rubric.md 4번)
  let tierIndex = TIERS.findIndex((t) => finalScore >= t.min);
  const baseTier = TIERS[tierIndex];
  const rules = [];
  if (fatalFlaws.length && tierIndex < 1) {
    tierIndex = 1;
    rules.push(`치명적 결함(${fatalFlaws.join(', ')}) → 최고 ${TIERS[1].verdict}`);
  }
  if (votes['NO-GO'] > n / 2 && tierIndex < 2) {
    tierIndex = 2;
    rules.push(`NO-GO 과반(${votes['NO-GO']}/${n}) → 최고 ${TIERS[2].verdict}`);
  }
  const keepVotes = votes.GO + votes.PIVOT;
  if (keepVotes > n / 2 && finalScore >= RESCUE_MIN_SCORE && tierIndex > 2) {
    tierIndex = 2;
    rules.push(`GO·PIVOT 과반(${keepVotes}/${n}) → 최저 ${TIERS[2].verdict}`);
  }
  const tier = TIERS[tierIndex];

  const consensus = spread < 8 ? '높음' : spread < 15 ? '보통' : '의견 분열';

  const byModel = {};
  for (const b of ballots) {
    if (!b.model) continue;
    (byModel[b.model] ??= []).push(b.total);
  }
  const modelBreakdown = Object.entries(byModel).map(([model, xs]) => ({
    model,
    jurors: xs.length,
    mean_total: round1(mean(xs)),
  }));

  return {
    case_no: court?.case_no ?? null,
    title: court?.title ?? null,
    jurors_valid: n,
    rejected,
    final_score: finalScore,
    trimmed: n >= 5,
    base_verdict: baseTier.verdict,
    verdict: tier.verdict,
    verdict_code: tier.code,
    verdict_meaning: tier.meaning,
    rules_applied: rules,
    votes,
    stdev: spread,
    consensus,
    fatal_threshold: fatalThreshold,
    fatal_flaws: fatalFlaws,
    criteria,
    model_breakdown: modelBreakdown.length > 1 ? modelBreakdown : [],
    ballots,
  };
}

function summaryMarkdown(r) {
  const lines = [];
  lines.push(`## 평결 집계${r.case_no ? ` — ${r.case_no}` : ''}`);
  lines.push('');
  lines.push(`- **주문: ${r.verdict}** (${r.verdict_code}, ${r.verdict_meaning})`);
  lines.push(
    `- 최종 점수 **${r.final_score}** / 100${r.trimmed ? ' (최고·최저 1명씩 제외한 절사평균)' : ''} · 유효 평결표 ${r.jurors_valid}장`,
  );
  lines.push(`- 표결 GO ${r.votes.GO} · PIVOT ${r.votes.PIVOT} · NO-GO ${r.votes['NO-GO']}`);
  lines.push(`- 합의도 ${r.consensus} (표준편차 ${r.stdev})`);
  if (r.rules_applied.length) lines.push(`- 상한·하한 규칙 적용: 기본 등급 ${r.base_verdict} → ${r.rules_applied.join('; ')}`);
  if (r.fatal_flaws.length) lines.push(`- 치명적 결함: ${r.fatal_flaws.join(', ')} (3점 이하 ${r.fatal_threshold}명 이상)`);
  if (r.rejected.length) lines.push(`- 무효 처리된 평결표: ${r.rejected.map((x) => `${x.file} (${x.reason})`).join('; ')}`);
  lines.push('');
  lines.push('| 기준 | 가중치 | 평균 | 최저 | 최고 | 3점 이하 |');
  lines.push('|---|---|---|---|---|---|');
  for (const c of r.criteria) {
    lines.push(`| ${c.label}${c.fatal ? ' ⚠️' : ''} | ${c.weight} | ${c.mean} | ${c.min} | ${c.max} | ${c.low_count} |`);
  }
  lines.push('');
  lines.push('| 배심원 | 페르소나 | 모델 | 총점 | 표결 | 가장 큰 우려 |');
  lines.push('|---|---|---|---|---|---|');
  for (const b of r.ballots) {
    const concern = String(b.top_concern).replace(/\|/g, '/').replace(/\n/g, ' ');
    lines.push(`| ${b.no}${b.revised ? ' (평의 후 수정)' : ''} | ${b.persona ?? '-'} | ${b.model ?? '-'} | ${b.total} | ${b.vote} | ${concern} |`);
  }
  if (r.model_breakdown.length) {
    lines.push('');
    lines.push(`모델별 배심원 평균: ${r.model_breakdown.map((m) => `${m.model} ${m.mean_total} (${m.jurors}명)`).join(' · ')}`);
  }
  return lines.join('\n');
}

function writeBrief(caseDir) {
  const { ballots } = loadBallots(caseDir, null);
  // 페르소나·모델·번호를 지우고 순서를 섞는다. 평의에서 '누가' 말했는지에 끌려가지 않게 하기 위해서다.
  const shuffled = ballots
    .map((b) => ({ b, k: Math.random() }))
    .sort((x, y) => x.k - y.k)
    .map((x) => x.b);
  const lines = ['# 평의 자료 — 익명 평결 요약', '', '배심원 이름·페르소나·모델은 지웠고 순서는 섞었다.', ''];
  lines.push(`| 배심원 | ${CRITERIA.map((c) => c.label).join(' | ')} | 총점 | 표결 |`);
  lines.push(`|---|${CRITERIA.map(() => '---').join('|')}|---|---|`);
  shuffled.forEach((b, i) => {
    const id = String.fromCharCode(65 + i);
    lines.push(`| ${id} | ${CRITERIA.map((c) => b.scores[c.key]).join(' | ')} | ${b.total} | ${b.vote} |`);
  });
  lines.push('');
  shuffled.forEach((b, i) => {
    const id = String.fromCharCode(65 + i);
    lines.push(`## 배심원 ${id}`);
    lines.push(`- 이유: ${b.reason}`);
    lines.push(`- 가장 큰 우려: ${b.top_concern}`);
    lines.push(`- GO가 되려면: ${b.condition}`);
    lines.push('');
  });
  const out = path.join(caseDir, '06b-평의자료.md');
  fs.writeFileSync(out, lines.join('\n'), 'utf8');
  console.log(`평의 자료 작성: ${out} (평결표 ${ballots.length}장)`);
}

function writeBundle(caseDir) {
  const court = loadCourt(caseDir);
  const parts = [`# 재판기록${court?.case_no ? ` — ${court.case_no}` : ''}${court?.title ? ` 「${court.title}」` : ''}`, ''];

  if (court?.roles) {
    const r = court.roles;
    parts.push('## 법정 구성', '', '| 역할 | 배정 | 모델 |', '|---|---|---|');
    if (r.judge) parts.push(`| 재판장 | - | ${r.judge.model ?? '세션 기본'} |`);
    if (r.prosecutor) parts.push(`| 검사 | - | ${r.prosecutor.model ?? '세션 기본'} |`);
    if (r.defense) parts.push(`| 변호인 | - | ${r.defense.model ?? '세션 기본'} |`);
    for (const w of r.witnesses ?? []) parts.push(`| 증인 ${w.no} | ${w.persona} | ${w.model ?? '세션 기본'} |`);
    for (const j of r.jurors ?? []) parts.push(`| 배심원 ${j.no} | ${j.persona} | ${j.model ?? '세션 기본'} |`);
    parts.push('');
  }

  const tallyFile = path.join(caseDir, '07-평결집계.json');
  const files = fs
    .readdirSync(caseDir)
    .filter((f) => f.endsWith('.md') && f !== '재판기록.md')
    .sort();
  let tallyInserted = false;
  const insertTally = () => {
    if (tallyInserted || !fs.existsSync(tallyFile)) return;
    parts.push(summaryMarkdown(readJson(tallyFile)), '', '---', '');
    tallyInserted = true;
  };
  for (const f of files) {
    if (f.startsWith('08')) insertTally();
    parts.push(fs.readFileSync(path.join(caseDir, f), 'utf8').trim(), '', '---', '');
  }
  insertTally();

  const out = path.join(caseDir, '재판기록.md');
  fs.writeFileSync(out, parts.join('\n'), 'utf8');
  console.log(`재판기록 작성: ${out}`);
}

function main() {
  const [caseDir, flag] = process.argv.slice(2);
  if (!caseDir || !fs.existsSync(caseDir) || !fs.statSync(caseDir).isDirectory()) {
    console.error('사용법: node verdict.mjs <사건폴더> [--brief | --bundle]');
    process.exit(1);
  }
  if (flag === '--brief') return writeBrief(caseDir);
  if (flag === '--bundle') return writeBundle(caseDir);

  try {
    const result = tally(caseDir);
    fs.writeFileSync(path.join(caseDir, '07-평결집계.json'), JSON.stringify(result, null, 2), 'utf8');
    console.log(summaryMarkdown(result));
  } catch (e) {
    console.error(e.message);
    for (const x of e.rejected ?? []) console.error(`- ${x.file}: ${x.reason}`);
    process.exit(2);
  }
}

main();
