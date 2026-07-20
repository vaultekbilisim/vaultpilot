# GitHub Repo Profili

Bu sayfa VaultPilot public GitHub repo profilini güncel tutarken kullanılır. Amaç; ilk görünüm, metadata, issue akışı ve release linklerini ürün sınırıyla aynı çizgide tutmaktır.

Bu repo public dokümantasyon reposudur. Desteklenen release kolay bulunmalı, operatör dokümanları hızlı taranmalı ve private source sınırı net görünmelidir.

## Profil Kontrol Listesi

| Yüzey | Gerekli durum |
| --- | --- |
| Repo adı | `vaultpilot` |
| Kısa açıklama | VaultPilot Enterprise Vault Console için public release hub, operatör wiki, bilgi bankası ve destek sınırı. |
| Website veya homepage | `https://github.com/ucsahinn/vaultpilot#readme` |
| Topics | `vaultpilot`, `password-manager`, `secrets-manager`, `zero-knowledge`, `self-hosted`, `windows-server`, `msi`, `enterprise-security`, `browser-extension`, `active-directory`, `documentation`, `knowledge-base` |
| Social preview | `assets/visuals/social-preview.png` kullanılmalı. |
| Security policy | Açık olmalı ve `SECURITY.md` dosyasına yönlenmeli. |
| Issues | Owner public issue girişini açıkça etkinleştirmedikçe kapalı kalmalı. Etkinleştirilirse yalnızca redacted destek soruları ve dokümantasyon düzeltmeleriyle sınırlı olmalı. |
| Discussions | Moderasyon public thread'lerde secret, log ve müşteri verisini engelleyemiyorsa kapalı kalmalı. |
| Releases | Güncel desteklenen müşteri release'i GitHub Release `v2.0.0`. |
| Wiki | Opsiyonel; owner ayrı wiki publication akışı yürütmediği sürece kanonik içerik bu repoda kalmalı. |

## İlk Ekran Sözleşmesi

Repo açılış ekranında okuyucu aramak zorunda kalmadan şu sinyalleri görmelidir:

- Güncel desteklenen release ve indirme yolu.
- İngilizce ve Türkçe doküman girişleri.
- Bilgi bankası girişleri.
- Güvenlik politikası ve destek sınırı.
- Public repo sınırı.
- Product source code, signing material, müşteri verisi ve release binary'lerinin git'e commit edilmediği net ifade.

## Metadata Kuralları

- Yeni public ifadelerde kanonik ürün adı VaultPilot olmalıdır.
- PassMan yalnızca legacy compatibility bağlamında kullanılmalıdır.
- Owner `LICENSE` veya `LICENSE.md` eklemedikçe open-source veya reuse hakkı vaat edilmemelidir.
- Repo açıklaması private ürün source'unun burada yayınlandığı izlenimi vermemelidir.
- Release binary'leri raw git path'lerinden linklenmemeli; GitHub Releases kullanılmalıdır.
- Gerçek müşteri host'u, kullanıcı, secret adı, token, log veya support ticket gösteren screenshot kullanılmamalıdır.
- `package.json` keywords değerlerini yalnız lokal mirror olarak kullanın. GitHub repository topics değerlerini değiştirmez.

## Issue Giriş Kuralları

Public issue akışı dar tutulmalıdır:

- Redacted destek soruları, public Issues etkinse `.github/ISSUE_TEMPLATE/redacted-support.yml` ile açılır.
- Dokümantasyon düzeltmeleri, public Issues etkinse `.github/ISSUE_TEMPLATE/documentation.yml` ile açılır.
- Güvenlik sorunları private security policy yolu üzerinden bildirilir.
- Tam redakte edilemeyen kanıtlar public issue'ya değil, licensed private support kanalına gider.

## Doğrulama

Profil, template veya metadata değişikliği yayınlanmadan önce:

```powershell
npm run validate
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

Dosyalar commit için stage edildiyse ayrıca:

```powershell
npm run validate:staged
```

İlgili sayfalar:

- [Public keşfedilebilirlik](public-discoverability.md)
- [Public repo sınırı](public-repository-boundary.md)
- [Destek kanıt paketi](support-evidence-pack.md)
- [Yayın dosyası doğrulama](release-asset-verification.md)
- [Güvenlik politikası](../../SECURITY.md)
- [Katkı kuralları](../../CONTRIBUTING.md)
