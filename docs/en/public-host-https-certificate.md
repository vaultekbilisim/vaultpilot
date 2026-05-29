# Public Host, HTTPS and Certificates

PassMan can start on HTTP for first-run setup, but production access should use a controlled host name and HTTPS certificate.

## What Operators Configure

| Field | Required | Purpose |
| --- | --- | --- |
| Public host | Yes | DNS name or server host users open in the browser. |
| Public port | Yes | Default is `1903`; use your approved inbound port. |
| HTTPS certificate package | Yes for HTTPS | PFX/P12 package containing the certificate and private key. |
| Certificate password | Required when the package is protected | Used by the server to load the package. |

PassMan does not need a separate "certificate source" selector. The operator chooses the certificate file directly.

## Supported Certificate Package

Use one certificate package:

```text
PFX / P12
```

The certificate must match the host users open in the browser. The subject or SAN should contain the configured host name.

## Production Checklist

1. Create or obtain the certificate package outside PassMan.
2. Confirm the host name resolves to the PassMan server.
3. Open Server System and set the public host and port.
4. Upload the PFX/P12 package.
5. Enter the package password if required.
6. Save the HTTPS configuration.
7. Restart or let PassMan reload the service when the UI requests it.
8. Open:

```text
https://<HOST>:<PORT>
```

## Security Notes

- Never upload PFX/P12 files, private keys or certificate passwords to this public repository.
- Store certificate packages on the server with restricted ACLs.
- Replace expired certificates before browser warnings appear.
- Use internal PKI for private networks or a trusted public certificate for internet-facing DNS names.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Browser hostname warning | Certificate SAN does not match `<HOST>`. |
| HTTPS does not start | PFX/P12 password is wrong or the package is not readable. |
| Works locally, not remotely | DNS, firewall or reverse proxy path is not aligned with the configured host/port. |
| Certificate accepted on server only | Client devices do not trust the issuing CA. |
