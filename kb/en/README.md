# PassMan English Knowledge Base

Use this navigator when PassMan is installed but an operator needs a safe diagnosis path. Each article lists the symptom, first checks, safe evidence and what not to send publicly.

## Incident Index

| Symptom | Article | First check |
| --- | --- | --- |
| MSI installation fails | [MSI installation fails](msi-installation-fails.md) | MSI name, admin context and Windows service state. |
| Update stays around 76 percent | [Update stuck near 76 percent](update-stuck-76.md) | Update job JSON, MSI signature line and Windows Installer event log. |
| DC Agent service cannot connect or returns 401 | [DC Agent service troubleshooting](dc-agent-service.md) | Service status, agent log, PassMan URL reachability and redacted server auth reason. |
| Extension pairing remains pending | [Extension pairing remains pending](extension-pairing.md) | Pairing code state, device row and browser profile mode. |
| Login creates 401 or 403 noise after unlock | [Login session 401/403 noise](session-401-after-login.md) | Login time, affected endpoint list and whether `/api/auth/me` returns 200. |
| HTTPS certificate warning | [HTTPS certificate warning](certificate-warning.md) | Hostname, SAN and uploaded certificate package. |
| Audit chain is partial | [Audit chain is partial or inconsistent](audit-chain-partial.md) | Audit filters, chain status and recent restore/update events. |
| License is read-only | [License read-only state](license-read-only.md) | License state, plan limits, active users and expiry. |
| External share fails | [External share package fails to open](external-share-fails.md) | Package metadata, expiry, max opens and decrypter error state. |

## Safe Evidence

Send only redacted evidence:

- Component versions and Windows version.
- Service status and redacted timestamps.
- Error state, not secret values.
- Public host shape with the real host replaced by `<SERVER_HOST>`.
- Agent id/token placeholders, never real values.

## Escalation Path

If the article does not resolve the issue, collect the safe evidence, review [Support](../../SUPPORT.md), then open a private support channel. Do not attach databases, backups, certificates, keys, token values, screenshots with real vault data or raw logs containing secrets.

Related: [English docs](../../docs/en/README.md), [Repository home](../../README.md), [Security policy](../../SECURITY.md).
