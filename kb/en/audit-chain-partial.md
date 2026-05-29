# Audit chain is partial or inconsistent

Audit chain warnings should be treated as security-relevant until explained.

## Checks

1. Open Denetim Kaydı / Audit Log.
2. Use advanced filters around the first inconsistent event.
3. Check whether rows were restored, imported or manually modified.
4. Compare against the last known-good backup if available.
5. Stop non-essential write operations if the chain appears broken.

## Do not send

Do not send database files, secret payloads, master passwords or screenshots showing secret values to public support channels.
