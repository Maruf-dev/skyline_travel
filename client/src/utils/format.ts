import type { Lang } from "../types";

const LOCALE_BY_LANG: Record<Lang, string> = {
  en: "en-US",
  ru: "ru-RU",
  uz: "uz-UZ",
};

export function formatPrice(priceStr: string, lang: Lang = "en"): string {
  const match = String(priceStr).match(/^(\$|€|£)?\s*([\d,.]+)/);
  if (!match) return priceStr;

  const symbol = match[1] ?? "$";
  const amount = Number(match[2].replace(/,/g, ""));
  if (Number.isNaN(amount)) return priceStr;

  const currency = "USD";
  const locale = LOCALE_BY_LANG[lang] ?? "en-US";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${symbol}${amount}`;
  }
}

export function formatDate(dateStr: string, lang: Lang = "en"): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  const locale = LOCALE_BY_LANG[lang] ?? "en-US";
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
}
