<p align="center">
  <img src="assets/visuals/social-preview.svg" alt="PassMan Enterprise Vault Console" width="100%">
</p>

<h1 align="center">PassMan Enterprise Vault Console</h1>

<p align="center">
  <strong>Self-hosted, zero-knowledge secrets vault for Windows Server operations.</strong>
</p>

<p align="center">
  <a href="https://github.com/ucsahinn/passman-releases/releases/latest"><strong>Latest release</strong></a>
  ·
  <a href="docs/README.md"><strong>Documentation</strong></a>
  ·
  <a href="kb/README.md"><strong>Knowledge base</strong></a>
  ·
  <a href="SECURITY.md"><strong>Security</strong></a>
  ·
  <a href="SUPPORT.md"><strong>Support</strong></a>
</p>

<p align="center">
  <code>Current stable: 1.5.3</code>
  &nbsp;
  <code>Server: Windows MSI</code>
  &nbsp;
  <code>Docs: TR + EN</code>
  &nbsp;
  <code>Source: private</code>
</p>

---

![PassMan security posture dashboard](assets/screenshots/overview-security-posture.png)

## What This Repository Is

This repository is the public product, documentation, knowledge-base and release hub for PassMan Enterprise Vault Console. It is written for administrators, security operators and licensed customers who need installation guidance, update notes, operational runbooks and support-safe troubleshooting.

The product source code, private build pipeline, license issuer material and signing keys are intentionally not stored here. Installers and ZIP packages are published through GitHub Releases; this git tree contains only public-safe documentation, diagrams and sanitized screenshots.

## Product Snapshot

| Capability | What operators get |
| --- | --- |
| Enterprise vault console | Passwords, API keys, credentials, secure notes, certificates and file-backed secrets in one self-hosted console. |
| Zero-knowledge model | Secret payloads are encrypted before storage; unlock material stays in the active browser session. |
| Security posture | 2FA, audit chain, extension health, license state, update status and priority actions are visible from the overview. |
| Selected sharing | Only selected records and files are packaged; operators set expiry, maximum opens and recipient handling. |
| Browser extension | Pairing, active-site record count, autofill, save-login and update-login prompts for paired devices. |
| Directory integration | PassMan DC Agent Service runs as a Windows service and syncs AD OU, group and user metadata. |
| Operations | Offline licensing, signed updates, backups, diagnostics, HTTPS certificate upload and support-safe logs. |

## Current Release Assets

| Asset | Purpose | Delivery |
| --- | --- | --- |
| [PassMan-1.5.3-x64.msi](https://github.com/ucsahinn/passman-releases/releases/latest/download/PassMan-1.5.3-x64.msi) | Installs or upgrades PassMan Server on Windows. | GitHub Release |
| [passman-update.json](https://github.com/ucsahinn/passman-releases/releases/latest/download/passman-update.json) | Signed update manifest verified by PassMan. | GitHub Release |
| [passman-chromium-extension.zip](https://github.com/ucsahinn/passman-releases/releases/latest/download/passman-chromium-extension.zip) | Browser extension fallback package. | GitHub Release |
| [passman-share-decrypter.zip](https://github.com/ucsahinn/passman-releases/releases/latest/download/passman-share-decrypter.zip) | Offline external-share opening tool. | GitHub Release |
| [passman-ad-agent.ps1](https://github.com/ucsahinn/passman-releases/releases/latest/download/passman-ad-agent.ps1) | PassMan DC Agent Service installer and repair script. | GitHub Release |

Do not commit release binaries into this repository. Publish installers, archives and scripts as release assets.

## Component Versions

| Component | Version | Update path |
| --- | ---: | --- |
| PassMan Enterprise Vault Console | 1.5.3 | Windows MSI / Update Center |
| Chromium Browser Extension | 3.1.8 | Managed rollout or ZIP fallback |
| Offline Share Decrypter | 1.2.0 | Bundled support component and release ZIP |
| PassMan DC Agent Service | 1.0.10 | Bundled support component and release script |

## Fast Operator Path

1. Install the Windows Server MSI as Administrator.
2. Open `http://<SERVER_HOST>:1903` from a browser.
3. Create the owner profile, unlock the vault and apply the license.
4. Configure the public host and upload the required HTTPS certificate package.
5. Enable 2FA, confirm audit-chain health and review the overview action queue.
6. Pair the Chromium extension for approved browsers.
7. Configure the PassMan DC Agent Service if AD scope is needed.
8. Review backup, restore, update and support evidence procedures.

## Documentation Map

| Guide | Turkish | English |
| --- | --- | --- |
| Overview | [TR](docs/tr/overview.md) | [EN](docs/en/overview.md) |
| Windows Server installation | [TR](docs/tr/install-windows-server.md) | [EN](docs/en/install-windows-server.md) |
| First run, owner and license | [TR](docs/tr/first-run-owner-license.md) | [EN](docs/en/first-run-owner-license.md) |
| Public host and HTTPS | [TR](docs/tr/public-host-https-certificate.md) | [EN](docs/en/public-host-https-certificate.md) |
| Update Center | [TR](docs/tr/update-center.md) | [EN](docs/en/update-center.md) |
| Browser extension | [TR](docs/tr/browser-extension.md) | [EN](docs/en/browser-extension.md) |
| Active Directory agent | [TR](docs/tr/active-directory-agent.md) | [EN](docs/en/active-directory-agent.md) |
| Sharing and offline decrypter | [TR](docs/tr/sharing-and-offline-decrypter.md) | [EN](docs/en/sharing-and-offline-decrypter.md) |
| Backups and restore | [TR](docs/tr/backups-and-restore.md) | [EN](docs/en/backups-and-restore.md) |
| Audit and security posture | [TR](docs/tr/audit-and-security-posture.md) | [EN](docs/en/audit-and-security-posture.md) |
| Troubleshooting | [TR](docs/tr/troubleshooting.md) | [EN](docs/en/troubleshooting.md) |
| FAQ | [TR](docs/tr/faq.md) | [EN](docs/en/faq.md) |

## Real Product Screenshots

All screenshots below are captured from the actual PassMan application with sanitized demo data.

| Surface | Screenshot |
| --- | --- |
| Login / lock screen | ![PassMan login lock screen](assets/screenshots/login-lock-screen.png) |
| Security posture overview | ![PassMan overview dashboard](assets/screenshots/overview-security-posture.png) |
| Password record list | ![PassMan password record list](assets/screenshots/passwords-record-list.png) |
| Sharing package flow | ![PassMan sharing flow](assets/screenshots/sharing-package-flow.png) |
| Update Center | ![PassMan update center](assets/screenshots/update-center.png) |
| Browser extension management | ![PassMan browser extension management](assets/screenshots/browser-extension-management.png) |
| Active Directory sync tree | ![PassMan Active Directory sync tree](assets/screenshots/active-directory-sync-tree.png) |
| Offline share decrypter | ![PassMan offline share decrypter](assets/screenshots/offline-share-decrypter.png) |

## Knowledge Base

| Incident path | English | Turkish |
| --- | --- | --- |
| MSI installation fails | [EN](kb/en/msi-installation-fails.md) | [TR](kb/tr/msi-installation-fails.md) |
| Update stays around 76 percent | [EN](kb/en/update-stuck-76.md) | [TR](kb/tr/update-stuck-76.md) |
| DC Agent service cannot connect | [EN](kb/en/dc-agent-service.md) | [TR](kb/tr/dc-agent-service.md) |
| Extension pairing remains pending | [EN](kb/en/extension-pairing.md) | [TR](kb/tr/extension-pairing.md) |
| Certificate warning | [EN](kb/en/certificate-warning.md) | [TR](kb/tr/certificate-warning.md) |
| Audit chain is partial | [EN](kb/en/audit-chain-partial.md) | [TR](kb/tr/audit-chain-partial.md) |
| License is read-only | [EN](kb/en/license-read-only.md) | [TR](kb/tr/license-read-only.md) |
| External share package fails | [EN](kb/en/external-share-fails.md) | [TR](kb/tr/external-share-fails.md) |

## Update Trust Model

PassMan-managed updates verify the signed manifest, release asset metadata, SHA-256 checksum and MSI signer thumbprint before starting the MSI flow. A global CA chain is not required for PassMan-managed update trust when the signed manifest pins the local release signer thumbprint. CA-backed or trusted-signing certificates remain recommended for Windows reputation and broad OS-level trust.

## Public Safety Boundary

Never upload or paste these materials into this repository, public issues, comments or support threads:

- Plaintext secrets, passwords, share passphrases or vault contents.
- AD bind passwords, agent tokens, license private keys or update signing private keys.
- Databases, backups, PFX/P12 files, private keys or logs with sensitive values.
- Screenshots showing real secret records, users, customer URLs or internal infrastructure.

Use placeholders such as `<PASSMAN_URL>`, `<SERVER_HOST>`, `<AGENT_ID>`, `<AGENT_TOKEN>` and `<LICENSE_CODE>` in public examples.

## Repository Validation

Run before publishing public documentation changes:

```powershell
npm run validate
```

The validation checks local links, TR/EN doc parity, required visual assets, required real screenshots, stale release wording, forbidden public-site leftovers, large release binaries and secret-like public patterns.
