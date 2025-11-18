import { Command } from "commander";
import { crawlSite } from "../core/crawler.js";

const program = new Command();

program
  .name("check-norris")
  .description(
    "Website QA automation tool that roundhouse-kicks inconsistencies.",
  )
  .version("0.1.0");

program
  .command("crawl")
  .description("Crawl a website and list discovered internal URLs")
  .argument("<url>", "Root website URL")
  .option("-m, --max <number>", "Maximum pages to crawl", "50")
  .action(async (url, options) => {
    const result = await crawlSite(url, parseInt(options.max));
    console.log("\n📍 Pages Found:");
    result.pages.forEach((p) => {
      console.log("URL:" + p.url + "\n");
      console.log("Status:" + p.status + "\n");
      console.log("Title:" + p.title + "\n\n");
    });
  });

program.parse();
