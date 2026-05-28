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

// Order ID format: rebelle-YYMMDD-XXXX (e.g. rebelle-260528-4827).
// Sortable by date and unique enough for COD volume.
export function generateOrderId(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const seq = Math.floor(Math.random() * 9000) + 1000;
  return `rebelle-${yy}${mm}${dd}-${seq}`;
}
