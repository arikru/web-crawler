const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')


test('removes https://', () => {
	expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('removes https:// and forward slash after path', () => {
	expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('removes http://', () => {
	expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('removes http:// and forward slash after path', () => {
	expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('Empty URL should return empty string (I guess?)', () => {
	expect(normalizeURL('')).toBe('');
});
