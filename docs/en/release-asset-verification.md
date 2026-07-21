# Release Asset Verification

Use this page before installing or publishing a VaultPilot public release asset internally. The goal is to verify that the MSI and support packages match the signed manifest and the exact GitHub Release being evaluated.

## Release State

The current verified public release is GitHub Release [`v2.2.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.2.0), published on July 21, 2026.

Treat the GitHub Release asset metadata as the public source of truth. Unpublished build output, copied files, support attachments and chat uploads are not release evidence.

## VaultPilot 2.2.0 Components

| Component | Version | Asset |
| --- | ---: | --- |
| VaultPilot Enterprise Vault Console | 2.2.0 | `VaultPilot-2.2.0-x64.msi` |
| Chromium Browser Extension | Chrome Web Store 1.3.3; v2.2.0 archive 1.3.3 | Chrome Web Store listing; no ZIP in the default update manifest |
| Offline Share Decrypter | 1.2.1 | `vaultpilot-share-decrypter.zip` |
| VaultPilot DC Agent Service | 1.2.21 | `vaultpilot-dc-agent.ps1` |
| Update manifest | 2.2.0 channel metadata | `vaultpilot-update.json` |

## VaultPilot 2.2.0 Release Evidence

This matrix records the independently checked public `v2.2.0` asset set used for customer downloads.

| Component | Version | Delivery |
| --- | ---: | --- |
| VaultPilot Enterprise Vault Console | 2.2.0 | Versioned Windows MSI and signed update manifest |
| Chromium Browser Extension | 1.3.3 | Chrome Web Store version already live; versioned release archive prepared for v2.2.0 |
| Offline Share Decrypter | 1.2.1 | Versioned release archive and signed component manifest |
| VaultPilot DC Agent Service | 1.2.21 | Versioned PowerShell asset and signed component manifest |
| VaultPilot Backup Tool | 1.0.1 | Bundled server support component; not a separate GitHub Release asset |
| VaultPilot Log Collector | 1.0.1 | Bundled server support component; not a separate GitHub Release asset |

## Public Asset Set

The public GitHub Release contains these customer-safe delivery assets. This table records the locally verified publication set issued on July 21, 2026:

| Asset | Size | SHA-256 |
| --- | ---: | --- |
| `VaultPilot-2.2.0-x64.msi` | 65,617,920 | `bbbb22beeb556e6121beb5e8875499a9057b09f50052ff5dba8749af038f3fb7` |
| `vaultpilot-update.json` | 1,375 | `28f35b33239971d6e5f527a43f6735190ef73c11276781bcd4070a3669f53d58` |
| `vaultpilot-share-decrypter.zip` | 102,628 | `3f2475e96ecbcb4606878fcf3646c106f49f30be9a666cd23310ba250261d449` |
| `vaultpilot-share-decrypter.json` | 219 | `aa2d71a8209399c50e0b1b16ba2f8eed83e42161c500d17853b85b87d328fca4` |
| `vaultpilot-dc-agent.ps1` | 235,246 | `1e4cdccdf08b577360f38c09b29720928ac90749904b6a5749505178e5280e36` |
| `vaultpilot-dc-agent.json` | 213 | `e92fefcb1df68959de94786877a7bbcf9ec4895af309afaabd819a7acfcde2aa` |
| `PassMan-2.2.0-x64.msi` | 65,617,920 | `bbbb22beeb556e6121beb5e8875499a9057b09f50052ff5dba8749af038f3fb7` |
| `passman-update.json` | 1,357 | `60a326e08c390df85d00f5e13d1d2805edcdc2e7b8be37c5e5a14d03071ce4d9` |
| `passman-share-decrypter.zip` | 102,628 | `3f2475e96ecbcb4606878fcf3646c106f49f30be9a666cd23310ba250261d449` |
| `passman-share-decrypter.json` | 216 | `d9490a761c5413ef957bd08e1e4ae1ad6c5e7c6f7df59cc38bb600e0f27c6304` |
| `passman-ad-agent.ps1` | 235,246 | `1e4cdccdf08b577360f38c09b29720928ac90749904b6a5749505178e5280e36` |
| `passman-ad-agent.json` | 210 | `ce9b9dd52f73a9c0f2e461891127ff49a8a0dc5f3a340ec32e1c215f0b88bb1f` |

The Chrome Web Store listing is the primary customer install and update channel for the browser extension and can advance independently from a GitHub Release. The live store reports `1.3.3`; the default `v2.2.0` update manifest does not publish an extension ZIP.

The MSI is signed with the manifest-pinned VaultPilot development signer and has no RFC3161 timestamp. VaultPilot-managed updates still verify the signed manifest, exact SHA-256 and signer thumbprint, but Windows trust and SmartScreen reputation remain environment-dependent. Repair and authenticated Health evidence passed for the published MSI hash; physical Windows Sandbox installation was explicitly deferred because Windows Sandbox was unavailable on the release host.

PassMan-named compatibility files can exist in installed environments, rollback paths or source build output for legacy clients. They are not public release assets unless they appear on the GitHub Release being verified.

The git tree should not contain MSI, ZIP, EXE, PFX, P12, DB, SQLite, backup or signing-key files.

## Verification Steps

1. Open GitHub Release [`v2.2.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.2.0).
2. Confirm the release tag is `v2.2.0` and the release is not draft or prerelease unless your internal policy explicitly allows it.
3. Download `vaultpilot-update.json` from that release.
4. Confirm the manifest lists server version `2.2.0`.
5. Confirm the MSI filename is `VaultPilot-2.2.0-x64.msi`.
6. Confirm each asset URL uses the approved public GitHub Release host.
7. Confirm each downloaded file size and SHA-256 matches the table above and the manifest where the component is listed.
8. Confirm the MSI Authenticode signer metadata matches the manifest signer thumbprint.
9. Confirm extension release archive, decrypter and DC Agent package hashes before internal redistribution; browser users should install and update the extension from Chrome Web Store.

## Windows Verification Commands

Run these commands from a temporary folder that contains the downloaded release files. Keep the output with internal release evidence; redact local paths or hostnames before sharing publicly.

```powershell
gh release view v2.2.0 --repo ucsahinn/vaultpilot --json tagName,name,isDraft,isPrerelease,publishedAt,assets,url

Get-ChildItem -File |
  Where-Object { $_.Name -like 'VaultPilot-2.2.0-x64.msi' -or $_.Name -like 'vaultpilot-*' } |
  Select-Object Name,Length

Get-FileHash .\VaultPilot-2.2.0-x64.msi -Algorithm SHA256
Get-FileHash .\vaultpilot-* -Algorithm SHA256

Get-AuthenticodeSignature .\VaultPilot-2.2.0-x64.msi |
  Format-List Status,StatusMessage,SignerCertificate
```

If `gh release view` shows a different tag, draft/prerelease state, asset count, size, digest or URL, stop and update this page and the public external-surface drift register before continuing.

## What To Record Internally

| Evidence | Safe to record publicly? |
| --- | --- |
| Release tag, file names, sizes and hashes | Yes. |
| MSI signer subject and thumbprint | Yes. |
| Manifest signature value | Yes. |
| Local install path, private hostnames and user names | Redact first. |
| License code, signing private key, PFX/P12 or database | Never. |

## If Verification Fails

Do not install or redistribute the package. Collect the release tag, asset name, expected hash, observed hash, file size and signer status, then use the licensed support channel from your purchase or onboarding materials.

Related:

- [Update Center](update-center.md)
- [Uninstall, data retention and rollback](uninstall-rollback-data-retention.md)
- [Security and trust model](security-and-trust-model.md)
- [Support evidence pack](support-evidence-pack.md)
