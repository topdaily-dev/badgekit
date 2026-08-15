# npm publish setup

badgekit uses **npm trusted publishing** (OIDC) from GitHub Actions.

## Trusted publisher (topdaily-dev npm)

On [npmjs.com](https://www.npmjs.com/) as **topdaily-dev**:

| Field | Value |
|-------|--------|
| Repository | `topdaily-dev/badgekit` |
| Workflow | `publish-npm.yml` |
| Permissions | `npm publish` |

## Publish

- Automatic when a GitHub **Release** is published
- Or manually: `gh workflow run "Publish to npm" --repo topdaily-dev/badgekit`

## Verify

```bash
npm view @topdaily-dev/badgekit version
npx @topdaily-dev/badgekit list
```
