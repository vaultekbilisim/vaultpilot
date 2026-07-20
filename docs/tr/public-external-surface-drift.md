# Dış Public Yüzey Farkları

Repo içeriği hazır olsa bile bazı dış public yüzeyler hâlâ repo sahibi veya publisher aksiyonu gerektirir. Git tarafında commit ve push yapılabilir, metin ve asset hazırlanabilir; fakat bu işlem GitHub repo ayarlarını, GitHub Release kayıtlarını, Chrome Web Store sayfalarını, Search Console'u veya publisher account verisini otomatik değiştirmez.

Public sayfalarda son kontrol: **2026-07-09**.

Local validation geçse bile bu satırlar açık kalabilir. Commit ve push sonrasında veya publisher dashboard gönderimi yapıldıktan sonra public URL yeniden kontrol edilene kadar her satırı owner onayı gerektiren dış yüzey işi olarak ele alın.

## Fark Kaydı

| Yüzey | Gözlenen public durum | Gerekli düzeltme | Sahip aksiyonu |
| --- | --- | --- | --- |
| Yayındaki repo README'si | Yayındaki GitHub `main` README hâlâ `Documentation Gateway`, `Knowledge Base Gateway` ve `Product Walkthrough` bölümlerini duplicate biçimde gösteriyor. Product Walkthrough hâlâ `Fresh 2.0 captures` diyor ve Offline share decrypter gibi legacy PassMan compatibility-line görsel referanslarını listeliyor; bu, yerel README'de temizlenen görsel katalogla henüz aynı çizgide değil. | Mevcut yerel README ve görsel katalog için commit ve push yapın, sonra public repo ana sayfasını oturum açılmamış bir tarayıcıdan yeniden kontrol edin. | Hazırlanan repo değişiklikleri için owner onayı ve push gerekir. |
| Canlı GitHub profili ve topic'ler | Live About text `Public release, documentation, signed update manifest, and operator support hub for VaultPilot.` olarak görünüyor. Topic'ler şu anda `enterprise`, `password-manager`, `self-hosted`, `windows-server`, `chromium-extension`, `zero-knowledge`, `security-tools`, `secrets-management`, `msi-installer`, `operator-docs` ve `vaultpilot` değerlerini içeriyor. | [GitHub repo profili](github-repository-profile.md) içindeki tercih edilen açıklama ve topic setini uygulayın: `vaultpilot`, `password-manager`, `secrets-manager`, `zero-knowledge`, `self-hosted`, `windows-server`, `msi`, `enterprise-security`, `browser-extension`, `active-directory`, `documentation` ve `knowledge-base`. | Owner onayından sonra account-side repository settings değiştirilir. |
| GitHub social preview | Repository settings `assets/visuals/social-preview.png` kullanmalıdır. Yerel kanıt: 1280 x 640 PNG, 34840 bytes, SHA-256 `6393A5701827022CFAA8566764A15D6A81884F2F99A4A701256E98AEC932B03C`. | Bu PNG'yi repository settings içinde yükleyin veya seçin; sonra public kartı ve `openGraphImageUrl` davranışını oturum açılmamış tarayıcıyla ya da auth kullanmayan public page inspection ile doğrulayın. | Owner repository settings değişikliğini yapar ve rendered social card'i yeniden kontrol eder. |
| GitHub latest release | `https://github.com/ucsahinn/vaultpilot/releases/latest` `v2.0.0` tag'ine yönleniyor. GitHub Release kaydı şu anda müşteri-facing VaultPilot notları, 2026-06-30 release tarihi, yayımlanan asset boyutları, SHA-256 değerleri, release doğrulama yönlendirmesi ve destek linkleri içeriyor. | Release-body düzeltmesi şu anda takip edilmiyor. Release asset'leri, checksum'lar, destek linkleri veya supported tag değişirse yeniden kontrol edin. | Owner aksiyonu yalnız release kaydı değişirse veya daha yeni supported release çıkarsa gerekir. |
| Chrome Web Store listing | Listing `VaultPilot Browser Vault Extension` adıyla canlı durumda; extension ID `hjkbedlaieikhkoplgpiohlaakgebobi`, sürüm `1.3.2`, güncelleme tarihi 1 Temmuz 2026. Mağaza kartında görünen kısa açıklama VaultPilot ile başlıyor; fakat yayıncı panelindeki `Detailed description` alanı hâlâ PassMan'ı güncel sunucu ve ürün adı gibi tekrar ediyor. Public details içinde size `69.07KiB`, language `English`, privacy kategorileri olarak personally identifiable information, authentication information ve web history, ayrıca `Limited Use` beyanlarını gösteriyor. | Başlık çevresi metinleri, `Detailed description`, ekran görüntüleri ve gizlilik metnini [Chrome Web Store listeleme ve privacy](chrome-web-store-listing.md) içindeki VaultPilot copy ile değiştirin. PassMan yalnız eski kurulum uyumluluğu bağlamında kalmalı; privacy kategorileri [PRIVACY.md](../../PRIVACY.md) ile hizalı kalmalıdır. | Chrome Web Store publisher dashboard (yayıncı paneli) üzerinden düzenleyip gönderin. |
| GitHub repository settings | 2026-07-09 account-side repository settings kontrolü: homepage şu anda `https://github.com/ucsahinn/vaultpilot/releases/latest` değerine gidiyor; Issues kapalı; Discussions kapalı. Repository profile değerleri, topic'ler, social preview, Issues, Discussions, security policy toggle ve homepage account-side ayarlardır. | [GitHub repo profili](github-repository-profile.md) ve [Public keşfedilebilirlik](public-discoverability.md) içindeki değerleri uygulayın; local docs kanonik homepage hedefi olarak `https://github.com/ucsahinn/vaultpilot#readme` önerir. | Owner onayından sonra repository settings değiştirin. |
| License görünümü | Public docs, onaylı root `LICENSE` veya `LICENSE.md` gelene kadar open-source veya reuse claim'i yapmaz. | Yalnız owner onaylı license dosyası ekleyin; sonra "license terms published değil" diyen dokümanları güncelleyin. | License terms owner tarafından onaylanmalıdır. |

## Yeniden Kontrol Adımları

1. Public repository home'u açın ve root README'nin görünür olduğunu, VaultPilot wording kullandığını ve eski `Fresh 2.0 captures` walkthrough notunu artık göstermediğini doğrulayın.
2. Repository About text, topics, homepage, security policy ve social preview card'i kontrol edin.
3. Latest GitHub Release URL'sini açın ve intended supported tag'e çözüldüğünü doğrulayın.
4. Release title, body, asset list, dosya adları, boyutlar ve checksum guidance'ı inceleyin.
5. Chrome Web Store listing'i açın; title, summary, detailed description, screenshot'lar, privacy data categories, support link ve version'ın current extension release ile eşleştiğini doğrulayın.
6. Görünen PassMan wording'in yalnız legacy compatibility context ile sınırlı kaldığını doğrulayın.
7. Review notlarında tarih, kontrol edilen URL'ler ve kalan account-side owner aksiyonlarını kaydedin.

## Commit Etmeyin

Account export, dashboard screenshot, browser profil verisi, raw release binary, release archive, OAuth token, verification token, Search Console dosyası, Chrome Web Store package download veya private support evidence commit etmeyin.

## Yerel Doğrulama

External değişiklikleri owner'a uygulama için göndermeden önce şunları çalıştırın:

```powershell
npm run validate
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

Daha sonra dosya stage edilirse ayrıca çalıştırın:

```powershell
npm run validate:staged
git diff --cached --check
```

İlgili: [Public repo yayın runbook'u](publication-runbook.md), [Public keşfedilebilirlik](public-discoverability.md), [GitHub repo profili](github-repository-profile.md), [Chrome Web Store listeleme ve privacy](chrome-web-store-listing.md), [Public screenshot standartları](public-screenshot-standards.md).
