import * as cheerio from "cheerio";
import type { Phone } from "./types.js";

export function extract_phone(html: string): Phone[] {
  const $ = cheerio.load(html);

  //find linked phones
  const linkedPhone: Phone[] = $("a[href^='tel:']")
    .map((_, el) => {
      const link = $(el).attr("href") || "";
      const data = $(el).text().trim();
      return {
        isLinked: true,
        data,
        link,
      };
    })
    .get();

  // find phones not linked
  const text = $("body").text();
  const phoneRegex =
    /(?:\(\d{3}\)\s?\d{3}[-\s]\d{4}|\d{3}[-\s]\d{3}[-\s]\d{4})/g;

  const matches = text.match(phoneRegex);
  const unlinkedPhones: Phone[] = matches
    ? matches?.map((p) => {
        return { isLinked: false, data: p.trim() };
      })
    : [];

  return [...unlinkedPhones, ...linkedPhone];
}
