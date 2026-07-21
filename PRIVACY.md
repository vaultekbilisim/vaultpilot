# VaultPilot Browser Vault Extension Privacy Policy

Last updated: July 8, 2026

This privacy policy applies to the VaultPilot Browser Vault Extension for Chrome and Edge.

VaultPilot Browser Vault Extension is a browser-side helper for users and administrators of a self-hosted VaultPilot server. Its single purpose is to connect an approved browser profile to a user-configured VaultPilot server for encrypted vault sync, autofill, secure copy, password generation, optional password exposure checks, and Chrome Web Store deployment support.

The current public extension listing uses extension ID `hjkbedlaieikhkoplgpiohlaakgebobi`. The normal customer installation and update channel is Chrome Web Store; release ZIP files are retained only for release evidence, lab validation, local development, and emergency fallback.

## Data The Extension May Handle

The extension may handle the following categories of user data only for the VaultPilot vault helper purpose:

- Personally identifiable information, such as VaultPilot usernames, saved login usernames, email-like usernames, device names, and server/account metadata.
- Authentication information, such as passwords, credentials, generated passwords, extension PIN-protected pairing material, encrypted vault snapshots, and approved vault login records.
- Web history, limited to the active tab URL or host and page context needed to detect login forms, match the active site to VaultPilot vault entries, provide autofill, and offer save or update prompts.

The extension does not collect health information, financial or payment information for payment processing, personal communications, precise location, full browsing-history profiles, mouse movement, scrolling behavior, keylogging data, or unrelated user activity.

## How Data Is Used

The extension uses data only to provide or improve its VaultPilot Browser Vault Extension features:

- Pairing the browser profile with a self-hosted VaultPilot server approved by the user or organization.
- Reading the active tab URL or host to show matching vault suggestions.
- Detecting login forms and filling them after user interaction or approved autofill workflows.
- Copying approved usernames, passwords, URLs, generated passwords, and vault values when requested by the user.
- Syncing encrypted vault snapshots from the configured VaultPilot server.
- Decrypting approved vault data inside the browser runtime after local unlock.
- Protecting local pairing material and the extension private key with the extension PIN.
- Writing extension audit events through the paired VaultPilot server APIs.
- Running optional password exposure checks only when requested by the user.
- Showing relevant extension notifications and Chrome Web Store update status.

## Data Storage

The extension stores local settings such as the approved VaultPilot server origin, device name, language preference, pairing state, and PIN-wrapped pairing material in browser extension storage.

The extension does not store a persistent plaintext secret cache. Plaintext secret values are limited to runtime memory and user-requested clipboard actions. Copied values may be cleared after a short delay when supported by the browser and operating system.

## Data Sharing And Transfer

The extension communicates with the VaultPilot server configured by the user or organization. Vault data is received from that self-hosted server and is used only for approved VaultPilot Browser Vault Extension features.

Optional password exposure checks may contact the Have I Been Pwned k-anonymity range API only when the user requests a check. The extension sends only a password hash prefix for that lookup and does not send the full password.

The extension does not sell user data. The extension does not transfer user data to third parties for advertising, tracking, profiling, unrelated analytics, or purposes unrelated to its single VaultPilot vault helper purpose.

## Web Browsing Activity

The extension reads the active tab URL or host only to match the current website with VaultPilot vault entries and provide autofill suggestions. It does not build, sell, or transmit a browsing history profile.

## Remote Code

The extension does not load, execute, eval, or import remotely hosted JavaScript or executable code. All extension logic is packaged inside the submitted Manifest V3 extension. Network requests are limited to approved VaultPilot server APIs and optional password exposure range-check API calls for data lookup only.

## Limited Use Disclosure

The extension's use of user data complies with the Chrome Web Store User Data Policy, including the Limited Use requirements. User data is used only to provide or improve the extension's single purpose and user-facing features. User data is not used or transferred for advertising, unrelated purposes, profiling, creditworthiness, or lending decisions.

Chrome Web Store privacy practice disclosures for this extension should match this policy, the packaged extension behavior, and the public store listing. If those surfaces disagree, they must be aligned before publication or update submission.

## Contact

Use the support channels listed in the public VaultPilot support page:

- Support: https://github.com/ucsahinn/vaultpilot/blob/main/SUPPORT.md
- Security reporting: https://github.com/ucsahinn/vaultpilot/blob/main/SECURITY.md
