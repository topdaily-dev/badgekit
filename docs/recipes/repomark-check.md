# Repo health with repomark

Pair [@topdaily-dev/repomark](https://github.com/topdaily-dev/repomark) with badgekit: badges show npm/GitHub signals; repomark scores repo hygiene (README, license, CI, etc.).

```bash
npx @topdaily-dev/repomark check
npx @topdaily-dev/repomark check --min 70
npx @topdaily-dev/repomark check --json
```

In CI:

```yaml
- run: npx @topdaily-dev/repomark check --min 70
```

See [repomark README](https://github.com/topdaily-dev/repomark#readme) for fix suggestions (`fix --dry-run`).

Install repomark CI via collab-kit:

```bash
npx @korykaai/collab-kit init . --oss-toolchain
```
