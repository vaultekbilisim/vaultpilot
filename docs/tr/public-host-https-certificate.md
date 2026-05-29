# Public Host, HTTPS ve Sertifikalar

PassMan ilk kurulum için HTTP üzerinde başlayabilir; üretim erişiminde kontrollü bir host adı ve HTTPS sertifikası kullanılmalıdır.

## Operatörün Girdiği Alanlar

| Alan | Zorunlu | Amaç |
| --- | --- | --- |
| Public host | Evet | Kullanıcıların tarayıcıda açacağı DNS adı veya server host'u. |
| Public port | Evet | Varsayılan `1903`; onaylı gelen portu kullanın. |
| HTTPS sertifika paketi | HTTPS için evet | Sertifika ve private key içeren PFX/P12 paketi. |
| Sertifika parolası | Paket parola korumalıysa zorunlu | Server'ın paketi yüklemesi için kullanılır. |

PassMan ayrı bir "sertifika kaynağı" seçimi istemez. Operatör doğrudan sertifika dosyasını seçer.

## Desteklenen Sertifika Paketi

Tek paket kullanılır:

```text
PFX / P12
```

Sertifika, kullanıcıların tarayıcıda açtığı host ile eşleşmelidir. Subject veya SAN içinde yapılandırılan host adı bulunmalıdır.

## Üretim Kontrol Listesi

1. Sertifika paketini PassMan dışında oluşturun veya temin edin.
2. Host adının PassMan sunucusuna çözümlendiğini doğrulayın.
3. Sunucu sistemi ekranında public host ve port değerlerini girin.
4. PFX/P12 paketini yükleyin.
5. Gerekiyorsa paket parolasını girin.
6. HTTPS yapılandırmasını kaydedin.
7. UI isterse servisi yeniden başlatın veya PassMan'ın yeniden yüklemesini bekleyin.
8. Şu adresi açın:

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
| Lokalde çalışıyor, uzaktan çalışmıyor | DNS, firewall veya reverse proxy yolu host/port ile hizalı değil. |
| Sertifika yalnızca sunucuda kabul ediliyor | İstemci cihazlar sertifikayı veren CA'ya güvenmiyor. |
