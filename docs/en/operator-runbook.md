# Operator Runbook

This runbook is the recurring operating rhythm for VaultPilot after go-live. It is written for teams that need a repeatable enterprise routine rather than ad hoc checks.

## Operating Principles

- Treat the VaultPilot server as a local security system, not as a cloud dependency.
- Verify health from the console first, then collect redacted server evidence only when needed.
- Keep private source code, signing keys, customer backups and databases out of this public repository.
- Use GitHub Releases for public downloads; use the signed manifest to trust update assets.
- Prefer a small number of well-owned routines over broad manual inspection.

## Daily Checks

| Check | Where | Healthy signal |
| --- | --- | --- |
| Service reachability | Browser and Windows service state | Console loads and `VaultPilot Server` is running. |
| Security posture | Overview | Known actions are either closed or owned. |
| Audit chain | Audit view | Latest events show expected chain state. |
| License | License page | Active state, capacity and expiry are expected. |
| Extension devices | Extension page | Paired devices are known; no unexpected pending device. |
| Update jobs | Update Center | No blocked or stale update job. |
| Scheduled work | Tasks > Scheduled | No unexplained `BLOCKED`, long-running `DUE`, or persistent `RETRYING` item. |
| Directory agent | Integrations > Active Directory | Health is `CONNECTED`; service and worker report the expected version and `ready`. |

## Weekly Checks

| Check | Expected action |
| --- | --- |
| Full backup | Keep the Backup Tool ZIP outside the server disk, offline and access-restricted; assume the ZIP container is not password protected. |
| Quick recovery | Confirm the `.vpr.json` file and 40-character key are separate and documented as not being a full backup. |
| Restore drill | Validate restore in staging or a disposable profile when policy requires it. |
| User review | Confirm disabled users, role assignments and 2FA state. |
| AD sync review | Confirm provider health, last sync, sign-in and vault scope, and reconciliation results for selected existing records. |
| Rotation review | Confirm next run and bounded logs for daily, weekly, monthly, and custom policies. |
| Extension review | Revoke stale devices and confirm fallback ZIP version. |
| Release review | Compare installed version to latest public release. |

## Monthly Checks

| Area | Evidence |
| --- | --- |
| Certificate lifecycle | Certificate expiry date, SAN coverage and browser validation. |
| Server System settings | Public host, port, HTTPS state, notification test, log retention and audit retention. |
| License lifecycle | Expiry date, user cap and read-only risk. |
| Update trust | Manifest signature, asset hash and signer thumbprint for current release. |
| Incident readiness | Support evidence pack still matches the current environment. |
| Recovery readiness | Backup location and restore procedure are still accessible. |

## Incident Routine

1. Identify the affected surface: login, vault records, sharing, extension, AD sync, update, backup, license, certificate or installer.
2. Open the matching [knowledge base article](../../kb/en/README.md).
3. Collect only the listed safe evidence.
4. Redact hosts, users, internal URLs and timestamps when needed.
5. Do not attach databases, backups, PFX/P12 files, private keys or screenshots containing real vault records.
6. Escalate through the private support channel with the [support evidence pack](support-evidence-pack.md).

<a id="directory-action-triage"></a>

## Active Directory Action Triage

1. Do not use sync success as proof that sensitive actions are ready. In **Status**, verify service and PowerShell worker separately, including version.
2. If the agent token must be rotated, plan for immediate invalidation of the old value. The command must contain only `-PromptAgentToken`; paste the token into the local secure PowerShell prompt.
3. Distinguish **Require password change** from **Assign random password now**. The first sets the next-sign-in flag; the second changes AD immediately and reports vault reconciliation separately.
4. Do not repeat an ambiguous result blindly. Reconcile task, agent, and vault-update evidence first.
5. Stop for built-in and bind identities. For other privileged targets, confirm the second manual prompt or durable automated-rotation approval.

<a id="recovery-choice"></a>

## Choose the Correct Recovery Path

- Use Quick Recovery `.vpr.json` for a bounded profile bootstrap; FILE data, history, license, server settings, and logs are excluded.
- Use the Backup Tool ZIP for full-server recovery. Verify source and integrity, and plan for every session to close after successful import.
- Never treat an `AUDIT`, `DISCOVERY`, or `EXECUTIONS` maintenance backup as a full backup. It restores only its category and can replace newer records in that category.

## Change Windows

Use a planned change window for:

- MSI upgrades.
- Public host or certificate changes.
- Server System host, notification, retention or maintenance changes.
- License replacement.
- AD provider or DC Agent changes.
- Extension Chrome Web Store rollout changes.
- Backup import or restore tests.

Before the change, export a backup and record current version, service state and support contact. After the change, confirm login, license, audit, extension devices, update status and backups.

Related:

- [Release asset verification](release-asset-verification.md)
- [Server System settings](server-system.md)
- [Update Center](update-center.md)
- [Backups and restore](backups-and-restore.md)
- [Troubleshooting](troubleshooting.md)
