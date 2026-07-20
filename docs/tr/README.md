# VaultPilot Türkçe Doküman Ana Sayfa

Bu sayfa VaultPilot Enterprise Vault Console için Türkçe operatör haritasıdır. Kurulumdan güvenli işletime kadar en kısa yolu göstermek için hazırlanmıştır.

Güncel doğrulanmış herkese açık yayın: **VaultPilot Enterprise Vault Console 2.0.0**. GitHub Release [`v2.0.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0) 30 Haziran 2026'da yayınlandı.

## Önerilen Sıra

| Adım | Rehber | Sonuç |
| --- | --- | --- |
| 1 | [Yönetici hızlı başlangıç](admin-quickstart.md) | MSI indirmeden ilk sağlıklı kasaya kadar en kısa güvenli yol izlenir. |
| 2 | [Genel bakış](overview.md) | Self-hosted server modeli ve bileşen sınırları anlaşılır. |
| 3 | [Windows Server kurulumu](install-windows-server.md) | MSI kurulur, servis durumu ve tarayıcı erişimi doğrulanır. |
| 4 | [İlk kurulum, owner ve lisans](first-run-owner-license.md) | Owner profili oluşturulur, kasa açılır ve lisans durumu uygulanır. |
| 5 | [Public host ve HTTPS](public-host-https-certificate.md) | Host, yönetilen HTTPS ve üretim tarayıcı güven yolu yapılandırılır. |
| 6 | [Server System ayarları](server-system.md) | Host, port, HTTPS durumu, bildirimler, log retention ve bakım sınırları incelenir. |
| 7 | [Güvenlik ve güven modeli](security-and-trust-model.md) | Zero-knowledge sınırı, update güven zinciri ve operatör sorumlulukları doğrulanır. |
| 8 | [Denetim ve güvenlik duruşu](audit-and-security-posture.md) | Skor sinyalleri, denetim zinciri ve öncelikli aksiyonlar incelenir. |
| 9 | [Discovery](discovery.md) | Onaylı login surface, TLS ve file exposure bulguları plaintext secret saklamadan incelenir. |
| 10 | [Tarayıcı eklentisi](browser-extension.md) | Onaylı tarayıcılar eşleştirilir; autofill, badge ve save/update davranışı anlaşılır. |
| 11 | [Chrome Web Store mağaza kaydı ve gizlilik](chrome-web-store-listing.md) | Eklenti mağaza metni, gizlilik beyanları, izinler ve ekran görüntüleri güncel paketle aynı çizgide tutulur. |
| 12 | [Active Directory ajanı](active-directory-agent.md) | VaultPilot DC Agent Service kurulur veya onarılır, sync tree sağlığı doğrulanır. |
| 13 | [Paylaşım ve offline decrypter](sharing-and-offline-decrypter.md) | Seçili kayıtlar ve dosyalar süre sonu, kullanım limiti ve alıcı modeliyle paketlenir. |
| 14 | [Yedekleme ve geri yükleme](backups-and-restore.md) | Şifreli yedek, bütünlük ve geri yükleme prosedürü hazırlanır. |
| 15 | [Kaldırma, veri saklama ve rollback](uninstall-rollback-data-retention.md) | Servis dosyaları güvenli kaldırılır, veri varsayılan olarak korunur ve rollback yalnızca doğrulanmış assetlerle yapılır. |
| 16 | [Güncelleme Merkezi](update-center.md) ve [release asset doğrulama](release-asset-verification.md) | İmzalı manifest, release asset'leri, checksum ve MSI imzası doğrulanır. |
| 17 | [Entegrasyon API client'ları](api-clients.md) ve [Public API referansı](public-api-reference.md) | Dar kapsamlı API client oluşturulur; endpoint, auth, cache ve hata sözleşmesi doğrulanır. |
| 18 | [Lisans yaşam döngüsü](license-lifecycle.md) | Deneme, yenileme, bitiş, salt okunur durum ve lisans değişimi planlanır. |
| 19 | [Operasyon runbook](operator-runbook.md) | Canlı kullanım sonrası günlük, haftalık, aylık ve olay rutinleri yürütülür. |

## Yayın ve Public Repo Bakım Yolu

Bu bölümü herkese açık doküman, release metadata, ekran görüntüsü, repository profile alanları veya dış listeleme handoff hazırlarken kullanın. Normal server-operatör runbook'unun parçası değildir.

| İş | Rehber | Sonuç |
| --- | --- | --- |
| Yayın kontrolleri | [Public repo yayın runbook'u](publication-runbook.md) | Yayın öncesi working tree, staged tree, secret taraması, release asset'leri ve owner/account onay adımları doğrulanır. |
| Dış yüzey farkları | [Dış public yüzey farkları](public-external-surface-drift.md) | Owner onayı gerektiren GitHub Release, Chrome Web Store, repository settings ve lisans takip işleri kaydedilir. |
| Ekran görüntüsü kabulü | [Public ekran görüntüsü standartları](public-screenshot-standards.md) | Ekran görüntüleri sentetik verili, manifest destekli, boyut sınırları içinde ve public dokümantasyon için güvenli tutulur. |
| Repository profile | [GitHub repo profili](github-repository-profile.md) | Public repo metadata, social preview, issue akışı ve sınır ifadeleri aynı çizgide tutulur. |
| Keşfedilebilirlik | [Public keşfedilebilirlik](public-discoverability.md) | GitHub topics, social preview, search/AI sınırları ve `llms.txt` girişleri aynı çizgide tutulur. |
| Uygulama içi yardım | [Uygulama içi ekran yardımı](in-app-screen-help.md) | Her üst bar `?` hedefini herkese açık paylaşım için güvenli ekran sayfasıyla eşleştirir. |
| Public dil | [Public dil sözlüğü](public-language-glossary.md) | Ürün, release, destek ve redaksiyon terimleri İngilizce/Türkçe dokümanlarda tutarlı tutulur. |

## Hemen Cevap Gerekiyorsa

| Soru | Buradan başla |
| --- | --- |
| VaultPilot bulut servisi mi? | [SSS](faq.md) |
| Server'i hangi dosya kurar? | [Windows Server kurulumu](install-windows-server.md) |
| Tarayıcı neden sertifika uyarısı veriyor? | [Public host ve HTTPS](public-host-https-certificate.md) |
| Host, bildirim, log ve bakım ayarlarını nereden incelerim? | [Server System ayarları](server-system.md), [Bilgi bankası: Server settings restart ve bakım](../../kb/tr/server-settings-restart-maintenance.md) |
| Güvenlik skoru neden düşük? | [Denetim ve güvenlik duruşu](audit-and-security-posture.md) |
| Discovery bulgusunu nasıl incelemeliyim? | [Discovery](discovery.md), [Bilgi bankası: Discovery bulgu inceleme](../../kb/tr/discovery-finding-review.md) |
| Chrome Web Store mağaza kaydı ve gizlilik formunda ne yazmalı? | [Chrome Web Store mağaza kaydı ve gizlilik](chrome-web-store-listing.md), [Bilgi bankası: Chrome Web Store incelemesi](../../kb/tr/chrome-web-store-review.md) |
| Update neden yüzde 76 civarında kaldı? | [Bilgi bankası: update](../../kb/tr/update-stuck-76.md) |
| Veri kaybetmeden nasıl kaldırırım? | [Kaldırma, veri saklama ve rollback](uninstall-rollback-data-retention.md) |
| DC Agent servisi neden bağlanmıyor? | [Bilgi bankası: DC Agent](../../kb/tr/dc-agent-service.md) |
| Girişten sonra neden 401 veya 403 cevapları görüyorum? | [Bilgi bankası: login session gürültüsü](../../kb/tr/session-401-after-login.md) |
| Entegrasyon API client'ı neden 401 alıyor veya secret görmüyor? | [Bilgi bankası: API client erişimi](../../kb/tr/api-client-401.md) |
| Hangi public API endpoint, kapsam ve status code'ları destekleniyor? | [Public API referansı](public-api-reference.md) |
| Açık ekrandaki `?` butonu hangi dokümana gider? | [Uygulama içi ekran yardımı](in-app-screen-help.md) |
| Lisans biterse veya değiştirilirse ne olur? | [Lisans yaşam döngüsü](license-lifecycle.md) |
| Destek ekibine ne gönderebilirim? | [Destek kanıt paketi](support-evidence-pack.md), [Sorun giderme](troubleshooting.md) ve [Destek politikası](../../SUPPORT.md) |
| Public repoda ne bulunmalı? | [Public repo sınırı](public-repository-boundary.md) ve [public issue redaction KB](../../kb/tr/public-issue-redaction.md) |
| Hangi dış public yüzey hâlâ owner veya publisher aksiyonu istiyor? | [Dış public yüzey farkları](public-external-surface-drift.md) |
| Public ekran görüntüsü nasıl kabul edilmeli veya değiştirilmeli? | [Public ekran görüntüsü standartları](public-screenshot-standards.md) ve [public ekran görüntüsü redaksiyon KB](../../kb/tr/public-screenshot-redaction.md) |
| Public docs değişikliği yayın öncesi nasıl doğrulanmalı? | [Public repo yayın runbook'u](publication-runbook.md), [Bilgi bankası: public validation fail ediyor](../../kb/tr/public-validation-fails.md) |
| Public GitHub reposunda hangi metadata görünmeli? | [GitHub repo profili](github-repository-profile.md) |
| SEO vaadi vermeden public repo keşfedilebilirliği nasıl korunur? | [Public keşfedilebilirlik](public-discoverability.md) |
| Türkçe public dokümanlarda hangi terimler tercih edilmeli? | [Public dil sözlüğü](public-language-glossary.md) |

## Public Güvenlik Sınırı

Herkese açık ticket, yorum veya dokümana gerçek secret, ana parola, AD bind parolası, agent token, lisans private materyali, database, yedek, PFX/P12 dosyası veya private key eklemeyin.

Örneklerde `<VAULTPILOT_URL>`, `<SERVER_HOST>`, `<AGENT_ID>`, `<AGENT_TOKEN>`, `<LICENSE_CODE>` ve `<REDACTED>` gibi yer tutucular kullanın.

İlgili sayfalar: [Repo ana sayfası](../../README.md), [Bilgi bankası](../../kb/tr/README.md), [Release notları](../../RELEASES.md), [Güvenlik politikası](../../SECURITY.md), [Public repo sınırı](public-repository-boundary.md), [Public repo yayın runbook'u](publication-runbook.md), [Dış public yüzey farkları](public-external-surface-drift.md), [Public ekran görüntüsü standartları](public-screenshot-standards.md), [GitHub repo profili](github-repository-profile.md), [Public keşfedilebilirlik](public-discoverability.md), [Chrome Web Store mağaza kaydı ve gizlilik](chrome-web-store-listing.md), [Public API referansı](public-api-reference.md), [Uygulama içi ekran yardımı](in-app-screen-help.md), [Public dil sözlüğü](public-language-glossary.md).
