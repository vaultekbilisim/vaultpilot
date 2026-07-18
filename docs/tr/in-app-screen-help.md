# Uygulama İçi Ekran Yardımı

VaultPilot'ta oturum açtıktan sonra gördüğünüz her çalışma ekranının üst çubuğunda bir `?` düğmesi bulunur. Bazı dashboard menülerinde aynı bağlantı **Dokümanı aç** adıyla gösterilir. Her iki seçenek de bulunduğunuz ekranı ve seçili dili dikkate alarak ilgili yardım sayfasını yeni sekmede açar.

Bu sayfalar ürün tanıtımı değildir. Bir işlemi yapmadan önce hangi bilginin hazır olması gerektiğini, ekrandaki durumların ne anlama geldiğini, güvenli biçimde nasıl ilerleyeceğinizi ve sorun yaşadığınızda hangi kanıtları paylaşabileceğinizi anlatan operatör rehberleridir.

## Doğru Yardım Sayfasını Bulma

Aşağıdaki tabloda ekrandaki adı, açılan belgeyi ve belgeye hangi durumda başvurmanız gerektiğini görebilirsiniz. Yardım sayfasını doğrudan bu listeden açtıysanız işlem yapmadan önce uygulamada doğru ekran ve sekmede olduğunuzu kontrol edin. Ekrandaki değerler ile belgedeki açıklama uyuşmuyorsa gizli bilgi içermeyen bir ekran özetiyle dokümantasyon bildirimi açın; belgedeki varsayıma dayanarak üretim ayarını değiştirmeyin.

<a id="contextual-help-routing"></a>

### Bağlama göre yardım yönlendirmesi

Bazı sekmeler ve kayıt bağlamları, genel çalışma alanı belgesi yerine doğrudan ilgili bölümü açar:

- **Entegrasyonlar > Tarayıcı eklentisi** açıkken `?`, genel Entegrasyonlar belgesi yerine [Tarayıcı Eklentisi Ekranı](screen-browser-extension.md) yardımını açar.
- **Entegrasyonlar > Active Directory** açıkken `?`, [Entegrasyonlar](screen-integrations.md#active-directory-agent) belgesinin ajan bölümünü açar.
- **Görevler > Zamanlanmış** açıkken `?`, [İşlemler](screen-executions.md#scheduled-operations) belgesinin zamanlanmış işler bölümünü açar.
- **Sunucu Ayarları > Genel** açıkken `?`, [Sunucu Ayarları](screen-server-settings.md#general-settings) belgesinin genel ayarlar bölümünü açar.
- **Sunucu Ayarları > Giriş güvenliği** açıkken `?`, genel Sunucu Ayarları belgesi yerine [Giriş Güvenliği Ekranı](screen-sign-in-security.md) yardımını açar.

Kayıt ayrıntısından veya Active Directory kartından **Ajana git** seçildiğinde uygulama **Entegrasyonlar > Active Directory** sekmesine geçer ve ilgili sağlayıcıyı öne çıkarır. Bu geçiş yeni ajan oluşturmaz, eşitleme başlatmaz ve açık kaydı değiştirmez.

<a id="scoped-workspace-refresh"></a>

### Üst çubuktaki yenileme düğmesi

Üst çubuktaki yenileme düğmesi tarayıcı sayfasını yeniden yüklemez. Yalnız o anda görünen ekranın ve seçili sekmenin verisini tazeler. Örneğin **Görevler > Zamanlanmış** açıkken çalışan iş listesi, **Entegrasyonlar > Active Directory** açıkken API istemcileri, başka bir sunucu ayarı sekmesi açıkken ilgisiz ayarlar yenilenmez. Yerel arama ve filtreler, açık formlar ve kasa kilit durumu korunur.

Birden çok alanı doğrulamanız gerekiyorsa her ekrana geçip o ekranı ayrı yenileyin. Bu düğmeyi tüm sunucu durumunu yeniden yükleyen veya servisi yeniden başlatan bir işlem olarak yorumlamayın.

| Ekran | Yardım sayfası | Bu belgeyi ne zaman kullanmalısınız? |
| --- | --- | --- |
| Güvenlik Komuta Merkezi | [Güvenlik Komuta Merkezi](screen-security-command-center.md) | Birden fazla operasyon sinyali varken önce hangisine müdahale edeceğinizi belirlerken. |
| Güvenlik dashboard'u | [Güvenlik Dashboard](screen-security-dashboard.md) | 2FA, kullanıcı, lisans ve denetim sinyallerini birlikte yorumlarken. |
| Etki Alanı dashboard'u | [Etki Alanı Dashboard](screen-domain-dashboard.md) | Dizin bağlantısı, agent sağlığı ve yönetilen hesap durumunu incelerken. |
| Sertifika Paneli | [Sertifika Paneli](screen-certificate-dashboard.md) | Süresi dolan, yaklaşan veya ana bilgisayarla eşleşmeyen sertifikaları önceliklendirirken. |
| Rotasyon | [Rotasyon Dashboard](screen-rotation-dashboard.md) | Parola ve anahtar yenilemelerini sahiplik ve son kullanım bilgisiyle planlarken. |
| Yeni kayıt | [Yeni Kayıt](screen-new-item.md) | Doğru kayıt türünü seçip güvenli bir kayıt oluşturmadan önce. |
| Parolalar | [Parolalar](screen-passwords.md) | Kullanıcı adı ve parola içeren giriş kayıtlarını ararken, düzenlerken veya kopyalarken. |
| API anahtarları | [API Anahtarları](screen-api-keys.md) | Token ve API kimlik bilgilerini kaydederken, yenilerken veya kullanım dışı bırakırken. |
| Güvenli notlar | [Güvenli Notlar](screen-secure-notes.md) | Hassas operasyon notlarını anlaşılır, sınırlı ve aranabilir biçimde tutarken. |
| Sertifikalar | [Sertifikalar](screen-certificates.md) | Sertifika meta verisini veya şifreli sertifika paketini kaydederken. |
| Dosyalar | [Dosyalar](screen-files.md) | Onaylı hassas dosyaları kasaya eklerken, indirirken veya temizlerken. |
| Active Directory kayıtları | [Active Directory Kayıtları](screen-active-directory-records.md) | Dizin kaynaklı hesapların sahiplik, risk ve eşitleme durumunu incelerken. |
| Paylaşım | [Paylaşım](screen-sharing.md) | Dahili veya harici paylaşım hazırlarken, kullanım sınırı koyarken ya da paketi iptal ederken. |
| Giriş güvenliği | [Giriş Güvenliği](screen-sign-in-security.md) | 2FA, oturum, otomatik kilit ve hesap kurtarma etkilerini değerlendirirken. |
| Discovery | [Discovery](screen-discovery.md) | Yetkili kapsamda maruziyet taraması çalıştırırken ve doğrulanmış bulguları içe aktarırken. |
| Kullanıcılar | [Kullanıcılar](screen-users.md) | Hesap, rol, giriş erişimi veya 2FA durumunda değişiklik yaparken. |
| Lisans | [Lisans](screen-license.md) | Lisansın hangi özellikleri açtığını, deneme veya salt okunur durumunu anlamaya çalışırken. |
| Denetim kaydı | [Denetim Kaydı](screen-audit-log.md) | Bir işlemin kim tarafından ve ne zaman yapıldığını araştırırken ya da olay zaman çizelgesi hazırlarken. |
| Entegrasyonlar | [Entegrasyonlar](screen-integrations.md) | API istemcisi, dizin bağlantısı veya genel entegrasyon sağlığını yönetirken. |
| Bildirimler | [Bildirimler](screen-notifications.md) | Hangi olayların kime iletileceğini belirlerken veya teslimat sorununu incelerken. |
| İşlemler | [İşlemler](screen-executions.md) | Devam eden, tamamlanan, başarısız olan veya takıldığı düşünülen işleri izlerken. |
| Güncellemeler | [Güncellemeler](screen-updates.md) | Bir sürümü denetlerken, güncelleme başlatırken veya yeniden başlatma sonrasını doğrularken. |
| Sunucu ayarları | [Sunucu Ayarları](screen-server-settings.md) | Erişim, HTTPS, SMTP, bakım, yedek veya saklama ayarlarını değiştirirken. |
| Tarayıcı eklentisi | [Tarayıcı Eklentisi](screen-browser-extension.md) | Tarayıcı cihazı eşlerken, isteği onaylarken veya cihaz erişimini kaldırırken. |

## Herkese Açık Belgelerde Güvenlik Sınırı

Bu yardım sayfaları herkese açık GitHub deposunda tutulur. Örnek verirken yalnızca yer tutucu veya sentetik veri kullanın. Gerçek kasa içeriğini, parola ya da token değerini, `.pfx`/`.p12` paketini, özel anahtarı, sertifika parolasını, kimlik bilgisi içeren logu, API istemci gizli anahtarını, lisansın özel materyalini, müşteri adını, iç IP/ana bilgisayar adını veya müşteriye ait ekran görüntüsünü bu belgelere ve herkese açık issue'lara eklemeyin.

Bir yardım belgesinin hatalı veya eksik olduğunu bildirmeniz gerekiyorsa ekran adı, VaultPilot sürümü, görünen durum etiketi ve redakte edilmiş hata özetini paylaşın. Sorunu anlatmak için gizli değer gerekiyorsa herkese açık kanalı kullanmayın; kurumunuzun onaylı özel destek sürecine geçin.

## İlgili Belgeler

- [Dokümantasyon ana sayfası](../README.md)
- [Herkese açık depo sınırı](public-repository-boundary.md)
- [Türkçe ve İngilizce terim sözlüğü](public-language-glossary.md)
- [Destek için güvenli kanıt paketi](support-evidence-pack.md)
