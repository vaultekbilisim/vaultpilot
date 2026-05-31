# Login Creates 401 Or 403 Noise After Unlock

Use this article when operators see repeated protected API responses such as `/api/audit`, `/api/secrets/list`, `/api/update/jobs`, `/api/users/list` or `/api/extension/devices` returning `401` or `403` immediately after login.

## Expected Behavior In 1.6.0

PassMan 1.6.0 verifies `/api/auth/me` after login before treating the vault as unlocked and keeps the authenticated browser session valid across refreshes for the intended 15-minute window. Protected workspace queries should start only after the browser session cookie is visible to the server. If the session cannot be verified, the UI locks and clears cached protected queries instead of retrying them repeatedly.

## First Checks

| Check | Healthy result |
| --- | --- |
| Installed version | Console reports `1.6.0` or newer. |
| Login response | `/api/auth/login` returns `200`. |
| Session verification | `/api/auth/me` returns `200` after login. |
| Protected APIs | Audit, secrets, extension, update, users and integrations return `200` after `/api/auth/me`. |
| Browser mode | Cookies are not blocked for the PassMan host. |
| URL consistency | Login and workspace use the same host, scheme and port. |

## Common Causes

- Browser blocks or clears the session cookie.
- Operator logs in through one hostname but navigates through another hostname or IP.
- Development hot reload or service restart invalidates the in-memory dev session.
- A stale tab continues to poll protected routes after the user is locked.
- A reverse proxy changes cookie, host or scheme behavior.

## Safe Evidence To Collect

- PassMan version.
- Host shape with the real host replaced by `<SERVER_HOST>`.
- Whether `/api/auth/me` returns `200` after login.
- Redacted sequence of API status codes.
- Browser family and whether cookies are blocked.
- Whether the issue appears after refresh, service restart, update or host change.

Do not send master passwords, cookies, session token values, screenshots with real records or raw logs containing secret values.

## Resolution Path

1. Upgrade to `1.6.0` or newer.
2. Log out, close stale tabs and open PassMan from one canonical URL.
3. Confirm browser cookies are allowed for the PassMan host.
4. Log in again and check whether `/api/auth/me` is `200` before protected routes.
5. If a proxy is used, confirm it preserves host, scheme and cookie behavior.
6. If the issue continues, send the safe evidence pack through a private support channel.

Related:

- [Support evidence pack](../../docs/en/support-evidence-pack.md)
- [Troubleshooting](../../docs/en/troubleshooting.md)
- [Security and trust model](../../docs/en/security-and-trust-model.md)
