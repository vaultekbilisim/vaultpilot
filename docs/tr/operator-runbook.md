# Operasyon Runbook

Bu runbook, go-live sonrası PassMan işletimi için tekrar edilebilir enterprise operasyon ritmini tanımlar.

## Operasyon İlkeleri

- PassMan sunucusunu bulut bağımlılığı değil, lokal güvenlik sistemi olarak yönet.
- Sağlık durumunu önce konsoldan doğrula; gerekiyorsa yalnızca redakte edilmiş sunucu kanıtı topla.
- Private source code, signing key, customer backup ve database dosyalarını bu public repodan uzak tut.
- Public indirmeler için GitHub Releases kullan; update asset güveni için imzalı manifesti esas al.
- Geniş manuel kontroller yerine sahipliği belli rutinler uygula.

## Günlük Kontroller

| Kontrol | Nerede | Sağlıklı sinyal |
| --- | --- | --- |
| Servis erişimi | Tarayıcı ve Windows service state | Konsol yüklenir ve `PassMan Server` çalışır. |
| Güvenlik duruşu | Overview | Aksiyonlar kapalıdır veya sahiplenilmiştir. |
| Audit zinciri | Audit view | Son olaylar beklenen chain durumunu gösterir. |
| Lisans | License ekranı | Aktif durum, kapasite ve süre beklenendir. |
| Eklenti cihazları | Extension ekranı | Cihazlar bilinir; beklenmeyen pending cihaz yoktur. |
| Update jobları | Update Center | Blocked veya stale job yoktur. |

## Haftalık Kontroller

| Kontrol | Beklenen aksiyon |
| --- | --- |
| Backup export | Şifreli backup al ve onaylı operatör alanında sakla. |
| Restore tatbikatı | Politika gerektiriyorsa staging veya disposable profilde restore doğrula. |
| Kullanıcı incelemesi | Disabled kullanıcıları, roller ve 2FA durumunu kontrol et. |
| AD sync incelemesi | Provider health, son sync ve login/credential scope durumunu doğrula. |
| Eklenti incelemesi | Eski cihazları revoke et, fallback ZIP sürümünü doğrula. |
| Release incelemesi | Kurulu sürümü son public release ile karşılaştır. |

## Aylık Kontroller

| Alan | Kanıt |
| --- | --- |
| Sertifika yaşam döngüsü | Expiry tarihi, SAN kapsamı ve tarayıcı doğrulaması. |
| Lisans yaşam döngüsü | Expiry, user cap ve read-only riski. |
| Update güveni | Güncel release için manifest imzası, asset hash ve signer thumbprint. |
| Incident hazırlığı | Destek kanıt paketi mevcut ortama uyuyor. |
| Recovery hazırlığı | Backup konumu ve restore prosedürü erişilebilir. |

## Incident Rutini

1. Etkilenen yüzeyi belirle: login, kasa kayıtları, paylaşım, eklenti, AD sync, update, backup, lisans, sertifika veya installer.
2. Eşleşen [bilgi bankası makalesini](../../kb/tr/README.md) aç.
3. Yalnızca listelenen güvenli kanıtı topla.
4. Gerekirse host, kullanıcı, internal URL ve timestamp değerlerini redakte et.
5. Database, backup, PFX/P12, private key veya gerçek kasa kaydı içeren ekran görüntüsü ekleme.
6. [Destek kanıt paketi](support-evidence-pack.md) ile private support kanalına taşı.

## Değişiklik Pencereleri

Şunlar için planlı değişiklik penceresi kullan:

- MSI upgrade.
- Public host veya certificate değişimi.
- License değişimi.
- AD provider veya DC Agent değişimi.
- Chrome Web Store eklenti dağıtımı değişimi.
- Backup import veya restore testi.

Değişiklikten önce backup al, mevcut version, service state ve support contact bilgisini kaydet. Değişiklikten sonra login, license, audit, extension devices, update status ve backup durumunu doğrula.

İlgili sayfalar:

- [Release asset doğrulama](release-asset-verification.md)
- [Güncelleme Merkezi](update-center.md)
- [Yedekleme ve geri yükleme](backups-and-restore.md)
- [Sorun giderme](troubleshooting.md)
