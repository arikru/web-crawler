import { argv } from "node:process";
import { crawlPage } from "./crawl.js";

function main() {
  if (argv.length === 3) {
    const baseURL = argv[2];
    console.log(`Start crawlin' ${baseURL} ...`);
    crawlPage(baseURL);
  } else {
    throw new Error(
      `Wrong number of args: ${argv.length - 2} provided but 1 expected`,
    );
  }
}

main();
