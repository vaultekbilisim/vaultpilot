# Release Asset Doğrulama

Bir VaultPilot yayın dosyasını kurmadan veya kurum içinde dağıtmadan önce bu sayfayı kullanın. Amaç, MSI ve destek paketlerinin imzalı manifest ve doğrulanmış GitHub Release ile uyumlu olduğunu kanıtlamaktır.

## Release Durumu

Güncel doğrulanmış public release, 21 Temmuz 2026'da yayınlanan GitHub Release [`v2.2.1`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.2.1).

Herkese açık doğrulama kaynağı olarak GitHub Release asset metadata'sını esas alın. Yayınlanmamış build çıktısı, kopyalanmış paketler, destek eki veya sohbet üzerinden gelen dosyalar release kanıtı değildir.

## VaultPilot 2.2.1 Bileşenleri

| Bileşen | Sürüm | Asset |
| --- | ---: | --- |
| VaultPilot Enterprise Vault Console | 2.2.1 | `VaultPilot-2.2.1-x64.msi` |
| Chromium Browser Extension | Chrome Web Store 1.3.3; v2.2.1 arşivi 1.3.3 | Chrome Web Store listing; varsayılan manifestoda ZIP yok |
| Offline Share Decrypter | 1.2.1 | `vaultpilot-share-decrypter.zip` |
| VaultPilot DC Agent Service | 1.2.21 | `vaultpilot-dc-agent.ps1` |
| Update manifest | 2.2.1 channel metadata | `vaultpilot-update.json` |

## VaultPilot 2.2.1 Yayın Kanıtı

Bu tablo, müşteri indirmelerinde kullanılan ve bağımsız olarak doğrulanan public `v2.2.1` dosya setini kaydeder.

| Bileşen | Sürüm | Teslim yolu |
| --- | ---: | --- |
| VaultPilot Enterprise Vault Console | 2.2.1 | Sürümlü Windows MSI ve imzalı güncelleme manifesti |
| Chromium Browser Extension | 1.3.3 | Chrome Web Store sürümü; bu yayında extension ZIP yok |
| Offline Share Decrypter | 1.2.1 | Sürümlü yayın arşivi ve imzalı bileşen manifesti |
| VaultPilot DC Agent Service | 1.2.21 | Sürümlü PowerShell dosyası ve imzalı bileşen manifesti |
| VaultPilot Backup Tool | 1.0.3 | Sunucuyla gelen destek bileşeni; ayrı GitHub Release dosyası değildir |
| VaultPilot Log Collector | 1.0.3 | Sunucuyla gelen destek bileşeni; ayrı GitHub Release dosyası değildir |

## Public Asset Seti

Public GitHub Release şu müşteri güvenli teslim dosyalarını içerir. Bu tablo 21 Temmuz 2026 tarihinde yayımlanan ve yerelde doğrulanan dosya setini kaydeder:

| Asset | Boyut | SHA-256 |
| --- | ---: | --- |
| `VaultPilot-2.2.1-x64.msi` | 65,622,016 | `182dc5de611175cd559d6ec54b5567a5f07dac54b02130be1d69ef792d18147b` |
| `vaultpilot-update.json` | 1,375 | `8aa83c62b7cddab5de8e451f87c429194e92b22663b2e8cd0eafe9676421d909` |
| `vaultpilot-share-decrypter.zip` | 102,628 | `3f2475e96ecbcb4606878fcf3646c106f49f30be9a666cd23310ba250261d449` |
| `vaultpilot-share-decrypter.json` | 219 | `aa2d71a8209399c50e0b1b16ba2f8eed83e42161c500d17853b85b87d328fca4` |
| `vaultpilot-dc-agent.ps1` | 235,272 | `b5af74774d205dc5e07bd7f59a63d21d9b9dd5905427c98eb568684949e32199` |
| `vaultpilot-dc-agent.json` | 213 | `5deab881826b79f8c77c37f0b0eac34339f0ac10ba5739da6ccf7489871c0e8a` |
| `PassMan-2.2.1-x64.msi` | 65,622,016 | `182dc5de611175cd559d6ec54b5567a5f07dac54b02130be1d69ef792d18147b` |
| `passman-update.json` | 1,357 | `032b8ec823155db555e2b261bec8d6ddbeba83c97acdd469a82a9ee79d65e9ea` |
| `passman-share-decrypter.zip` | 102,628 | `3f2475e96ecbcb4606878fcf3646c106f49f30be9a666cd23310ba250261d449` |
| `passman-share-decrypter.json` | 216 | `d9490a761c5413ef957bd08e1e4ae1ad6c5e7c6f7df59cc38bb600e0f27c6304` |
| `passman-ad-agent.ps1` | 235,272 | `b5af74774d205dc5e07bd7f59a63d21d9b9dd5905427c98eb568684949e32199` |
| `passman-ad-agent.json` | 210 | `f769bea81748093b34d54ad89f685d2a749993988b43f0cede3f462e5f82db0c` |

Chrome Web Store listelemesi tarayıcı eklentisi için birincil müşteri kurulum ve güncelleme kanalıdır ve GitHub Release'den bağımsız ilerleyebilir. Canlı mağaza `1.3.3` gösterir; varsayılan `v2.2.1` güncelleme manifestosu extension ZIP yayımlamaz.

MSI, manifestoda sabitlenen VaultPilot geliştirme imzalayıcısıyla Authenticode imzalıdır ve RFC3161 zaman damgası yoktur. VaultPilot yönetimli güncellemeler imzalı manifestoyu, kesin SHA-256 değerini ve signer thumbprint'ini doğrular; ancak Windows güveni ve SmartScreen itibarı ortama bağlıdır. Yayımlanan MSI hash'i için commit-bound final artifact, elevated Repair ve kimliği doğrulanmış Health kanıtı geçti. Hash-bağlı Sandbox paketi hazırlandı; fiziksel Windows Sandbox Install/Health, release hostunda `WindowsSandbox.exe` bulunmadığı için açıkça ertelendi.

PassMan adlı uyumluluk dosyaları eski client'lar için kurulu ortamlarda, rollback yollarında veya source build çıktısında bulunabilir. Doğrulanan GitHub Release üzerinde görünmedikçe public release asset'i değildir.

Git tree içinde MSI, ZIP, EXE, PFX, P12, DB, SQLite, backup veya signing-key dosyası bulunmamalıdır.

## Doğrulama Adımları

1. GitHub Release [`v2.2.1`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.2.1) sayfasını aç.
2. Release tag değerinin `v2.2.1` olduğunu ve kurum politikanız özellikle izin vermedikçe draft/prerelease olmadığını doğrula.
3. O release içinden `vaultpilot-update.json` indir.
4. Manifestin server version olarak `2.2.1` gösterdiğini doğrula.
5. MSI dosya adının `VaultPilot-2.2.1-x64.msi` olduğunu doğrula.
6. Asset URL'lerinin onaylı public GitHub Release hostunu kullandığını doğrula.
7. İndirilen dosya boyutlarını ve SHA-256 değerlerini yukarıdaki tabloyla ve ilgili bileşen manifestte yer alıyorsa manifest ile karşılaştır.
8. MSI Authenticode signer metadata değerini manifest signer thumbprint ile karşılaştır.
9. Extension release arşivi, decrypter ve DC Agent package hash değerlerini kurum içinde dağıtmadan önce doğrula; tarayıcı kullanıcıları eklentiyi Chrome Web Store'dan kurup güncellemelidir.

## Windows Doğrulama Komutları

Bu komutları indirilmiş release dosyalarını içeren geçici bir klasörden çalıştırın. Çıktıyı kurum içi release kanıtıyla saklayın; herkese açık paylaşmadan önce lokal path veya hostname değerlerini redakte edin.

```powershell
gh release view v2.2.1 --repo ucsahinn/vaultpilot --json tagName,name,isDraft,isPrerelease,publishedAt,assets,url

Get-ChildItem -File |
  Where-Object { $_.Name -like 'VaultPilot-2.2.1-x64.msi' -or $_.Name -like 'vaultpilot-*' } |
  Select-Object Name,Length

Get-FileHash .\VaultPilot-2.2.1-x64.msi -Algorithm SHA256
Get-FileHash .\vaultpilot-* -Algorithm SHA256

Get-AuthenticodeSignature .\VaultPilot-2.2.1-x64.msi |
  Format-List Status,StatusMessage,SignerCertificate
```

`gh release view` farklı tag, draft/prerelease durumu, asset sayısı, boyut, digest veya URL gösterirse devam etme; önce bu sayfayı ve public external-surface drift register'ını güncelle.

## Kurum İçinde Kaydedilebilecek Kanıt

| Kanıt | Public kayda uygun mu? |
| --- | --- |
| Release tag, dosya adları, boyutlar ve hash değerleri | Evet. |
| MSI signer subject ve thumbprint | Evet. |
| Manifest signature değeri | Evet. |
| Lokal install path, private hostname ve kullanıcı adları | Önce redakte et. |
| License code, signing private key, PFX/P12 veya database | Asla. |

## Doğrulama Başarısızsa

Paketi kurmayın veya dağıtmayın. Release tag, asset adı, beklenen hash, gözlenen hash, dosya boyutu ve signer durumunu toplayın; satın alma veya onboarding materyallerindeki lisanslı destek kanalını kullanın.

İlgili sayfalar:

- [Güncelleme Merkezi](update-center.md)
- [Kaldırma, veri saklama ve rollback](uninstall-rollback-data-retention.md)
- [Güvenlik ve güven modeli](security-and-trust-model.md)
- [Destek kanıt paketi](support-evidence-pack.md)
