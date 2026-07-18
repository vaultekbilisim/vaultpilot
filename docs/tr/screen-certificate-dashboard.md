# Sertifika Paneli Ekranı

Üst çubuktaki `?` simgesi Sertifika Paneli ekranına ait bu rehberi açar. Panel, etkin kasadaki sertifika kayıtlarını geçerlilik süresi, durum, sertifika otoritesi, kaynak ve organizasyon kırılımlarıyla özetler. Buradan sertifika materyali yüklenmez, sunucunun HTTPS sertifikası değiştirilmez ve ağ taraması başlatılmaz.

## Veri Kaynağı ve Erişim

Panelin kaynağı, oturum açan kullanıcının okuma yetkisi bulunan etkin kasadaki şifreli `CERTIFICATE` kayıtlarıdır. Kayıtlar etkin kasa anahtarıyla tarayıcıda çözüldükten sonra sayılar ve grafikler bu görünür kayıtlar üzerinden hesaplanır. Başka kasalardaki, Sunucu ayarlarındaki veya Discovery bulgularındaki sertifikalar bu toplama kendiliğinden katılmaz.

Sahip, Yönetici ve Kullanıcı sistem rolleri, etkin kasada okuma yetkileri varsa bu envanteri görebilir. Denetçi rolü kasa sırlarını okuyamadığı için Sertifika Panelindeki kayıt verisini kullanamaz. Panelde görülen **Sahip** alanı bir sertifika kaydının sorumlu bilgisidir; VaultPilot sistem rolü olan **Sahip** ile karıştırılmamalıdır.

## Burada Ne Yapılır

- Süresi dolmuş, henüz geçerli olmayan, 30 günlük yenileme aralığına girmiş, iptal edilmiş veya geçerlilik tarihi eksik kayıtları ayırın.
- Sertifika otoritesi ve kalan gün ilişkisini radarda inceleyip ilgili kaydın yalnız meta verisini açın.
- Geçerlilik, durum, kaynak, sertifika otoritesi veya organizasyon satırından Sertifikalar ekranına hazır filtreyle geçin.
- Uyarının kasa envanterine mi, VaultPilot sunucusunun tarayıcı HTTPS erişimine mi, yoksa Discovery taramasına mı ait olduğunu belirleyin.
- Panel araçlarından veriyi yenileyin veya bileşen yerleşimini düzenleyin. Yerleşim değişikliği yalnız görünümü etkiler; sertifika kayıtlarını değiştirmez.

## Bileşenleri Nasıl Okumalısınız

### Sertifika risk radarı

Radarın sektörleri, etkin kasadaki kayıtlardan çıkarılan sertifika otoritelerini; merkeze uzaklık ise 90 güne kadar kalan süreyi gösterir. Çok sertifikalı bir kayıtta kalan süre, yönetilen zincirin **en erken `notAfter`** değerinden hesaplanır. Renk bantları **0–15 gün**, **16–30 gün**, **31–60 gün**, **60+ gün** ve **Tarih yok** ayrımını kullanır. Kritik sayı; 15 gün veya daha az kalan kayıtların yanında süresi dolmuş ve iptal edilmiş kayıtları da kapsar.

Bir radar noktasını seçmek ayrıntı penceresini açar. Burada kayıt sayısı, en yakın bitiş, durum, otorite ve imzalayan, konu, alan adı, kayıt sorumlusu, ortam, kaynak, biçim, kategori, içe aktarım tarihi ile kısaltılmış parmak izi ve seri numarası görülür. Bu pencere kaydı değiştirmez ve sertifika değerini göstermez.

Ekrandaki **Canlı tarama** ifadesi, eldeki envanter noktalarının görsel radar hareketidir. Ağ hedeflerine bağlanmaz, TLS el sıkışması yapmaz ve Discovery çalıştırmaz.

### Sertifika geçerlilik takvimi

Takvim yalnız süresi dolmamış, henüz geçerli olmayan sınıfında bulunmayan, iptal edilmemiş ve okunabilir bitiş tarihi bulunan kayıtları sayar. Çok sertifikalı kayıtta en erken `notAfter` kullanılır. Görünen sütun etiketi ile kapsadığı gerçek kalan süre şöyledir:

| Görünen etiket | Gerçek kalan süre |
| --- | --- |
| 180+ gün | 181 gün ve üzeri |
| 180 gün | 91–180 gün |
| 90 gün | 61–90 gün |
| 60 gün | 31–60 gün |
| 30 gün | 16–30 gün |
| 15 gün | 8–15 gün |
| 7 gün | 2–7 gün |
| 1 gün | 1 gün |
| Bugün | 0 gün |

Başlıktaki ilk sayı bu aralıklara girebilen kayıtları, ikinci sayı etkin kasadaki toplam sertifika kaydını gösterir. Süresi dolmuş ve tarihi olmayan kayıtlar burada değil, durum bileşeninde izlenir.

### Sertifika durumları

Durum bileşeni tüm sertifika kayıtlarını altı sınıfa ayırır. Yönetilen zincirde bitiş için **en erken `notAfter`**, başlangıç için **en geç `notBefore`** kullanılır; böylece zincirin henüz başlamamış veya sona ermiş tek bir üyesi gözden kaçmaz.

| Durum | Hesaplama |
| --- | --- |
| Geçerli | 30 günden fazla süresi kalan kayıt. |
| Yenileme aralığında | Bugün dahil 30 gün veya daha az süresi kalan kayıt. |
| Henüz geçerli değil | Zincirdeki en geç `notBefore` gelecekte; hiçbir zincir üyesinin süresi dolmamış. |
| Süresi doldu | Bitiş tarihi geçmiş kayıt. |
| İptal / pasif | Kayıt durumu iptal veya pasif olarak işaretlenmiş kayıt; bitiş tarihinden önce değerlendirilir. |
| Tarih yok | Okunabilir bir bitiş tarihi bulunmayan kayıt. |

Durum hesabında **İptal / pasif** önceliklidir. Bu nedenle iptal edilmiş bir kayıt, bitiş tarihi geçmiş veya eksik olsa bile **Süresi doldu** ya da **Tarih yok** yerine **İptal / pasif** altında sayılır. Diğer kayıtlarda herhangi bir yönetilen zincir üyesinin süresi dolmuşsa kayıt **Süresi doldu**; hiçbiri dolmamış ancak en az biri gelecekte başlayacaksa **Henüz geçerli değil** sayılır.

**Dikkat** sayısı, geçerli dışındaki beş sınıfın toplamıdır. Toplam sertifika düğmesi Sertifikalar ekranındaki tüm sertifikaları açar; belirli bir durum satırı yalnız o durumla filtrelenmiş listeyi açar. Ortadaki donut, oranları gösteren statik bir görseldir ve tıklanmaz. Kesin ayrıntıya inmek için adlandırılmış durum satırını seçin.

### Sertifika dağılımı

Dağılım alanı kayıtları üç yönden gruplar:

- **Kaynak:** Manuel, İçe aktarılan, AD sync ve Diğer. **Diğer**, bu üç tanımlı kaynak dışında kalan kaynak değerlerinin tamamını kapsar.
- **CA:** Kayıt meta verisinden sınıflandırılan sertifika otoritesi.
- **Organizasyon:** Kayıtlardan çıkarılan ilk dört organizasyon grubu.

Tüm kaynak, CA ve organizasyon satırları Sertifikalar ekranını ilgili filtreyle açar. **Diğer** satırı, kapsadığı bütün kaynak değerlerini tek bir çoklu filtre halinde taşır; organizasyon filtresine düşmez. Üstteki donutlar yalnız dağılımı gösteren statik görsellerdir; ayrıntıya inmek için altlarındaki adlandırılmış satırları kullanın.

## Filtreler ve Ayrıntıya İnme

- Geçerlilik takvimindeki dolu bir sütun, o süre aralığını **Sertifikalar** ekranında akıllı filtre olarak açar.
- Durum satırları **Geçerli**, **Yenileme aralığında**, **Henüz geçerli değil**, **Süresi doldu**, **İptal / pasif** veya **Tarih yok** filtresine gider.
- Manuel, İçe aktarılan ve AD sync kaynak satırları tek değerle; **Diğer** kaynak satırı kapsanan değer kümesiyle filtrelenmiş sertifika envanterine gider. CA ve organizasyon satırları da kendi kesin değerlerini taşır.
- Radar noktası Sertifika Panelinden ayrılmadan meta veri penceresi açar; kayıt düzenleyicisini açmaz.
- Bir filtre beklenenden az sonuç gösteriyorsa etkin kasayı kontrol edin. Panel ve ayrıntı listesi yalnız seçili kasanın okunabilir kayıtlarını kullanır.

## Envanter, HTTPS ve Discovery Ayrımı

| Yüzey | Veri kaynağı | Ne anlatır | İşlem yeri |
| --- | --- | --- | --- |
| Sertifika Paneli | Etkin kasadaki sertifika kayıtları | Kayıtlı geçerlilik, durum, otorite, kaynak ve organizasyon meta verisi | Sertifikalar ekranı |
| Tarayıcı HTTPS erişimi | VaultPilot sunucusunun etkin HTTPS yapılandırması | Tarayıcının bağlandığı sunucu sertifikası, güven zinciri ve genel sunucu adı | Sunucu ayarları ve Public host/HTTPS rehberi |
| Discovery | Yetkilendirilmiş, onaylı özel hedeflere yapılan sınırlı aktif TLS bağlantısı | Süre, henüz geçerli olmama, kendinden imzalı sertifika, hostname uyumsuzluğu ve yinelenen parmak izi bulguları | Discovery ekranı |

Bir kasa kaydının konusu ile alan adı farklı görünüyor diye Sertifika Paneli tek başına **hostname uyumsuzluğu** kararı vermez. Bu karar, beklenen hedef adı ile sunulan SAN/CN bilgisini karşılaştıran Discovery bulgusundan veya tarayıcının bağlandığı gerçek HTTPS uç noktasından gelmelidir.

## Önerilen İş Akışları

### Süresi dolmuş, henüz geçerli olmayan veya yenileme aralığındaki kaydı inceleme

1. **Sertifika durumları** içinden **Süresi doldu**, **Henüz geçerli değil** veya **Yenileme aralığında** satırını seçin.
2. Sertifikalar ekranındaki filtreli kayıtların bitiş tarihini, ortamını, sorumlusunu ve kullanım bağlamını doğrulayın.
3. Yenileme onay sahibini ve hedef tarihi kurum içi değişiklik kaydında belirleyin.
4. Yeni materyali bu panelden yüklemeyin. Envanter kaydı için Sertifikalar ekranını, sunucu HTTPS paketi için Sunucu ayarlarını kullanın.
5. Değişiklikten sonra paneli yenileyip durum ve süre aralığının beklendiği gibi güncellendiğini doğrulayın.

Süresi dolmuş kayıt takvimde görünmez; **Süresi doldu** durum satırında kalır. Takvim sütununun boş olması, süresi dolmuş kayıt olmadığı anlamına gelmez.

### Hostname uyumsuzluğunu ele alma

1. Uyarının adres çubuğundaki VaultPilot HTTPS bağlantısından mı, Discovery bulgusundan mı geldiğini belirleyin.
2. Tarayıcı uyarısıysa kullanılan URL ile Sunucu ayarlarındaki genel sunucu adını ve etkin sertifika kaynağını karşılaştırın.
3. Discovery bulgusuysa beklenen hedefi, bağlantı noktasını ve hassas ayrıntıları çıkarılmış SAN/CN özetini özel kayıtta doğrulayın.
4. Yalnız envanter kaydında ad farklılığı görüyorsanız bunu doğrulanmış hostname uyumsuzluğu diye raporlamayın; gerçek uç nokta kanıtı isteyin.
5. Özel anahtar, sertifika parolası veya PFX/P12 paketi olmadan çözülemeyecek bir durumda özel destek kanalına geçin.

### Geçerlilik tarihi eksik kaydı düzeltme

1. **Tarih yok** durum satırını seçin.
2. Kaydın yalnız meta veri tutmak üzere oluşturulmuş bir sertifika kaydı mı, yoksa eksik meta verili bir sertifika içe aktarımı mı olduğunu doğrulayın.
3. Yetkili ve yazılabilir durumda kaydı Sertifikalar ekranından düzeltin veya onaylı kaynaktan yeniden içe aktarın.
4. Paneli yenileyip kaydın doğru süre aralığına ve duruma geçtiğini kontrol edin.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Yenileniyor | Panelin yenilenmesi tamamlanana kadar ikinci bir yenileme başlatmayın. |
| Sertifika kaydı yok | Etkin kasayı ve kasa okuma yetkisini doğrulayın; başka yüzeylerdeki sertifikaların burada görünmesi beklenmez. |
| Geçerli kayıtlar | 60+ gün bandını sakin izleyin; sorumlu ve ortam meta verisinin güncel kaldığını doğrulayın. |
| Yenileme aralığı | 30 gün ve altındaki kayıtlar için onay sahibi ve hedef tarih belirleyin. |
| Henüz geçerli değil | Zincirin en geç başlangıç zamanını ve sunucu saatini doğrulayın; geçerlilik başlamadan materyali kullanmayın. |
| Süresi dolmuş | İlgili kullanımı doğrulayın; yenileme veya kontrollü kullanım dışı bırakma kararı verin. |
| İptal / pasif | Kaydın bilerek pasifleştirildiğini ve artık etkin kullanım kanıtı olmadığını doğrulayın. |
| Tarih yok | Meta veriyi doğrulamadan kaydı sağlıklı kabul etmeyin. |
| Salt okunur lisans | Grafik, meta veri penceresi ve filtreli liste kullanılabilir; kayıt ekleme, düzenleme, iptal etme ve silme kapalıdır. |

## İşlemden Önce

- Doğru kasanın seçili ve kilidinin açık olduğunu doğrulayın.
- Envanter kaydı, tarayıcı HTTPS sertifikası ve Discovery bulgusu arasındaki işlem sınırını belirleyin.
- Bitiş tarihi, otorite, konu, ortam, kayıt sorumlusu ve kullanım bağlamını birlikte kontrol edin.
- Sertifika kaydını değiştirmek için kasada Düzenleyici veya Yönetici yetkisi ve yazılabilir lisans gerektiğini unutmayın.
- Sunucu HTTPS değişikliği öncesinde onaylı bakım penceresi, geri dönüş yolu ve yeni paketin kullanılabilir olduğunu doğrulayın.

## Güvenli Kanıt

- Paylaşılabilir: kayıt sayısı, durum sınıfı, geniş süre aralığı ve onaylı genel CA sınıfı.
- Gizli kalmalı: alan adı, konu/SAN özeti, organizasyon, ortam, kayıt sorumlusu, dosya adı, imzalayan ile kısaltılmış parmak izi ve seri numarası. Bunları yalnız özel destek veya kurum içi kayıtta kullanın; iç sunucu adlarını ve müşteri kimliğini maskeleyin.
- Asla paylaşmayın: özel anahtar, sertifika parolası, kayıt içindeki gizli değer, `.pfx`, `.p12`, `.pkcs12`, parola korumalı paket veya özel anahtar içeren PEM/KEY içeriği.
- Tam sertifika ve zincir özel anahtar içermese bile iç alan adlarını ve kurum topolojisini açığa çıkarabilir; açık kanala koymadan önce kurum onayı ve tam redaksiyon uygulayın.
- Ekran görüntüsünde müşteri adı, iç alan adı, e-posta, dosya yolu, parmak izi ve seri numarasını yalnız kırpmayın; tamamen maskeleyin.

## Ne Zaman Durmalı ve Destek İstemelisiniz

Uyarının hangi yüzeye ait olduğu belirlenemiyorsa, yenilenen sertifika yanlış alan adını gösteriyorsa, güven zinciri bilinmiyorsa, özel anahtarın dışarı çıkmış olabileceğinden şüpheleniyorsanız veya değişiklik için gerekli paket ve parola doğrulanamıyorsa işlem yapmayı bırakın. Gizli materyali eklemeden; yüzeyi, genel hata sınıfını, redakte hedefi, süre aralığını ve uygulanan son güvenli adımı içeren özel destek kaydı açın.

## Operatör Notları

Sertifika Paneli bir envanter ve önceliklendirme ekranıdır. Buradaki renkler, kayıt meta verisine göre risk sıralar; gerçek uç nokta güvenini, Windows sertifika deposunu veya tarayıcı zincir doğrulamasını kanıtlamaz.

## İlgili

- [Sertifikalar ekranı](screen-certificates.md)
- [Discovery ekranı](screen-discovery.md)
- [Sunucu ayarları](screen-server-settings.md)
- [Public host ve HTTPS](public-host-https-certificate.md)
- [HTTPS sertifika uyarısı](../../kb/tr/certificate-warning.md)
