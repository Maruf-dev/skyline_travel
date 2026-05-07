import { describe, it, expect } from "vitest";
import { formatPrice, formatDate } from "./format";

describe("formatPrice", () => {
  it("formats a USD price for English locale", () => {
    expect(formatPrice("$320", "en")).toMatch(/\$320/);
  });

  it("formats a USD price for Russian locale (currency suffix)", () => {
    const result = formatPrice("$320", "ru");
    expect(result).toMatch(/320/);
  });

  it("returns the original string for unparseable input", () => {
    expect(formatPrice("free", "en")).toBe("free");
  });

  it("strips commas from the amount before parsing", () => {
    expect(formatPrice("$1,200", "en")).toMatch(/1[,\s]?200/);
  });
});

describe("formatDate", () => {
  it("formats an English date string", () => {
    const result = formatDate("Apr 2, 2025", "en");
    expect(result).toMatch(/Apr/);
    expect(result).toMatch(/2025/);
  });

  it("formats the same date in Russian", () => {
    const result = formatDate("Apr 2, 2025", "ru");
    expect(result).toMatch(/2025/);
  });

  it("returns the original string when input is unparseable", () => {
    expect(formatDate("not-a-date", "en")).toBe("not-a-date");
  });
});
