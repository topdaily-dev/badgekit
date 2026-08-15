import fs from "node:fs";
import path from "node:path";

import {
  BADGE_IDS,
  formatBadgeRow,
  parseFlags,
  renderBadge,
} from "./badges.mjs";
import {
  extractImageUrls,
  formatValidationReport,
  validateBadges,
  validateUrls,
} from "./validate.mjs";

const HELP = `badgekit — README badge row generator

Usage:
  badgekit list
  badgekit row <badges...> [--owner OWNER] [--repo REPO] [--npm PACKAGE] [flags]
  badgekit validate [dir]
  badgekit validate row <badges...> [flags]

Badges:
  ci, npm, license, node, release, downloads, stars, codecov, bundle-size, openssf

Flags:
  --owner OWNER       GitHub owner (required for ci, release, stars, codecov, openssf)
  --repo REPO         GitHub repo (required for ci, release, stars, codecov, openssf)
  --npm PACKAGE       npm package name (required for npm, downloads, bundle-size)
  --workflow FILE     CI workflow file (default: ci.yml)
  --node RANGE        Node engine badge (default: >=20)
  --license NAME      License badge label (default: MIT)
  --format FORMAT     markdown | html (default: markdown)

Examples:
  badgekit row ci npm license node --owner topdaily-dev --repo badgekit --npm @topdaily-dev/badgekit
  badgekit validate .
  badgekit validate row ci npm --owner topdaily-dev --repo badgekit --npm @topdaily-dev/badgekit
  badgekit row openssf codecov --owner topdaily-dev --repo badgekit
`;

/**
 * @param {string} dir
 */
function findReadme(dir) {
  for (const name of ["README.md", "Readme.md", "readme.md"]) {
    const candidate = path.join(dir, name);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

/**
 * @param {string[]} argv
 * @returns {Promise<number>}
 */
export async function runCli(argv) {
  const [command, ...rest] = argv;

  if (!command || command === "--help" || command === "-h") {
    console.log(HELP);
    return 0;
  }

  if (command === "list") {
    console.log(BADGE_IDS.join("\n"));
    return 0;
  }

  if (command === "validate") {
    const subcommand = rest[0];
    if (subcommand === "row") {
      const { options, positional } = parseFlags(rest.slice(1));
      const badges = positional.map((id) => {
        if (!BADGE_IDS.includes(/** @type {typeof BADGE_IDS[number]} */ (id))) {
          throw new Error(`Unknown badge id: ${id}`);
        }
        return renderBadge(options, /** @type {typeof BADGE_IDS[number]} */ (id));
      });
      const results = await validateBadges(badges);
      console.log(formatValidationReport(results));
      return results.some((r) => !r.ok) ? 1 : 0;
    }

    const { positional } = parseFlags(rest);
    const dir = path.resolve(positional[0] || ".");
    const readme = findReadme(dir);
    if (!readme) {
      throw new Error(`No README found in ${dir}`);
    }
    const urls = extractImageUrls(fs.readFileSync(readme, "utf8"));
    const results = await validateUrls(urls);
    console.log(formatValidationReport(results));
    return results.some((r) => !r.ok) ? 1 : 0;
  }

  if (command !== "row") {
    throw new Error(`Unknown command: ${command}`);
  }

  const { options, positional } = parseFlags(rest);
  const format = options.format === "html" ? "html" : "markdown";

  if (positional.length === 0) {
    throw new Error("Provide at least one badge id");
  }

  const badges = positional.map((id) => {
    if (!BADGE_IDS.includes(/** @type {typeof BADGE_IDS[number]} */ (id))) {
      throw new Error(`Unknown badge id: ${id}`);
    }
    return renderBadge(options, /** @type {typeof BADGE_IDS[number]} */ (id));
  });

  console.log(formatBadgeRow(badges, format));
  return 0;
}
