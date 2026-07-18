# Sharing Screen

The topbar `?` opens this guide from the Sharing screen. This workspace packages selected records from the active vault either as an encrypted internal bundle that another VaultPilot user can copy into their own vault, or as a passphrase-protected file that an external recipient opens offline.

External sharing is not a hosted portal, public link, or central PAM checkout service. VaultPilot does not persist the external package as a hosted share, create an external recipient account or history row, or provide central revocation after that file has been distributed.

## Access, Roles, and License

- Normal navigation to Sharing requires the `sharing` license feature and a license that is not read-only. Auditors cannot use secret workspaces.
- The active vault must be unlocked and its key available in the browser before records can be viewed or packaged.
- **Sending an internal bundle** requires the Owner or Admin system role, Manager access to the source vault, and a writable license.
- **Creating an external package** requires Manager access to the source vault and a writable license. A system User can use this local flow when they are a vault Manager.
- **Saving an incoming bundle** requires Editor or Manager access to the currently active target vault and a writable license. It does not grant access to the sender's source vault.
- An internal recipient must be another active user in the same organization, must not be an Auditor, and must have a usable public key. The 2FA state shown in the selector is informational; it is not an eligibility check.

Do not treat a stale or already-open screen as write authority when the license is read-only or Sharing is outside subscription scope. Re-enter through normal navigation and verify the role, vault, and license state.

## Three-Step Flow

The stepper contains **Select**, **Send**, and **Result**. You can move between steps, but the visible selection summary is the final scope check.

### 1. Select records

Passwords, Active Directory credentials, API keys, notes, certificates, and file records can be selected. Search covers title, username, URL, host, domain, and the record-type label. Use **All** or a type tab to narrow the list, then select one record, all visible records, or a visible type group.

Selected records can remain selected after a filter hides them. **Select visible records** adds only the current visible set to the existing selection. The top-level **Clear selection** action clears every selected record, including hidden selections; **Remove group** removes only the currently visible records in that group. Before sending, verify the total selected count and type summary so a hidden selection is not included accidentally.

File chunks are decrypted only in the browser and re-encrypted with the share key. Missing file metadata or an incomplete source chunk set stops packaging.

### 2. Set lifetime and uses

The valid lifetime is 1 to 720 hours (30 days), and the usage limit is 1 to 25. The UI offers shortcuts for 1 hour, 24 hours, 3 days, 7 days, and 30 days.

- For an internal bundle, the server enforces expiry, access count, and status.
- For an external package, the authenticated manifest and the recipient device clock enforce expiry.
- External maximum opens are a local `localStorage` counter keyed by manifest hash in that browser profile. Another browser or profile, or cleared browser storage, starts a different counter. This is not an organization-wide limit, audit counter, or revocation boundary.
- A successful external decrypt consumes one local use before content is rendered. A later file-download failure does not restore that use.

### 3. Choose a delivery method

The same selection and policy finish through exactly one of the internal or external paths below. Their storage, use-count, and revocation boundaries are different.

## Internal Sharing

In **Internal recipient**, choose the target VaultPilot user and select **Send selected items**. The browser creates a new AES-GCM bundle key, encrypts the selected records with it, and wraps that key to the recipient's registered public key. The server stores ciphertext, the wrapped key, selection hashes, and policy metadata—not plaintext records or the unwrapped bundle key.

An internal bundle containing files is a multi-request operation:

1. The bundle row is created first as `PENDING` with `packageReady=false`.
2. File chunks are re-encrypted in the browser and uploaded one at a time.
3. The bundle is marked ready only after chunk count and byte total match.

The recipient sees only ready, `PENDING`, unexpired bundles with remaining uses under **Incoming shares**. **Save to my vault** unwraps and decrypts the bundle in the recipient's browser, then creates new records by re-encrypting every record and file chunk to the currently active writable target vault. The server access count is updated only after all destination writes finish. The bundle can remain `PENDING` and be used again until its limit is reached; it becomes `ACCEPTED` when the limit is exhausted.

This is not source-vault membership or live synchronization. Later source-record changes do not flow to the recipient's copy.

When an Active Directory credential is shared, its provider identity and object DN are carried from the encrypted record into destination creation. The same provider and user object must still exist in the organization, and the recipient must be able to write to the target vault. A removed provider, missing object, or duplicate managed credential is rejected safely and records created by that acceptance attempt are rolled back.

### Incoming and outgoing lists

- **Incoming shares** is not history. It shows only bundles that can currently be accepted. Accepted, revoked, expired, exhausted, or still-preparing bundles are absent.
- **Recent outgoing shares** shows only the newest six internal bundles. The server returns the bundle list in metadata-only pages of 50; list responses never contain the encrypted bundle, wrapped key, or selected-item hashes. The full encrypted body is fetched through a single-item, authorization-checked detail request only after an eligible recipient chooses to open it.
- Display states are **Preparing**, **Pending**, **Used**, **Expired**, and **Revoked**.
- The current UI shows **Revoke** only for the sender's own `PENDING`, unexpired bundle while uses remain. That condition is button visibility, not the server authorization boundary: the current revoke route accepts any bundle owned by the authenticated sender, regardless of its status, expiry, or remaining uses. Revocation marks the bundle `REVOKED` and blocks future opens; it does not delete copies already imported into a recipient vault or change source records.

## External Passphrase Package

**Create external package** generates a strong 28-character share passphrase in the browser. The selected payload is protected with AES-256-GCM; the passphrase key is derived with PBKDF2-SHA-256, and expiry, use limit, scope, and file details are bound to the authenticated manifest.

- New packages without files download as `.json`; file-bearing packages use `.pmshare`.
- The package and passphrase exist only in the live result state. An external package is not added to server history or **Recent outgoing shares**.
- Use **Copy package** or **Download package** to retain the protected file. **Download decrypter** provides `vaultpilot-share-decrypter.zip`.
- For direct delivery, use approved separate channels for the package, passphrase, and decrypter. At minimum, never send the package and passphrase through the same channel.
- **Finish** and **New share** clear the live package, passphrase, and selection state. Retain the package safely before finishing. Do not rely on screen lock alone to clear all sharing material; fully reload the page when abandoning the flow.

There is no VaultPilot revoke action after an external package is distributed. Creating a replacement does not invalidate the old file. If the package or passphrase reaches the wrong person, treat the package as openable until expiry and rotate or revoke every contained secret through its owning procedure.

### SMTP delivery

The SMTP action on the result screen uses configured VaultPilot SMTP to send one recipient the package file, decrypter ZIP, and short instructions. The share passphrase is not attached. The client hardcodes `confirmPassphraseSeparate: true`; the UI warns the operator to use another channel but provides no checkbox or explicit confirmation step. That request flag does not prove how the passphrase was actually delivered.

When SMTP is used, the external package is posted transiently to the VaultPilot server for delivery and passes through the configured SMTP service. It is therefore inaccurate to say the package never reaches the server. VaultPilot still does not persist it as a hosted external-share record.

## Size and Request Limits

| Path | Enforced limit |
| --- | --- |
| Internal bundle | At most 250 records, 512 total file chunks, and 1 GiB of plaintext file bytes. |
| Internal file chunk | At most 2 MiB of plaintext per chunk; each chunk-upload request is capped at 8 MiB. |
| Internal create request | Request body is capped at 24 MiB. Each sender can keep at most 50 pending bundles and 128 MiB of reserved encrypted share storage; the organization-wide pending-share cap is 512 MiB. Creation is limited to 6 requests per 10 minutes. |
| Encrypted record body | Standard records are capped at 6 MiB and certificate records at 24 MiB. Current records and their history share a 512 MiB per-vault and 2 GiB per-organization encrypted storage budget. |
| Direct external download | Selected files total at most 1 GiB and reuse existing 2 MiB source chunks. The internal 250-record/512-total-chunk schema is not applied before local download. |
| External package through SMTP | Package content is capped at 12 MiB and metadata at 250 items. A larger local package cannot use built-in SMTP; use an approved manual delivery path. |

## Partial and Non-Transactional States

The full sharing workflow is not one transaction:

- **Internal creation stops partway:** A real bundle row and some encrypted file chunks can remain. It appears as **Preparing** for the sender but is hidden from the recipient. Retrying creates another bundle instead of resuming the old one. Reconcile the outgoing bundle and Audit Log first; revoke the incomplete bundle when appropriate.
- **Incoming acceptance stops partway:** Records are written to the destination one by one, file uploads commit atomically per record, and the use count changes last. On failure, records created by that acceptance attempt are deleted in reverse order. If any compensating delete also fails, the UI reports that cleanup was incomplete; only then reconcile the target vault and audit before retrying.
- **Concurrent acceptance:** The use counter does not place destination-vault writes inside one transaction. A double click or two sessions can both import records before count/status updates settle. Use one operator and one session.
- **External generation and audit are separate:** The browser places the package and passphrase into result state before it writes the generic `SHARE` audit event. If audit writing fails, the UI can report generation failure while package material already exists in memory. Inspect the result state and audit evidence before generating again.
- **SMTP audit has two stages:** A durable intent event is written before SMTP; if it cannot be written, no email is sent. Post-send delivery evidence is best-effort, so SMTP can succeed even when that second audit write fails. Intent alone is not proof of delivery, and missing delivery evidence is not a reason for an immediate duplicate send.

## Audit and Evidence

- Internal creation emits `SHARE`; file finalization emits a second detailed `SHARE`; successful acceptance emits `IMPORT`; revocation emits `SHARE_REVOKE`. Destination record creation can also leave its own `CREATE` or `IMPORT` evidence.
- Local external generation attempts only a generic `SHARE` event; it does not create an external-package row on the server.
- SMTP intent and delivery events contain redacted metadata such as manifest hash, item/use counts, size, expiry, accepted count, and message ID. Package content, passphrase, recipient address, and filename are not written to audit metadata.
- Missing audit evidence does not prove that nothing happened; an intent event alone does not prove email delivery.

## Screen States

| State | Operator response |
| --- | --- |
| Records or bundle list loading | The panel may show no dedicated skeleton. Wait for the ten-second refresh cycle and verify the broader query state. |
| No shareable records | Verify the active vault, unlock state, search, and type filter. |
| No eligible internal users | Your own account, disabled users, Auditors, and users without a usable public key are excluded. Verify user state privately. |
| Empty incoming/outgoing lists | There is no dedicated query-error card; a failed request can resemble empty arrays. Verify the session and network request before treating emptiness as proof. |
| Preparing | The internal bundle row exists, but file chunks are not complete. Reconcile or revoke it before creating another package. |
| Pending | The internal bundle is ready and has at least one recipient use remaining. |
| Used / Expired / Revoked | The bundle cannot be newly accepted. Existing recipient-vault copies are unaffected. |
| Incoming share failed | Assume partial destination records or chunks may exist; inspect the target vault before retrying. |
| External generation failed | Package and passphrase state may still exist. Check the live result and audit before creating another package. |
| SMTP failed or outcome unclear | Reconcile intent, UI acceptance result, message ID, and private SMTP evidence; do not resend blindly. |
| Decrypter error | Separate wrong passphrase, modified manifest, expiry, local-use, browser-storage, and version failures; never request a screenshot of decrypted content. |

## Before You Act

- Confirm the intended active vault, system and vault roles, `sharing` feature, and writable license.
- Verify total selected count, type summary, and selections hidden behind filters.
- Check file total, chunk count, package size, lifetime, and use limit against the chosen delivery path.
- Verify the internal recipient's active identity and public key privately; the recipient chooses and unlocks the target vault.
- Explain that an external package has no central revoke and that its maximum opens is only a local counter.
- Decide approved channels for the package, passphrase, and decrypter before creation; never include the passphrase in the SMTP email.
- If an outgoing bundle or target-vault write is incomplete, reconcile bundle lists, the target vault, and Audit Log before retrying.

## Safe Evidence

- Safe to share: internal/external path, broad package state, approximate time, item/chunk counts, size class, lifetime/use policy, redacted error category, shortened bundle/manifest identifier, and SMTP intent or acceptance state.
- Keep private: package JSON/PMShare content, share passphrase, decrypted contents, record titles and usernames, filenames/chunks, recipient name and email, full bundle/manifest hash, wrapped key, encrypted payload, vault name/ID, private SMTP message, and full-screen captures.
- Never place the package and passphrase in the same evidence bundle. If either entered a public channel, do not treat the external file as revocable; rotate or revoke the contained secrets.

## When to Stop

Stop when selection scope is uncertain, the target user or key cannot be verified, file chunks are incomplete, the Active Directory provider or target object can no longer be verified, an existing bundle is **Preparing**, the UI reports incomplete rollback, external result state conflicts with audit, SMTP outcome is ambiguous, or the package and passphrase shared a channel. Do not create a second package or accept again until a private review reconciles redacted identifiers, time, status, and audit evidence.

## Operator Notes

Internal sharing is a bounded, server-tracked encrypted delivery queue; acceptance creates independent copies in the recipient vault. External sharing is an offline file handoff; after distribution, control depends on manifest expiry, the recipient device clock, a local browser counter, and disciplined secret rotation. Do not describe both models as one continuing “active share.”

## Related

- [Sharing and offline decrypter](sharing-and-offline-decrypter.md)
- [External share package fails to open](../../kb/en/external-share-fails.md)
- [Audit Log screen](screen-audit-log.md)
- [Executions screen](screen-executions.md)
- [Safe support evidence](support-evidence-pack.md)
