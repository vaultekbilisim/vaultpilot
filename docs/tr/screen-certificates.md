# Sertifikalar Ekranı

Üst çubuktaki `?` simgesi Sertifikalar ekranına ait bu rehberi açar. Bu ekran, seçili kasada tutulan sertifika, sertifika paketi ve özel anahtar kayıtları içindir. VaultPilot sunucusunun HTTPS sertifikasını kurmaz veya değiştirmez; canlı yayın sertifikası **Sunucu ayarları** içindeki ayrı akıştan yönetilir.

Denetçi rolü gizli kayıtlara ve kasa anahtarına erişemez. Sahip, Yönetici ve Kullanıcı rolleri yalnız kendilerine açılmış kasaları kullanır. Seçili kasadaki **Görüntüleyici** kayıt meta verisini ve parmak izini okuyabilir; uygun materyal varsa tarayıcıda üretilen zincir paketini veya parola korumalı PFX'i dışa aktarabilir. Sertifika kartları ham materyali göstermez, ham değeri kopyalamaz ve içe aktarılan özgün dosyayı indirmez. **Düzenleyici** ile kasa **Yöneticisi**, lisans yazılabilir durumdayken kayıt oluşturabilir, çoğaltabilir, düzenleyebilir ve silebilir.

## Burada Ne Yapılır

- **Sertifikalarda ara** ile başlık, sahip/servis, uç nokta, kategori, etiket, imzalayan, Subject/CN ve seri numarası içinde arayın.
- **Yenileme**, **Süresi doldu**, **Tarih yok** ve **İptal / pasif** hızlı filtrelerini; geçerlilik aralığı, sertifika otoritesi ve organizasyon gibi akıllı filtrelerle birleştirin. Hızlı filtre düğmesi yalnız ilgili kayıt sayısı sıfırdan büyükse görünür.
- Kart veya tablo görünümünü seçin ve yenile düğmesiyle seçili kasayı yeniden sorgulayın.
- Yazma yetkiniz varsa **Yeni sertifika** ile editörü açın. Ana sertifika, zincir/intermediate, private key ve PFX/P12 kaynaklarını kendi alanlarından ekleyin; her kaynak tek tek çıkarılabilir.
- Kart eylemleriyle ayrıntıları açın, güvenli meta veriyi veya parmak izini kopyalayın, mevcut materyalden zincir paketi/PFX üretin ya da menüden kayıt kopyası oluşturun, düzenleyin ve silin.

## Ekranı Nasıl Okumalısınız

Liste satırı başlığı ve son güncelleme zamanını gösterir. İçe aktarılmış kayıtlarda kaynak rolleri, biçim ve boyut, kalan süre, Subject/CN, imzalayan ve SHA-256 özetinin kısa bölümü de görünebilir. Bunlar kasa açıldıktan sonra kaydı tanımlayan meta verilerdir; sertifika gövdesi, özel anahtar veya paket içeriği değildir.

**Sertifika ayrıntılarını aç** yan paneli kaynak, risk, kayıt durumu, hesap/servis, hedef, kategori, sahip, etiket ve son güncelleme gibi bağlamı gösterir. Gizli materyali veya özgün dosyayı açığa çıkarmaz.

**Meta veriyi kopyala** ve **Parmak izini kopyala** yalnız sertifikayı tanımlayan güvenli metni panoya alır. Dışa aktarım, içe alınan ham dosyayı geri vermez: tarayıcı, kayıtta gerçekten bulunan ve doğrulanan materyalden yeni bir zincir paketi veya PFX oluşturur. Bu sınır private key'in yanlışlıkla ham dosya içinde dışarı çıkmasını engeller.

### Meta veri ile gizli materyal sınırı

Başlık, sahip/servis, uç nokta, not, geçerlilik tarihi, Subject/CN ve sertifika otoritesi sınıflandırması kasa açıkken görünür kayıt bağlamıdır. Bunlar da şifreli kayıt yükünde saklanır, ancak görüntülenmeleri için ayrıca gizli değeri gösterme onayı gerekmez.

Sertifika editörü dört ayrı kaynak rolünü birlikte yönetir: ana sertifika, zincir/intermediate, private key ve PFX/P12 kimlik paketi. Her role birden fazla kaynak eklenebilir ve her kaynak diğerlerini etkilemeden çıkarılabilir. VaultPilot kaynakları gerçek kriptografik ayrıştırmadan geçirir; X.509 sertifikalarını, PKCS#7 zincirlerini, PFX/P12 paketlerini ve desteklenen RSA, EC ile RFC 8410 anahtarlarını tanır. Şifreli PFX/P12, PKCS#8 veya geleneksel PEM anahtarı için ilgili kaynağın yanında ayrı **Kaynak parolası** alanı açılır; parola başlık, not, API meta verisi, denetim kaydı veya log içine yazılmaz.

**Parolayı bu kasada şifreli sakla** varsayılan olarak kapalıdır. Açılırsa yalnız kriptografik çözümlemede gerçekten kullanılan kaynak parolası kasa anahtarıyla şifrelenen kayıt payload'ında tutulur. Yanlışlıkla şifresiz kaynağa yazılan bir değer saklanmaz. Seçenek kapalıysa parola yalnız o tarayıcıdaki doğrulama işlemi boyunca bellekte kalır ve kilit, oturum, kullanıcı veya kasa değişiminde temizlenir.

Private key tek başına sertifika kaydı oluşturamaz. VaultPilot geçerli bir X.509 sertifikası ister ve anahtarın sertifikayla eşleşmesini kaydetmeden önce doğrular. Zincirde bulunmayan issuer, intermediate veya root internetten aranmaz ve uydurulmaz.

Sertifika otoritesi kartlarında sağlayıcı adı, sinyal açıklaması ve erişim biçimi etiketi gösterilir. Bir kart seçildiğinde önceki tanınan sertifika otoritesi etiketi değiştirilir, kategori `Certificate` yapılır, kaynak boşsa `manual` atanır ve `certificate` etiketiyle seçilen otorite etiketi eklenir. DigiCert, GoDaddy, GlobalSign, Let’s Encrypt, Microsoft CA veya Self-signed seçmek dış hizmete bağlanmaz; sertifika düzenleme, yenileme, yeniden anahtarlama veya iptal işlemi başlatmaz.

## Önerilen İş Akışları

### Dosyadan sertifika kaydı oluşturma

1. Yazma yetkili kasayı açıp **Yeni sertifika** seçeneğini kullanın.
2. Zorunlu başlığı girin; sahip/servis ile ilgili uç noktayı kayıt bağlamı olarak doldurun.
3. Ana sertifikayı, zincir dosyalarını, private key'i ve varsa PFX/P12 paketini kendi kaynak alanlarından ekleyin. PEM, CRT, CER, DER, P7/P7B/P7C/CMS, PFX/P12/PKCS12, P8/P8E/PK8, PKCS#1, PKCS#8 ve KEY desteklenir; kayıt başına en fazla 16 kaynak ve toplam 10 MB kabul edilir.
4. Parola korumalı her kaynağın yanında o dosyaya ait parolayı girin. Parolaları kalıcı tutmanız gerekmiyorsa **Parolayı bu kasada şifreli sakla** seçeneğini kapalı bırakın.
5. Doğrulama sonucunda en az bir gerçek X.509 sertifikası bulunduğunu, private key eşleşmesini, zincir durumunu, dosya adı/biçim/boyutunu, SHA-256 değerini, Subject/issuer ve geçerlilik tarihlerini kontrol edin.
6. Gerekirse işletim bağlamı alanlarını tamamlayıp kaydı saklayın. Yanlış parola, okunamayan anahtar, eşleşmeyen private key, kaynaksız kayıt veya limit aşımı düzeltilmeden kayıt oluşturulmaz.

Meta veriler dosya adından veya serbest metin etiketlerinden tahmin edilmez; ayrıştırılan X.509 sertifikasından çıkarılır. VaultPilot private key'in public key bilgisini ana sertifikayla kriptografik olarak karşılaştırır. Yanlış parola, bozuk paket, desteklenmeyen şifreleme veya eşleşmeyen anahtar doğrulamayı durdurur.

### Kaydı düzenleme veya materyali yenileme

PEM biçimindeki ana sertifika, zincir veya private key metin olarak da eklenebilir; yine aynı ayrıştırma ve anahtar eşleşmesi kuralları uygulanır. Mevcut kaydı **Düzenle** ile açtığınızda yeni kaynağı doğru role ekleyin, doğrulama sonucunu kontrol edin ve artık kullanılmayan kaynağı kendi kaldırma düğmesiyle çıkarın. Kayıt en az bir gerçek X.509 sertifikası olmadan kaydedilmez.

Yenileme incelemesinde önce **Yenileme**, **Süresi doldu** ve **Tarih yok** filtrelerini kontrol edin; gerekirse geçerlilik aralığı veya sertifika otoritesi filtresi ekleyin. Yenilemeyi ilgili sertifika otoritesi ya da kurum sürecinde tamamlayın. Yeni dosya hazır olduğunda mevcut kaydı **Düzenle** üzerinden güncelleyin; sınıflandırma kartının yenileme yapmadığını unutmayın.

### Meta veri kopyalama ve güvenli dışa aktarım

Karttaki kopyalama eylemleri sertifika meta verisi ve parmak iziyle sınırlıdır. Sertifika gövdesi, private key, kaynak parolası veya özgün kaynak dosyası için gösterme ya da doğrudan kopyalama eylemi yoktur.

**Zincir paketi / PFX indir**, yalnız kayıtta gerçekten bulunan sertifika ve zincirden PEM/CRT, DER/CER, P7B/P7C, `chain.pem`, `fullchain.pem`, manifesto ve SHA-256 listesini tarayıcıda üretir. Eşleşen tek bir private key varsa yeni, en az 12 karakterli dışa aktarım parolası ister ve parola korumalı PFX/P12 ile şifreli PKCS#8 çıktısı ekler; bu yeni parola kaydedilmez. Private key içerebilecek özgün dosyalar ZIP'e değişmeden kopyalanmaz. Eski kayıtta gerçek kaynak materyali yoksa format veya zincir uydurulmaz; kaynağı yetkili kanaldan yeniden içe aktarın.

### Yaşam döngüsü uyarıları

Yaşam döngüsü izleyicisi kayıt başlığındaki elle girilmiş tarihi değil, leaf ile ona bağlı intermediate/root üyeleri arasında en erken sona erecek gerçek sertifikayı esas alır. Zincir dışı (`UNLINKED`) üyeler ayrıntıda bilgi amacıyla gösterilir ancak alarm tarihini veya risk durumunu değiştirmez. `notAfter` anına ulaşıldığı anda sertifika süresi dolmuş sayılır. **15, 7, 3 ve 1 gün kaldı** ile **süresi doldu** eşikleri ayrı olaylardır; aynı eşik için yinelenen bildirim üretilmez.

Tarama istemci tarafında çözülen kasa verisine ihtiyaç duyduğu için yalnız yetkili kullanıcı oturumu açık ve ilgili kasalar kilidi açılmışken çalışabilir. Kilitli veya açılamayan kasa için içerik, kayıt adı ya da hata ayrıntısı sızdırılmaz; sonuç yalnız taranan, uyarı üreten ve güvenle atlanan kasa/kayıt sayılarını gösterir. Bir kasadaki hata diğer açık kasaların taranmasını durdurmaz.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Yükleniyor | İskelet satırlar tamamlanmadan sonuç çıkarmayın. |
| Kayıt yok | Yazma yetkiniz varsa ilk kaydı oluşturun; yoksa doğru kasa ve rolü doğrulayın. |
| Eşleşme yok | Aramayı ve aktif akıllı filtreleri temizleyin. |
| Geçerli | Kalan süreyi, kullanılan uç noktayı ve yenileme sorumlusunu yine de doğrulayın. |
| Yaşam döngüsü eşiğinde | 15, 7, 3 veya 1 gün kalan en erken zincir üyesini kurumun yenileme sürecine alın. |
| Süresi doldu | Materyali kullanıma vermeyin; kaynak durumunu ve yerine geçen sertifikayı doğrulayın. |
| Tarih yok | Bitiş tarihini yetkili kaynaktan tamamlayın; boş değeri sınırsız geçerlilik saymayın. |
| İptal / pasif | Kaydı etkin sertifika gibi kullanmayın; kaynak sistemle uzlaştırın. |
| Sertifika okunuyor | İçe aktarım bitmeden kaydetmeyin veya ikinci dosya seçmeyin. |
| Dosya çok büyük / okunamadı | 10 MB sınırını ve desteklenen biçimi doğrulayın; dosyayı açık kanala yüklemeyin. |
| Dışa aktarım kapalı | Doğrulanmış kaynak materyali eksiktir veya anahtar eşleşmiyordur; yetkili kaynaktan yeniden içe aktarın. |
| Yazma kapalı | Kasa rolünü ve lisansın salt okunur durumunu kontrol edin. |

## İşlemden Önce

- Seçili kasayı ve kasa rolünüzün yapmak istediğiniz işleme izin verdiğini doğrulayın.
- Kayıt yazmadan önce lisansın salt okunur olmadığını kontrol edin.
- İşlemin kasa kaydını mı yoksa sunucunun canlı HTTPS sertifikasını mı hedeflediğini kesinleştirin.
- Dosya kaynağını, beklenen SHA-256 özetini, Subject/CN bilgisini, imzalayanı ve bitiş tarihini güvenilir kanaldan doğrulayın.
- Meta veri/parmak izi kopyalama ile zincir paketi/PFX dışa aktarımının denetim kaydında izlenebileceğini hesaba katın.
- Toplu kategori, etiket, arşivleme, pasifleştirme, not, düzenleme ve silme eylemlerinin Düzenleyici/Yönetici kasa rolü istediğini doğrulayın.

## Güvenli Kanıt

- **Paylaşılabilir:** sertifika durum sınıfı, genel geçerlilik aralığı, dosya biçimi ve boyutu, sertifika otoritesi sınıfı ve SHA-256 özetinin kısa bölümü.
- **Gizli kalmalı:** sertifika veya özel anahtar materyali, özgün PEM/KEY/PFX/P12 paketi, paket parolası, tam seri numarası ve parmak izi, iç sistem adı, tam Subject/issuer bilgisi, müşteri uç noktası ve açık kayıt ekran görüntüsü.
- Desteğe gönderilen görüntüde başlık, sahip/servis, URL, Subject/CN, imzalayan ve tam SHA-256 değerini maskeleyin.
- Özel anahtar veya paket parolası açığa çıktıysa kopyalama ve yeniden paketlemeyi bırakıp kurumun olay müdahale ve sertifika otoritesi sürecini özel kanaldan başlatın.

## Ne Zaman Durmalı ve Destek İstemelisiniz

Dosyanın SHA-256 özeti beklenen değerle uyuşmuyorsa, Subject/issuer veya bitiş tarihi kaynak kayıttan farklıysa, private key eşleşmiyorsa, kaynağın yetkisi doğrulanamıyorsa ya da kasa kaydı canlı sunucu sertifikası sanılıyorsa durun. Gizli materyali göndermeden; kayıt kimliği, genel biçim ve boyut, kısa SHA-256 bölümü, hassas ayrıntıları çıkarılmış hata ve denenen adımlarla özel destek kaydı açın.

## Operatör Notları

Kasa sertifika kaydı bir dağıtım aracı veya sertifika otoritesi istemcisi değildir. Dosya içe aktarmak VaultPilot sunucusunun HTTPS bağını değiştirmez; canlı yayın sertifikası yalnız **Sunucu ayarları** akışında yönetilir. Yaşam döngüsü taraması uyarı üretir; sertifikayı otomatik yenilemez, yeniden anahtarlamaz, iptal etmez veya dağıtmaz.

## İlgili

- [Sertifika Paneli ekranı](screen-certificate-dashboard.md)
- [Sunucu ayarları ekranı](screen-server-settings.md)
- [Genel erişim adresi ve HTTPS](public-host-https-certificate.md)
