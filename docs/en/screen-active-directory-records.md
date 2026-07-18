# Active Directory Records Screen

The topbar `?` opens this guide from the Active Directory records screen. This screen reads encrypted `CREDENTIAL` records from the active vault, shows the directory snapshot stored with each record, and exposes eligible record, sign-in, and DC Agent actions. It is not a live LDAP browser, PAM checkout queue, or general directory-administration console.

## Access, Active Vault, and License Boundary

Normal navigation requires the **integration** license feature, an unlocked active vault, and its browser-held vault key. Owner, Admin, and User system roles can use vault-secret screens; Auditor cannot. Within the active vault, **Viewer** can read, reveal, copy, inspect, and launch a stored record. **Editor** or **Manager** plus a writable license is required for vault-record writes such as delete or supported edits.

Directory-provider data and DC Agent actions have a narrower boundary. Only Owner loads the current provider/action workspace and can change VaultPilot sign-in access or queue directory actions. A directory action additionally requires a writable license, a currently resolved user target, a **Connected** ready agent, and the matching capability. Built-in and bind identities remain blocked; other privileged targets use additional approval. The server and agent repeat the sensitive-target checks; a disabled client control is not the security boundary.

A read-only license removes licensed feature navigation and blocks vault and directory writes. A record can remain readable from already loaded state, but read-only mode is not permission to change AD, VaultPilot sign-in access, or encrypted record custody.

## Record Origin and Ownership

New authoritative directory records are selected and imported from **Integrations > Active Directory** into a writable vault. The Active Directory records screen deliberately has no **New record** button and does not create RDP or SSH credentials manually. The server requires a synced provider and user DN for a directory-origin `CREDENTIAL` and prevents a second record for the same provider/user source in the same vault.

An imported record contains an encrypted snapshot of the selected user and operating context. Depending on available inventory, that snapshot can include provider, domain, account, DN/OU, enabled and lock state, password-state signals, last logon, last seen, last sync, privilege signal, host, protocol, category, owner context, tags, and risk. It is not a live read every time the list opens.

The DC Agent does not read an existing AD password. A newly imported directory record therefore starts without a password. A stored host or default RDP protocol is launch context, not proof that the account was tested or that the host is an approved administrative endpoint.

The visible **Owner** value comes from encrypted record context: explicit owner, directory account, or username. It is not the system Owner role, the vault role, an AD object owner, or proof of operational custody. Vault access remains controlled separately by Viewer, Editor, and Manager grants.

## Search, Filters, and Layout

The search box matches record title, username, URL, host, domain, owner, category, source, risk, tags, provider name, directory account, parent DN, object type, and protocol. It does not query Active Directory and should not be treated as a complete DN search.

The quick-filter row is data-driven and shows at most ten controls:

- **All** resets credential protocol, source, risk, and smart filters.
- **RDP** and **SSH** appear when matching records exist.
- Source shortcuts can include **AD Sync**, **Manual**, **Imported**, and **Discovered**.
- Risk shortcuts can include **Critical**, **Warning**, **Expired**, and **Unknown** when matching counts and available space permit.

Quick-filter counts are calculated from all Active Directory records in the active vault, not from the intersection of other active filters. Selecting a protocol, source, or risk shortcut resets the other credential shortcuts and clears smart filters.

**Add smart filter** builds options from the loaded records. Available dimensions can include username or owner, product/service, category, tag, protocol, source, risk, and credential state:

| Credential state | Source rule |
| --- | --- |
| **Managed** | The encrypted payload has directory metadata or a source of AD Sync or Rotated. |
| **Not managed** | The payload does not meet the managed rule. |
| **Expired or inactive** | Risk is Expired, or record status is Disabled or Revoked. |
| **Missing information** | Stored host or username is missing. |

Multiple smart filters are combined with AND. Remove an individual filter chip or use **Clear** to remove the smart-filter set. These states describe stored payload metadata; they are not a fresh provider-health or password-validity test.

The density control switches between **Cards** and **Table** presentation. Table headers are **Record**, **Encrypted session value**, and **Actions**. Both layouts operate on the same filtered record set and use most recently updated vault order.

## Record Row and Detail Drawer

Each row can show:

- RDP or SSH identity, title, stored target, and account;
- source and risk chips;
- directory domain, contextual owner, and last-sync time when present;
- up to three AD-state chips, with `+N` for additional states;
- the encrypted record's last-updated time.

AD-state chips are produced in this order when data exists: **Enabled** or **Disabled**, **Locked**, **Must change**, **Expired**, **Privileged**, **Never expires**, **Stale login**, and **Last login**. **Locked**, password expired, or must-change signals are classified as critical during directory import. Privileged, stale, never-expiring-password, and disabled signals contribute warning state. The row still reflects the encrypted snapshot until a later supported update refreshes it.

**View record details** opens a non-modal drawer with source, risk, record status, account, target, category, contextual owner, tags, last update, AD provider, domain, OU/DN, last sync, last logon, last seen, and a compact AD-state list. The drawer never displays the password or other secret value. Use the separate reveal or copy action when authorized.

## Record Actions

The row can expose these primary actions:

- **Prepare RDP package** when a stored RDP host exists. The browser downloads an `.rdp` file; a stored password is copied to the short-lived clipboard. Local resource redirection is disabled in the generated file.
- **Open SSH URI** when a stored SSH host exists. A stored password is copied to the short-lived clipboard but is not embedded in the URI.
- **Copy username** when a username exists.

The actions menu can include:

- **View record details**;
- **Open history** and, for an Active Directory source, **Go to agent**;
- **Allow VaultPilot sign-in** or **Remove from VaultPilot sign-in**;
- eligible DC Agent actions described below;
- **Copy secret value**, **Reveal secret**, and the user-triggered breach check when a value exists;
- **Copy SSH command** for SSH records; the password is not embedded in the command;
- **Edit secret** and **Delete secret** when the active vault is writable.

Reveal requires confirmation, makes the value temporarily visible in the browser, and attempts a `VIEW` audit event. Copy and launch actions use short-lived clipboard handling where applicable and write `COPY` or `VIEW` audit evidence. A failed audit notice must be investigated; it does not make a value safe to expose elsewhere.

**Reveal secret** works only when the encrypted vault record actually contains a password. Because the agent cannot read the current AD password, this action cannot fetch one for an empty directory record. Use the authorized **Assign random password now** action or an approved rotation policy when a new value is required.

Generic edit is not an AD mutation. Directory-controlled credential records are protected by server source rules and can be rejected by the generic editor even when the menu is visible. **Delete secret** removes the encrypted record from the active vault after confirmation and writes `DELETE`; it does not delete, disable, unlock, or change the source AD account.

There is no duplicate-record action for `CREDENTIAL`. The general bulk menu can expose export, category/tag, archive, disable/revoke, security-check, audit-report, share, note, edit, and remove operations, but these are vault-record operations. They are not bulk LDAP, PAM, password-reset, unlock, or directory-disable actions, and directory-owned records remain subject to server source restrictions. Sensitive export writes the selected decrypted payloads to a file after confirmation and records `EXPORT` evidence.

## VaultPilot Sign-in Access

**Allow VaultPilot sign-in** is a VaultPilot account-lifecycle action, not an AD permission change. It requires Owner, a writable license, a usable username, and a password stored in the encrypted record. For a resolved directory record, provider and DN are also required. Activation creates or reactivates the corresponding VaultPilot sign-in identity and personal-vault key material; removal disables that VaultPilot sign-in identity and updates directory login selection when the current provider target is available.

The VaultPilot identity-lifecycle write and provider login-selection update are separate, non-transactional steps. The identity can be created, reactivated, or disabled before the provider-selection update fails. A failure notice therefore does not prove that every change was rolled back. Stop and reconcile the identity and sign-in state in **Users**, the provider login selection in **Integrations > Active Directory**, and the lifecycle events in **Audit Log** before retrying.

An AD Sync record normally has no password because the agent cannot read one. Sign-in enrollment therefore remains disabled until an approved password-changing workflow has produced and safely stored a value. Do not interpret enrollment as an AD group change, MFA enrollment, PAM approval, or a test that the directory password is current.

## DC Agent Actions and Capability Boundary

The four sensitive record actions appear only when the encrypted record can be resolved to a current USER object in an Owner-visible provider:

| UI action | AD effect after agent success | It does not do |
| --- | --- | --- |
| **Unlock account** | Clears the account lockout. | Enable a disabled account, change its password, or grant access. |
| **Require password change** | Requires a password change at the next logon. | Generate a password, unlock the account, or change VaultPilot sign-in by itself. |
| **Assign random password now** | The agent generates a value under the global password policy, resets the AD password immediately, and returns the value encrypted to the requesting Owner's VaultPilot public key. | Automatically require another change at next logon. Use the separate action if policy requires it. |
| **Disable account** | Disables the AD user. | Delete the AD object or remove the encrypted vault record. |

Every sensitive action requires enterprise confirmation and is queued rather than completed synchronously. The matching capability must be advertised by the connected agent: `UNLOCK_ACCOUNT`, `REQUIRE_PASSWORD_CHANGE`, `RESET_TEMP_PASSWORD`, or `DISABLE_ACCOUNT`. Track `PENDING`, agent-processing, success, failure, review-required, or cancelled outcomes in Integrations and Executions.

Built-in identities and the agent bind identity are hard stops; the server and agent reject them in every case. A manual action against a privileged but non-built-in target requires a second explicit confirmation. Automated rotation additionally requires a durable privileged-target approval on the policy, and disabling the policy clears that approval. Do not bypass these checks by editing requests, provider data, or the local action database.

After **Assign random password now** succeeds in AD, the encrypted action result and the vault-record update are separate outcomes. The browser attempts to decrypt the generated value for the requesting user and re-encrypt it into the referenced vault record when the vault key and write access are available. Confirm both the agent success and a separate record-update success notice, updated record, and audit evidence. If they disagree, treat the new AD password as changed but the vault record as unconfirmed and stop before retrying.

<a id="record-history-and-rotation"></a>

## Record History and Rotation

**Open history** shows each revision's time, actor, source, and encrypted revision state. An authorized user can restore an earlier revision as a new current revision without deleting the intervening evidence. For an Active Directory password, restore changes only the vault record; it does not automatically roll the AD password back. Follow with an explicit agent action or approved rotation to avoid directory/vault drift.

**Configure rotation** can schedule a calendar run daily, weekly, monthly, or at a custom interval. A custom interval supports 1–365 days, 1–52 weeks, or 1–12 months and requires a start date. Optional triggers can run 5–1440 minutes after secret reveal or when AD `passwordLastSet` reaches 1–365 days. When several triggers are enabled, the first one due wins; a daylight-saving transition does not create the same run twice, and missed runs are not replayed in bulk.

An ambiguous rotation result is not retried blindly. Inspect status and bounded logs under **Tasks > Scheduled**. **Go to agent** in the record or history panel opens the matching provider under **Integrations > Active Directory**.

This screen exposes no direct LDAP bind action, arbitrary PowerShell action, PAM approval, session recording, or privilege elevation. Provider enrollment, selection, sync, health, capabilities, and agent token work belong to **Integrations > Active Directory**.

## Audit and Evidence

Directory record import writes record-creation evidence. Reveal, copy, launch, export, edit, and delete use their corresponding vault audit actions. Directory action creation, cancellation, and result are recorded as `DIRECTORY_AGENT_ACTION` evidence with action, provider, status, and action identifiers; exact DN and generated password are not safe public evidence. VaultPilot sign-in activation/removal writes user lifecycle evidence; verify the provider-selection outcome separately.

Treat the record row, detail drawer, action notice, Integrations action history, Executions entry, and Audit Log as separate evidence layers. A queued notice is not proof of AD success. Agent success is not proof that the encrypted password was written back to the vault. A changed vault timestamp is not proof that the AD operation succeeded.

## Screen States

| State | Operator response |
| --- | --- |
| Loading | Four skeleton rows appear while encrypted records are fetched and decrypted. Wait before concluding that the vault is empty. |
| No records in the active vault | Import selected AD users through Integrations. Ignore the generic empty-state suggestion to use New record for directory credentials. |
| No filter matches | Remove search text, select **All**, clear smart filters, or use **Clear filters** in the empty state. |
| Record decrypt error | The global alert says one or more records could not be decrypted with the active vault key. Stop and verify the selected vault/key; do not overwrite the record. |
| List request unavailable | There is no dedicated list-error card; a failed request can resemble an empty result. Verify the global notification, session, vault, and server before importing or deleting anything. |
| Provider or USER target not resolved | The encrypted record remains visible, but current directory actions are absent. Check provider selection and sync in Integrations. |
| Agent stale, offline, awaiting, or revoked | Directory actions remain disabled. Restore the approved agent connection; do not treat the record snapshot as live. |
| Capability missing | The corresponding action is disabled even with a connected agent. Upgrade or repair the approved agent rather than bypassing capability checks. |
| Built-in or bind identity | Sensitive directory actions are disabled and server/agent checks reject them. Do not bypass the block. |
| Privileged non-built-in target | Confirm the second prompt for a manual action or the explicit durable approval for automated rotation. |
| Viewer or read-only license | Read operations can remain available, but vault writes, sign-in changes, and directory actions are blocked. |
| Action queued | Follow the action in Integrations or Executions; do not repeat it while the first action is active. |
| AD action succeeded, vault update unconfirmed | Preserve the encrypted action result and audit evidence. Do not issue a second password reset until custody is reconciled. |
| VaultPilot identity and provider selection disagree | Do not treat the failure notice as proof of full rollback. Reconcile sign-in state in Users, provider selection, and Audit Log before repeating the action. |

## Before You Act

- Confirm the intended active vault, system role, vault role, integration feature, and writable license.
- Compare record source, provider, domain, account, last sync, and last seen before treating metadata as current.
- Confirm the provider is connected, the exact capability is present, and the current object resolves as a USER.
- Stop on a built-in or bind identity; do not use another endpoint to evade the block. Confirm the required second approval for other privileged targets.
- Distinguish a vault-record operation from an AD action and from VaultPilot sign-in enrollment.
- For password change, prepare a custody path and verify AD outcome, encrypted result, vault update, and audit separately.
- Before changing VaultPilot sign-in access, define Users/sign-in state, provider login selection, and Audit Log as the reconciliation evidence required before any retry.

## Safe Evidence

- Safe to share: broad source class, RDP or SSH protocol, generalized risk/state, system and vault role class, directory action type, action status, approximate time window, and redacted error category.
- Keep private: title, username/account, owner context, host, domain, provider name, DN/OU/base DN, tags, exact sync/logon time, privileged-group names, record/action/provider identifiers, RDP package, SSH URI/command, and full row or drawer screenshots.
- Never share: stored or generated passwords, clipboard contents, encrypted action password result, encrypted record payload, vault key, master password, user private key, bind credential, agent token, raw directory inventory, sensitive export, or agent/server logs containing real targets.
- If a password, generated action result, bind credential, or agent token entered public evidence, treat it as exposed and rotate or revoke it through the owning procedure.

## When to Stop and Escalate

Stop when the active vault or source provider is uncertain, the target no longer resolves, privilege state is unexpected, agent capability or health conflicts with the UI, an action remains in review-required state, AD reports success but the vault password update is unconfirmed, the VaultPilot identity state disagrees with provider login selection, or audit evidence is missing. Do not retry sign-in enrollment until Users/sign-in state, provider selection, and Audit Log have been reconciled. Open a private case with broad record type, provider-health class, capability, action type/status, approximate time, and redacted error—without DN, account, password, token, or exported payload.

## Operator Notes

Active Directory records are encrypted vault records with directory-origin context. They are not live AD objects and do not create a generic credential-management or PAM layer. Keep provider operations in Integrations, execution tracking in Executions, and evidence review in Audit Log.

## Related

- [Domain dashboard screen](screen-domain-dashboard.md)
- [Integrations screen](screen-integrations.md)
- [Executions screen](screen-executions.md)
- [Audit Log screen](screen-audit-log.md)
- [Active Directory agent](active-directory-agent.md)
- [DC Agent troubleshooting](../../kb/en/dc-agent-service.md)
