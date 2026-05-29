# Chromium Eklentisi

PassMan Chromium eklentisi; eşleştirilmiş cihazlarda kullanıcı aksiyonuyla autofill, login kaydetme, login güncelleme ve aktif site kayıt sayısı rozeti sağlar.

![PassMan browser extension management](../../assets/screenshots/browser-extension-management.png)

## Kurulum Modları

| Mod | Ne zaman kullanılır |
| --- | --- |
| Enterprise policy deployment | Chrome veya Chromium tabanlı tarayıcıları merkezi yönetiyorsanız. |
| ZIP fallback paketi | Manuel kurulum, lab doğrulama veya acil dağıtım gerekiyorsa. |
| Managed CRX/Web Store akışı | Tarayıcı-native update dağıtımı gerekiyorsa. |

Chrome normal bir web sayfasının eklentiyi sessiz kurmasına izin vermez. Otomatik dağıtım için enterprise policy, Web Store veya signed CRX update akışı gerekir.

## Eşleştirme Akışı

1. Eklentiyi kurun veya dağıtın.
2. Eklenti popup'ını açın.
3. PassMan server origin değerini girin.
4. Kullanıcı adı, cihaz adı ve eklenti PIN'i girin.
5. Eklenti kısa ömürlü bir pairing code üretir.
6. Cihazı PassMan -> Tarayıcı eklentisi ekranından onaylayın.
7. PassMan vault erişimini eklenti public key'i için wrap eder.

## Kullanıcı Deneyimi

| Özellik | Davranış |
| --- | --- |
| Rozet sayısı | Eklenti ikonu mevcut site için eşleşen kayıt sayısını gösterir. |
| Autofill | Kullanıcı aksiyonu seçili kaydı mevcut sayfaya doldurur. |
| Login kaydetme | Yeni login tespit edilirse kullanıcıya kayıt oluşturma önerilir. |
| Login güncelleme | Kullanıcı adı/parola değişikliği tespit edilirse mevcut kaydı güncelleme önerilir. |
| Bildirimler | Eşleştirme, iptal, autofill ve kaydet/güncelle durumları popup ve desteklenen tarayıcı bildirim yüzeylerinde gösterilir. |

## Güvenlik Modeli

- Eklenti private materyali, eklenti PIN'i ve tarayıcı profil storage'ı ile korunur.
- Kalıcı eklenti storage'ı plaintext secret içermez.
- Autofill snapshot'ları encrypted payload ve eklentiye wrap edilmiş key içerir.
- Plaintext yalnızca kullanıcı aksiyonundan sonra aktif eklenti oturumunda çözülür.
- Kaybolan veya güvenilmeyen cihazlar PassMan panelinden iptal edilmelidir.

## Operasyon Kontrol Listesi

- Yalnızca isimlendirilmiş cihazları eşleştirin.
- Eklenti sürümlerini release notlarıyla hizalı tutun.
- Üretim cihazlarında policy deployment kullanın.
- Update sonrası Tarayıcı eklentisi ekranını kontrol edin.
- Kullanılmayan, bilinmeyen veya uyumsuz cihazları iptal edin.
