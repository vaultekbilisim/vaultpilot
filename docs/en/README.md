# PassMan English Documentation Home

Use this page as the English operator map for PassMan Enterprise Vault Console. It is written for administrators, security operators and support teams who need a direct path from install to secure operation.

Current supported public release: **PassMan Enterprise Vault Console 1.8.19**.

## Recommended Order

| Step | Guide | Outcome |
| --- | --- | --- |
| 1 | [Admin quickstart](admin-quickstart.md) | Follow the shortest safe path from MSI download to first healthy vault. |
| 2 | [Overview](overview.md) | Understand the self-hosted server model and component boundaries. |
| 3 | [Windows Server installation](install-windows-server.md) | Install the MSI, validate service state and confirm browser access. |
| 4 | [First run, owner and license](first-run-owner-license.md) | Create the owner profile, unlock the vault and apply license state. |
| 5 | [Public host and HTTPS](public-host-https-certificate.md) | Configure the host, required certificate package and browser trust path. |
| 6 | [Security and trust model](security-and-trust-model.md) | Confirm the zero-knowledge boundary, update trust chain and operator responsibilities. |
| 7 | [Audit and security posture](audit-and-security-posture.md) | Review score signals, audit-chain state and priority actions. |
| 8 | [Browser extension](browser-extension.md) | Pair approved browsers and understand autofill, badge and save/update prompts. |
| 9 | [Active Directory agent](active-directory-agent.md) | Install or repair PassMan DC Agent Service and validate sync tree health. |
| 10 | [Sharing and offline decrypter](sharing-and-offline-decrypter.md) | Package selected records and files with expiry, usage limits and recipient handling. |
| 11 | [Backups and restore](backups-and-restore.md) | Prepare encrypted backup, integrity and restore procedures. |
| 12 | [Update Center](update-center.md) and [release asset verification](release-asset-verification.md) | Verify signed manifest, release assets, checksum and MSI signer. |
| 13 | [Operator runbook](operator-runbook.md) | Run daily, weekly, monthly and incident routines after go-live. |

## Need An Answer Now

| Question | Start here |
| --- | --- |
| Is this a cloud service? | [FAQ](faq.md) |
| Which file installs the server? | [Windows Server installation](install-windows-server.md) |
| Why does the browser show a certificate warning? | [Public host and HTTPS](public-host-https-certificate.md) |
| Why is the security score low? | [Audit and security posture](audit-and-security-posture.md) |
| Why did update stop near 76 percent? | [Knowledge base: update stuck](../../kb/en/update-stuck-76.md) |
| Why is the DC Agent service not connecting? | [Knowledge base: DC Agent](../../kb/en/dc-agent-service.md) |
| Why do I see 401 or 403 responses after login? | [Knowledge base: login session noise](../../kb/en/session-401-after-login.md) |
| What can I safely send to support? | [Support evidence pack](support-evidence-pack.md), [Troubleshooting](troubleshooting.md) and [Support policy](../../SUPPORT.md) |

## Public Safety

Never paste real secrets, master passwords, AD bind passwords, agent tokens, license private material, databases, backups, PFX/P12 files or private keys into public tickets or docs.

Use placeholders such as `<PASSMAN_URL>`, `<SERVER_HOST>`, `<AGENT_ID>`, `<AGENT_TOKEN>`, `<LICENSE_CODE>` and `<REDACTED>`.

Related: [Repository home](../../README.md), [Knowledge base](../../kb/en/README.md), [Release notes](../../RELEASES.md), [Security policy](../../SECURITY.md).
