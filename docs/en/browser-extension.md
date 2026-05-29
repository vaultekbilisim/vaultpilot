# Chromium Extension

PassMan Chromium Extension provides paired-device access to vault records through user-action autofill, save-login prompts, update-login prompts and active-site record-count badges.

![PassMan browser extension management](../../assets/screenshots/browser-extension-management.png)

## Installation Modes

| Mode | Use when |
| --- | --- |
| Enterprise policy deployment | You manage Chrome or Chromium-based browsers centrally. |
| ZIP fallback package | You need manual install, lab validation or emergency rollout. |
| Managed CRX/Web Store flow | You require browser-native update distribution. |

Chrome does not allow a normal web page to silently install an extension. Automatic deployment requires enterprise policy, Web Store or a signed CRX update flow.

## Pairing Flow

1. Install or deploy the extension.
2. Open the extension popup.
3. Enter the PassMan server origin.
4. Enter username, device name and extension PIN.
5. The extension creates a short-lived pairing code.
6. Approve the device in PassMan: Browser extension.
7. PassMan wraps vault access for the extension public key.

## User Experience

| Feature | Behavior |
| --- | --- |
| Badge count | The extension icon shows the number of matching records for the current site. |
| Autofill | User action fills the selected record into the current page. |
| Save login | New login detection can prompt the user to save a new record. |
| Update login | Changed username/password detection can prompt the user to update an existing record. |
| Notifications | Pairing, revocation, autofill and save/update states are shown in the popup and browser notification surface where supported. |

## Security Model

- Extension private material is protected by the extension PIN and browser profile storage.
- Persistent extension storage does not contain plaintext secrets.
- Autofill snapshots contain encrypted payloads and extension-wrapped keys.
- Plaintext is decrypted only in the active extension session after user action.
- Lost or untrusted devices should be revoked from the PassMan panel.

## Operations Checklist

- Pair only named devices.
- Keep extension versions aligned with release notes.
- Use policy deployment for production fleets.
- Review the Browser extension screen after updates.
- Revoke devices that are unused, unknown or no longer compliant.
