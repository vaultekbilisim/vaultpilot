# DC Agent service troubleshooting

Use this when VaultPilot DC Agent Service cannot install, connect, sync or recover.

## Service identity

```text
Service name: VaultPilotDCAgent
Display name: VaultPilot DC Agent Service
```

## Commands

```powershell
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -Status
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -TailLog
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -RepairService -PromptAgentToken
```

## Checks

- The VaultPilot URL is reachable from the domain-side machine.
- Bind username uses `DOMAIN\username` or `username@domain.local`.
- Local logs redact tokens, passwords and secret-like values.
- Repair mode rebuilds the service wrapper without printing credentials.
- Install and repair commands contain no token value and use only `-PromptAgentToken`.

<a id="sync-works-actions-disabled"></a>

## Sync Works but Actions Are Disabled

Successful sync proves only that OU, group, and user metadata can be read. It does not prove sensitive-action capability or upgrade the agent. **Unlock account**, **Require password change**, **Assign random password now**, and **Disable account** in prepared VaultPilot 2.2.0 require all of the following:

- provider health is `CONNECTED`;
- service and PowerShell worker are `ready`;
- both report the current packaged version `1.2.21`;
- the matching agent capability is present;
- Owner role, writable license, and a resolvable USER target;
- target is not a built-in identity or the bind identity.

An agent older than `1.2.20` can sync while safely keeping identity-bound actions unavailable. The current package is `1.2.21`; it retains the 1.2.20 identity boundary and adds safer configuration recovery, idempotent result delivery, audited review for ambiguous delivery, and bounded diagnostics. Verify the version in **Status**, then rotate the token on the existing provider and repair with the current script. Do not create a second provider. If the installed server still downloads an old script, verify its static download asset and cache.

**Require password change** does not generate a password; it sets the next-sign-in flag. **Assign random password now** changes AD immediately. **Reveal secret** works only when the vault already contains an encrypted value, because the agent cannot read the current AD password.

## 401 Unauthorized during install or repair

If the endpoint is reachable but the script prints `Directory agent authorization failed`, treat it as an agent authorization issue, not an AD bind issue. On VaultPilot 2.0.0 and newer, use the published release or an internally approved build. On older compatibility deployments, use PassMan 1.8.19 or newer. Then rotate the token on the existing provider card and rerun the displayed repair command.

If the failure remains, inspect the VaultPilot server log for the redacted reason:

- `provider_not_found`: the agent id does not match an existing provider.
- `token_revoked`: the provider token was revoked.
- `token_missing`: the provider has no active token hash.
- `token_mismatch`: the command uses an old or wrong token.

Do not paste the real `pma_` agent id or `pmt_` token into public support channels. Use placeholders and rotate the token if it was exposed.

Rotating the token invalidates the old value immediately. Do not add the replacement to the command; copy it separately and paste it only into the local secure PowerShell prompt.

## Related

- [Active Directory agent](../../docs/en/active-directory-agent.md)
- [Domain dashboard screen](../../docs/en/screen-domain-dashboard.md)
- [Active Directory records screen](../../docs/en/screen-active-directory-records.md)
- [Public issue redaction](public-issue-redaction.md)
