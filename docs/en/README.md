# VaultPilot English Documentation Home

Use this page as the English operator map for VaultPilot Enterprise Vault Console. It is written for administrators, security operators and support teams who need a direct path from install to secure operation.

Current verified public release: **VaultPilot Enterprise Vault Console 2.0.0**. It was published as GitHub Release [`v2.0.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0) on June 30, 2026.

## Recommended Order

| Step | Guide | Outcome |
| --- | --- | --- |
| 1 | [Admin quickstart](admin-quickstart.md) | Follow the shortest safe path from MSI download to first healthy vault. |
| 2 | [Overview](overview.md) | Understand the self-hosted server model and component boundaries. |
| 3 | [Windows Server installation](install-windows-server.md) | Install the MSI, validate service state and confirm browser access. |
| 4 | [First run, owner and license](first-run-owner-license.md) | Create the owner profile, unlock the vault and apply license state. |
| 5 | [Public host and HTTPS](public-host-https-certificate.md) | Configure the host, managed HTTPS and production browser trust path. |
| 6 | [Server System settings](server-system.md) | Review host, port, HTTPS state, notifications, log retention and maintenance boundaries. |
| 7 | [Security and trust model](security-and-trust-model.md) | Confirm the zero-knowledge boundary, update trust chain and operator responsibilities. |
| 8 | [Audit and security posture](audit-and-security-posture.md) | Review score signals, audit-chain state and priority actions. |
| 9 | [Discovery](discovery.md) | Review approved login-surface, TLS and file exposure findings without storing plaintext secrets. |
| 10 | [Browser extension](browser-extension.md) | Pair approved browsers and understand autofill, badge and save/update prompts. |
| 11 | [Chrome Web Store listing and privacy](chrome-web-store-listing.md) | Keep extension listing copy, privacy practices, permissions and screenshots aligned with the current package. |
| 12 | [Active Directory agent](active-directory-agent.md) | Install or repair VaultPilot DC Agent Service and validate sync tree health. |
| 13 | [Sharing and offline decrypter](sharing-and-offline-decrypter.md) | Package selected records and files with expiry, usage limits and recipient handling. |
| 14 | [Backups and restore](backups-and-restore.md) | Prepare encrypted backup, integrity and restore procedures. |
| 15 | [Uninstall, data retention and rollback](uninstall-rollback-data-retention.md) | Remove service files safely, preserve data by default and run rollback only with verified assets. |
| 16 | [Update Center](update-center.md) and [release asset verification](release-asset-verification.md) | Verify signed manifest, release assets, checksum and MSI signer. |
| 17 | [Integration API clients](api-clients.md) and [Public API reference](public-api-reference.md) | Create scoped API clients and confirm endpoint, auth, cache and error contracts. |
| 18 | [License lifecycle](license-lifecycle.md) | Plan trial, renewal, expiry, read-only and replacement steps. |
| 19 | [Operator runbook](operator-runbook.md) | Run daily, weekly, monthly and incident routines after go-live. |

## Maintainer/Public Repository Path

Use this path when you are preparing public documentation, release metadata, screenshots, repository profile fields, or external listing handoff. It is not part of the normal server-operator runbook.

| Task | Guide | Outcome |
| --- | --- | --- |
| Publication checks | [Publication runbook](publication-runbook.md) | Validate working tree, staged tree, secrets, release assets and owner/account gates before publication. |
| External drift | [Public external surface drift](public-external-surface-drift.md) | Track owner-gated GitHub Release, Chrome Web Store, repository settings and license follow-up. |
| Screenshot intake | [Public screenshot standards](public-screenshot-standards.md) | Keep screenshots synthetic, manifest-backed, under size limits and safe for public documentation. |
| Repository profile | [GitHub repository profile](github-repository-profile.md) | Keep public repository metadata, social preview, issue intake and boundary wording aligned. |
| Discoverability | [Public discoverability](public-discoverability.md) | Keep GitHub topics, social preview, search/AI limits and `llms.txt` entrypoints aligned. |
| In-app help coverage | [In-app screen help](in-app-screen-help.md) | Keep every topbar `?` help target paired with a public-safe screen page. |
| Public wording | [Public language glossary](public-language-glossary.md) | Keep English/Turkish public wording consistent for product, release, support and redaction terms. |

## Need An Answer Now

| Question | Start here |
| --- | --- |
| Is this a cloud service? | [FAQ](faq.md) |
| Which file installs the server? | [Windows Server installation](install-windows-server.md) |
| Why does the browser show a certificate warning? | [Public host and HTTPS](public-host-https-certificate.md) |
| Where do I review host, notification, log and maintenance settings? | [Server System settings](server-system.md), [Knowledge base: Server settings restart and maintenance](../../kb/en/server-settings-restart-maintenance.md) |
| Why is the security score low? | [Audit and security posture](audit-and-security-posture.md) |
| How should I review a Discovery finding? | [Discovery](discovery.md), [Knowledge base: Discovery finding review](../../kb/en/discovery-finding-review.md) |
| What should the Chrome Web Store listing and privacy form say? | [Chrome Web Store listing and privacy](chrome-web-store-listing.md), [Knowledge base: Chrome Web Store review](../../kb/en/chrome-web-store-review.md) |
| Why did update stop near 76 percent? | [Knowledge base: update stuck](../../kb/en/update-stuck-76.md) |
| How do I uninstall without losing data? | [Uninstall, data retention and rollback](uninstall-rollback-data-retention.md) |
| Why is the DC Agent service not connecting? | [Knowledge base: DC Agent](../../kb/en/dc-agent-service.md) |
| Why do I see 401 or 403 responses after login? | [Knowledge base: login session noise](../../kb/en/session-401-after-login.md) |
| Why does an integration API client get 401 or no secrets? | [Knowledge base: API client access](../../kb/en/api-client-401.md) |
| Which public API endpoints, scopes and status codes are supported? | [Public API reference](public-api-reference.md) |
| What does the `?` button on the current screen open? | [In-app screen help](in-app-screen-help.md) |
| What happens when the license expires or is replaced? | [License lifecycle](license-lifecycle.md) |
| What can I safely send to support? | [Support evidence pack](support-evidence-pack.md), [Troubleshooting](troubleshooting.md) and [Support policy](../../SUPPORT.md) |
| What belongs in the public repository? | [Public repository boundary](public-repository-boundary.md) and [public issue redaction KB](../../kb/en/public-issue-redaction.md) |
| Which public surfaces still need owner or publisher action? | [Public external surface drift](public-external-surface-drift.md) |
| How should a public screenshot be accepted or replaced? | [Public screenshot standards](public-screenshot-standards.md) and [public screenshot redaction KB](../../kb/en/public-screenshot-redaction.md) |
| How should a public docs change be validated before publication? | [Publication runbook](publication-runbook.md), [Knowledge base: public validation fails](../../kb/en/public-validation-fails.md) |
| Which metadata should the public GitHub repo expose? | [GitHub repository profile](github-repository-profile.md) |
| How do we keep the public repo discoverable without overpromising SEO? | [Public discoverability](public-discoverability.md) |
| Which words should Turkish public docs prefer? | [Public language glossary](public-language-glossary.md) |

## Public Safety

Never paste real secrets, master passwords, AD bind passwords, agent tokens, license private material, databases, backups, PFX/P12 files or private keys into public tickets or docs.

Use placeholders such as `<VAULTPILOT_URL>`, `<SERVER_HOST>`, `<AGENT_ID>`, `<AGENT_TOKEN>`, `<LICENSE_CODE>` and `<REDACTED>`.

Related: [Repository home](../../README.md), [Knowledge base](../../kb/en/README.md), [Release notes](../../RELEASES.md), [Security policy](../../SECURITY.md), [Public repository boundary](public-repository-boundary.md), [Publication runbook](publication-runbook.md), [Public external surface drift](public-external-surface-drift.md), [Public screenshot standards](public-screenshot-standards.md), [GitHub repository profile](github-repository-profile.md), [Public discoverability](public-discoverability.md), [Chrome Web Store listing and privacy](chrome-web-store-listing.md), [Public API reference](public-api-reference.md), [In-app screen help](in-app-screen-help.md), [Public language glossary](public-language-glossary.md).
