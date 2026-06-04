# PassMan Türkçe Bilgi Bankası

PassMan kurulu olduğu halde operatör hızlı ve güvenli bir teşhis yolu arıyorsa bu sayfadan başlayın. Her makale belirtiyi, ilk kontrolleri, güvenli kanıtları ve public olarak gönderilmemesi gerekenleri ayırır.

## Olay İndeksi

| Belirti | Makale | İlk kontrol |
| --- | --- | --- |
| MSI kurulumu başarısız | [MSI kurulumu başarısız](msi-installation-fails.md) | MSI dosya adı, admin context ve Windows servis durumu. |
| Update yüzde 76 civarında kalıyor | [Update yüzde 76 civarında kalıyor](update-stuck-76.md) | Update job JSON, MSI imza satırı ve Windows Installer event log. |
| DC Agent servisi bağlanmıyor veya 401 dönüyor | [DC Agent servis sorunları](dc-agent-service.md) | Servis durumu, agent logu, PassMan URL erişimi ve redakte server auth sebebi. |
| Eklenti eşleşmesi pending kalıyor | [Extension eşleşmesi pending kalıyor](extension-pairing.md) | Pairing code durumu, device satırı ve browser profil modu. |
| Girişten sonra 401 veya 403 log gürültüsü oluşuyor | [Login session 401/403 gürültüsü](session-401-after-login.md) | Login zamanı, etkilenen endpoint listesi ve `/api/auth/me` sonucunun 200 olup olmadığı. |
| HTTPS sertifika uyarısı | [HTTPS sertifika uyarısı](certificate-warning.md) | Hostname, SAN ve yüklenen sertifika paketi. |
| Denetim zinciri kısmi | [Denetim zinciri kısmi veya tutarsız](audit-chain-partial.md) | Audit filtreleri, zincir durumu ve son restore/update olayları. |
| Lisans read-only | [Lisans read-only durumu](license-read-only.md) | Lisans durumu, plan limitleri, aktif kullanıcılar ve bitiş tarihi. |
| Dış paylaşım açılmıyor | [Dış paylaşım paketi açılamıyor](external-share-fails.md) | Paket metadata, süre sonu, maksimum açma ve decrypter hata durumu. |

## Güvenli Kanıt

Yalnızca redakte edilmiş kanıt gönderin:

- Bileşen sürümleri ve Windows sürümü.
- Servis durumu ve redakte edilmiş zaman damgaları.
- Secret değeri değil, hata durumu.
- Gerçek host yerine `<SERVER_HOST>` kullanılmış public host biçimi.
- Gerçek agent id/token yerine placeholder.

## Eskalasyon Yolu

Makale sorunu çözmezse güvenli kanıtları toplayın, [Destek](../../SUPPORT.md) sayfasını inceleyin ve private support kanalı açın. Database, yedek, sertifika, key, token değeri, gerçek kasa verisi içeren ekran görüntüsü veya secret içerebilen ham log eklemeyin.

İlgili: [Türkçe dokümanlar](../../docs/tr/README.md), [Repo ana sayfası](../../README.md), [Güvenlik politikası](../../SECURITY.md).
