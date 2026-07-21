# Backups and Restore

VaultPilot provides two different recovery artifacts: a browser-encrypted **Quick Recovery** package and a **full Backup Tool backup** collected on the Windows server. Their scope, key handling, and restore purpose are not interchangeable.

## Recommended Workflow

1. Take a full Backup Tool backup before updates; do not use Quick Recovery as the only backup.
2. Store the backup outside the VaultPilot server disk.
3. Restrict access; backup metadata is sensitive.
4. Test restore in a controlled environment.

<a id="quick-recovery"></a>

## Encrypted Quick Recovery

An Owner creates the `.vpr.json` package under **Server Settings > General**. The server prepares only the profile, accessible vaults, and non-FILE records. The browser generates a separate 40-character key, derives an encryption key with PBKDF2-SHA-256 at 420,000 iterations, and encrypts with AES-GCM while binding the manifest as authenticated additional data. The displayed key is cleared after five minutes. Keep file and key in separate, access-controlled locations.

Quick Recovery excludes FILE records, file chunks, record revisions, audit history, license, server settings, and runtime logs. It is intended to bootstrap an empty server profile, and successful import closes every session. It is not a full-system or routine disaster-recovery backup.

<a id="full-backup-tool"></a>

## VaultPilot Backup Tool

Run backup collection on the Windows server as Administrator. The primary packaged executable is `VaultPilotBackupTool.exe`; `PassManBackupTool.exe` remains only as a legacy upgrade/support alias.

Record the output path and keep the archive private. It can contain encrypted vault data, configuration, and certificate material. The standard ZIP container itself is not password protected; store it offline with restricted access. Do not attach it to public issues, public support threads, or this repository.

The download identifies VaultPilot Backup Tool version `1.0.3`. The adjacent `VaultPilotLogCollector.exe` has its own independent `1.0.3` version. These tool versions do not inherit the VaultPilot server version.

The current console can import either a VaultPilot Backup Tool ZIP archive or an encrypted JSON export from the server-backup import panel. Import rebuilds the server profile from the backup and closes active sessions, so run it only as an administrator recovery action after confirming the file source and backup purpose.

If the ZIP contains a Backup Tool database archive, VaultPilot requires the Backup Tool manifest before converting the server database into the encrypted local backup shape. Raw database files, WAL/SHM companions, customer backups and support archives still do not belong in this public repository or public issue text.

If import fails with `PAYLOAD_TOO_LARGE`, `CONTENT_LENGTH_REQUIRED`, `BACKUP_ARCHIVE_INVALID` or `BACKUP_ARCHIVE_UNSUPPORTED`, use [Backup import fails or closes sessions](../../kb/en/backup-import-fails.md) before retrying.

For uninstall, data retention, rollback and purge boundaries, use [Uninstall, data retention and rollback](uninstall-rollback-data-retention.md). Normal uninstall should preserve the data directory unless an explicit private purge approval exists.

<a id="backup-integrity"></a>

## Integrity

Encrypted JSON import verifies the SHA-256 integrity manifest and item counts. ZIP archive handling rejects malformed archives, unsafe entry names and unsupported payloads before restore. If any value does not match or the source is unclear, stop the import and use a private support channel.
