# Security Policy

## Supported Release

Only the latest public PassMan release is supported for new installations and updates. The current supported public release is **PassMan Enterprise Vault Console 1.6.0**. Older public downloads are retired after their notes are consolidated into `RELEASES.md`.

## Reporting Security Issues

Report security issues privately to the PassMan maintainer or licensed support channel. Do not open public issues that include secrets, exploit payloads, customer data, logs with sensitive values, screenshots containing secret records, agent tokens, license private keys, certificates, or database files.

## Public Repository Boundaries

This repository may contain public documentation, public release notes, and GitHub Release assets. It must not contain:

- Private source code.
- Signing private keys or certificate packages.
- License issuer private keys.
- Update manifest private keys.
- Databases, backups, or logs.
- Real AD bind credentials, agent IDs, agent tokens, customer URLs, or license codes.
- Screenshots showing secret values.

## Verification Model

PassMan-managed updates verify a signed manifest, asset SHA-256 hashes, release metadata, and MSI signer thumbprints. A local release signer can be accepted by PassMan when the signed manifest pins that signer. CA-backed or trusted signing is still recommended for Windows reputation.

Use [release asset verification](docs/en/release-asset-verification.md) before manual installation, mirror, or internal redistribution. Use the [security and trust model](docs/en/security-and-trust-model.md) to understand which boundaries PassMan enforces and which controls remain operator-owned.
