# HTTPS certificate warning

Use this when users see a browser warning after HTTPS is enabled.

## Checks

1. Confirm users open the same host name that exists in the certificate SAN.
2. Confirm the PFX/P12 package is readable by the PassMan service.
3. Confirm the configured port is open.
4. Confirm the certificate has not expired.
5. Avoid publishing private certificate material in docs, logs or tickets.

## Recommended support data

- Public host name.
- Port.
- Certificate subject/SAN summary.
- Expiration date.
- Browser error code.
