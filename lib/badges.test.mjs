import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatBadgeRow, parseFlags, renderBadge } from "./badges.mjs";

describe("renderBadge", () => {
  it("renders CI badge", () => {
    const badge = renderBadge(
      { owner: "acme", repo: "demo" },
      "ci",
    );
    assert.match(badge.src, /acme\/demo\/actions\/workflows\/ci\.yml\/badge\.svg/);
  });

  it("renders npm badge", () => {
    const badge = renderBadge({ npm: "@acme/pkg" }, "npm");
    assert.match(badge.src, /npm\/v\/@acme\/pkg\.svg/);
  });

  it("requires owner for release badge", () => {
    assert.throws(() => renderBadge({}, "release"));
  });

  it("renders downloads badge", () => {
    const badge = renderBadge({ npm: "@acme/pkg" }, "downloads");
    assert.match(badge.src, /npm\/dm\/@acme\/pkg\.svg/);
  });

  it("renders stars badge", () => {
    const badge = renderBadge({ owner: "acme", repo: "demo" }, "stars");
    assert.match(badge.src, /github\/stars\/acme\/demo/);
  });

  it("renders CI badge with custom workflow", () => {
    const badge = renderBadge(
      { owner: "acme", repo: "demo", workflow: "build.yml" },
      "ci",
    );
    assert.match(badge.src, /workflows\/build\.yml\/badge\.svg/);
  });

  it("renders license badge", () => {
    const badge = renderBadge({ license: "Apache-2.0" }, "license");
    assert.match(badge.src, /License-Apache-2\.0/);
  });

  it("renders node badge", () => {
    const badge = renderBadge({ node: ">=18" }, "node");
    assert.match(badge.src, /node-%3E%3D18/);
  });
});

describe("formatBadgeRow", () => {
  it("formats markdown row", () => {
    const row = formatBadgeRow(
      [
        {
          alt: "CI",
          href: "https://github.com/acme/demo/actions",
          src: "https://example.com/ci.svg",
        },
      ],
      "markdown",
    );
    assert.match(row, /\[!\[CI\]/);
  });

  it("formats html row", () => {
    const row = formatBadgeRow(
      [
        {
          alt: "CI",
          href: "https://github.com/acme/demo/actions",
          src: "https://example.com/ci.svg",
        },
      ],
      "html",
    );
    assert.match(row, /<img src=/);
  });
});

describe("parseFlags", () => {
  it("parses flags and positional args", () => {
    const parsed = parseFlags([
      "ci",
      "npm",
      "--owner",
      "acme",
      "--repo",
      "demo",
      "--npm",
      "pkg",
    ]);
    assert.deepEqual(parsed.positional, ["ci", "npm"]);
    assert.equal(parsed.options.owner, "acme");
  });
});
