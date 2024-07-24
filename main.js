import { argv } from "node:process";
import { crawlPage } from "./crawl.js";

async function main() {
  if (argv.length === 3) {
    const baseURL = argv[2];
    console.log(`Start crawlin' ${baseURL} ...`);
    const pages = await crawlPage(baseURL, baseURL);
    console.log(pages);
  } else {
    throw new Error(
      `Wrong number of args: ${argv.length - 2} provided but 1 expected`,
    );
  }
}

main();
