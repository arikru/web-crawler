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

module.exports = {
  normalizeURL,
};
