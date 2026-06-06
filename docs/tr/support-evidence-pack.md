# Destek Kanıt Paketi

Bu checklist, temiz ve public-safe support aktarımı hazırlamak için kullanılır. Amaç, vakayı teknik olarak faydalı hale getirirken secret veya müşteri ortamı sızdırmamaktır.

## Zorunlu Vaka Başlığı

| Alan | Örnek format |
| --- | --- |
| PassMan version | `1.8.20` |
| Yüzey | Login, installer, update, extension, AD sync, sharing, backup, license, HTTPS veya audit. |
| Ortam | Windows Server version ve browser family. |
| Etki | Tek kullanıcı, tüm kullanıcılar, tek vault, tek extension device, tek AD provider, tek update job. |
| Son sağlıklı durum | Biliniyorsa tarih/saat ve önceki version. |
| Mevcut blocker | Kullanıcının gördüğü hatayı tek cümleyle anlat. |

## Yüzeye Göre Kanıt

| Yüzey | Topla | Toplama |
| --- | --- | --- |
| Installer | MSI filename, signature status, service state, redakte edilmiş installer error. | Redakte edilmemiş customer path veya credential içeren MSI logları. |
| Login | Browser family, session state, `/api/auth/me` status, redakte edilmiş timestamp. | Ana parola, TOTP secret, recovery materyali. |
| Update | Manifest version, hash, signer status, update job state. | Signing private key veya internal download credential. |
| Extension | Extension version, pair state, device row status, browser profile mode. | Plaintext credential veya extension PIN. |
| AD sync | Service status, redakte edilmiş agent log, provider health. | AD bind parolası, agent token, tam directory dump. |
| Sharing | Package expiry, max opens, decrypter error name. | Share passphrase, plaintext package içeriği. |
| Backup | Export/import status ve integrity result. | Private kanal açıkça istemedikçe backup dosyasının kendisi. |

## Redaction Kuralları

Gerçek değerleri placeholder ile değiştir:

- `<PASSMAN_URL>`
- `<SERVER_HOST>`
- `<USER>`
- `<VAULT>`
- `<AGENT_ID>`
- `<AGENT_TOKEN>`
- `<LICENSE_CODE>`
- `<REDACTED>`

## Escalation Kalite Eşiği

İyi bir vaka şunları içerir:

- Tek net symptom.
- Etkilenen yüzey.
- Version ve component versionları.
- Kısa timeline.
- Eşleşen KB makalesinden redakte edilmiş kanıt.
- Hata öncesi değişiklik.
- Backup, login ve audit hâlâ erişilebilir mi bilgisi.

İlgili sayfalar:

- [Bilgi bankası](../../kb/tr/README.md)
- [Sorun giderme](troubleshooting.md)
- [Güvenlik ve güven modeli](security-and-trust-model.md)
