# &#128274; VaultPilot Enterprise Vault Console - deutscher Einstieg

Documentation: [English](README.md) | [Türkçe](README.tr.md) | [Deutsch](README.de.md) | [Español](README.es.md) | [Français](README.fr.md) | [Português (Brasil)](README.pt-BR.md)

> Diese Seite ist ein kurzer deutscher Einstieg. Fuer die kanonische oeffentliche Beschreibung und die vollstaendige Dokumentation verwenden Sie [README.md](README.md).

VaultPilot ist ein self-hosted Zero-Knowledge Password and Secrets Manager. Er wird per MSI auf Windows Server installiert und von Benutzerbrowsern ueber den Server-Host verwendet. Dieses oeffentliche Repository ist kein Source-Code-Repository; es ist die Release-, Operator-Dokumentations-, Knowledge-Base-, Sicherheits- und Support-Oberflaeche.

## Status

| Bereich | Details |
| --- | --- |
| Aktueller oeffentlicher Release | VaultPilot Enterprise Vault Console 2.0.0, GitHub Release [v2.0.0](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0). |
| Installationskanal | MSI und Support-Artefakte ueber GitHub Releases; Browser Extension ueber Chrome Web Store. |
| Kanonischer Name | VaultPilot fuer neue Dokumentation und Releases. |
| Kompatibilitaetsname | PassMan bleibt nur fuer alte Services, Datenpfade, Umgebungsvariablen, Cookies, Header, Protokoll-Strings, Update-Aliase und Rollback-Kontext erhalten. |

## Einstieg

| Bedarf | Link |
| --- | --- |
| Oeffentliche Repo-Uebersicht | [Kanonische README](README.md) |
| Englische Operator-Dokumentation | [docs/en/README.md](docs/en/README.md) |
| Tuerkische Operator-Dokumentation | [docs/tr/README.md](docs/tr/README.md) |
| Englische Knowledge Base | [kb/en/README.md](kb/en/README.md) |
| Tuerkische Knowledge Base | [kb/tr/README.md](kb/tr/README.md) |
| Release Notes | [RELEASES.md](RELEASES.md) |
| Release-Asset-Pruefung | [docs/en/release-asset-verification.md](docs/en/release-asset-verification.md) |
| Sicherheitsrichtlinie | [SECURITY.md](SECURITY.md) |
| Support und redigierte Evidenz | [SUPPORT.md](SUPPORT.md) |
| Grenze des oeffentlichen Repositories | [docs/en/public-repository-boundary.md](docs/en/public-repository-boundary.md) |
| Chrome Web Store und Privacy-Formular | [docs/en/chrome-web-store-listing.md](docs/en/chrome-web-store-listing.md), [PRIVACY.md](PRIVACY.md) |
| Publication Runbook und externe Drift | [docs/en/publication-runbook.md](docs/en/publication-runbook.md), [docs/en/public-external-surface-drift.md](docs/en/public-external-surface-drift.md) |
| Screenshot- und Discoverability-Regeln | [docs/en/public-screenshot-standards.md](docs/en/public-screenshot-standards.md), [docs/en/public-discoverability.md](docs/en/public-discoverability.md) |

## Oeffentliche Sicherheitsgrenze

Fuegen Sie keine echten Secrets, Master Passwords, Vault-Inhalte, API Keys, Agent Tokens, privaten Lizenzmaterialien, Private Keys, PFX/P12-Dateien, Datenbanken, Backups, Rohlogs oder Screenshots mit echten Kundendaten hinzu.

Verwenden Sie Platzhalter wie &lt;VAULTPILOT_URL&gt;, &lt;SERVER_HOST&gt;, &lt;AGENT_ID&gt;, &lt;AGENT_TOKEN&gt;, &lt;LICENSE_CODE&gt; und &lt;REDACTED&gt;. Vor einem oeffentlichen Issue: [public issue redaction](kb/en/public-issue-redaction.md) pruefen.

## Beitrag

Lesen Sie [CONTRIBUTING.md](CONTRIBUTING.md), bevor Sie Dokumentation, KB, Links, Uebersetzungen oder public-safe Screenshots aendern. Release-Binaries, privater Source Code, Signing Material und Kundenevidenzpakete gehoeren nicht in dieses Repository.
