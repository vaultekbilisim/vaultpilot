# Public Host, HTTPS ve Sertifikalar

VaultPilot, genel tarayıcı erişiminde yapılandırılmış public port üzerinden HTTPS kullanır. **Otomatik** mod ilk erişim ve iç ağ kullanımı için VaultPilot tarafından yönetilen self-signed sertifikayı sürdürür. **Enterprise** mod ise kurumun sağladığı PFX/P12 kimliğini yapılandırılmış `publicHost` ile birlikte doğrulayıp canlı bağa atomik olarak geçirir. VaultPilot DNS/IP kimlik eşleşmesini otomatik denetler; istemci cihazların sertifika zincirine güvenmesi ayrıca operatör tarafından doğrulanır. Düz HTTP yalnızca iç upstream veya yerel geliştirme konusudur; operatörlerin genel giriş yolu değildir.

## Operatörün Girdiği Alanlar

| Alan | Zorunlu | Amaç |
| --- | --- | --- |
| Public host | Evet | Kullanıcıların tarayıcıda açacağı DNS adı veya server host'u. |
| Public port | Evet | Varsayılan public HTTPS portu `1903`; onaylı gelen portu kullanın. |
| Sertifika modu | Evet | **Otomatik** yönetilen self-signed sertifikayı, **Enterprise** kurumsal PFX/P12 akışını seçer. |
| HTTPS sertifika paketi | Enterprise için zorunlu | Sertifika ve eşleşen private key içeren PFX/P12 paketi. |
| Kaynak parolası | Paket parola korumalıysa zorunlu | Yalnız paketi doğrulamak ve güvenli hazırlama kaydını oluşturmak için kullanılır. |

Mod değiştirmek tek başına canlı sertifikayı değiştirmez. Enterprise paketi önce doğrulanmalı, gösterilen geçerlilik aralığı incelenmeli ve yalnız ardından sunucu ayarları kaydedilmelidir.

## Desteklenen Sertifika Paketi

Tek paket kullanılır:

```text
PFX / P12
```

Sertifika, kullanıcıların tarayıcıda açtığı yapılandırılmış `publicHost` ile eşleşmelidir. VaultPilot DNS adını veya IP adresini normalize eder ve sertifikanın SAN/CN kimlik kurallarına göre otomatik karşılaştırır. CA işaretli bir sertifika yaprak sunucu sertifikası olarak reddedilir; EKU alanı varsa `serverAuth` kullanımını içermelidir. Bu denetimler paketin sunucu kimliği olarak kullanılabilirliğini doğrular ancak istemci cihazların issuing/root CA zincirine güvendiğini kanıtlamaz.

## Yükleme Sınırı ve Hata Kodları

Sertifika yükleme Owner-only, yani yalnız **Owner** rolüne açık bir sunucu ayarıdır. Tam olarak bir `.pfx` veya `.p12` paketi yükleyin. Dosya 0 byte'tan büyük ve en fazla 2 MB olmalıdır. Upload işlemi 10 dakikada 6 deneme ile sınırlandırılır.

Browser upload isteği `Content-Length` içermelidir; scripted client `CONTENT_LENGTH_REQUIRED` alırsa UI üzerinden yeniden deneyin veya doğru length header'ını gönderin. Upload kabul edilen zarfı aşarsa VaultPilot `PAYLOAD_TOO_LARGE` döndürür.

| API kodu | Anlamı | Operatör aksiyonu |
| --- | --- | --- |
| `UNSUPPORTED_CERTIFICATE_FILE` | Seçilen dosya `.pfx` veya `.p12` paketi değil. | Sertifika ve private key içeren PFX/P12 paketi export edip onu yükleyin. |
| `CERTIFICATE_FILE_SIZE` | Seçilen paket boş veya 2 MB üstünde. | Sertifika paketini yeniden export edin ve yüklemeden önce boyutunu doğrulayın. |
| `CONTENT_LENGTH_REQUIRED` | Upload isteğinde `Content-Length` yok. | VaultPilot UI'ı veya bu header'ı gönderen bir client kullanın. |
| `PAYLOAD_TOO_LARGE` | Multipart request server upload limitini aşıyor. | Paketin en fazla 2 MB olduğunu doğrulayın ve tam olarak bir sertifika dosyasıyla yeniden deneyin. |
| `CERTIFICATE_HOST_INVALID` | Public host boş, bozuk veya desteklenmeyen bir URL/host biçiminde. | Kullanıcıların gerçekten açacağı DNS adını ya da IP adresini girin; staging kaydı oluşmadan yeniden doğrulayın. |

Sertifika paketini, sertifika parolasını, private key materyalini veya private host detaylarını public issue, doküman veya ekran görüntüsüne koymayın.

## Doğrulama, Hazırlama ve Atomik Kaydetme

1. **Enterprise** modunu seçin, boş olmayan DNS/IP `publicHost` değerini, PFX/P12 paketini ve gerekiyorsa kaynak parolasını girin. Host doğrulanmadan staging token oluşturulmaz veya tüketilmez.
2. **Paketi doğrula** ile gerçek PFX/P12 ayrıştırmasını, private key eşleşmesini, TLS açılışını, CA-leaf yasağını, varsa `serverAuth` EKU'sunu ve mevcut `publicHost` için DNS/IP kimlik eşleşmesini çalıştırın.
3. Ekranda gösterilen Subject/SAN, issuer ve **başlangıç-bitiş geçerlilik aralığını** beklenen sertifikayla karşılaştırın. Otomatik host doğrulaması başarılı olsa bile istemci cihazların issuing/root CA'ya güvendiğini ayrıca doğrulayın.
4. Başarılı doğrulama, dosyanın kendisini kalıcı ayar yapmaz. VaultPilot o anki `publicHost` kontrolünden geçen, en fazla 10 dakika geçerli, yalnız doğrulamayı yapan Owner ve kuruluş için kullanılabilen, tek kullanımlık bir hazırlama kaydı oluşturur.
5. Hazırlama süresi dolduysa, daha önce kullanıldıysa, kullanıcı/kuruluş değiştiyse veya paket/parola değiştiyse yeniden doğrulayın.
6. Sunucu ayarlarını kaydedin. VaultPilot yeni paketi kaydedilecek `publicHost` ile geçici hedefte yeniden doğrular, ayar ve dosya terfisini tek işlem gibi tamamlar. Doğrulamadan sonra host değiştiyse eşleşmeyen paket commit edilmez. Herhangi bir adım başarısız olursa önceki ayar ve çalışan sertifika korunur; yarım geçiş canlı yapılandırmaya yazılmaz.

Kaynak parolası loga, denetim ayrıntısına veya genel ayar yanıtına yazılmaz. Hazırlama kaydı başka bir Owner tarafından, ikinci kez veya süre dolduktan sonra kullanılamaz.

## Üretim Kontrol Listesi

1. İlk erişimi `https://<SERVER_HOST>:1903` veya yapılandırdığınız public HTTPS portu üzerinden doğrulayın.
2. Managed self-signed sertifika aktifken tarayıcı uyarısı bekleyin.
3. Trusted sertifika paketini VaultPilot dışında oluşturun veya temin edin.
4. Host adının VaultPilot sunucusuna çözümlendiğini doğrulayın.
5. Sunucu ayarlarında public host ve port değerlerini girip **Enterprise** modunu seçin.
6. PFX/P12 paketini ve gerekiyorsa kaynak parolasını girin.
7. **Paketi doğrula** ile private key, TLS, CA-leaf, varsa `serverAuth` EKU ve `publicHost` eşleşme kontrollerini tamamlayın.
8. Ekrandaki Subject/SAN ve geçerlilik aralığını inceleyip istemci CA güvenini ayrı bir cihazdan doğrulayın.
9. 10 dakikalık hazırlama süresi dolmadan ayarları kaydedin; süre dolduysa paketi yeniden doğrulayın.
10. Kaydetme sonrasında canlı endpoint'i yeniden açın:

```text
https://<HOST>:<PORT>
```

## Güvenlik Notları

- PFX/P12 dosyalarını, private key'leri veya sertifika parolalarını bu public repoya yüklemeyin.
- Sertifika paketlerini sunucuda kısıtlı ACL ile saklayın.
- Tarayıcı uyarıları başlamadan önce süresi dolan sertifikaları değiştirin.
- Private network için internal PKI, internet-facing DNS için trusted public certificate kullanın.

## Sorun Giderme

| Belirti | Kontrol |
| --- | --- |
| Tarayıcı hostname uyarısı veriyor | Sertifika SAN değeri `<HOST>` ile eşleşmiyor. |
| HTTPS başlamıyor | PFX/P12 parolası yanlış veya paket okunamıyor. |
| Doğrulandı ancak kaydedilemiyor | Hazırlama kaydı 10 dakikayı aşmış, daha önce kullanılmış ya da farklı kullanıcı/kuruluşa ait olabilir; paketi yeniden doğrulayın. |
| Kaydetme hata verdi | Önceki çalışan sertifikanın korunduğunu endpoint üzerinden doğrulayın; yeni paketi ve geçerlilik aralığını yeniden inceleyin. |
| İlk erişimde uyarı görünüyor | Managed self-signed HTTPS hâlâ aktif; trusted PFX/P12 paketi kurun veya iç politika gereği issuing CA'yı güvenilir yapın. |
| Lokalde çalışıyor, uzaktan çalışmıyor | DNS, firewall veya reverse proxy yolu host/port ile hizalı değil. |
| Sertifika yalnızca sunucuda kabul ediliyor | İstemci cihazlar sertifikayı veren CA'ya güvenmiyor. |
