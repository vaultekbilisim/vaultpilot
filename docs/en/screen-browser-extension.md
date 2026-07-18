# Browser Extension Screen

The topbar `?` opens this context-specific guide while **Integrations > Browser extension** is active. The same help action on External API or Active Directory opens the general Integrations guide instead. Use this screen to review the Chrome Web Store channel, approve short-lived pairing requests, inspect vault-grant counts, and revoke approved browser profiles.

## Access, Role, and License Boundary

The **Integrations** navigation path is available only to **Owner** and requires the **Integration** license capability. Browser Extension is included in that capability; newly issued licenses do not have a separate **Extension** capability. Customers whose legacy signed license contains only `extension` retain Browser Extension access for compatibility, but that compatibility does not grant External API or Active Directory access. Admin, Auditor, and User do not reach this management panel through the current navigation.

The extension-origin pairing-start route is not driven by a console session; it can target an active Owner, Admin, or User username. The authenticated list, approve, and revoke endpoints accept Owner, Admin, and User, reject Auditor, and scope device rows to the authenticated user's own records. Treat Owner operation through this panel as the supported console workflow; do not assume that seeing another user's name elsewhere grants access to that user's pairing request.

A writable license is required to start or approve pairing. Read-only mode still permits listing devices and revoking an existing approved device as a security action. It does not permit approving a pending request. At least one vault in the active profile must be unlocked before approval.

## Work Here

- Open the supported VaultPilot Browser Vault Extension listing in Chrome Web Store.
- Refresh the latest extension sync and approved/pending device summaries.
- Match a pending device name and last-four code hint with a separately verified user request.
- Enter the full popup code and grant the extension access to the vaults currently unlocked in this profile.
- Review active devices separately from revoked or expired archive records.
- Revoke an approved browser profile that is lost, unused, unexpected, or no longer trusted.

This panel does not remotely install or remove an extension, push browser policy, force a Web Store update, operate another browser, or prove that autofill worked on a page. It manages server-side pairing and vault grants. Autofill remains a user-triggered extension behavior subject to the active site, extension session, browser policy, and matching rules.

## Chrome Web Store and Managed Installation

**Open in Chrome Web Store** opens the supported listing for extension ID `hjkbedlaieikhkoplgpiohlaakgebobi`. Normal customer installation and updates use that store channel. Store installs do not require a ZIP download, Developer Mode, or **Load unpacked**.

For a managed Chrome or Edge fleet, deploy the same Web Store extension ID through the organization's browser policy. That policy work happens in the browser-management platform, not on this VaultPilot screen. Chrome performs its own automatic update checks; the extension About view can request a Web Store check, but Chromium may throttle the request and applies an update only when the browser reports a staged update.

The release ZIP is an archive, local-development, lab-validation, or emergency-fallback artifact. It is not the routine managed installation path. An unpacked or fallback build can also require an explicitly allowed extension origin; do not replace the store identity or production allowlist casually.

## Pairing Lifecycle

### 1. Start in the extension popup

Enter the VaultPilot server origin, VaultPilot username, a recognizable device name, and an extension PIN in the popup, then choose **Start pairing**. The PIN protects the extension private key and pairing token in that browser profile; it is not the VaultPilot master password.

The extension sends its device name, optional username, and public key to the pairing-start route. The server selects an active non-Auditor profile, creates a pairing ID and token, and returns a `XXXX-XXXX` code that expires after ten minutes. The request is also bound to the accepted extension origin. The full code is shown in the extension popup; it is not recovered from the server-side device row.

### 2. Review pending state and check status

The extension keeps the pairing ID, token, and code locally and offers **Check approval**. Status checks authenticate with the pairing ID and token and must come from the accepted extension origin. A pending request remains unusable until approval. If its ten-minute window ends, the status check fails as expired and the server list classifies the row under Archive.

On this screen, **Active devices** contains pending and approved rows from the returned device window. A pending row shows the caller-supplied device name, only the last four code characters, and the current vault-grant count. It does not show the full code, username, browser profile, request origin, extension ID, public key, pairing token, or device ID. The device name is user-entered text, not verified device identity.

### 3. Approve and grant vaults

Before approval, verify the request owner and browser profile through an internal channel. Compare the full code in the popup with the expected request and the row's last-four hint, then enter the full code in `XXXX-XXXX` form.

Approval requires a writable license and at least one unlocked vault. VaultPilot wraps the keys for **all vaults currently unlocked in the approving profile** to the pending device public key; this screen does not provide a per-vault grant picker. The row's vault-grant count records how many wrapped vault keys were issued. Approval writes `EXTENSION_PAIR`, refreshes the device list and Audit Log, and clears the typed code field.

After approval, choose **Check approval** in the popup. The extension can then request an encrypted snapshot for its approved grants and decrypt it inside its own protected runtime. Pairing does not expose the master password or plaintext vault records in the management list.

## Device List, Sync, and Revocation

The device query returns only the authenticated user's newest 50 rows by creation time. The summary's sync time and approved/pending counts, and the **Active devices**/**Archive** split, are calculated only from that returned window; they are not full device history. Use the Audit Log to investigate older pairing, revocation, and sync activity. **Refresh** and the summary controls request the list again; while this screen is active, the list also polls about every five seconds.

The console shows **Revoke** only on an `APPROVED` row. That button acts immediately without a second confirmation dialog: it changes the device to revoked, removes its stored wrapped-vault grants, writes `EXTENSION_REVOKE`, and moves the record to Archive. This Approved-only rule belongs to the console button. The underlying revoke endpoint has no writable-license or device-status guard; an authenticated Owner, Admin, or User can revoke any owner-matching row regardless of its current status. Use the visible console action for the supported operator workflow. After revocation, the extension can no longer obtain an approved snapshot. Revoking server access does not uninstall the extension or erase its browser profile; remove local pairing or the extension separately on that browser when appropriate.

Each successful encrypted snapshot fetch updates last seen and writes `EXTENSION_SYNC`. View, copy, and fill actions have their own extension audit path, but this management screen does not show page-level autofill proof. Use the Audit Log for event review and keep device correlation private.

## Archive, Expiry, and Errors

**Archive** contains revoked and expired records within the newest-50 device window. It is not full history; use the Audit Log for older events. An expired request cannot be approved; start a new request from the popup. Archived rows have no console approve or revoke action. They remain useful for private investigation but are not proof that the browser extension was removed locally.

Approval failure uses a general message instructing the operator to check the code and expiry. Also check writable-license state, the current profile, at least one unlocked vault, request ownership, and whether the row is still pending. Revocation failure uses a general access-revocation error; refresh before retrying so you do not act on stale state.

Two skeleton rows appear while the device list loads. There is no dedicated list-query error card. With no retained data, a failed query can resemble the relevant empty state. Do not treat **No pairing requests yet** or an empty Archive as definitive evidence until the session, server connection, and Refresh have been checked.

## Recommended Workflows

### Approve a new managed browser profile

1. Confirm the browser received the supported Web Store extension ID through the approved user or policy channel.
2. In the popup, enter the correct HTTPS server origin, username, device name, and a new extension PIN; start pairing.
3. Verify the requester and browser profile through an internal channel before reading or entering the code.
4. On this screen, match the device name and last-four hint, and confirm the request is still pending.
5. Unlock only the vaults that should be granted; remember that every currently unlocked vault is included.
6. Enter the full `XXXX-XXXX` code and choose **Approve** once.
7. In the popup, check approval and sync; then verify `EXTENSION_PAIR` and the first expected `EXTENSION_SYNC` privately.

### Revoke a lost or untrusted browser profile

1. Refresh Active devices and identify the approved row from private inventory evidence, not the device name alone.
2. Record the general reason and expected impact without copying codes, IDs, or vault details into public notes.
3. Choose **Revoke** once; there is no second confirmation.
4. Confirm the row moved to Archive, its grant count is cleared, and `EXTENSION_REVOKE` exists.
5. If the browser is available, remove local pairing or uninstall through the browser-management channel separately.

## Screen States

| State | Operator response |
| --- | --- |
| Devices loading | Wait for the two skeleton rows or use Refresh after checking the server session. |
| No pairing requests yet | Start from the supported extension popup; do not fabricate a request in the console. |
| Pending | Verify requester, browser profile, device name, and code through separate channels before approval. |
| Pairing code invalid | Re-enter the full `XXXX-XXXX` code from the popup; do not infer it from the last-four hint. |
| Pairing expired | Find the row in Archive and start a new ten-minute request from the popup. |
| No unlocked vault | Unlock the intended vault set before approval; all unlocked vaults will be granted. |
| Read-only license | Do not approve or start pairing; an approved device can still be revoked for security. |
| Paired | Check the grant count, expected sync, and private audit evidence. |
| Revoked | Treat server grants as removed; handle local extension removal separately. |
| Archive empty | Refresh and verify connectivity; the newest-50 window and Audit Log must be checked before concluding there is no older revoked or expired history. |
| Approval failed | Check ownership, pending state, exact code, expiry, writable license, and unlocked vaults. |
| Revocation failed | Refresh, verify the current approved row and server session, then retry once. |

## Before You Act

- Confirm the console session is Owner and that the Integration and Extension capabilities cover the intended path.
- Verify whether the task is Web Store deployment, pairing approval, sync investigation, or revocation; this screen does not perform all four remotely.
- Use an internal request channel to establish the user and browser profile; the device row cannot prove either.
- Before approval, lock any vault that must not be included in the grant set.
- Treat the full code, last-four hint, device name, and timing together as sensitive correlation material.
- Remember that Revoke has no second confirmation and does not uninstall or clear the browser profile.

## Safe Evidence

- Safe to share: tab name, Chrome Web Store channel, general state such as pending/paired/revoked/expired, aggregate approved/pending counts clearly labeled as the newest-50 window, broad time window, and general error category.
- Keep private: full or partial pairing code, device name, device ID, pairing ID/token, public or private key material, extension origin, username/account, exact timestamps, vault names, vault-grant count, encrypted snapshot, and any secret or autofill-visible value.
- If a pairing code or token is exposed, stop public sharing. Let the request expire or revoke the approved device, then start a fresh pairing through a private channel.
- Mask the entire device row when a screenshot could correlate its name, code hint, grant count, and time. Cropping one field is not sufficient.

## When to Stop and Escalate

Stop if the request owner cannot be verified, the device name or last-four hint does not match, an unexpected vault count would be granted, the request repeatedly expires, a revoked device still obtains snapshots, the list looks empty despite known devices, or audit events do not match the operation. Open a private support case with the general state, broad time window, redacted error text, and last safe step—without pairing material or vault data.

## Operator Notes

Pairing is an approved-device and wrapped-key trust decision, not remote browser administration. Chrome Web Store delivery, organization policy, server-side grants, local extension state, and page-level autofill are separate boundaries. Never claim that approval alone installed the extension, applied an update, removed local data, or guaranteed autofill.

## Related

- [Browser extension](browser-extension.md)
- [Integrations screen](screen-integrations.md)
- [Chrome Web Store listing and privacy](chrome-web-store-listing.md)
- [Extension pairing KB](../../kb/en/extension-pairing.md)
- [Audit Log screen](screen-audit-log.md)
