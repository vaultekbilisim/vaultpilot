# PassMan Knowledge Base Gateway

This knowledge base is the public-safe incident navigator for PassMan Enterprise Vault Console. It is designed for fast diagnosis without exposing customer data, secret values, license material or local infrastructure.

Current supported public release: **PassMan Enterprise Vault Console 1.8.20**.

| Language | Incident navigator |
| --- | --- |
| English | [English knowledge base](en/README.md) |
| Turkish | [Türkçe bilgi bankası](tr/README.md) |

## Fast Incident Paths

| Symptom | English | Turkish | First evidence to collect |
| --- | --- | --- | --- |
| MSI installation fails | [EN](en/msi-installation-fails.md) | [TR](tr/msi-installation-fails.md) | MSI name, installer log, Windows service state. |
| Update stays around 76 percent | [EN](en/update-stuck-76.md) | [TR](tr/update-stuck-76.md) | Update job JSON, MSI signature line, Windows Installer event. |
| DC Agent service cannot connect or returns 401 | [EN](en/dc-agent-service.md) | [TR](tr/dc-agent-service.md) | Service status, agent log, PassMan URL reachability, redacted server auth reason. |
| Extension pairing remains pending | [EN](en/extension-pairing.md) | [TR](tr/extension-pairing.md) | Pairing code state, device row, browser profile mode. |
| Login creates 401 or 403 noise after unlock | [EN](en/session-401-after-login.md) | [TR](tr/session-401-after-login.md) | Login time, affected endpoint list, whether `/api/auth/me` returns 200. |
| Certificate warning | [EN](en/certificate-warning.md) | [TR](tr/certificate-warning.md) | Hostname, certificate SAN, uploaded package type. |
| Audit chain is partial | [EN](en/audit-chain-partial.md) | [TR](tr/audit-chain-partial.md) | Audit screen filters, latest chain status, recent restore/update events. |
| License is read-only | [EN](en/license-read-only.md) | [TR](tr/license-read-only.md) | License state, plan limits, active users, license expiry. |
| External share package fails | [EN](en/external-share-fails.md) | [TR](tr/external-share-fails.md) | Package metadata, expiry, max opens, decrypter error state. |

## Standard Evidence Checklist

Collect only redacted, support-safe information:

- PassMan server version and component versions.
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

Use placeholders such as `<PASSMAN_URL>`, `<SERVER_HOST>`, `<AGENT_ID>`, `<AGENT_TOKEN>`, `<LICENSE_CODE>` and `<REDACTED>`.

Related surfaces:

- [Repository home](../README.md)
- [Documentation](../docs/README.md)
- [Security policy](../SECURITY.md)
- [Support policy](../SUPPORT.md)
