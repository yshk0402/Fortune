import rawContent from "../content/content.json";

type FreeContent = {
  year_summary: string;
  failure_patterns: string[];
  anxiety_line: string;
  cta_text: string;
};

type PaidContent = {
  avoidance_actions: string[];
  caution_months: string[];
  difficult_types: string[];
  relief_text: string;
};

export type ContentEntry = {
  free: FreeContent;
  paid: PaidContent;
};

type ContentData = {
  default: ContentEntry;
  [rokumeiId: string]: Record<string, ContentEntry> | ContentEntry;
};

const contentData = rawContent as ContentData;

export function getContent(rokumeiId: number, mbti: string): ContentEntry {
  const rokumeiKey = String(rokumeiId);
  const mbtiKey = mbti.toUpperCase();
  const byRokumei = contentData[rokumeiKey] as Record<string, ContentEntry> | undefined;
  return byRokumei?.[mbtiKey] ?? contentData.default;
}
