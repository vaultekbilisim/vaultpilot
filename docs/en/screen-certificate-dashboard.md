# Certificate Dashboard Screen

The topbar `?` opens this guide for the Certificate Dashboard. The dashboard summarizes certificate records in the active vault by validity, status, certificate authority, origin, and organization. It does not upload certificate material, replace the server HTTPS certificate, or start a network scan.

## Data Source and Access

The dashboard uses encrypted `CERTIFICATE` records from the active vault that the signed-in user is allowed to read. After the active vault key decrypts those records in the browser, the metrics and visuals are calculated from that visible set. Certificates in another vault, Server settings, or Discovery findings are not added automatically.

Owner, Admin, and User system roles can see this inventory when they have read access to the active vault. The Auditor role cannot read vault secrets and therefore cannot use the record data behind the Certificate Dashboard. The **Owner** field shown in certificate metadata is the responsible person recorded on that item; it is not necessarily the VaultPilot **Owner** system role.

## Work Here

- Separate expired, not-yet-valid, 30-day renewal-window, revoked or disabled, and missing-date records.
- Use the radar to compare certificate authority with remaining validity, then open metadata for the selected record.
- Move to the Certificates screen with a prepared validity, status, origin, certificate-authority, or organization filter.
- Decide whether a warning belongs to vault inventory, VaultPilot browser HTTPS access, or a Discovery scan.
- Refresh dashboard data or adjust the widget layout from the dashboard tools. Layout changes affect presentation only; they do not modify certificate records.

## How to Read the Widgets

### Certificate risk radar

Radar sectors represent certificate authorities derived from records in the active vault. Distance from the center represents up to 90 days of remaining validity. For a multi-certificate record, remaining validity is calculated from the **earliest `notAfter`** in the managed chain. Color bands distinguish **0–15 days**, **16–30 days**, **31–60 days**, **60+ days**, and **No date**. The Critical count also includes expired and revoked records, in addition to records with 15 days or less remaining.

Selecting a radar point opens a detail dialog. It shows record count, nearest expiry, status, authority and issuer, subject, domain, recorded owner, environment, origin, format, category, import date, and shortened fingerprint and serial fragments. The dialog does not edit the record or reveal its stored certificate value.

The **Live scan** label describes the animated visualization of the current inventory. It does not contact network targets, perform a TLS handshake, or run Discovery.

### Certificate expiry timeline

The timeline counts records that are neither expired, not-yet-valid, nor revoked and that have a readable expiry date. A multi-certificate record uses the earliest `notAfter`. Each visible bar label covers the following actual range:

| Visible label | Actual remaining validity |
| --- | --- |
| More than 180 days | 181 days or more |
| 180 days | 91–180 days |
| 90 days | 61–90 days |
| 60 days | 31–60 days |
| 30 days | 16–30 days |
| 15 days | 8–15 days |
| 7 days | 2–7 days |
| 1 day | 1 day |
| Today | 0 days |

The first header number is the number represented by these ranges; the second is the total certificate-record count in the active vault. Expired and missing-date records are tracked in the status widget instead.

### Certificate status

The status widget assigns every certificate record to one of six classes. Across the managed chain, VaultPilot uses the **earliest `notAfter`** for expiry and the **latest `notBefore`** for start; this prevents one expired or not-yet-started member from being hidden by the leaf certificate's dates.

| Status | Calculation |
| --- | --- |
| Valid | More than 30 days remain. |
| Renewal window | The record expires today or within 30 days. |
| Not yet valid | The latest `notBefore` in the chain is in the future and no chain member is expired. |
| Expired | The expiry date has passed. |
| Revoked / disabled | The record is marked revoked or disabled; this is evaluated before its expiry date. |
| No date | No readable expiry date is available. |

**Revoked / disabled** takes precedence in status calculation. A revoked record therefore remains in that class even when its expiry date has passed or is missing. For other records, any expired managed-chain member makes the record **Expired**; when none is expired but at least one member starts in the future, the record is **Not yet valid**.

The **Attention** count is the total of the five non-valid classes. The total-certificate button opens all certificate records; a named status row opens the Certificates screen filtered to that exact status. The center donut is a static distribution visual and is not clickable. Use a named status row for an exact drilldown.

### Certificate distribution

The distribution area groups records in three ways:

- **Origin:** Manual, Imported, AD sync, and Other. **Other** contains every source value outside the three named origins.
- **CA:** Certificate authority classified from record metadata.
- **Organization:** The first four organization groups derived from the records.

Every origin, CA, and organization row opens the Certificates screen with the matching filter. **Other** carries all of its represented source values as one multi-source filter and does not fall through to an organization filter. The donuts above the lists are static distribution visuals; use the named rows beneath them for drilldown.

## Filters and Drilldowns

- A non-empty expiry bar opens its validity range as a smart filter on the **Certificates** screen.
- Status rows open the **Valid**, **Renewal window**, **Not yet valid**, **Expired**, **Revoked / disabled**, or **No date** filter.
- Manual, Imported, and AD sync origin rows use one source value; **Other** uses the represented source set. CA and organization rows carry their exact values.
- A radar point opens a metadata dialog without leaving the dashboard; it does not open the record editor.
- If a drilldown returns fewer records than expected, check the active vault. Both the dashboard and the result list use only readable records from the selected vault.

## Inventory, HTTPS, and Discovery Are Different

| Surface | Data source | What it tells you | Where to act |
| --- | --- | --- | --- |
| Certificate Dashboard | Certificate records in the active vault | Stored validity, status, authority, origin, and organization metadata | Certificates screen |
| Browser HTTPS access | VaultPilot's active server HTTPS configuration | The certificate presented to the browser, its trust chain, and public server name | Server settings and the Public host/HTTPS guide |
| Discovery | Authorized, bounded active TLS connections to approved private targets | Expiry, not-yet-valid, self-signed, hostname-mismatch, and duplicate-fingerprint findings | Discovery screen |

The Certificate Dashboard does not declare a **hostname mismatch** merely because a stored subject and domain look different. That finding must come from Discovery comparing an expected target with presented SAN/CN data, or from the actual HTTPS endpoint used by the browser.

## Recommended Workflows

### Review an expired, not-yet-valid, or renewal-window record

1. Select **Expired**, **Not yet valid**, or **Renewal window** in the Certificate status widget.
2. In the filtered Certificates list, verify expiry, environment, responsible person, and usage context.
3. Record the organizational change approver and target date in the internal change record.
4. Do not upload replacement material from this dashboard. Use the Certificates screen for inventory records and Server settings for the server HTTPS package.
5. After the approved change, refresh the dashboard and confirm the expected status and validity range.

Expired records do not appear in the expiry timeline; they remain under the **Expired** status row. An empty timeline bar does not prove that no expired records exist.

### Handle a hostname mismatch

1. Determine whether the warning came from the VaultPilot URL in the browser or from a Discovery finding.
2. For a browser warning, compare the URL in use with the public server name and active certificate source in Server settings.
3. For a Discovery finding, verify the expected target, port, and redacted SAN/CN summary in a private case.
4. If you only see different names in an inventory record, do not report a confirmed hostname mismatch; request evidence from the real endpoint.
5. Move to private support if resolution requires a private key, certificate password, or PFX/P12 package.

### Repair a missing expiry date

1. Select the **No date** status row.
2. Confirm whether the item is intentionally metadata-only or an imported certificate with incomplete metadata.
3. When authorized and the vault is writable, correct it on the Certificates screen or import it again from the approved source.
4. Refresh the dashboard and confirm that the record moves to the expected validity range and status.

## Screen States

| State | Operator response |
| --- | --- |
| Refreshing | Allow the active refresh to finish before starting another one. |
| No certificate records | Verify the active vault and vault-read access; certificates on other surfaces are not expected here. |
| Valid records | Monitor the 60+ day band quietly and keep responsibility and environment metadata current. |
| Renewal window | Assign a change approver and target date for records at 30 days or less. |
| Not yet valid | Verify the latest chain start time and server clock; do not use the material before validity begins. |
| Expired | Verify usage, then decide between renewal and controlled retirement. |
| Revoked / disabled | Confirm the record was intentionally disabled and is no longer presented as active-use evidence. |
| No date | Do not treat the record as healthy until its metadata is verified. |
| Read-only license | Charts, metadata dialogs, and filtered lists remain available; create, edit, revoke, and delete actions are blocked. |

## Before You Act

- Confirm that the intended vault is selected and unlocked.
- Establish whether the task belongs to inventory, browser HTTPS, or Discovery.
- Review expiry, authority, subject, environment, recorded owner, and usage context together.
- Editing a certificate record requires Editor or Manager access to the vault and a writable license.
- Before a server HTTPS change, confirm the approved maintenance window, rollback path, and availability of the replacement package.

## Safe Evidence

- Safe to share: record count, status class, broad validity window, and an approved high-level CA class.
- Keep private: domain, subject/SAN summary, organization, environment, recorded owner, file name, issuer, and shortened fingerprint or serial fragments. Use them only in private support or internal records, and mask internal hostnames and customer identity.
- Never share: private keys, certificate passwords, the stored secret value, `.pfx`, `.p12`, `.pkcs12`, password-protected packages, or PEM/KEY content that includes a private key.
- Even a certificate and chain without a private key can reveal internal names and organization topology. Obtain organizational approval and fully redact them before using a public channel.
- In screenshots, fully mask customer names, internal domains, email addresses, file paths, fingerprints, and serial numbers; cropping alone is not sufficient.

## When to Stop and Escalate

Stop when you cannot identify the warning's source surface, the replacement presents the wrong hostname, the trust chain is unknown, private-key exposure is suspected, or the required package and password cannot be verified. Open a private case with the surface, general error class, redacted target, validity window, and last safe step—without attaching private material.

## Operator Notes

The Certificate Dashboard is an inventory and prioritization surface. Its colors rank risk from stored record metadata; they do not prove live endpoint trust, Windows certificate-store state, or browser chain validation.

## Related

- [Certificates screen](screen-certificates.md)
- [Discovery screen](screen-discovery.md)
- [Server settings](screen-server-settings.md)
- [Public host and HTTPS](public-host-https-certificate.md)
- [HTTPS certificate warning](../../kb/en/certificate-warning.md)
