import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECT_URL, ROOMS, initialState, validateState, isQuietTime,
  buildPollUrl, formatQuote, deliverQuote } from './core.mjs';

const daytime = () => new Date('2026-10-22T03:00:00Z');
const row = {
  id: '00000000-0000-4000-8000-000000000001', created_at: '2026-10-22T03:01:00.123456+00:00',
  privacy_agreed: true, customer_name: '연동 시험', destination_text: '시험 여행지', adults: 4,
  message: '[자동 입력 정보]\n상품명: 시험 상품\n유입 페이지: /test\n[고객 문의 내용]\n시험입니다.',
};
const state = () => initialState(daytime());
const deps = (send) => ({ now: daytime, send, save: async () => {} });

test('KST quiet hours include 23:00 and exclude 07:00', () => {
  assert.equal(isQuietTime(new Date('2026-10-22T14:00:00Z')), true);
  assert.equal(isQuietTime(new Date('2026-10-22T21:59:59Z')), true);
  assert.equal(isQuietTime(new Date('2026-10-22T22:00:00Z')), false);
  assert.equal(isQuietTime(new Date('2026-10-22T13:59:59Z')), false);
});
test('poll reads only approved project and future quotes with stable ordering', () => {
  const url = buildPollUrl(state());
  assert.equal(url.origin, PROJECT_URL);
  assert.equal(url.pathname, '/rest/v1/quote_requests');
  assert.equal(url.searchParams.get('created_at'), 'gte.2026-10-22T03:00:00.000Z');
  assert.equal(url.searchParams.get('order'), 'created_at.asc,id.asc');
  assert.equal(url.searchParams.get('limit'), '20');
});
test('microsecond cursor retained and same timestamp ordered by id', () => {
  const s = state();
  s.cursor = { id: row.id, createdAt: row.created_at };
  assert.match(buildPollUrl(s).searchParams.get('or'), /123456\+00:00/);
  assert.match(buildPollUrl(s).searchParams.get('or'), /id\.gt\./);
});
test('reject malformed cursor rather than interpolating filters', () => {
  const s = state();
  s.cursor = { id: 'bad,id.gt.anything', createdAt: row.created_at };
  assert.throws(() => buildPollUrl(s), /invalid_cursor/);
});
test('formatter keeps prefill and labels as quote, not confirmed order', () => {
  const message = formatQuote(row);
  assert.match(message, /홈페이지 견적 접수/);
  assert.match(message, /결제·예약 확정이 아닌/);
  assert.match(message, /상품명: 시험 상품/);
  assert.match(message, /유입 페이지: \/test/);
  assert.match(message, /성인 4/);
});
test('formatter bounds untrusted text and strips directional control characters', () => {
  const message = formatQuote({ ...row, customer_name: '\u202e' + 'x'.repeat(1000), message: 'a'.repeat(10000) });
  assert.ok(message.length < 4000);
  assert.ok(!message.includes('\u202e'));
});
test('only the two approved aliases receive and checkpoint follows both', async () => {
  const s = state();
  const calls = [];
  const result = await deliverQuote(s, row, deps(async room => { calls.push(room); return { status: 'sent' }; }));
  assert.deepEqual(calls, ROOMS);
  assert.equal(result.status, 'delivered');
  assert.equal(s.cursor.id, row.id);
  assert.equal(s.pending, null);
});
test('failed preflight retries only unsent room, never successful first room', async () => {
  const s = state();
  const calls = [];
  await deliverQuote(s, row, deps(async room => {
    calls.push(room);
    return { status: room === ROOMS[0] ? 'sent' : 'not_sent' };
  }));
  assert.equal(s.cursor, null);
  await deliverQuote(s, row, deps(async room => { calls.push(room); return { status: 'sent' }; }));
  assert.deepEqual(calls, [ROOMS[0], ROOMS[1], ROOMS[1]]);
});
test('ambiguous delivery pauses instead of duplicating', async () => {
  const s = state();
  const first = await deliverQuote(s, row, deps(async () => { throw new Error('socket lost'); }));
  assert.equal(first.status, 'needs_review');
  let calls = 0;
  const again = await deliverQuote(s, row, deps(async () => { calls++; }));
  assert.equal(again.status, 'needs_review');
  assert.equal(calls, 0);
});
test('crashed sending marker requires review after restart', async () => {
  const s = state();
  s.pending = { id: row.id, createdAt: row.created_at, rooms: { office_work: 'sending', office_storage: 'pending' } };
  const result = await deliverQuote(s, row, deps(async () => assert.fail('must not send')));
  assert.equal(result.status, 'needs_review');
});
test('consent required even if a database policy mistakenly allows a row', async () => {
  const s = state();
  const result = await deliverQuote(s, { ...row, privacy_agreed: false }, deps(async () => assert.fail('must not send')));
  assert.equal(result.status, 'ignored_without_consent');
  assert.equal(s.pending, null);
  assert.equal(s.cursor.id, row.id);
});
test('check quiet time between room sends', async () => {
  const s = state();
  let calls = 0;
  const result = await deliverQuote(s, row, { save: async () => {},
    now: () => calls ? new Date('2026-10-22T14:00:00Z') : daytime(),
    send: async () => { calls++; return { status: 'sent' }; },
  });
  assert.equal(result.status, 'quiet');
  assert.equal(s.pending.rooms.office_work, 'sent');
  assert.equal(s.pending.rooms.office_storage, 'pending');
});
test('state contains no customer names, contact data or inquiry message', async () => {
  const s = state();
  const snapshots = [];
  await deliverQuote(s, row, { ...deps(async () => ({ status: 'sent' })), save: async x => snapshots.push(JSON.stringify(x)) });
  assert.ok(snapshots.every(x => !x.includes('연동 시험') && !x.includes('시험입니다.')));
});
test('state rejects missing room status and malformed activation timestamp', () => {
  assert.throws(() => validateState({ version: 1, activatedAt: 'bad' }), /invalid_state/);
  const s = state();
  s.pending = { id: row.id, createdAt: row.created_at, rooms: {} };
  assert.throws(() => validateState(s), /invalid_pending/);
});
test('save failure before send cannot cause any Kakao call', async () => {
  let calls = 0;
  await assert.rejects(deliverQuote(state(), row, {
    now: daytime, save: async () => { throw new Error('disk full'); }, send: async () => { calls++; },
  }), /disk full/);
  assert.equal(calls, 0);
});
