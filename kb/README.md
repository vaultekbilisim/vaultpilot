# VaultPilot Knowledge Base Gateway

This knowledge base is the public-safe incident navigator for VaultPilot Enterprise Vault Console. It is designed for fast diagnosis without exposing customer data, secret values, license material or local infrastructure.

Current verified public release: **VaultPilot Enterprise Vault Console 2.0.0**, published as GitHub Release [`v2.0.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0) on June 30, 2026.

| Language | Incident navigator |
| --- | --- |
| English | [English knowledge base](en/README.md) |
| Turkish | [Türkçe bilgi bankası](tr/README.md) |

## Fast Incident Paths

| Symptom | English | Turkish | First evidence to collect |
| --- | --- | --- | --- |
| MSI installation fails | [EN](en/msi-installation-fails.md) | [TR](tr/msi-installation-fails.md) | MSI name, installer log, Windows service state. |
| Update stays around 76 percent | [EN](en/update-stuck-76.md) | [TR](tr/update-stuck-76.md) | Update job JSON, MSI signature line, Windows Installer event. |
| DC Agent service cannot connect or returns 401 | [EN](en/dc-agent-service.md) | [TR](tr/dc-agent-service.md) | Service status, agent log, VaultPilot URL reachability, redacted server auth reason. |
| Extension pairing remains pending | [EN](en/extension-pairing.md) | [TR](tr/extension-pairing.md) | Pairing code state, device row, browser profile mode. |
| Chrome Web Store review or privacy mismatch | [EN](en/chrome-web-store-review.md) | [TR](tr/chrome-web-store-review.md) | Extension ID, package version, privacy categories, permissions and sanitized screenshots. |
| Login creates 401 or 403 noise after unlock | [EN](en/session-401-after-login.md) | [TR](tr/session-401-after-login.md) | Login time, affected endpoint list, whether `/api/auth/me` returns 200. |
| Integration API client gets 401, scope denied, or no data | [EN](en/api-client-401.md) | [TR](tr/api-client-401.md) | Client status, endpoint scope, assigned vault count when `SECRETS_READ` is used. |
| Certificate warning | [EN](en/certificate-warning.md) | [TR](tr/certificate-warning.md) | Hostname, certificate SAN, uploaded package type. |
| Server settings need restart or maintenance review | [EN](en/server-settings-restart-maintenance.md) | [TR](tr/server-settings-restart-maintenance.md) | Service state, canonical URL, HTTPS state, notification test and retention values. |
| Backup import fails or closes sessions | [EN](en/backup-import-fails.md) | [TR](tr/backup-import-fails.md) | File type, size, archive shape, error code, and whether sessions were closed. |
| Audit chain is partial | [EN](en/audit-chain-partial.md) | [TR](tr/audit-chain-partial.md) | Audit screen filters, latest chain status, recent restore/update events. |
| License is read-only | [EN](en/license-read-only.md) | [TR](tr/license-read-only.md) | License state, plan limits, active users, license expiry. |
| Discovery finding needs review or import is disabled | [EN](en/discovery-finding-review.md) | [TR](tr/discovery-finding-review.md) | Scope approval, finding status, evidence hash, vault unlock state. |
| Public issue needs redaction review | [EN](en/public-issue-redaction.md) | [TR](tr/public-issue-redaction.md) | Version, component, redacted error state and placeholder host shape. |
| Public screenshot may contain sensitive data | [EN](en/public-screenshot-redaction.md) | [TR](tr/public-screenshot-redaction.md) | Full-size visual check, sensitive-data category, replacement path and rotation boundary. |
| Public validation fails | [EN](en/public-validation-fails.md) | [TR](tr/public-validation-fails.md) | Failing command, validator message, staged-vs-working-tree state and safe recovery path. |
| External share package fails | [EN](en/external-share-fails.md) | [TR](tr/external-share-fails.md) | Package metadata, expiry, max opens, decrypter error state. |

## Standard Evidence Checklist

Collect only redacted, support-safe information:

- VaultPilot server version and component versions.
- Windows Server version.
- MSI filename and signature status.
- Configured host, port and HTTPS state.
- License state, not the license private material.
- Active user count and affected role.
- Redacted timestamps and log excerpts.
- Whether the issue affects login, vault records, sharing, extension, AD sync, backup, update or installer flow.

## Redaction Rules

Do not share:

- Master passwords, secret values or share passphrases.
- AD bind passwords, agent tokens or license private keys.
- Database files, backups, PFX/P12 files or private keys.
- Screenshots that reveal real secret records, users, internal URLs or customer data.

Use placeholders such as `<VAULTPILOT_URL>`, `<SERVER_HOST>`, `<AGENT_ID>`, `<AGENT_TOKEN>`, `<LICENSE_CODE>` and `<REDACTED>`.

Related surfaces:

- [Repository home](../README.md)
- [Documentation](../docs/README.md)
- [Security policy](../SECURITY.md)
- [Support policy](../SUPPORT.md)
- [Public repository boundary](../docs/en/public-repository-boundary.md)
- [Public screenshot standards](../docs/en/public-screenshot-standards.md)
