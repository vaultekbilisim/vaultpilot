# PassMan Türkçe Doküman Ana Sayfa

Bu sayfa PassMan Enterprise Vault Console için Türkçe operatör haritasıdır. Kurulumdan güvenli işletime kadar en kısa yolu göstermek için hazırlanmıştır.

Güncel desteklenen public release: **PassMan Enterprise Vault Console 1.8.20**.

## Önerilen Sıra

| Adım | Rehber | Sonuç |
| --- | --- | --- |
| 1 | [Yönetici hızlı başlangıç](admin-quickstart.md) | MSI indirmeden ilk sağlıklı kasaya kadar en kısa güvenli yol izlenir. |
| 2 | [Genel bakış](overview.md) | Self-hosted server modeli ve bileşen sınırları anlaşılır. |
| 3 | [Windows Server kurulumu](install-windows-server.md) | MSI kurulur, servis durumu ve tarayıcı erişimi doğrulanır. |
| 4 | [İlk kurulum, owner ve lisans](first-run-owner-license.md) | Owner profili oluşturulur, kasa açılır ve lisans durumu uygulanır. |
| 5 | [Public host ve HTTPS](public-host-https-certificate.md) | Host, zorunlu sertifika paketi ve tarayıcı güven yolu yapılandırılır. |
| 6 | [Güvenlik ve güven modeli](security-and-trust-model.md) | Zero-knowledge sınırı, update güven zinciri ve operatör sorumlulukları doğrulanır. |
| 7 | [Denetim ve güvenlik duruşu](audit-and-security-posture.md) | Skor sinyalleri, denetim zinciri ve öncelikli aksiyonlar incelenir. |
| 8 | [Tarayıcı eklentisi](browser-extension.md) | Onaylı tarayıcılar eşleştirilir; autofill, badge ve save/update davranışı anlaşılır. |
| 9 | [Active Directory ajanı](active-directory-agent.md) | PassMan DC Agent Service kurulur veya onarılır, sync tree sağlığı doğrulanır. |
| 10 | [Paylaşım ve offline decrypter](sharing-and-offline-decrypter.md) | Seçili kayıtlar ve dosyalar süre sonu, kullanım limiti ve alıcı modeliyle paketlenir. |
| 11 | [Yedekleme ve geri yükleme](backups-and-restore.md) | Şifreli yedek, bütünlük ve geri yükleme prosedürü hazırlanır. |
| 12 | [Güncelleme Merkezi](update-center.md) ve [release asset doğrulama](release-asset-verification.md) | İmzalı manifest, release asset'leri, checksum ve MSI imzası doğrulanır. |
| 13 | [Operasyon runbook](operator-runbook.md) | Canlı kullanım sonrası günlük, haftalık, aylık ve olay rutinleri yürütülür. |

## Hemen Cevap Gerekiyorsa

| Soru | Buradan başla |
| --- | --- |
| PassMan bulut servisi mi? | [SSS](faq.md) |
| Server'i hangi dosya kurar? | [Windows Server kurulumu](install-windows-server.md) |
| Tarayıcı neden sertifika uyarısı veriyor? | [Public host ve HTTPS](public-host-https-certificate.md) |
| Güvenlik skoru neden düşük? | [Denetim ve güvenlik duruşu](audit-and-security-posture.md) |
| Update neden yüzde 76 civarında kaldı? | [Bilgi bankası: update](../../kb/tr/update-stuck-76.md) |
| DC Agent servisi neden bağlanmıyor? | [Bilgi bankası: DC Agent](../../kb/tr/dc-agent-service.md) |
| Girişten sonra neden 401 veya 403 cevapları görüyorum? | [Bilgi bankası: login session gürültüsü](../../kb/tr/session-401-after-login.md) |
| Support'a ne gönderebilirim? | [Destek kanıt paketi](support-evidence-pack.md), [Sorun giderme](troubleshooting.md) ve [Destek politikası](../../SUPPORT.md) |

## Public Güvenlik Sınırı

Public ticket, yorum veya dokümana gerçek secret, ana parola, AD bind parolası, agent token, lisans private materyali, database, yedek, PFX/P12 dosyası veya private key eklemeyin.

Örneklerde `<PASSMAN_URL>`, `<SERVER_HOST>`, `<AGENT_ID>`, `<AGENT_TOKEN>`, `<LICENSE_CODE>` ve `<REDACTED>` gibi placeholder kullanın.

İlgili sayfalar: [Repo ana sayfası](../../README.md), [Bilgi bankası](../../kb/tr/README.md), [Release notları](../../RELEASES.md), [Güvenlik politikası](../../SECURITY.md).
