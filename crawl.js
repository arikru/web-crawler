import { JSDOM } from "jsdom";

function getURLsFromHTML(html) {
  const dom = new JSDOM(html);
  const nodes = dom.window.document.querySelectorAll("a");
  const urlList = [];
  nodes.forEach((node) => urlList.push(node.href));

  return urlList;
}

function normalizeURL(url) {
  if (url.trim() === "") {
    return "";
  }

  const parsedURL = new URL(url);
  const normURL = `${parsedURL.hostname}${parsedURL.pathname}`.replace(
    /\/$/,
    "",
  );
  return normURL;
}

export { normalizeURL, getURLsFromHTML };
