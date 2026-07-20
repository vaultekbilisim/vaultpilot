# VaultPilot Documentation Gateway

This folder is the public-safe operator wiki for VaultPilot Enterprise Vault Console. Choose a language home first, then follow the lifecycle path that matches the job.

Current verified public release: **VaultPilot Enterprise Vault Console 2.0.0**, published as GitHub Release [`v2.0.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0) on June 30, 2026.

| Language | Home | Best for |
| --- | --- | --- |
| English | [English documentation home](en/README.md) | Installation, operation and support teams working in English. |
| Turkish | [Türkçe doküman ana sayfa](tr/README.md) | Türkçe kurulum, operasyon ve destek akışları. |

## Operator Lifecycle

![VaultPilot operator lifecycle](../assets/visuals/operator-lifecycle.svg)

| Stage | English | Turkish |
| --- | --- | --- |
| Understand | [Overview](en/overview.md), [FAQ](en/faq.md), [Security and trust model](en/security-and-trust-model.md) | [Genel bakış](tr/overview.md), [SSS](tr/faq.md), [Güvenlik ve güven modeli](tr/security-and-trust-model.md) |
| Install | [Admin quickstart](en/admin-quickstart.md), [Windows Server installation](en/install-windows-server.md), [First run, owner and license](en/first-run-owner-license.md) | [Yönetici hızlı başlangıç](tr/admin-quickstart.md), [Windows Server kurulumu](tr/install-windows-server.md), [İlk kurulum, owner ve lisans](tr/first-run-owner-license.md) |
| Publish | [Public host and HTTPS](en/public-host-https-certificate.md), [Server System](en/server-system.md), [Browser extension](en/browser-extension.md) | [Public host ve HTTPS](tr/public-host-https-certificate.md), [Server System](tr/server-system.md), [Tarayıcı eklentisi](tr/browser-extension.md) |
| Secure | [Audit and security posture](en/audit-and-security-posture.md), [Discovery](en/discovery.md), [Active Directory agent](en/active-directory-agent.md) | [Denetim ve güvenlik duruşu](tr/audit-and-security-posture.md), [Discovery](tr/discovery.md), [Active Directory ajanı](tr/active-directory-agent.md) |
| Operate | [Operator runbook](en/operator-runbook.md), [Sharing and offline decrypter](en/sharing-and-offline-decrypter.md), [Backups and restore](en/backups-and-restore.md), [Uninstall and rollback](en/uninstall-rollback-data-retention.md), [Update Center](en/update-center.md) | [Operasyon runbook](tr/operator-runbook.md), [Paylaşım ve offline decrypter](tr/sharing-and-offline-decrypter.md), [Yedekleme ve geri yükleme](tr/backups-and-restore.md), [Kaldırma ve rollback](tr/uninstall-rollback-data-retention.md), [Güncelleme Merkezi](tr/update-center.md) |
| Verify release | [Release asset verification](en/release-asset-verification.md), [Release notes](../RELEASES.md) | [Release asset doğrulama](tr/release-asset-verification.md), [Release notları](../RELEASES.md) |
| Diagnose | [Support evidence pack](en/support-evidence-pack.md), [Troubleshooting](en/troubleshooting.md), [Knowledge base](../kb/en/README.md), [Support policy](../SUPPORT.md) | [Destek kanıt paketi](tr/support-evidence-pack.md), [Sorun giderme](tr/troubleshooting.md), [Bilgi bankası](../kb/tr/README.md), [Destek politikası](../SUPPORT.md) |

## Guide Map

| Guide | English | Turkish | Purpose |
| --- | --- | --- | --- |
| Overview | [EN](en/overview.md) | [TR](tr/overview.md) | Product model, runtime boundaries and recommended path. |
| Admin quickstart | [EN](en/admin-quickstart.md) | [TR](tr/admin-quickstart.md) | Day-0 install-to-healthy-vault path with stop conditions. |
| Windows Server installation | [EN](en/install-windows-server.md) | [TR](tr/install-windows-server.md) | MSI install, service state, port, logs and validation. |
| First run, owner and license | [EN](en/first-run-owner-license.md) | [TR](tr/first-run-owner-license.md) | Owner profile, license activation and first-run checks. |
| Public host and HTTPS | [EN](en/public-host-https-certificate.md) | [TR](tr/public-host-https-certificate.md) | Hostname, certificate package upload and browser validation. |
| Server System | [EN](en/server-system.md) | [TR](tr/server-system.md) | Host, port, HTTPS state, notifications, log retention and maintenance boundaries. |
| Update Center | [EN](en/update-center.md) | [TR](tr/update-center.md) | Signed manifest, MSI updates and component release notes. |
| Release asset verification | [EN](en/release-asset-verification.md) | [TR](tr/release-asset-verification.md) | Manual release asset, checksum, signer and manifest verification. |
| Integration API clients | [EN](en/api-clients.md) | [TR](tr/api-clients.md) | Scoped API client creation for encrypted snapshots and read-only status endpoints. |
| Public API reference | [EN](en/public-api-reference.md) | [TR](tr/public-api-reference.md) | Endpoint, auth, cache and error contract for read-only integrations. |
| In-app screen help | [EN](en/in-app-screen-help.md) | [TR](tr/in-app-screen-help.md) | One public-safe help page for every topbar `?` screen target. |
| Screen help target manifest | [JSON](screen-help-targets.json) | [JSON](screen-help-targets.json) | Machine-readable contract between app workspace views and public topbar `?` help pages. |
| License lifecycle | [EN](en/license-lifecycle.md) | [TR](tr/license-lifecycle.md) | Trial, renewal, replacement, expiry and read-only planning. |
| Discovery | [EN](en/discovery.md) | [TR](tr/discovery.md) | Approved exposure-review workflow for login surfaces, TLS risk and redacted file findings. |
| Uninstall, data retention and rollback | [EN](en/uninstall-rollback-data-retention.md) | [TR](tr/uninstall-rollback-data-retention.md) | Safe service removal, data preservation, purge boundary and rollback checks. |
| Browser extension | [EN](en/browser-extension.md) | [TR](tr/browser-extension.md) | Pairing, badge counts, autofill and save/update prompts. |
| Chrome Web Store listing and privacy | [EN](en/chrome-web-store-listing.md) | [TR](tr/chrome-web-store-listing.md) | Store listing copy, privacy disclosures, permissions, screenshots and submission checklist. |
| Active Directory agent | [EN](en/active-directory-agent.md) | [TR](tr/active-directory-agent.md) | VaultPilot DC Agent Service install, repair, logs and sync tree. |
| Sharing and offline decrypter | [EN](en/sharing-and-offline-decrypter.md) | [TR](tr/sharing-and-offline-decrypter.md) | Internal sharing, external packages, files, expiry and usage limits. |
| Backups and restore | [EN](en/backups-and-restore.md) | [TR](tr/backups-and-restore.md) | Encrypted backup export, integrity and restore checks. |
| Operator runbook | [EN](en/operator-runbook.md) | [TR](tr/operator-runbook.md) | Daily, weekly, monthly and incident operating rhythm. |
| Audit and security posture | [EN](en/audit-and-security-posture.md) | [TR](tr/audit-and-security-posture.md) | Audit chain, posture score and risk actions. |
| Security and trust model | [EN](en/security-and-trust-model.md) | [TR](tr/security-and-trust-model.md) | Trust boundaries, zero-knowledge promises and operator responsibilities. |
| Troubleshooting | [EN](en/troubleshooting.md) | [TR](tr/troubleshooting.md) | Common operational failure states. |
| Support evidence pack | [EN](en/support-evidence-pack.md) | [TR](tr/support-evidence-pack.md) | Clean, redacted evidence bundle for private support. |
| Public repository boundary | [EN](en/public-repository-boundary.md) | [TR](tr/public-repository-boundary.md) | What belongs in git, what belongs in GitHub Releases and what must stay private. |
| Publication runbook | [EN](en/publication-runbook.md) | [TR](tr/publication-runbook.md) | Working-tree, staged-tree, secret-scan and owner/account gate checklist before publication. |
| Public external surface drift | [EN](en/public-external-surface-drift.md) | [TR](tr/public-external-surface-drift.md) | Owner-gated GitHub Release, repository settings, license and Chrome Web Store follow-up register. |
| Public screenshot standards | [EN](en/public-screenshot-standards.md) | [TR](tr/public-screenshot-standards.md) | Screenshot manifest, synthetic-data rules, replacement process and unsafe-image handling. |
| GitHub repository profile | [EN](en/github-repository-profile.md) | [TR](tr/github-repository-profile.md) | Repository description, topics, social preview and public intake checklist. |
| Public discoverability | [EN](en/public-discoverability.md) | [TR](tr/public-discoverability.md) | GitHub metadata, search limits, social preview, `llms.txt` and account-side publication checklist. |
| Public language glossary | [EN](en/public-language-glossary.md) | [TR](tr/public-language-glossary.md) | Shared public wording rules for VaultPilot, PassMan compatibility, support and redaction terms. |
| FAQ | [EN](en/faq.md) | [TR](tr/faq.md) | Short answers for operators and administrators. |

## Visual References

Screenshot references are sanitized UI captures from isolated VaultPilot runtimes with synthetic data only. Visible hosts, users, counts, paths, filenames, hashes, package sizes and statuses are documentation fixtures, not release evidence or production guidance. Follow [public screenshot standards](en/public-screenshot-standards.md) and the [screenshot manifest](../assets/screenshots/MANIFEST.json) before adding or replacing a visual. Legacy PassMan compatibility-line screenshots are kept out of the primary visual reference table.

| Surface | Asset |
| --- | --- |
| ![Documentation icon](../assets/icons/docs.svg)<br>Operator lifecycle | [operator-lifecycle.svg](../assets/visuals/operator-lifecycle.svg) |
| ![Update icon](../assets/icons/update.svg)<br>Update trust chain | [update-trust-chain.svg](../assets/visuals/update-trust-chain.svg) |
| ![Security icon](../assets/icons/security.svg)<br>Zero-knowledge flow | [zero-knowledge-flow.svg](../assets/visuals/zero-knowledge-flow.svg) |
| ![Extension icon](../assets/icons/extension.svg)<br>Browser extension demo | [extension-demo.svg](../assets/visuals/extension-demo.svg) |
| ![Directory icon](../assets/icons/directory.svg)<br>Active Directory topology | [ad-sync-tree.svg](../assets/visuals/ad-sync-tree.svg) |
| ![Share icon](../assets/icons/share.svg)<br>Share lifecycle | [share-lifecycle.svg](../assets/visuals/share-lifecycle.svg) |
| ![Vault icon](../assets/icons/vault.svg)<br>Login lock screen (sanitized UI capture) | [login-lock-screen.png](../assets/screenshots/login-lock-screen.png) |
| ![Vault icon](../assets/icons/vault.svg)<br>Security dashboard (sanitized UI capture) | [overview-security-posture.png](../assets/screenshots/overview-security-posture.png) |
| ![Vault icon](../assets/icons/vault.svg)<br>Secret records (sanitized UI capture) | [passwords-record-list.png](../assets/screenshots/passwords-record-list.png) |
| ![Vault icon](../assets/icons/vault.svg)<br>Server System settings (sanitized UI capture) | [server-settings.png](../assets/screenshots/server-settings.png) |
| ![Security icon](../assets/icons/security.svg)<br>Discovery run scope (sanitized UI capture) | [discovery-run.png](../assets/screenshots/discovery-run.png) |
| ![Security icon](../assets/icons/security.svg)<br>Discovery findings (sanitized UI capture) | [discovery-findings.png](../assets/screenshots/discovery-findings.png) |
| ![Security icon](../assets/icons/security.svg)<br>Discovery import candidates (sanitized UI capture) | [discovery-import.png](../assets/screenshots/discovery-import.png) |
| ![Update icon](../assets/icons/update.svg)<br>Update Center (sanitized UI capture) | [update-center-vaultpilot-2.png](../assets/screenshots/update-center-vaultpilot-2.png) |
| ![Extension icon](../assets/icons/extension.svg)<br>Browser extension management (sanitized UI capture) | [browser-extension-management-vaultpilot-2.png](../assets/screenshots/browser-extension-management-vaultpilot-2.png) |
| ![Directory icon](../assets/icons/directory.svg)<br>Active Directory sync tree (sanitized UI capture) | [active-directory-sync-tree-vaultpilot-2.png](../assets/screenshots/active-directory-sync-tree-vaultpilot-2.png) |
| ![Share icon](../assets/icons/share.svg)<br>Sharing package flow (sanitized UI capture) | [sharing-package-flow-vaultpilot-2.png](../assets/screenshots/sharing-package-flow-vaultpilot-2.png) |

Offline Share Decrypter is a release ZIP workflow, so its behavior is documented in the sharing guide and release asset verification page rather than listed as an app-console screenshot.

## Documentation Rules

- Keep Turkish and English document sets paired.
- Use placeholders for hosts, users, tokens and license values.
- Do not include private source code, signing material, customer data, database files, local paths, real tokens or secrets.
- Publish binaries through GitHub Releases, not through the git tree.

Related public surfaces:

- [Repository home](../README.md)
- [Knowledge base](../kb/README.md)
- [Release notes](../RELEASES.md)
- [Security policy](../SECURITY.md)
- [Support policy](../SUPPORT.md)
- [Contribution rules](../CONTRIBUTING.md)
- [Public repository boundary](en/public-repository-boundary.md)
- [Public external surface drift](en/public-external-surface-drift.md)
- [Public screenshot standards](en/public-screenshot-standards.md)
- [Publication runbook](en/publication-runbook.md)
- [GitHub repository profile](en/github-repository-profile.md)
- [Public discoverability](en/public-discoverability.md)
- [Public language glossary](en/public-language-glossary.md)
- [Chrome Web Store listing and privacy](en/chrome-web-store-listing.md)
- [Public API reference](en/public-api-reference.md)
- [In-app screen help](en/in-app-screen-help.md)
- [Screen help target manifest](screen-help-targets.json)
- [Browser extension privacy policy](../PRIVACY.md)
