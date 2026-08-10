# Badge examples

Copy-paste rows generated with badgekit.

## Full OSS row (markdown)

```bash
badgekit row ci release npm license node downloads \
  --owner topdaily-dev \
  --repo badgekit \
  --npm @topdaily-dev/badgekit
```

## HTML row (centered README)

```bash
badgekit row ci npm license --owner topdaily-dev --repo badgekit --npm @topdaily-dev/badgekit --format html
```

## Individual badges

| Badge | Command fragment |
|-------|------------------|
| CI | `ci --owner OWNER --repo REPO` |
| npm | `npm --npm @scope/pkg` |
| Stars | `stars --owner OWNER --repo REPO` |
