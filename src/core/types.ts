import type { Phone } from "../scanners/business/types.js";

export interface CrawledPage {
  url: string;
  status: number;
  phone: Phone[];
  title?: string;
}

export interface CrawlResult {
  rootUrl: string;
  visited: string[];
  pages: CrawledPage[];
}
