# Active Directory Kayıtları Ekranı

Üst çubuktaki `?`, Active Directory kayıtları ekranından bu kılavuzu açar. Bu ekran aktif kasadaki şifreli `CREDENTIAL` kayıtlarını okur, her kayıtla saklanan dizin anlık görüntüsünü gösterir ve uygun kayıt, giriş ve DC Agent işlemlerini sunar. Canlı LDAP tarayıcısı, PAM parola teslim kuyruğu veya genel dizin yönetim konsolu değildir.

## Erişim, Aktif Kasa ve Lisans Sınırı

Normal gezinme için **entegrasyon** lisans özelliği, kilidi açık aktif kasa ve kasanın tarayıcıda tutulan anahtarı gerekir. Sistem düzeyinde Owner, Admin ve User kasa sırrı ekranlarını kullanabilir; Auditor kullanamaz. Aktif kasada **Viewer** saklanan kaydı okuyabilir, gösterebilir, kopyalayabilir, inceleyebilir ve bağlantı paketi hazırlayabilir. Silme veya desteklenen düzenleme gibi kasa kaydı yazma işlemleri için **Editor** ya da **Manager** rolü ile yazılabilir lisans gerekir.

Dizin sağlayıcısı ve DC Agent işlemlerinin sınırı daha dardır. Güncel sağlayıcı/işlem çalışma alanını yalnız Sahip yükler; VaultPilot giriş erişimini yalnız Sahip değiştirebilir ve dizin işlemlerini yalnız Sahip kuyruğa alabilir. Dizin işlemi ayrıca yazılabilir lisans, güncel olarak çözümlenen kullanıcı hedefi, **Bağlı** ve hazır ajan ile ilgili yeteneği gerektirir. Yerleşik ve bind hesapları engellenir; ayrıcalıklı diğer hedeflerde ek onay uygulanır. Hassas hedef denetimleri sunucuda ve ajanda tekrarlanır; arayüzdeki kapalı düğme güvenlik sınırının kendisi değildir.

Salt okunur lisans, lisanslı özellik gezinmesini kaldırır ve kasa/dizin yazmalarını engeller. Önceden yüklenmiş kayıt okunabilir durumda kalabilir; ancak salt okunur kip AD'yi, VaultPilot giriş erişimini veya şifreli kayıt sahipliğini değiştirme izni vermez.

## Kayıt Kaynağı ve Sahiplik

Yeni ve kaynak kontrollü dizin kayıtları, **Entegrasyonlar > Active Directory** ekranında seçilip yazılabilir kasaya aktarılır. Active Directory kayıtları ekranında bilerek **Yeni kayıt** düğmesi yoktur; burada elle RDP veya SSH kimlik bilgisi oluşturulmaz. Sunucu, dizin kaynaklı `CREDENTIAL` için eşitlenmiş sağlayıcı ve kullanıcı DN'i ister; aynı kasada aynı sağlayıcı/kullanıcı kaynağından ikinci kayıt oluşturulmasını engeller.

Aktarılan kayıt, seçili kullanıcıya ve işletim bağlamına ait şifreli bir anlık görüntü taşır. Envanterde bulunduğu ölçüde sağlayıcı, alan adı, hesap, DN/OU, etkinlik ve kilit durumu, parola durumu sinyalleri, son giriş, son görülme, son eşitleme, ayrıcalık sinyali, hedef, protokol, kategori, sahip bağlamı, etiket ve risk içerebilir. Liste her açıldığında AD'ye canlı okuma yapmaz.

DC Agent mevcut AD parolasını okuyamaz. Yeni aktarılan dizin kaydı bu nedenle parolasız başlar. Saklanan hedef veya varsayılan RDP protokolü yalnız bağlantı bağlamıdır; hesabın sınandığını ya da hedefin onaylı yönetim uç noktası olduğunu kanıtlamaz.

Görünen **Sahip** değeri şifreli kayıt bağlamından gelir: açık sahip alanı, dizin hesabı veya kullanıcı adı. Sistem Owner rolü, kasa rolü, AD nesne sahibi veya operasyonel sorumluluk kanıtı değildir. Kasa erişimini ayrıca Viewer, Editor ve Manager izinleri belirler.

## Arama, Filtreler ve Düzen

Arama kutusu kayıt başlığı, kullanıcı adı, URL, hedef, alan adı, sahip, kategori, kaynak, risk, etiketler, sağlayıcı adı, dizin hesabı, üst DN, nesne türü ve protokol içinde eşleşme arar. Active Directory'yi sorgulamaz ve eksiksiz DN araması sayılmamalıdır.

Hızlı filtre satırı veriye göre oluşur ve en fazla on denetim gösterir:

- **Tümü** protokol, kaynak, risk ve akıllı filtreleri sıfırlar.
- Eşleşen kayıt varsa **RDP** ve **SSH** görünür.
- Kaynak kısayolları **AD eşitleme**, **Elle girildi**, **İçe aktarıldı** ve **Keşfedildi** seçeneklerini gösterebilir.
- Eşleşen sayı ve satırdaki yer izin verdiğinde **Kritik**, **Uyarı**, **Süresi dolmuş** ve **Bilinmiyor** riskleri görünebilir.

Hızlı filtre sayıları, diğer etkin filtrelerin kesişiminden değil aktif kasadaki bütün Active Directory kayıtlarından hesaplanır. Protokol, kaynak veya risk kısayolu seçildiğinde diğer kimlik bilgisi kısayolları ve akıllı filtreler temizlenir.

**Akıllı filtre ekle**, yüklenen kayıtlardan seçenek üretir. Kullanıcı adı veya sahip, ürün/servis, kategori, etiket, protokol, kaynak, risk ve kimlik bilgisi durumu boyutları bulunabilir:

| Kimlik bilgisi durumu | Kaynak kuralı |
| --- | --- |
| **Yönetilen** | Şifreli yükte dizin meta verisi vardır veya kaynak AD eşitleme ya da Yenilendi'dir. |
| **Yönetilmeyen** | Yük, yönetilen kuralını karşılamaz. |
| **Süresi dolan / pasif** | Risk Süresi dolmuş'tur veya kayıt durumu Disabled/Revoked'dur. |
| **Bilgi eksik** | Saklanan hedef veya kullanıcı adı yoktur. |

Birden çok akıllı filtre VE mantığıyla birleşir. Tek filtreyi çipinden kaldırın veya akıllı filtre kümesini **Temizle** ile sıfırlayın. Bu durumlar saklanan yük meta verisini açıklar; güncel sağlayıcı sağlığı veya parola geçerliliği testi değildir.

Yoğunluk denetimi **Kart** ve **Tablo** görünümü arasında geçiş yapar. Tablo başlıkları **Kayıt**, **Şifreli oturum verisi** ve **İşlemler**'dir. İki görünüm de aynı filtrelenmiş kayıt kümesini kullanır; kayıtlar kasadaki son güncelleme sırasıyla gelir.

## Kayıt Satırı ve Ayrıntı Paneli

Her satır şunları gösterebilir:

- RDP veya SSH kimliği, başlık, saklanan hedef ve hesap;
- kaynak ve risk çipleri;
- varsa dizin alan adı, bağlamsal sahip ve son eşitleme zamanı;
- en fazla üç AD durum çipi ve ek durumlar için `+N`;
- şifreli kaydın son güncelleme zamanı.

Veri varsa AD durum çipleri şu sırayla üretilir: **Aktif** veya **Kapalı**, **Kilitli**, **Parola değişimi gerekli**, **Süresi dolmuş**, **Yetkili**, **Süresiz parola**, **Eski login** ve **Son giriş**. Kilit, parola süresinin dolması veya zorunlu değiştirme sinyali aktarım sırasında kritik sayılır. Ayrıcalıklı, eski oturum, süresiz parola ve kapalı hesap sinyalleri uyarı durumuna katkı verir. Daha sonraki desteklenen güncelleme yenileyene kadar satır şifreli anlık görüntüyü göstermeye devam eder.

**Kayıt ayrıntılarını aç**; kaynak, risk, kayıt durumu, hesap, hedef, kategori, bağlamsal sahip, etiketler, son güncelleme, AD sağlayıcısı, alan adı, OU/DN, son eşitleme, son giriş, son görülme ve özet AD durum listesini içeren etkileşimi engellemeyen yan paneli açar. Panel parola veya başka gizli değer göstermez. Yetkiniz varsa ayrı gösterme veya kopyalama işlemini kullanın.

## Kayıt İşlemleri

Satırda şu birincil işlemler bulunabilir:

- Saklanan RDP hedefi varsa **RDP paketini hazırla**. Tarayıcı `.rdp` dosyası indirir; kayıtlı parola kısa ömürlü panoya kopyalanır. Üretilen dosyada yerel kaynak yönlendirmeleri kapalıdır.
- Saklanan SSH hedefi varsa **SSH URI aç**. Kayıtlı parola kısa ömürlü panoya kopyalanır ancak URI içine yazılmaz.
- Kullanıcı adı varsa **Kullanıcı adını kopyala**.

İşlem menüsü şunları içerebilir:

- **Kayıt ayrıntılarını aç**;
- **Geçmişi aç** ve kayıt Active Directory kaynağına bağlıysa **Ajana git**;
- **VaultPilot girişine al** veya **VaultPilot girişinden çıkar**;
- aşağıda açıklanan uygun DC Agent işlemleri;
- değer varsa **Gizli değeri kopyala**, **Gizli değeri göster** ve kullanıcı tarafından başlatılan sızıntı kontrolü;
- SSH kaydında **SSH komutunu kopyala**; parola komuta eklenmez;
- aktif kasa yazılabiliyorsa **Kaydı düzenle** ve **Kaydı sil**.

Gösterme işlemi onay ister, değeri tarayıcıda geçici olarak görünür yapar ve `VIEW` denetim olayı yazmayı dener. Kopyalama ve bağlantı işlemleri gerektiğinde kısa ömürlü pano kullanır; `COPY` veya `VIEW` kanıtı yazar. Denetim bildirimi başarısızsa nedeni inceleyin; bu durum değeri başka yerde paylaşmayı güvenli yapmaz.

**Gizli değeri göster**, yalnız şifreli kasa kaydında gerçekten bir parola varsa çalışır. Ajan mevcut AD parolasını okuyamadığı için boş değerli dizin kaydında parolayı AD'den getiremez. Yeni değer gerekiyorsa yetkili **Şimdi rastgele parola ata** işlemini veya onaylı rotasyon ilkesini kullanın.

Genel düzenleme AD değişikliği değildir. Dizin kontrollü kimlik bilgisi kayıtları sunucudaki kaynak kurallarıyla korunur ve menü görünse bile genel düzenleyici tarafından reddedilebilir. **Kaydı sil**, onaydan sonra şifreli kaydı aktif kasadan kaldırır ve `DELETE` olayı yazar; kaynak AD hesabını silmez, kapatmaz, kilidini açmaz veya parolasını değiştirmez.

`CREDENTIAL` için kopya kayıt oluşturma işlemi yoktur. Genel toplu menü dışa aktarma, kategori/etiket, arşivleme, pasifleştirme/iptal, güvenlik kontrolü, denetim raporu, paylaşım, not, düzenleme ve kaldırma işlemlerini gösterebilir; bunlar kasa kaydı işlemleridir. Toplu LDAP, PAM, parola sıfırlama, kilit açma veya dizin hesabı kapatma işlemi değildir ve dizin sahipli kayıtlar sunucu kaynak kısıtlarına tabidir. Hassas dışa aktarım, onaydan sonra seçili çözülmüş yükleri dosyaya yazar ve `EXPORT` kanıtı oluşturur.

## VaultPilot Giriş Erişimi

**VaultPilot girişine al**, AD yetkisi değiştiren bir işlem değil, VaultPilot kullanıcı yaşam döngüsü işlemidir. Owner, yazılabilir lisans, kullanılabilir kullanıcı adı ve şifreli kayıtta saklanan parola gerekir. Çözümlenen dizin kaydında sağlayıcı ve DN de zorunludur. Etkinleştirme, ilgili VaultPilot giriş kimliğini ve kişisel kasa anahtar materyalini oluşturur veya yeniden açar; kaldırma VaultPilot giriş kimliğini kapatır ve güncel sağlayıcı hedefi bulunuyorsa dizin giriş seçimini günceller.

VaultPilot kimlik yaşam döngüsü yazımı ile sağlayıcıdaki giriş seçimi güncellemesi aynı transaction kapsamında değildir. Kimlik oluşturulmuş, yeniden etkinleştirilmiş veya kapatılmış olabilir; ardından sağlayıcı seçiminin güncellenmesi başarısız olabilir. Bu nedenle hata bildirimi bütün değişikliklerin geri alındığını kanıtlamaz. Yeniden denemeden önce durun; **Kullanıcılar** ekranındaki kimlik ve giriş durumunu, **Entegrasyonlar > Active Directory** içindeki sağlayıcı giriş seçimini ve **Denetim Günlüğü** yaşam döngüsü olaylarını uzlaştırın.

AD eşitleme kaydında normalde parola yoktur; ajan mevcut parolayı okuyamaz. Bu nedenle girişe alma, onaylı parola değiştirme akışı bir değer üretip güvenle kaydedene kadar kapalıdır. Bu işlem AD grup değişikliği, MFA kurulumu, PAM onayı veya dizin parolasının güncel olduğuna ilişkin test değildir.

## DC Agent İşlemleri ve Yetenek Sınırı

Dört hassas kayıt işlemi yalnız şifreli kayıt, Owner tarafından görülebilen güncel sağlayıcıda bir USER nesnesine çözümlenebiliyorsa görünür:

| Arayüz işlemi | Ajan başarılı olduğunda AD etkisi | Yapmadığı işlem |
| --- | --- | --- |
| **Kilidi aç** | Hesap kilidini temizler. | Kapalı hesabı açmaz, parolayı değiştirmez veya erişim vermez. |
| **Parola değişimi iste** | Bir sonraki oturum açmada parola değişikliğini zorunlu kılar. | Parola üretmez, hesabın kilidini açmaz ve tek başına VaultPilot girişini değiştirmez. |
| **Şimdi rastgele parola ata** | Ajan genel parola ilkesine uygun değer üretir, AD parolasını hemen sıfırlar ve değeri isteği yapan Sahip kullanıcının VaultPilot açık anahtarına şifreleyerek döndürür. | Sonraki oturumda yeniden parola değişikliğini otomatik zorunlu kılmaz; kurum ilkesi istiyorsa ayrı işlemi kullanın. |
| **Hesabı kapat** | AD kullanıcısını kapatır. | AD nesnesini veya şifreli kasa kaydını silmez. |

Her hassas işlem kurumsal onay ister ve eşzamanlı tamamlanmak yerine kuyruğa alınır. Bağlı ajan ilgili yeteneği bildirmelidir: `UNLOCK_ACCOUNT`, `REQUIRE_PASSWORD_CHANGE`, `RESET_TEMP_PASSWORD` veya `DISABLE_ACCOUNT`. Bekleyen, ajanın işlediği, başarılı, başarısız, inceleme gerekli veya iptal edilmiş sonucu Entegrasyonlar ve İşlemler ekranlarında izleyin.

Yerleşik hesaplar ve ajanın bind hesabı kesin durma nedenidir; sunucu ile ajan bunları her durumda reddeder. Ayrıcalıklı fakat yerleşik olmayan hedefte elle başlatılan işlem ikinci ve açık onay ister. Otomatik rotasyon ayrıca ilke üzerinde kalıcı ayrıcalıklı-hedef onayı olmadan çalışmaz; ilke kapatıldığında bu onay temizlenir. İstek, sağlayıcı verisi veya yerel işlem veritabanı düzenleyerek kontrolleri aşmayın.

**Şimdi rastgele parola ata** AD üzerinde başarılı olduktan sonra şifreli işlem sonucu ile kasa kaydının güncellenmesi ayrı sonuçlardır. Kasa anahtarı ve yazma erişimi varsa tarayıcı, üretilen değeri isteği yapan kullanıcı için çözmeyi ve başvurulan kasa kaydına yeniden şifrelemeyi dener. Hem ajan başarısını hem de ayrı kayıt güncelleme bildirimini, güncel kaydı ve denetim kanıtını doğrulayın. Sonuçlar uyuşmuyorsa AD parolasını değişmiş, kasa kaydını ise doğrulanmamış kabul edin; yeniden denemeden önce durun.

<a id="record-history-and-rotation"></a>

## Kayıt Geçmişi ve Rotasyon

**Geçmişi aç**, her sürümün tarihini, değişikliği yapan kişiyi, kaynağı ve şifreli sürüm durumunu gösterir. Yetkili kullanıcı önceki sürümü yeni güncel sürüm olarak geri getirebilir; aradaki kanıtlar silinmez. Active Directory parolasında geri getirme yalnız kasa kaydını değiştirir, AD parolasını kendiliğinden geri almaz. Dizin ile kasa değerinin ayrışmaması için ardından açık bir ajan işlemi veya onaylı rotasyon çalıştırın.

**Rotasyon ayarla** günlük, haftalık, aylık veya özel aralıkla takvim çalışması kurabilir. Özel aralık 1–365 gün, 1–52 hafta ya da 1–12 ay olabilir ve başlangıç tarihi ister. Ayrıca gizli değer gösterildikten 5–1440 dakika sonra veya AD `passwordLastSet` yaşına göre 1–365 gün içinde çalışma tetiklenebilir. Birden çok tetikleyici seçilirse ilk vadesi gelen çalışır; yaz saati değişiminde aynı çalışma iki kez üretilmez ve kaçırılan çalışmalar topluca oynatılmaz.

Rotasyon sonucu belirsizse sistem körlemesine yeniden denemez. **Görevler > Zamanlanmış** görünümündeki durum ve sınırlı logları inceleyin. Kayıt veya geçmiş panelindeki **Ajana git**, ilgili sağlayıcıyı **Entegrasyonlar > Active Directory** içinde açar.

Bu ekranda doğrudan LDAP bind işlemi, rastgele PowerShell çalıştırma, PAM onayı, oturum kaydı veya ayrıcalık yükseltme yoktur. Sağlayıcı kaydı, seçim, eşitleme, sağlık, yetenek ve ajan token işlemleri **Entegrasyonlar > Active Directory** ekranına aittir.

## Denetim ve Kanıt

Dizin kaydı aktarımı kayıt oluşturma kanıtı yazar. Gösterme, kopyalama, bağlantı, dışa aktarma, düzenleme ve silme işlemleri ilgili kasa denetim eylemlerini kullanır. Dizin işlemi oluşturma, iptal ve sonuç olayları; işlem, sağlayıcı, durum ve işlem kimlikleriyle `DIRECTORY_AGENT_ACTION` kanıtı olarak yazılır. Kesin DN ve üretilen parola herkese açık kanıt değildir. VaultPilot girişine alma/çıkarma kullanıcı yaşam döngüsü kanıtı oluşturur; sağlayıcı seçim sonucunu ayrıca doğrulayın.

Kayıt satırını, ayrıntı panelini, işlem bildirimini, Entegrasyonlar işlem geçmişini, İşlemler kaydını ve Denetim Günlüğünü ayrı kanıt katmanları olarak değerlendirin. Kuyruğa alındı bildirimi AD başarısını kanıtlamaz. Ajan başarısı, şifreli parolanın kasaya yazıldığını kanıtlamaz. Değişen kasa zamanı da AD işleminin başarılı olduğunu tek başına kanıtlamaz.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Yükleniyor | Şifreli kayıtlar alınıp çözülürken dört iskelet satırı görünür. Kasanın boş olduğuna karar vermeden önce bekleyin. |
| Aktif kasada kayıt yok | Seçili AD kullanıcılarını Entegrasyonlar üzerinden aktarın. Dizin kimlik bilgileri için genel boş durumdaki Yeni kayıt önerisini izlemeyin. |
| Filtre eşleşmesi yok | Arama metnini kaldırın, **Tümü**'nü seçin, akıllı filtreleri veya boş durumdaki **Filtreleri temizle** işlemini kullanın. |
| Kayıt çözülemiyor | Genel uyarı, bir veya daha fazla kaydın aktif kasa anahtarıyla çözülemediğini bildirir. Durun, seçili kasa/anahtarı doğrulayın ve kaydın üzerine yazmayın. |
| Liste isteği kullanılamıyor | Ayrı liste hata kartı yoktur; başarısız istek boş sonuç gibi görünebilir. Aktarım veya silme öncesi genel bildirimi, oturumu, kasayı ve sunucuyu doğrulayın. |
| Sağlayıcı veya USER hedefi çözümlenemiyor | Şifreli kayıt görünür kalır ancak güncel dizin işlemleri görünmez. Entegrasyonlar'da sağlayıcı seçimini ve eşitlemeyi inceleyin. |
| Ajan eski, çevrimdışı, bağlantı bekliyor veya iptal edilmiş | Dizin işlemleri kapalı kalır. Onaylı ajan bağlantısını düzeltin; kayıt anlık görüntüsünü canlı saymayın. |
| Yetenek eksik | Ajan bağlı olsa bile ilgili işlem kapalıdır. Yeteneği atlamak yerine onaylı ajanı yükseltin veya onarın. |
| Yerleşik veya bind hesabı | Hassas dizin işlemleri kapalıdır; sunucu ve ajan isteği reddeder. Başka bir yol kullanarak engeli aşmayın. |
| Ayrıcalıklı, yerleşik olmayan hedef | Elle işlem için ikinci onayı; otomatik rotasyon için açık ve kalıcı ilke onayını doğrulayın. |
| Viewer veya salt okunur lisans | Okuma işlemleri kalabilir; kasa yazmaları, giriş değişiklikleri ve dizin işlemleri engellenir. |
| İşlem kuyruğa alındı | İşlemi Entegrasyonlar veya İşlemler ekranında izleyin; ilk işlem etkinken tekrar başlatmayın. |
| AD işlemi başarılı, kasa güncellemesi doğrulanmadı | Şifreli işlem sonucunu ve denetim kanıtını koruyun. Sahiplik uzlaştırılmadan ikinci parola sıfırlaması yapmayın. |
| VaultPilot kimliği ile sağlayıcı seçimi uyuşmuyor | Hata bildiriminin tam rollback olduğunu varsaymayın. Kullanıcılar'daki giriş durumunu, sağlayıcı seçimini ve Denetim Günlüğünü uzlaştırmadan işlemi yinelemeyin. |

## İşlemden Önce

- Hedef aktif kasayı, sistem rolünü, kasa rolünü, entegrasyon özelliğini ve yazılabilir lisansı doğrulayın.
- Meta veriyi güncel saymadan önce kayıt kaynağını, sağlayıcıyı, alan adını, hesabı, son eşitlemeyi ve son görülmeyi karşılaştırın.
- Sağlayıcının bağlı olduğunu, kesin yeteneğin bulunduğunu ve güncel nesnenin USER olarak çözümlendiğini doğrulayın.
- Yerleşik veya bind hesabında durun; başka uç nokta kullanarak engeli aşmayın. Ayrıcalıklı diğer hedeflerde gerekli ikinci onayı doğrulayın.
- Kasa kaydı işlemini, AD işlemini ve VaultPilot girişine alma işlemini birbirinden ayırın.
- Parola değişiminden önce üretilen değerin hangi kasa kaydına ve hangi yetkiyle yazılacağını netleştirin; AD sonucunu, şifreli sonucu, kasa güncellemesini ve denetimi ayrı ayrı doğrulayın.
- VaultPilot giriş erişimi değişecekse Kullanıcılar'daki kimlik durumunu, sağlayıcı giriş seçimini ve Denetim Günlüğünü yeniden deneme ölçütü olarak belirleyin.

## Güvenli Kanıt

- Paylaşılabilir: genel kaynak sınıfı, RDP veya SSH protokolü, genelleştirilmiş risk/durum, sistem ve kasa rolü sınıfı, dizin işlem türü, işlem durumu, yaklaşık zaman aralığı ve redakte hata kategorisi.
- Gizli kalmalı: başlık, kullanıcı adı/hesap, sahip bağlamı, hedef, alan adı, sağlayıcı adı, DN/OU/base DN, etiketler, kesin eşitleme/giriş zamanı, ayrıcalıklı grup adları, kayıt/işlem/sağlayıcı kimlikleri, RDP paketi, SSH URI/komutu ve tam satır veya panel ekran görüntüsü.
- Asla paylaşmayın: saklanan veya üretilen parola, pano içeriği, şifreli işlem parola sonucu, şifreli kayıt yükü, kasa anahtarı, ana parola, kullanıcı özel anahtarı, bind kimlik bilgisi, ajan tokenı, ham dizin envanteri, hassas dışa aktarım veya gerçek hedef içeren ajan/sunucu logu.
- Parola, üretilen işlem sonucu, bind kimlik bilgisi veya ajan tokenı herkese açık kanıta girdiyse açığa çıkmış kabul edin; ilgili prosedürle değiştirin ya da iptal edin.

## Ne Zaman Durmalı ve Destek İstemelisiniz

Aktif kasa veya kaynak sağlayıcı belirsizse, hedef artık çözümlenmiyorsa, ayrıcalık durumu beklenmedikse, ajan yeteneği/sağlığı arayüzle çelişiyorsa, işlem inceleme gerekli durumunda kalıyorsa, AD başarı bildirirken kasa parola güncellemesi doğrulanamıyorsa, VaultPilot kimlik durumu sağlayıcı giriş seçimiyle uyuşmuyorsa ya da denetim kanıtı yoksa durun. Kullanıcılar'daki giriş durumu, sağlayıcı seçimi ve Denetim Günlüğü uzlaştırılmadan giriş işlemini yeniden denemeyin. DN, hesap, parola, token veya dışa aktarılmış yük eklemeden genel kayıt türü, sağlayıcı sağlık sınıfı, yetenek, işlem türü/durumu, yaklaşık zaman ve redakte hatayla özel destek kaydı açın.

## Operatör Notları

Active Directory kayıtları, dizin kaynaklı bağlam taşıyan şifreli kasa kayıtlarıdır. Canlı AD nesnesi değildir ve genel kimlik bilgisi yönetimi veya PAM katmanı oluşturmaz. Sağlayıcı işlemlerini Entegrasyonlar'da, işlem takibini İşlemler'de, kanıt incelemesini Denetim Günlüğünde tutun.

## İlgili

- [Etki Alanı paneli](screen-domain-dashboard.md)
- [Entegrasyonlar ekranı](screen-integrations.md)
- [İşlemler ekranı](screen-executions.md)
- [Denetim Günlüğü ekranı](screen-audit-log.md)
- [Active Directory ajanı](active-directory-agent.md)
- [DC Agent sorun giderme](../../kb/tr/dc-agent-service.md)
