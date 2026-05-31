# PassMan Release Notes

Latest public release: **PassMan Enterprise Vault Console 1.6.0**

Release page: https://github.com/ucsahinn/passman-releases/releases/tag/v1.6.0

## PassMan 1.6.0

### Console 1.6.0

- Keeps authenticated browser sessions alive across page refreshes for the intended 15-minute window without storing master passwords, master-derived keys, raw secrets, auth tokens or plaintext secret data in browser storage.
- Restores password exposure checks through the HIBP k-anonymity flow when the network is reachable. Blocked browser or network states are shown as unavailable without exposing the checked value.
- Separates transient action toasts from the timestamped notification center, including read, dismiss and clear actions.
- Removes repeated low-value Overview KPI cards and focuses the dashboard on security posture, live operations signals, category distribution, recent activity and runtime evidence.
- Cleans the sharing flow by removing the live package-scope card and returning the operator to a clean selection state after `Finish`.
- Simplifies Update Center around the main Windows MSI lane, update activity, operator remediation and consistent component release notes.
- Improves navigation collapse, responsive shell behavior, server diagnostics, user/RBAC surfaces and integration screens for repeated enterprise operator use.
- Keeps the self-hosted Windows MSI server model with Prisma/SQLite persistence and browser-side vault unlock.
- SQLCipher remains deferred hardening; sensitive payloads are encrypted before SQLite persistence.

### Release Assets

- `PassMan-1.6.0-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Chromium Extension 1.3.1

- Active-site badge counts show how many matching PassMan records are available for the current site.
- Login forms can show an inline PassMan panel for one-click fill and save/update suggestions.
- Paired background sessions keep page detection, one-click fill and save/update prompts available without asking for the extension PIN again inside the active 15-minute window.
- Manual password exposure checks run without a separate build-time flag and send only the SHA-1 prefix to the HIBP k-anonymity range API.
- The About view checks both managed Chrome/Edge update state and the server-hosted ZIP package. Managed deployments can reload a staged browser update; unmanaged ZIP installs receive a manual download action.
- Autofill, save, update, pairing and update notifications avoid plaintext usernames, passwords and secret values.

### Offline Share Decrypter 1.2.0

- Opens selected-record external share packages locally in the browser.
- Supports file-backed share records, expiry and usage limits.
- Shows separate states for invalid JSON, wrong passphrase, tampered metadata, expired packages and exhausted usage limits.
- Does not write plaintext package content to persistent browser storage.

### PassMan DC Agent Service 1.1.0

- Syncs OU, group, user and computer objects with host, OS, DNS host name, last logon, privileged membership, stale, disabled and locked signals.
- Reports password state only: password last set, expired, must change, locked and disabled.
- Does not collect AD password values, hashes, Kerberos tickets, LSASS memory, ntds.dit, DPAPI secrets or bind passwords.
- Prepares RDP/SSH credential drafts from directory metadata while keeping the credential password empty until an authorized PassMan user saves it into an encrypted record.
- Models account unlock, disable, must-change and temporary password reset as sensitive admin actions with confirmation and audit logging.
- Repair commands can update the installed service connection configuration, including the DPAPI-protected agent token, without logging the token value.

### Verification Summary

- Lint, TypeScript, Vitest, Next standalone build, extension package, share decrypter package, DC Agent package, UI smoke checks, Windows MSI packaging, MSI scenario verification, update manifest issue/verify, `npm audit`, release evidence audit and source-focused secret scans passed before publication.
- Local MSI upgrade testing can still require an elevated Windows Installer context on the target machine.

<details>
<summary>PassMan 1.5.4 maintenance rollup</summary>

### Console 1.5.4

- Consolidated the 1.5.1 through 1.5.4 maintenance line into one visible release.
- Hardened Windows Installer upgrade sequencing, stale update-job reconciliation, quiet MSI status visibility, installer rollback handling and support-safe technical detail.
- Preserved CSP nonce hardening, server-side TOTP boundaries, redacted diagnostics and local signer thumbprint checks.

### DC Agent Service 1.0.2

- Improved service stop, wrapper refresh, repair, status and tail-log flows.
- Kept agent ids, tokens, passwords and secret-like values redacted before log write.

</details>

<details>
<summary>PassMan 1.5.0 enterprise console line</summary>

- Consolidated the PassMan Enterprise Vault Console UI pass.
- Added dynamic light/dark theme tokens across shell, cards, charts, CTAs, focus states and gradient surfaces.
- Added selected-record sharing including file records.
- Added 15-minute browser-process RAM fast unlock.
- Refined component version visibility so the main MSI and browser extension are the actionable Update Center cards.
- Added extension autofill/save/update prompts and browser notifications without exposing secret values.

</details>

## Older History

Earlier 1.0.x through 1.4.x builds established the self-hosted MSI baseline, offline licensing, selected-secret sharing, browser extension management, update manifests, file vault work, RBAC, audit hardening and enterprise UI polish. Public downloads for those builds are retired; use the latest stable release.
