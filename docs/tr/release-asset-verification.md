# Release Asset Doğrulama

Bir VaultPilot yayın dosyasını kurmadan veya kurum içinde dağıtmadan önce bu sayfayı kullanın. Amaç, MSI ve destek paketlerinin imzalı manifest ve doğrulanmış GitHub Release ile uyumlu olduğunu kanıtlamaktır.

## Release Durumu

Güncel doğrulanmış public release, 30 Haziran 2026'da yayınlanan GitHub Release [`v2.0.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0).

Herkese açık doğrulama kaynağı olarak GitHub Release asset metadata'sını esas alın. Yayınlanmamış build çıktısı, kopyalanmış paketler, destek eki veya sohbet üzerinden gelen dosyalar release kanıtı değildir.

## VaultPilot 2.0.0 Bileşenleri

| Bileşen | Sürüm | Asset |
| --- | ---: | --- |
| VaultPilot Enterprise Vault Console | 2.0.0 | `VaultPilot-2.0.0-x64.msi` |
| Chromium Browser Extension | 1.3.2 | Chrome Web Store listing; `vaultpilot-browser-vault-extension.zip` release arşivi |
| Offline Share Decrypter | 1.2.0 | `vaultpilot-share-decrypter.zip` |
| VaultPilot DC Agent Service | 1.2.10 | `vaultpilot-dc-agent.ps1` |
| Update manifest | 2.0.0 channel metadata | `vaultpilot-update.json` |

## Public Asset Seti

Public GitHub Release şu müşteri güvenli teslim dosyalarını içerir. Bu tablo 8 Temmuz 2026 tarihinde GitHub Release metadata'sı ile kontrol edildi:

| Asset | Boyut | SHA-256 |
| --- | ---: | --- |
| `VaultPilot-2.0.0-x64.msi` | 66,118,490 | `c3c3189572fc5936f30e0f14e5d12b2ed4702e3db0efd32a1c8d2eba65b67842` |
| `vaultpilot-update.json` | 1,430 | `a6610b266c4a3bee2d689615e5f1b2bccf15067af3d8c0094832b10d67fb9351` |
| `vaultpilot-browser-vault-extension.zip` | 181,103 | `7f95df52d796c8bb73196569dc77cfc220aadd7e971ca323825d505e947c02aa` |
| `vaultpilot-extension-update.json` | 257 | `de3b30a3cdc2a58188d6421f96d8e164ead5406ebbee614e1569ac20eec69f55` |
| `vaultpilot-share-decrypter.zip` | 102,632 | `b6cd0cdc8cd2bd670348fca2587f7ad6d54604d2fa3c9d159e6a35c15301ed8a` |
| `vaultpilot-share-decrypter.json` | 219 | `7dca1ad23057223a221eaa0058b6ae8a5dfa4d12cbbcdf73b4249545cd34211b` |
| `vaultpilot-dc-agent.ps1` | 98,891 | `de8c4df43ff69b9a277e2cfaf4cb14f553512cf13b318eec45b725db1113e0fc` |
| `vaultpilot-dc-agent.json` | 212 | `9082376283457eeddbffd3aee8d4e6ed1b46674d498d027467a9eff6308f7f4e` |

Chrome Web Store listelemesi tarayıcı eklentisi için birincil müşteri kurulum ve güncelleme kanalıdır. Eklenti ZIP'i yalnızca release arşivi, lab doğrulama paketi, lokal geliştirme paketi veya acil geri dönüş çıktısı olarak tutulur.

PassMan adlı uyumluluk dosyaları eski client'lar için kurulu ortamlarda, rollback yollarında veya source build çıktısında bulunabilir. Doğrulanan GitHub Release üzerinde görünmedikçe public release asset'i değildir.

Git tree içinde MSI, ZIP, EXE, PFX, P12, DB, SQLite, backup veya signing-key dosyası bulunmamalıdır.

## Doğrulama Adımları

1. GitHub Release [`v2.0.0`](https://github.com/ucsahinn/vaultpilot/releases/tag/v2.0.0) sayfasını aç.
2. Release tag değerinin `v2.0.0` olduğunu ve kurum politikanız özellikle izin vermedikçe draft/prerelease olmadığını doğrula.
3. O release içinden `vaultpilot-update.json` indir.
4. Manifestin server version olarak `2.0.0` gösterdiğini doğrula.
5. MSI dosya adının `VaultPilot-2.0.0-x64.msi` olduğunu doğrula.
6. Asset URL'lerinin onaylı public GitHub Release hostunu kullandığını doğrula.
7. İndirilen dosya boyutlarını ve SHA-256 değerlerini yukarıdaki tabloyla ve ilgili bileşen manifestte yer alıyorsa manifest ile karşılaştır.
8. MSI Authenticode signer metadata değerini manifest signer thumbprint ile karşılaştır.
9. Extension release arşivi, decrypter ve DC Agent package hash değerlerini kurum içinde dağıtmadan önce doğrula; tarayıcı kullanıcıları eklentiyi Chrome Web Store'dan kurup güncellemelidir.

## Windows Doğrulama Komutları

Bu komutları indirilmiş release dosyalarını içeren geçici bir klasörden çalıştırın. Çıktıyı kurum içi release kanıtıyla saklayın; herkese açık paylaşmadan önce lokal path veya hostname değerlerini redakte edin.

```powershell
gh release view v2.0.0 --repo ucsahinn/vaultpilot --json tagName,name,isDraft,isPrerelease,publishedAt,assets,url

Get-ChildItem -File |
  Where-Object { $_.Name -like 'VaultPilot-2.0.0-x64.msi' -or $_.Name -like 'vaultpilot-*' } |
  Select-Object Name,Length

Get-FileHash .\VaultPilot-2.0.0-x64.msi -Algorithm SHA256
Get-FileHash .\vaultpilot-* -Algorithm SHA256

Get-AuthenticodeSignature .\VaultPilot-2.0.0-x64.msi |
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
