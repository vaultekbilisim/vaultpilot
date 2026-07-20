# Release Asset Verification

Use this page before installing or publishing a VaultPilot public release asset internally. The goal is to verify that the MSI and support packages match the signed manifest and the exact GitHub Release being evaluated.

## Release State

The current verified public release is GitHub Release [`v2.0.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0), published on June 30, 2026.

Treat the GitHub Release asset metadata as the public source of truth. Unpublished build output, copied files, support attachments and chat uploads are not release evidence.

## VaultPilot 2.0.0 Components

| Component | Version | Asset |
| --- | ---: | --- |
| VaultPilot Enterprise Vault Console | 2.0.0 | `VaultPilot-2.0.0-x64.msi` |
| Chromium Browser Extension | 1.3.2 | Chrome Web Store listing; `vaultpilot-browser-vault-extension.zip` release archive |
| Offline Share Decrypter | 1.2.0 | `vaultpilot-share-decrypter.zip` |
| VaultPilot DC Agent Service | 1.2.10 | `vaultpilot-dc-agent.ps1` |
| Update manifest | 2.0.0 channel metadata | `vaultpilot-update.json` |

## Public Asset Set

The public GitHub Release contains these customer-safe delivery assets. This table was checked against GitHub Release metadata on July 8, 2026:

| Asset | Size | SHA-256 |
| --- | ---: | --- |
| `VaultPilot-2.0.0-x64.msi` | 66,118,490 | `c3c3189572fc5936f30e0f14e5d12b2ed4702e3db0efd32a1c8d2eba65b67842` |
| `vaultpilot-update.json` | 1,430 | `a6610b266c4a3bee2d689615e5f1b2bccf15067af3d8c0094832b10d67fb9351` |
| `vaultpilot-browser-vault-extension.zip` | 181,103 | `7f95df52d796c8bb73196569dc77cfc220aadd7e971ca323825d505e947c02aa` |
| `vaultpilot-extension-update.json` | 257 | `de3b30a3cdc2a58188d6421f96d8e164ead5406ebbee614e1569ac20eec69f55` |
| `vaultpilot-share-decrypter.zip` | 102,632 | `b6cd0cdc8cd2bd670348fca2587f7ad6d54604d2fa3c9d159e6a35c15301ed8a` |
| `vaultpilot-share-decrypter.json` | 219 | `7dca1ad23057223a221eaa0058b6ae8a5dfa4d12cbbcdf73b4249545cd34211b` |
| `vaultpilot-dc-agent.ps1` | 98,891 | `de8c4df43ff69b9a277e2cfaf4cb14f553512cf13b318eec45b725db1113e0fc` |
| `vaultpilot-dc-agent.json` | 212 | `9082376283457eeddbffd3aee8d4e6ed1b46674d498d027467a9eff6308f7f4e` |

The Chrome Web Store listing is the primary customer install and update channel for the browser extension. The extension ZIP is retained only as a release archive, lab validation package, local development package or emergency fallback artifact.

PassMan-named compatibility files can exist in installed environments, rollback paths or source build output for legacy clients. They are not public release assets unless they appear on the GitHub Release being verified.

The git tree should not contain MSI, ZIP, EXE, PFX, P12, DB, SQLite, backup or signing-key files.

## Verification Steps

1. Open GitHub Release [`v2.0.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0).
2. Confirm the release tag is `v2.0.0` and the release is not draft or prerelease unless your internal policy explicitly allows it.
3. Download `vaultpilot-update.json` from that release.
4. Confirm the manifest lists server version `2.0.0`.
5. Confirm the MSI filename is `VaultPilot-2.0.0-x64.msi`.
6. Confirm each asset URL uses the approved public GitHub Release host.
7. Confirm each downloaded file size and SHA-256 matches the table above and the manifest where the component is listed.
8. Confirm the MSI Authenticode signer metadata matches the manifest signer thumbprint.
9. Confirm extension release archive, decrypter and DC Agent package hashes before internal redistribution; browser users should install and update the extension from Chrome Web Store.

## Windows Verification Commands

Run these commands from a temporary folder that contains the downloaded release files. Keep the output with internal release evidence; redact local paths or hostnames before sharing publicly.

```powershell
gh release view v2.0.0 --repo ucsahinn/vaultpilot --json tagName,name,isDraft,isPrerelease,publishedAt,assets,url

Get-ChildItem -File |
  Where-Object { $_.Name -like 'VaultPilot-2.0.0-x64.msi' -or $_.Name -like 'vaultpilot-*' } |
  Select-Object Name,Length

Get-FileHash .\VaultPilot-2.0.0-x64.msi -Algorithm SHA256
Get-FileHash .\vaultpilot-* -Algorithm SHA256

Get-AuthenticodeSignature .\VaultPilot-2.0.0-x64.msi |
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
