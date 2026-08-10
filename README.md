<p align="center">
  <img src="https://img.shields.io/npm/v/@topdaily-dev/badgekit.svg" alt="npm version">
  <a href="https://github.com/topdaily-dev/badgekit/actions/workflows/ci.yml"><img src="https://github.com/topdaily-dev/badgekit/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  <img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen" alt="Node">
</p>

<h1 align="center">badgekit</h1>

<p align="center">
  <strong>Generate shields.io README badge rows from the terminal.</strong>
</p>

<p align="center">
  <a href="#quick-start"><strong>Quick start</strong></a> ·
  <a href="#badges"><strong>Badges</strong></a> ·
  <a href="#examples"><strong>Examples</strong></a>
</p>

---

## Why badgekit?

README badges are repetitive copy-paste. **badgekit** prints ready-to-paste markdown or HTML badge rows for common shields — CI, npm, license, Node, releases, downloads, and stars.

No config files. No framework. Plain terminal output you own.

## Quick start

```bash
npx @topdaily-dev/badgekit row ci npm license node \
  --owner topdaily-dev \
  --repo badgekit \
  --npm @topdaily-dev/badgekit
```

Output:

```markdown
[![CI](https://github.com/topdaily-dev/badgekit/actions/workflows/ci.yml/badge.svg)](https://github.com/topdaily-dev/badgekit/actions/workflows/ci.yml) [![npm version](https://img.shields.io/npm/v/@topdaily-dev/badgekit.svg)](https://www.npmjs.com/package/@topdaily-dev/badgekit) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](package.json)
```

## Badges

| ID | Requires |
|----|----------|
| `ci` | `--owner`, `--repo`, optional `--workflow` |
| `npm` | `--npm` |
| `license` | optional `--license` (default MIT) |
| `node` | optional `--node` (default `>=20`) |
| `release` | `--owner`, `--repo` |
| `downloads` | `--npm` |
| `stars` | `--owner`, `--repo` |

List all badge ids:

```bash
badgekit list
```

## Examples

See [examples/basic.md](examples/basic.md), [examples/npm-project.md](examples/npm-project.md), and [examples/github-only.md](examples/github-only.md), and [examples/html-readme.md](examples/html-readme.md).

HTML output for centered README rows:

```bash
  badgekit row ci npm license --owner topdaily-dev --repo badgekit --npm @topdaily-dev/badgekit --format html
```

Custom CI workflow file:

```bash
badgekit row ci --owner topdaily-dev --repo badgekit --workflow test.yml
```

## Install

```bash
npm install -g @topdaily-dev/badgekit
```

## Development

```bash
git clone https://github.com/topdaily-dev/badgekit.git
cd badgekit
npm test
node bin/badgekit.mjs --help
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for PR guidelines.

## License

MIT — see [LICENSE](LICENSE).
