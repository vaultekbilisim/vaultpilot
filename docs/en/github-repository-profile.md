# GitHub Repository Profile

Use this page when maintaining the public GitHub repository profile for VaultPilot. It keeps the repository's first impression, metadata, issue intake, and release links aligned with the product boundary.

This is a public documentation repository. It should make the supported release easy to find, make operator docs easy to scan, and make the private-source boundary impossible to miss.

## Profile Checklist

| Surface | Required state |
| --- | --- |
| Repository name | `vaultpilot` |
| Short description | Public release hub, operator wiki, knowledge base, and support boundary for VaultPilot Enterprise Vault Console. |
| Website or homepage | `https://github.com/ucsahinn/vaultpilot#readme` |
| Topics | `vaultpilot`, `password-manager`, `secrets-manager`, `zero-knowledge`, `self-hosted`, `windows-server`, `msi`, `enterprise-security`, `browser-extension`, `active-directory`, `documentation`, `knowledge-base` |
| Social preview | Use `assets/visuals/social-preview.png`. |
| Security policy | Enabled and pointing to `SECURITY.md`. |
| Issues | Disabled unless the owner explicitly enables public intake. If enabled, keep it limited to redacted support questions and documentation corrections. |
| Discussions | Disabled unless moderators can keep secrets, logs, and customer data out of public threads. |
| Releases | Current supported customer release is GitHub Release `v2.0.0`. |
| Wiki | Optional; keep canonical content in this repository unless the owner explicitly runs a separate wiki publication flow. |

## First-Screen Contract

The repository landing page should show these signals without requiring a reader to hunt:

- Current supported release and download path.
- English and Turkish documentation entrypoints.
- Knowledge base entrypoints.
- Security policy and support boundary.
- Public repository boundary.
- Clear statement that product source code, signing material, customer data, and release binaries are not committed to git.

## Metadata Rules

- Use VaultPilot as the canonical product name for new public wording.
- Use PassMan only for legacy compatibility context.
- Do not promise open-source or reuse rights unless the owner adds a `LICENSE` or `LICENSE.md` file.
- Do not make the repository description sound like the private product source is published here.
- Do not link release binaries from raw git paths; use GitHub Releases.
- Do not use screenshots that show real customer hosts, users, secret names, tokens, logs, or support tickets.
- Treat `package.json` keywords as a local mirror only. They do not set GitHub repository topics.

## Issue Intake Rules

Public issue intake should stay narrow:

- Redacted support questions use `.github/ISSUE_TEMPLATE/redacted-support.yml` when public Issues are enabled.
- Documentation corrections use `.github/ISSUE_TEMPLATE/documentation.yml` when public Issues are enabled.
- Security issues use the private security policy path.
- Evidence that cannot be fully redacted belongs in licensed private support, not a public issue.

## Verification

Before publishing profile, template, or metadata changes:

```powershell
npm run validate
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

If files are staged for commit, also run:

```powershell
npm run validate:staged
```

Related:

- [Public discoverability](public-discoverability.md)
- [Public repository boundary](public-repository-boundary.md)
- [Support evidence pack](support-evidence-pack.md)
- [Release asset verification](release-asset-verification.md)
- [Security policy](../../SECURITY.md)
- [Contribution rules](../../CONTRIBUTING.md)
