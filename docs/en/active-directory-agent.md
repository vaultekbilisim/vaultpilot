# Active Directory and VaultPilot DC Agent Service

VaultPilot DC Agent Service runs near the domain controller and synchronizes directory metadata into VaultPilot. It does not send the AD bind password or AD user passwords to VaultPilot.

![VaultPilot Active Directory sync tree](../../assets/screenshots/active-directory-sync-tree-vaultpilot-2.png)

This sanitized UI capture uses synthetic data and shows provider health, base DN, OU/group/user selection, login scope, credential import scope, and agent actions. Visible users, domains, counts, timestamps and action states are documentation fixtures, not production guidance.

## Service Identity

| Item | Value |
| --- | --- |
| Service name | `VaultPilotDCAgent` |
| Display name | `VaultPilot DC Agent Service` |
| Config file | `%ProgramData%\VaultPilot\ad-agent\vaultpilot-dc-agent.json` |
| Service log | `%ProgramData%\VaultPilot\ad-agent\vaultpilot-dc-agent-service.log` |
| Agent log | `%ProgramData%\VaultPilot\ad-agent\vaultpilot-ad-agent.log` |

If `%ProgramData%` is not writable during fallback execution, the script writes the agent log under `%LOCALAPPDATA%\VaultPilot\ad-agent\vaultpilot-ad-agent.log`.

## Enrollment Flow

1. Open VaultPilot: Integrations -> Active Directory.
2. Create an agent record.
3. Download `vaultpilot-dc-agent.ps1` from the release assets or the UI.
4. Run the install command on the agent machine from an Administrator PowerShell.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:USERPROFILE\Downloads\vaultpilot-dc-agent.ps1" -InstallService -PassManUrl "<VAULTPILOT_URL>" -AgentId "<AGENT_ID>" -PromptAgentToken -TrustPassManCertificate
```

The generated 2.0 command may still use `-PassManUrl` and `-TrustPassManCertificate`. Treat those as compatibility flag names from the current agent script surface; do not rename them unless the release script adds VaultPilot aliases.

The script asks for:

- Domain controller IP or hostname.
- AD bind username.
- AD bind password through the local terminal prompt.

Passwords and the agent token are accepted only through the local secure PowerShell prompt. Never place the agent token on the command line, in terminal history, or in documentation. The AD bind password is not posted to VaultPilot, and secret values are not written to logs.

<a id="agent-version-and-readiness"></a>

## Version and Readiness Check

Prepared VaultPilot 2.2.0 ships DC Agent `1.2.21`; the current supported state expects both the service wrapper and PowerShell worker to report `1.2.21` and `ready`. A successful directory sync does not upgrade the agent. The identity-bound action protocol minimum remains `1.2.20`, so agents from `1.2.15` through `1.2.19` can still sync while unlock, require-password-change, random-password assignment, and account disable remain safely unavailable. Version 1.2.20 introduced target binding through `objectGUID` and `objectSid` plus AD-constructed `tokenGroups` and `primaryGroupID`; 1.2.21 preserves that boundary while hardening custom configuration-path recovery, idempotent mutation-result delivery, audited review for ambiguous delivery, and bounded diagnostics. Missing or drifting identity evidence keeps sensitive actions fail-closed.

The current candidate package uses `vaultpilot-dc-agent.ps1`. If an installed server still downloads an older script, verify its static download asset and cache first; do not infer the service version from sync success.

## Operations Commands

```powershell
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -Status
```

```powershell
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -TailLog
```

```powershell
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -RepairService -PromptAgentToken
```

For an installed service, use the Rotate token command from the existing provider card. The generated repair command keeps the same Windows service and can preserve or update the DC host and bind username. On VaultPilot 2.0.0 and newer, freshly generated or rotated agent tokens are authorized independently of server-secret/data-directory context drift on the server; the same fix first landed in the PassMan 1.8.19 compatibility line.

Rotating the token invalidates the previous token immediately. Copy the replacement separately; the repair command must contain only `-PromptAgentToken`, and the token must be pasted only into the local secure prompt.

```powershell
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -UninstallService
```

## What Appears In VaultPilot

After sync, the Active Directory tab shows:

- Provider status and last sync.
- Domain controller, domain, base DN and agent version.
- OU, group and user tree with search.
- Separate checkbox scopes for login access and credential import.
- Import action for selected credential candidates.

<a id="agent-data-and-action-boundary"></a>

## Data and Action Boundary

The agent collects only OU, group, and user metadata. It never reads or sends AD passwords, password hashes, Kerberos tickets, vault keys, or plaintext secrets.

A ready `1.2.20` or newer agent can advertise identity-bound capabilities for unlocking an account, requiring a password change at next sign-in, assigning a random password under the global password policy, and disabling an account. The prepared release ships `1.2.21` for its additional recovery and result-delivery hardening. Built-in identities and the agent bind identity are always protected. Automated rotation of a privileged but non-built-in target additionally requires an explicit durable policy approval; a manual action keeps its own second confirmation.

<a id="managed-credential-reconciliation"></a>

## Post-Sync Vault Reconciliation

A successful agent sync refreshes provider inventory. Encrypted records for users selected for vault import can then receive identity and AD-state updates while the matching writable vault is unlocked in an authorized browser. The server and agent cannot decrypt a vault record, so reconciliation completes only in that browser context.

Reconciliation never replaces an existing password with blank AD data. A user missing from the directory or removed from selection does not silently delete the encrypted record. Provider sync and vault update are separate outcomes; inspect failed entries in a partial batch before retrying.

## Hardening Notes

- Prefer `DOMAIN\username` or `username@domain.local` for bind users.
- Use a delegated account with the narrowest read scope that meets the sync need.
- Keep the agent on a controlled Windows host close to the DC.
- Rotate the agent token if the setup command was copied into an unsafe channel.
- Use the VaultPilot UI to revoke or recreate the agent record when rebuilding the agent machine.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Service does not install | Run Administrator PowerShell and inspect the service log. |
| Wrapper compile fails | Use the latest `vaultpilot-dc-agent.ps1`; repair stops the old service and rebuilds the wrapper safely. |
| VaultPilot URL unreachable | Test the URL from the agent machine and verify firewall/DNS. |
| Install or repair returns 401 Unauthorized | On VaultPilot 2.0.0 and newer, use the published release or an internally approved build. On older compatibility deployments, use PassMan 1.8.19 or newer. Then rotate the provider token and rerun the displayed command. If it still fails, check the server log for the redacted reason: `provider_not_found`, `token_revoked`, `token_missing` or `token_mismatch`. |
| Sync shows zero objects | Confirm bind account scope and base DN. |
| Agent connected but tree stale | Use Sync now, then check service and agent logs. |
