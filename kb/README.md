# PassMan Knowledge Base

Redaction-first operational troubleshooting for PassMan Enterprise Vault Console. Use these articles when an operator needs a public-safe diagnosis path without exposing secrets, customer data, license material or local infrastructure.

## Fast Incident Paths

| Symptom | English | Turkish | First evidence to collect |
| --- | --- | --- | --- |
| MSI installation fails | [EN](en/msi-installation-fails.md) | [TR](tr/msi-installation-fails.md) | MSI name, installer log, Windows service state. |
| Update stays around 76 percent | [EN](en/update-stuck-76.md) | [TR](tr/update-stuck-76.md) | Update job JSON, MSI signature line, Windows Installer event. |
| DC Agent service cannot connect | [EN](en/dc-agent-service.md) | [TR](tr/dc-agent-service.md) | Service status, agent log, PassMan URL reachability. |
| Extension pairing remains pending | [EN](en/extension-pairing.md) | [TR](tr/extension-pairing.md) | Pairing code state, device row, browser profile mode. |
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
