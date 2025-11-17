import { chromium } from "playwright";
export async function crawlSite(startUrl, maxPages = 50) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const queue = [startUrl];
    const visited = new Set();
    const origin = new URL(startUrl).origin;
    while (queue.length && visited.size < maxPages) {
        const url = queue.shift();
        if (visited.has(url))
            continue;
        try {
            await page.goto(url, { waitUntil: "networkidle" });
            visited.add(url);
            console.log(`🕷 Crawled: ${url}`);
            //get links here. add in queue
            const links = await page.$$eval("a[href]", (as) => as.map((a) => a.href));
            links.forEach((link) => {
                if (link.startsWith(origin) && !visited.has(link)) {
                    queue.push(link);
                }
            });
        }
        catch {
            console.warn(`Error loading page ${url}`);
        }
    }
    await browser.close();
    return Array.from(visited);
}
//# sourceMappingURL=crawler.js.map