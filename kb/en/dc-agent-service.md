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
