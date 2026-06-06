# PassMan Release Notes

Latest public release: **PassMan Enterprise Vault Console 1.8.20**

Release page: https://github.com/ucsahinn/passman/releases/tag/v1.8.20

## PassMan 1.8.20

### Console 1.8.20

- Routes the Browser Extension screen to the Chrome Web Store listing and supported store extension ID as the primary customer install path.
- Updates the Update Center component status to describe the Chrome Web Store extension channel instead of treating the local ZIP as the normal browser install path.
- Keeps the Chromium extension ZIP as a release archive, local development package and emergency fallback artifact only.
- Keeps the vault, pairing, MSI runtime, zero-knowledge storage and update trust contracts unchanged.

### Chromium Browser Extension 1.3.1

- Shows the installed extension version and Chrome Web Store update check in the extension About view.
- Lets Chromium apply Web Store updates only when the browser reports a staged update.
- Packages refreshed 16, 32, 48 and 128 pixel icon assets for archive and fallback builds.

### Release Assets

- `PassMan-1.8.20-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Lint, TypeScript, Vitest, Next standalone build, browser UI smoke checks, Windows MSI packaging, dev signing, update manifest issue/verify, MSI scenario verification, MSI evidence audit, npm audit, pre-commit Gitleaks guard and staged Gitleaks scan passed before publication.

## PassMan 1.8.19

### Console 1.8.19

- Promotes the public release line to the current supported self-hosted Windows Server application release.
- Fixes AD agent install and repair authorization when a real server process reads the same SQLite provider record through a different `server-secret` or data-directory context.
- Stores new directory agent bearer tokens with a portable SHA-256 verifier while keeping existing server-secret HMAC token records accepted for upgrade compatibility.
- Adds redacted directory-agent auth failure reasons in server logs, separating missing provider, revoked token, missing token hash and token mismatch without logging token values.
- Keeps the existing `pma_` agent id and `pmt_` token command contract for PassMan DC Agent Service 1.2.10.

### Release Assets

- `PassMan-1.8.19-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Lint, TypeScript, Vitest, Next standalone build, browser UI smoke checks, Windows MSI packaging, dev signing, update manifest issue/verify, MSI scenario verification, MSI evidence audit, npm audit, pre-commit Gitleaks guard and staged Gitleaks scan passed before publication.

## PassMan 1.8.18

### Console 1.8.18

- Adds credential-backed PassMan login activation and removal from AD credential records, with Users screen source badges for local, synced and credential-backed accounts.
- Keeps AD password assignment separate from PassMan login access activation.
- Updates RDP downloads so generated `.rdp` files do not embed passwords and start with broad local resource redirection disabled.
- Lets DC agent repair update domain controller and bind settings interactively while validating the refreshed PassMan id/token before writing service config.

### Release Assets

- `PassMan-1.8.18-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Lint, TypeScript, Vitest, Next standalone build, browser UI smoke checks, Windows MSI packaging, update manifest issue/verify, MSI scenario verification, MSI evidence audit, npm audit and Gitleaks checks passed before publication.

## PassMan 1.7.5

### Console 1.7.5

- Makes installed server access HTTPS-only on the public port. If no operator PFX/P12 is configured, PassMan generates a managed self-signed HTTPS certificate instead of exposing the console over HTTP.
- Fixes automatic MSI update jobs that could stay visually stuck around the installer step by detecting missing helper startup signals and writing clearer spawn, exit and launch-error evidence.
- Verifies the installed `package.json` payload version after Windows Installer success before moving to restart, so misleading MSI success events no longer hide stale installed files.
- Passes the current install directory and per-machine context into automatic MSI runs with `INSTALLFOLDER` and `ALLUSERS=1`.
- Repairs ProgramData operator evidence visibility: logs and update-job files are readable by local Users, while databases, config, certificates and secret-bearing data stay hardened.
- Uses Secure session cookies by default for HTTPS server access, with non-secure cookies available only through an explicit local-development override.

### Release Assets

- `PassMan-1.7.5-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Lint, TypeScript, Vitest, HTTPS browser UI smoke checks, Windows MSI packaging, dev signing, update manifest issue/verify, MSI scenario verification, npm audit, diff check, and pre-commit Gitleaks guard passed before publication.

## PassMan 1.7.4

### Console 1.7.4

- Fixes the remaining Update Center state issue where a browser session could keep showing the old 82% RUNNING progress after the silent MSI helper and service restart completed.
- Shows a clear secure-context warning on fresh servers opened through plain HTTP IP addresses instead of falling back to the generic profile creation error; profile create and unlock stay disabled until HTTPS or localhost exposes Web Crypto.
- Repairs ProgramData log visibility by granting local Users only the root traversal needed to reach readable app/installer logs while keeping database, config and secret-bearing child paths hardened.
- Keeps the login surface fixed to the dark emerald vault identity before unlock, flattens the Update Center main application package card, and tightens credential quick filters plus sharing category headers.
- Keeps the 1.7.3 installed-version registry fix and the 1.7.2 automatic MSI safety gate.

### Release Assets

- `PassMan-1.7.4-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Lint, TypeScript, Vitest, Next standalone build, browser UI smoke checks, Windows MSI packaging, dev signing, update manifest issue/verify, MSI scenario verification, MSI evidence audit, npm audit, and pre-commit Gitleaks guard passed before publication.

## PassMan 1.7.3

### Console 1.7.3

- Fixes Update Center version targeting on machines installed at 1.7.0 by reading the installed PassMan Server MSI version from the Windows uninstall registry record when available.
- Uses the installed MSI version for live GitHub release upgrade decisions, so the latest signed MSI is classified as a newer-version upgrade instead of same-version repair.
- Prevents old blocked 1.7.0 update-job steps from appearing under a fresh live-check card unless the job is active or matches the current package evidence.
- Keeps the 1.7.2 automatic MSI safety gate: same-version maintenance stays manual, unknown-version MSI packages stay blocked, and valid upgrades still require signed manifest, SHA-256 and signer proof.

### Release Assets

- `PassMan-1.7.3-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Lint, TypeScript, Vitest, Next standalone build, browser UI smoke checks, Windows MSI packaging, dev signing, update manifest issue/verify, MSI scenario verification, MSI evidence audit, npm audit, and pre-commit Gitleaks guard passed before publication.

## PassMan 1.7.2

### Console 1.7.2

- Keeps the 1.7 enterprise console UI line and adds the final Enterprise White Teal light-mode polish: topbar about menu, stable sidebar without the PM mark, stronger list/table/card view controls, license generator disclosure removal, and cleaner integrations tabs.
- Hardens automatic MSI update safety so the in-app silent installer runs only for newer-version server upgrades.
- Blocks same-version automatic MSI maintenance and unknown-version MSI packages from one-click install; same-version repair stays a manual MSI Repair path on the Windows Server.
- Keeps signed manifest verification, SHA-256 checks, pinned signer trust, UAC elevation, service restart, running-version health checks, and browser reconnect behavior for valid newer-version upgrades.
- Separates the 1.7.2 patch release from the 1.7.0 enterprise console release in public release history.

### Release Assets

- `PassMan-1.7.2-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Lint, TypeScript, Vitest, Next standalone build, browser UI smoke checks, Windows MSI packaging, dev signing, update manifest issue/verify, MSI scenario verification, npm audit, and pre-commit Gitleaks guard passed before publication.

## PassMan 1.7.0

### Console 1.7.0

- Adds the enterprise credential operations UI pass: default light mode with green accent, clearer shell hierarchy, token-led light/dark surfaces, improved login layout, and real comfortable/normal/compact density settings.
- Adds credential bulk actions for existing PassMan secret workflows: template download, Excel import preview, selected export, category/tag assignment, archive, revoke/disable, security check, audit report, and guarded delete.
- Adds an Excel import template based on the actual PassMan secret form and supported categories: Passwords, Credentials, API Keys, Secure Notes, and Certificates.
- Adds row validation, duplicate handling, import preview, partial-result summary, and no-secret-logging behavior before records are created or updated.
- Expands AD-synced credential visibility with source, domain, DN/path, account, status, risk, owner, tags, last seen, and last synced metadata while keeping sensitive values masked.
- Keeps the MSI maintenance fixes for same-version Repair/Remove, upgrade sequencing, reboot prompt suppression, and manifest-locked update verification.

### Release Assets

- `PassMan-1.7.0-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Lint, TypeScript, Vitest, Next standalone build, browser UI smoke checks, Windows MSI packaging, dev signing, update manifest issue/verify, MSI scenario verification, npm audit, and pre-commit security guard passed before publication.

## PassMan 1.6.2

### Console 1.6.2

- Adds the independent Windows license generator path for release operators, replacing issuer-facing naming with generator-facing naming in scripts, UI copy and release gates.
- Keeps the license private signing key on the operator profile and keeps customer delivery limited to the generated license code.
- Adds the operator-only generator build command and release-gate checklist entry for `dist\license-generator\PassManLicenseGenerator.exe`.
- Keeps the 1.6.1 MSI restart/update reliability fixes, including detached restart handoff after Windows Installer completes.

### Release Assets

- `PassMan-1.6.2-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Windows MSI packaging completed, the update manifest was issued for `v1.6.2`, asset hashes match the manifest, MSI Authenticode status is valid, and public documentation validation plus Gitleaks checks passed before publication.

## PassMan 1.6.1

### Console 1.6.1

- Fixes the automatic MSI update handoff so PassMan queues a detached `PassManServer` restart helper after Windows Installer completes. This prevents the old server process from continuing to serve the previous version.
- Reloads open web consoles after the service responds on the target version, using in-memory state and live status checks instead of browser persistent storage.
- Suppresses unnecessary Windows reboot prompts in both manual MSI and in-app silent MSI flows.
- Uses a version-stable MSI ProductCode so re-running the same MSI version enters the expected maintenance or repair behavior, while newer versions still upgrade through the stable UpgradeCode.
- Keeps the 1.6.0 enterprise console work: refresh-safe sessions, dashboard cleanup, notifications, leak checks, sharing, Update Center, Server System, navigation, extension flow and AD agent improvements.

### Release Assets

- `PassMan-1.6.1-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

### Verification Summary

- Lint, TypeScript, Vitest, Next standalone build, extension package, share decrypter package, DC Agent package, Windows MSI packaging, MSI scenario verification, update manifest issue/verify, release evidence audit, `npm audit`, pre-commit Gitleaks and source-focused secret scan passed before publication.

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
- The About view exposes extension version and Chrome Web Store update state. Chromium can reload only when the browser reports a staged Web Store update; the ZIP remains a release archive and development fallback.
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
