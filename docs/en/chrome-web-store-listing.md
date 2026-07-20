# Chrome Web Store Listing And Privacy

Use this page when maintaining the public Chrome Web Store listing for VaultPilot Browser Vault Extension. It keeps the store copy, privacy disclosures, screenshots, and public repository wording aligned with the current extension behavior.

The public extension identity is:

| Field | Value |
| --- | --- |
| Store listing | `https://chromewebstore.google.com/detail/vaultpilot-browser-vault/hjkbedlaieikhkoplgpiohlaakgebobi` |
| Extension ID | `hjkbedlaieikhkoplgpiohlaakgebobi` |
| Current public extension version | `1.3.2` |
| Manifest version | `3` |
| Primary install channel | Chrome Web Store |
| Release archive | `vaultpilot-browser-vault-extension.zip`, retained for release evidence, lab validation, local development, and emergency fallback only |
| Privacy policy | [PRIVACY.md](../../PRIVACY.md) |

## Store Listing Copy

Use VaultPilot wording for new publication. Use PassMan only when explaining legacy compatibility.

Public check on 2026-07-09 found the live store title and version aligned with VaultPilot `1.3.2`. The visible overview starts with VaultPilot wording, but the detailed description still repeats PassMan as the current server/product name. Track that owner-gated correction in [Public external surface drift](public-external-surface-drift.md) until the publisher dashboard is updated.

## Publisher Dashboard Handoff

Use this handoff for the next Chrome Web Store publisher-dashboard edit. It is intentionally limited to fields the publisher can paste or compare directly.

| Dashboard field | Required value |
| --- | --- |
| Extension name | `VaultPilot Browser Vault Extension` |
| Extension ID | `hjkbedlaieikhkoplgpiohlaakgebobi` |
| Public version to verify before submit | `1.3.2` |
| Short description | Use the text under [Short Description](#short-description). |
| Detailed description | Replace the live detailed description that still presents PassMan as the current server/product with the text under [Detailed Description](#detailed-description). |
| Privacy data categories | Personally identifiable information, authentication information, and web history. |
| Privacy policy URL | `https://github.com/ucsahinn/vaultpilot/blob/main/PRIVACY.md` or the raw GitHub URL shown by the dashboard. |
| Support URL | `https://github.com/ucsahinn/vaultpilot/blob/main/SUPPORT.md` |
| Store screenshots | Use only sanitized synthetic-data screenshots that match [public screenshot standards](public-screenshot-standards.md). |

Replace live detailed-description text that presents PassMan as the current product. Keep PassMan only when explaining older deployment compatibility.

### Title

```text
VaultPilot Browser Vault Extension
```

### Short Description

```text
Pair Chrome or Edge with a self-hosted VaultPilot server for approved autofill, secure copy, save/update prompts, and vault badges.
```

### Detailed Description

```text
VaultPilot Browser Vault Extension connects an approved Chromium browser profile to a self-hosted VaultPilot Enterprise Vault Console.

The extension helps users work with records already stored in their VaultPilot server:

- Pair an approved browser profile with a VaultPilot server.
- Unlock extension access with an extension PIN.
- Show matching vault records for the active site.
- Fill selected login records after user action.
- Copy approved usernames, passwords, URLs, and generated passwords.
- Detect login forms and offer save or update prompts for paired, writable vaults.
- Generate passwords inside the extension UI.
- Request optional password exposure checks through the Have I Been Pwned k-anonymity range API.
- Show the installed extension version and request a Chrome Web Store update check.

VaultPilot is self-hosted. Vault data comes from the VaultPilot server configured by the user or organization. The extension does not sell user data, does not use data for advertising or profiling, and does not load remote executable code.

Plaintext secret values are not stored as a persistent browser cache. Decrypted values are limited to the active extension runtime after user action and to user-requested clipboard actions.

For normal installation and updates, use the Chrome Web Store listing and extension ID hjkbedlaieikhkoplgpiohlaakgebobi. The release ZIP is retained only for release evidence, lab validation, local development, and emergency fallback.
```

## Privacy Practices Alignment

The Chrome Web Store Developer Dashboard privacy practices must match [PRIVACY.md](../../PRIVACY.md), the packaged extension behavior, and the store description. If any of those disagree, fix the public text or the extension before submitting.

| Store form area | VaultPilot answer |
| --- | --- |
| Data categories handled | Personally identifiable information, authentication information, and web history. |
| Data use | Single-purpose vault helper behavior: pairing, encrypted vault sync, active-site matching, user-action autofill, secure copy, save/update prompts, notifications, audit events, and optional password exposure checks. |
| Data transfer | User-configured VaultPilot server; optional Have I Been Pwned k-anonymity range API only when the user requests an exposure check. |
| Advertising or profiling | No. |
| Remote code | No. All executable extension logic must be packaged with the Manifest V3 extension. |
| Limited Use disclosure | Keep the affirmative Limited Use statement in [PRIVACY.md](../../PRIVACY.md) and one click from the public repository home. |

## Permission Review

Before each store update, inspect the packaged extension `manifest.json` from the release archive and confirm every permission is still needed for the visible feature set.

| Permission | Public justification |
| --- | --- |
| `activeTab` | Reads the active tab context after user interaction so the extension can match the current site to VaultPilot records. |
| `clipboardRead` | Supports protected clipboard workflows and delayed clipboard clearing where the browser allows it. |
| `clipboardWrite` | Copies approved usernames, passwords, URLs, generated passwords, and vault values when the user requests it. |
| `notifications` | Shows pairing, revocation, autofill, save/update, and update-check states without exposing secret values. |
| `scripting` | Supports user-action autofill and page interaction on approved login forms. |
| `storage` | Stores approved server origin, language preference, device state, and PIN-wrapped pairing material. |
| `tabs` | Reads active-tab URL/host context for record matching and badge updates. |
| `http://*/*`, `https://*/*` host permissions | Allows login-form detection and active-site matching across organization-approved web apps. Keep this broad host scope only while autofill and save/update must work across arbitrary customer domains. |

Do not request new permissions for future plans. Add a permission only after the feature exists, is documented, and has a clear user-facing reason.

## Package Audit Commands

Run these commands against the release ZIP before a Chrome Web Store upload. They unpack to a temporary folder, print the manifest fields reviewers usually ask about, and search the packaged files for remote-code patterns.

```powershell
$zip = ".\vaultpilot-browser-vault-extension.zip"
$auditRoot = Join-Path $env:TEMP "vaultpilot-extension-audit"
New-Item -ItemType Directory -Force -Path $auditRoot | Out-Null
Expand-Archive -LiteralPath $zip -DestinationPath $auditRoot -Force

$manifest = Get-Content (Join-Path $auditRoot "manifest.json") -Raw | ConvertFrom-Json
$manifest | Select-Object manifest_version,version,name,permissions,host_permissions

Get-ChildItem -LiteralPath $auditRoot -Recurse -File |
  Select-String -Pattern 'eval\(|new Function\(|importScripts\(|https?://.*\.js|WebAssembly\.compile'
```

An empty remote-code search is the expected result. If it returns a match, inspect the file before submission and update this page, the review KB, and the extension package as needed.

## Graphic Assets

| Asset | Required state |
| --- | --- |
| Store icon | 128 x 128 PNG. Use the VaultPilot extension icon, not a screenshot. |
| Screenshots | At least one 1280 x 800 screenshot; up to five total. Use sanitized synthetic data only. |
| Small promo tile | 440 x 280 PNG or JPEG when the publisher account needs it. |
| Marquee promo tile | 1400 x 560 PNG or JPEG; optional. |
| Localized screenshots | Use English and Turkish screenshots only if the extension locale and screenshot text match the selected store locale. |

Never upload screenshots with real vault records, customer hostnames, usernames, logs, tokens, license values, internal URLs, or support tickets.

## Submission Checklist

1. Confirm the release archive contains extension version `1.3.2` or the intended new version.
2. Confirm the listing still uses extension ID `hjkbedlaieikhkoplgpiohlaakgebobi`.
3. Compare Developer Dashboard privacy practices with [PRIVACY.md](../../PRIVACY.md).
4. Recheck the packaged `manifest.json` permissions and host permissions.
5. Search the packaged extension for remote executable code patterns before upload.
6. Confirm screenshots are sanitized and match the submitted VaultPilot release UI.
7. Keep the public repository release notes and browser-extension docs aligned with the submitted version.
8. Do not publish from this repository. Store submission requires the Chrome Web Store publisher account.

## Verification

Before committing public docs changes that affect the store listing:

```powershell
npm run validate
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

External references:

- [Chrome Web Store listing information](https://developer.chrome.com/docs/webstore/cws-dashboard-listing)
- [Chrome Web Store privacy fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)
- [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies/policies)

Related:

- [Browser extension guide](browser-extension.md)
- [Update Center](update-center.md)
- [Release asset verification](release-asset-verification.md)
- [Public discoverability](public-discoverability.md)
- [Public external surface drift](public-external-surface-drift.md)
- [Chrome Web Store review KB](../../kb/en/chrome-web-store-review.md)
- [Privacy policy](../../PRIVACY.md)
