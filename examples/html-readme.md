# HTML README badge row

Wrap HTML output in a centered paragraph:

```html
<p align="center">
  <!-- paste badgekit --format html output here -->
</p>
```

Generate the row:

```bash
badgekit row ci npm license --owner topdaily-dev --repo badgekit --npm @topdaily-dev/badgekit --format html
```

Wrap the output in <p align="center"> tags for centered README rows.


Bootstrap badges with: npx @korykaai/collab-kit init . --oss-toolchain
