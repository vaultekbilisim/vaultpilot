# Certificates Screen

The topbar `?` opens this guide for the Certificates screen. This workspace manages certificate, certificate-package, and private-key records in the selected vault. It does not install or replace the VaultPilot server’s HTTPS certificate; the live public certificate is managed through the separate flow in **Server settings**.

Auditors cannot access secret records or vault keys. Owner, Admin, and User accounts can use only vaults assigned to them. A **Viewer** in the selected vault can read record metadata and fingerprints and, when validated material is available, export a browser-generated chain bundle or password-protected PFX. Certificate cards do not reveal raw material, copy raw values, or download an imported original file. Vault **Editors** and **Managers** can create, duplicate, edit, and delete records while the license remains writable.

## Work Here

- Use **Search certificates** across title, owner/service, endpoint, category, tags, issuer, Subject/CN, and serial number.
- Combine the **Renewal**, **Expired**, **No date**, and **Revoked** quick filters with smart filters such as validity window, certificate authority, and organization. A quick-filter chip appears only when its matching record count is greater than zero.
- Switch between card and table layouts, and use Refresh to query the selected vault again.
- When you have write access, choose **New certificate**. Append leaf, chain/intermediate, private-key, and PFX/P12 sources through their dedicated controls; each source can be removed independently.
- Use card actions to open details, copy safe metadata or the fingerprint, generate a chain bundle/PFX from available material, or open the menu to duplicate, edit, and delete the record.

## How to Read the Screen

A list row shows the title and last-updated time. Imported records may also show source roles, format and size, remaining validity, Subject/CN, issuer, and a short SHA-256 prefix. These values identify the record after the vault is unlocked; they are metadata, not the certificate body, private key, or package contents.

**View certificate details** opens a side panel with context such as source, risk, record state, account/service, target, category, owner, tags, and last update. It does not expose secret material or the original file.

**Copy metadata** and **Copy fingerprint** place only safe identifying text on the clipboard. Export never returns the imported raw file: the browser builds a new chain bundle or PFX from material that is actually present and validated in the record. This boundary prevents a private key from leaving unintentionally inside an opaque original file.

### Metadata and secret-material boundary

Title, owner/service, endpoint, note, expiry date, Subject/CN, and certificate-authority classification are record context visible after the vault is unlocked. They are also stored inside the encrypted record payload, but viewing them does not require a separate reveal confirmation.

The certificate editor manages four source roles together: leaf certificate, chain/intermediate, private key, and PFX/P12 identity bundle. Multiple sources can be appended to a role, and each can be removed without disturbing the others. VaultPilot performs real cryptographic parsing of X.509 certificates, PKCS#7 chains, PFX/P12 packages, and supported RSA, EC, and RFC 8410 keys. An encrypted PFX/P12, PKCS#8 key, or traditional PEM key exposes a separate **Source passphrase** beside that source; the passphrase never enters title, notes, API metadata, audit content, or logs.

**Store passphrase encrypted in this vault** is off by default. When enabled, only a passphrase that was actually consumed by cryptographic parsing is retained in the vault-key-encrypted payload. A value accidentally entered for an unencrypted source is not stored. With the option off, the passphrase exists only in browser memory for that validation and is cleared on lock, logout, user change, or vault change.

A private key cannot create a certificate record by itself. VaultPilot requires a valid X.509 certificate and verifies that the key matches before save. Missing issuers, intermediates, or roots are never fetched from the internet or invented.

Certificate-authority cards show the provider name, signal description, and access-mode label. Selecting one replaces any recognized CA tag, sets category to `Certificate`, defaults an empty source to `manual`, and adds both the `certificate` tag and the selected authority tag. Selecting DigiCert, GoDaddy, GlobalSign, Let’s Encrypt, Microsoft CA, or Self-signed does not connect to an external service or start issuance, renewal, rekey, or revocation.

## Recommended Workflows

### Create a record from a certificate file

1. Unlock an assigned vault where you have write access and choose **New certificate**.
2. Enter the required title, then add owner/service and endpoint as record context.
3. Add the leaf certificate, chain files, private key, and any PFX/P12 bundle through their matching source controls. PEM, CRT, CER, DER, P7/P7B/P7C/CMS, PFX/P12/PKCS12, P8/P8E/PK8, PKCS#1, PKCS#8, and KEY are supported; one record accepts at most 16 sources and 10 MB in total.
4. Enter the matching passphrase beside every protected source. Leave **Store passphrase encrypted in this vault** off unless the operational workflow requires retained source access.
5. Run validation and review that a real X.509 certificate exists, any private key matches, the chain state, file name/format/size, SHA-256, Subject/issuer, and validity dates.
6. Complete the operational metadata and save. Wrong passphrases, unreadable keys, mismatched private keys, missing certificate material, or limit violations block the record.

Metadata is not guessed from a file name or free-form labels; it is extracted from the parsed X.509 certificate. VaultPilot cryptographically compares a private key's public component with the leaf certificate. A wrong passphrase, corrupt package, unsupported encryption, or mismatched key blocks validation.

### Edit a record or replace material

PEM leaf, chain, or private-key material can also be added as text; the same parsing and key-match rules apply. When you open **Edit**, append replacement material to the correct role, review validation, and remove each obsolete source with its own remove control. A record cannot be saved without at least one real X.509 certificate.

For renewal review, check **Renewal**, **Expired**, and **No date** first, then add a validity-window or certificate-authority filter when needed. Complete renewal through the certificate authority or organizational process. When the new file is ready, update the existing record through **Edit**; the classification card does not renew anything.

### Copy metadata and export safely

Copy actions on a certificate card are limited to certificate metadata and the fingerprint. There is no reveal or direct-copy action for the certificate body, private key, source passphrase, or original source file.

**Download chain bundle / PFX** builds PEM/CRT, DER/CER, P7B/P7C, `chain.pem`, `fullchain.pem`, a manifest, and SHA-256 inventory in the browser from material actually present in the record. When one matching private key exists, VaultPilot requires a new export password of at least 12 characters and adds password-protected PFX/P12 plus encrypted PKCS#8; that new password is never stored. Original files that may contain a private key are not copied unchanged into the ZIP. If a legacy record lacks real source material, VaultPilot does not invent formats or a chain; re-import the authorized source.

### Lifecycle alerts

Lifecycle monitoring uses the earliest-expiring real certificate across the leaf and its linked intermediate/root members, not a manually typed date in the record title or notes. Unlinked (`UNLINKED`) members remain visible for context but do not change the alert date or risk state. A certificate is expired at the exact `notAfter` instant. **15, 7, 3, and 1 day remaining** and **expired** are distinct thresholds; VaultPilot does not emit the same threshold repeatedly.

The scan needs vault data decrypted in the client, so it can run only while an authorized user session is active and the relevant vaults are unlocked. A locked or unreadable vault never leaks record names, material, or detailed errors; results expose only counts for scanned, alerted, and safely skipped vaults or records. Failure in one vault does not stop the other unlocked vaults.

## Screen States

| State | Operator response |
| --- | --- |
| Loading | Wait for skeleton rows before interpreting results. |
| No records | If you have write access, create the first record; otherwise confirm the vault and role. |
| No matches | Clear search and active smart filters. |
| Valid | Still verify remaining term, endpoint, and renewal owner. |
| Lifecycle threshold | Put the earliest chain member with 15, 7, 3, or 1 day remaining into the organization’s renewal process. |
| Expired | Do not distribute the material; verify source state and its replacement. |
| No date | Complete expiry from an authoritative source; do not treat missing as unlimited validity. |
| Revoked / disabled | Do not use the record as an active certificate; reconcile it with the source system. |
| Reading certificate | Wait for import to finish before saving or choosing another file. |
| Too large / unreadable | Confirm the 10 MB limit and a supported format; do not upload the file publicly. |
| Export disabled | Validated source material is missing or the private key does not match; re-import from the authorized source. |
| Write disabled | Check vault role and license read-only state. |

## Before You Act

- Confirm the selected vault and that your vault role permits the intended operation.
- Confirm the license is not read-only before writing a record.
- Decide whether the task targets a vault record or the live server HTTPS certificate.
- Verify file source, expected SHA-256, Subject/CN, issuer, and expiry through a trusted channel.
- Account for audit evidence generated by metadata/fingerprint copy and chain-bundle/PFX export.
- Confirm that bulk category, tag, archive, disable/revoke, note, edit, and delete actions require Editor or Manager vault access.

## Safe Evidence

- **Safe to share:** certificate state class, broad validity window, file format and size, certificate-authority class, and a short SHA-256 prefix.
- **Keep private:** certificate or private-key material, original PEM/KEY/PFX/P12 package, package passphrase, full serial number and fingerprint, internal system name, complete Subject/issuer values, customer endpoint, and unmasked record screenshots.
- Mask title, owner/service, URL, Subject/CN, issuer, and full SHA-256 in screenshots sent to support.
- If a private key or package passphrase is exposed, stop copying or repackaging it and start the organization’s incident-response and certificate-authority process privately.

## When to Stop and Escalate

Stop when the file’s SHA-256 differs from the expected value, Subject/issuer or expiry differs from the source record, the private key does not match, the source cannot be traced to an authorized owner, or a vault record is being mistaken for the live server certificate. Open a private support case with record ID, broad format and size, short SHA-256 prefix, redacted error, and attempted steps—never the secret material.

## Operator Notes

A vault certificate record is not a deployment tool or certificate-authority client. Importing a file does not change the VaultPilot server’s HTTPS binding; the live public certificate is managed only through **Server settings**. Lifecycle scanning produces alerts; it does not renew, rekey, revoke, or deploy a certificate.

## Related

- [Certificate dashboard screen](screen-certificate-dashboard.md)
- [Server settings screen](screen-server-settings.md)
- [Public address and HTTPS](public-host-https-certificate.md)
