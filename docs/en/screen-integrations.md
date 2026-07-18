# Integrations Screen

The topbar `?` opens this guide from the **External API** and **Active Directory** tabs. On the **Browser extension** tab, the same icon opens the separate [Browser Extension screen](screen-browser-extension.md) guide for that workflow. The Integrations screen manages these three product surfaces.

## Access and License Boundary

The Integrations screen is shown only to the VaultPilot **Owner** system role. Admin, Auditor, and User roles cannot list or manage API clients or directory providers here. The license must include the **Integration** capability before the screen can be opened from the sidebar; without it, the item is disabled and the Owner is directed to License.

A read-only license blocks creating API clients and AD agents, saving directory scope, requesting immediate sync, running agent actions, rotating or revoking an agent token, deleting a provider, and importing AD records into a vault. Revoking an existing API client or browser-extension device remains available as a security action under a read-only license. Browser Extension is not licensed separately; it is included in the **Integration** capability. Legacy signed `extension` licenses preserve Browser Extension access only and do not unlock External API or Active Directory.

## Work Here

- On **External API**, select read-only API capabilities, assign at least one vault when required, and issue a client.
- Copy a new client secret before its timer ends; it cannot be displayed again later.
- Use the **Client ledger** to review active and revoked clients, scopes, vault count, last read, and creation context.
- Filter client creation, endpoint-access, and revocation events in the **Audit stream**, then open the original Audit Log event.
- On **Active Directory**, install or repair the single agent record and review sync health, the OU/group/user tree, and reported capabilities.
- Manage VaultPilot sign-in scope separately from the AD users selected for vault import.
- On **Browser extension**, review the Chrome Web Store channel, pending and approved devices, and the archive of revoked or expired devices.

## External API

### Permission matrix and endpoint scope

The screen starts with three operational status permissions selected. At least one permission always remains selected. Unless **Vault data** is selected, the vault picker is hidden and the issued client cannot read any vault record.

| Screen permission | Internal scope | Allowed endpoint | Data boundary |
| --- | --- | --- | --- |
| Vault data | `SECRETS_READ` | `GET /api/public/v1/secrets` and `GET /api/public/v1/secrets/{secretId}` | Encrypted snapshots and single-record output only for assigned vaults; no plaintext vault content is returned. |
| Server status | `SERVER_STATUS_READ` | `GET /api/public/v1/server/status` | Server health and runtime status. |
| Active Directory | `DIRECTORY_STATUS_READ` | `GET /api/public/v1/directory/status` | Agent connection, sync, and selected-object counts. |
| Update status | `UPDATE_STATUS_READ` | `GET /api/public/v1/updates/status` | Update Center package and version signal. |

**Vault data** is the high-care permission. When selected, at least one entry under **Vaults in API scope** is required before a client can be created. Do not select a vault for a status-only client; those endpoints do not decrypt vault data.

### Issue a client and handle its secret

1. In the **Permission matrix**, select only the groups required by the consuming system.
2. Review the concrete paths under **Endpoint scope**.
3. If `SECRETS_READ` is selected, choose the smallest required vault set.
4. Enter a **Client name** that identifies the consuming system and purpose.
5. Choose **Create client**.
6. Move the full Client ID and the value from **Copy client secret** into the consuming system's approved secret store.

The secret remains masked on screen. After the 120-second timer or when **Clear** is selected, only the one-time result panel is removed; the client record and server-side secret digest remain. A lost secret cannot be reopened. After copying the secret, VaultPilot attempts to clear the clipboard after 30 seconds only if the same value is still present. Browser permissions can prevent cleanup, and a value already pasted or captured elsewhere cannot be retracted. Copying the Client ID does not use timed clipboard clearing.

### Client ledger, audit, and revocation

The ledger shows status, name, compact Client ID, permissions, vault/scope/log counts, last read, creator, and creation time. **Copy client ID** copies the full identifier. **View logs** selects that client in the Audit stream. For successful public API use, the server updates **Last read** and records an `INTEGRATION_SYNC` audit event at most once per client in each five-minute interval, not once per request. The stream shows the newest eight creation, sampled endpoint-access, or revocation events for the current filter; selecting a row opens the original Integration-category event in Audit Log.

After confirmation, **Revoke access** moves the client to `REVOKED`. The revoked record remains in the ledger as evidence, cannot be reactivated, and cannot return the same secret. To replace a client, issue a new least-privilege client, move the consumer to the new credential, and then revoke the old one.

<a id="active-directory-agent"></a>

## Active Directory

### Data and password boundary

The VaultPilot DC agent runs on the same network as the domain controller. It sends DC, Base DN, bind username, OU, group, user, and AD-state information to VaultPilot. It does not send or display the bind password or existing AD user passwords. An imported AD record is created with user/UPN/DN and state metadata and an empty password field; a new password can later be assigned through an authorized agent action and written to the encrypted record.

### First agent record and local installation

1. Confirm the provider name; the default automatic sync interval is 10 minutes.
2. Choose **Create agent record** to prepare the single provider record.
3. Use **Download agent script** to obtain `/downloads/vaultpilot-dc-agent.ps1`.
4. Copy the masked-on-screen agent token separately with **Copy token**.
5. Use **Copy command**, run the service-install command in elevated PowerShell, and paste the token only into the local secure prompt.
6. When needed, use **VaultPilot preflight**, **LDAP preflight**, **Status command**, and **Live log**.

When the console is opened over HTTPS, the current VaultPilot certificate thumbprint is pinned into the agent command. If an enterprise CA is used, manage its trust through the Windows certificate store or corporate deployment policy as well. If an agent record already exists, do not create a second provider; **Rotate token** on the existing row produces a new token and repair command.

For **Copy token** and **Copy command** on a token, install command, or repair command, VaultPilot makes a best-effort clipboard-clear attempt after 30 seconds if the same content is still present. Copies made by **VaultPilot preflight**, **LDAP preflight**, **Status command**, and **Live log** do not use timed clearing; remove them from the clipboard yourself after use.

### Provider status, tree, and scopes

The provider card shows DC, Base DN, agent version, bind username, last seen, last sync, and sync interval. Its state can be **AGENT WAITING**, **CONNECTED**, **STALE**, **OFFLINE**, or **TOKEN REVOKED**. A connected agent can additionally show **SYNCING**, **SYNC QUEUED**, or **ERROR**. **Sync now** only queues a command; follow the provider state and Executions screen for the result.

**Search directory tree** searches OU, group, user, UPN, and DN. **Tree**, **OU**, **Groups**, and **Users** filter only the displayed tree. Per-user VaultPilot sign-in selections are saved immediately to a separate sign-in scope. Branch and user selections for AD record import remain a draft: choose **Save scope** before **Import selected to vault**. Import requires Editor or Manager access to the active vault and a writable license.

In prepared VaultPilot 2.2.0, a selected user already present in the same vault is reconciled instead of skipped, updating identity and AD-state metadata. This can complete only while the matching writable vault is unlocked in an authorized browser; the agent and server cannot decrypt the record. The existing password is never replaced with blank directory data, and a user removed from scope or missing from the directory is not silently deleted. Provider sync can succeed while vault reconciliation returns a partial result; inspect each item outcome.

The **Agent capabilities** strip reports support for **Password state**, **Unlock account**, **Require password change**, **Assign random password now**, and **Disable account**. The strip does not start those actions. Sensitive actions remain fail-closed unless Owner access, a writable license, `CONNECTED` health, a ready worker, and the reported capability are all present. Identity-bound actions require both service and worker to report `1.2.20` or newer; the current download and repair target is `1.2.21`, and successful sync does not upgrade an older agent. Built-in identities and the bind identity always remain protected. Other privileged targets require a second confirmation for manual work and an additional durable policy approval for automated rotation. Results appear in the **Agent actions** timeline.

**Rotate token** invalidates the old token immediately and shows the replacement only in the current result panel. Under **Danger actions**, **Revoke token** prevents further sync until repair or re-enrollment. **Delete provider** removes the provider record; the Windows agent then needs a new enrollment and token before it can reconnect.

Install and repair commands never contain the token value; they use `-PromptAgentToken`. Copy the token separately and paste it only into the local secure prompt in elevated PowerShell. Never add a plaintext token to the command.

## Browser Extension

This tab opens Chrome Web Store as the normal installation channel; a local ZIP or Developer Mode is not the daily install path. Summary cards refresh last sync and approved/pending device counts. **Active devices** contains `PENDING` and `APPROVED`; **Archive** contains `REVOKED` and `EXPIRED` devices.

To approve a pending request, enter the eight-character code from the extension popup in `XXXX-XXXX` form. At least one vault must be unlocked and the license must be writable. A device row shows only device name, the last-four pairing-code hint, and vault-grant count; verify user, account, browser profile, and request origin through an internal channel. Approval wraps the unlocked vault keys for the device public key; plaintext vault records and the master password are not displayed in the device list. The exact action shown for an approved device is **Revoke**. The `?` on this tab opens the Browser Extension screen guide for detailed pairing and device states.

## Recommended Workflows

### Issue a status-only API client

1. Keep **Vault data** cleared.
2. Select only the required Server status, Active Directory, and Update status permissions.
3. Confirm that the endpoint summary contains no vault path and that the vault picker is absent.
4. Issue the client and move its secret to the approved consumer.
5. After the first successful request, verify **Last read** and the **Endpoint access** event in the Audit stream. Later calls from the same client may not update either field again inside the five-minute sampling interval.

### Repair the directory agent

1. Check agent health and last seen, then verify the Windows service with **Status** and **Live log**.
2. If the token is invalid or repair is required, confirm **Rotate token**.
3. Copy the new token separately, run the repair command in elevated PowerShell, and press Enter to preserve unchanged DC/bind settings.
4. After health returns to `CONNECTED`, choose **Sync now**; do not select scope or import records before the first sync completes.

## Screen States

| State | Operator response |
| --- | --- |
| API clients loading | Wait for the ledger skeleton rows before issuing a new client. |
| No API clients | Review the permission matrix and issue the first client only for a real consumer. |
| API client revoked | Do not reuse the record; issue a new least-privilege client when required. |
| API client creation failed | Check Owner role, writable license, selected permission, and vault assignment for `SECRETS_READ`. |
| AD providers loading | Do not create an agent record until existing provider state is known. |
| AD providers unavailable | Choose **Retry**; do not create a second provider while the error remains. |
| Agent waiting | Verify the script, local token prompt, VaultPilot reachability, and first Windows-service connection. |
| Stale / offline | Stop sensitive directory actions and inspect the service and network with Status and Live log. |
| Agent token revoked | Do not expect sync until a new token and repair command are installed. |
| Waiting for first sync | Choose **Request first sync** and wait for the tree before selecting scope. |
| Unsaved scope changes | Choose **Save scope** or **Discard changes**; vault import is disabled meanwhile. |
| Extension pairing pending | Match the row's device name and code hint; verify user, account, and browser profile through an internal channel. |
| Extension request expired / revoked | Review it in Archive and start a new request from the extension if needed. |
| Read-only license | New credentials, pairing, and directory writes are blocked; an existing API client or extension device can still be revoked for security. |

## Before You Act

- Confirm the session has the Owner role and the license includes the Integration capability.
- Establish whether the task belongs to External API, Active Directory, or Browser extension.
- For an API client, record the consumer, business owner, required endpoints, minimum vault set, and review date.
- Before revocation, confirm migration to the replacement client or agent token is complete; do not delay an emergency security revocation.
- For an AD agent change, prepare DC reachability, bind username, elevated PowerShell, script source, and rollback path.
- Before importing AD records, confirm the intended vault is unlocked and writable and your vault role is Editor or Manager.
- Before approving an extension device, check the row's device name, code hint, and vault-grant count; verify the user request and browser profile separately through an internal channel.

## Safe Evidence

- Safe to share: tab name, permission name, redacted endpoint path, general HTTP status code, agent health class, object count, and extension version/store channel.
- Keep private: full Client ID, client secret, agent ID/token, install or repair command, pairing code, device identifier, internal DC/domain, Base DN, bind username, UPN/DN, and vault name.
- If a client secret, agent token, or pairing code was exposed, stop public sharing, revoke or rotate the affected access, and update the consumer through a private channel.
- Do not rely on cropping alone in screenshots; fully mask codes, identifiers, domains, users, file paths, commands, and correlated timestamps.

## When to Stop and Escalate

Stop if expected clients disappear from the ledger, a second provider is about to be created for the same AD source, an agent token or client secret was pasted into the wrong system, the owner of a pairing request cannot be verified, the agent remains `STALE`, `OFFLINE`, or `REVOKED`, or vault import includes unexpected users. Open a private support case with the tab, general state, redacted record ID, time, last safe step, and error text—without secret material.

## Operator Notes

This is not a general integration hub that grants external write access. The public API uses only the defined read scopes. The AD agent cannot read existing passwords; it applies supported changes as authorized commands. The browser extension operates only within approved-device and wrapped-vault-key boundaries.

Never publish a screenshot or terminal transcript containing a `pmc_` Client ID, `pms_` client secret, `pmt_` agent token, pairing code, or internal server context.

## Related

- [Integration API clients](api-clients.md)
- [Public API reference](public-api-reference.md)
- [Active Directory agent](active-directory-agent.md)
- [Active Directory records screen](screen-active-directory-records.md)
- [Browser Extension screen](screen-browser-extension.md)
- [Browser extension](browser-extension.md)
