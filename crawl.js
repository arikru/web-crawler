import { JSDOM } from "jsdom";

async function crawlPage(baseURL, currentURL, pages = {}) {
  //console.log("Parsing baseURL ...");
  const parsedBaseURL = new URL(baseURL);
  //console.log(`Parsed baseURL: ${parsedBaseURL}`);
  const parsedCurrentURL = new URL(currentURL);
  if (parsedBaseURL.host !== parsedCurrentURL.host) {
    return pages;
  }
  const normalizedURL = normalizeURL(currentURL);
  if (normalizedURL in pages) {
    pages[normalizedURL] = pages[normalizedURL] + 1;
    return pages;
  } else {
    pages[normalizedURL] = 1;
  }
  const htmlContent = await fetchCurrentURL(currentURL);
  //console.log(htmlContent);
  const urlList = getURLsFromHTML(htmlContent, baseURL);
  for (let url of urlList) {
    //console.log(pages);
    pages = await crawlPage(baseURL, url, (pages = pages));
  }
  return pages;
}

async function fetchCurrentURL(currentURL) {
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
    return html;
  } catch (error) {
    console.error(`Error occured: ${error.message}`);
    return;
  }
}

function getURLsFromHTML(html, baseURL) {
  const dom = new JSDOM(html);
  const nodes = dom.window.document.querySelectorAll("a");
  const urlList = [];
  for (const node of nodes) {
    if (node.hasAttribute("href")) {
      let href = node.getAttribute("href");

      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href;
        urlList.push(href);
      } catch (err) {
        console.log(`${err.message}: ${href}`);
      }
    }
  }

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
