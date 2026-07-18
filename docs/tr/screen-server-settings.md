# Sunucu Ayarları Ekranı

Üst çubuktaki `?`, **Genel**, **Erişim & HTTPS**, **SMTP** veya **Bakım ve Loglar** sekmesi açıkken bu kılavuzu açar. **Giriş güvenliği** sekmesinde ise aynı düğme kişisel giriş güvenliği kılavuzuna gider.

Sunucu ayarlarını; üretilen parolaların ortak ilkesini belirlemek, çalışma günlük düzeyini seçmek, kurtarma araçlarını yönetmek, HTTPS ve SMTP yapılandırmasını kaydetmek ve kontrollü bakım yürütmek için kullanın. Üst çubuktaki yenileme yalnız açık sekmenin verisini tazeler; tarayıcı sayfasını veya bütün sunucu ayarlarını yeniden yüklemez.

## Erişim ve Yetki

- Sahip, Yönetici ve Denetçi rolleri sistem sekmelerini okuyabilir. Kullanıcı rolü kişisel **Giriş güvenliği** alanına yönlendirilir.
- Erişim veya SMTP ayarlarını kaydetme, sertifika yükleme, SMTP testi gönderme, sunucu yedeği içe aktarma, servisi yeniden başlatma ve bakım yedeklerini çalıştırıp geri yükleme yalnız Sahip rolüne açıktır.
- Salt okunur lisans, Sahip rolüne ait bu sunucu işlemlerini kapatmaz. Ancak kasaya geçiş verisi almak için lisansın yazılabilir, aktif kasanın kilidinin açık ve kasa rolünün **Editor** veya **Manager** olması gerekir.
- Yönetici ve Denetçi görünümü inceleme amaçlıdır. Arayüzdeki kapalı düğmeler sunucudaki Sahip denetimini aşmaz.

<a id="general-settings"></a>

## Genel

Genel sekmesi sık kullanılan sunucu ilkelerini ve kurtarma işlemlerini tek yerde toplar.

### Üretilen parola ilkesi

Elle başlatılan Active Directory parola ataması ile otomatik rotasyon aynı ilkenin değiştirilemez anlık görüntüsünü kullanır. Uzunluk 16–128 karakter arasında seçilir. Küçük harf, büyük harf, rakam ve sembol sınıfları ayrı açılır; seçilen her sınıftan en az bir karakter üretilir. Sembol profili **Güvenli** veya **Genişletilmiş** olabilir ve benzer görünen karakterler dışarıda bırakılabilir. Çalışma kaydı ilke parmak izini saklar; sonradan yapılan genel ayar değişikliği başlamış işi geriye dönük değiştirmez.

### Çalışma günlük düzeyi

`DEBUG`, `INFO`, `WARN` veya `ERROR` seçilebilir ve etkin düzey ayrıca gösterilir. Bu seçim servis çalışma günlüklerinin ayrıntısını değiştirir; değiştirilemez denetim olaylarının kapsamını azaltmaz. `DEBUG` bile parola, token, kasa anahtarı veya düz metin gizli değer yazmaz. Daha ayrıntılı kayıt yalnız kontrollü inceleme süresince açık tutulmalıdır.

### Şifreli Hızlı Kurtarma

**Hızlı kurtarma paketi oluştur** yalnız Sahip tarafından kullanılabilir. Sunucu profil ve erişilebilir kasa verisini hazırlar; tarayıcı FILE olmayan kayıtları ayrı üretilen 40 karakterlik anahtarla PBKDF2-SHA-256 (420.000 tur) ve AES-GCM kullanarak şifreler. Manifest şifrelemeye ek veri olarak bağlanır. Sonuç `.vpr.json` dosyasıdır. Anahtar maskeli gösterilir, kopyalanabilir ve beş dakika sonra ekrandan temizlenir; dosya ile anahtarı ayrı yerlerde saklayın.

Paket FILE kayıtlarını, dosya parçalarını, sürüm geçmişini, denetim geçmişini, lisansı, sunucu yapılandırmasını ve çalışma günlüklerini içermez. Boş bir sunucu profilini kısa sürede ayağa kaldırmak içindir; içe aktarma tüm oturumları kapatır. Tam VaultPilot Backup Tool yedeğinin yerine geçmez.

### Yönetim araçları, tam yedek ve servis

- **Backup Tool** indirmesi `VaultPilotBackupTool.exe` sürüm `1.0.1`, **Log Collector** indirmesi `VaultPilotLogCollector.exe` sürüm `1.0.1` adını taşır. İki aracın sürümü de bağımsızdır ve sunucu sürümünü devralmaz. Eski PassMan adları yalnız uyumluluk takma adıdır.
- İndirme yalnız paketlenmiş üretim yapıtı sunucuda varsa ve Sahip yetkisiyle çalışır. Geliştirme ortamında dosya yoksa düğme kullanılabilir görünmemelidir.
- Backup Tool tam sunucu kurtarma ZIP'i üretir. ZIP kabının kendisi parola korumalı değildir; şifreli içerik taşısa da erişimi sınırlı, çevrimdışı konumda saklayın.
- **Sunucu yedeğini içe aktar**, onaylı Backup Tool ZIP'i veya desteklenen şifreli JSON yedeğini bütünlük ve eski biçim onaylarıyla geri yükler. Birleştirme yapmaz ve başarılı olduğunda bütün oturumları kapatır.
- **Sunucu servisini yeniden başlat**, yalnız kaydedilmemiş ayar yokken açılır ve yalnız kaydedilmiş yapılandırmayı devreye alır. İşlem tamamlanmış sağlık denetimini beklemez; bağlantı geri geldiğinde servis, HTTPS adresi ve yeni giriş doğrulanmalıdır.

## Erişim & HTTPS

**Yayın adresi veya alan adı** ile **Yayın portu**, kullanıcıların açacağı adresi tanımlar. Sunucu, adresi normalleştirir ve her zaman HTTPS adresi üretir. Bu ekranda HTTP/HTTPS anahtarı yoktur.

İki sertifika kaynağından birini seçin:

- **Otomatik sertifika**, sunucunun yönettiği sertifika kaynağını korur.
- **Kurumsal sertifika**, en fazla 2 MiB boyutunda `.pfx` veya `.p12` kimlik paketi ve paket için ayrı **PFX/P12 kaynak parolası** kabul eder. Kayıtlı parola ekranda geri gösterilmez; alan boş bırakılırsa mevcut şifreli parola korunabilir, yeni değer girilirse yalnız sunucu gizli anahtarıyla şifreli ayara yazılır.

Önce **Paketi doğrula** kullanılır. Sunucu parolayı kullanarak PFX/P12 paketini açar, sertifika ile private key eşleşmesini ve geçerlilik aralığını denetler, izole geçici bağ üzerinde gerçek TLS el sıkışması yapar ve Subject, issuer, tarih ile SHA-256 parmak izini gösterir. Doğrulama canlı sertifikayı değiştirmez; on dakikalık, tek kullanımlık, kullanıcı ve organizasyona bağlı staging token üretir. Yeni paket yalnız **Ayarları kaydet** sırasında atomik olarak etkin yola alınır. Ayar veya denetim yazımı başarısız olursa önceki ayar, PFX ve çalışma durumu geri yüklenir.

Bu doğrulama kurumsal CA güvenini veya yayın adresinin tüm SAN kapsamını kurum adına onaylamaz. Kaynağı ve beklenen alan adlarını özel kanaldan doğrulayın; kaydetme ve servis yeniden başlatma sonrasında gerçek HTTPS adresini ayrı bir istemciden sınayın.

Yayın adresi, port veya kurumsal sertifika değişikliği yeniden başlatmadan sonra tarayıcı erişimini kesebilir. Kaydetmeden önce çalışan adresi not edin ve onaylı bir sunucu konsolu ya da kurtarma bağlantısı hazırlayın.

## SMTP

**SMTP açık** seçildiğinde hesap adı, SMTP sunucusu, port, gönderen e-posta, TLS/STARTTLS, kimlik doğrulama, kullanıcı adı ve parola veya token alanları görünür. **SMTP kapalı**, uygulama içi bildirimleri ve denetim kaydını sürdürürken e-posta gönderimini durdurur; kimlik doğrulama ayrıca kapatılıp form kaydedilmedikçe kayıtlı SMTP ayrıntıları korunur.

Önemli sınırlar:

- SMTP sunucusu alanına yalnız sunucu adı girilir. Adres şeması, kimlik bilgisi, port, dosya yolu veya sorgu verisi eklemeyin.
- Kimlik doğrulama açıksa TLS/STARTTLS, kullanıcı adı ve yeni ya da önceden kaydedilmiş parola/token gerekir.
- Parola alanını boş bırakmak, daha önce kaydedilmiş değeri korur. Arayüz kayıtlı sırrı geri okuyup göstermez.
- Alıcılar ve olay kuralları bu sekmede değil, **Bildirimler** ekranında yönetilir. SMTP açılacaksa en az bir alıcı ve bir bildirim olayı bulunmalıdır.
- **Test gönder**, ekranda o anda görünen SMTP değerlerini kaydetmeden kullanır. Test alıcısı zorunludur; deneme, taslağı kalıcılaştırmaz.
- Başarılı test, `SMTP_TEST_EMAIL_SEND` işlemiyle bir `SERVER_MAINTENANCE` olayı yazar. Parola veya token denetim meta verisine eklenmez.

## Ortak Kaydetme ve Sıfırlama Davranışı

Genel, Erişim ve SMTP ayrı sekmeler gibi görünür; ancak sunucu ilkesi alanları aynı formu ve aynı taslağı paylaşır:

- **Ayarları kaydet**, parola ilkesini, günlük düzeyini, yayın adresini, sertifika seçimini ve SMTP yapılandırmasını birlikte gönderir.
- Bu nedenle açık durumdaki eksik SMTP yapılandırması, **Erişim & HTTPS** sekmesinden başlatılan kaydetmeyi engelleyebilir. Geçersiz yayın adresi veya port da **SMTP** sekmesinden başlatılan kaydetmeyi durdurabilir.
- **Formu sıfırla**, üç sekmedeki kaydedilmemiş taslağı birlikte bırakır ve sunucunun son döndürdüğü ayarları yeniden yükler. Sunucuda geri alma işlemi yapmaz.
- Bakım sekmesi kendi işlemlerini çalıştırır; bu sekmede Kaydet veya Sıfırla alt çubuğu yoktur.
- Kaydetme başarısı ayar dosyasının yazıldığını gösterir. Arayüz, yeni değerlere güvenmeden önce servisin yeniden başlatılmasını ister.

Kurumsal sertifika seçildiyse yalnız önceden doğrulanmış staging token kaydetmeye gönderilir. PFX yükseltmesi, şifreli parola/ayar kaydı ve başarı denetimi aynı geri alma sınırındadır; kalıcılık veya denetim başarısızsa önceki etkin PFX ile ayarlar geri yüklenir. Süresi dolan veya daha önce kullanılan token reddedilir; dosyayı yeniden doğrulayın.

<a id="maintenance-and-logs"></a>

## Bakım ve Loglar

Bu sekme geçerli veritabanı yolunu, veritabanı koruma durumunu, servis günlük yolunu, geçiş içe aktarımını ve kategori bazlı bakım yedeklerini gösterir. Bunlar tanı ve bakım alanlarıdır. Sunucu yedeği içe aktarma ile servis yeniden başlatma kartları **Genel** sekmesindedir; çalışma günlük düzeyi de **Genel** üzerinden seçilir.

### Genel sekmesindeki sunucu yedeğini içe aktarma

**Sunucu yedeğini içe aktar**, VaultPilot Backup Tool ZIP arşivini veya şifreli JSON dışa aktarımını kabul eder. Bu işlem birleştirme değil, tüm profili geri döndürme işlemidir:

- Sahip rolü yüklemeden önce işlemi onaylar.
- Bütünlük ve özgünlük bilgisi denetlenir. Eski ya da başka kaynaktan gelen yedek için ek risk onayı gerekir.
- Mevcut kuruluş, kullanıcılar, kasalar, şifreli kayıtlar, dosya parçaları ve denetim geçmişi tek veritabanı işlemi içinde değiştirilir.
- İçe alınan 2FA bağları temizlenir. Ardından kalıcı oturumlar kapatılır ve operatör yedek profiline ait ana parolayla yeniden kilit açar.
- Geri yüklenen profile, adetleri ve özgünlük denetiminin gevşetilip gevşetilmediğini belirten bir `IMPORT` olayı eklenir.

Bu ekranda tüm sunucu yedeği oluşturan veya dışa aktaran bir düğme yoktur. Kurtarma dosyasını VaultPilot Backup Tool ile oluşturun.

### İçe aktarım ve geçiş

**Dışa aktarım dosyası seç**, desteklenen dosyayı tarayıcıda okur ve Parolalar ekranında önizleme açar. Bitwarden CSV/JSON, LastPass CSV, KeePass XML/CSV, 1Password CSV ve Chrome/Edge CSV biçimleri gösterilir. `.1pux` arşivi içe alınmaz; 1Password CSV dışa aktarımını kullanın. **VaultPilot şablonu**, ürün şablonunu indirir.

Önizleme, kalıcı kayıt anlamına gelmez. Son içe aktarma için aktif kasanın kilidi açık olmalı; lisans yazılabilir, kasa rolü Editor veya Manager olmalıdır. Satırlar seçilen çakışma kuralına göre sırayla oluşturulur ya da güncellenir. Sonraki bir satır hata verdiğinde önceki satırlar kaydedilmiş olabilir. Yeniden denemeden önce sonuç adetlerini ve kayıt bazındaki denetim olaylarını karşılaştırın.

### Genel sekmesindeki sunucu servisini yeniden başlatma

**Yeniden başlat**, yalnız Sahip rolünde ve Sunucu ayarları taslağında kaydedilmemiş değişiklik yokken açılır. Uyarı onayından sonra uygulama `VaultPilotServer` veya eski kurulumlarla uyumlu `PassManServer` servisi için yeniden başlatma kuyruğu oluşturur. Sağlık denetiminin tamamlanmasını beklemez. Konsol kısa süre bağlantıyı kaybedebilir; yalnız kaydedilmiş ayarlar devreye girebilir.

Kuyruk işlemi, `SERVER_RESTART_QUEUE` ayrıntısıyla `SERVER_RESTART` olayı yazar. Bağlantı geri geldiğinde servisi, etkin HTTPS adresini ve yeni bir oturum açmayı doğrulayın.

### Bakım kayıtları

Arayüzdeki tek temizlik biçimi **Yedekle ve temizle** işlemidir. Her çalıştırmada yalnız bir kategori ele alınır:

| Kategori | Kapsam |
| --- | --- |
| Denetim kaydı | Denetim ekranı geçmişi, zincir kontrolü kayıtları ve paneldeki denetim geçmişi. |
| Keşif | Keşif işleri, bulgular, bastırmalar ve tarama ilkeleri. |
| İşlemler | İşlem geçmişi ve bitmiş arka plan görevleri; etkin işlemler ve çalışan görevler korunur. |

Uyarı onayından sonra VaultPilot, sunucudaki `maintenance-backups` dizinine kalıcı JSON yedeği yazar, kayıt adedini ve SHA-256 özetini kaydeder, ardından yalnız seçilen kategoriyi temizler. Kasa sırları, kaynak dosyalar, servis günlük dosyaları ve diğer bakım kategorileri bu temizliğe girmez.

Arşiv tablosu dosya adı, kategori, oluşturma zamanı, kayıt adedi, boyut, özet ve **Geri yükle** işlemini gösterir. Geri yükleme yalnız seçilen kategoriyi yedekteki duruma döndürür. Yedekten sonra oluşan canlı kayıtlar değişebilir veya kaybolabilir; diğer kategoriler değişmez. Temizlik ve geri yükleme; işlem, kategori, adetler, yedek dosyası adı ve özet içeren `SERVER_MAINTENANCE` kanıtı bırakır.

## Giriş Güvenliği Bağlamı

**Giriş güvenliği**, Sunucu ayarları kabuğuna yerleştirilmiş kişisel güvenlik alanıdır; ortak sunucu ayarları formunun parçası değildir. Geçerli kullanıcının ana parola değişimini ve 2FA bağını yönetir. Yalnız Sahip rolü ayrıca etkin oturum tablosunu görür ve geçerli olmayan oturumları kapatabilir.

Bu sekme açıkken üst çubuktaki `?`, bilinçli olarak bu sayfa yerine [Giriş güvenliği](screen-sign-in-security.md) kılavuzunu açar.

## Denetim ve Kısmi Tamamlanma Sınırı

Bu işlemlerde asıl etki, izleyen bütün kanıtlar yazılmadan önce oluşabilir. Hata yanıtı her zaman hiçbir şey yapılmadığı anlamına gelmez:

- Kurumsal PFX yalnız doğrulanmış, tek kullanımlık staging token ile atomik kayıtta etkinleştirilebilir; başarısız kaydetme önceki PFX'i korur.
- Ayarlar, denetim olayı eklenmeden önce yazılmış olabilir.
- Test e-postası, denetim olayı eklenmeden önce teslim edilmiş olabilir.
- Servis yeniden başlatması, denetim olayı eklenmeden önce kuyruğa alınmış olabilir.
- Bakım yedeğiyle kategori temizliği veya geri yükleme, son bakım olayı yazılmadan önce tamamlanmış olabilir.
- Profil içe aktarma, oturum temizliği tamamlanmadan önce veritabanını değiştirmiş olabilir.
- Geçiş içe aktarımı, sonraki bir satır hata vermeden önce bazı satırları kaydetmiş olabilir.

Sonucu belirsiz bir hatadan sonra işlemi hemen yinelemeyin. İlgili ekranı yenileyin, etkin durumu kontrol edin, denetim ve operasyon günlüklerini inceleyin, varsa kalıcı yedek kaydını uzlaştırın.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Sunucu API'si bekleniyor | Tanı verilerinin yüklenmesini bekleyin. Sürerse geçerli oturumu ve sunucu erişimini doğrulayın. |
| Güncel | Yüklenen taslak, sunucunun döndürdüğü kayıtlı ayarlarla eşleşir. Bu durum dış HTTPS veya SMTP adresinin çalıştığını kanıtlamaz. |
| Kaydedilmemiş değişiklik | İşlemden ayrılmadan önce kaydedin ya da sıfırlayın. Taslağın Erişim ve SMTP sekmelerini birlikte kapsadığını unutmayın. |
| Kaydetme sonrası yeniden başlat / Yeniden başlatma gerekli | Çalışan kurtarma bağlantısını koruyun, önce kaydedin, sonra onaylı zamanda Bakım sekmesinden yeniden başlatın. |
| SMTP kapalı | E-posta durur; uygulama içi bildirimler ve denetim kaydı sürer. |
| Parola kayıtlı / Parola yok | Sunucuda kimlik bilgisi vardır ya da yoktur. Kayıtlı değer gösterilmez. |
| Test gönderiliyor | Sonucu ve hedef posta kutusunu doğrulamadan ikinci test göndermeyin. |
| Sahip rolü gerekli | Salt okunur incelemeyi sürdürün veya değişikliği Sahip rolüne aktarın. |
| Bakım yedek arşivi okunuyor | Sunucudaki kalıcı listenin gelmesini bekleyin; henüz yedek olmadığı sonucuna erken varmayın. |
| Bakım yedeği yok | Yalnız seçilen kategoriyi gerçekten temizlemek istiyorsanız **Yedekle ve temizle** çalıştırın. |
| Kategori bakımı çalışıyor | Başka kategori bakımı başlatmayın ve servisi yeniden başlatmayın. |
| Sunucu yedeği içe alınıyor | Tarayıcıyı ve sunucuyu erişilebilir tutun; sayfayı yenilemeyin, servisi yeniden başlatmayın ve dosyayı tekrar yüklemeyin. |
| İşlem hata döndürdü | Yeniden denemeden önce etkinin daha önce oluşup oluşmadığını doğrulayın. |

## İşlemden Önce

- Etkin rolü, lisans durumunu, açık sekmeyi ve amaçlanan kapsamı doğrulayın.
- Erişim değişikliğinde çalışan adresi kaydedin ve yeniden başlatmadan önce sunucu konsoluna erişim hazırlayın.
- Kurumsal sertifikanın kaynağını, alan adı kapsamını, bitiş tarihini, özel anahtarını ve kurtarma kopyasını tarayıcı konsolunun dışında doğrulayın.
- SMTP için göndereni, test alıcısını, alıcı listesini, olay kurallarını ve boş parola alanının kayıtlı değeri koruması gerekip gerekmediğini kontrol edin.
- Tüm profil içe aktarımı veya yüksek etkili başka sunucu işlemleri öncesinde VaultPilot Backup Tool ile tam kurtarma yedeği oluşturun.
- Bakım temizliğinden önce kategoriyi adlandırın, görünen kayıt adedini alın ve otomatik bakım yedeğinin, tam profil yedeği değil yalnız bu kategori için geri dönüş noktası olduğunu doğrulayın.
- Geri yüklemeden önce yedek kategorisini, oluşturma zamanını, kayıt adedini ve özeti karşılaştırın; değişebilecek yeni kayıtları belirleyin.
- Geçiş öncesinde doğru kasanın kilidini açın, ilgisiz seçimleri temizleyin, çakışma kuralını seçin, geçersiz veya yinelenen her satırı inceleyin.

## Güvenli Kanıt

- Paylaşılabilir: sekme adı, genel durum, geniş zaman aralığı, `<SERVER_HOST>` gibi maskelenmiş sunucu adı, yayın portu, sertifika kaynağı ve dosya uzantısı, SMTP açık/TLS/kimlik doğrulama bilgisi, alıcı ve olay adetleri, bakım kategorisi ve toplu başarı/hata adetleri.
- Gizli kalmalı: tam iç sunucu adı veya IP adresi, veritabanı ve günlük dosyası yolları, PFX/P12 içeriği, sertifika parolası veya özel anahtar, SMTP kullanıcı adı/parola/token, gönderen ve alıcı adresleri, oturum kimlikleri, yedek ZIP/JSON dosyaları, geçiş dosyaları, kayıt adları, ham günlükler ve müşteri bağlamı içeren kopyalanmış denetim meta verileri.
- Tam yedek dosyası adını veya özetin tamamını yalnız uzlaştırma için gerekiyorsa onaylı özel destek kanalından paylaşın.

## Ne Zaman Durmalı

Çalışan adres kaydedilmemişse, sunucu konsoluyla kurtarma mümkün değilse, sertifika sahipliği veya özel anahtar kapsamı belirsizse, SMTP onaysız alıcıya gidecekse, aktif kasa ya da çakışma kuralı kesin değilse, yedek kategorisi veya zamanı amaçlanan geri yüklemeyle eşleşmiyorsa, bakım arşivi okunamıyorsa, yeni kategori kayıtlarının etkisi değerlendirilmemişse ya da önceki deneme belirsiz hata verdiyse durun. Devam etmeden önce son kalıcı durumu uzlaştırın.

## Operatör Notları

Kaydet işlemini anında çalışan yapılandırma değişikliği, Yeniden başlat işlemini tamamlanmış sağlık denetimi, SMTP test hatasını iletinin gitmediğine dair kanıt, bakım yedeğini tam kasa yedeği, geçiş önizlemesini tamamlanmış içe aktarım veya kategori geri yüklemesini tüm sunucuyu geri alma işlemi olarak anlatmayın. Sertifika paketlerini, kimlik bilgilerini, kurtarma arşivlerini, yerel dosya yollarını veya ham günlükleri yayımlamayın.

## İlgili

- [Sunucu Sistemi](server-system.md)
- [Yayın adresi ve HTTPS](public-host-https-certificate.md)
- [Giriş güvenliği](screen-sign-in-security.md)
- [Bildirimler ekranı](screen-notifications.md)
- [Denetim Geçmişi ekranı](screen-audit-log.md)
- [Güvenli destek kanıtı](support-evidence-pack.md)
- [Sunucu ayarları yeniden başlatma ve bakım bilgi bankası](../../kb/tr/server-settings-restart-maintenance.md)
- [Yedek içe aktarma hatası](../../kb/tr/backup-import-fails.md)
