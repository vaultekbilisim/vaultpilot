# In-App Screen Help

Every workspace shown after sign-in has a `?` button in the top bar. Some dashboard menus expose the same link as **Open documentation**. Both use the active screen and language to open the matching public help page in a new tab.

These pages are operator guides, not product brochures. They explain what must be ready before an action, what the visible states mean, how to proceed safely, and which evidence can be shared when something goes wrong.

## Find the Right Help Page

The table below maps each screen to its guide and the decision that guide supports. If you open a guide directly from this index, verify the active screen and tab in VaultPilot before acting. When implementation and documentation disagree, preserve a redacted screen summary and report documentation drift; do not change a production setting based on an assumption in the guide.

<a id="contextual-help-routing"></a>

### Context-aware help routing

Some tabs and record contexts open the relevant section rather than the base workspace guide:

- With **Integrations > Browser extension** active, `?` opens [Browser Extension Screen](screen-browser-extension.md), not the general Integrations guide.
- With **Integrations > Active Directory** active, `?` opens the [Active Directory section](screen-integrations.md#active-directory-agent) of the Integrations guide.
- With **Tasks > Scheduled** active, `?` opens the [scheduled operations section](screen-executions.md#scheduled-operations) of the Executions guide.
- With **Server Settings > General** active, `?` opens the [general settings section](screen-server-settings.md#general-settings) of the Server Settings guide.
- With **Server Settings > Sign-in security** active, `?` opens [Sign-In Security Screen](screen-sign-in-security.md), not the general Server Settings guide.

Choosing **Go to agent** from a record detail or Active Directory card navigates to **Integrations > Active Directory** and focuses the matching provider. It does not create an agent, start a sync, or change the open record.

<a id="scoped-workspace-refresh"></a>

### Top-bar refresh

The refresh control in the top bar does not reload the browser page. It refreshes only the visible workspace and selected tab. For example, **Tasks > Scheduled** does not refresh the Runs list, **Integrations > Active Directory** does not refresh API clients, and one Server Settings tab does not refresh unrelated tabs. Local search and filter state, open form drafts, and vault lock state remain intact.

Move to each workspace and refresh it separately when an investigation spans several areas. Do not treat this control as a full-server reload or a service restart.

| Screen | Help page | Use this guide when... |
| --- | --- | --- |
| Security Command Center | [Security Command Center](screen-security-command-center.md) | Several operational signals compete for attention and you need to choose the first verified action. |
| Security | [Security](screen-security-dashboard.md) | You are correlating coverage, exposure, behavior, audit, and access signals. |
| Domain | [Domain Dashboard](screen-domain-dashboard.md) | You are checking directory connection, agent health, or managed-account state. |
| Certificate dashboard | [Certificate Dashboard](screen-certificate-dashboard.md) | You are prioritizing expired, approaching, invalid, or host-mismatched certificates. |
| Rotation | [Rotation Dashboard](screen-rotation-dashboard.md) | You are planning password or key renewal with ownership and expiry context. |
| New record | [New Record](screen-new-item.md) | You need to choose the correct record type and understand what save actually changes. |
| Passwords | [Passwords](screen-passwords.md) | You are finding, editing, copying, checking, or rotating sign-in records. |
| API keys | [API Keys](screen-api-keys.md) | You are storing, rotating, or marking token and API credential records inactive. |
| Secure notes | [Secure Notes](screen-secure-notes.md) | You are keeping sensitive operational text structured, bounded, and searchable. |
| Certificates | [Certificates](screen-certificates.md) | You are storing certificate metadata or an encrypted certificate package. |
| Files | [Files](screen-files.md) | You are adding, downloading, sharing, or removing approved sensitive files. |
| Active Directory records | [Active Directory Records](screen-active-directory-records.md) | You are reviewing custody, risk, sync, or account actions for directory-origin records. |
| Sharing | [Sharing](screen-sharing.md) | You are preparing internal or external delivery, setting limits, or revoking a package. |
| Sign-in security | [Sign-In Security](screen-sign-in-security.md) | You are evaluating 2FA, sessions, automatic locking, or account-recovery effects. |
| Discovery | [Discovery](screen-discovery.md) | You are running approved exposure checks or importing a verified file finding. |
| Users | [Users](screen-users.md) | You are changing an account, role, sign-in access, password, or 2FA state. |
| License | [License](screen-license.md) | You need to understand feature gates, trial state, capacity, or read-only mode. |
| Audit Log | [Audit Log](screen-audit-log.md) | You are determining who did what, checking integrity, or building an event timeline. |
| Integrations | [Integrations](screen-integrations.md) | You are managing API clients, directory connectivity, or general integration health. |
| Notifications | [Notifications](screen-notifications.md) | You are deciding which events reach whom or investigating delivery behavior. |
| Executions | [Executions](screen-executions.md) | You are monitoring active, completed, failed, cancelled, or apparently stuck jobs. |
| Updates | [Updates](screen-updates.md) | You are checking a release, starting an update, or verifying the post-restart state. |
| Server settings | [Server Settings](screen-server-settings.md) | You are changing access, HTTPS, SMTP, backup, migration, restart, or maintenance controls. |
| Browser extension | [Browser Extension](screen-browser-extension.md) | You are pairing a browser, approving a request, or revoking device access. |

## Public Documentation Security Boundary

These guides live in a public GitHub repository. Use placeholders or synthetic data only. Never add real vault contents, passwords or tokens, `.pfx`/`.p12` packages, private keys, certificate passwords, credential-bearing logs, API client secrets, private license material, customer names, internal IP/host names, or customer screenshots to these pages or to public issues.

To report an inaccurate guide, share the screen name, VaultPilot version, visible state label, and a redacted error summary. If explaining the problem requires a secret value or identifying infrastructure, leave the public channel and use your organization’s approved private support process.

## Related Documentation

- [Documentation gateway](../README.md)
- [Public repository boundary](public-repository-boundary.md)
- [Public language glossary](public-language-glossary.md)
- [Safe support evidence](support-evidence-pack.md)
