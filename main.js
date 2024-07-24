import { argv } from "node:process";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  if (argv.length === 3) {
    const baseURL = argv[2];
    console.log(`Start crawlin' ${baseURL} ...`);
    const pages = await crawlPage(baseURL, baseURL);
    printReport(pages);
  } else {
    throw new Error(
      `Wrong number of args: ${argv.length - 2} provided but 1 expected`,
    );
  }
}

main();
