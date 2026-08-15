import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  extractImageUrls,
  formatValidationReport,
} from "./validate.mjs";

describe("extractImageUrls", () => {
  it("finds markdown image urls", () => {
    const urls = extractImageUrls(
      "[![CI](https://example.com/ci.svg)](https://example.com/actions)",
    );
    assert.deepEqual(urls, ["https://example.com/ci.svg"]);
  });

  it("finds html image urls", () => {
    const urls = extractImageUrls('<img src="https://example.com/x.svg" alt="x">');
    assert.deepEqual(urls, ["https://example.com/x.svg"]);
  });

  it("deduplicates urls", () => {
    const urls = extractImageUrls(
      "![a](https://example.com/x.svg) ![b](https://example.com/x.svg)",
    );
    assert.equal(urls.length, 1);
  });
});

describe("formatValidationReport", () => {
  it("summarizes failures", () => {
    const text = formatValidationReport([
      { url: "https://example.com/ok.svg", ok: true, status: 200 },
      { url: "https://example.com/bad.svg", ok: false, status: 404 },
    ]);
    assert.match(text, /OK 200/);
    assert.match(text, /FAIL 404/);
    assert.match(text, /1 URL\(s\) failed/);
  });
});
