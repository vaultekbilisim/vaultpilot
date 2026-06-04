# Windows Server Kurulumu

Bu runbook, PassMan Server'ın Windows üzerinde normal kurulumu veya yerinde yükseltmesi için kullanılır. Sunucuyu diğer kullanıcılara açmadan önce bu kontroller tamamlanmalıdır.

## Gereksinimler

| Gereksinim | Not |
| --- | --- |
| Windows Server veya onaylı Windows host | Stabil disk ve yedekleme politikası olan kontrollü bir host kullanın. |
| Yönetici yetkisi | MSI, servis kaydı ve firewall kuralı için gerekir. |
| Gelen TCP erişimi | Varsayılan port `1903`; yalnızca ağ politikanız gerektiriyorsa değiştirin. |
| Yedek kararı | Üretim yükseltmesinden önce mevcut data dizinini koruyun veya yedek alın. |
| Release varlıkları | MSI ve update manifestini GitHub Releases üzerinden indirin. Chat veya destek mesajlarından kopyalanmış dosyaları kullanmayın. |

## Kurulum

1. En güncel GitHub Release üzerinden `PassMan-1.8.19-x64.msi` dosyasını indirin.
2. Çalıştırmadan önce dosya adını, kaynağı, checksum değerini ve signer bilgisini doğrulayın. Tam kontrol listesi için [release asset doğrulama](release-asset-verification.md) sayfasını kullanın.
3. MSI'ı Administrator olarak çalıştırın.
4. Kurulum; standalone server, gömülü Node runtime, Prisma/SQLite runtime dosyaları, Windows servisi, firewall kuralı, data dizini ve log dizinini hazırlar.
5. Önce sunucu üzerinden PassMan'ı açın:

```text
https://127.0.0.1:1903
```

Sonra uzaktan erişimi doğrulayın:

```text
https://<SERVER_HOST>:1903
```

İlk profil oluşturma ve kasa kilidi açma tarayıcı Web Crypto desteği ister. Bu kriptografik işlemler için HTTPS veya `localhost` kullanın; düz HTTP sunucu IP erişimi genel profil hatası yerine secure-context uyarısı göstermelidir.

## Kurulan Yüzeyler

| Yüzey | Değer |
| --- | --- |
| Windows servisi | `PassManServer` |
| Görünen ad | `PassMan Server` |
| Data dizini | `C:\ProgramData\PassMan` |
| Log dizini | `C:\ProgramData\PassMan\logs` |
| Varsayılan port | `1903` |
| Tarayıcı girişi | HTTPS yapılandırılmadan önce `https://<SERVER_HOST>:1903` |

## Kurulum Sonrası Doğrulama

Geniş erişim vermeden önce şu kontrolleri çalıştırın:

```powershell
sc.exe query PassManServer
```

```text
https://127.0.0.1:1903/api/profile
```

Beklenen sonuç:

- Servis kurulu ve çalışır durumda.
- Lokal API cevap veriyor.
- Uzak URL onaylı bir istemciden açılıyor.
- Firewall kuralı yalnızca hedef ağ yolunu açıyor.
- PassMan log dizininde kalıcı installer hatası yok.

## İlk Giriş Yolu

Servis doğrulamasından sonra:

1. Owner profilini oluşturun.
2. Ana parola ile kasayı açın.
3. Lisansı uygulayın.
4. Public host ve HTTPS yapılandırmasını tamamlayın.
5. Ek kullanıcı eklemeden önce 2FA'yı etkinleştirin.

## Yükseltme Notları

- Üretim yükseltmesinden önce yedek dışa aktarın.
- MSI'ın server ve destek bileşenlerini birlikte güncellemesine izin verin.
- Offline decrypter ve DC agent script'i MSI tarafından yenilenir ve release notlarında izlenir.
- Destek özellikle istemedikçe kurulu server dizinindeki dosyaları elle değiştirmeyin.

## Destek İçin Güvenli Kanıt

Redakte edildikten sonra paylaşılabilir:

- MSI dosya adı.
- PassMan server sürümü.
- Windows servis durumu.
- Redakte edilmiş installer log kesiti.
- Gerçek host yerine `<SERVER_HOST>` kullanılan tarayıcı URL biçimi.

Database, yedek, PFX/P12 dosyası, private key, ana parola, secret değeri veya gerçek internal hostname paylaşmayın.
