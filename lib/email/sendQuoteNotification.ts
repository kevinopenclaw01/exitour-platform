import nodemailer from "nodemailer";

export type QuoteNotificationPayload = {
  destination_text: string;
  start_date: string;
  end_date: string;
  adults: number;
  children?: number;
  infants?: number;
  requested_services?: string[];
  customer_name: string;
  phone?: string;
  kakao_id?: string;
  message?: string;
};

const formatPeople = (quote: QuoteNotificationPayload) =>
  `성인 ${quote.adults}, 아동 ${quote.children ?? 0}, 유아 ${quote.infants ?? 0}`;

const formatServices = (services: string[] | undefined) =>
  services && services.length > 0 ? services.join(", ") : "선택 없음";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getEmailConfig = () => {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!host || !Number.isInteger(port) || !user || !pass || !adminEmail) {
    return null;
  }

  return { host, port, user, pass, adminEmail };
};

export async function sendQuoteNotification(quote: QuoteNotificationPayload) {
  const config = getEmailConfig();

  if (!config) {
    console.error("Quote notification email skipped: SMTP environment variables are incomplete.");
    return { ok: false, reason: "missing_config" as const };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const subject = `[EXITour] 신규 견적 요청 - ${quote.customer_name}`;
  const safe = {
    customerName: escapeHtml(quote.customer_name),
    destination: escapeHtml(quote.destination_text),
    dates: escapeHtml(`${quote.start_date} - ${quote.end_date}`),
    people: escapeHtml(formatPeople(quote)),
    phone: escapeHtml(quote.phone ?? "-"),
    kakaoId: escapeHtml(quote.kakao_id ?? "-"),
    services: escapeHtml(formatServices(quote.requested_services)),
    message: escapeHtml(quote.message ?? "-"),
  };
  const text = [
    "신규 견적 요청이 접수되었습니다.",
    "",
    `이름: ${quote.customer_name}`,
    `여행지: ${quote.destination_text}`,
    `날짜: ${quote.start_date} - ${quote.end_date}`,
    `인원: ${formatPeople(quote)}`,
    `연락처: ${quote.phone ?? "-"}`,
    `카카오톡 ID: ${quote.kakao_id ?? "-"}`,
    `요청 서비스: ${formatServices(quote.requested_services)}`,
    "",
    "문의 내용:",
    quote.message ?? "-",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin: 0 0 16px;">신규 견적 요청이 접수되었습니다.</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          <tr><th align="left" style="padding: 8px; border-bottom: 1px solid #e2e8f0;">이름</th><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${safe.customerName}</td></tr>
          <tr><th align="left" style="padding: 8px; border-bottom: 1px solid #e2e8f0;">여행지</th><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${safe.destination}</td></tr>
          <tr><th align="left" style="padding: 8px; border-bottom: 1px solid #e2e8f0;">날짜</th><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${safe.dates}</td></tr>
          <tr><th align="left" style="padding: 8px; border-bottom: 1px solid #e2e8f0;">인원</th><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${safe.people}</td></tr>
          <tr><th align="left" style="padding: 8px; border-bottom: 1px solid #e2e8f0;">연락처</th><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${safe.phone}</td></tr>
          <tr><th align="left" style="padding: 8px; border-bottom: 1px solid #e2e8f0;">카카오톡 ID</th><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${safe.kakaoId}</td></tr>
          <tr><th align="left" style="padding: 8px; border-bottom: 1px solid #e2e8f0;">요청 서비스</th><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${safe.services}</td></tr>
        </tbody>
      </table>
      <h3 style="margin: 20px 0 8px;">문의 내용</h3>
      <p style="white-space: pre-wrap; margin: 0;">${safe.message}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"EXITour" <${config.user}>`,
    to: config.adminEmail,
    subject,
    text,
    html,
  });

  return { ok: true as const };
}
