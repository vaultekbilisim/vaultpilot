# Paylaşım ve Offline Decrypter

PassMan paylaşımı seçili kayıt odaklıdır. Operatörlerin tüm kasayı paylaşmasına gerek yoktur; yalnızca seçilen kayıtlar ve dosyalar paketlenir.

![PassMan sharing package flow](../../assets/screenshots/sharing-package-flow.png)

## İç Paylaşım

İç paylaşım PassMan'a kayıtlı kullanıcılar içindir.

- Alıcı kimliği ve public-key durumu kontrol edilir.
- Seçili kayıtlar alıcı için wrap edilir.
- Paylaşım oluşturma, görüntüleme ve revoke aksiyonları audit'e yazılır.
- Alıcı erişimi rol ve vault access sınırları içinde kalır.

## Dış Paylaşım

Dış paylaşım, PassMan sunucusu dışındaki alıcılar için offline paket üretir.

Zorunlu politika kararları:

| Politika | Amaç |
| --- | --- |
| Seçili kayıtlar | Yalnızca seçilen parola, API anahtarı, credential, not, sertifika veya dosya paketlenir. |
| Passphrase | Alıcı paketi açmak için passphrase bilmelidir. |
| Süre sonu | Paket yapılandırılan zamandan sonra kullanılamaz. |
| Maksimum açma | Paket yapılandırılan açma sayısından sonra açılmaz. |
| Dosya dahil etme | Dosya tabanlı secret'lar hassasiyet ve boyut uygunsa dahil edilir. |

## Tamamlanma Durumu

Paket tamamlandıktan sonra Paylaşım ekranı aksiyonel kalmalıdır:

- Oluşturulan paket geçmişte görünür.
- Passphrase teslim rehberi görünür.
- Süre sonu ve maksimum açma sayısı gösterilir.
- Revoke ve audit aksiyonları kullanılabilir kalır.
- Alıcı akışı offline decrypter'a bağlanır.

## Offline Decrypter

![PassMan offline share decrypter](../../assets/screenshots/offline-share-decrypter.png)

`passman-share-decrypter.zip` içindeki HTML araç tamamen tarayıcı içinde çalışır.

Güven göstergeleri:

- Local-only çalışma.
- Ağ bağlantısı gerektirmez.
- Package JSON, passphrase ve metadata doğrulaması tarayıcıda yapılır.
- Yanlış passphrase, değiştirilmiş metadata, süresi dolmuş paket ve tükenmiş kullanım limiti ayrı hata üretir.

## Operatör Rehberi

- Paket ve passphrase'i ayrı kanallardan gönderin.
- Yüksek hassasiyetli materyal için kısa süre sonu kullanın.
- Tek seferlik teslimatlar için düşük maksimum açma sayısı kullanın.
- Alıcı artık erişmemeli ise paketi revoke edin.
- Package JSON, passphrase veya secret değerlerini public destek kanallarına yapıştırmayın.
