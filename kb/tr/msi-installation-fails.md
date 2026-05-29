# MSI kurulumu başarısız

PassMan MSI tamamlanmıyor veya kurulum sonrası servis başlamıyorsa bu kontrol listesini kullanın.

## Kontroller

1. MSI'ın Administrator olarak çalıştırıldığını doğrulayın.
2. Yapılandırılan portun başka süreç tarafından kullanılmadığını kontrol edin.
3. `PassManServer` Windows servis durumunu inceleyin.
4. PassMan log dizinindeki installer loglarını kontrol edin.
5. Önceki servis durumu anlaşılmadan tekrar kurulum denemesi yapmayın.

## Support için güvenli veri

- PassMan versiyonu.
- Windows versiyonu.
- MSI dosya adı ve imza durumu.
- Redacted installer log bölümü.
- Port ve servis durumu.

Database dosyası, ana parola, secret değeri, license private key, sertifika private key veya secret görünen screenshot göndermeyin.
