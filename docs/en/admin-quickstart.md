# Admin Quickstart

Use this guide when the goal is to move from public release download to a healthy first vault without reading the full wiki first. It is intentionally operational: every step has an expected proof and a rollback hint.

## Day-0 Path

| Step | Action | Proof |
| --- | --- | --- |
| 1 | Download `PassMan-1.8.19-x64.msi` from the latest GitHub Release. | File name, file size and release tag match [release assets](release-asset-verification.md). |
| 2 | Verify the signed update manifest before trusting the package. | `passman-update.json` lists version `1.8.19`, MSI hash, size and signer thumbprint. |
| 3 | Install the MSI from an elevated Windows session. | `PassMan Server` service exists and is running. |
| 4 | Open `https://<SERVER_HOST>:1903`. | The server responds; managed self-signed HTTPS may show a browser certificate warning until a trusted certificate is configured. |
| 5 | Create the first owner profile and unlock the default vault through HTTPS or `localhost`. | Owner appears in Users and the first vault is available. |
| 6 | Apply the license. | License page shows active state, capacity and expiry. |
| 7 | Configure public host and HTTPS. | Browser reaches the intended host without a mismatch warning. |
| 8 | Enable 2FA for the owner. | Lock and unlock require master password plus authenticator code. |
| 9 | Export an encrypted backup. | Backup file imports into a clean validation profile or staging host. |
| 10 | Review security posture and audit chain. | Overview actions are understood and audit chain health is visible. |

## Minimum Environment

| Requirement | Baseline |
| --- | --- |
| Host | Windows Server or approved Windows service host. |
| Port | Default HTTP port `1903`, reachable by intended operators. |
| Browser | Chromium-family browser for extension pairing; modern browser for console use. |
| Permissions | Administrator rights for MSI install and update. |
| Data model | Local PassMan data directory; do not place the database in this public repo. |
| Backup | Operator-controlled encrypted backup location outside the install directory. |

## First Validation Commands

Run these from an elevated PowerShell session on the server:

```powershell
sc.exe query PassManServer
netstat -ano | findstr ":1903"
```

Collect only redacted command output if support is needed. Do not upload databases, backups, certificate private keys or raw logs containing secret values.

## Stop Conditions

Stop and move to the knowledge base if:

- The MSI does not create the service.
- The service runs but the browser cannot reach `https://<SERVER_HOST>:1903`.
- The first owner cannot unlock after profile creation.
- The license page is read-only unexpectedly.
- The browser shows an HTTPS name mismatch after certificate upload.
- Update Center reports a manifest, checksum or signer mismatch.

Related:

- [Windows Server installation](install-windows-server.md)
- [First run, owner and license](first-run-owner-license.md)
- [Public host and HTTPS](public-host-https-certificate.md)
- [Release asset verification](release-asset-verification.md)
- [Support evidence pack](support-evidence-pack.md)
