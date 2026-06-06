# Yönetici Hızlı Başlangıç

Bu rehber, public release indirmesinden sağlıklı ilk kasaya kadar en kısa güvenli yolu verir. Tam wiki okunmadan önce uygulanabilecek operasyon sırası olarak tasarlanmıştır.

## Day-0 Yolu

| Adım | Aksiyon | Kanıt |
| --- | --- | --- |
| 1 | Son GitHub Release üzerinden `PassMan-1.8.20-x64.msi` dosyasını indir. | Dosya adı, boyut ve release tag [asset doğrulama](release-asset-verification.md) sayfasıyla uyumlu. |
| 2 | Pakete güvenmeden önce imzalı update manifestini doğrula. | `passman-update.json` içinde `1.8.20`, MSI hash, boyut ve signer thumbprint görünür. |
| 3 | MSI dosyasını elevated Windows oturumundan kur. | `PassMan Server` servisi oluşur ve çalışır. |
| 4 | `https://<SERVER_HOST>:1903` adresini aç. | Sunucu cevap verir; düz HTTP IP erişiminde secure-context uyarısı görünebilir. |
| 5 | İlk owner profilini HTTPS veya `localhost` üzerinden oluştur ve varsayılan kasayı aç. | Users ekranında owner görünür, ilk kasa kullanılabilir. |
| 6 | Lisansı uygula. | License ekranında aktif durum, kapasite ve süre görünür. |
| 7 | Public host ve HTTPS yapılandır. | Tarayıcı hedef hosta isim uyuşmazlığı olmadan erişir. |
| 8 | Owner için 2FA aç. | Kilitleme sonrası girişte ana parola ve authenticator kodu gerekir. |
| 9 | Şifreli backup export al. | Backup, doğrulama profilinde veya staging ortamında içe aktarılabilir. |
| 10 | Güvenlik duruşunu ve audit zincirini incele. | Overview aksiyonları anlaşılır ve audit chain durumu görünür. |

## Minimum Ortam

| Gereksinim | Temel beklenti |
| --- | --- |
| Host | Windows Server veya onaylı Windows service hostu. |
| Port | Varsayılan HTTP portu `1903`, hedef operatörlerden erişilebilir. |
| Tarayıcı | Eklenti için Chromium ailesi; konsol için modern tarayıcı. |
| Yetki | MSI kurulum ve update için Administrator yetkisi. |
| Veri modeli | Lokal PassMan data dizini; database bu public repoya konmaz. |
| Backup | Kurulum dizini dışında operatör kontrollü şifreli backup alanı. |

## İlk Doğrulama Komutları

Sunucuda elevated PowerShell ile çalıştır:

```powershell
sc.exe query PassManServer
netstat -ano | findstr ":1903"
```

Support gerekiyorsa yalnızca redakte edilmiş çıktı paylaş. Database, backup, certificate private key veya secret içerebilecek ham log yükleme.

## Durma Noktaları

Şu durumda durup bilgi bankasına geç:

- MSI servis oluşturmuyor.
- Servis çalışıyor ama tarayıcı `https://<SERVER_HOST>:1903` adresine erişemiyor.
- İlk owner profilinden sonra kasa açılamıyor.
- License beklenmedik şekilde read-only.
- Certificate upload sonrası tarayıcı HTTPS isim uyuşmazlığı gösteriyor.
- Update Center manifest, checksum veya signer uyuşmazlığı gösteriyor.

İlgili sayfalar:

- [Windows Server kurulumu](install-windows-server.md)
- [İlk kurulum, owner ve lisans](first-run-owner-license.md)
- [Public host ve HTTPS](public-host-https-certificate.md)
- [Release asset doğrulama](release-asset-verification.md)
- [Destek kanıt paketi](support-evidence-pack.md)
