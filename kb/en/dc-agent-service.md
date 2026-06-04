# DC Agent service troubleshooting

Use this when PassMan DC Agent Service cannot install, connect, sync or recover.

## Service identity

```text
Service name: PassManDCAgent
Display name: PassMan DC Agent Service
```

## Commands

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -Status
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -TailLog
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -RepairService
```

## Checks

- The PassMan URL is reachable from the domain-side machine.
- Bind username uses `DOMAIN\username` or `username@domain.local`.
- Local logs redact tokens, passwords and secret-like values.
- Repair mode rebuilds the service wrapper without printing credentials.

## 401 Unauthorized during install or repair

If the endpoint is reachable but the script prints `Directory agent authorization failed`, treat it as a PassMan agent authorization issue, not an AD bind issue. Use PassMan 1.8.19 or newer, rotate the token on the existing provider card, then rerun the displayed repair command.

If the failure remains, inspect the PassMan server log for the redacted reason:

- `provider_not_found`: the agent id does not match an existing provider.
- `token_revoked`: the provider token was revoked.
- `token_missing`: the provider has no active token hash.
- `token_mismatch`: the command uses an old or wrong token.

Do not paste the real `pma_` agent id or `pmt_` token into public support channels. Use placeholders and rotate the token if it was exposed.
