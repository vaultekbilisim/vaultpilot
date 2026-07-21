# Yedekleme ve Geri Yükleme

VaultPilot iki farklı kurtarma yapıtı sunar: tarayıcıda şifrelenen **Hızlı Kurtarma** paketi ve Windows sunucudan alınan **tam Backup Tool yedeği**. Kapsamları, anahtarları ve geri yükleme amaçları aynı değildir.

## Önerilen İş Akışı

1. Güncelleme öncesi tam Backup Tool yedeği alın; Hızlı Kurtarma paketini tek yedek olarak kullanmayın.
2. Yedeği VaultPilot sunucu diski dışında saklayın.
3. Erişimi sınırlayın; yedek metadata açısından hassastır.
4. Geri yüklemeyi kontrollü ortamda test edin.

<a id="quick-recovery"></a>

## Şifreli Hızlı Kurtarma

Sahip, **Sunucu Ayarları > Genel** üzerinden `.vpr.json` paketi oluşturur. Sunucu yalnız profil, erişilebilir kasalar ve FILE olmayan kayıtları hazırlar. Tarayıcı ayrı bir 40 karakterlik anahtar üretir, PBKDF2-SHA-256 ile 420.000 tur anahtar türetir ve veriyi AES-GCM ile şifreler; manifesto ek doğrulama verisi olarak bağlanır. Anahtar beş dakika sonra ekrandan temizlenir. Dosyayı ve anahtarı ayrı, erişimi kontrollü yerlerde saklayın.

Hızlı Kurtarma; FILE kayıtlarını, dosya parçalarını, kayıt sürümlerini, denetim geçmişini, lisansı, sunucu ayarlarını ve çalışma günlüklerini içermez. Boş bir sunucu profilini kısa yoldan kurmak içindir ve başarılı içe aktarım tüm oturumları kapatır. Tam sistem yedeği veya olağan felaket kurtarma aracı değildir.

<a id="full-backup-tool"></a>

## VaultPilot Backup Tool

Backup toplama işlemini Windows sunucuda Administrator olarak çalıştırın. Primary paketlenen executable `VaultPilotBackupTool.exe` adını taşır; `PassManBackupTool.exe` yalnız legacy upgrade/support alias olarak korunur.

Çıktı yolunu kaydedin ve arşivi özel tutun. Arşiv şifreli kasa verisi, yapılandırma ve sertifika materyali içerebilir. Standart ZIP kabının kendisi parola korumalı değildir; çevrimdışı ve erişimi kısıtlı konumda saklayın. Herkese açık bildirime, destek başlığına veya bu depoya eklemeyin.

İndirme alanı VaultPilot Backup Tool sürümünü `1.0.3` olarak gösterir. Yanındaki `VaultPilotLogCollector.exe` dosyasının da sunucudan bağımsız kendi `1.0.3` sürümü vardır. Bu araçların sürümü VaultPilot sunucu sürümünü devralmaz.

Mevcut konsol, server-backup import panelinden VaultPilot Backup Tool ZIP arşivi veya encrypted JSON export içe aktarabilir. Import, sunucu profilini yedekten yeniden kurar ve açık oturumları kapatır. Bu yüzden yalnız admin recovery aksiyonu olarak, dosya kaynağı ve recovery amacı doğrulandıktan sonra çalıştırılmalıdır.

ZIP içinde Backup Tool database archive varsa VaultPilot, server database'i encrypted local backup şekline çevirmeden önce Backup Tool manifest ister. Raw database dosyaları, WAL/SHM companion dosyaları, müşteri backup'ları ve support arşivleri bu public repoya veya public issue metnine girmez.

Import `PAYLOAD_TOO_LARGE`, `CONTENT_LENGTH_REQUIRED`, `BACKUP_ARCHIVE_INVALID` veya `BACKUP_ARCHIVE_UNSUPPORTED` ile başarısız olursa yeniden denemeden önce [Backup import başarısız veya oturumları kapatıyor](../../kb/tr/backup-import-fails.md) makalesini kullanın.

Uninstall, veri saklama, rollback ve purge sınırları için [Kaldırma, veri saklama ve rollback](uninstall-rollback-data-retention.md) sayfasını kullanın. Normal uninstall, açık private purge onayı yoksa data dizinini korumalıdır.

<a id="backup-integrity"></a>

## Bütünlük

Encrypted JSON import sırasında SHA-256 integrity manifest ve item count doğrulanır. ZIP archive handling bozuk arşivleri, güvensiz entry name'leri ve desteklenmeyen payload'ları restore öncesi reddeder. Bir değer uyuşmuyorsa veya kaynak net değilse import'u durdurun ve private support kanalını kullanın.
