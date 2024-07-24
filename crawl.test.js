import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test("removes https://", () => {
  expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("removes https:// and forward slash after path", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path",
  );
});

test("removes http://", () => {
  expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("removes http:// and forward slash after path", () => {
  expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test("Empty URL should return empty string (I guess?)", () => {
  expect(normalizeURL("")).toBe("");
});

test("Test relative to absolute URL", () => {
  const test_string = `<html>
    <body>
        <a href="/v1.html"><span>Go to Boot.dev/v1.html</span></a>
    </body>
</html>`;
  const result = getURLsFromHTML(test_string, "https://boot.dev");
  expect(result).toStrictEqual(["https://boot.dev/v1.html"]);
});

test("Path already absolute", () => {
  const test_string = `<html>
    <body>
        <a href="https://boot.dev/v1.html"><span>Go to Boot.dev/v1.html</span></a>
    </body>
</html>`;
  const result = getURLsFromHTML(test_string, "https://boot.dev");
  expect(result).toStrictEqual(["https://boot.dev/v1.html"]);
});

test("Multiple relative paths", () => {
  const test_string = `<html>
    <body>
        <a href="/v1.html"><span>Go to Boot.dev/v1.html</span></a>
        <a href="/v2.html"><span>Go to Boot.dev/v2.html</span></a>
    </body>
</html>`;
  const result = getURLsFromHTML(test_string, "https://boot.dev");
  expect(result).toStrictEqual([
    "https://boot.dev/v1.html",
    "https://boot.dev/v2.html",
  ]);
});

test("Multiple absolute paths", () => {
  const test_string = `<html>
    <body>
        <a href="https://boot.dev/v1.html"><span>Go to Boot.dev/v1.html</span></a>
        <a href="https://boot.dev/v2.html"><span>Go to Boot.dev/v2.html</span></a>
    </body>
</html>`;
  const result = getURLsFromHTML(test_string, "https://boot.dev");
  expect(result).toStrictEqual([
    "https://boot.dev/v1.html",
    "https://boot.dev/v2.html",
  ]);
});

test("Multiple mixed paths", () => {
  const test_string = `<html>
    <body>
        <a href="/v1.html"><span>Go to Boot.dev/v1.html</span></a>
        <a href="https://boot.dev/v2.html"><span>Go to Boot.dev/v2.html</span></a>
    </body>
</html>`;
  const result = getURLsFromHTML(test_string, "https://boot.dev");
  expect(result).toStrictEqual([
    "https://boot.dev/v1.html",
    "https://boot.dev/v2.html",
  ]);
});
