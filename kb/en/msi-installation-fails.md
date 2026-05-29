# MSI installation fails

Use this checklist when the PassMan MSI does not complete or the service does not start after install.

## Checks

1. Confirm the MSI was launched as Administrator.
2. Confirm the configured port is not already in use.
3. Check the `PassManServer` Windows service state.
4. Review installer logs under the PassMan log directory.
5. Re-run only after the previous service state is understood.

## Safe data for support

- PassMan version.
- Windows version.
- MSI file name and signature status.
- Redacted installer log excerpt.
- Port number and service state.

Do not send database files, master passwords, secret values, license private keys, certificates or screenshots showing secrets.
