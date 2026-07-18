# HTTPS sertifika uyarısı

HTTPS etkinleştiğinde kullanıcılar tarayıcı uyarısı görüyorsa bunu kullanın.

## Önce Uyarının Kaynağını Belirleyin

1. Sunucu ayarlarındaki `publicHost` değerinin kullanıcıların gerçekten açtığı DNS adı veya IP olduğundan emin olun. VaultPilot paketi bu değer için SAN/CN kimlik kurallarıyla otomatik doğrular; farklı bir kullanıcı alias'ı ayrıca kapsanmaz.
2. Sertifikanın geçerlilik aralığını ve sunucu saatini kontrol edin.
3. Zincirin istemci cihazların güvendiği bir kök CA'ya ulaştığını doğrulayın. VaultPilot paket doğrulaması kurumsal CA güven kararı vermez.
4. VaultPilot, CA işaretli sertifikayı leaf olarak reddeder. EKU alanı varsa TLS sunucusu kullanımı için `serverAuth` içermesini zorunlu tutar.
5. Yapılandırılan public host, port, DNS, firewall ve reverse proxy yolunun aynı endpoint'e gittiğini kontrol edin.

Sunucu ayarlarındaki **Paketi doğrula** işlemi PFX/P12 ayrıştırmasını, parola kullanımını, yaprak sertifika ve private key varlığını, key eşleşmesini, geçerlilik tarihini, yerel TLS açılışını, CA-leaf yasağını, varsa `serverAuth` EKU'sunu ve mevcut `publicHost` için DNS/IP kimlik eşleşmesini sınar. Bunun dışında kalan sınır istemci güvenidir: VaultPilot, kullanıcı cihazının issuing/root CA zincirine gerçekten güvendiğini kanıtlayamaz.

## Upload Hataları

Sertifika yükleme Owner-only bir işlemdir. Tam olarak bir `.pfx` veya `.p12` paketi kullanın; dosya 0 byte'tan büyük ve en fazla 2 MB olmalıdır. Upload denemeleri 10 dakikada 6 deneme ile rate-limit edilir. Paketi, parolayı veya private key materyalini public ticket'a eklemeyin.

| Kod | Anlamı | Sonraki kontrol |
| --- | --- | --- |
| `UNSUPPORTED_CERTIFICATE_FILE` | Yüklenen dosya `.pfx` veya `.p12` değil. | Sertifika ve private key'i PFX/P12 paketi olarak export edin. |
| `CERTIFICATE_FILE_SIZE` | Paket boş veya 2 MB üstünde. | Export edilen paket boyutunu doğrulayın ve yeniden deneyin. |
| `CONTENT_LENGTH_REQUIRED` | Upload request içinde `Content-Length` yok. | UI üzerinden yeniden deneyin veya header gönderen bir client kullanın. |
| `PAYLOAD_TOO_LARGE` | Multipart upload server limitini aşıyor. | Tek sertifika paketi yükleyin ve 2 MB altında tutun. |
| `CERTIFICATE_PFX_PASSPHRASE_REQUIRED` | Paket parola korumalı ancak kaynak parolası girilmedi. | PFX/P12 kaynak parolasını özel kanaldan doğrulayıp ilgili alana girin. |
| `CERTIFICATE_PFX_PASSPHRASE_INVALID` | Kaynak parolası paketi açmadı. | Parolayı ve doğru paketi kullandığınızı doğrulayın; parolayı ticket'a yazmayın. |
| `CERTIFICATE_PRIVATE_KEY_REQUIRED` | Pakette private key bulunamadı. | Yaprak sertifika ve eşleşen private key içeren yeni PFX/P12 export edin. |
| `CERTIFICATE_PRIVATE_KEY_MISMATCH` | Private key yaprak sertifikayla eşleşmiyor. | Doğru sertifika-key çiftinden yeni paket üretin. |
| `CERTIFICATE_LEAF_REQUIRED` | Kullanılabilir yaprak sunucu sertifikası bulunamadı. | Zincir dosyası yerine sunucu kimliği içeren PFX/P12 yükleyin. |
| `CERTIFICATE_NOT_YET_VALID` / `CERTIFICATE_EXPIRED` | Sertifika geçerlilik aralığının dışında. | Sunucu saatini ve sertifikanın `notBefore` / `notAfter` değerlerini doğrulayın. |
| `CERTIFICATE_HOST_INVALID` | Yapılandırılmış public host boş, çok uzun veya geçerli DNS/IP biçiminde değil. | Sunucu ayarlarındaki `publicHost` değerini yalnız host adı veya IP olacak şekilde düzeltin. |
| `CERTIFICATE_HOST_MISMATCH` | Yaprak sertifikanın SAN/CN kimliği yapılandırılmış `publicHost` ile eşleşmiyor. | Kullanıcıların açtığı host için düzenlenmiş doğru PFX/P12 paketini kullanın veya onaylı `publicHost` değerini düzeltin. |
| `CERTIFICATE_CA_LEAF_NOT_ALLOWED` | Paket yaprak sunucu kimliği yerine CA sertifikası sunuyor. | CA sertifikasını leaf olarak kullanmayın; eşleşen private key'e sahip gerçek sunucu sertifikasını paketleyin. |
| `CERTIFICATE_SERVER_AUTH_REQUIRED` | Sertifikada EKU var ancak `serverAuth` bulunmuyor. | TLS sunucusu kullanımı için düzenlenmiş sertifikayı yetkili CA'dan yeniden alın. |
| `CERTIFICATE_PFX_INVALID` / `CERTIFICATE_TLS_CONTEXT_INVALID` | Paket çözümlenemedi veya kullanılabilir TLS kimliği oluşturamadı. | Paketi onaylı kaynaktan yeniden export edip parola, key eşleşmesi ve biçimi yeniden kontrol edin. |
| `CERTIFICATE_STAGE_REQUIRED` | Enterprise ayarı, doğrulanmış hazırlama kaydı olmadan kaydedilmeye çalışıldı. | Paketi önce **Paketi doğrula** ile doğrulayın. |
| `CERTIFICATE_STAGE_NOT_FOUND` | Hazırlama kaydı süresi dolmuş, kullanılmış veya bu Owner/kuruluşa ait değil. | Aynı Owner oturumunda paketi yeniden doğrulayın ve 10 dakika içinde kaydedin. |
| Rate limit response | Mevcut 10 dakikalık pencerede çok fazla upload denemesi var. | Yeniden denemeden önce bekleyin; tekrar eden hatalar genelde yanlış dosya tipi, boş paket, oversized paket veya yanlış upload client anlamına gelir. |

## Doğrulama ve Kaydetme Ayrımı

Başarılı doğrulama, canlı HTTPS ayarını değiştirmez. Mevcut `publicHost` kimlik kontrolünden geçen, en fazla 10 dakika geçerli, doğrulamayı yapan Owner ve kuruluşla bağlı, tek kullanımlık bir hazırlama kaydı oluşturur. Paket veya parola değişirse, süre dolarsa, hazırlama daha önce kullanılırsa ya da kullanıcı/kuruluş değişirse yeniden doğrulayın.

**Ayarlar kaydedildi** sonucu, hazırlanan paketin kaydedilecek `publicHost` ile yeniden doğrulandığını ve yapılandırmanın atomik olarak yazıldığını gösterir. Yeni sertifikanın istemcilere sunulduğunu ve zincirin güvenilir olduğunu kanıtlamak için arayüzün belirttiği yeniden yükleme/servis durumunu bekleyin ve gerçek `https://<host>:<port>` endpoint'ini ayrı bir istemciden tekrar açın. Kaydetme başarısız olursa önceki çalışan sertifika korunmalıdır; endpoint farklı davranıyorsa tekrar kaydetmeyin ve özel destek kaydı açın.

## Support için önerilen veri

- Redakte edilmiş public host adı.
- Port.
- Sertifika subject/SAN özeti.
- `notBefore` / `notAfter` aralığı ile genel issuer/CA sınıfı.
- Varsa otomatik host, CA-leaf veya EKU hata kodu.
- Tarayıcı hata kodu.
- VaultPilot hata kodu ve hazırlamanın yeniden doğrulanıp doğrulanmadığı.

## İlgili

- [Public host ve HTTPS](../../docs/tr/public-host-https-certificate.md)
- [Sunucu ayarları ekranı](../../docs/tr/screen-server-settings.md)
- [Server System ayarları](../../docs/tr/server-system.md)
- [Public screenshot redaction](public-screenshot-redaction.md)
