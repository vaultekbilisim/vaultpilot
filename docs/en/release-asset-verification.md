# Release Asset Verification

Use this page before installing or publishing a PassMan public release asset internally. The goal is to verify that the MSI and support packages match the signed manifest and the latest public release.

## Current Release

| Component | Version | Asset |
| --- | ---: | --- |
| PassMan Enterprise Vault Console | 1.8.19 | `PassMan-1.8.19-x64.msi` |
| Chromium Browser Extension | 1.3.1 | `passman-chromium-extension.zip` |
| Offline Share Decrypter | 1.2.0 | `passman-share-decrypter.zip` |
| PassMan DC Agent Service | 1.2.10 | `passman-ad-agent.ps1` |
| Update manifest | 1.8.19 channel metadata | `passman-update.json` |

## Public Asset Set

The public GitHub Release should contain exactly the customer-safe delivery assets:

- `PassMan-1.8.19-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

The git tree should not contain MSI, ZIP, EXE, PFX, P12, DB, SQLite, backup or signing-key files.

## Verification Steps

1. Open the latest release page.
2. Confirm the release tag is `v1.8.19`.
3. Download `passman-update.json`.
4. Confirm the manifest lists server version `1.8.19`.
5. Confirm the MSI filename is `PassMan-1.8.19-x64.msi`.
6. Confirm each asset URL uses the public `ucsahinn/passman` GitHub Release host.
7. Confirm the downloaded MSI file size and SHA-256 match the manifest.
8. Confirm the MSI Authenticode signer metadata matches the manifest signer thumbprint.
9. Confirm extension, decrypter and DC Agent package hashes match the manifest before redistribution.

## What To Record Internally

| Evidence | Safe to record publicly? |
| --- | --- |
| Release tag, file names, sizes and hashes | Yes. |
| MSI signer subject and thumbprint | Yes. |
| Manifest signature value | Yes. |
| Local install path, private hostnames and user names | Redact first. |
| License code, signing private key, PFX/P12 or database | Never. |

## If Verification Fails

Do not install or redistribute the package. Collect the release tag, asset name, expected hash, observed hash, file size and signer status, then use a private support channel.

Related:

- [Update Center](update-center.md)
- [Security and trust model](security-and-trust-model.md)
- [Support evidence pack](support-evidence-pack.md)
