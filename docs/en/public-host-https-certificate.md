# Public Host, HTTPS and Certificates

VaultPilot uses HTTPS on the configured public port for browser access. **Automatic** mode maintains a VaultPilot-managed self-signed certificate for first access and internal use. **Enterprise** mode validates an organization-provided PFX/P12 identity together with the configured `publicHost` and promotes it atomically to the live binding. VaultPilot automatically enforces DNS/IP identity matching; operators separately confirm that client devices trust the certificate chain. Plain HTTP is only an internal upstream or local development concern, not the public operator entry path.

## What Operators Configure

| Field | Required | Purpose |
| --- | --- | --- |
| Public host | Yes | DNS name or server host users open in the browser. |
| Public port | Yes | Default public HTTPS port is `1903`; use your approved inbound port. |
| Certificate mode | Yes | **Automatic** uses the managed self-signed certificate; **Enterprise** enables the organization PFX/P12 flow. |
| HTTPS certificate package | Required for Enterprise | PFX/P12 package containing the certificate and matching private key. |
| Source passphrase | Required when the package is protected | Used only to validate the package and create its protected staging entry. |

Changing the mode does not by itself replace the live certificate. Validate the Enterprise package, review the displayed validity window, and only then save Server settings.

## Supported Certificate Package

Use one certificate package:

```text
PFX / P12
```

The certificate must match the configured `publicHost` that users open. VaultPilot normalizes the DNS name or IP address and automatically compares it under the certificate's SAN/CN identity rules. A CA-marked certificate is rejected as a leaf server certificate; when an EKU extension exists, it must include `serverAuth`. These checks establish that the package can serve the configured identity, but they do not prove that client devices trust the issuing/root CA chain.

## Upload Boundary And Errors

Certificate upload is an **Owner-only** server setting. Upload exactly one `.pfx` or `.p12` package. The file must be larger than 0 bytes and no larger than 2 MB. Uploads are limited to 6 attempts per 10 minutes.

Browser uploads must include `Content-Length`; if a scripted client receives `CONTENT_LENGTH_REQUIRED`, retry through the UI or send the correct length header. If the upload exceeds the accepted envelope, VaultPilot returns `PAYLOAD_TOO_LARGE`.

| API code | Meaning | Operator action |
| --- | --- | --- |
| `UNSUPPORTED_CERTIFICATE_FILE` | The selected file is not a `.pfx` or `.p12` package. | Export a PFX/P12 package that contains the certificate and private key, then upload that package. |
| `CERTIFICATE_FILE_SIZE` | The selected package is empty or larger than 2 MB. | Re-export the certificate package and confirm its size before uploading. |
| `CONTENT_LENGTH_REQUIRED` | The upload request omitted `Content-Length`. | Use the VaultPilot UI or a client that sends the header. |
| `PAYLOAD_TOO_LARGE` | The multipart request exceeds the server upload limit. | Confirm the package is at most 2 MB and retry with exactly one certificate file. |
| `CERTIFICATE_HOST_INVALID` | Public host is blank, malformed, or uses an unsupported URL/host form. | Enter the DNS name or IP address users actually open; validation stops before a staging entry is created. |

Never post the certificate package, certificate password, private key material or private host details in public issues, docs or screenshots.

## Validation, Staging, and Atomic Save

1. Select **Enterprise**, enter a non-empty DNS/IP `publicHost`, choose the PFX/P12 package, and enter its source passphrase when required. No staging token is created or consumed until the host is valid.
2. Choose **Validate bundle** to run real PFX/P12 parsing, private-key matching, TLS loading, the CA-leaf restriction, `serverAuth` EKU enforcement when present, and DNS/IP identity matching for the current `publicHost`.
3. Compare the displayed Subject/SAN, issuer, and **not-before/not-after validity window** with the expected certificate. Even after automatic host validation succeeds, confirm issuing/root CA trust from a client device.
4. Successful validation does not make the uploaded file a persistent setting. VaultPilot creates a single-use staging entry for the candidate that passed the current `publicHost` check; it lasts at most 10 minutes and is bound to the validating Owner and organization.
5. Validate again if the stage expired, was already consumed, belongs to another user or organization, or the package/passphrase changed.
6. Save Server settings. VaultPilot revalidates the staged package against the `publicHost` being saved at its temporary target, then promotes the configuration and file as one operation. A host changed after validation cannot commit a mismatched package. If any step fails, the previous settings and working certificate remain in place; a partial promotion is not committed.

The source passphrase is not written to logs, audit details, or general settings responses. A stage cannot be consumed by another Owner, reused, or saved after expiry.

## Production Checklist

1. Confirm first access at `https://<SERVER_HOST>:1903` or your configured public HTTPS port.
2. Expect a browser warning while the managed self-signed certificate is still in use.
3. Create or obtain the trusted certificate package outside VaultPilot.
4. Confirm the host name resolves to the VaultPilot server.
5. Set the public host and port in Server settings, then select **Enterprise**.
6. Choose the PFX/P12 package and enter the source passphrase when required.
7. Run **Validate bundle** to complete private-key, TLS, CA-leaf, optional `serverAuth` EKU, and `publicHost` identity checks.
8. Review the displayed Subject/SAN and validity window, then confirm client CA trust from a separate device.
9. Save within the 10-minute staging window; validate again if it expired.
10. After save, reopen the live endpoint:

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
| Validated but cannot save | The 10-minute stage may have expired, been consumed, or belong to another user or organization; validate the package again. |
| Save reports an error | Confirm that the previous working certificate is still served, then review and revalidate the new package. |
| Warning appears on first access | Managed self-signed HTTPS is still active; install a trusted PFX/P12 package or trust the issuing CA according to internal policy. |
| Works locally, not remotely | DNS, firewall or reverse proxy path is not aligned with the configured host/port. |
| Certificate accepted on server only | Client devices do not trust the issuing CA. |
