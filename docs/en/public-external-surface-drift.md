# Public External Surface Drift Register

Use this register when the repository content is ready but an external public surface still needs owner or publisher action. A git commit can prepare wording and assets, but it does not change GitHub repository settings, GitHub Release records, Chrome Web Store pages, Search Console, or publisher-account data.

Last checked from public pages: **2026-07-09**.

Local validation can pass while these rows remain open. Treat each row as owner-gated external work until the public URL is rechecked after commit, push or publisher-dashboard submission.

## Drift Register

| Surface | Public state observed | Required correction | Owner action |
| --- | --- | --- | --- |
| Published repository README | The live GitHub `main` README still shows the duplicated `Documentation Gateway`, `Knowledge Base Gateway`, and `Product Walkthrough` sections. The Product Walkthrough still says `Fresh 2.0 captures` and still lists legacy PassMan compatibility-line screenshot references such as Offline share decrypter. | Commit and push the current local README and visual catalog, then recheck the public repository home from an unauthenticated browser. | Owner must approve and push the prepared repository changes. |
| Live GitHub profile and topics | The live About text is `Public release, documentation, signed update manifest, and operator support hub for VaultPilot.` Topics currently include `enterprise`, `password-manager`, `self-hosted`, `windows-server`, `chromium-extension`, `zero-knowledge`, `security-tools`, `secrets-management`, `msi-installer`, `operator-docs`, and `vaultpilot`. | Apply the preferred description and topic set from [GitHub repository profile](github-repository-profile.md), including `vaultpilot`, `password-manager`, `secrets-manager`, `zero-knowledge`, `self-hosted`, `windows-server`, `msi`, `enterprise-security`, `browser-extension`, `active-directory`, `documentation`, and `knowledge-base`. | Change account-side repository settings after owner approval. |
| GitHub social preview | Repository settings must use `assets/visuals/social-preview.png`. Local evidence: 1280 x 640 PNG, 34840 bytes, SHA-256 `6393A5701827022CFAA8566764A15D6A81884F2F99A4A701256E98AEC932B03C`. | Upload or select that PNG in repository settings, then verify the public card and `openGraphImageUrl` behavior from an unauthenticated browser or no-auth public page inspection. | Owner must change repository settings and recheck the rendered social card. |
| GitHub latest release | `https://github.com/ucsahinn/vaultpilot/releases/latest` redirects to `v2.0.0`. The GitHub Release record currently uses customer-facing VaultPilot notes, release date 2026-06-30, released asset sizes, SHA-256 values, release verification guidance, and support links. | Release-body correction is not currently tracked. Recheck if release assets, checksums, support links, or the supported tag change. | Owner action is only needed when the release record changes or a newer supported release becomes available. |
| Chrome Web Store listing | The listing is live as `VaultPilot Browser Vault Extension`, extension ID `hjkbedlaieikhkoplgpiohlaakgebobi`, version `1.3.2`, updated July 1, 2026. The visible overview starts with VaultPilot wording, but the detailed description still repeats PassMan as the current server/product name. The public details also show size `69.07KiB`, language `English`, privacy categories for personally identifiable information, authentication information and web history, plus the limited-use declarations. | Replace title-adjacent copy, detailed description, screenshots, and privacy wording with the VaultPilot copy in [Chrome Web Store listing and privacy](chrome-web-store-listing.md). Keep PassMan only as legacy compatibility context and keep the declared privacy categories aligned with [PRIVACY.md](../../PRIVACY.md). | Edit and submit through the Chrome Web Store publisher dashboard. |
| GitHub repository settings | Checked account-side repository settings on 2026-07-09: homepage currently points to `https://github.com/ucsahinn/vaultpilot/releases/latest`; Issues are disabled; Discussions are disabled. Repository profile values, topics, social preview, Issues, Discussions, security policy toggle, and homepage remain account-side settings. | Apply the values in [GitHub repository profile](github-repository-profile.md) and [Public discoverability](public-discoverability.md); local docs recommend `https://github.com/ucsahinn/vaultpilot#readme` as the canonical homepage target. | Change repository settings after owner approval. |
| License display | Public docs intentionally avoid open-source or reuse claims until an approved root `LICENSE` or `LICENSE.md` exists. | Add only an owner-approved license file, then update docs that currently state no license terms are published. | Owner must approve license terms before any license file is added. |

## Recheck Steps

1. Open the public repository home and confirm the root README is visible, uses VaultPilot wording, and no longer shows the old `Fresh 2.0 captures` walkthrough note.
2. Check the repository About text, topics, homepage, security policy, and social preview card.
3. Open the latest GitHub Release URL and confirm it resolves to the intended supported tag.
4. Review the release title, body, asset list, file names, sizes, and checksum guidance.
5. Open the Chrome Web Store listing and confirm the title, summary, detailed description, screenshots, privacy data categories, support link, and version match the current extension release.
6. Confirm any visible PassMan wording is limited to legacy compatibility context.
7. Record the date, checked URLs, and remaining account-side owner actions in the review notes.

## Do Not Commit

Do not commit account exports, dashboard screenshots, browser profile data, raw release binaries, release archives, OAuth tokens, verification tokens, Search Console files, Chrome Web Store package downloads, or private support evidence.

## Local Verification

Before asking the owner to apply external changes, run:

```powershell
npm run validate
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

If files are staged later, also run:

```powershell
npm run validate:staged
git diff --cached --check
```

Related: [Publication runbook](publication-runbook.md), [Public discoverability](public-discoverability.md), [GitHub repository profile](github-repository-profile.md), [Chrome Web Store listing and privacy](chrome-web-store-listing.md), [Public screenshot standards](public-screenshot-standards.md).
