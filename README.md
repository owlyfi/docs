# Owly documentation

Owly's Mintlify documentation uses the locale and path mapping in `OWLY_LOCALE_ADAPTERS` from `owly-fe/assistant-contracts/locales.ts`. The language switcher is configured in `docs.json`.

| Language | Owly locale | Mintlify language | Page directory |
| --- | --- | --- | --- |
| English | `en` | `en` | Repository root |
| Japanese | `ja` | `ja` | `ja/` |
| Korean | `ko` | `ko` | `ko/` |
| Spanish | `es` | `es` | `es/` |
| Russian | `ru` | `ru` | `ru/` |
| Traditional Chinese | `zh-Hant` | `zh-Hant` | `zh-hant/` |
| Simplified Chinese | `zh-Hans` | `zh` | `zh/` |

Product pages use the same slugs in every language. The Terms of Service and Privacy Policy are available in English under `legal/`.

## Implementation references

The 2026-10-15 documentation sync was checked against these local source revisions:

| Repository | Revision | Scope |
| --- | --- | --- |
| `TraderFi-FE` | `c43d71f5` | Routes, account setup, funding, terminal, strategy settings, and portfolio UI |
| `owly-be` | `d887f0ce` | Account guards, manager permissions, funding services, referral settlement, and B2B contracts |

Use current call sites and backend validation together. A backend field does not prove the UI exposes a feature. Runtime fee, referral, provider, and Alpha configuration can vary by environment; do not infer production availability from a local checkout.

When behavior changes, update the corresponding pages in all seven languages, including related FAQ pages and navigation as needed. Use the target language's path for internal page links and share assets from `images/`. Preserve public page paths and historical changelog entries. Keep source evidence and validation results in the task archive under `.agent/`.

## Preview and validation

With the Mintlify CLI installed, run from this directory:

```sh
mint dev
```

Before publishing, validate MDX/frontmatter, `docs.json` page targets, local links and assets, page coverage across languages, and `git diff --check`. API request examples should also be checked against the backend's current schemas.

Preview changes before pushing. Publication follows the repository's configured Mintlify deployment integration.
