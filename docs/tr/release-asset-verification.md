# Release Asset Doğrulama

Bir PassMan public release assetini kurmadan veya kurum içinde dağıtmadan önce bu sayfayı kullan. Amaç, MSI ve destek paketlerinin imzalı manifest ve son public release ile uyumlu olduğunu doğrulamaktır.

## Güncel Release

| Bileşen | Sürüm | Asset |
| --- | ---: | --- |
| PassMan Enterprise Vault Console | 1.8.19 | `PassMan-1.8.19-x64.msi` |
| Chromium Browser Extension | 1.3.1 | Chrome Web Store listing; `passman-chromium-extension.zip` release arşivi |
| Offline Share Decrypter | 1.2.0 | `passman-share-decrypter.zip` |
| PassMan DC Agent Service | 1.2.10 | `passman-ad-agent.ps1` |
| Update manifest | 1.8.19 channel metadata | `passman-update.json` |

## Public Asset Seti

Public GitHub Release yalnızca müşteri güvenli delivery assetlerini içermelidir:

- `PassMan-1.8.19-x64.msi`
- `passman-update.json`
- `passman-chromium-extension.zip`
- `passman-share-decrypter.zip`
- `passman-ad-agent.ps1`

Chrome Web Store listelemesi tarayıcı eklentisi için birincil müşteri kurulum ve güncelleme kanalıdır. Eklenti ZIP'i yalnızca release arşivi, lab doğrulama paketi, lokal geliştirme paketi veya acil fallback çıktısı olarak tutulur.

Git tree içinde MSI, ZIP, EXE, PFX, P12, DB, SQLite, backup veya signing-key dosyası bulunmamalıdır.

## Doğrulama Adımları

1. Son release sayfasını aç.
2. Release tag değerinin `v1.8.19` olduğunu doğrula.
3. `passman-update.json` indir.
4. Manifestin server version olarak `1.8.19` gösterdiğini doğrula.
5. MSI filename değerinin `PassMan-1.8.19-x64.msi` olduğunu doğrula.
6. Asset URL'lerinin public `ucsahinn/passman` GitHub Release hostunu kullandığını doğrula.
7. İndirilen MSI boyutu ve SHA-256 değerini manifest ile karşılaştır.
8. MSI Authenticode signer metadata değerini manifest signer thumbprint ile karşılaştır.
9. Extension release arşivi, decrypter ve DC Agent package hash değerlerini kurum içinde dağıtmadan önce doğrula; tarayıcı kullanıcıları eklentiyi Chrome Web Store'dan kurup güncellemelidir.

## Kurum İçinde Kaydedilebilecek Kanıt

| Kanıt | Public kayda uygun mu? |
| --- | --- |
| Release tag, dosya adları, boyutlar ve hash değerleri | Evet. |
| MSI signer subject ve thumbprint | Evet. |
| Manifest signature değeri | Evet. |
| Lokal install path, private hostname ve kullanıcı adları | Önce redakte et. |
| License code, signing private key, PFX/P12 veya database | Asla. |

## Doğrulama Başarısızsa

Paketi kurma veya dağıtma. Release tag, asset adı, beklenen hash, gözlenen hash, dosya boyutu ve signer durumunu topla; private support kanalı kullan.

İlgili sayfalar:

- [Güncelleme Merkezi](update-center.md)
- [Güvenlik ve güven modeli](security-and-trust-model.md)
- [Destek kanıt paketi](support-evidence-pack.md)
