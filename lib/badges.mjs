/** @typedef {"ci" | "npm" | "license" | "node" | "release" | "downloads" | "stars" | "codecov" | "bundle-size" | "openssf"} BadgeId */

/**
 * @param {string | undefined} value
 * @param {string} flag
 */
export function required(value, flag) {
  if (!value) {
    throw new Error(`Missing required flag ${flag}`);
  }
  return value;
}

/**
 * @param {Record<string, string>} options
 * @param {BadgeId} id
 * @returns {{ alt: string; href: string; src: string }}
 */
export function renderBadge(options, id) {
  const owner = options.owner;
  const repo = options.repo;
  const npm = options.npm;
  const node = options.node ?? ">=20";
  const license = options.license ?? "MIT";

  switch (id) {
    case "ci": {
      required(owner, "--owner");
      required(repo, "--repo");
      const workflow = options.workflow ?? "ci.yml";
      return {
        alt: "CI",
        href: `https://github.com/${owner}/${repo}/actions/workflows/${workflow}`,
        src: `https://github.com/${owner}/${repo}/actions/workflows/${workflow}/badge.svg`,
      };
    }
    case "npm": {
      const pkg = required(npm, "--npm");
      return {
        alt: "npm version",
        href: `https://www.npmjs.com/package/${pkg}`,
        src: `https://img.shields.io/npm/v/${pkg}.svg`,
      };
    }
    case "license":
      return {
        alt: `License: ${license}`,
        href: "LICENSE",
        src: `https://img.shields.io/badge/License-${encodeURIComponent(license)}-blue.svg`,
      };
    case "node":
      return {
        alt: "Node",
        href: "package.json",
        src: `https://img.shields.io/badge/node-${encodeURIComponent(node)}-brightgreen`,
      };
    case "release": {
      required(owner, "--owner");
      required(repo, "--repo");
      return {
        alt: "GitHub release",
        href: `https://github.com/${owner}/${repo}/releases`,
        src: `https://img.shields.io/github/v/release/${owner}/${repo}`,
      };
    }
    case "downloads": {
      const pkg = required(npm, "--npm");
      return {
        alt: "npm downloads",
        href: `https://www.npmjs.com/package/${pkg}`,
        src: `https://img.shields.io/npm/dm/${pkg}.svg`,
      };
    }
    case "stars": {
      required(owner, "--owner");
      required(repo, "--repo");
      return {
        alt: "GitHub stars",
        href: `https://github.com/${owner}/${repo}`,
        src: `https://img.shields.io/github/stars/${owner}/${repo}?style=social`,
      };
    }
    case "codecov": {
      required(owner, "--owner");
      required(repo, "--repo");
      return {
        alt: "codecov",
        href: `https://codecov.io/gh/${owner}/${repo}`,
        src: `https://codecov.io/gh/${owner}/${repo}/graph/badge.svg`,
      };
    }
    case "bundle-size": {
      const pkg = required(npm, "--npm");
      return {
        alt: "bundle size",
        href: `https://bundlephobia.com/package/${pkg}`,
        src: `https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(pkg)}`,
      };
    }
    case "openssf": {
      required(owner, "--owner");
      required(repo, "--repo");
      return {
        alt: "OpenSSF Scorecard",
        href: `https://securityscorecards.dev/viewer/?uri=github.com/${owner}/${repo}`,
        src: `https://api.securityscorecards.dev/projects/github.com/${owner}/${repo}/badge`,
      };
    }
    default: {
      const unknown = /** @type {never} */ (id);
      throw new Error(`Unknown badge: ${String(unknown)}`);
    }
  }
}

/**
 * @param {Array<{ alt: string; href: string; src: string }>} badges
 * @param {"markdown" | "html"} format
 */
export function formatBadgeRow(badges, format) {
  if (format === "html") {
    return badges
      .map(
        (badge) =>
          `<a href="${badge.href}"><img src="${badge.src}" alt="${badge.alt}"></a>`,
      )
      .join("\n");
  }

  return badges
    .map((badge) => `[![${badge.alt}](${badge.src})](${badge.href})`)
    .join(" ");
}

/**
 * @param {string[]} args
 */
export function parseFlags(args) {
  /** @type {Record<string, string>} */
  const options = {};
  const positional = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[i + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`Flag ${arg} requires a value`);
      }
      options[key] = value;
      i++;
      continue;
    }
    positional.push(arg);
  }

  return { options, positional };
}

export const BADGE_IDS = /** @type {const} */ ([
  "ci",
  "npm",
  "license",
  "node",
  "release",
  "downloads",
  "stars",
  "codecov",
  "bundle-size",
  "openssf",
]);
