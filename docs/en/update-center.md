# Update Center

PassMan Update Center manages the main Windows MSI package. The browser extension is installed and updated through Chrome Web Store, while Offline Share Decrypter and PassMan DC Agent Service are tracked as component release notes and refreshed by the MSI or their documented release assets.

![PassMan update center](../../assets/screenshots/update-center.png)

## Secure Update Model

PassMan verifies:

- Signed update manifest.
- Package URL and filename.
- SHA-256 checksum.
- MSI Authenticode signer thumbprint.
- File size and release metadata.

A global CA chain is not required for PassMan-managed update trust when the signed manifest pins the local release signer thumbprint. CA-backed or trusted-signing certificates remain recommended for Windows SmartScreen reputation and broad OS-level trust.

## Normal Update Flow

1. Export a backup.
2. Open Update Center.
3. Check for updates.
4. Review version, notes, signer and checksum.
5. Start the update.
6. PassMan downloads and verifies the MSI on the server.
7. The quiet Windows Installer flow runs.
8. The PassMan service restarts.
9. Reopen the console and confirm version and health.

## Release Assets

The current public release contains:

- `PassMan-1.8.19-x64.msi`
- `passman-update.json`
- Chrome Web Store extension listing: `https://chromewebstore.google.com/detail/passman-enterprise-vault/hjkbedlaieikhkoplgpiohlaakgebobi?hl=tr`
- `passman-chromium-extension.zip` release archive and development fallback only
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

For manual verification, use [release asset verification](release-asset-verification.md) before installing or forwarding assets internally.

## Component Notes

Update Center should not create a browser extension installer flow; Chrome Web Store owns extension install and update distribution. It should also avoid separate installer flows for the DC agent and decrypter. Their version notes remain visible, but the MSI refreshes the support files shipped by the server package. Operators can still download the latest release asset when they need manual installation or recovery.

## Troubleshooting

| Symptom | First check |
| --- | --- |
| Update stops around 76 percent | MSI signature and Windows Installer event log. |
| Checksum mismatch | Delete the downloaded MSI and retry from the release asset. |
| Service does not restart | Query `PassManServer` and review installer logs. |
| Version did not change | Confirm the MSI completed, then restart the service. |
