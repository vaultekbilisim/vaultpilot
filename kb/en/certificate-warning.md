# HTTPS certificate warning

Use this when users see a browser warning after HTTPS is enabled.

## Identify the Warning Source First

1. Confirm `publicHost` in Server settings is the DNS name or IP users actually open. VaultPilot automatically validates the package for that value under SAN/CN identity rules; a different user alias is not covered implicitly.
2. Check the certificate validity window and server clock.
3. Confirm the chain reaches a root CA trusted by client devices. VaultPilot package validation does not make the organization's CA trust decision.
4. VaultPilot rejects a CA-marked certificate as the leaf. When an EKU extension exists, it requires `serverAuth` for TLS server use.
5. Confirm public host, port, DNS, firewall, and reverse-proxy routing all lead to the same endpoint.

**Validate bundle** in Server settings checks PFX/P12 parsing, passphrase use, leaf and private-key presence, key matching, validity dates, local TLS loading, the CA-leaf restriction, `serverAuth` when EKU is present, and DNS/IP identity matching for the current `publicHost`. The remaining boundary is client trust: VaultPilot cannot prove that a user's device trusts the issuing/root CA chain.

## Upload Errors

Certificate upload is Owner-only. Use exactly one `.pfx` or `.p12` package, larger than 0 bytes and no larger than 2 MB. Upload attempts are rate-limited to 6 attempts per 10 minutes. Never attach the package, password or private key material to a public ticket.

| Code | Meaning | Next check |
| --- | --- | --- |
| `UNSUPPORTED_CERTIFICATE_FILE` | The uploaded file is not `.pfx` or `.p12`. | Export the certificate and private key as a PFX/P12 package. |
| `CERTIFICATE_FILE_SIZE` | The package is empty or larger than 2 MB. | Confirm the exported package size and retry. |
| `CONTENT_LENGTH_REQUIRED` | The upload request did not include `Content-Length`. | Retry through the UI or use a client that sends the header. |
| `PAYLOAD_TOO_LARGE` | The multipart upload is over the server limit. | Upload one certificate package and keep it at or below 2 MB. |
| `CERTIFICATE_PFX_PASSPHRASE_REQUIRED` | The package is protected but no source passphrase was supplied. | Verify the PFX/P12 source passphrase privately and enter it in the matching field. |
| `CERTIFICATE_PFX_PASSPHRASE_INVALID` | The source passphrase did not open the package. | Confirm the passphrase and package are paired; never put the passphrase in a ticket. |
| `CERTIFICATE_PRIVATE_KEY_REQUIRED` | The package has no private key. | Export a new PFX/P12 containing the leaf and its matching private key. |
| `CERTIFICATE_PRIVATE_KEY_MISMATCH` | The private key does not match the leaf. | Rebuild the package from the correct certificate-key pair. |
| `CERTIFICATE_LEAF_REQUIRED` | No usable leaf server certificate was found. | Upload an identity package rather than a chain-only bundle. |
| `CERTIFICATE_NOT_YET_VALID` / `CERTIFICATE_EXPIRED` | The certificate is outside its validity window. | Check server time and the certificate's `notBefore` / `notAfter` values. |
| `CERTIFICATE_HOST_INVALID` | The configured public host is empty, too long, or not a valid DNS/IP value. | Correct `publicHost` in Server settings to a host name or IP only. |
| `CERTIFICATE_HOST_MISMATCH` | The leaf SAN/CN identity does not match the configured `publicHost`. | Use a PFX/P12 issued for the host users open, or correct the approved `publicHost`. |
| `CERTIFICATE_CA_LEAF_NOT_ALLOWED` | The package presents a CA certificate instead of a leaf server identity. | Do not use a CA certificate as the leaf; package the actual server certificate and its matching private key. |
| `CERTIFICATE_SERVER_AUTH_REQUIRED` | An EKU extension exists but does not contain `serverAuth`. | Obtain a certificate issued for TLS server use from the authorized CA. |
| `CERTIFICATE_PFX_INVALID` / `CERTIFICATE_TLS_CONTEXT_INVALID` | The package could not be parsed or produce a usable TLS identity. | Re-export from the approved source and recheck passphrase, key match, and format. |
| `CERTIFICATE_STAGE_REQUIRED` | Enterprise settings were saved without a validated stage. | Run **Validate bundle** before saving. |
| `CERTIFICATE_STAGE_NOT_FOUND` | The stage expired, was consumed, or is not bound to this Owner and organization. | Validate again in the same Owner session and save within 10 minutes. |
| Rate limit response | Too many upload attempts in the current 10-minute window. | Wait before retrying; repeated failures usually mean wrong file type, empty package, oversized package or wrong upload client. |

## Validation and Save Are Separate

Successful validation does not change live HTTPS settings. It creates a single-use candidate that passed the current `publicHost` identity check, lasts at most 10 minutes, and is bound to the validating Owner and organization. Validate again when the package or passphrase changes, the stage expires or was consumed, or the user or organization changes.

**Settings saved** means the staged package was revalidated against the `publicHost` being saved and the configuration was committed atomically. It does not prove clients are already receiving or trusting the new certificate. Wait for any reload/service state shown by the UI, then reopen the real `https://<host>:<port>` endpoint from a separate client. A failed save should leave the previous working certificate in place; if the endpoint changed unexpectedly, stop retrying and open a private support case.

## Recommended support data

- Redacted public host name.
- Port.
- Certificate subject/SAN summary.
- `notBefore` / `notAfter` window and broad issuer/CA class.
- Automatic host, CA-leaf, or EKU error code when present.
- Browser error code.
- VaultPilot error code and whether the stage was revalidated.

## Related

- [Public host and HTTPS](../../docs/en/public-host-https-certificate.md)
- [Server settings screen](../../docs/en/screen-server-settings.md)
- [Server System settings](../../docs/en/server-system.md)
- [Public screenshot redaction](public-screenshot-redaction.md)
