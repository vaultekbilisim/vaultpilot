# Support Evidence Pack

Use this checklist to prepare a clean, public-safe support handoff. It keeps the case useful without leaking secrets or customer environment details.

## Required Case Header

| Field | Example format |
| --- | --- |
| PassMan version | `1.8.20` |
| Surface | Login, installer, update, extension, AD sync, sharing, backup, license, HTTPS or audit. |
| Environment | Windows Server version and browser family. |
| Impact | One user, all users, one vault, one extension device, one AD provider, one update job. |
| Last known good | Date/time and previous version if known. |
| Current blocker | One sentence describing the user-visible failure. |

## Evidence By Surface

| Surface | Collect | Do not collect |
| --- | --- | --- |
| Installer | MSI filename, signature status, service state, redacted installer error. | MSI logs containing customer paths or credentials without redaction. |
| Login | Browser family, session state, `/api/auth/me` status, redacted timestamp. | Master password, TOTP secret, recovery material. |
| Update | Manifest version, hash, signer status, update job state. | Signing private key or internal download credentials. |
| Extension | Extension version, pair state, device row status, browser profile mode. | Plaintext credentials or extension PIN. |
| AD sync | Service status, redacted agent log, provider health. | AD bind password, agent token, full directory dump. |
| Sharing | Package expiry, max opens, decrypter error name. | Share passphrase, plaintext package contents. |
| Backup | Export/import status and integrity result. | Backup file itself unless a private channel explicitly requests it. |

## Redaction Rules

Replace real values with placeholders:

- `<PASSMAN_URL>`
- `<SERVER_HOST>`
- `<USER>`
- `<VAULT>`
- `<AGENT_ID>`
- `<AGENT_TOKEN>`
- `<LICENSE_CODE>`
- `<REDACTED>`

## Escalation Quality Bar

A good case includes:

- One clear symptom.
- The exact surface affected.
- Version and component versions.
- A short timeline.
- Redacted evidence from the matching KB article.
- What changed before the failure.
- Whether backup, login and audit are still accessible.

Related:

- [Knowledge base](../../kb/en/README.md)
- [Troubleshooting](troubleshooting.md)
- [Security and trust model](security-and-trust-model.md)
