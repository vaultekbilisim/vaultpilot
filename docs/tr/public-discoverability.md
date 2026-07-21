# Public Keşfedilebilirlik

Bu sayfa public repoyu GitHub keşfi, Google Search ve AI/LLM context yüzeyleri için hazırlarken kullanılır. Bu bir sıralama vaadi değildir; bakım kontrol listesidir. Amaç, public VaultPilot yüzeyinin kolay anlaşılmasını sağlamak ve private ürün source'u, müşteri verisi, release binary'leri veya reuse hakkı burada yayınlanıyormuş gibi bir izlenim oluşturmamaktır.

## Bu Repoda Kontrol Edilenler

| Yüzey | Kaynak | Gerekli durum |
| --- | --- | --- |
| İlk ekran | `README.md` | Güncel release, doküman, KB, güvenlik, destek, public sınır ve release güven yolu derin scroll gerektirmeden görünür. |
| Public metadata dili | [GitHub repo profili](github-repository-profile.md), [public dil sözlüğü](public-language-glossary.md) | Ürün adı, PassMan compatibility ifadesi, issue girişi ve destek dili tutarlı kalır. |
| Social preview asset'i | `assets/visuals/social-preview.png` | Repo içindeki PNG kullanılır. Yeniden üretilirse 1280 x 640 hedeflenir, 1 MB altında tutulur ve müşteri verisi kullanılmaz. |
| AI/LLM indeksi | `llms.txt` | Kanonik public sayfalar listelenir; secret, account verisi, müşteri context'i veya private-source path eklenmez. |
| Operatör dokümantasyonu | [Dokümantasyon gateway](../README.md) | İngilizce ve Türkçe dosya adları eşleşmiş kalır; public linkler öngörülebilir olur. |

## GitHub Hesap Kontrol Listesi

Bu yüzeyler repository owner erişimi gerektirir. Owner hesap tarafı güncellemeyi onaylamadıkça yalnızca docs değişikliğiyle tamamlanamaz.

| Yüzey | Gerekli değer veya kural |
| --- | --- |
| Repo adı | `vaultpilot` |
| Açıklama | VaultPilot Enterprise Vault Console için public release hub, operatör wiki, bilgi bankası ve destek sınırı. |
| Homepage | Kanonik public homepage olarak `https://github.com/ucsahinn/vaultpilot#readme` kullanılır. Latest-release çağrıları README ve release dokümanlarının içinde kalır. |
| Topics | `vaultpilot`, `password-manager`, `secrets-manager`, `zero-knowledge`, `self-hosted`, `windows-server`, `msi`, `enterprise-security`, `browser-extension`, `active-directory`, `documentation` ve `knowledge-base` gibi keşif topic'leri korunur. GitHub topic'leri küçük harf, sayı ve tire kullanmalı; her topic 50 karakteri geçmemeli ve en fazla 20 topic kullanılmalıdır. |
| Social preview | Repository settings içinde `assets/visuals/social-preview.png` yüklenir veya seçilir. |
| Security policy | GitHub security policy açık kalır ve `SECURITY.md` dosyasına yönlenir. |
| Issues ve discussions | Owner secret, log, müşteri verisi ve eksik redaction riskini modere edemiyorsa kapalı kalır. Issues açılırsa giriş yalnızca public template'lerle sınırlanır. |
| Lisans | Owner onaylı root `LICENSE` veya `LICENSE.md` eklenene kadar open-source statüsü vaat edilmez. |
| Chrome Web Store listing | Başlık, özet, screenshot ve privacy dili bu repoyla uyumlu tutulur; güncelleme git'ten değil Chrome Web Store hesabından yapılır. |

Owner onayı gerektiren dış yüzey farklarını, account-side değişiklik istemeden önce [Public external surface drift](public-external-surface-drift.md) içinde takip edin.

`package.json` keywords alanı, lokal tooling ve review için tercih edilen GitHub topic setini yansıtır. GitHub repository topics değerlerini değiştirmez; gerçek public topic'ler repository settings içinde veya public GitHub sayfasında kontrol edilmelidir.

## LLM İndeks Kuralları

`llms.txt`, `/llms.txt` tarzı dosyaları okumayı seçen araçlar için kürasyonlu bir Markdown indeksidir. Kısa, link odaklı ve güvenli kalmalıdır:

- Tek H1, kısa blockquote özet ve sınırlı sayıda H2 bölümle başlayın.
- Araçların tüm repoyu yüklemeden doğru sayfayı seçebilmesi için kısa notlu Markdown linkleri kullanın.
- Derin implementasyon detayı yerine kanonik public docs, KB sayfaları, policy dosyaları ve issue template'lerini tercih edin.
- Private-source path, lokal operatör path'i, account export, dashboard screenshot, token, release binary ve müşteri kanıtını dosya dışında tutun.
- `llms.txt` yalnızca keşfedilebilirlik yardımıdır. İzin vermez, crawling engellemez, `robots.txt` yerine geçmez, bu dokümantasyon setini değiştirmez ve SEO ranking garantisi oluşturmaz.

## Google Search Ve AI Sınırları

- Google Search görünürlüğü yalnızca repo içeriğiyle garanti edilemez. İyi public dokümantasyon crawler'ların ve okuyucuların projeyi anlamasına yardım eder; indexing ve ranking dış sonuçlardır.
- Lighthouse, rendered metadata, structured data, Core Web Vitals, robots/canonical/hreflang ve sitemap davranışı lokal repository Markdown'ından kanıtlanamaz. Bunlar canlı rendered URL gerektirir; Search Console ve field Core Web Vitals verileri ayrıca yeterli trafik verisi olan uygun verified property gerektirir.
- Root README'nin ilk paragrafları tek başına anlaşılır kalmalıdır. Search sonuçları, social preview'lar ve AI özetleri çoğu zaman erken sayfa context'ini kullanır.
- Kritik ürün sınırlarını yalnızca görsellerin içinde bırakmayın. Source sınırı, release teslim yolu ve destek kanıt kuralları metinde de tekrar edilmelidir.
- `llms.txt`, onu okumayı seçen araçlar için indeks yüzeyidir. Yetki sınırı, privacy kontrolü veya public dokümantasyonun yerine geçen bir kaynak değildir.
- Keşfedilebilirlik için private source path, lokal operatör path'i, müşteri hostname'i, account identifier, token, lisans değeri, database adı, gerçek kayıt içeren screenshot veya support log eklemeyin.

## Opsiyonel Search Console Kontrolü

Bunu yalnız repository owner Google indexing kanıtı istiyorsa çalıştırın. Normal docs yayını için zorunlu değildir:

1. Private veya signed-out browser açın ve `site:github.com/ucsahinn/vaultpilot VaultPilot` aramasını yapın.
2. Result title ve snippet değerlerinin private source code, release binary, müşteri verisi veya license terms git içinde yayınlanıyormuş gibi görünmediğini doğrulayın.
3. Public repo sayfasını açıp README, social preview, release linki, support sınırı ve Chrome Web Store linkinin hesap erişimi olmadan render edildiğini doğrulayın.
4. Owner public VaultPilot docs domain'i veya deployed public site için verified Search Console property kontrol ediyorsa URL Inspection'ı yalnız o verified property içindeki URL'ler için kullanın ve yalnız public result summary bilgisini kaydedin. GitHub repository path'inin owner tarafından verify edilip Search Console içinde açılamadığı sürece inspect edilebilir olduğunu ima etmeyin.
5. Search Console ownership file, verification token, analytics tag, account export veya account identifier gösteren screenshot commit etmeyin.

## Repo Dışı Takip

| Kalem | Neden gated |
| --- | --- |
| GitHub topics, açıklama, homepage, social preview, Issues, Discussions ve security policy ayarları | Bunlar hesap tarafı repository ayarlarıdır. |
| GitHub Release açıklamaları ve asset listeleri | Normal doküman dosyası değil, release kaydıdır. |
| Chrome Web Store listing metni ve screenshot'ları | Chrome Web Store publisher erişimi gerektirir. |
| Search Console veya analytics doğrulaması | Hesap erişimi gerektirir ve public docs reposunun kendisi için zorunlu değildir. |

## Doğrulama

Public keşfedilebilirlik değişiklikleri yayınlanmadan önce:

```powershell
npm run validate
git diff --check
gitleaks detect --no-git --redact --verbose --source .
```

Dosyalar git index içinde hazırlanmışsa ayrıca:

```powershell
npm run validate:staged
```

Dış referanslar:

- [GitHub repository topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)
- [GitHub social media preview](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview)
- [GitHub licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)
- [Google Search SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Console URL Inspection](https://support.google.com/webmasters/answer/9012289)
- [Google Search Console Core Web Vitals report](https://support.google.com/webmasters/answer/9205520)
- [Lighthouse structured data manual check](https://developer.chrome.com/docs/lighthouse/seo/structured-data)
- [llms.txt proposal](https://llmstxt.org/)

İlgili sayfalar:

- [GitHub repo profili](github-repository-profile.md)
- [Public external surface drift](public-external-surface-drift.md)
- [Public dil sözlüğü](public-language-glossary.md)
- [Public repo sınırı](public-repository-boundary.md)
- [Destek kanıt paketi](support-evidence-pack.md)
- [Güvenlik politikası](../../SECURITY.md)
