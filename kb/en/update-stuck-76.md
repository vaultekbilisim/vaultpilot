# Update stays around 76 percent

The 76 percent stage usually means PassMan has verified the MSI and is entering the quiet Windows Installer phase. The service may restart during this step.

## Checks

1. Wait for the service restart window to finish.
2. Reopen PassMan and check the running version.
3. Review the update job detail in Update Center.
4. Inspect verbose MSI logs if the job does not reconcile.
5. Confirm the latest release manifest still points to the expected MSI and SHA-256 hash.

## Notes

PassMan-managed updates verify manifest signature, SHA-256, file metadata and signer thumbprint before installation. Local signer trust is accepted only when pinned by the signed manifest.
