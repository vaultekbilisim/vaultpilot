# Rotation Dashboard Screen

The topbar `?` opens this guide for the Rotation dashboard. This is a read-only prioritization surface built from credential inventory, audit records, and Active Directory agent actions. It does not schedule rotation, generate a replacement password, change an account, or rotate a secret automatically.

## Data Source, Access, and License Boundary

Rotation SLA uses decrypted `CREDENTIAL` records from the active vault. It does not include `PASSWORD` or `API_KEY` records or records from other vaults. Metrics are calculated in the browser from records the signed-in user can read.

Owner, Admin, and User can populate credential metrics when they can read the active vault. Those inventory metrics do not require the integration feature. Auditor can open the dashboard and read audit-backed information but cannot read vault secrets, so credential counts and SLA rows are unavailable to that role. **Executions** drilldowns require Owner, Admin, or Auditor. Opening the credential inventory from a drilldown additionally requires the integration feature in the current license.

Active Directory provider and agent-action data comes from Owner-only routes, but the Rotation view does not activate those provider or action queries. Directory-action numbers can appear only when an Owner session has already loaded them on another view that activates the queries; retained query data can be stale after returning to Rotation.

The dashboard has no separate license gate. A read-only license permits viewing and browser-local layout changes but blocks credential writes on destination screens. The table's **Owner** is item metadata, not necessarily the VaultPilot Owner system role.

## Work Here

- Compare credential inventory with directory password actions and matching audit records.
- Separate 61–90 day review candidates, records older than 90 days, and records without a readable age source.
- Open prepared credential-state or execution filters from supported flow cards.
- Review event evidence without exposing generated, current, or previous passwords.
- Compare the top six site groups without treating the displayed date range as an active filter.
- Refresh the available source queries or adjust widget layout from **Dashboard tools**; Refresh alone does not guarantee current directory-action data.

## How to Read the Widgets

### Password rotation flow

These cards are related signals, not stages in one funnel. Their numbers use different source sets and should not be expected to add up:

| Card | Current calculation | Click behavior |
| --- | --- | --- |
| Total | Up to six matching audit rows plus all loaded directory password actions. | Display only. |
| Managed | Credential records with directory metadata, AD-sync origin, or rotated origin. | Opens Credentials with **Managed**. |
| Not managed | Credential records not classified as managed. | Opens Credentials with **Not managed**. |
| Updated | Loaded `RESET_TEMP_PASSWORD` or `REQUIRE_PASSWORD_CHANGE` actions in `SUCCEEDED`. | Opens Executions with **Directory / Completed**. |
| Expired | Credentials with expired risk or revoked/disabled status. | Opens Credentials with **Expired or inactive**. |
| Waiting | All loaded directory actions in `PENDING` or `LEASED`, including non-password work. | Opens Executions with **Directory / Active**. |
| Error | Directory password actions in `FAILED` or `STALE_REVIEW_REQUIRED`. | Opens Executions with **Directory / Failed**. |

Matching audit actions are `PASSWORD_CHANGE`, `USER_PASSWORD_SET`, and `DIRECTORY_AGENT_ACTION`. Because **Total** combines audit rows with action rows, one operational change can have more than one piece of evidence; it is not a unique-credential count.

### Rotation SLA

Every readable `CREDENTIAL` record is assigned to one fixed password-age band:

| Visible band | Calculation |
| --- | --- |
| 0–30 days | 30 days or less. |
| 31–60 days | More than 30 and no more than 60 days. |
| 61–90 days | More than 60 and no more than 90 days; the dashboard's due band. |
| 90+ days | More than 90 days; the overdue band. |
| No date | No readable source timestamp. |

Age uses the first available value in this order: directory `passwordLastSetAt`, record `importedAt`, then record `updatedAt`. It is not based on a configured next-rotation date or organization-specific SLA. A future timestamp is clamped to zero days; an unreadable timestamp goes to **No date**.

The table shows at most five records, oldest calculated age first and then title. Missing-age rows sort after dated rows. **User** shows `-` when username is empty. **Owner** resolves from owner metadata, then directory account, then username; if all are empty, the cell is blank. Bars and rows are not clickable.

### Password rotations

- **Audit events** counts up to six supplied matching audit rows, not lifetime events.
- **AD actions** shows succeeded directory password actions over all loaded directory password actions; failed and stale-review actions need review.
- **Pending work** counts every loaded `PENDING` or `LEASED` directory action. For Owner, Admin, and Auditor it opens **Directory / Active** when non-zero or **Directory / All** when zero. It is disabled for User.

The timeline merges up to six audit rows with the first four loaded directory password actions, sorts by time, and shows at most seven entries. Rows are display-only and never show password values.

### Rotation by site

At most six site rows are shown, ordered by total descending and then site name. The widget combines:

- Credentials without directory metadata or AD-sync origin, counted as **Not managed** and grouped by domain, credential host, or **Local**.
- Directory password actions grouped by provider site, domain, provider name, or target and classified as **Updated**, **Waiting**, or **Error**.
- The same limited audit rows, grouped by audit target. `PASSWORD_CHANGE` and `USER_PASSWORD_SET` add to **Updated**; `DIRECTORY_AGENT_ACTION` can increase total without adding a colored segment.

The visible 45-day range is currently a header label only; it does not filter the site aggregation. Segment totals can therefore be smaller than the row total. This chart is not a complete 45-day compliance report, and site rows are not clickable.

## Filters, Drilldowns, and Layout

Rotation has no date, owner, age, site, or status filter. Supported cards leave the dashboard and prepare a filter on **Credentials** or **Executions**. SLA bars and rows, timeline rows, and site rows are display-only.

Credential drilldowns clear protocol, risk, source, search, and smart-filter state before applying **Managed**, **Not managed**, or **Expired or inactive**. Execution drilldowns prepare Directory with Completed, Active, or Failed. Normal role and license navigation guards still apply; clicking is not evidence that an action ran.

**Dashboard tools** opens this guide, refreshes data, or enters layout edit mode. Edit mode supports drag-and-drop or arrow-key reordering, hide/restore, save, cancel, and reset. Layout is stored in this browser and changes presentation only. If all four widgets are hidden, use **Restore category widgets**.

<a id="rotation-policy-monitoring"></a>

## Rotation Policy and Monitoring

**Configure rotation** on an Active Directory record supports daily, weekly, monthly, and custom intervals. A custom interval is 1–365 days, 1–52 weeks, or 1–12 months and requires a start date. Monthly selection supports day 1–31 or the last day; a day missing from a shorter month clamps to that month's final day. The policy stores an IANA timezone, does not duplicate a run across daylight-saving changes, and does not replay missed runs in bulk.

Optional triggers can run 5–1440 minutes after secret reveal or when AD `passwordLastSet` reaches an age of 1–365 days. With several triggers enabled, the first due wins. The agent encrypts the generated password to the user's public key; only an authorized browser with the vault unlocked can re-encrypt it into the vault record. An ambiguous result is not retried blindly.

This dashboard is not a bulk policy editor. Open the policy from its record and monitor current and future state under **Tasks > Scheduled**, including next run, last outcome, related execution, and bounded logs.

## Data Freshness and Limits

**Refresh** updates only the visible Rotation summary and drilldown queries. It does not reload the browser or bulk-refresh Integrations, Active Directory actions, Tasks, or other dashboards. For current directory evidence, open **Integrations > Active Directory** or **Tasks > Scheduled** and refresh that screen separately.

Every query still obeys role, license, active-vault, and route-access rules. There is no single snapshot time or last-updated field; values can change as queries finish.

The dashboard does not prove that a credential is still used, that a target accepted a new password, or that rollback works. `SUCCEEDED` is an agent-action state; an audit row proves only that an event was recorded. Neither is an end-to-end target login test.

## Recommended Workflows

### Review due, overdue, and missing-date credentials

1. Read **61–90 days**, **90+ days**, and **No date** separately.
2. Use the five-row oldest table only as a starting point.
3. On Credentials, verify owner, account, target, source, actual last-change evidence, dependencies, and rollback.
4. Use the organization's approved change process; open the policy from the record and monitor its run in Tasks.
5. After an authorized change elsewhere, refresh and confirm the source timestamp and evidence changed.

### Investigate failed or waiting directory work

1. Select **Error**, **Waiting**, or **Pending work**.
2. In Executions, verify category, state, provider, target, timestamps, and safe error class.
3. Compare execution and audit evidence without counting duplicate evidence as separate credentials.
4. Retry, cancel, or create work only from the authorized operational screen.

### Repair missing owner or date metadata

1. Treat **No date**, `-`, or a blank owner as incomplete evidence, not healthy state.
2. Open the credential and identify the absent age source or owner field.
3. When the vault is writable and access permits, correct approved metadata without putting secrets in notes.
4. Refresh and verify the expected band and responsible party.

## Screen States

| State | Operator response |
| --- | --- |
| Refreshing | Wait; source queries can finish independently. |
| No credential records | Verify active vault and vault-read access. The integration feature is not required for these metrics; Password and API-key records do not populate SLA. |
| 61–90 days | Treat as due for review, then verify the organization's actual policy. |
| 90+ days | Treat as overdue for review; do not rotate without owner, dependency, and rollback context. |
| No date | Verify `passwordLastSetAt`, import time, and update time. There is no next-rotation-date field. |
| Missing owner | Resolve owner, directory account, or username metadata before assigning work. |
| Failed / stale review | Open Failed executions and inspect safe error context. |
| Waiting | Open Active directory executions and separate password actions from other queued work. |
| No activity | No matching loaded evidence is available; this does not prove credentials are current. |
| No site data | Verify credential inventory. Owner-only directory-action data may be absent or stale because Rotation does not activate its queries. This is not a live scan. |
| Hidden widgets | Restore individual widgets in edit mode or restore the category. |
| Auditor | Audit-backed information can appear; credential inventory and SLA rows are unavailable. |
| Read-only license | Viewing and browser-local layout remain available; credential writes remain blocked. |

## Before You Act

- Confirm active vault and role. If directory-action evidence matters, have an Owner refresh it from a view that activates the directory queries before relying on the counts.
- Treat the widgets as different evidence sets, not one reconciled total or sequential flow.
- Verify the actual source timestamp before using a due or overdue band.
- Confirm owner, target, dependencies, maintenance window, rollback, and recovery route.
- Use Executions and Audit Log for action evidence; use the credential record for inventory metadata.
- Never infer that clicking a card rotates, retries, approves, or schedules anything.

## Safe Evidence

- Safe to share: aggregate age band, broad action state, redacted site class, general error class, and broad time window.
- Keep private: title, username, owner, directory account, domain, host, provider, site, audit target, action ID, exact timestamp, and customer dependencies.
- Never share: current, previous, temporary, or generated passwords; tokens; recovery codes; credential-bearing command output; or secret-bearing screenshots.
- Mask low-cardinality site labels and exact counts that could identify a customer or account. Cropping alone is insufficient.

## When to Stop and Escalate

Stop when ownership is unknown, age sources conflict, a future or malformed timestamp changes priority, action and audit evidence disagree, a generated password may be exposed, the target cannot be tested safely, or rollback is unknown. Open a private case with broad age band, redacted action state, general error class, broad time window, and last safe step—without secret material.

## Operator Notes

Rotation is a monitoring and drilldown dashboard. Its age bands are fixed browser-side calculations, not a configurable SLA engine or next-rotation scheduler. Its cards do not rotate passwords, create directory actions, verify downstream logins, or certify compliance.

## Related

- [Active Directory records screen](screen-active-directory-records.md)
- [Executions screen](screen-executions.md)
- [Audit Log screen](screen-audit-log.md)
- [Integrations screen](screen-integrations.md)
- [Operator runbook](operator-runbook.md)
