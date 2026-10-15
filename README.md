# Owly documentation

Bilingual Mintlify documentation for Owly. English pages live at the repository root; Chinese counterparts live under `zh/`. Navigation and site settings are in `docs.json`.

## Implementation references

The 2026-10-15 documentation sync was checked against these local source revisions:

| Repository | Revision | Scope |
| --- | --- | --- |
| `TraderFi-FE` | `c43d71f5` | Routes, account setup, funding, terminal, strategy settings, and portfolio UI |
| `owly-be` | `d887f0ce` | Account guards, manager permissions, funding services, referral settlement, and B2B contracts |

Use current call sites and backend validation together. A backend field does not prove the UI exposes a feature. Runtime fee, referral, provider, and Alpha configuration can vary by environment; do not infer production availability from a local checkout.

When behavior changes, update both languages, related FAQ pages, and navigation as needed. Preserve public page paths and historical changelog entries. Keep source evidence and validation results in the task archive under `.agent/`.

## Preview and validation

With the Mintlify CLI installed, run from this directory:

```sh
mint dev
```

Before publishing, validate MDX/frontmatter, `docs.json` page targets, local links and assets, paired language coverage, and `git diff --check`. API request examples should also be checked against the backend's current schemas.

Preview changes before pushing. Publication follows the repository's configured Mintlify deployment integration.
