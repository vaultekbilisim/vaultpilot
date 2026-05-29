# PassMan Enterprise Vault Console

PassMan is a self-hosted, zero-knowledge enterprise password and secrets vault for Windows Server environments. It is installed with an MSI, runs on the customer's own Windows server, and is accessed from browsers through the server IP or DNS name.

This public repository contains product documentation, knowledge-base articles, release notes, and GitHub Release downloads. The product source code and signing workflow remain private.

## Product Site

- Public product hub: https://ucsahinn.github.io/passman-releases/
- Documentation hub: https://ucsahinn.github.io/passman-releases/docs/
- Knowledge base: https://ucsahinn.github.io/passman-releases/kb/

## Current Stable Release

**PassMan 1.5.3**

- Latest release: https://github.com/ucsahinn/passman-releases/releases/latest
- MSI: https://github.com/ucsahinn/passman-releases/releases/latest/download/PassMan-1.5.3-x64.msi
- Signed update manifest: https://github.com/ucsahinn/passman-releases/releases/latest/download/passman-update.json
- Browser extension ZIP: https://github.com/ucsahinn/passman-releases/releases/latest/download/passman-chromium-extension.zip
- Offline share decrypter ZIP: https://github.com/ucsahinn/passman-releases/releases/latest/download/passman-share-decrypter.zip
- PassMan DC Agent script: https://github.com/ucsahinn/passman-releases/releases/latest/download/passman-ad-agent.ps1

## Component Versions

| Component | Version | How it is delivered |
| --- | ---: | --- |
| PassMan Enterprise Vault Console | 1.5.3 | Windows MSI |
| Chromium browser extension | 3.1.8 | ZIP fallback package and managed extension rollout support |
| Offline Share Decrypter | 1.2.0 | ZIP package included in release assets |
| PassMan DC Agent Service | 1.0.10 | PowerShell service installer script included in release assets |

The Update Center exposes the main MSI and browser extension as actionable update surfaces. The Offline Share Decrypter and PassMan DC Agent Service are support components refreshed by the MSI and documented in release notes.

## What PassMan Provides

- Self-hosted Windows Server runtime with no cloud database dependency.
- Browser-side encryption before secrets are stored.
- RAM-only unlock model for master-derived key material.
- Passwords, API keys, credentials, secure notes, certificates, and file-backed secrets.
- Internal and external selected-record sharing.
- Offline external-share decryption with expiry and usage limits.
- Chromium extension pairing, autofill, save/update prompts, and active-site badge counts.
- Active Directory integration through PassMan DC Agent Service.
- Audit chain visibility, user/RBAC management, offline licensing, backups, update verification, and server diagnostics.

## Documentation

| Language | Start here |
| --- | --- |
| Turkish | [docs/tr/overview.md](docs/tr/overview.md) |
| English | [docs/en/overview.md](docs/en/overview.md) |

Common guides:

- [TR: Windows Server kurulumu](docs/tr/install-windows-server.md)
- [TR: Public host, HTTPS ve sertifika](docs/tr/public-host-https-certificate.md)
- [TR: Active Directory ajanı](docs/tr/active-directory-agent.md)
- [TR: Paylaşım ve offline decrypter](docs/tr/sharing-and-offline-decrypter.md)
- [EN: Windows Server installation](docs/en/install-windows-server.md)
- [EN: Public host, HTTPS and certificates](docs/en/public-host-https-certificate.md)
- [EN: Active Directory agent](docs/en/active-directory-agent.md)
- [EN: Sharing and offline decrypter](docs/en/sharing-and-offline-decrypter.md)
- [KB: installation and operations](kb/index.html)

Full release history is in [RELEASES.md](RELEASES.md).

## Visual Assets

The public site includes safe demo visuals and diagrams under `assets/visuals/`. These files use mock data only and are safe for public product explanation:

- Enterprise overview console demo.
- Chromium extension badge/autofill demo.
- Zero-knowledge browser/server flow.
- Signed update trust chain.
- Active Directory tree sync concept.
- Offline sharing lifecycle.

## Update Verification

PassMan-managed updates verify the signed update manifest, pinned SHA-256 checksums, file metadata, and MSI signer thumbprint before exposing update packages in the application.

PassMan does not require a global CA chain for its own update trust when the signed manifest pins the local release signer. A CA-backed or trusted-signing certificate is still recommended for Windows SmartScreen reputation and broad OS-level trust.

## Licensing

PassMan is distributed for licensed users. This repository is not an open-source source-code repository.

## Security

Do not upload private keys, signing certificates, database files, environment files, AD bind credentials, agent tokens, license issuer material, customer data, logs, or screenshots containing secrets to this repository.

Installers, ZIP packages, PowerShell scripts, and signed manifests belong in GitHub Releases, not in the git tree.

## Repository Validation

Run before publishing public documentation changes:

```powershell
npm run validate
```

The validation checks local links, TR/EN doc parity, required visual assets, stale latest-version wording, and forbidden secret-like patterns.
