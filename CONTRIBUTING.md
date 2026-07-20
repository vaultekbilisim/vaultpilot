# Contributing

VaultPilot public docs accepts documentation, knowledge-base, release-note, and public safety improvements. Product source code, release binaries, customer data, signing material, and operational secrets do not belong in this repository.

## What Belongs Here

- Public documentation fixes for `docs/`, `kb/`, localized READMEs, `RELEASES.md`, `SECURITY.md`, `SUPPORT.md`, and `PRIVACY.md`.
- Public-safe screenshot and visual updates that use placeholders and synthetic tenant data.
- Validation improvements for public documentation hygiene.
- Broken local link, typo, translation, and stale wording fixes.

## What Must Stay Out

Do not open an issue, pull request, or comment that includes:

- Plaintext secrets, passwords, vault contents, master passwords, API keys, private keys, cookies, or session material.
- AD bind passwords, agent tokens, license private keys, update signing private keys, PFX/P12 files, databases, backups, or raw logs.
- Screenshots with real customer names, internal URLs, secret records, infrastructure addresses, user lists, or support-ticket exports.
- MSI, EXE, ZIP, update manifest, support script, database, or certificate package files.

Use placeholders such as `<VAULTPILOT_URL>`, `<SERVER_HOST>`, `<AGENT_ID>`, `<AGENT_TOKEN>`, `<LICENSE_CODE>`, and `<REDACTED>`.

## Documentation Standards

- Keep VaultPilot as the canonical product name for new public wording.
- Use PassMan only for legacy compatibility names, older installed service names, data paths, environment variables, cookies, headers, update aliases, extension protocol strings, and rollback context.
- Keep English and Turkish operator docs paired under `docs/en` and `docs/tr`.
- Keep English and Turkish knowledge-base articles paired under `kb/en` and `kb/tr`.
- Prefer concise operator language over marketing copy.
- Link to local Markdown files with relative links.
- Do not link directly to the raw `assets/screenshots/` directory.
- Follow the [public repository boundary](docs/en/public-repository-boundary.md) when deciding whether something belongs in git, GitHub Releases or private support.
- Follow the [public repository publication runbook](docs/en/publication-runbook.md) before staging, committing, or requesting publication.
- Keep [public external surface drift](docs/en/public-external-surface-drift.md) current when GitHub Release, repository settings, license, or Chrome Web Store pages need owner action.
- Follow [public screenshot standards](docs/en/public-screenshot-standards.md) and [public screenshot redaction](kb/en/public-screenshot-redaction.md) before adding or replacing screenshot assets.
- Do not add license terms or reuse grants unless the repository owner has approved a `LICENSE` or `LICENSE.md` file.

## Screenshot Standards

- Use synthetic data only.
- Redact all tenant, customer, host, token, email, and secret values.
- Use lowercase kebab-case PNG names.
- Keep public screenshots under 2 MB each.
- Update `scripts/validate-docs.mjs` when adding an approved public screenshot.
- If a screenshot contains sensitive data, use [Public screenshot redaction](kb/en/public-screenshot-redaction.md) and replace the image before public review.

## Before Opening A Pull Request

Use the repository pull-request template and keep the checklist accurate. If a validation command cannot run, state the exact command and failure reason in the PR body.

Run the public validation from the repository root:

```powershell
npm run validate
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

If you staged files locally, also run:

```powershell
npm run validate:staged
```

If any check fails, use [Public validation fails](kb/en/public-validation-fails.md) instead of weakening the validator or staging unrelated files.

## Security Reports

Report security issues privately through the repository security policy page or licensed support channel. Do not open public issues for vulnerabilities, exploit payloads, secrets, customer data, log bundles, certificates, database files, or screenshots containing secret records. See [SECURITY.md](SECURITY.md).

Use: https://github.com/ucsahinn/vaultpilot/security/policy
