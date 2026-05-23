export const MA_PHONE_REGEX = /^(\+212|212|0)(6|7)\d{8}$/;

export function validatePhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  return MA_PHONE_REGEX.test(cleaned);
}

export function normalizePhone(raw: string): string {
  let cleaned = raw.replace(/[\s\-().+]/g, "");
  if (cleaned.startsWith("00212")) cleaned = "212" + cleaned.slice(5);
  else if (cleaned.startsWith("212")) cleaned = cleaned;
  else if (cleaned.startsWith("0")) cleaned = "212" + cleaned.slice(1);
  return cleaned;
}

export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(Math.random() * 90000) + 10000;
  return `RB-${year}-${seq}`;
}
