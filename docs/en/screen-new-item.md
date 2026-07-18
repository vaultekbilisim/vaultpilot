# New Item Screen

The global topbar **Add new record** control opens a chooser for Password, API key, Secure note, Certificate, and File, then opens the selected type in the local New item editor. The editor's `?` opens this guide. A successful save creates the encrypted record in the currently active vault. The editor has no autosave, draft persistence, template picker, or automatic rotation action.

## Access, Active Vault, and License Boundary

The global chooser and local editor can open for an Auditor, but that does not grant write access. Saving requires an unlocked active vault and its browser-held vault key. The signed-in user must be Owner, Admin, or User at the system level and have **Editor** or **Manager** access to that vault. The Save control is disabled for Auditor, vault **Viewer**, and read-only license states. The server independently enforces session, license, vault, and role checks if a client-side control is bypassed.

The New item page does not contain a vault picker. The record is written to the vault that was active when **Save encrypted record** was selected. Confirm the active vault elsewhere before entering sensitive material. Manual Password, API key, Secure note, Certificate, and File records do not require a separate feature license beyond a writable license.

## Supported Manual Record Types

The type rail exposes five types:

| Type | Required to save | Optional context |
| --- | --- | --- |
| Password | Title and Password. | Username/email, sign-in URL, note. |
| API key | Title and API key or token. | Client/owner/service account, console URL, scope or rotation note. |
| Secure note | Title and at least one of Encrypted note or Optional hidden value. | Owner/team and related-system reference. |
| Certificate | Title and at least one valid X.509 certificate. | Chain/intermediates, matching private key, PFX/P12 bundle, owner/service, endpoint, note, and CA classification. |
| File | Title and one selected file for a new record. | Owner/recipient, related system/ticket, and file note. |

`CREDENTIAL` is a supported stored secret type, but it is deliberately absent from the manual type rail. New Active Directory credential records are created through agent sync. If manual credential creation is attempted, the form rejects it and routes to **Integrations > Active Directory**. Do not describe the New item page as creating RDP or SSH credentials.

There is no general Owner or Tags control on this form. The account field is type-specific context, not a guaranteed owner field. Certificate authority selection adds controlled certificate tags; other generic tags are not edited here.

## Work Here

- Select one of the five manual record types before entering its required value.
- Enter a clear title and only the context fields needed to find and operate the record safely.
- Generate or paste a value, then use the optional breach check when it is offered and organizational policy permits it.
- For Certificate, append leaf, chain/intermediate, private-key, and PFX/P12 sources through separate controls; for File, select one file within the documented limits.
- Review the active vault and write eligibility before selecting **Save encrypted record**.
- Use the back arrow to discard the current form and return to the list for the selected type.

## Type Changes and Sensitive Data Boundaries

Certificate, Credential, and File are separate sensitive-data boundaries. When entering or leaving one of these types while the form contains a hidden value, certificate/private-key material, a file selection, or directory binding, VaultPilot asks for explicit confirmation. After confirmation it clears those sensitive fields, the running certificate worker, and temporary source passphrases, so they cannot remain hidden and flow into a later record. General context such as title, account, URL, note, category, environment, owner, and tags may remain.

Password, API key, and Secure note stay within the same general-record boundary and can preserve the entered value when switching. Recheck the visible type and value before Save. Cancelling the confirmation leaves the current draft unchanged. No field is saved until the form is submitted, and there is no autosave or saved-draft list.

## Value Generation, Strength, and Breach Check

The password generator is available for every manual type except File. Lowercase characters are always present in the selection pool; Uppercase, Digits, and Symbols can add their character sets to that pool. Random selection from the combined pool does not guarantee that the generated value contains at least one character from any particular set, including lowercase. The visible length control allows 12–64 characters and defaults to 24 with all three options enabled. Generation uses browser cryptographic randomness and replaces the current hidden-value field; it does not save the record.

The **Short / Ready / Strong** pill is length-only feedback: under 16, 16–23, or 24+ characters. It is not a policy verdict, entropy proof, breach result, or save requirement.

When the breach button is present, it runs only after the operator selects it. The browser hashes the value with SHA-1 and sends only the first five hash characters to the HIBP Pwned Passwords range service; the full value is not sent. The displayed form result is not bound to a hash of the current field: generating, pasting, or editing the value afterward can leave a stale result visible, and that result can be copied to the saved record's browser-local breach status after a successful non-file save. Finish the value first, then run the breach check again immediately before Save. A breach-check error does not save or change the record and does not prove that an older displayed result matches the current value.

## Certificate Handling

The certificate editor has four distinct source roles: **Leaf certificate**, **Chain / intermediate**, **Private key**, and **PFX / P12**. Multiple sources can be appended to a role, and an incorrect or obsolete source can be removed without disturbing the others. PEM, CRT, CER, DER, P7/P7B/P7C/CMS, PFX/P12/PKCS12, P8/P8E/PK8, PKCS#1, PKCS#8, and KEY are supported; one record accepts at most 16 sources and 10 MB in total.

The browser calculates SHA-256 for each source and performs real cryptographic parsing. It reads X.509 certificates and PKCS#7 chains, opens PFX/P12 packages, and recognizes supported RSA, EC, and RFC 8410 keys. When a private key is present, its public component is compared with the leaf certificate. Save is blocked until at least one valid X.509 certificate exists, the key matches, protected sources can be opened, and all limits pass. Source bytes exist only inside the vault-key-encrypted payload; cards do not reveal or copy raw material or download the imported original file.

Each protected PFX/P12 or private-key source has its own **Source passphrase**. **Store passphrase encrypted in this vault** is off by default. Even when enabled, VaultPilot retains only a passphrase actually consumed by cryptographic parsing; a value typed for an unencrypted source or consumed by no source is not stored. With the option off, the passphrase remains only in browser memory for validation and is cleared on lock, logout, user change, or vault change.

Expiry and Subject/CN can be corrected in the form. Selecting DigiCert, GoDaddy, GlobalSign, Let's Encrypt, Microsoft CA, or Self-signed changes the record's certificate category and classification tags only. It does not contact that CA, validate an account, order, renew, reissue, revoke, or deploy a certificate.

## File Handling and Limits

A new File record requires one selected file. Selecting it changes the form type to File, fills Title from the file name only when Title is still blank, clears the hidden-value field, and shows size and chunk count. The password generator and hidden-value editor are not available for File.

The file size and storage ceiling are 1 GB per user in the active vault. Files are split into chunks of at most 2 MB, with at most 512 chunks. On Save, the browser first calculates the full-file SHA-256 hash, creates the encrypted File record, clears any existing chunks for that record, then encrypts and uploads each chunk with the active vault key. The server stores encrypted chunks plus size and chunk-position data for quota enforcement; it does not receive plaintext file bytes.

File record creation and chunk upload are separate operations. If upload fails after the record was created or after some chunks were accepted, there is no automatic transaction rollback. Refresh Files and verify the record and chunk availability before retrying or replacing it. Do not assume an error notice proves that no record or partial upload exists.

## Browser Encryption, Save, and Audit Outcome

For non-file records, the browser serializes the complete form payload and encrypts it with AES-GCM using the active vault key before calling the server. The server validates the encrypted envelope, record type, vault ID, session role, license mode, and vault write access; it does not receive the plaintext title, account, value, URL, note, or certificate material.

Browser-native required-field validation runs before the submit handler, browser encryption, and server request. If that validation passes, the submit handler checks the following conditions in order:

1. Active vault and browser vault key must exist.
2. The license and active-vault role must permit writes.
3. New Active Directory credentials are rejected from this page.
4. Title is required for every type.
5. Password and API key require a non-blank hidden value; Certificate requires at least one parsed X.509 certificate, and any added private key must match the leaf.
6. Secure note requires either note content or an optional hidden value.
7. A new File requires selected or retained file metadata, and a newly selected file must remain within the 1 GB limit.

These browser checks are operator feedback, not the authorization boundary. After the handler encrypts the payload, the server independently validates the session, encrypted envelope, record type, vault ID, license mode, and vault write role. It does not rely on the local Save button or local required controls for access protection.

While certificate import, encryption, save, or file upload is active, the submit control is disabled and progress is shown. There is no in-form cancel button for an active save or upload.

After successful creation, Password, API key, and Secure note write a `CREATE` audit event. Certificate and File write an `IMPORT` event. File chunk preparation also writes an `EDIT` audit event for clearing the record's existing chunk set. The form resets, the matching record list opens, and secret and audit queries are refreshed. A success notice confirms encrypted server storage, not that a credential was tested, a certificate was deployed, or a file was opened successfully.

## Cancellation and Error Behavior

- The back arrow resets the local form and returns to the selected type's list without an unsaved-change confirmation. Navigation does not abort certificate reading, save, or upload work that has already started. Do not navigate away as a cancellation method; wait for completion or failure, then reconcile the list and Audit Log.
- There is no separate Cancel button for a new record. **Cancel edit** appears only for an existing editable record; selecting it ends edit mode and leaves a blank Password draft on the New item screen rather than returning to the record list.
- Rejecting an oversized File clears the current picker selection but can leave earlier file metadata in the shared form. If a certificate source is unreadable, its passphrase is wrong, or its key does not match, remove or replace that source and run validation again; do not save until the editor reports a valid result.
- Most validation and save errors leave the current form in memory so the operator can correct it. A page reload, lock, navigation reset, or back-arrow reset should not be treated as draft storage.
- A failed save produces an on-screen error and live application notification. Do not paste the full response or form contents into public support.
- A file upload can fail after record creation; verify Files and Audit Log before deciding whether to retry.

## Recommended Workflows

### Create a Password, API key, or Secure note

1. Confirm the active vault and Editor or Manager role.
2. Choose the exact type and enter Title.
3. Add the required value; for Secure note, add note content, hidden value, or both.
4. Add only necessary account, URL, and operational context.
5. Optionally generate a value. After the final value is set, run the breach check immediately before Save; neither action saves automatically.
6. Select **Save encrypted record**, wait for completion, and confirm the expected list and audit event.

### Import a certificate record

1. Choose Certificate and enter a non-sensitive title.
2. Add leaf, chain/intermediate, private-key, and PFX/P12 material to the correct source roles; enter a separate passphrase for every protected source.
3. Review X.509 parsing, private-key match, chain state, SHA-256 values, Subject/issuer, and validity. Do not retain source passphrases unless the operating process requires it.
4. Select Save and confirm an `IMPORT` audit event. Certificate cards expose metadata, fingerprints, and securely generated chain-bundle/PFX actions—not raw material or original-file download.
5. Use the Certificates screen for inventory review and Server settings for the VaultPilot HTTPS package; this page does not deploy it.

### Store a file

1. Confirm available per-user, per-vault quota and choose a file no larger than 1 GB.
2. Review the inferred title, file name, size, chunk count, and destination vault.
3. Save and keep the page open while hashing, encryption, and upload complete.
4. Open Files and confirm the record can be retrieved before treating the upload as complete.
5. If an error occurred, inspect Files and Audit Log for a created record or partial chunk state before retrying.

## Screen States

| State | Operator response |
| --- | --- |
| New draft | Select a type and complete required fields; nothing is persisted yet. |
| No unlocked active vault | Unlock and select the intended vault before entering or saving material. |
| Viewer / Auditor | The chooser or editor may open, but Save is disabled and the server protects writes. Use an authorized Owner, Admin, or User with Editor or Manager vault access. |
| Read-only license | Viewing may continue, but Save remains blocked. |
| Type changed | Prefer reset and reopen after certificate, file, or tag work; otherwise recheck all shared and hidden data. |
| Missing title or value | Complete the exact required fields for the selected type. |
| Certificate importing | Wait for browser read and hash completion; this is not yet a saved record. |
| Invalid certificate source | Remove or replace the source; correct its passphrase, format, 10 MB/16-source total, or private-key match, then run validation again. |
| No file selected | Choose one file before saving a new File record. |
| File too large / quota exceeded | Prior file metadata can remain. Reset and reopen, then select a file that keeps the active-vault user total within 1 GB. |
| Encrypting / uploading | Keep the page open; there is no active-operation cancel control, and navigation does not abort the work. |
| Save succeeded | Confirm the destination list and `CREATE` or `IMPORT` audit evidence. |
| Save failed | Keep secret details private, correct the form, and verify whether a File record or partial chunks already exist. |

## Before You Act

- Confirm the active vault; this page has no vault picker.
- Confirm a writable license and Editor or Manager access to that vault.
- Use Active Directory sync, not New item, for new RDP/SSH credential records.
- Choose the type before entering sensitive material. After certificate, file, or tag work, reset and reopen rather than relying on a type switch; otherwise recheck hidden shared state.
- For certificates and files, verify source authorization, classification, retention, size, and destination.
- Remember that Generate, breach check, certificate import, and CA selection do not save or deploy anything. Re-run the breach check after the final value change and immediately before Save.

## Safe Evidence

- Safe to share: selected manual type, broad validation state, size band, chunk count, general audit action, and a placeholder field map.
- Keep private: title, account, URL, note, owner/team context, certificate subject/issuer/serial/hash, file name, exact size, and internal system or ticket references.
- Never share: passwords, API keys, tokens, certificate or private-key material, PFX/P12 contents or passwords, file contents, encrypted payloads, vault keys, or full form screenshots.
- If a real value entered public evidence, treat it as exposed and rotate or revoke it through the owning system.

## When to Stop and Escalate

Stop when the active vault is uncertain, write access is unexpected, certificate or file provenance is unknown, private-key exposure is suspected, an upload fails after partial progress, quota state conflicts with the UI, or audit and list outcomes disagree. Open a private case with record type, broad size, general error code, broad time window, and last safe step—without secret material.

## Operator Notes

New item is a client-side encryption form, not a workflow engine. It does not autosave, preserve drafts across reloads, test credentials, create Active Directory records manually, decide organizational certificate trust, deploy certificates, scan files, or rotate external systems. Cryptographic parsing and key matching do not establish that your organization trusts the certificate.

## Related

- [Passwords screen](screen-passwords.md)
- [API keys screen](screen-api-keys.md)
- [Secure notes screen](screen-secure-notes.md)
- [Certificates screen](screen-certificates.md)
- [Files screen](screen-files.md)
- [Active Directory records screen](screen-active-directory-records.md)
- [Audit Log screen](screen-audit-log.md)
