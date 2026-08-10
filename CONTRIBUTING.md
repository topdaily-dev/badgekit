# Contributing to badgekit

Thanks for your interest in contributing!

## Development setup

```bash
git clone https://github.com/topdaily-dev/badgekit.git
cd badgekit
npm test
```

## Pull requests

1. Fork and create a feature branch
2. Add tests for behavior changes (`lib/*.test.mjs`)
3. Run `npm test` before opening a PR
4. Keep PRs focused — one logical change per PR

## Commit style

Use clear, descriptive commit messages:

```
docs: add badge examples
fix: handle missing --npm flag for downloads badge
feat: add codecov badge preset
```

## Reporting issues

Include:

- badgekit version (`badgekit --help` or `npm ls @topdaily-dev/badgekit`)
- command you ran
- expected vs actual output
