# License Screen

The topbar `?` opens this guide for the License screen. It answers more than “is a license installed?” by bringing together the verified plan, active-user capacity, remaining term, write availability, and included capabilities.

The **Owner** is the operator of this screen. Admin, Auditor, and User roles may experience locked modules or read-only behavior, but they cannot open the License workspace or manage the license record. Hand activation and clearing to an Owner; do not bypass the role boundary with another identity or a direct API request.

## Work Here

- Read the status badge together with **Active users**, **Plan**, **Days remaining**, the capacity bar, and **Plan capabilities**.
- Distinguish the 30-day, 3-user trial from a signed license with customer and user-limit data.
- A navigation item can remain visible while its module is unavailable under the current plan.
- Browser Extension has no separate plan card; it is shown as part of the **Integrations** capability.
- Clearing removes all stored license records; it does not delete vault data, users, sessions, or audit evidence.

## How to Read the Screen

The badge identifies license mode, while the capacity bar compares active users with the licensed limit. When **Write state** is read-only, VaultPilot blocks write and administrative operations such as vault-record changes, new users and vaults, sharing, extension pairing, Discovery management and import, directory-agent changes, and update installation. Existing encrypted-data access and recovery paths remain available; use the read-only KB for the exact permitted operations. The enabled and limited cards under **Plan capabilities** explain why a module is available or locked.

The **License lifecycle** band communicates renewal urgency through 60-, 30-, and 7-day windows. Do not rely on badge color alone; customer, plan, remaining term, capacity, and capability list should tell a consistent story.

## Recommended Workflows

### Explain the current state

1. Read mode, write state, and remaining term.
2. Compare active users with the licensed limit.
3. Find the intended module in **Plan capabilities**.
4. Confirm that the operator's role permits the requested action.

The expected outcome is a clear distinction between term, capacity, plan scope, and role restrictions. If status does not load, refresh and confirm server health before entering a code.

### Activate a signed license

1. Sign in as the Owner.
2. Verify privately that the code belongs to the intended customer and purchased plan.
3. Paste it into **License code** and choose **Activate license**.
4. Re-check customer, plan, limit, remaining days, write state, and capabilities.

A successful activation displays signed-license details and enables only purchased capabilities. If the screen reports **License code could not be verified**, stop repeated attempts, clear the field, retain a redacted error message, and escalate privately. If activation succeeds but customer, plan, or capacity differs from the expected values, stop before making another change.

### Plan renewal and capacity

Assign a renewal owner and target date when the lifecycle enters the 60-, 30-, or 7-day window. Near 90 percent capacity, reconcile active users with the purchased limit before creating another account. Do not clear the current license merely because its replacement is late; clearing is not rollback and can move the server into trial or read-only behavior.

### Renew or replace the active license

Do not clear the current license before applying a ready replacement. As the Owner, submit the new code directly through **Activate license**. The most recently activated license record becomes the current record. Confirm customer, plan, user limit, remaining term, write state, and capabilities. Stop before trying a second code if the result differs from the approved purchase.

### Clear the active license

**Clear active license** is not a renewal or rollback control. Use it only when all stored license records must be explicitly removed and you accept recalculation into trial or read-only behavior based on the original installation date. Read the confirmation dialog, then verify that vault data, users, sessions, and audit evidence remain present while the license mode changes as expected.

## Screen States

| State | Operator response |
| --- | --- |
| Licensed | Confirm feature gates match the purchased plan. |
| Trial | Track the 30-day term, 3-user limit, and locked module categories. |
| Read-only | Preserve recovery access and follow the read-only KB before changing anything. |
| Capacity available | Monitor usage; no action is required. |
| Capacity close to full | Reconcile active users and the purchased limit before creating another user. |
| Lifecycle notice | Assign the renewal approver and target date for the 60-, 30-, or 7-day threshold. |
| Verification failed | Do not retry repeatedly; preserve a redacted error message and request private support. |
| Loading | Wait briefly, then refresh and confirm server access before entering a code. |

## Before You Act

- Confirm status, plan, expiry, capacity and enabled modules before diagnosing missing features.
- Preserve owner and backup-export access before attempting license replacement.
- Keep license codes, signed payloads and customer entitlement details out of public support.
- Identify the organization's change approver and affected stakeholders, and confirm that the replacement is ready.
- After a change, verify write state and plan capabilities rather than relying on badge color alone.

## Safe Evidence

- Safe to share: license state, plan family, expiry window, enabled feature category and redacted error code.
- Keep private: license code, signed payload, issuer material, customer entitlement details and screenshots with customer names.
- Use private support for invalid signature, capacity dispute or recovery-access issues.
- Fully mask customer name and email fields in screenshots; cropping the edge is not sufficient.

## When to Stop and Escalate

Stop changing the license when signature verification fails, the license identifies another customer, capacity differs from the purchased value, or recovery access is uncertain in read-only mode. Open a private case with visible state, redacted error code, plan family, and term window—never the license code or signed payload.

## Operator Notes

Never publish license codes, private license material, signed payloads or screenshots that reveal customer entitlement data.

## Related

- [License lifecycle](license-lifecycle.md)
- [License read-only KB](../../kb/en/license-read-only.md)
- [First run, owner and license](first-run-owner-license.md)
