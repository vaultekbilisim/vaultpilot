# Executions Screen

The topbar `?` opens this guide for the Executions screen. Executions combines update jobs, AD agent actions, and selected persisted audit events in one time-ordered view. It is not a task launcher or a general-purpose retry console.

## Access, Role, and License Boundary

Owner, Admin, and Auditor system roles can open Executions. The User role cannot access this system view. The vault must be unlocked and the server session verified before the list can load.

Viewing is not gated by a separate license feature, and a read-only license does not by itself hide existing records. Only an **Owner** sees **Stop execution** on an eligible AD agent action. Stopping is a server write, so a read-only license rejects that request. **Open source** can lead to a destination such as Update Center or Integrations that applies its own role and license-feature gate.

## Work Here

- Narrow the loaded executions by category and state group.
- Read an execution's summary, state, progress, source, target, actor, and last update time.
- When present, inspect steps and the bounded log summary to locate the affected stage.
- Use **Refresh** to fetch a current snapshot; while the view is active, it also refreshes automatically about every 2.5 seconds.
- Use **Open source** to move to Update Center, Integrations, or Audit Log context.
- As an Owner, stop only a pending or agent-leased AD agent action after confirmation.

There is no general **Retry** action on this screen. Do not restart an update, Discovery run, maintenance operation, or failed AD action here. Preserve and inspect the evidence first, then start a new run only if the relevant source screen provides that action.

<a id="runs-and-scheduled-tabs"></a>

## Runs and Scheduled Tabs

The **Tasks** workspace has two separate views:

- **Runs** shows work that has started or reached a terminal state and refreshes about every 2.5 seconds while active.
- **Scheduled** shows future policies and retry-waiting work and refreshes about every 15 seconds while active.

Top-bar refresh reruns only the selected tab's query. With **Scheduled** active it does not refresh Runs, and with **Runs** active it does not refresh scheduled work or any other workspace. It does not reload the browser page, and filters remain intact.

<a id="scheduled-operations"></a>

## Scheduled Operations

Scheduled combines Active Directory rotation (`DIRECTORY_ROTATION`), directory sync (`DIRECTORY_SYNC`), certificate lifecycle (`CERTIFICATE_LIFECYCLE`), and the durable SMTP outbox (`SMTP_OUTBOX`). Each card identifies its source, trigger, cadence, next run, last run, last outcome, related execution, and bounded log summary when available.

Because of the zero-knowledge boundary, certificate lifecycle scanning runs only in an authorized, unlocked browser session. VaultPilot does not fabricate a last or next run as though an independent server-side certificate-payload runner existed. The card can show hourly cadence with `CLIENT_SESSION_REQUIRED`; completed 15-, 7-, 3-, and 1-day threshold and expired events come from redacted audit history.

| State | Meaning |
| --- | --- |
| **Ready** (`READY`) | The policy is enabled and waiting for its next time. |
| **Due** (`DUE`) | Work is waiting for a runner lease. |
| **Running** (`RUNNING`) | The related execution is active. |
| **Retrying** (`RETRYING`) | The source is applying a controlled wait after failure. |
| **Blocked** (`BLOCKED`) | Authority, agent health, vault state, or a durable error prevents progress. |
| **Paused** (`PAUSED`) | An operator or source policy has paused the schedule. |

Filters are **All**, **Active**, **Attention**, **Ready**, and **Paused**. Cadence can be daily, weekly, monthly, custom interval, hourly certificate scan, or a source retry interval. A trigger can be **Calendar**, **Secret reveal**, or **Password age**. **Open source** opens the matching rotation policy, Active Directory provider, Certificates workspace, or SMTP setting without starting a new run.

## Data Sources and Scope

The server combines up to 80 entries, most recently updated first:

| Source | On-screen source label | What it represents | **Open source** destination |
| --- | --- | --- | --- |
| Update job | `Update job` | Live state, steps, and messages for a server or browser-extension update | Update Center |
| Directory agent action | `AD agent action` | A pending, agent-leased, or terminal AD operation | Integrations |
| Audit event | `Audit event` | A persisted sharing, security, Discovery, vault, integration, or system action | Audit Log |

A live Discovery job is not added as a separate execution source. Selected events such as policy save, scan start, finding suppression, import prepare/complete, and remediation complete appear as **Recorded** audit entries. Use Discovery for live progress, cancellation, and completed-run management.

Tracked maintenance actions such as server-settings saves, restarts, and maintenance cleanup can also appear as persisted **System** audit entries. Execution backup, cleanup, and restore are not performed here; use **Server settings > Operations**. Execution cleanup can remove terminal update and directory-action records while retaining active work. Audit-derived entries are governed by the separate Audit maintenance scope, and cleanup writes its own maintenance audit event.

## Filters

Category and state filters narrow rows together, but button counts do not represent their intersection. Category counts are calculated from the full loaded snapshot independently of the selected state, and state counts are calculated independently of the selected category.

| Category | Content |
| --- | --- |
| **All** | Every loaded source. |
| **Update** | Live update jobs and update audit events. |
| **Directory** | Live AD agent actions and selected directory-action audit records. |
| **Sharing** | Share and share-revoke audit events. |
| **Security** | User/session/2FA and Discovery security events. |
| **Integration** | Directory, integration, and extension audit events. |
| **Vault** | Delete, export/import, and completed Discovery import events. |
| **System** | Maintenance, restart, license, and other system audit events. |

| State filter | Included row states |
| --- | --- |
| **All states** | Every state. |
| **Active** | **Pending**, **Running**, and **Cancel requested** while runner acknowledgement is pending. |
| **Problem** | **Failed**, **Blocked**, and **Review**. |
| **Completed** | **Succeeded**, **Recorded**, and **Cancelled**. |

A **Cancelled** entry appears under **Completed** only because it is no longer active; this does not make it successful. If the filtered view is empty, the screen says **No executions match this filter**. That does not prove there are no records under another filter or outside the 80-entry view limit.

## Card, Step, and Log Details

Each card shows operation, summary, state, and percentage progress. Its metadata row contains source, target, actor, and **Updated** time. A source without a target or actor displays `-`.

When available, the card shows at most five steps. Each step contains a label, detail or general-state fallback, and percentage. Step states can be `PENDING`, `RUNNING`, `DONE`, `BLOCKED`, or `FAILED`. Additional steps are not shown here.

When present, **Logs** displays at most six entries. Each contains level (**Info**, **Success**, **Warning**, or **Error**), message, timestamp, and optional technical detail. Logs open by default for **Running**, **Failed**, and **Blocked** entries; other states require manual expansion. This summary is not the complete server log or a delivery/execution receipt.

The card does not expose execution ID, start time, or completion time as separate fields. Do not claim that a job ID was captured from this screen when it was not visible; use an identifier only when it is genuinely available in trusted private source evidence.

## State Semantics

| Visible state | Source state and interpretation |
| --- | --- |
| **Pending** | A queued or ready update job, or a pending AD agent action. Do not treat it as already executing on a worker or agent. |
| **Running** | An update is running or the AD agent has leased the action. Progress percentage alone is not liveness proof; check **Updated** as well. |
| **Succeeded** | An update completed or an AD agent action returned success. Verify the intended result on the source screen. |
| **Failed** | An AD agent action ended in error. Preserve the message and redacted detail; there is no retry here. |
| **Blocked** | An update job cannot advance. Inspect its step and log detail, then open Update Center. |
| **Cancel requested** | `CANCEL_REQUESTED` is recorded but the runner has not reported a terminal state. Treat it as active and wait for acknowledgement. |
| **Cancelled** | An AD agent action was stopped by an Owner. Completed execution and audit evidence are not deleted. |
| **Review** | The directory action's `STALE_REVIEW_REQUIRED` state. Do not treat it as success or ordinary queue delay; review agent health and the target operation. |
| **Recorded** | A tracked audit event was persisted. This alone does not prove that an associated external action was delivered or completed successfully. |

## Refresh, Stop, and Retry

**Refresh** reruns only the list query; it does not start an operation. While fetching, the button is disabled and labelled **Refreshing**. In an authorized, unlocked session, the query also runs about every 2.5 seconds while Executions is active.

**Stop execution** appears only for an `AD agent action` in **Pending** or **Running**, and only to an Owner. Confirmation first records `CANCEL_REQUESTED`. The execution is not complete or cancelled until the runner acknowledges the request and reports a terminal state. A stale former runner cannot write a later result. Completed executions and audit evidence are not deleted; update jobs and audit-event rows cannot be stopped from Executions.

There is no retry action here. **Open source** does not rerun anything; it only navigates to the relevant workspace. In particular, a **Recorded** Discovery or maintenance event is not a control for cancelling or restarting a live job.

## Recommended Workflows

### Investigate a problem execution

1. Select **Problem**, then the relevant category.
2. Separate **Failed**, **Blocked**, and **Review** before deciding what evidence is relevant.
3. Inspect last update time, progress, steps, and the first six log entries.
4. Redact actor, target, directory DN, host, path, and error detail before sharing evidence.
5. Choose **Open source** and confirm the same work is not still active before starting any new source action.

### Stop an active AD agent action

1. Select **Directory** and **Active**.
2. Confirm target, actor, last update time, and agent health.
3. Verify that the entry is genuinely **Pending** or **Running** and that the target is correct.
4. As an Owner, choose **Stop execution** and read the confirmation.
5. After refresh, verify **Cancelled** and the associated audit evidence.

## Screen States

| State | Operator response |
| --- | --- |
| Loading | Five skeleton rows appear; do not treat the temporary empty view as final. |
| No executions match this filter | Broaden category or state, then check the 80-entry limit and source screen separately. |
| Refreshing | Do not start a second refresh; wait for the current query. |
| List unavailable | There may be no dedicated error card. Verify session/vault lock, role, and server connectivity, then refresh; do not use an empty view as proof that no records exist. |
| Pending | The work is queued; do not start a duplicate from its source. |
| Running | Wait while **Updated** advances; if it stops advancing, inspect the source and service/agent health. |
| Failed | Preserve redacted error evidence; this screen cannot retry it. |
| Blocked | Read the blocked step and log detail, then open Update Center. |
| Review | Do not count the directory action as success; inspect agent connectivity and target state. |
| Succeeded | Verify the intended result at the source; 100% alone does not prove the external effect. |
| Recorded | A persisted audit event exists; do not infer a live or successful associated job. |
| Cancelled | The action is not active; it remains under **Completed**, and audit evidence is retained. |
| Stop action absent | The row is not an active directory action or the role is not Owner. Under a read-only license the button can still appear, but the server rejects the request; do not bypass the control. |

## Before You Act

- Confirm role and writable-license state; do not confuse permission to view with permission to stop.
- Record the active category and state filters; do not interpret a filtered empty view as full history.
- Check whether **Updated** is changing and whether the source already has active work.
- Before stopping, confirm the target and actor; an agent-leased AD action may already have begun affecting the target.
- Preserve the distinction between **Recorded** and the real outcome of update, Discovery, or maintenance work.
- If maintenance cleanup or restore is in scope, preserve private evidence and complete the approved backup workflow first.

## Safe Evidence

- Safe to share: source and category class, visible state, approximate progress percentage, broad time window, redacted operation/step label, log level, and general error category.
- Keep private: actor/username, real target label and directory DN, host/domain, local path, file/package name and location, full log message/detail, full audit hash, backup filename/digest, and machine-specific trace.
- Do not assume a card title makes a screenshot safe. Review and mask summary, target, actor, step detail, and each log line independently.
- Prefer category, state, broad time window, and a redacted error code for support. Send raw logs or directory targets only through an approved private channel and at the narrowest necessary scope.

## When to Stop and Escalate

Stop starting new work if a Running entry no longer updates, the same execution keeps reappearing, the reason for **Review** is unclear, an update remains **Blocked**, a stopped AD action still affects its target, or Executions conflicts with the source screen. Open a private support case with redacted source, category, state, broad time window, last visible step, and general error code.

## Operator Notes

Executions combines different lifecycles; not every row is the same kind of job. A **Recorded** audit event, a **Succeeded** operation, and a **Cancelled** terminal state are not interchangeable. Step and log counts are bounded, so do not assume omitted detail does not exist or fill it in by guesswork.

## Related

- [Operator runbook](operator-runbook.md)
- [Update Center](update-center.md)
- [Discovery screen](screen-discovery.md)
- [Integrations screen](screen-integrations.md)
- [Audit Log screen](screen-audit-log.md)
- [Server settings screen](screen-server-settings.md)
