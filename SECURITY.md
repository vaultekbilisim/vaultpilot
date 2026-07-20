# Security Policy

## Supported Release

Only the latest verified public VaultPilot release is supported for new installations and updates. The current supported public release is **VaultPilot Enterprise Vault Console 2.0.0**, published as GitHub Release [`v2.0.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0) on June 30, 2026.

PassMan remains a legacy compatibility name for older installed service names, data paths, environment variables, cookies, headers, update aliases, extension protocol strings and rollback decisions. Do not use older PassMan releases for new installations unless support has explicitly approved a rollback.

## Reporting Security Issues

Report security issues privately through the repository security policy page or the licensed support channel. Do not open public issues that include secrets, exploit payloads, customer data, logs with sensitive values, screenshots containing secret records, agent tokens, license private keys, certificates, or database files.

Use: https://github.com/ucsahinn/vaultpilot/security/policy

## Public Repository Boundaries

This repository may contain public documentation and public release notes. Customer delivery files belong as GitHub Release assets, not committed files in the git tree. It must not contain:

- Private source code.
- Signing private keys or certificate packages.
- License issuer private keys.
- Update manifest private keys.
- Databases, backups, or logs.
- Real AD bind credentials, agent IDs, agent tokens, customer URLs, or license codes.
- Screenshots showing secret values.

## Verification Model

VaultPilot-managed updates verify a signed manifest, asset SHA-256 hashes, release metadata, and MSI signer thumbprints. A local release signer can be accepted by VaultPilot when the signed manifest pins that signer. CA-backed or trusted signing is still recommended for Windows reputation.

Use [release asset verification](docs/en/release-asset-verification.md) before manual installation, mirror, or internal redistribution. Use the [security and trust model](docs/en/security-and-trust-model.md) to understand which boundaries VaultPilot enforces and which controls remain operator-owned. Use the [public repository boundary](docs/en/public-repository-boundary.md) before opening public issues or pull requests.
