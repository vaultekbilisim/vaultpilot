# Tarayıcı Eklentisi Ekranı

Üst çubuktaki `?`, **Entegrasyonlar > Tarayıcı eklentisi** sekmesi açıkken bu bağlama özel rehberi açar. Dış API veya Active Directory sekmesinde aynı düğme genel Entegrasyonlar rehberine gider. Bu ekranı Chrome Web Store kanalını incelemek, kısa ömürlü eşleştirme isteklerini onaylamak, kasa yetkisi sayılarını görmek ve onaylı tarayıcı profillerinin erişimini iptal etmek için kullanın.

## Erişim, Rol ve Lisans Sınırı

**Entegrasyonlar** menü yolu yalnız **Sahip** rolüne açıktır ve lisansın **Entegrasyon** yeteneğini ister. Tarayıcı eklentisi bu yeteneğin içindedir; yeni lisanslarda ayrı bir **Eklenti** yeteneği bulunmaz. Eski imzalı lisansında yalnız `extension` bulunan müşteriler geriye dönük olarak eklenti ekranına erişmeye devam eder, ancak bu uyumluluk Dış API veya Active Directory erişimi vermez. Yönetici, Denetçi ve Kullanıcı rolleri mevcut menüden bu yönetim paneline ulaşamaz.

Eklenti kaynağından çağrılan eşleştirme başlangıç ucu konsol oturumuyla çalışmaz; etkin bir Sahip, Yönetici veya Kullanıcı adını hedefleyebilir. Kimlik doğrulaması isteyen listeleme, onaylama ve iptal uçları Sahip, Yönetici ve Kullanıcı rollerini kabul eder, Denetçi'yi reddeder ve yalnız oturum kullanıcısına ait cihaz kayıtlarını işler. Desteklenen arayüz akışı olarak bu panelde Sahip işlemini esas alın; başka bir yerde kullanıcı adı görmek o kişinin eşleştirme isteğini yönetme yetkisi vermez.

Eşleştirmeyi başlatmak veya onaylamak için lisans yazılabilir olmalıdır. Salt okunur modda cihaz listesi incelenebilir ve güvenlik amacıyla mevcut onaylı cihazın erişimi iptal edilebilir; bekleyen istek onaylanamaz. Onaydan önce etkin profilde en az bir kasanın kilidi açık olmalıdır.

## Burada Ne Yapılır

- Desteklenen VaultPilot Browser Vault Extension mağaza kaydını Chrome Web Store'da açın.
- Son eklenti eşitlemesini ve onaylı/bekleyen cihaz özetlerini yenileyin.
- Bekleyen cihaz adı ve kodun son dört karakterini, ayrı kanaldan doğrulanmış kullanıcı isteğiyle eşleştirin.
- Eklenti açılır penceresindeki tam kodu girip bu profilde o anda açık olan kasalara erişim verin.
- Etkin cihazlarla iptal edilmiş veya süresi dolmuş arşiv kayıtlarını ayrı inceleyin.
- Kaybolan, kullanılmayan, beklenmeyen veya artık güvenilmeyen onaylı tarayıcı profilinin erişimini iptal edin.

Bu panel eklentiyi uzaktan kurmaz veya kaldırmaz; tarayıcı politikasını dağıtmaz, Web Store güncellemesini zorlamaz, başka bir tarayıcıyı yönetmez ve bir sayfada otomatik doldurmanın çalıştığını kanıtlamaz. Yalnız sunucu tarafındaki eşleştirme ve kasa yetkilerini yönetir. Otomatik doldurma; kullanıcı işlemi, etkin site, eklenti oturumu, tarayıcı politikası ve eşleşme kurallarına bağlı ayrı bir eklenti davranışıdır.

## Chrome Web Store ve Merkezi Kurulum

**Chrome Web Store'da aç**, `hjkbedlaieikhkoplgpiohlaakgebobi` kimlikli desteklenen mağaza kaydını açar. Normal müşteri kurulumu ve güncellemeleri bu mağaza kanalından yapılır. Mağaza kurulumunda ZIP indirme, Geliştirici Modu veya **Paketlenmemiş öğe yükle** gerekmez.

Merkezi yönetilen Chrome veya Edge cihazlarında aynı Web Store eklenti kimliğini kurumun tarayıcı politikasıyla dağıtın. Bu işlem VaultPilot ekranında değil, tarayıcı yönetim platformunda yapılır. Chrome otomatik güncelleme kontrollerini kendi yürütür; eklentinin Hakkında görünümü Web Store kontrolü isteyebilir, ancak Chromium isteği sınırlayabilir ve güncellemeyi yalnız tarayıcı hazır olarak bildirdiğinde uygular.

Yayın ZIP'i arşiv, yerel geliştirme, laboratuvar doğrulaması veya acil geri dönüş içindir; olağan merkezi kurulum yolu değildir. Paketlenmemiş veya geri dönüş amaçlı bir derleme için ayrıca izin verilen eklenti kaynağı gerekebilir. Mağaza kimliğini veya üretim izin listesini gelişigüzel değiştirmeyin.

## Eşleştirme Yaşam Döngüsü

### 1. Eklenti açılır penceresinden başlatma

Açılır pencerede VaultPilot sunucu adresini, VaultPilot kullanıcı adını, ayırt edilebilir bir cihaz adını ve eklenti PIN'ini girip **Eşleştirmeyi başlat** seçeneğini kullanın. PIN, eklenti özel anahtarıyla eşleştirme belirtecini bu tarayıcı profilinde korur; VaultPilot ana parolası değildir.

Eklenti; cihaz adını, isteğe bağlı kullanıcı adını ve açık anahtarını eşleştirme başlangıç ucuna gönderir. Sunucu etkin ve Denetçi olmayan profili seçer; eşleştirme kimliği ve belirteci üretir, on dakika sonra süresi dolan `XXXX-XXXX` kodunu döndürür. İstek ayrıca kabul edilen eklenti kaynağına bağlanır. Tam kod yalnız eklenti açılır penceresinde gösterilir; sunucudaki cihaz satırından geri okunmaz.

### 2. Bekleyen durumu inceleme ve onayı kontrol etme

Eklenti eşleştirme kimliğini, belirtecini ve kodu yerel olarak tutar; **Onayı kontrol et** işlemini sunar. Durum sorgusu eşleştirme kimliği ve belirteciyle doğrulanır, kabul edilen eklenti kaynağından gelmelidir. Bekleyen istek onaylanmadan kullanılamaz. On dakikalık süre biterse sorgu süre dolumu hatası verir ve sunucu listesi kaydı Arşiv altında sınıflandırır.

Bu ekrandaki **Aktif cihazlar**, getirilen kayıt aralığındaki bekleyen ve onaylı satırları içerir. Bekleyen satırda kullanıcının girdiği cihaz adı, eşleştirme kodunun yalnız son dört karakteri ve mevcut kasa yetkisi sayısı görünür. Tam kod, kullanıcı adı, tarayıcı profili, istek kaynağı, eklenti kimliği, açık anahtar, eşleştirme belirteci veya cihaz kimliği gösterilmez. Cihaz adı kullanıcı tarafından yazılan bir etikettir; doğrulanmış cihaz kimliği değildir.

### 3. Onaylama ve kasa yetkisi verme

Onaydan önce isteğin sahibini ve tarayıcı profilini kurum içi kanaldan doğrulayın. Açılır penceredeki tam kodu beklenen istekle ve satırdaki son dört karakter ipucuyla karşılaştırın; ardından kodun tamamını `XXXX-XXXX` biçiminde girin.

Onay için yazılabilir lisans ve en az bir açık kasa gerekir. VaultPilot, **onaylayan profilde o anda açık olan bütün kasaların** anahtarlarını bekleyen cihazın açık anahtarı için sarar; bu ekranda kasa başına yetki seçici yoktur. Satırdaki kasa yetkisi sayısı kaç sarılmış kasa anahtarı verildiğini gösterir. Onay `EXTENSION_PAIR` olayı yazar, cihaz listesini ve Denetim Geçmişini yeniler, yazılan kod alanını temizler.

Onaydan sonra eklenti açılır penceresinde **Onayı kontrol et** seçeneğini kullanın. Eklenti yalnız onaylı yetkileri için şifreli kasa snapshot'ı isteyebilir ve bunu korunan çalışma alanında çözebilir. Eşleştirme, ana parolayı veya düz metin kasa kayıtlarını cihaz listesinde göstermez.

## Cihaz Listesi, Eşitleme ve İptal

Cihaz sorgusu oturum kullanıcısına ait yalnız oluşturulma zamanına göre en yeni 50 kaydı getirir. Özetteki eşitleme zamanı ve onaylı/bekleyen sayıları ile **Aktif cihazlar**/**Arşiv** ayrımı yalnız bu kayıt aralığından hesaplanır; tam cihaz geçmişi değildir. Daha eski eşleştirme, iptal ve eşitleme hareketlerini Denetim Geçmişinde araştırın. **Yenile** ve özet kontrolleri listeyi tekrar sorgular; ekran açıkken liste yaklaşık beş saniyede bir de yenilenir.

Konsol **İptal et** düğmesini yalnız `APPROVED` durumundaki satırda gösterir. Düğme ikinci bir onay penceresi göstermeden hemen çalışır; cihazı iptal durumuna geçirir, saklanan sarılmış kasa yetkilerini kaldırır, `EXTENSION_REVOKE` olayı yazar ve kaydı Arşive taşır. Yalnız onaylı satırda görünme kuralı konsol düğmesine aittir. Alttaki iptal ucunda yazılabilir lisans veya cihaz durumu kontrolü yoktur; kimliği doğrulanmış Sahip, Yönetici veya Kullanıcı kendi kaydıyla eşleşen satırı mevcut durumundan bağımsız olarak iptal edebilir. Desteklenen operatör akışında ekrandaki işlemi kullanın. İptalden sonra eklenti artık onaylı şifreli kasa snapshot'ı alamaz. Sunucu erişimini iptal etmek eklentiyi kaldırmaz veya tarayıcı profilini silmez; gerekirse yerel eşleştirmeyi veya eklentiyi o tarayıcıda ayrıca kaldırın.

Her başarılı şifreli kasa snapshot'ı alımı son görülme zamanını günceller ve `EXTENSION_SYNC` olayı yazar. Görme, kopyalama ve doldurma işlemlerinin ayrı eklenti denetim yolu vardır; ancak bu yönetim ekranı sayfa düzeyinde otomatik doldurma kanıtı göstermez. Olayları Denetim Geçmişinde inceleyin ve cihaz ilişkisini gizli tutun.

## Arşiv, Süre Dolumu ve Hatalar

**Arşiv**, en yeni 50 cihazlık kayıt aralığındaki iptal edilmiş ve süresi dolmuş satırları içerir. Tam geçmiş değildir; daha eski olaylar için Denetim Geçmişini kullanın. Süresi dolan istek onaylanamaz; eklenti açılır penceresinden yeni istek başlatın. Arşiv satırlarında konsol onaylama veya iptal işlemi yoktur. Bu kayıtlar özel incelemede işe yarar, ancak eklentinin tarayıcıdan yerel olarak kaldırıldığını kanıtlamaz.

Onay hatası kodun ve sürenin kontrol edilmesini isteyen genel bir mesaj gösterir. Ayrıca lisansın yazılabilirliğini, etkin profili, en az bir açık kasayı, istek sahipliğini ve satırın hâlâ bekliyor olmasını denetleyin. İptal hatası da genel bir erişim iptali mesajıdır; eski durumla işlem yapmamak için yeniden denemeden önce listeyi yenileyin.

Cihaz listesi yüklenirken iki iskelet satırı görünür. Liste sorgusu için ayrı bir hata kartı yoktur. Saklanmış veri bulunmadığında başarısız sorgu ilgili boş durum gibi görünebilir. Oturumu, sunucu bağlantısını ve **Yenile** sonucunu kontrol etmeden **Henüz eşleştirme isteği yok** mesajını veya boş Arşivi kesin kanıt saymayın.

## Önerilen İş Akışları

### Yeni merkezi yönetilen tarayıcı profilini onaylama

1. Tarayıcının desteklenen Web Store eklenti kimliğini onaylı kullanıcı veya politika kanalından aldığını doğrulayın.
2. Açılır pencerede doğru HTTPS sunucu adresini, kullanıcı adını, cihaz adını ve yeni eklenti PIN'ini girip eşleştirmeyi başlatın.
3. Kodu okumadan veya girmeden önce isteği yapan kişiyi ve tarayıcı profilini kurum içi kanaldan doğrulayın.
4. Bu ekranda cihaz adını ve son dört karakter ipucunu eşleştirin; isteğin hâlâ beklediğini kontrol edin.
5. Yalnız yetki verilecek kasaları açık bırakın; açık olan her kasanın kapsama gireceğini unutmayın.
6. Tam `XXXX-XXXX` kodunu girip **Onayla** seçeneğini bir kez kullanın.
7. Açılır pencerede onayı kontrol edip eşitleyin; `EXTENSION_PAIR` ve beklenen ilk `EXTENSION_SYNC` olayını özel kanıtta doğrulayın.

### Kaybolan veya güvenilmeyen tarayıcı profilini iptal etme

1. Aktif cihazları yenileyin; onaylı satırı yalnız cihaz adına göre değil, özel envanter kanıtıyla belirleyin.
2. Kod, kimlik veya kasa ayrıntısı kopyalamadan genel iptal nedenini ve beklenen etkiyi kaydedin.
3. İkinci onay olmadığını bilerek **İptal et** seçeneğini bir kez kullanın.
4. Satırın Arşive taşındığını, kasa yetkisi sayısının temizlendiğini ve `EXTENSION_REVOKE` olayını doğrulayın.
5. Tarayıcıya erişilebiliyorsa yerel eşleştirmeyi kaldırma veya eklentiyi kaldırma işlemini tarayıcı yönetim kanalında ayrıca yürütün.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Cihazlar yükleniyor | İki iskelet satırını bekleyin; gerekirse sunucu oturumunu kontrol edip Yenile kullanın. |
| Henüz eşleştirme isteği yok | Desteklenen eklenti açılır penceresinden başlayın; konsolda yapay istek oluşturmayın. |
| Onay bekliyor | Onaydan önce isteği yapan kişiyi, tarayıcı profilini, cihaz adını ve kodu ayrı kanallardan doğrulayın. |
| Eşleştirme kodu geçersiz | Açılır penceredeki tam `XXXX-XXXX` kodunu yeniden girin; son dört karakterden kod tahmin etmeyin. |
| Eşleştirme süresi doldu | Kaydı Arşivde bulun ve açılır pencereden yeni on dakikalık istek başlatın. |
| Açık kasa yok | Onaydan önce amaçlanan kasaları açın; bütün açık kasalara yetki verileceğini unutmayın. |
| Salt okunur lisans | Eşleştirme başlatmayın veya onaylamayın; mevcut onaylı cihaz güvenlik amacıyla iptal edilebilir. |
| Eşleşti | Kasa yetkisi sayısını, beklenen eşitlemeyi ve özel denetim kanıtını kontrol edin. |
| İptal edildi | Sunucu yetkilerini kaldırılmış sayın; yerel eklenti temizliğini ayrıca yürütün. |
| Arşiv boş | Bağlantıyı doğrulayıp yenileyin; eski iptal veya süre dolumu geçmişi olmadığı sonucuna varmadan önce en yeni 50 kayıt sınırını ve Denetim Geçmişini kontrol edin. |
| Onay başarısız | Sahiplik, bekleyen durum, tam kod, süre, yazılabilir lisans ve açık kasaları kontrol edin. |
| İptal başarısız | Listeyi yenileyin, geçerli onaylı satırı ve sunucu oturumunu doğrulayıp bir kez daha deneyin. |

## İşlemden Önce

- Konsol oturumunun Sahip rolünde olduğunu, Entegrasyon ve Eklenti yeteneklerinin amaçlanan yolu kapsadığını doğrulayın.
- İşlemin Web Store dağıtımı, eşleştirme onayı, eşitleme incelemesi veya iptal olduğunu ayırın; bu ekran dördünü de uzaktan yapmaz.
- Kullanıcıyı ve tarayıcı profilini kurum içi istek kanalından doğrulayın; cihaz satırı bunları kanıtlamaz.
- Onaydan önce yetki kapsamına girmemesi gereken kasaları kilitleyin.
- Tam kodu, son dört karakter ipucunu, cihaz adını ve zamanı birlikte hassas ilişkilendirme verisi sayın.
- **İptal et** işleminin ikinci onayı olmadığını, eklentiyi kaldırmadığını ve tarayıcı profilini temizlemediğini unutmayın.

## Güvenli Kanıt

- Paylaşılabilir: sekme adı, Chrome Web Store kanalı, bekliyor/eşleşti/iptal/süresi doldu gibi genel durum, en yeni 50 kayıt aralığına ait olduğu açıkça belirtilmiş toplu onaylı ve bekleyen sayıları, geniş zaman aralığı ve genel hata sınıfı.
- Gizli kalmalı: tam veya kısmi eşleştirme kodu, cihaz adı, cihaz/eşleştirme kimliği ve belirteci, açık ya da özel anahtar materyali, eklenti kaynağı, kullanıcı/hesap, tam zaman damgası, kasa adı, kasa yetkisi sayısı, şifreli kasa snapshot'ı ve herhangi bir gizli değer veya otomatik doldurmada görünen veri.
- Eşleştirme kodu veya belirteci açığa çıktıysa genel paylaşımı durdurun. İsteğin süresinin dolmasını bekleyin ya da onaylı cihazı iptal edin; sonra özel kanaldan yeni eşleştirme başlatın.
- Cihaz adı, kod ipucu, yetki sayısı ve zamanın ilişkilendirilebildiği ekran görüntüsünde satırın tamamını maskeleyin. Tek alanı kırpmak yeterli değildir.

## Ne Zaman Durmalı ve Destek İstemelisiniz

İsteğin sahibi doğrulanamıyorsa, cihaz adı veya son dört karakter uyuşmuyorsa, beklenmeyen sayıda kasaya yetki verilecekse, istek sürekli zaman aşımına uğruyorsa, iptal edilen cihaz hâlâ şifreli kasa snapshot'ı alabiliyorsa, bilinen cihazlara rağmen liste boş görünüyorsa ya da denetim olayları işlemle eşleşmiyorsa durun. Eşleştirme materyali veya kasa verisi eklemeden genel durum, geniş zaman aralığı, gizli değerleri çıkarılmış hata metni ve son güvenli adımla özel destek kaydı açın.

## Operatör Notları

Eşleştirme, onaylı cihaz ve sarılmış anahtar güven kararıdır; uzaktan tarayıcı yönetimi değildir. Chrome Web Store dağıtımı, kurum politikası, sunucu yetkileri, yerel eklenti durumu ve sayfa düzeyindeki otomatik doldurma ayrı sınırlardır. Yalnız onay verildi diye eklentinin kurulduğunu, güncellemenin uygulandığını, yerel verinin silindiğini veya otomatik doldurmanın garanti edildiğini söylemeyin.

## İlgili

- [Tarayıcı eklentisi](browser-extension.md)
- [Entegrasyonlar ekranı](screen-integrations.md)
- [Chrome Web Store mağaza kaydı ve gizlilik](chrome-web-store-listing.md)
- [Eklenti eşleştirme KB](../../kb/tr/extension-pairing.md)
- [Denetim Geçmişi ekranı](screen-audit-log.md)
