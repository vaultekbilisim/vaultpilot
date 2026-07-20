# Chrome Web Store Mağaza Kaydı Ve Gizlilik

Bu sayfa VaultPilot Browser Vault Extension için herkese açık Chrome Web Store mağaza kaydı güncellenirken kullanılır. Amaç mağaza metni, gizlilik açıklamaları, ekran görüntüleri ve public repo dilini mevcut eklenti davranışıyla aynı çizgide tutmaktır.

Herkese açık eklenti kimliği:

| Alan | Değer |
| --- | --- |
| Mağaza kaydı | `https://chromewebstore.google.com/detail/vaultpilot-browser-vault/hjkbedlaieikhkoplgpiohlaakgebobi?hl=tr` |
| Extension ID | `hjkbedlaieikhkoplgpiohlaakgebobi` |
| Güncel public eklenti sürümü | `1.3.2` |
| Manifest sürümü | `3` |
| Birincil kurulum kanalı | Chrome Web Store |
| Yayın arşivi | `vaultpilot-browser-vault-extension.zip`, yalnız release kanıtı, lab doğrulama, lokal geliştirme ve acil fallback için korunur |
| Gizlilik politikası | [PRIVACY.md](../../PRIVACY.md) |

`PRIVACY.md` kanonik İngilizce privacy policy'dir. Bu Türkçe sayfa yayıncı işlemleri ve operatör kontrol listesi için yerel yönlendirme sağlar.

## Mağaza Kaydı Metni

Yeni yayında VaultPilot dili kullanın. PassMan adını yalnızca eski uyumluluk açıklarken kullanın.

2026-07-09 public kontrolünde canlı mağaza başlığı ve sürümü VaultPilot `1.3.2` ile uyumluydu. Mağaza kartında görünen kısa açıklama VaultPilot diliyle başlıyor; ancak yayıncı panelindeki `Detailed description` alanı hâlâ PassMan'ı güncel sunucu ve ürün adı gibi tekrar ediyor. Yayıncı paneli güncellenene kadar owner onayı gerektiren bu düzeltmeyi [Dış public yüzey farkları](public-external-surface-drift.md) içinde takip edin.

## Yayıncı Paneli Aktarım Notu

Bir sonraki Chrome Web Store yayıncı paneli düzenlemesi için bu aktarım notunu kullanın. Bilerek yalnız yayıncının doğrudan yapıştırabileceği veya karşılaştırabileceği alanlarla sınırlıdır.

| Panel alanı | Gerekli değer |
| --- | --- |
| Extension name | `VaultPilot Browser Vault Extension` |
| Extension ID | `hjkbedlaieikhkoplgpiohlaakgebobi` |
| Gönderim öncesi doğrulanacak public sürüm | `1.3.2` |
| Kısa açıklama | [Kısa Açıklama](#kisa-aciklama) altındaki metni kullanın. |
| Detaylı açıklama | PassMan'ı hâlâ güncel sunucu ve ürün adı gibi gösteren canlı `Detailed description` yerine [Detaylı Açıklama](#detayli-aciklama) altındaki metni kullanın. |
| Privacy data categories | Personally identifiable information, authentication information ve web history. |
| Privacy policy URL | `https://github.com/ucsahinn/vaultpilot/blob/main/PRIVACY.md` veya dashboard'un gösterdiği raw GitHub URL. |
| Support URL | `https://github.com/ucsahinn/vaultpilot/blob/main/SUPPORT.md` |
| Mağaza ekran görüntüleri | Yalnız [public screenshot standartları](public-screenshot-standards.md) ile uyumlu, yayına uygun hale getirilmiş sentetik veri ekran görüntülerini kullanın. |

PassMan'ı güncel ürün gibi gösteren canlı `Detailed description` metnini değiştirin. PassMan yalnız eski kurulum uyumluluğu anlatılırken kalmalıdır.

### Başlık

```text
VaultPilot Browser Vault Extension
```

<a id="kisa-aciklama"></a>

### Kısa Açıklama

```text
Chrome veya Edge'i self-hosted VaultPilot sunucusuyla eşleştir; onaylı otomatik doldurma, güvenli kopyalama, kayıt/güncelleme önerileri ve vault rozetleri kullan.
```

<a id="detayli-aciklama"></a>

### Detaylı Açıklama

```text
VaultPilot Browser Vault Extension, onaylı Chromium tarayıcı profilini self-hosted VaultPilot Enterprise Vault Console ile eşleştirir.

Eklenti, kullanıcının VaultPilot sunucusunda zaten tuttuğu kayıtlarla çalışmasına yardım eder:

- Onaylı tarayıcı profilini VaultPilot sunucusuyla eşleştirir.
- Eklenti PIN'i ile eklenti erişimini açar.
- Aktif site için eşleşen vault kayıtlarını gösterir.
- Kullanıcı aksiyonundan sonra seçili login kaydını doldurur.
- Onaylı kullanıcı adı, password, URL, generated password ve vault değerlerini kopyalar.
- Login formu tespit eder ve eşleştirilmiş, yazılabilir kasalar için kaydetme veya güncelleme önerisi gösterir.
- Eklenti arayüzü içinde parola üretir.
- Kullanıcı isterse Have I Been Pwned k-anonymity range API üzerinden parola sızıntısı kontrolü ister.
- Kurulu eklenti sürümünü gösterir ve Chrome Web Store güncelleme kontrolü isteyebilir.

VaultPilot self-hosted çalışır. Kasa verisi kullanıcının veya kurumun yapılandırdığı VaultPilot sunucusundan gelir. Eklenti kullanıcı verisini satmaz, reklam veya profilleme için kullanmaz ve uzaktan çalıştırılabilir kod yüklemez.

Plaintext secret değerleri kalıcı tarayıcı cache alanında saklanmaz. Çözülmüş değerler yalnız kullanıcı aksiyonundan sonra aktif eklenti çalışma ortamında ve kullanıcı tarafından istenen clipboard işlemleri sırasında bulunur.

Normal kurulum ve güncellemeler için Chrome Web Store listelemesini ve hjkbedlaieikhkoplgpiohlaakgebobi extension ID değerini kullanın. Release ZIP yalnız release kanıtı, lab doğrulama, lokal geliştirme ve acil fallback için korunur.
```

## Privacy Practices Uyumu

Chrome Web Store Developer Dashboard privacy practices alanı [PRIVACY.md](../../PRIVACY.md), paketlenmiş eklenti davranışı ve mağaza açıklamasıyla aynı olmalıdır. Bu yüzeylerden biri çelişiyorsa submit etmeden önce public metni veya eklentiyi düzeltin.

| Store form alanı | VaultPilot cevabı |
| --- | --- |
| İşlenen data kategorileri | Personally identifiable information, authentication information ve web history. |
| Data kullanımı | Tek amaçlı kasa yardımcısı davranışı: eşleştirme, şifreli kasa senkronizasyonu, aktif site eşleştirme, kullanıcı aksiyonuyla autofill, güvenli kopyalama, kaydetme/güncelleme önerileri, bildirimler, audit event'leri ve isteğe bağlı parola sızıntısı kontrolü. |
| Data transferi | Kullanıcının yapılandırdığı VaultPilot sunucusu; yalnız kullanıcı sızıntı kontrolü isterse opsiyonel Have I Been Pwned k-anonymity range API. |
| Reklam veya profilleme | Hayır. |
| Remote code | Hayır. Tüm çalıştırılabilir eklenti mantığı Manifest V3 paketi içinde gelmelidir. |
| Limited Use disclosure | [PRIVACY.md](../../PRIVACY.md) içinde açık Limited Use beyanı korunur ve public repo ana sayfasından bir tık uzakta kalır. |

## Permission İncelemesi

Her store update öncesinde release arşivindeki paketlenmiş eklenti `manifest.json` dosyasını inceleyin ve her permission'ın görünür özellik seti için hâlâ gerekli olduğunu doğrulayın.

| Permission | Public gerekçe |
| --- | --- |
| `activeTab` | Kullanıcı aksiyonundan sonra aktif sekme context'ini okuyarak mevcut siteyi VaultPilot kayıtlarıyla eşleştirir. |
| `clipboardRead` | Korunan clipboard akışlarını ve tarayıcı izin verdiğinde gecikmeli clipboard temizlemeyi destekler. |
| `clipboardWrite` | Kullanıcı istediğinde onaylı kullanıcı adı, parola, URL, üretilmiş parola ve kasa değerlerini kopyalar. |
| `notifications` | Secret değeri göstermeden eşleştirme, erişim iptali, autofill, kaydetme/güncelleme ve güncelleme kontrolü durumlarını bildirir. |
| `scripting` | Onaylı login formlarında kullanıcı aksiyonuyla autofill ve sayfa etkileşimi sağlar. |
| `storage` | Onaylı server origin, dil tercihi, cihaz durumu ve PIN ile sarılmış eşleştirme materyalini saklar. |
| `tabs` | Kayıt eşleştirme ve badge güncelleme için aktif sekme URL/host context'ini okur. |
| `http://*/*`, `https://*/*` host permissions | Kurumun onayladığı web app'lerde login formu tespiti ve aktif site eşleştirme sağlar. Autofill ve kaydetme/güncelleme arbitrary customer domain'lerde çalışmak zorunda olduğu sürece bu geniş host scope korunur. |

Gelecek planlar için permission istemeyin. Yeni permission ancak özellik hazırsa, dokümante edildiyse ve net kullanıcıya dönük gerekçesi varsa eklenmelidir.

## Paket Audit Komutları

Chrome Web Store yüklemesinden önce bu komutları release ZIP üzerinde çalıştırın. Komutlar paketi geçici bir klasöre açar, reviewer'ın genelde istediği manifest alanlarını gösterir ve paketlenmiş dosyalarda uzaktan kod yürütme örüntüsü arar.

```powershell
$zip = ".\vaultpilot-browser-vault-extension.zip"
$auditRoot = Join-Path $env:TEMP "vaultpilot-extension-audit"
New-Item -ItemType Directory -Force -Path $auditRoot | Out-Null
Expand-Archive -LiteralPath $zip -DestinationPath $auditRoot -Force

$manifest = Get-Content (Join-Path $auditRoot "manifest.json") -Raw | ConvertFrom-Json
$manifest | Select-Object manifest_version,version,name,permissions,host_permissions

Get-ChildItem -LiteralPath $auditRoot -Recurse -File |
  Select-String -Pattern 'eval\(|new Function\(|importScripts\(|https?://.*\.js|WebAssembly\.compile'
```

Remote-code aramasının boş dönmesi beklenir. Eşleşme varsa submit etmeden önce dosyayı inceleyin; gerekiyorsa bu sayfayı, inceleme KB'sini ve eklenti paketini birlikte güncelleyin.

## Görsel Dosyalar

| Asset | Gerekli durum |
| --- | --- |
| Store icon | 128 x 128 PNG. Screenshot değil, VaultPilot eklenti ikonu kullanılmalı. |
| Ekran görüntüleri | En az bir 1280 x 800 screenshot; toplam en fazla beş. Yalnız yayına uygun hale getirilmiş sentetik veri kullanın. |
| Small promo tile | Yayıncı hesabı istiyorsa 440 x 280 PNG veya JPEG. |
| Marquee promo tile | 1400 x 560 PNG veya JPEG; opsiyonel. |
| Localized screenshot'lar | Yalnız eklenti locale'i ve screenshot metni seçili store locale ile eşleşiyorsa İngilizce/Türkçe screenshot kullanın. |

Gerçek kasa kaydı, müşteri hostname'i, kullanıcı adı, log, token, lisans değeri, internal URL veya support ticket içeren screenshot yüklemeyin.

## Submission Kontrol Listesi

1. Release arşivinde extension version `1.3.2` veya hedef yeni sürüm olduğunu doğrulayın.
2. Listing'in hâlâ `hjkbedlaieikhkoplgpiohlaakgebobi` extension ID kullandığını doğrulayın.
3. Developer Dashboard privacy practices alanını [PRIVACY.md](../../PRIVACY.md) ile karşılaştırın.
4. Paketlenmiş `manifest.json` permissions ve host permissions değerlerini yeniden kontrol edin.
5. Yüklemeden önce paketlenmiş eklentide uzaktan çalıştırılabilir kod örüntüsü arayın.
6. Screenshot'ların yayına uygun hale getirildiğini ve submit edilen VaultPilot release UI ile eşleştiğini doğrulayın.
7. Public repo release notes ve browser-extension docs metnini gönderilen sürümle aynı çizgide tutun.
8. Bu repodan publish yapmayın. Store submission Chrome Web Store publisher hesabı gerektirir.

## Doğrulama

Mağaza kaydını etkileyen public docs değişikliklerini commit etmeden önce:

```powershell
npm run validate
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

Dış referanslar:

- [Chrome Web Store listing information](https://developer.chrome.com/docs/webstore/cws-dashboard-listing)
- [Chrome Web Store privacy fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)
- [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies/policies)

İlgili:

- [Tarayıcı eklentisi rehberi](browser-extension.md)
- [Güncelleme Merkezi](update-center.md)
- [Yayın dosyası doğrulama](release-asset-verification.md)
- [Public keşfedilebilirlik](public-discoverability.md)
- [Public external surface drift](public-external-surface-drift.md)
- [Chrome Web Store review KB](../../kb/tr/chrome-web-store-review.md)
- [Privacy policy](../../PRIVACY.md)
