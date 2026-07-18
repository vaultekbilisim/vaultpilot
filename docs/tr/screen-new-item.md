# Yeni Kayıt Ekranı

Genel üst çubuktaki **Yeni kayıt ekle** denetimi Parola, API anahtarı, Güvenli not, Sertifika ve Dosya seçeneklerini açar; seçilen türü yerel Yeni kayıt düzenleyicisinde gösterir. Düzenleyicideki `?` bu kılavuzu açar. Başarılı kaydetme, şifreli kaydı o anda aktif olan kasada oluşturur. Düzenleyicide otomatik kayıt, taslak saklama, şablon seçici veya otomatik rotasyon işlemi yoktur.

## Erişim, Aktif Kasa ve Lisans Sınırı

Genel seçici ve yerel düzenleyici Auditor rolüyle açılabilir; bu durum yazma yetkisi vermez. Kaydetmek için kilidi açık bir aktif kasa ve bu kasanın tarayıcıda tutulan anahtarı gerekir. Oturum açan kişi sistem düzeyinde Owner, Admin veya User olmalı; ayrıca aktif kasada **Editor** ya da **Manager** yetkisine sahip olmalıdır. Auditor, kasa **Viewer** rolü ve salt okunur lisans durumunda Kaydet denetimi devre dışıdır. İstemci denetimi aşılmaya çalışılsa bile sunucu oturumu, lisansı, kasayı ve rolü bağımsız olarak doğrular.

Yeni kayıt ekranında kasa seçici yoktur. Kayıt, **Şifreli kaydı kaydet** seçildiği sırada aktif olan kasaya yazılır. Hassas bilgi girmeden önce aktif kasayı başka bir ekrandan doğrulayın. Elle oluşturulan Parola, API anahtarı, Güvenli not, Sertifika ve Dosya kayıtları için yazmaya açık lisans dışında ayrı bir özellik lisansı aranmaz.

## Elle Oluşturulabilen Kayıt Türleri

Tür şeridinde beş seçenek bulunur:

| Tür | Kaydetmek için zorunlu | İsteğe bağlı bağlam |
| --- | --- | --- |
| Parola | Başlık ve Parola. | Kullanıcı adı/e-posta, oturum açma adresi, not. |
| API anahtarı | Başlık ve API anahtarı ya da token. | İstemci/sahip/servis hesabı, konsol adresi, kapsam veya rotasyon notu. |
| Güvenli not | Başlık ile Şifreli not veya İsteğe bağlı gizli değer alanlarından en az biri. | Sahip/ekip ve ilgili sistem bilgisi. |
| Sertifika | Başlık ve en az bir geçerli X.509 sertifikası. | Zincir/intermediate, eşleşen private key, PFX/P12 paketi, sahip/servis, uç nokta, not ve sertifika yetkilisi sınıfı. |
| Dosya | Başlık ve yeni kayıt için seçilmiş tek dosya. | Sahip/alıcı, ilgili sistem/talep ve dosya notu. |

`CREDENTIAL`, saklanabilen bir sır türüdür ancak elle seçim şeridinde bilerek gösterilmez. Yeni Active Directory kimlik bilgisi kayıtları ajan eşitlemesiyle oluşturulur. Elle kimlik bilgisi oluşturma girişimi reddedilir ve form **Entegrasyonlar > Active Directory** bölümüne yönlendirir. Yeni kayıt ekranını RDP veya SSH kimlik bilgisi oluşturuyormuş gibi anlatmayın.

Bu formda genel bir Sahip veya Etiketler denetimi yoktur. Hesap alanı türe özgü bağlamdır; her durumda sahip alanı sayılmaz. Sertifika yetkilisi seçimi denetimli sertifika etiketleri ekler, diğer genel etiketler burada düzenlenmez.

## Burada Ne Yapılır

- Zorunlu değeri girmeden önce elle oluşturulabilen beş kayıt türünden birini seçin.
- Açık bir başlık yazın; yalnız kaydı güvenle bulmak ve işletmek için gereken bağlam alanlarını doldurun.
- Değeri üretin veya yapıştırın. Sunuluyorsa ve kurum ilkesi izin veriyorsa isteğe bağlı sızıntı kontrolünü ayrıca çalıştırın.
- Sertifika türünde ana sertifika, zincir/intermediate, private key ve PFX/P12 kaynaklarını ayrı denetimlerden ekleyin; Dosya türünde belgelenen sınırlar içinde tek dosya seçin.
- **Şifreli kaydı kaydet** seçeneğine basmadan önce aktif kasayı ve yazma yetkisini yeniden kontrol edin.
- Mevcut formu silip seçili türün listesine dönmek için geri okunu kullanın.

## Tür Değişikliği ve Hassas Veri Sınırları

Sertifika, Kimlik bilgisi ve Dosya ayrı hassas veri sınırlarıdır. Bu türlerden birine geçerken veya bunlardan çıkarken formda gizli değer, sertifika/private-key materyali, dosya seçimi ya da dizin bağlantısı varsa VaultPilot açık onay ister. Onaydan sonra bu hassas alanlar, çalışan sertifika worker'ı ve geçici kaynak parolaları temizlenir; başka bir türde gizlenip sonraki kayda taşınmaz. Başlık, hesap, adres, not, kategori, ortam, sahip ve etiketler gibi genel bağlam alanları korunabilir.

Parola, API anahtarı ve Güvenli not arasındaki geçişler aynı genel kayıt sınırında kalır ve girilmiş değer korunabilir. Yine de Kaydetmeden önce görünen türü ve değeri yeniden kontrol edin. Tür değişikliğinden vazgeçerseniz mevcut taslak değişmeden kalır. Form gönderilene kadar hiçbir alan kaydedilmez; otomatik kayıt veya kayıtlı taslak listesi yoktur.

## Değer Üretme, Güç ve Sızıntı Kontrolü

Parola üretici, Dosya dışındaki bütün elle kayıt türlerinde kullanılabilir. Küçük harfler seçim havuzunda her zaman bulunur; Büyük harf, Rakam ve Sembol seçenekleri kendi kümelerini bu havuza ekler. Birleşik havuzdan rastgele seçim, küçük harf dahil herhangi bir kümeden en az bir karakter geleceğini garanti etmez. Görünen uzunluk ayarı 12–64 karakter aralığındadır; varsayılan değer 24'tür ve üç seçenek de açıktır. Üretim tarayıcının kriptografik rastgeleliğini kullanır, mevcut gizli değer alanının üzerine yazar ve kaydı kendiliğinden kaydetmez.

**Kısa / Hazır / Güçlü** göstergesi yalnız uzunluğa göre bilgi verir: 16 karakterden az, 16–23 veya 24 ve üzeri. İlke kararı, entropi kanıtı, sızıntı sonucu ya da kaydetme koşulu değildir.

Sızıntı düğmesi gösterildiğinde kontrol ancak operatör düğmeye bastıktan sonra çalışır. Tarayıcı değerin SHA-1 özetini alır ve HIBP Pwned Passwords aralık servisine yalnız ilk beş özet karakterini gönderir; tam değer gönderilmez. Formdaki sonuç mevcut alanın özetiyle bağlı tutulmaz: kontrol sonrasında değer üretmek, yapıştırmak veya düzenlemek eski sonucu ekranda bırakabilir; bu sonuç, Dosya dışındaki başarılı kayıttan sonra kaydın tarayıcıdaki yerel sızıntı durumuna aktarılabilir. Önce son değeri belirleyin, ardından Kaydet'e basmadan hemen önce sızıntı kontrolünü yeniden çalıştırın. Kontrol hatası kaydı kaydetmez veya değiştirmez; ekrandaki eski sonucun güncel değerle eşleştiğini de kanıtlamaz.

## Sertifika İşleme

Sertifika düzenleyicisi dört ayrı kaynak rolü sunar: **Ana sertifika**, **Zincir / intermediate**, **Private key** ve **PFX / P12**. Her role birden fazla kaynak ekleyebilir, yanlış veya eski kaynağı kendi kaldırma düğmesiyle diğerlerine dokunmadan çıkarabilirsiniz. PEM, CRT, CER, DER, P7/P7B/P7C/CMS, PFX/P12/PKCS12, P8/P8E/PK8, PKCS#1, PKCS#8 ve KEY biçimleri desteklenir; bir kayıtta en fazla 16 kaynak ve toplam 10 MB materyal bulunabilir.

Tarayıcı her kaynağın SHA-256 özetini hesaplar ve gerçek kriptografik ayrıştırma yapar. X.509 sertifikaları ile PKCS#7 zincirlerini okur; PFX/P12 paketlerini açar; desteklenen RSA, EC ve RFC 8410 anahtarlarını tanır. Private key varsa public key bilgisini ana sertifikayla karşılaştırır. En az bir geçerli X.509 sertifikası bulunmadan, anahtar eşleşmeden, parola korumalı kaynak açılamadan veya limit hatası giderilmeden kayıt kaydedilmez. Kaynak baytları yalnız kasa anahtarıyla şifrelenen kayıt yüküne alınır; karttan ham gösterme, kopyalama veya özgün dosya indirme sunulmaz.

Parola korumalı her PFX/P12 ya da private-key kaynağının kendi **Kaynak parolası** alanı vardır. **Parolayı bu kasada şifreli sakla** varsayılan olarak kapalıdır. Açıldığında bile yalnız kriptografik ayrıştırmada gerçekten kullanılan parola şifreli kayda alınır; şifresiz kaynağa yanlışlıkla yazılmış veya hiçbir kaynak tarafından tüketilmemiş değer saklanmaz. Seçenek kapalıysa parola doğrulama boyunca tarayıcı belleğinde kalır ve kilit, oturum, kullanıcı ya da kasa değişiminde temizlenir.

Sona erme tarihi ve Subject/CN formda düzeltilebilir. DigiCert, GoDaddy, GlobalSign, Let's Encrypt, Microsoft CA veya Self-signed seçmek yalnız kaydın sertifika kategorisini ve sınıflandırma etiketlerini değiştirir. İlgili sertifika yetkilisine bağlanmaz; hesabı doğrulamaz; sertifika sipariş etmez, yenilemez, yeniden düzenlemez, iptal etmez veya dağıtmaz.

## Dosya İşleme ve Sınırlar

Yeni Dosya kaydı için tek dosya seçilmelidir. Seçim form türünü Dosya olarak değiştirir, Başlık hâlâ boşsa dosya adını başlık olarak doldurur, gizli değer alanını temizler ve boyut ile parça sayısını gösterir. Parola üretici ve gizli değer düzenleyicisi Dosya türünde bulunmaz.

Dosya boyutu ve depolama tavanı, aktif kasada kullanıcı başına 1 GB'dir. Dosyalar en fazla 2 MB'lik parçalara ayrılır ve en çok 512 parça olabilir. Kaydet sırasında tarayıcı önce bütün dosyanın SHA-256 özetini hesaplar, şifreli Dosya kaydını oluşturur, o kaydın varsa mevcut parçalarını temizler; ardından her parçayı aktif kasa anahtarıyla şifreleyip yükler. Sunucu kota uygulamak için şifreli parçalarla birlikte boyut ve parça konumu bilgisini saklar; düz metin dosya baytlarını almaz.

Dosya kaydının oluşturulması ve parçaların yüklenmesi ayrı işlemlerdir. Kayıt oluşturulduktan veya bazı parçalar kabul edildikten sonra yükleme başarısız olursa otomatik işlem geri alma yoktur. Yeniden denemeden ya da kaydı değiştirmeden önce Dosyalar ekranını yenileyip kayıt ile parçaların kullanılabilirliğini doğrulayın. Hata bildiriminin hiç kayıt veya kısmi yükleme kalmadığını kanıtladığını varsaymayın.

## Tarayıcı Şifrelemesi, Kaydetme ve Denetim Sonucu

Dosya dışındaki kayıtlar için tarayıcı form yükünün tamamını serileştirir ve sunucuyu çağırmadan önce aktif kasa anahtarıyla AES-GCM kullanarak şifreler. Sunucu şifreli zarfı, kayıt türünü, kasa kimliğini, oturum rolünü, lisans kipini ve kasa yazma yetkisini doğrular; düz metin başlık, hesap, değer, adres, not veya sertifika materyalini almaz.

Tarayıcının yerleşik zorunlu alan doğrulaması; gönderme işleyicisinden, tarayıcı şifrelemesinden ve sunucu isteğinden önce çalışır. Bu doğrulama geçerse gönderme işleyicisi aşağıdaki koşulları sırayla kontrol eder:

1. Aktif kasa ve tarayıcıdaki kasa anahtarı bulunmalıdır.
2. Lisans ve aktif kasa rolü yazmaya izin vermelidir.
3. Yeni Active Directory kimlik bilgisi bu ekrandan oluşturulamaz.
4. Her tür için Başlık zorunludur.
5. Parola ve API anahtarı için gizli değer boş bırakılamaz; Sertifika için ayrıştırılmış en az bir gerçek X.509 sertifikası bulunmalı ve eklenen private key ana sertifikayla eşleşmelidir.
6. Güvenli not için not içeriği veya isteğe bağlı gizli değer bulunmalıdır.
7. Yeni Dosya için seçilmiş ya da formda kalmış dosya bilgisi bulunmalı; yeni seçilen dosya 1 GB sınırını aşmamalıdır.

Bu tarayıcı kontrolleri operatöre geri bildirim sağlar; yetkilendirme sınırı değildir. İşleyici yükü şifreledikten sonra sunucu oturumu, şifreli zarfı, kayıt türünü, kasa kimliğini, lisans kipini ve kasa yazma rolünü bağımsız olarak doğrular. Erişimi korumak için yerel Kaydet düğmesine veya yerel zorunlu alanlara güvenmez.

Sertifika içe aktarma, şifreleme, kaydetme veya dosya yükleme sürerken gönderme denetimi devre dışı kalır ve ilerleme gösterilir. Aktif kaydetme veya yükleme işlemi için form içinde iptal düğmesi yoktur.

Başarılı oluşturmadan sonra Parola, API anahtarı ve Güvenli not `CREATE`; Sertifika ve Dosya ise `IMPORT` denetim olayı yazar. Dosya parçalarını hazırlama, kaydın mevcut parça kümesini temizlediği için ayrıca `EDIT` denetim olayı üretir. Form sıfırlanır, ilgili kayıt listesi açılır, sır ve denetim sorguları yenilenir. Başarı bildirimi sunucuda şifreli saklamayı doğrular; kimlik bilgisinin sınandığını, sertifikanın dağıtıldığını veya dosyanın başarıyla açıldığını göstermez.

## İptal ve Hata Davranışı

- Geri oku yerel formu sıfırlar ve kaydedilmemiş değişiklik onayı göstermeden seçili türün listesine döner. Gezinme, başlamış sertifika okuma, kaydetme veya yükleme işini durdurmaz. Gezinmeyi iptal yöntemi olarak kullanmayın; tamamlanma ya da hatayı bekleyip listeyi ve Denetim Günlüğünü uzlaştırın.
- Yeni kayıt için ayrı İptal düğmesi yoktur. **Düzenlemeyi iptal et** yalnız mevcut ve düzenlenebilir bir kayıtta görünür; seçildiğinde düzenleme kipini kapatır ve kayıt listesine dönmek yerine Yeni kayıt ekranında boş bir Parola taslağı bırakır.
- Sınırı aşan Dosya reddedildiğinde o anki seçici temizlenir ancak önceki dosya bilgisi ortak formda kalabilir. Sertifika kaynağı okunamıyor, parola yanlış veya anahtar eşleşmiyorsa sorunlu kaynağı kaldırın ya da değiştirin ve doğrulamayı yeniden çalıştırın; başarılı doğrulama görülmeden Kaydet'e basmayın.
- Çoğu doğrulama ve kaydetme hatasında form, operatörün düzeltme yapabilmesi için bellekte kalır. Sayfayı yenileme, kilitleme, gezinme sıfırlaması veya geri okunun taslağı saklayacağını düşünmeyin.
- Başarısız kaydetme ekranda hata ve canlı uygulama bildirimi üretir. Yanıtın tamamını veya form içeriğini herkese açık desteğe yapıştırmayın.
- Dosya yükleme kayıt oluşturulduktan sonra başarısız olabilir; yeniden denemeye karar vermeden önce Dosyalar ve Denetim Günlüğü ekranlarını kontrol edin.

## Önerilen İş Akışları

### Parola, API anahtarı veya Güvenli not oluşturma

1. Aktif kasayı ve Editor ya da Manager rolünü doğrulayın.
2. Kesin kayıt türünü seçip Başlık girin.
3. Zorunlu değeri ekleyin; Güvenli not için not içeriği, gizli değer veya ikisini birden kullanın.
4. Yalnız gerekli hesap, adres ve işletim bağlamını ekleyin.
5. İsterseniz değer üretin. Son değeri belirledikten sonra Kaydet'e basmadan hemen önce sızıntı kontrolünü çalıştırın; bu işlemlerin hiçbiri otomatik kaydetmez.
6. **Şifreli kaydı kaydet** seçeneğine basın, tamamlanmasını bekleyin ve beklenen liste ile denetim olayını doğrulayın.

### Sertifika kaydı içe aktarma

1. Sertifika türünü seçip hassas olmayan bir başlık girin.
2. Ana sertifika, zincir/intermediate, private key ve PFX/P12 materyalini doğru kaynak rolüne ekleyin; parola korumalı her kaynağa kendi parolasını girin.
3. X.509 ayrıştırmasını, private key eşleşmesini, zincir durumunu, SHA-256 değerlerini, Subject/issuer ve geçerlilik aralığını inceleyin. Gerekmedikçe kaynak parolasını kalıcı saklamayın.
4. Kaydedin ve `IMPORT` denetim olayını doğrulayın. Kartta ham materyal yerine meta veri, parmak izi ve güvenli üretilmiş zincir paketi/PFX eylemlerinin bulunduğunu unutmayın.
5. Envanter incelemesi için Sertifikalar ekranını, VaultPilot HTTPS paketi için Sunucu ayarlarını kullanın; bu ekran dağıtım yapmaz.

### Dosya saklama

1. Kullanıcı ve kasa başına kullanılabilir kotayı doğrulayın; 1 GB'yi aşmayan bir dosya seçin.
2. Otomatik önerilen başlığı, dosya adını, boyutu, parça sayısını ve hedef kasayı inceleyin.
3. Kaydedin; özet alma, şifreleme ve yükleme tamamlanırken sayfayı açık tutun.
4. Yüklemeyi tamamlanmış saymadan önce Dosyalar ekranını açın ve kaydın geri alınabildiğini doğrulayın.
5. Hata oluştuysa yeniden denemeden önce Dosyalar ve Denetim Günlüğünde oluşturulmuş kayıt veya kısmi parça durumu bulunup bulunmadığını inceleyin.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Yeni taslak | Türü seçip zorunlu alanları tamamlayın; henüz hiçbir şey kalıcı değildir. |
| Kilidi açık aktif kasa yok | Materyal girmeden veya kaydetmeden önce hedef kasayı seçip kilidini açın. |
| Viewer / Auditor | Seçici veya düzenleyici açılabilir ancak Kaydet devre dışıdır ve sunucu yazmayı korur. Editor veya Manager kasa yetkisine sahip bir Owner, Admin ya da User hesabı kullanın. |
| Salt okunur lisans | Görüntüleme sürebilir ancak Kaydet kapalı kalır. |
| Tür değiştirildi | Sertifika, dosya veya etiket işlemi sonrasında sıfırlayıp yeniden açmayı tercih edin; aksi durumda ortak ve gizli verinin tamamını yeniden kontrol edin. |
| Başlık veya değer eksik | Seçili türün kesin zorunlu alanlarını tamamlayın. |
| Sertifika içe aktarılıyor | Tarayıcının okuma ve özet alma işlemini bekleyin; henüz kaydedilmiş kayıt değildir. |
| Sertifika kaynağı geçersiz | Sorunlu kaynağı kaldırın veya değiştirin; parola, biçim, toplam 10 MB/16 kaynak sınırı ve private key eşleşmesini düzeltip doğrulamayı yeniden çalıştırın. |
| Dosya seçilmedi | Yeni Dosya kaydını kaydetmeden önce tek dosya seçin. |
| Dosya büyük / kota aşıldı | Önceki dosya bilgisi kalabilir. Sıfırlayıp yeniden açın; ardından aktif kasadaki kullanıcı toplamını 1 GB içinde tutan dosyayı seçin. |
| Şifreleniyor / yükleniyor | Sayfayı açık tutun; devam eden işlem için iptal denetimi yoktur ve gezinme işi durdurmaz. |
| Kaydetme başarılı | Hedef listeyi ve `CREATE` ya da `IMPORT` denetim kanıtını doğrulayın. |
| Kaydetme başarısız | Gizli ayrıntıları koruyun, formu düzeltin ve Dosya kaydı veya kısmi parçaların oluşup oluşmadığını kontrol edin. |

## İşlemden Önce

- Aktif kasayı doğrulayın; bu ekranda kasa seçici yoktur.
- Yazmaya açık lisansı ve o kasadaki Editor ya da Manager erişimini doğrulayın.
- Yeni RDP/SSH kimlik bilgisi kayıtları için Yeni kayıt yerine Active Directory eşitlemesini kullanın.
- Hassas materyal girmeden önce türü seçin. Sertifika, dosya veya etiket işleminden sonra tür değiştiyse sıfırlayıp yeniden açın; aksi durumda gizli ortak durumu yeniden kontrol edin.
- Sertifika ve dosyalarda kaynak yetkisini, sınıflandırmayı, saklama süresini, boyutu ve hedefi doğrulayın.
- Üretme, sızıntı kontrolü, sertifika içe aktarma ve sertifika yetkilisi seçiminin hiçbir şeyi kaydetmediğini veya dağıtmadığını unutmayın. Son değer değişikliğinden sonra, Kaydet'e basmadan hemen önce sızıntı kontrolünü yeniden çalıştırın.

## Güvenli Kanıt

- Paylaşılabilir: seçili elle kayıt türü, genel doğrulama durumu, boyut aralığı, parça sayısı, genel denetim eylemi ve yer tutuculu alan haritası.
- Gizli kalmalı: başlık, hesap, adres, not, sahip/ekip bağlamı, sertifika konusu/yayıncısı/seri numarası/özeti, dosya adı, kesin boyut ve iç sistem ya da talep bilgisi.
- Asla paylaşmayın: parolalar, API anahtarları, tokenlar, sertifika veya özel anahtar materyali, PFX/P12 içeriği ya da parolası, dosya içeriği, şifreli yükler, kasa anahtarları veya formun tam ekran görüntüsü.
- Gerçek bir değer herkese açık kanıta girdiyse açığa çıkmış kabul edin; ilgili sistem üzerinden döndürün veya iptal edin.

## Ne Zaman Durmalı ve Destek İstemelisiniz

Aktif kasa belirsizse, yazma erişimi beklenmedikse, sertifika veya dosyanın kaynağı bilinmiyorsa, özel anahtarın açığa çıktığından şüpheleniliyorsa, yükleme kısmen ilerledikten sonra başarısız oluyorsa, kota durumu arayüzle çelişiyorsa ya da denetim ve liste sonuçları uyuşmuyorsa durun. Gizli materyal eklemeden kayıt türünü, genel boyutu, genel hata kodunu, yaklaşık zaman aralığını ve son güvenli adımı içeren özel destek kaydı açın.

## Operatör Notları

Yeni kayıt, istemci tarafında şifreleme yapan bir formdur; iş akışı motoru değildir. Otomatik kaydetmez, sayfa yenilemeleri arasında taslak tutmaz, kimlik bilgilerini sınamaz, Active Directory kayıtlarını elle oluşturmaz, kurumsal sertifika güven zincirine karar vermez, sertifika dağıtmaz, dosya taramaz veya dış sistemlerde rotasyon yapmaz. Kriptografik ayrıştırma ve anahtar eşleşmesi, sertifikanın kurumunuzca güvenilir olduğu anlamına gelmez.

## İlgili

- [Parolalar ekranı](screen-passwords.md)
- [API anahtarları ekranı](screen-api-keys.md)
- [Güvenli notlar ekranı](screen-secure-notes.md)
- [Sertifikalar ekranı](screen-certificates.md)
- [Dosyalar ekranı](screen-files.md)
- [Active Directory kayıtları ekranı](screen-active-directory-records.md)
- [Denetim Günlüğü ekranı](screen-audit-log.md)
