# Girişten Sonra 401 Veya 403 Log Gürültüsü

Operatörler girişten hemen sonra `/api/audit`, `/api/secrets/list`, `/api/update/jobs`, `/api/users/list` veya `/api/extension/devices` gibi protected API uçlarında tekrarlı `401` veya `403` görüyorsa bu makaleyi kullan.

## 1.6.0 İçin Beklenen Davranış

PassMan 1.6.0, girişten sonra kasayı açık saymadan önce `/api/auth/me` doğrulaması yapar ve yenileme sonrası authenticated browser session değerini hedeflenen 15 dakikalık pencere boyunca korur. Protected workspace queryleri, tarayıcı session cookie sunucu tarafından görüldükten sonra başlamalıdır. Session doğrulanamazsa UI kilitlenir ve cached protected queryler temizlenir; aynı istekler tekrar tekrar retry edilmez.

## İlk Kontroller

| Kontrol | Sağlıklı sonuç |
| --- | --- |
| Kurulu version | Konsol `1.6.0` veya daha yeni gösterir. |
| Login response | `/api/auth/login` `200` döner. |
| Session doğrulama | Login sonrası `/api/auth/me` `200` döner. |
| Protected API'ler | Audit, secrets, extension, update, users ve integrations `/api/auth/me` sonrası `200` döner. |
| Browser modu | PassMan hostu için cookie engellenmez. |
| URL tutarlılığı | Login ve workspace aynı host, scheme ve port üzerinden kullanılır. |

## Yaygın Nedenler

- Browser session cookie engelliyor veya temizliyor.
- Operatör bir hostname üzerinden login olup başka hostname veya IP ile devam ediyor.
- Development hot reload veya service restart dev session belleğini geçersiz kılıyor.
- Stale tab, kullanıcı kilitliyken protected route poll etmeye devam ediyor.
- Reverse proxy cookie, host veya scheme davranışını değiştiriyor.

## Güvenli Kanıt

- PassMan version.
- Gerçek host yerine `<SERVER_HOST>` kullanılan host şekli.
- Login sonrası `/api/auth/me` sonucu `200` mü.
- Redakte edilmiş API status sırası.
- Browser family ve cookie engelleme durumu.
- Sorun refresh, service restart, update veya host değişimi sonrası mı başladı.

Ana parola, cookie, session token değeri, gerçek kayıt içeren screenshot veya secret içeren ham log gönderme.

## Çözüm Yolu

1. `1.6.0` veya daha yeni sürüme yükselt.
2. Logout yap, stale tabları kapat ve PassMan'i tek canonical URL üzerinden aç.
3. Browser'ın PassMan hostu için cookie kabul ettiğini doğrula.
4. Tekrar login ol ve protected route öncesi `/api/auth/me` `200` mü kontrol et.
5. Proxy kullanılıyorsa host, scheme ve cookie davranışını koruduğunu doğrula.
6. Sorun sürerse güvenli kanıt paketini private support kanalından ilet.

İlgili sayfalar:

- [Destek kanıt paketi](../../docs/tr/support-evidence-pack.md)
- [Sorun giderme](../../docs/tr/troubleshooting.md)
- [Güvenlik ve güven modeli](../../docs/tr/security-and-trust-model.md)
