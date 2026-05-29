# Sharing and Offline Decrypter

PassMan sharing is selected-record first. Operators do not need to share an entire vault; only the chosen records and files are packaged.

![PassMan sharing package flow](../../assets/screenshots/sharing-package-flow.png)

## Internal Sharing

Internal sharing is for registered PassMan users.

- Recipient identity and public-key state are checked.
- Selected records are wrapped for the recipient.
- Audit events are written for share creation, view and revoke actions.
- Recipient access remains bounded by role and vault access.

## External Sharing

External sharing creates an offline package for recipients outside the PassMan server.

Required policy decisions:

| Policy | Purpose |
| --- | --- |
| Selected records | Only chosen passwords, API keys, credentials, notes, certificates or files are packaged. |
| Passphrase | Recipient must know the passphrase to open the package. |
| Expiry | Package becomes unusable after the configured time. |
| Maximum opens | Package stops opening after the configured open count. |
| File inclusion | File-backed secrets can be included when sensitivity and size are acceptable. |

## Completion State

After a package is completed, the Sharing screen should remain actionable:

- Generated package is visible in history.
- Passphrase delivery guidance is visible.
- Expiry and maximum open count are shown.
- Revoke and audit actions remain available.
- The recipient workflow links to the offline decrypter.

## Offline Decrypter

![PassMan offline share decrypter](../../assets/screenshots/offline-share-decrypter.png)

The HTML tool inside `passman-share-decrypter.zip` runs fully in the browser.

Trust indicators:

- Local-only operation.
- No network connection required.
- Package JSON, passphrase and metadata verification happen in the browser.
- Wrong passphrase, tampered metadata, expired package and exhausted usage limit produce separate errors.

## Operator Guidance

- Send the package and passphrase through different channels.
- Use short expiry for high-sensitivity material.
- Use low maximum open count for one-time handoffs.
- Revoke packages when recipients no longer need access.
- Do not paste package JSON, passphrases or secret values into public support channels.
