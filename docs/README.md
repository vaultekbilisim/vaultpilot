# PassMan Documentation

Public-safe operator documentation for PassMan Enterprise Vault Console. This folder is intended to read like a compact GitHub wiki: start with the lifecycle section that matches the job, then use the linked runbooks and KB entries for evidence collection.

## Start Here

| Language | Entry point |
| --- | --- |
| Turkish | [TR overview](tr/overview.md) |
| English | [EN overview](en/overview.md) |

## Operator Lifecycle

| Stage | Guides |
| --- | --- |
| Plan | [Overview](en/overview.md), [FAQ](en/faq.md), [Security policy](../SECURITY.md) |
| Install | [Windows Server installation](en/install-windows-server.md), [First run, owner and license](en/first-run-owner-license.md) |
| Publish | [Public host and HTTPS](en/public-host-https-certificate.md), [Browser extension](en/browser-extension.md) |
| Secure | [Audit and security posture](en/audit-and-security-posture.md), [Active Directory agent](en/active-directory-agent.md) |
| Operate | [Sharing and offline decrypter](en/sharing-and-offline-decrypter.md), [Backups and restore](en/backups-and-restore.md), [Update Center](en/update-center.md) |
| Diagnose | [Troubleshooting](en/troubleshooting.md), [Knowledge base](../kb/README.md), [Support policy](../SUPPORT.md) |

## Guide Map

| Guide | Turkish | English | Purpose |
| --- | --- | --- | --- |
| Overview | [TR](tr/overview.md) | [EN](en/overview.md) | Product map, runtime model and recommended path. |
| Windows Server installation | [TR](tr/install-windows-server.md) | [EN](en/install-windows-server.md) | MSI install, service state, port, logs and validation. |
| First run, owner and license | [TR](tr/first-run-owner-license.md) | [EN](en/first-run-owner-license.md) | Owner profile, license activation and first-run checks. |
| Public host and HTTPS | [TR](tr/public-host-https-certificate.md) | [EN](en/public-host-https-certificate.md) | Hostname, certificate package upload and browser validation. |
| Update Center | [TR](tr/update-center.md) | [EN](en/update-center.md) | Signed manifest, MSI updates and component release notes. |
| Browser extension | [TR](tr/browser-extension.md) | [EN](en/browser-extension.md) | Pairing, badge counts, autofill and save/update prompts. |
| Active Directory agent | [TR](tr/active-directory-agent.md) | [EN](en/active-directory-agent.md) | PassMan DC Agent Service install, repair, logs and sync tree. |
| Sharing and offline decrypter | [TR](tr/sharing-and-offline-decrypter.md) | [EN](en/sharing-and-offline-decrypter.md) | Internal sharing, external packages, files, expiry and usage limits. |
| Backups and restore | [TR](tr/backups-and-restore.md) | [EN](en/backups-and-restore.md) | Encrypted backup export, integrity and restore checks. |
| Audit and security posture | [TR](tr/audit-and-security-posture.md) | [EN](en/audit-and-security-posture.md) | Audit chain, posture score and risk actions. |
| Troubleshooting | [TR](tr/troubleshooting.md) | [EN](en/troubleshooting.md) | Common operational failure states. |
| FAQ | [TR](tr/faq.md) | [EN](en/faq.md) | Short answers for operators and administrators. |

## Visual References

| Surface | Asset |
| --- | --- |
| Security dashboard | [overview-security-posture.png](../assets/screenshots/overview-security-posture.png) |
| Secret records | [passwords-record-list.png](../assets/screenshots/passwords-record-list.png) |
| Sharing lifecycle | [sharing-package-flow.png](../assets/screenshots/sharing-package-flow.png) |
| AD sync tree | [active-directory-sync-tree.png](../assets/screenshots/active-directory-sync-tree.png) |
| Offline decrypter | [offline-share-decrypter.png](../assets/screenshots/offline-share-decrypter.png) |

## Documentation Rules

- Keep TR and EN document sets paired.
- Use placeholders for hosts, users, tokens and license values.
- Do not include private source code, signing material, customer data, database files, local paths, real tokens or secrets.
- Publish binaries through GitHub Releases, not through the git tree.

Related public surfaces:

- [Repository home](../README.md)
- [Knowledge base](../kb/README.md)
- [Release notes](../RELEASES.md)
- [Security policy](../SECURITY.md)
- [Support policy](../SUPPORT.md)
