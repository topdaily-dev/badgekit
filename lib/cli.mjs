import {
  BADGE_IDS,
  formatBadgeRow,
  parseFlags,
  renderBadge,
} from "./badges.mjs";

const HELP = `badgekit — README badge row generator

Usage:
  badgekit list
  badgekit row <badges...> [--owner OWNER] [--repo REPO] [--npm PACKAGE] [flags]

Badges:
  ci, npm, license, node, release, downloads, stars

Flags:
  --owner OWNER       GitHub owner (required for ci, release, stars)
  --repo REPO         GitHub repo (required for ci, release, stars)
  --npm PACKAGE       npm package name (required for npm, downloads)
  --workflow FILE     CI workflow file (default: ci.yml)
  --node RANGE        Node engine badge (default: >=20)
  --license NAME      License badge label (default: MIT)
  --format FORMAT     markdown | html (default: markdown)

Examples:
  badgekit row ci npm license node --owner topdaily-dev --repo badgekit --npm badgekit
  badgekit row npm downloads --npm @topdaily-dev/badgekit
  badgekit row ci release --owner topdaily-dev --repo badgekit --format html
`;

/**
 * @param {string[]} argv
 */
export function runCli(argv) {
  const [command, ...rest] = argv;

  if (!command || command === "--help" || command === "-h") {
    console.log(HELP);
    return;
  }

  if (command === "list") {
    console.log(BADGE_IDS.join("\n"));
    return;
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
}
