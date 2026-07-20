# VaultPilot Release Notes

Latest public release: **VaultPilot 2.0.0**.

Latest published GitHub Release: **VaultPilot 2.0.0**.

VaultPilot is the canonical product name for new work. PassMan remains the compatibility name for older installed services, data paths, environment variables, cookies, headers, update aliases, extension protocol names, and release artifacts that existing customers may still depend on.

This page is a selected public release history for customer-facing milestones and compatibility notes. The GitHub Releases page remains the public source of truth for every retired patch build, asset upload, timestamp, and digest.

## Release label guide

| Label | Color intent | Use in release notes |
| --- | --- | --- |
| Major | Blue | Product identity, broad workflow, or compatibility-significant change. |
| Minor | Amber | Operator-facing capability, UI, component, or workflow improvement. |
| Patch | Slate | Bug fix, packaging correction, layout fix, or maintenance change. |
| Security | Green | Zero-knowledge, validation, signing, pairing, diagnostics, or secret-handling boundary. |
| Compatibility | Gold | Legacy alias, migration, rollback, or old-client behavior intentionally kept. |
| Removed | Red | A visible action or old path intentionally removed from the daily flow. |

## VaultPilot 2.0.0

Release date: 2026-06-30

Type: major product transition with compatible upgrade/rollback contracts.

Audience: Windows server operators, browser extension users, support operators, and teams upgrading from PassMan-branded installs.

GitHub Release: https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0

### Highlights

- VaultPilot becomes the primary product identity across the console, first-run and unlock screens, logo areas, package descriptions, docs, diagnostics copy, and operator-facing release language.
- Overview becomes an operator cockpit instead of a short mechanical changelog card. It groups security posture, recommendations, breach status, server readiness, operational state, record distribution, quota/update signals, access trend, maintenance, and recent activity into clickable widgets.
- Sign-in security now focuses on master password change, 2FA setup, 2FA binding revoke, and Owner-visible active session review.
- Server System becomes a professional settings surface for log rotation, log retention, audit retention, safe diagnostics, public host, port, HTTPS certificate state, restart guidance, and non-destructive maintenance boundaries.
- License and license-generator language now map capacity, trial/licensed mode, write state, expiry/renewal risk, and unavailable capabilities to real modules such as extension, auto update, RBAC, integrations, and sharing.
- Extension, offline share decrypter, and DC agent packages adopt VaultPilot naming while keeping compatibility aliases for existing installations.
- Same-version MSI repair is corrected so runtime helper files and installer support folders are still present when the service install custom action needs them.

### Action required

- Normal MSI upgrade should preserve the existing vault, SQLite data, extension pairing, server API behavior, and update trust model.
- Take a server backup before production update.
- After upgrade, verify the Windows service, data directory, Update Center state, extension pairing, active session view, audit retention setting, license state, and Server System diagnostics.
- If rollback is required, use the previous signed release package and the retained PassMan compatibility aliases. Do not manually edit ProgramData folders as a rollback method.

### Console 2.0.0

#### Major

- VaultPilot replaces PassMan as the primary product name in the visible console and release language.
- This is a broad product identity move, not a breaking vault migration. Encryption, storage, pairing, manifest verification, and API compatibility remain compatible with existing PassMan installations.

#### Minor

- Overview widgets now expose security posture, prioritized recommendations, breach-check state, server readiness, operations, category composition, quota/update state, access trend, maintenance, and activity in one scan-friendly timeline.
- Widget move arrows appear only in edit mode, keeping daily operator use cleaner while preserving customization.
- Sign-in security stays focused on master password change, 2FA setup, visible 2FA binding state, revoke flow for lost phones, and active server sessions.
- Server System gathers log rotation, log retention, audit retention, diagnostics, host, port, HTTPS certificate, restart guidance, and non-destructive maintenance guidance in one place.
- License screens explain capacity, expiry, trial/licensed state, read-only behavior, renewal risk, and module availability in operator language.
- The login screen keeps the existing visual background while using quieter VaultPilot treatment and more readable foreground text.

#### Patch

- Same-version MSI repair no longer removes runtime helper files before the repair path needs them.
- Overview and Server System layouts use stricter wrapping and grid rules so long real-world labels do not collide.
- Daily record screens no longer expose backup import/export as normal vault work. Server backup import remains an administrator recovery action through the current console import panel, and it accepts VaultPilot Backup Tool ZIP archives or encrypted JSON exports after validation.

#### Security

- Zero-knowledge boundaries are unchanged: vault keys, master-derived keys, plaintext secrets, API keys, private keys, and master passwords are not persisted or logged.
- Server API payload validation, RBAC checks, CSRF header expectations, extension pairing, and signed update manifest verification remain active.
- Legacy fast-unlock remnants are cleaned through a delete-only path. Current unlock behavior keeps sensitive material out of localStorage, sessionStorage, cookies, logs, and server persistence.
- Browser extension decrypted vault snapshots stay in extension worker memory plus trusted `chrome.storage.session` for the 15-minute TTL only. They are not written to persistent extension storage, browser localStorage, browser sessionStorage, cookies, logs, or server persistence; closing the browser profile or passing the TTL locks the extension again.
- Additional hardening covers integration API organization scope, database singleton URL alignment, Authorization-header log redaction, active-session listing, and TOTP management.
- Diagnostics remain redacted and non-destructive. The console does not clear logs, caches, browser history, databases, update jobs, or customer data.

#### Compatibility

- New installs prefer `VaultPilotServer`, `VaultPilot Server`, `C:\ProgramData\VaultPilot`, `VAULTPILOT_*`, `vaultpilot-update.json`, and VaultPilot package names.
- Existing installs may still rely on `PassManServer`, `PassMan Server`, `C:\ProgramData\PassMan`, `PASSMAN_*`, `passman_session`, `x-passman-request`, `passman-update.json`, and legacy package names.
- Extension protocol names, cookies, headers, environment variables, update aliases, and MSI aliases remain available for old clients and rollback paths.
- PassMan-named compatibility files can exist in installed environments, rollback paths or source build output for legacy clients. They are not public release assets unless they appear on the GitHub Release being verified.

### Browser Vault Extension 1.3.2

- Changed: popup, content panel, README text, package output names, and store/enterprise deployment language now use VaultPilot Browser Vault Extension identity.
- Changed: Chrome Web Store remains the primary install and update channel. ZIP output is retained only for archive, local development, and emergency fallback.
- Security: decrypted vault snapshots are held only in extension worker memory plus trusted `chrome.storage.session` for the 15-minute TTL. They are not written to persistent extension storage, browser localStorage, browser sessionStorage, cookies, logs, or server persistence.
- Compatibility: legacy extension origin and environment aliases remain accepted for managed Chrome installs, enterprise policy distribution, and ZIP fallback flows.

### Offline Share Decrypter 1.2.0

- Changed: downloadable archive names, screen headings, and external-sharing copy now use VaultPilot terminology.
- Security: package opening happens in the browser. Passphrases, plaintext content, and file payloads are not sent to the server or written to durable browser storage.
- Compatibility: legacy PassMan external-share package type values remain accepted for previously generated files.

### VaultPilot DC Agent Service 1.2.10

- Changed: downloadable agent script, service-name copy, status output, and operator commands now use VaultPilot DC Agent Service language.
- Security: the agent collects OU, group, and user metadata only. It does not collect AD passwords, hashes, Kerberos tickets, vault keys, or plaintext secrets.
- Fixed: repair and token validation work with the new VaultPilot id/token wording while still carrying legacy PassMan agent configuration forward.
- Compatibility: older installed agents can be repaired without creating a second provider.

### Published release assets

The public GitHub Release `v2.0.0` contains these customer-safe delivery assets. The table below was checked against GitHub Release metadata on July 8, 2026. Use the GitHub release metadata as the public source of truth; unpublished build output is not release evidence until it is uploaded and verified in the release.

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

### Public verification path

This public repository verifies documentation, public links, release metadata, screenshot hygiene, and secret-safety boundaries. Private source-repository build, packaging, manifest-signing, MSI, and audit gates are not repeated here as runnable public commands.

For public documentation changes, run:

```powershell
npm run validate
npm run validate:staged
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

For release consumption, use [release asset verification](docs/en/release-asset-verification.md) and compare the asset names, sizes, SHA-256 values, manifest details, and signer evidence against the GitHub Release page.

## PassMan 1.8.21

Release date: 2026-06-09

Type: hotfix patch.

GitHub Release: https://github.com/ucsahinn/vaultpilot/releases/tag/v1.8.21

### Highlights

- Reduces SQLite lock contention during high-frequency directory-agent polling and audit traffic.
- Reduces unnecessary heartbeat writes when the directory agent has already checked in recently.
- Avoids rewriting unchanged large Active Directory full-sync snapshot fields.
- Makes installer and restart-helper logging best-effort so a local log permission issue does not interrupt the helper path.

### Fixed

- SQLite now starts with WAL mode, normal synchronous mode, foreign-key enforcement, and a 15-second busy timeout.
- Directory-agent polling keeps `last_seen_at` stable inside the one-minute heartbeat window when no command is leased.
- Unchanged full-sync payloads no longer rewrite large snapshot fields.

### Security and compatibility

- Vault, sharing, extension, update, and DC agent command contracts remain unchanged.
- Helper log writes stay support-friendly without logging secret values or failing the update path because a local evidence file is locked.

### Published assets

- `PassMan-1.8.21-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

## PassMan 1.8.20

Release date: 2026-06-06

Type: browser extension channel patch.

GitHub Release: https://github.com/ucsahinn/vaultpilot/releases/tag/v1.8.20

### Highlights

- Chrome Web Store becomes the primary browser extension install and update channel.
- The old manual ZIP install call-to-action is removed from the normal customer flow.
- Update Center explains the Web Store channel instead of treating the local ZIP as the standard browser install path.
- Extension About view exposes installed version and Web Store update checks.

### Action required

- Operators should use the Chrome Web Store listing and supported extension ID for normal customer deployment.
- Keep the ZIP only for archive, local development, and emergency fallback scenarios.

### Security and compatibility

- Vault, pairing, MSI runtime, zero-knowledge storage, autofill, save/update, and update trust contracts remain unchanged.
- Extension ZIP remains available as a release archive, not as the recommended customer channel.

## PassMan 1.8.19

Release date: 2026-06-04

Type: Active Directory agent authorization patch.

GitHub Release: https://github.com/ucsahinn/vaultpilot/releases/tag/v1.8.19

### Highlights

- Fixes AD agent install and repair authorization when a real server install reads the same SQLite provider record through a different server-secret or data-directory context.
- Stores newly generated directory-agent bearer tokens with a portable SHA-256 verifier while still accepting existing server-secret HMAC token records for upgrade compatibility.
- Adds redacted directory-agent authorization failure reasons in server logs so operators can distinguish missing providers, revoked tokens, empty token hashes, and token mismatches without logging token values.

### Action required

- Upgrade older compatibility deployments that use the DC Agent before rotating provider tokens.
- Rotate any agent token that was pasted into support chats, terminals, screenshots, or public issue text.

### Security and compatibility

- The DC Agent script contract does not change. Existing install and repair commands keep the generated `pma_` agent id and `pmt_` token format.
- The fix is carried forward by VaultPilot 2.0.0 and newer releases.

## PassMan 1.8.0

Release date: 2026-06-01.

GitHub Release: https://github.com/ucsahinn/vaultpilot/releases/tag/v1.8.0

Type: minor milestone.

### Highlights

- Update Center, enterprise console layout, credential operations, and MSI maintenance fixes are consolidated into one customer-facing milestone.
- Update Center shows download, verification, service restart, and console reload as one progress flow.
- Credential operations now include bulk actions, import preview, export, category/tag assignment, and audit reporting.
- MSI maintenance and legacy installer-helper compatibility are kept visible instead of hidden in proof-only patch notes.

### Security

- Signed manifest verification, SHA-256 checks, service health confirmation, and browser reconnect behavior remain part of the main update lane.
- Credential import and audit flows avoid writing secret values to logs or evidence files.

## PassMan 1.7.0

Release date: 2026-06-01.

Type: enterprise console and MSI maintenance release.

GitHub Release: https://github.com/ucsahinn/vaultpilot/releases/tag/v1.7.0

### Highlights

- Same-version manual MSI runs keep the Windows Installer maintenance path so Repair and Remove are available.
- Newer MSI packages show an explicit upgrade screen when an older PassMan installation is detected.
- Enterprise console polish adds clearer shell hierarchy, real density controls, token-led surfaces, and a cleaner Update Center.
- Credential bulk operations add template download, Excel import preview, selected export, category/tag assignment, archive, revoke/disable, security check, audit report, and guarded deletion.
- AD-synced credentials expose source, domain, DN/path, account, status, risk, owner, tags, last seen, and last synced metadata while keeping sensitive values masked.

### Installer and update

- Upgrade sequencing avoids the route where a built-in WiX welcome/license flow can skip the detected-upgrade screen.
- `RemoveExistingProducts` and runtime preparation are sequenced so PassMan stops its own service before Windows Installer decides a reboot is required.
- Manual and silent MSI flows suppress unnecessary restart prompts while still allowing PassMan to restart its own service.

### Security

- Import preview validates rows before persistence and reports created, updated, skipped, and failed rows without logging secret values.
- Runtime log directories are readable for support while vault data stays restricted to SYSTEM and Administrators.

## PassMan 1.5.4

Release date: 2026-05-28.

Type: maintenance hardening and update-observability release.

### Highlights

- MSI update reliability, service repair, TOTP hardening, CSP handling, and 15-minute RAM fast-unlock behavior are consolidated.
- Windows Installer sequencing, stale update-job reconciliation, quiet MSI status visibility, rollback handling, and support-safe detail are improved.
- Redacted logs and local signer thumbprint checks are kept inside the release evidence model.

### Security

- CSP nonce boundaries are preserved.
- TOTP behavior is hardened.
- Redacted diagnostics prevent support evidence from carrying plaintext secrets, tokens, or master-derived key material.

## PassMan 1.3.0

Release date: 2026-04-18.

Type: secure sharing milestone.

### Highlights

- Selected records, file chunks, and external share packages become one guarded sharing model.
- Password, credential, API key, secure note, certificate, and file records can be included in controlled share packages.
- Internal bundles stay encrypted on the server for approved recipients.
- External packages open offline with a passphrase and the local decrypter.

### Security

- Share package metadata hash, expiry, usage limits, and policy information are visible for audit.
- External plaintext is not stored by the server as part of the recipient flow.

## PassMan 1.0.3

Release date: 2026-02-10.

Type: self-hosted Windows server foundation.

### Highlights

- The standalone Next server, bundled Node runtime, Windows service, firewall rule, and data/log directories are wired into the MSI lane.
- Offline Ed25519 license verification and signed update manifest handling are established.
- The browser-access model is anchored on a Windows server installation reached by users through the server IP and product port.

### Security

- The self-hosted foundation keeps secrets local to the server runtime.
- The public/private release boundary is established so public release assets can be distributed without exposing private signing material or source internals.

## Older public history

Earlier 1.0.x through 1.4.x builds established the self-hosted MSI baseline, offline licensing, selected-secret sharing, browser extension management, update manifests, file vault work, RBAC, audit hardening, and enterprise UI polish. Public downloads for retired builds should not be used for new deployments; use the latest published VaultPilot GitHub Release.
