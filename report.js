function printReport(pages) {
  const sortable = [];
  for (const page in pages) {
    sortable.push([page, pages[page]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  for (let item of sortable) {
    console.log(`Found ${item[1]} internal links to ${item[0]}`);
  }
}

export { printReport };
