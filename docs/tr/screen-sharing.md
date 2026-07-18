# Paylaşım Ekranı

Üst çubuktaki `?`, Paylaşım ekranından bu rehberi açar. Bu ekran, aktif kasadaki seçili kayıtları başka bir VaultPilot kullanıcısının kendi kasasına alabileceği şifreli bir dahili paket olarak veya VaultPilot dışında çevrimdışı açılacak parola korumalı bir dosya olarak hazırlar.

Dış paylaşım barındırılan bir portal, herkese açık bağlantı veya merkezi PAM teslim hizmeti değildir. VaultPilot dış paketi sunucuda saklamaz; alıcı hesabı, dış paket geçmişi veya dağıtılmış dış paketi merkezi olarak geri alma işlemi oluşturmaz.

## Erişim, Roller ve Lisans

- Paylaşımın normal gezinmede görünmesi için lisansın `sharing` özelliğini içermesi ve salt okunur olmaması gerekir. Auditor gizli kayıt çalışma alanlarını kullanamaz.
- Kayıtları görmek ve paketlemek için aktif kasanın kilidi açık, kasa anahtarı tarayıcıda kullanılabilir olmalıdır.
- **Dahili paket göndermek** için sistem rolü Owner veya Admin, kaynak kasada Manager rolü ve yazılabilir lisans gerekir.
- **Dış paket oluşturmak** için kaynak kasada Manager rolü ve yazılabilir lisans gerekir. Sistem User, kasada Manager ise bu yerel akışı kullanabilir.
- **Gelen paketi kendi kasana kaydetmek** için hedef aktif kasada Editor veya Manager rolü ve yazılabilir lisans gerekir. Bu işlem kaynak kasaya erişim vermez.
- Dahili alıcı; aynı organizasyonda, aktif, gönderen dışında, Auditor olmayan ve kullanılabilir açık anahtarı bulunan bir kullanıcı olmalıdır. Listede görünen 2FA durumu bilgilendirmedir; alıcı seçim koşulu değildir.

Salt okunur veya özellik dışı durumda eski/açık ekran durumunu yazma izni saymayın. Normal akışı yeniden açın ve rol, kasa ile lisans durumunu doğrulayın.

## Üç Adımlı Akış

Adım göstergesi **Seç**, **Gönder** ve **Sonuç** aşamalarından oluşur. Adımlar arasında geri dönebilirsiniz; ancak ekranda görünen seçim özeti son kontroldür.

### 1. Kayıtları seçin

Parola, Active Directory kimlik bilgisi, API anahtarı, not, sertifika ve dosya kayıtları seçilebilir. Arama; başlık, kullanıcı adı, URL, host, domain ve kayıt türü etiketinde çalışır. **Tümü** veya tür sekmeleriyle listeyi daraltabilir; tek kayıt, görünür kayıtların tümü ya da görünür tür grubu seçilebilir.

Filtre dışına çıkan seçili kayıtlar seçili kalabilir. **Tümünü seç** yalnız o an görünür kayıtları mevcut seçime ekler. Üstteki **Seçimi temizle**, filtre arkasında kalanlar dahil bütün seçimi siler; **Grubu çıkar** ise yalnız o grupta o anda görünür kayıtları kaldırır. Göndermeden önce toplam seçili sayısını ve tür özetini kontrol edin; gizli kalmış bir kaydı fark etmeden pakete eklemeyin.

Dosya kayıtlarının parçaları yalnız tarayıcıda çözülür ve paylaşım anahtarıyla yeniden şifrelenir. Dosya bilgisi veya parçalardan biri eksikse paket oluşturulmaz.

### 2. Süre ve kullanım hakkını belirleyin

Geçerlilik süresi 1 saat ile 720 saat (30 gün), kullanım hakkı 1 ile 25 arasındadır. Arayüz 1 saat, 24 saat, 3 gün, 7 gün ve 30 gün kısayolları sunar.

- Dahili pakette süre, kullanım sayacı ve durum sunucuda uygulanır.
- Dış pakette süre doğrulanmış manifestten ve alıcı cihazının saatinden kontrol edilir.
- Dış paketin kullanım hakkı, manifest hash'iyle o tarayıcı profilinin `localStorage` alanında tutulan yerel sayaçtır. Başka tarayıcı/profil veya temizlenmiş tarayıcı depolaması yeni bir sayaçla başlar. Bu değer organizasyon genelinde limit, denetim veya geri alma sınırı değildir.
- Dış çözme işlemi başarılı olduğunda bir yerel hak, içerik gösterilmeden önce tüketilir. Sonraki dosya indirme hatası bu hakkı geri vermez.

### 3. Gönderim yöntemini seçin

Aynı seçim ve politika, aşağıdaki dahili veya dış akışlardan yalnız biriyle tamamlanır. Bu iki yolun saklama, kullanım ve geri alma sınırları farklıdır.

## Dahili Paylaşım

**Dahili alıcı** bölümünde hedef VaultPilot kullanıcısını seçip **Seçili kayıtları gönder** işlemini başlatın. Tarayıcı yeni bir AES-GCM paket anahtarı üretir, seçili kayıtları bu anahtarla şifreler ve anahtarı alıcının kayıtlı açık anahtarıyla sarar. Sunucu düz metin kayıt veya paket anahtarı yerine şifreli paket, sarılmış anahtar, seçim hash'leri ve politika meta verisini saklar.

Dosya içeren dahili paket çok adımlıdır:

1. Paket kaydı önce `PENDING` ve `packageReady=false` olarak oluşturulur.
2. Dosya parçaları tarayıcıda yeniden şifrelenip sunucuya tek tek yüklenir.
3. Sayı ve byte toplamı eşleşince paket hazır olarak işaretlenir.

Alıcı yalnız hazır, `PENDING`, süresi geçmemiş ve kullanım hakkı kalmış paketleri **Gelen paylaşımlar** altında görür. **Kendi kasama kaydet**, paketi alıcının özel anahtarıyla tarayıcıda açar; her kaydı ve dosya parçasını o anda aktif olan yazılabilir hedef kasanın anahtarıyla yeniden şifreleyerek yeni kayıtlar oluşturur. Tüm yazımlar bittikten sonra sunucudaki kullanım sayısı artırılır. Limit henüz dolmadıysa paket `PENDING` kalabilir ve yeniden kullanılabilir; dolunca `ACCEPTED` olur.

Bu bir kaynak kasaya üyelik veya canlı senkronizasyon değildir. Sonradan değişen kaynak kayıtlar kopyaya aktarılmaz.

Active Directory kimlik bilgisi paylaşılırken sağlayıcı kimliği ve nesne DN bilgisi şifreli kaydın içinden hedef oluşturma işlemine aktarılır. Hedef organizasyonda aynı sağlayıcı ve kullanıcı nesnesi hâlâ bulunmalı, alıcının hedef kasada yazma yetkisi olmalıdır. Sağlayıcı kaldırılmışsa, nesne artık yoksa veya aynı yönetilen kimlik bilgisi hedef kasada zaten varsa işlem güvenli biçimde reddedilir ve bu kabul sırasında oluşturulan kayıtlar geri alınır.

### Gelen ve giden listeleri

- **Gelen paylaşımlar** geçmiş değildir; yalnız alınabilir durumdaki hazır paketleri gösterir. Kabul edilmiş, geri alınmış, süresi dolmuş, hakkı bitmiş veya hâlâ hazırlanmakta olan paketler burada görünmez.
- **Son gönderilenler** yalnız en yeni altı dahili paketi gösterir. Sunucu paket listesini 50 kayıtlık metadata sayfaları halinde döndürür; şifreli paket gövdesi, sarılmış anahtar ve seçim hash'leri liste yanıtına eklenmez. Tam şifreli gövde yalnız alıcı uygun bir paketi açmayı seçtiğinde tekil, yetki kontrollü detay isteğiyle alınır.
- Durumlar **Hazırlanıyor**, **Bekliyor**, **Kullanıldı**, **Süresi doldu** ve **Geri alındı** olabilir.
- Mevcut arayüz, **Geri al** düğmesini yalnız gönderenin kendi `PENDING`, süresi geçmemiş ve hakkı kalmış paketi için gösterir. Bu koşul yalnız düğmenin görünürlüğünü belirler; sunucudaki geri alma yolu şu anda oturum açmış gönderene ait her paketi durumuna, süresine veya kalan hakkına bakmadan kabul eder. Geri alma paketi `REVOKED` durumuna geçirir ve sonraki açılışları engeller; alıcının daha önce kendi kasasına kaydettiği kopyaları veya kaynak kayıtları silmez.

## Dış Parola Paketi

**Dış paket oluştur**, tarayıcıda 28 karakterlik güçlü bir paylaşım parolası üretir. Seçili yük AES-256-GCM ile şifrelenir; parola anahtarı PBKDF2-SHA-256 ile türetilir ve süre, kullanım hakkı, kapsam ile dosya bilgileri doğrulanmış manifeste bağlanır.

- Dosyasız yeni paket `.json`, dosyalı paket `.pmshare` olarak indirilir.
- Paket ve parola yalnız canlı sonuç durumunda görünür; dış paket sunucu geçmişine veya **Son gönderilenler** listesine eklenmez.
- **Paketi kopyala** veya **Paketi indir** ile korumalı dosyayı alın. **Çözme aracını indir**, `vaultpilot-share-decrypter.zip` dosyasını verir.
- Doğrudan teslimatta paket, paylaşım parolası ve çözme aracını onaylı ayrı kanallarla ulaştırın. En azından paket ile parolayı hiçbir zaman aynı kanalda göndermeyin.
- **Tamamla** veya **Yeni paylaşım** canlı paket, parola ve seçim durumunu temizler. Paketi güvenli konuma almadan tamamlamayın; ekran kilidini tek başına paylaşım materyali temizliği saymayın. Akıştan vazgeçiyorsanız sayfayı tamamen yenileyin.

Dış paket dağıtıldıktan sonra VaultPilot'ta geri alma işlemi yoktur. Yeni paket üretmek eskisini geçersiz kılmaz. Paket veya parola yanlış kişiye gittiyse paketi süre sonuna kadar açılabilir kabul edin ve içindeki sırları kendi sahiplik prosedürleriyle değiştirin ya da iptal edin.

### SMTP ile gönderim

Sonuç ekranındaki SMTP işlemi, yapılandırılmış VaultPilot SMTP hizmeti üzerinden tek alıcıya paket dosyasını, çözme aracı ZIP'ini ve kısa yönergeyi gönderir. Paylaşım parolası e-postaya eklenmez. İstemci `confirmPassphraseSeparate: true` değerini sabit gönderir; arayüz parolanın ayrı kanaldan iletilmesi gerektiğini açıklar ancak onay kutusu veya ayrıca bir operatör onayı sunmaz. Bu istek alanı, parolanın gerçekte hangi kanaldan gönderildiğini kanıtlamaz.

SMTP kullanıldığında dış paket teslimat için VaultPilot sunucusuna geçici olarak gönderilir ve yapılandırılmış SMTP hizmetinden geçer; bu nedenle “paket sunucuya hiç gitmez” ifadesi doğru değildir. Buna rağmen VaultPilot paketi barındırılan dış paylaşım kaydı olarak saklamaz.

## Boyut ve İstek Sınırları

| Yol | Uygulanan sınır |
| --- | --- |
| Dahili paket | En fazla 250 kayıt, toplam 512 dosya parçası ve 1 GiB düz metin dosya boyutu. |
| Dahili dosya parçası | Her parça en fazla 2 MiB; parça yükleme isteği en fazla 8 MiB. |
| Dahili paket oluşturma isteği | En fazla 24 MiB istek gövdesi. Aynı gönderen için en fazla 50 bekleyen paket, 128 MiB ayrılmış şifreli alan; organizasyon genelinde 512 MiB bekleyen paylaşım alanı uygulanır. Oluşturma 10 dakikada 6 istekle sınırlıdır. |
| Şifreli kayıt gövdesi | Standart kayıtlar en fazla 6 MiB, sertifika kayıtları en fazla 24 MiB olabilir. Güncel kayıtlar ve geçmiş sürümleri birlikte kasa başına 512 MiB, organizasyon başına 2 GiB ile sınırlıdır. |
| Dış paket doğrudan indirme | Seçili dosyaların toplamı en fazla 1 GiB; mevcut 2 MiB dosya parçaları kullanılır. Dahili 250 kayıt/512 toplam parça şeması yerel indirmeye uygulanmaz. |
| SMTP ile dış paket | Paket içeriği en fazla 12 MiB olabilir; SMTP meta verisindeki kayıt sayısı 250 ile sınırlıdır. Daha büyük yerel paket SMTP ile gönderilemez; onaylı manuel teslimat kullanın. |

## İşlem Bütünlüğü Dışındaki ve Kısmi Durumlar

Paylaşımın tüm adımları tek bir atomik işlem içinde yürütülmez:

- **Dahili oluşturma yarım kalırsa:** Paket kaydı ve bazı şifreli dosya parçaları gerçekten oluşturulmuş olabilir. Gönderen listesinde **Hazırlanıyor** görünürken alıcı listesinde görünmez. Yeniden deneme eski paketi sürdürmez, yeni paket oluşturur. Önce mevcut giden paketi ve Denetim Günlüğünü uzlaştırın; gerekiyorsa yarım paketi geri alın.
- **Gelen paket yarım alınırsa:** Kayıtlar hedef kasaya tek tek yazılır, dosya yüklemeleri kayıt bazında atomik tamamlanır ve kullanım sayısı en son güncellenir. Bir adım başarısız olduğunda bu kabul sırasında oluşturulan kayıtlar ters sırada geri alınır. Geri alma işlemlerinden biri ayrıca başarısız olursa arayüz bunu açıkça bildirir; yalnız bu durumda hedef kasayı ve denetimi uzlaştırmadan yeniden denemeyin.
- **Eşzamanlı kabul:** Kullanım sayacı ile hedef kasaya yapılan yazımlar aynı işlem bütünlüğü içinde değildir. Çift tıklama veya iki oturum aynı paketi eşzamanlı açarsa limit güncellenmeden birden fazla kopya oluşabilir. Tek operatör ve tek oturumla ilerleyin.
- **Dış oluşturma ve denetim ayrılır:** Tarayıcı paket ile parolayı oluşturup sonuç alanına koyduktan sonra genel `SHARE` denetim olayı yazılır. Denetim yazımı başarısızsa arayüz oluşturma hatası gösterebilir ama paket ve parola hâlâ bellekte bulunabilir. Sonuç alanını ve denetimi kontrol etmeden yeniden üretmeyin.
- **SMTP denetimi iki aşamalıdır:** Kalıcı gönderim-niyeti olayı SMTP'den önce yazılır; bu yazım başarısızsa e-posta gönderilmez. SMTP kabulünden sonraki teslimat kanıtı en iyi çaba ile yazılır ve başarısız olsa bile e-posta gönderilmiş olabilir. Niyet olayı tek başına teslimat kanıtı değildir; teslimat denetimi eksik diye aynı paketi hemen tekrar göndermeyin.

## Denetim ve Kanıt

- Dahili paket oluşturma `SHARE`; dosya finalizasyonu ayrıntılı ikinci `SHARE`; başarılı kabul `IMPORT`; geri alma `SHARE_REVOKE` üretir. Hedef kasada oluşan kayıtlar kendi `CREATE`/`IMPORT` izlerini de bırakabilir.
- Yerel dış paket oluşturma yalnız genel `SHARE` olayı yazmayı dener; sunucuda dış paket satırı oluşturmaz.
- SMTP niyet ve teslimat olayları; manifest özeti, kayıt/kullanım sayısı, boyut, süre, kabul sayısı ve mesaj kimliği gibi gizli alanları çıkarılmış meta veriler taşır. Paket içeriği, parola, alıcı adresi ve dosya adı denetim meta verisine yazılmaz.
- Denetim olayının bulunmaması işlemin hiç gerçekleşmediğini; niyet olayının bulunması da e-postanın teslim edildiğini tek başına kanıtlamaz.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Kayıtlar veya paket listesi yükleniyor | Panel özel iskelet göstermeyebilir. On saniyelik yenilemeyi ve genel sorgu durumunu bekleyin. |
| Paylaşılacak kayıt yok | Aktif kasayı, kilit durumunu, arama ve tür filtresini doğrulayın. |
| Paylaşılabilir dahili kullanıcı yok | Kendi hesabınız, kapalı kullanıcılar, Auditor ve geçerli açık anahtarı olmayan kullanıcılar listelenmez. Kullanıcı durumunu özel olarak doğrulayın. |
| Gelen/giden listesi boş | Özel sorgu hata kartı yoktur; istek hatası boş dizi gibi görünebilir. Boşluğu başarı kanıtı saymadan oturumu ve ağ isteğini doğrulayın. |
| Hazırlanıyor | Dahili paket kaydı vardır fakat dosya parçaları tamamlanmamıştır. Yeni paket oluşturmadan önce uzlaştırın veya geri alın. |
| Bekliyor | Dahili paket hazırdır ve alıcı için en az bir kullanım hakkı kalmıştır. |
| Kullanıldı / Süresi doldu / Geri alındı | Paket yeni kabul için kullanılamaz. Daha önce alınmış hedef kasa kopyaları etkilenmez. |
| Gelen paylaşım açılamadı | Hedef kasada kısmi kayıt veya parça bulunabileceğini varsayın; yeniden denemeden önce kasayı inceleyin. |
| Dış paket oluşturma hatası | Sonuç alanında paket/parola kalmış olabilir. Yeni paket üretmeden önce canlı durumu ve denetimi kontrol edin. |
| SMTP hatası veya belirsiz sonuç | Niyet, UI kabul sonucu, mesaj kimliği ve özel SMTP kanıtını uzlaştırın; kör yeniden gönderim yapmayın. |
| Decrypter hatası | Yanlış parola, değiştirilmiş manifest, süre, yerel hak, tarayıcı depolaması ve sürüm hatalarını ayırın; çözülmüş içerik ekran görüntüsü istemeyin. |

## İşlemden Önce

- Doğru aktif kasayı, sistem ve kasa rolünü, `sharing` özelliğini ve yazılabilir lisansı doğrulayın.
- Toplam seçili sayısını, tür özetini ve filtre arkasında kalan seçimleri inceleyin.
- Dosya toplamı, parça sayısı, paket boyutu, geçerlilik ve kullanım hakkını teslim yöntemine göre kontrol edin.
- Dahili alıcının aktif kimliğini ve açık anahtarını özel kanaldan doğrulayın; hedef kasayı alıcı açar.
- Dış pakette merkezi geri alma olmadığını ve kullanım hakkının yalnız yerel sayaç olduğunu işin sorumlusuna açıklayın.
- Paket, parola ve çözme aracı için onaylı teslim kanallarını önceden belirleyin; SMTP kullanıyorsanız parolayı e-postaya koymayın.
- Yarım kalmış giden paket veya hedef kasa yazımı varsa yeniden denemeden önce paket listesi, hedef kasa ve Denetim Günlüğünü uzlaştırın.

## Güvenli Kanıt

- Paylaşılabilir: dahili/dış yol, genel paket durumu, yaklaşık zaman, kayıt ve parça sayısı, toplam boyut sınıfı, süre/kullanım politikası, redakte hata kategorisi, kısaltılmış paket/manifest kimliği, SMTP niyet veya kabul durumu.
- Gizli kalmalı: paket JSON/PMShare içeriği, paylaşım parolası, çözülmüş içerik, kayıt başlıkları ve kullanıcı adları, dosya adları/parçaları, alıcı adı ve e-posta adresi, tam paket kimliği/manifest özeti, sarılmış anahtar, şifreli kayıt içeriği, kasa adı/kimliği, özel SMTP mesajı ve tam ekran görüntüsü.
- Asla parola ile paketi aynı kanıta eklemeyin. Paket veya parola herkese açık kanala girdiyse dış paketi geri alınabilir saymayın; içerdiği sırları değiştirin ya da iptal edin.

## Ne Zaman Durmalı

Seçim kapsamı belirsizse, hedef kullanıcı/anahtar doğrulanamıyorsa, dosya parçaları eksikse, Active Directory sağlayıcısı veya hedef nesne artık doğrulanamıyorsa, mevcut paket **Hazırlanıyor** durumundaysa, arayüz geri almanın tamamlanamadığını bildiriyorsa, dış paket sonucu denetimle çelişiyorsa, SMTP sonucu belirsizse veya paket/parola aynı kanala girdiyse durun. Yeni paket ya da ikinci kabul üretmeden önce redakte kimlikler, zaman, durum ve denetim kanıtıyla özel inceleme yapın.

## Operatör Notları

Dahili paylaşım, sunucuda sınırlı ve geri alınabilir bir şifreli teslim kuyruğudur; kabul edildiğinde alıcı kasasında bağımsız kopyalar üretir. Dış paylaşım ise çevrimdışı dosya teslimidir; dağıtımdan sonra kontrol manifest süresi, alıcı cihazının saati, yerel sayaç ve sır rotasyonu disiplinine dayanır. Bu iki güven modelini aynı “aktif paylaşım” olarak değerlendirmeyin.

## İlgili

- [Paylaşım ve çevrimdışı çözme aracı](sharing-and-offline-decrypter.md)
- [Dış paylaşım paketi açılamıyor](../../kb/tr/external-share-fails.md)
- [Denetim Günlüğü ekranı](screen-audit-log.md)
- [İşlemler ekranı](screen-executions.md)
- [Güvenli destek kanıtı](support-evidence-pack.md)
