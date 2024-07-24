import { JSDOM } from "jsdom";

function getURLsFromHTML(html, baseURL) {
  const dom = new JSDOM(html);
  const parsedURL = new URL(baseURL);
  const nodes = dom.window.document.querySelectorAll("a");
  const urlList = [];
  nodes.forEach(function (node) {
    if (node.toString().startsWith("/")) {
      urlList.push(`${parsedURL.protocol}//${parsedURL.host}${node}`);
    } else {
      urlList.push(node.href);
    }
  });
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
