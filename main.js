import { argv } from "node:process";

function main() {
  if (argv.length === 3) {
    console.log(`Start crawlin' ${argv[2]} ...`);
  } else {
    throw new Error(
      `Wrong number of args: ${argv.length - 2} provided but 1 expected`,
    );
  }
}

main();
