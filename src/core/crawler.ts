import { chromium } from "playwright";

export async function crawlSite(startUrl: string, maxPages: number = 50) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const queue: string[] = [startUrl];
  const visited = new Set<string>();
  const origin = new URL(startUrl).origin;

  while (queue.length && visited.size < maxPages) {
    const url = queue.shift()!;
    if (visited.has(url)) continue;

    try {
      await page.goto(url, { waitUntil: "networkidle" });
      visited.add(url);
      console.log(`🕷 Crawled: ${url}`);

      //get links here. add in queue
      const links = await page.$$eval("a[href]", (as) =>
        as.map((a) => (a as HTMLAnchorElement).href),
      );

      links.forEach((link) => {
        if (link.startsWith(origin) && !visited.has(link)) {
          queue.push(link);
        }
      });
    } catch {
      console.warn(`Error loading page ${url}`);
    }
  }

  await browser.close();
  return Array.from(visited);
}
