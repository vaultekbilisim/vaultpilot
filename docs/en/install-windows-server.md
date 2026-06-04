# Windows Server Installation

This runbook covers a normal PassMan Server installation or in-place upgrade on Windows. Use it before opening the server to other users.

## Requirements

| Requirement | Notes |
| --- | --- |
| Windows Server or approved Windows host | Use a controlled host with stable storage and backup policy. |
| Administrator rights | Required for the MSI, service registration and firewall rule. |
| Inbound TCP access | Default port is `1903`; change only if your network policy requires it. |
| Backup decision | Export or preserve the existing data directory before production upgrades. |
| Release assets | Use the MSI and update manifest from GitHub Releases, not files copied from chat or support threads. |

## Install

1. Download `PassMan-1.8.19-x64.msi` from the latest GitHub Release.
2. Verify the filename, source, checksum and signer before running it. Use [release asset verification](release-asset-verification.md) when you need the full checklist.
3. Run the MSI as Administrator.
4. The installer prepares the standalone server, bundled Node runtime, Prisma/SQLite runtime files, Windows service, firewall rule, data directory and log directory.
5. Open PassMan from the server first:

```text
https://127.0.0.1:1903
```

Then validate remote access:

```text
https://<SERVER_HOST>:1903
```

First-run profile creation and vault unlock require browser Web Crypto. Use HTTPS or `localhost` for those crypto operations; plain HTTP server-IP access should show the secure-context warning instead of a generic profile creation error.

## Installed Surfaces

| Surface | Value |
| --- | --- |
| Windows service | `PassManServer` |
| Display name | `PassMan Server` |
| Data directory | `C:\ProgramData\PassMan` |
| Log directory | `C:\ProgramData\PassMan\logs` |
| Default port | `1903` |
| Browser entry | `https://<SERVER_HOST>:1903` with managed self-signed HTTPS until a trusted certificate is configured |

## Post-Install Validation

Run these checks before creating broad access:

```powershell
sc.exe query PassManServer
```

```text
https://127.0.0.1:1903/api/profile
```

Expected result:

- The service is installed and running.
- The local API responds.
- The remote URL opens from an approved workstation.
- The firewall rule allows only the intended network path.
- No installer error remains in the PassMan log folder.

## First Login Path

After service validation:

1. Create the owner profile.
2. Unlock the vault with the master password.
3. Apply the license.
4. Configure public host and HTTPS.
5. Enable 2FA before adding additional users.

## Upgrade Notes

- Export a backup before production upgrades.
- Let the MSI update the server and support components together.
- The offline decrypter and DC agent script are refreshed by the MSI and also documented in release notes.
- Do not manually replace files under the installed server directory unless support explicitly asks for that diagnostic step.

## Public Evidence For Support

Safe to share after redaction:

- MSI filename.
- PassMan server version.
- Windows service status.
- Redacted installer log excerpt.
- Browser URL shape, with real host replaced by `<SERVER_HOST>`.

Do not share databases, backups, PFX/P12 files, private keys, master passwords, secret values or real internal hostnames.
