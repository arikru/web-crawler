import { JSDOM } from "jsdom";

async function crawlPage(currentURL) {
  try {
    const result = await fetch(currentURL);
    if (!result.ok) {
      throw new Error(`Error while crawling ${currentURL}; Status not 200-299`);
    }
    if (result.status > 400) {
      console.error(`Error occured: ${result.status}`);
      return;
    }
    const contentType = result.headers.get("content-type");

    if (!contentType.startsWith("text/html")) {
      console.log(`Error: content-type is ${contentType}`);
      return;
    }
    const html = await result.text();
    console.log(html);
  } catch (error) {
    console.error(`Error occured: ${error.message}`);
    return;
  }
}

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

export { normalizeURL, getURLsFromHTML, crawlPage };
