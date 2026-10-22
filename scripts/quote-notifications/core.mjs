export const PROJECT_URL = 'https://mdneuvnqwcorvinvtawp.supabase.co';
export const ROOMS = Object.freeze(['office_work', 'office_storage']);
export const EXPECTED_CHAT_IDS = Object.freeze({
  office_work: '454187776626525',
  office_storage: '477805913791340',
});

export function isQuietTime(now = new Date()) {
  const hour = Number(new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul', hour: '2-digit', hourCycle: 'h23',
  }).format(now));
  return hour >= 23 || hour < 7;
}

export function initialState(now = new Date()) {
  return { version: 1, activatedAt: now.toISOString(), cursor: null, pending: null };
}

function validTimestamp(value) {
  return typeof value === 'string'
    && /^\d{4}-\d{2}-\d{2}T[\d:.]+(?:Z|\+00:00)$/.test(value)
    && Number.isFinite(Date.parse(value));
}

function validId(value) {
  return typeof value === 'string'
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function validateState(state) {
  if (state?.version !== 1 || !validTimestamp(state.activatedAt)) {
    throw new Error('invalid_state');
  }
  if (state.cursor && (!validTimestamp(state.cursor.createdAt) || !validId(state.cursor.id))) {
    throw new Error('invalid_cursor');
  }
  if (state.pending) {
    if (!validId(state.pending.id) || !validTimestamp(state.pending.createdAt)
      || !state.pending.rooms || ROOMS.some(room =>
        !['pending', 'sending', 'sent', 'uncertain'].includes(state.pending.rooms[room]))) {
      throw new Error('invalid_pending');
    }
  }
  return state;
}

export function buildPollUrl(state) {
  validateState(state);
  const url = new URL('/rest/v1/quote_requests', PROJECT_URL);
  url.searchParams.set('select', [
    'id', 'created_at', 'destination_text', 'start_date', 'end_date',
    'adults', 'children', 'infants', 'hotel_grade', 'requested_services',
    'budget_krw', 'customer_name', 'phone', 'kakao_id', 'email', 'message', 'privacy_agreed',
  ].join(','));
  url.searchParams.set('created_at', `gte.${state.activatedAt}`);
  if (state.cursor) {
    const { id, createdAt } = state.cursor;
    url.searchParams.set('or', `(created_at.gt.${createdAt},and(created_at.eq.${createdAt},id.gt.${id}))`);
  }
  url.searchParams.set('order', 'created_at.asc,id.asc');
  url.searchParams.set('limit', '20');
  return url;
}

function text(value, limit = 300) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000b-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g, '')
    .trim().slice(0, limit) || '미입력';
}

export function formatQuote(row) {
  return [
    '[EXITour 홈페이지 견적 접수]',
    '결제·예약 확정이 아닌 상담 요청입니다.',
    `접수번호: ${text(row.id, 36)}`,
    `이름: ${text(row.customer_name, 100)}`,
    `여행지: ${text(row.destination_text)}`,
    `일정: ${text(row.start_date, 10)} ~ ${text(row.end_date, 10)}`,
    `인원: 성인 ${Number(row.adults) || 0} / 아동 ${Number(row.children) || 0} / 유아 ${Number(row.infants) || 0}`,
    `연락처: ${text(row.phone, 100)}`,
    `카카오톡 ID: ${text(row.kakao_id, 100)}`,
    `이메일: ${text(row.email, 254)}`,
    `호텔 등급: ${text(row.hotel_grade, 100)}`,
    `요청 서비스: ${text(Array.isArray(row.requested_services) ? row.requested_services.join(', ') : '')}`,
    `예산: ${row.budget_krw == null ? '미입력' : `${Number(row.budget_krw).toLocaleString('ko-KR')}원`}`,
    `문의 내용:\n${text(row.message, 2200)}`,
    '고객 정보는 견적 상담 목적으로만 사용해 주세요.',
  ].join('\n');
}

// Persist intent before calling Kakao: a crash after delivery must not cause an automatic duplicate.
export async function deliverQuote(state, row, { save, send, now = () => new Date() }) {
  validateState(state);
  if (!validId(row.id) || !validTimestamp(row.created_at)) throw new Error('invalid_row');
  if (!state.pending) {
    state.pending = { id: row.id, createdAt: row.created_at,
      rooms: Object.fromEntries(ROOMS.map(room => [room, 'pending'])) };
    await save(state);
  }
  if (state.pending.id !== row.id) throw new Error('pending_row_missing');
  if (Object.values(state.pending.rooms).some(status => ['sending', 'uncertain'].includes(status))) {
    return { status: 'needs_review', sent: 0 };
  }
  if (row.privacy_agreed !== true) {
    state.cursor = { id: row.id, createdAt: row.created_at };
    state.pending = null;
    await save(state);
    return { status: 'ignored_without_consent', sent: 0 };
  }
  let sent = 0;
  for (const room of ROOMS) {
    if (state.pending.rooms[room] === 'sent') continue;
    if (isQuietTime(now())) return { status: 'quiet', sent };
    state.pending.rooms[room] = 'sending';
    await save(state);
    let result;
    try {
      result = await send(room, formatQuote(row));
    } catch {
      result = { status: 'uncertain' };
    }
    state.pending.rooms[room] = result?.status === 'sent' ? 'sent'
      : result?.status === 'not_sent' ? 'pending' : 'uncertain';
    await save(state);
    if (state.pending.rooms[room] !== 'sent') {
      return { status: state.pending.rooms[room] === 'pending' ? 'retry' : 'needs_review', sent };
    }
    sent++;
  }
  state.cursor = { id: row.id, createdAt: row.created_at };
  state.pending = null;
  await save(state);
  return { status: 'delivered', sent };
}
