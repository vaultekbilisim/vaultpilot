# Operator Runbook

This runbook is the recurring operating rhythm for PassMan after go-live. It is written for teams that need a repeatable enterprise routine rather than ad hoc checks.

## Operating Principles

- Treat the PassMan server as a local security system, not as a cloud dependency.
- Verify health from the console first, then collect redacted server evidence only when needed.
- Keep private source code, signing keys, customer backups and databases out of this public repository.
- Use GitHub Releases for public downloads; use the signed manifest to trust update assets.
- Prefer a small number of well-owned routines over broad manual inspection.

## Daily Checks

| Check | Where | Healthy signal |
| --- | --- | --- |
| Service reachability | Browser and Windows service state | Console loads and `PassMan Server` is running. |
| Security posture | Overview | Known actions are either closed or owned. |
| Audit chain | Audit view | Latest events show expected chain state. |
| License | License page | Active state, capacity and expiry are expected. |
| Extension devices | Extension page | Paired devices are known; no unexpected pending device. |
| Update jobs | Update Center | No blocked or stale update job. |

## Weekly Checks

| Check | Expected action |
| --- | --- |
| Backup export | Export encrypted backup and store it in the approved operator location. |
| Restore drill | Validate restore in staging or a disposable profile when policy requires it. |
| User review | Confirm disabled users, role assignments and 2FA state. |
| AD sync review | Confirm provider health, last sync and selected login/credential scope. |
| Extension review | Revoke stale devices and confirm fallback ZIP version. |
| Release review | Compare installed version to latest public release. |

## Monthly Checks

| Area | Evidence |
| --- | --- |
| Certificate lifecycle | Certificate expiry date, SAN coverage and browser validation. |
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

## Change Windows

Use a planned change window for:

- MSI upgrades.
- Public host or certificate changes.
- License replacement.
- AD provider or DC Agent changes.
- Extension Chrome Web Store rollout changes.
- Backup import or restore tests.

Before the change, export a backup and record current version, service state and support contact. After the change, confirm login, license, audit, extension devices, update status and backups.

Related:

- [Release asset verification](release-asset-verification.md)
- [Update Center](update-center.md)
- [Backups and restore](backups-and-restore.md)
- [Troubleshooting](troubleshooting.md)
