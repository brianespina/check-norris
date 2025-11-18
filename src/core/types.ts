export interface CrawledPage {
  url: string;
  status: number;
  html: string;
  title?: string;
}

export interface CrawlResult {
  rootUrl: string;
  visited: string[];
  pages: CrawledPage[];
}
