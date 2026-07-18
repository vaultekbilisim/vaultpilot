# Backup Import Başarısız Veya Oturumları Kapatıyor

VaultPilot backup import başarısız oluyorsa, archive hatası dönüyorsa, büyük upload reddediliyorsa veya import başarılı olduğu halde aktif oturumlar kapanıyorsa bu makaleyi kullanın.

<a id="identify-backup-type"></a>

## Önce Yedek Türünü Belirleyin

- **Hızlı Kurtarma**, `.vpr.json` dosyası ile ayrı 40 karakterlik anahtar kullanır. FILE kayıtlarını, sürüm geçmişini, lisansı, sunucu ayarlarını ve günlükleri içermez.
- **Tam Backup Tool yedeği**, onaylı ZIP ve manifest yapısını kullanır. ZIP kabı parola korumalı değildir; dosyayı herkese açık kanala göndermeyin.
- **Bakım yedeği**, yalnız `AUDIT`, `DISCOVERY` veya `EXECUTIONS` kategorisidir ve sunucu profili içe aktarımında kullanılamaz.

Yanlış türü başka türün içe aktarma alanına yüklemeyin. Hızlı Kurtarma anahtarı kayıpsa dosyanın şifresi açılamaz; anahtarı logdan veya sunucudan geri almaya çalışmayın.

## İlk Kontroller

| Kontrol | Sağlıklı sonuç |
| --- | --- |
| Operatör rolü | Import Owner tarafından başlatılır. |
| Dosya kaynağı | Dosya onaylı VaultPilot Backup Tool ZIP archive veya encrypted JSON export'tur. |
| Upload boyutu | JSON ve multipart ZIP upload değerleri `512,000,000` byte değerini geçmez. |
| Multipart upload | Browser `Content-Length` gönderir; istek bunu içermiyorsa UI üzerinden tekrar deneyin. |
| Archive şekli | ZIP archive en fazla `64` entry içerir ve toplam uncompressed boyut `512,000,000` byte değerini geçmez. |

## Hatalar Genelde Ne Anlama Gelir

| Hata | Anlamı | Operatör aksiyonu |
| --- | --- | --- |
| `PAYLOAD_TOO_LARGE` | Upload route limitini aşıyor. | Dosya kaynağını ve boyutunu doğrulayın; archive dosyasını elle bölmeyin veya düzenlemeyin. |
| `CONTENT_LENGTH_REQUIRED` | Multipart upload `Content-Length` içermiyor. | VaultPilot UI veya onaylı browser yolu üzerinden tekrar deneyin. |
| `BACKUP_ARCHIVE_INVALID` | Archive bozuk, güvensiz, boş, çok fazla entry içeriyor veya ZIP işleme limitlerini aşıyor. | Durdurun ve backup'ın onaylı araç tarafından üretildiğini doğrulayın. |
| `BACKUP_ARCHIVE_UNSUPPORTED` | Archive içinde desteklenen VaultPilot backup payload bulunmadı. | Doğru backup export veya Backup Tool archive dosyasını kullanın. |
| Hızlı Kurtarma şifre çözme hatası | `.vpr.json`, ayrı anahtar veya manifesto birbiriyle eşleşmiyor. | Dosya ile doğru anahtarı eşleştirin; değeri tahmin etmeyin veya dosyayı düzenlemeyin. |

## Başarılı Import Yan Etkisi

Başarılı tam yedek veya Hızlı Kurtarma içe aktarımı sunucu profilini yeniden kurar ve tüm aktif oturumları kapatır. Kullanıcılar kanonik VaultPilot adresinden yeniden giriş yapmalıdır. Hızlı Kurtarma yalnız sınırlı kapsamı geri getirir; eksik FILE, geçmiş, lisans ve sunucu ayarı verisini başarısızlık sanmayın.

## Güvenli Kanıt

Redakte ettikten sonra private kanalda gönderilebilir:

- VaultPilot version.
- Backup dosya tipi: ZIP archive veya encrypted JSON export.
- En yakın MB değerine yuvarlanmış dosya boyutu.
- UI veya log içindeki secret içermeyen kesin hata kodu.
- Import'un profile rebuild ve session close aşamasına ulaşıp ulaşmadığı.
- Timestamp ve server role context.

Backup archive, encrypted JSON export, raw database dosyası, WAL/SHM dosyası, sertifika paketi, private key, master password, secret içeren log veya gerçek vault kaydı gösteren screenshot göndermeyin.

İlgili:

- [Yedekleme ve geri yükleme](../../docs/tr/backups-and-restore.md)
- [Destek kanıt paketi](../../docs/tr/support-evidence-pack.md)
- [Public repo sınırı](../../docs/tr/public-repository-boundary.md)
