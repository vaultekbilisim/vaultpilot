# Operasyon Runbook

Bu runbook, go-live sonrası VaultPilot işletimi için tekrar edilebilir enterprise operasyon ritmini tanımlar.

## Operasyon İlkeleri

- VaultPilot sunucusunu bulut bağımlılığı değil, lokal güvenlik sistemi olarak yönet.
- Sağlık durumunu önce konsoldan doğrula; gerekiyorsa yalnızca redakte edilmiş sunucu kanıtı topla.
- Private source code, signing key, customer backup ve database dosyalarını bu public repodan uzak tut.
- Public indirmeler için GitHub Releases kullan; update asset güveni için imzalı manifesti esas al.
- Geniş manuel kontroller yerine sahipliği belli rutinler uygula.

## Günlük Kontroller

| Kontrol | Nerede | Sağlıklı sinyal |
| --- | --- | --- |
| Servis erişimi | Tarayıcı ve Windows service state | Konsol yüklenir ve `VaultPilot Server` çalışır. |
| Güvenlik duruşu | Overview | Aksiyonlar kapalıdır veya sahiplenilmiştir. |
| Audit zinciri | Audit view | Son olaylar beklenen chain durumunu gösterir. |
| Lisans | License ekranı | Aktif durum, kapasite ve süre beklenendir. |
| Eklenti cihazları | Extension ekranı | Cihazlar bilinir; beklenmeyen pending cihaz yoktur. |
| Update jobları | Update Center | Blocked veya stale job yoktur. |
| Zamanlanmış işler | Görevler > Zamanlanmış | `BLOCKED`, uzun süren `DUE` veya açıklanamayan `RETRYING` iş yoktur. |
| Dizin ajanı | Entegrasyonlar > Active Directory | Sağlık `CONNECTED`; servis ve çalışan sürümü beklenen değer ve `ready` durumundadır. |

## Haftalık Kontroller

| Kontrol | Beklenen aksiyon |
| --- | --- |
| Tam yedek | Backup Tool ZIP'ini sunucu diski dışında, çevrimdışı ve erişimi kısıtlı yerde sakla; ZIP kabının parola korumalı olmadığını varsay. |
| Hızlı kurtarma | `.vpr.json` ile 40 karakterlik anahtarın ayrı tutulduğunu ve bunun tam yedek olmadığını doğrula. |
| Restore tatbikatı | Politika gerektiriyorsa staging veya disposable profilde restore doğrula. |
| Kullanıcı incelemesi | Disabled kullanıcıları, roller ve 2FA durumunu kontrol et. |
| AD eşitleme incelemesi | Sağlayıcı sağlığını, son eşitlemeyi, giriş ve kasa kapsamını, seçili mevcut kayıtların uzlaştırma sonucunu doğrula. |
| Rotasyon incelemesi | Günlük, haftalık, aylık veya özel ilkelerin sonraki çalışmasını ve sınırlı loglarını doğrula. |
| Eklenti incelemesi | Eski cihazları revoke et, fallback ZIP sürümünü doğrula. |
| Release incelemesi | Kurulu sürümü son public release ile karşılaştır. |

## Aylık Kontroller

| Alan | Kanıt |
| --- | --- |
| Sertifika yaşam döngüsü | Expiry tarihi, SAN kapsamı ve tarayıcı doğrulaması. |
| Server System ayarları | Public host, port, HTTPS durumu, bildirim testi, log retention ve audit retention. |
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

<a id="directory-action-triage"></a>

## Active Directory İşlem İncelemesi

1. Eşitlemenin başarılı olmasını hassas işlemlerin hazır olduğu anlamında kullanmayın. **Durum** çıktısında servis ile PowerShell çalışanını ve sürümü ayrı doğrulayın.
2. Ajan erişim anahtarını yenilemeniz gerekiyorsa eski anahtarın hemen geçersiz olacağını planlayın. Komut yalnız `-PromptAgentToken` içermeli; anahtarı yerel gizli PowerShell istemine yapıştırın.
3. **Parola değişimi iste** ile **Şimdi rastgele parola ata** işlemlerini ayırın. İlki sonraki giriş bayrağını ayarlar; ikincisi AD parolasını hemen değiştirir ve kasa uzlaştırmasını ayrı sonuç olarak verir.
4. Belirsiz sonuçta aynı işlemi körlemesine yinelemeyin. Görev, ajan ve kasa güncelleme kanıtını uzlaştırın.
5. Yerleşik ve bind hesaplarında durun. Ayrıcalıklı diğer hedeflerde elle işlem için ikinci onayı, otomatik rotasyon için kalıcı ilke onayını doğrulayın.

<a id="recovery-choice"></a>

## Doğru Kurtarma Yolunu Seçme

- Hızlı ve sınırlı profil dönüşü için Hızlı Kurtarma `.vpr.json` paketini kullanın; FILE verisi, geçmiş, lisans, sunucu ayarları ve günlükler kapsam dışıdır.
- Tam sunucu kurtarması için Backup Tool ZIP'ini kullanın. Kaynağı ve bütünlüğü doğrulayın; başarılı içe aktarımın tüm oturumları kapatacağını planlayın.
- `AUDIT`, `DISCOVERY` veya `EXECUTIONS` bakım yedeğini tam yedek saymayın. Bu yedek yalnız seçilen kategoriyi geri yükler ve daha yeni kategori kayıtlarının yerini alabilir.

## Değişiklik Pencereleri

Şunlar için planlı değişiklik penceresi kullan:

- MSI upgrade.
- Public host veya certificate değişimi.
- Server System host, bildirim, retention veya bakım değişimi.
- License değişimi.
- AD provider veya DC Agent değişimi.
- Chrome Web Store eklenti dağıtımı değişimi.
- Backup import veya restore testi.

Değişiklikten önce backup al, mevcut version, service state ve support contact bilgisini kaydet. Değişiklikten sonra login, license, audit, extension devices, update status ve backup durumunu doğrula.

İlgili sayfalar:

- [Yayın dosyası doğrulama](release-asset-verification.md)
- [Server System ayarları](server-system.md)
- [Güncelleme Merkezi](update-center.md)
- [Yedekleme ve geri yükleme](backups-and-restore.md)
- [Sorun giderme](troubleshooting.md)
