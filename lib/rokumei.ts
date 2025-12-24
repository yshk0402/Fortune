const BASE_DATE_UTC = Date.UTC(1900, 0, 1);
const DAY_MS = 24 * 60 * 60 * 1000;

const ROKUMEI_NAMES = [
  "金星人＋",
  "金星人－",
  "木星人＋",
  "木星人－",
  "水星人＋",
  "水星人－",
  "火星人＋",
  "火星人－",
  "土星人＋",
  "土星人－",
  "天王星人＋",
  "天王星人－",
];

export function getRokumeiId(birthdate: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
    return null;
  }

  const [year, month, day] = birthdate.split("-").map(Number);
  const birthUtc = Date.UTC(year, month - 1, day);
  if (Number.isNaN(birthUtc)) {
    return null;
  }

  const days = Math.floor((birthUtc - BASE_DATE_UTC) / DAY_MS);
  const mod = ((days % 12) + 12) % 12;
  return mod + 1;
}

export function getRokumeiName(rokumeiId: number): string | null {
  return ROKUMEI_NAMES[rokumeiId - 1] ?? null;
}
