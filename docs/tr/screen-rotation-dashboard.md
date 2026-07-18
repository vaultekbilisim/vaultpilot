# Rotasyon Ekranı

Üst çubuktaki `?` simgesi Rotasyon ekranına ait bu rehberi açar. Bu ekran; credential envanteri, denetim kayıtları ve Active Directory ajan işlemlerinden üretilen salt okunur bir önceliklendirme yüzeyidir. Rotasyon planlamaz, yeni parola üretmez, hesabı değiştirmez ve gizli değeri kendiliğinden yenilemez.

## Veri Kaynağı, Erişim ve Lisans Sınırı

Rotasyon SLA yalnızca aktif kasadaki şifresi tarayıcıda çözülebilen `CREDENTIAL` kayıtlarını kullanır. `PASSWORD`, `API_KEY` veya başka kasalardaki kayıtları eklemez. Metrikler, oturumdaki kullanıcının okuyabildiği kayıt kümesinden tarayıcıda hesaplanır.

Sahip, Yönetici ve Kullanıcı aktif kasayı okuyabildiğinde credential metriklerini görebilir. Bu envanter metrikleri için entegrasyon özelliği gerekmez. Denetçi ekranı açıp denetim kaydına dayalı bilgileri okuyabilir; ancak kasa sırlarını okuyamadığı için credential sayıları ve SLA satırları bu rolde kullanılamaz. **Yürütmeler** ayrıntısına Sahip, Yönetici veya Denetçi geçebilir. Credential envanterini ayrıntı bağlantısından açmak için mevcut lisansta entegrasyon özelliği de gerekir.

Active Directory sağlayıcı ve ajan işlemi verileri Sahip rolüne özel uçlardan gelir; ancak Rotasyon görünümü bu sağlayıcı ve işlem sorgularını etkinleştirmez. Dizin işlemi sayıları yalnız Sahip oturumu bu sorguları etkinleştiren başka bir görünümde veriyi daha önce yüklediyse görünebilir; Rotasyon ekranına dönüldüğünde tutulan sorgu verisi güncelliğini yitirmiş olabilir.

Dashboard'un ayrı bir lisans kapısı yoktur. Salt okunur lisans, görünümü ve tarayıcıya özgü yerleşim değişikliklerini açık tutar; hedef ekranlardaki credential yazmalarını engeller. Tablodaki **Sahip**, kayıtta tutulan sorumlu bilgisidir; VaultPilot Sahip sistem rolü olmak zorunda değildir.

## Burada Ne Yapılır

- Credential envanterini dizin parola işlemleri ve eşleşen denetim kayıtlarıyla karşılaştırın.
- 61–90 günlük inceleme adaylarını, 90 günü aşan kayıtları ve okunabilir yaş kaynağı olmayan kayıtları ayırın.
- Desteklenen akış kartlarından hazırlanmış credential durumu veya yürütme filtrelerine geçin.
- Üretilen, mevcut veya eski parolaları göstermeden olay kanıtını inceleyin.
- Görünen tarih aralığını etkin filtre saymadan toplamı en yüksek altı site grubunu karşılaştırın.
- **Dashboard araçları** üzerinden erişilebilen kaynak sorgularını yenileyin veya widget yerleşimini düzenleyin; yalnız Yenile kullanmak dizin işlemi verisinin güncel olduğunu garanti etmez.

## Widgetlar Nasıl Okunur

### Parola rotasyon akışı

Bu kartlar tek bir huninin aşamaları değil, ilişkili sinyallerdir. Farklı veri kümeleri kullandıkları için sayıların birbirini tamamlaması beklenmemelidir:

| Kart | Güncel hesap | Tıklama davranışı |
| --- | --- | --- |
| Toplam | En fazla altı eşleşen denetim satırı ile yüklenmiş bütün dizin parola işlemlerinin toplamı. | Yalnız gösterim. |
| Yönetilen | Dizin bilgisi, AD eşitleme kaynağı veya yenilenmiş kaynak bilgisi bulunan credential kayıtları. | Credential ekranını **Yönetilen** filtresiyle açar. |
| Yönetilmeyen | Yönetilen sınıfına girmeyen credential kayıtları. | Credential ekranını **Yönetilmeyen** filtresiyle açar. |
| Güncellenen | `SUCCEEDED` durumundaki `RESET_TEMP_PASSWORD` veya `REQUIRE_PASSWORD_CHANGE` işlemleri. | Yürütmeler ekranını **Dizin / Tamamlandı** filtresiyle açar. |
| Süresi dolan | Riski süresi dolmuş olan ya da durumu iptal edilmiş veya kapatılmış credential kayıtları. | Credential ekranını **Süresi dolan / pasif** filtresiyle açar. |
| Bekleyen | Parola dışı işler dahil, `PENDING` veya `LEASED` durumundaki bütün yüklenmiş dizin işlemleri. | Yürütmeler ekranını **Dizin / Aktif** filtresiyle açar. |
| Hata | `FAILED` veya `STALE_REVIEW_REQUIRED` durumundaki dizin parola işlemleri. | Yürütmeler ekranını **Dizin / Başarısız** filtresiyle açar. |

Eşleşen denetim eylemleri `PASSWORD_CHANGE`, `USER_PASSWORD_SET` ve `DIRECTORY_AGENT_ACTION` kodlarıdır. **Toplam**, denetim satırlarını işlem satırlarıyla birleştirdiği için aynı operasyonun birden fazla kanıtı olabilir; bu sayı benzersiz credential sayısı değildir.

### Rotasyon SLA

Okunabilir her `CREDENTIAL` kaydı sabit bir parola yaşı aralığına atanır:

| Görünen aralık | Hesap |
| --- | --- |
| 0–30 gün | 30 gün veya daha az. |
| 31–60 gün | 30 günden büyük, 60 günden küçük veya eşit. |
| 61–90 gün | 60 günden büyük, 90 günden küçük veya eşit; dashboard'un yaklaşan inceleme aralığı. |
| 90+ gün | 90 günden büyük; gecikmiş aralık. |
| Tarih yok | Okunabilir kaynak zaman damgası yok. |

Yaş için sırasıyla dizindeki `passwordLastSetAt`, kaydın `importedAt` ve kaydın `updatedAt` değeri kullanılır; bulunan ilk değer hesabı belirler. Hesap, tanımlı sonraki rotasyon tarihine veya kuruma özel SLA'ya dayanmaz. Gelecekteki tarih sıfır güne sabitlenir; okunamayan tarih **Tarih yok** grubuna gider.

Tabloda en fazla beş kayıt gösterilir; önce hesaplanan yaşı en büyük olanlar, eşitlikte başlığa göre sıralanır. Tarihi olmayan satırlar tarihli satırların arkasına düşer. Kullanıcı adı boşsa **Kullanıcı** sütununda `-` görünür. **Sahip** sırasıyla kayıt sahibi, dizin hesabı ve kullanıcı adından çözülür; üçü de boşsa hücre boş kalır. Çubuklar ve satırlar tıklanamaz.

### Parola rotasyonları

- **Denetim olayı**, ekrana sağlanan eşleşen denetim satırlarının en fazla altısını sayar; ömür boyu toplam değildir.
- **AD aksiyonu**, başarılı dizin parola işlemlerini yüklenmiş bütün dizin parola işlemlerine oranlar; başarısız ve yeniden inceleme isteyen işlemler dikkat gerektirir.
- **Bekleyen işlem**, `PENDING` veya `LEASED` durumundaki bütün yüklenmiş dizin işlemlerini sayar. Sahip, Yönetici ve Denetçi için sayı sıfırdan büyükse **Dizin / Aktif**, sıfırsa **Dizin / Tümü** filtresini açar. Kullanıcı rolünde kapalıdır.

Zaman çizelgesi en fazla altı denetim satırıyla dönen ilk dört dizin parola işlemini birleştirir, zamana göre sıralar ve en fazla yedi kayıt gösterir. Satırlar yalnız gösterim içindir ve parola değeri göstermez.

### Site bazlı rotasyon

Toplamı en yüksekten düşüğe, eşitlikte site adına göre sıralanmış en fazla altı site satırı gösterilir. Widget şu kaynakları birleştirir:

- Dizin bilgisi ve AD eşitleme kaynağı olmayan credential kayıtları **Yönetilmeyen** bölümüne yazılır; alan adı, kaydın sunucu adı veya **Yerel** altında gruplanır.
- Dizin parola işlemleri sağlayıcının site adı, alan adı, sağlayıcı adı veya hedefiyle gruplanır ve **Güncellenen**, **Bekleyen** ya da **Hata** bölümüne eklenir.
- Aynı sınırlı denetim satırları denetim hedefine göre gruplanır. `PASSWORD_CHANGE` ve `USER_PASSWORD_SET`, **Güncellenen** bölümüne eklenir; `DIRECTORY_AGENT_ACTION` renkli bölüme eklenmeden toplamı büyütebilir.

Görünen 45 günlük aralık mevcut sürümde yalnız başlık bilgisidir; site hesabını filtrelemez. Bu nedenle renkli bölüm toplamları satır toplamından küçük olabilir. Grafik eksiksiz 45 günlük uyumluluk raporu değildir ve site satırları tıklanamaz.

## Filtreler, Ayrıntıya Geçiş ve Yerleşim

Rotasyon ekranının kendi tarih, sahip, yaş, site veya durum filtresi yoktur. Desteklenen kart ekrandan çıkar ve **Credential** ya da **Yürütmeler** ekranında hazır filtre uygular. SLA çubuk ve satırları, zaman çizelgesi ve site satırları yalnız gösterim içindir.

Credential ayrıntıları **Yönetilen**, **Yönetilmeyen** veya **Süresi dolan / pasif** filtresini uygulamadan önce protokol, risk, kaynak, arama ve akıllı filtre durumunu temizler. Yürütme ayrıntıları Dizin kategorisiyle Tamamlandı, Aktif veya Başarısız durumunu hazırlar. Normal rol ve lisans korumaları geçerlidir; tıklamak bir işlemin çalıştığını kanıtlamaz.

**Dashboard araçları** bu rehberi açar, veriyi yeniler veya yerleşim düzenleme moduna geçer. Düzenleme modunda sürükle-bırak ya da ok tuşlarıyla sıralama, gizleme ve geri alma, kaydetme, vazgeçme ve varsayılan yerleşime dönme bulunur. Yerleşim bu tarayıcıda tutulur ve yalnız görünümü değiştirir. Dört widget da gizlenirse **Kategori widgetlarını geri getir** seçeneğini kullanın.

<a id="rotation-policy-monitoring"></a>

## Rotasyon İlkesi ve İzleme

Active Directory kaydındaki **Rotasyon ayarla** penceresi günlük, haftalık, aylık ve özel aralığı destekler. Özel aralık 1–365 gün, 1–52 hafta ya da 1–12 aydır ve başlangıç tarihi ister. Aylık seçim 1–31 veya ayın son günü olabilir; seçilen gün kısa ayda yoksa ayın son gününe sıkıştırılır. Saat dilimi IANA adıyla saklanır, yaz saati geçişi aynı çalışmayı iki kez üretmez ve kaçırılmış çalışmalar topluca çalıştırılmaz.

Takvime ek olarak gizli değer gösterildikten 5–1440 dakika sonra ve AD `passwordLastSet` değeri 1–365 günlük yaşa ulaştığında tetikleme seçilebilir. Birden çok tetikleyicide ilk vadesi gelen çalışır. Ajanın ürettiği parola kullanıcı açık anahtarına şifrelenir; yalnız yetkili ve kilidi açık tarayıcı değeri kasa kaydına yeniden şifreleyebilir. Belirsiz sonuç körlemesine yeniden denenmez.

Bu dashboard toplu ilke düzenleyicisi değildir. İlkeleri kayıt ekranından açın; çalışan ve gelecekteki durumları **Görevler > Zamanlanmış** içinde izleyin. Orada sonraki çalışma, son sonuç, ilişkili yürütme ve sınırlı loglar görünür.

## Veri Güncelliği ve Sınırlar

**Yenile**, yalnız Rotasyon ekranının görünür özet ve kırılım sorgularını tazeler. Tarayıcıyı yeniden yüklemez; Entegrasyonlar, Active Directory ajan işlemleri, Görevler veya başka dashboard sorgularını topluca yenilemez. Güncel dizin kanıtı gerekiyorsa **Entegrasyonlar > Active Directory** veya **Görevler > Zamanlanmış** görünümünü açıp o ekranı ayrıca yenileyin.

Her sorgu yine rol, lisans, aktif kasa ve uç erişimi kurallarına uyar. Tek bir anlık görüntü zamanı veya son güncelleme alanı yoktur; sorgular tamamlandıkça değerler değişebilir.

Ekran credential'ın hâlâ kullanımda olduğunu, hedefin yeni parolayı kabul ettiğini veya geri dönüşün çalıştığını kanıtlamaz. `SUCCEEDED` ajan işlemi durumudur; denetim satırı yalnız olayın kayda geçtiğini gösterir. İkisi de hedefte uçtan uca giriş testi değildir.

## Önerilen İş Akışları

### Yaklaşan, gecikmiş ve tarihi eksik kayıtları inceleme

1. **61–90 gün**, **90+ gün** ve **Tarih yok** sayılarını ayrı değerlendirin.
2. Beş satırlık en eski kayıtlar tablosunu yalnız başlangıç noktası olarak kullanın.
3. Credential ekranında sahip, hesap, hedef, kaynak, gerçek son değişim kanıtı, bağımlılıklar ve geri dönüşü doğrulayın.
4. Kurumun onaylı değişiklik sürecini kullanın; ilkeyi kayıt ekranından açın ve çalışmayı Görevler'den izleyin.
5. Yetkili değişiklik başka yüzeyde tamamlandıktan sonra yenileyip kaynak tarih ve kanıtın değiştiğini doğrulayın.

### Başarısız veya bekleyen dizin işini inceleme

1. **Hata**, **Bekleyen** veya **Bekleyen işlem** seçeneğini kullanın.
2. Yürütmeler ekranında kategori, durum, sağlayıcı, hedef, zaman ve güvenli hata sınıfını doğrulayın.
3. Yürütme ile denetim kanıtını karşılaştırın; çift kanıtı ayrı credential olarak saymayın.
4. Yeniden deneme, iptal veya yeni işi yalnız yetkili operasyon ekranından başlatın.

### Eksik sahip veya tarih bilgisini düzeltme

1. **Tarih yok**, `-` veya boş sahip hücresini sağlıklı durum değil, eksik kanıt sayın.
2. Credential kaydını açıp eksik yaş kaynağını veya sahip alanını belirleyin.
3. Kasa yazılabilir ve yetki uygunsa onaylı kayıt bilgisini düzeltin; notlara gizli değer koymayın.
4. Yenileyip beklenen yaş aralığını ve sorumlu kişiyi doğrulayın.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Yenileniyor | Bekleyin; kaynak sorgular ayrı zamanlarda tamamlanabilir. |
| Credential kaydı yok | Aktif kasayı ve kasa okuma iznini doğrulayın. Bu metrikler için entegrasyon özelliği gerekmez; parola ve API anahtarı kayıtları SLA'yı doldurmaz. |
| 61–90 gün | Yaklaşan inceleme adayı sayın; kurumun gerçek politikasını ayrıca doğrulayın. |
| 90+ gün | Gecikmiş inceleme adayı sayın; sahip, bağımlılık ve geri dönüş olmadan rotasyon yapmayın. |
| Tarih yok | `passwordLastSetAt`, içe aktarım ve güncelleme zamanını doğrulayın. Sonraki rotasyon tarihi alanı yoktur. |
| Sahip eksik | İş atamadan önce kayıt sahibi, dizin hesabı veya kullanıcı adı bilgisini tamamlayın. |
| Başarısız / yeniden inceleme | Başarısız yürütmeleri açıp güvenli hata bağlamını inceleyin. |
| Bekleyen | Aktif dizin yürütmelerini açıp parola işlemlerini diğer kuyruk işlerinden ayırın. |
| İşlem kaydı yok | Yüklenmiş eşleşen kanıt yoktur; credential'ların güncel olduğunu kanıtlamaz. |
| Site verisi yok | Credential envanterini doğrulayın. Rotasyon görünümü sorguları etkinleştirmediği için Sahip rolüne özel dizin işlemi verisi yok veya güncelliğini yitirmiş olabilir. Bu canlı tarama değildir. |
| Widgetlar gizli | Düzenleme modunda tek tek widgetları veya kategoriyi geri alın. |
| Denetçi | Denetim kaydına dayalı bilgi görünebilir; credential envanteri ve SLA satırları kullanılamaz. |
| Salt okunur lisans | Görünüm ve tarayıcıya özgü yerleşim açıktır; credential yazmaları engellenir. |

## İşlemden Önce

- Aktif kasayı ve rolü doğrulayın. Dizin işlemi kanıtı önemliyse sayılara güvenmeden önce Sahip rolüyle bu sorguları etkinleştiren bir görünümden veriyi yenileyin.
- Widgetları tek uzlaştırılmış toplam veya ardışık akış değil, farklı kanıt kümeleri olarak okuyun.
- Yaklaşan veya gecikmiş aralığı kullanmadan önce gerçek kaynak tarihini doğrulayın.
- Sahip, hedef, bağımlılık, bakım penceresi, geri dönüş ve kurtarma yolunu doğrulayın.
- İşlem kanıtı için Yürütmeler ve Denetim Geçmişini; envanter için credential kaydını kullanın.
- Karta tıklamanın rotasyon, yeniden deneme, onay veya zamanlama yapmadığını unutmayın.

## Güvenli Kanıt

- Paylaşılabilir: toplu yaş aralığı, genel işlem durumu, redakte site sınıfı, genel hata sınıfı ve geniş zaman aralığı.
- Gizli kalmalı: başlık, kullanıcı adı, sahip, dizin hesabı, alan adı, host, sağlayıcı, site, denetim hedefi, işlem kimliği, kesin zaman ve müşteri bağımlılıkları.
- Asla paylaşmayın: mevcut, eski, geçici veya üretilen parola; erişim anahtarı; kurtarma kodu; kimlik bilgisi içeren komut çıktısı ya da gizli değer gösteren ekran görüntüsü.
- Müşteriyi veya hesabı belirleyebilecek az üyeli site etiketlerini ve kesin sayıları maskeleyin. Yalnız kırpmak yeterli değildir.

## Ne Zaman Durmalı ve Destek İstemelisiniz

Sahip bilinmiyorsa, yaş kaynakları çelişiyorsa, gelecekteki veya bozuk tarih önceliği değiştiriyorsa, işlem ve denetim kanıtı uyuşmuyorsa, üretilen parola açığa çıkmış olabilir, hedef güvenle sınanamıyor veya geri dönüş bilinmiyorsa durun. Gizli değer eklemeden; geniş yaş aralığı, redakte işlem durumu, genel hata sınıfı, geniş zaman aralığı ve son güvenli adımla özel destek kaydı açın.

## Operatör Notları

Rotasyon, izleme ve ilgili ekrana geçiş dashboard'udur. Yaş aralıkları tarayıcıda hesaplanan sabit sınıflardır; yapılandırılabilir SLA motoru veya sonraki rotasyon zamanlayıcısı değildir. Kartlar parola yenilemez, dizin işlemi oluşturmaz, hedefte giriş doğrulamaz ve uyumluluk belgesi üretmez.

## İlgili

- [Active Directory kayıtları ekranı](screen-active-directory-records.md)
- [Yürütmeler ekranı](screen-executions.md)
- [Denetim Geçmişi ekranı](screen-audit-log.md)
- [Entegrasyonlar ekranı](screen-integrations.md)
- [Operatör runbook](operator-runbook.md)
