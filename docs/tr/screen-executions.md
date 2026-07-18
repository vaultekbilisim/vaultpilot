# İşlemler Ekranı

Üst çubuktaki `?`, İşlemler ekranına ait bu rehberi açar. Bu ekran; güncelleme işleri, AD ajan işlemleri ve seçili kalıcı denetim olaylarını tek bir zaman sıralı görünümde birleştirir. Bir görevi başlatma veya genel amaçlı yeniden deneme ekranı değildir.

## Erişim, Rol ve Lisans Sınırı

Sahip, Yönetici ve Denetçi sistem rolleri İşlemler ekranını açabilir. Kullanıcı rolü sistem görünümüne erişemez. Ekranı kullanmak için kasa kilidinin açılmış ve sunucu oturumunun doğrulanmış olması gerekir.

Görüntüleme ayrı bir lisans özelliğine bağlı değildir; salt okunur lisans mevcut kayıtları görmeyi tek başına engellemez. Yalnız **Sahip**, uygun bir AD ajan işleminde **İşlemi durdur** seçeneğini görür. Durdurma sunucuda yazma sayıldığı için salt okunur lisans bu isteği reddeder. **Kaynağı aç** ile gidilen Güncelleme Merkezi veya Entegrasyonlar gibi ekranlarda ayrıca rol ve ilgili lisans özelliği denetlenebilir.

## Burada Ne Yapılır

- Yüklenen işlemleri kategori ve durum grubuna göre daraltın.
- İşlem özetini, durumunu, ilerleme oranını, kaynağını, hedefini, aktörünü ve son güncelleme zamanını okuyun.
- Varsa adımları ve sınırlı log özetini açarak sorunun hangi aşamada olduğunu belirleyin.
- **Yenile** ile anlık görünümü tekrar alın; ekran açıkken liste yaklaşık 2,5 saniyede bir kendiliğinden de yenilenir.
- **Kaynağı aç** ile Güncelleme Merkezi, Entegrasyonlar veya Denetim Geçmişi bağlamına geçin.
- Yalnız bekleyen veya ajan tarafından alınmış AD ajan işlemini, Sahip rolüyle ve onay vererek durdurun.

Bu ekranda genel **Yeniden dene** düğmesi yoktur. Güncelleme, Discovery, bakım veya başarısız AD işlemini buradan yeniden başlatmayın; önce kaynağı ve kanıtı inceleyin, ardından yalnız ilgili kaynak ekranı böyle bir işlem sunuyorsa oradan yeni bir çalışma başlatın.

<a id="runs-and-scheduled-tabs"></a>

## Çalışmalar ve Zamanlanmış Sekmeleri

**Görevler** çalışma alanı iki ayrı görünüm kullanır:

- **Çalışmalar**, başlamış veya tamamlanmış yürütmeleri gösterir ve açıkken yaklaşık 2,5 saniyede bir yenilenir.
- **Zamanlanmış**, gelecekte çalışacak kuralları ve yeniden deneme bekleyen işleri gösterir ve açıkken yaklaşık 15 saniyede bir yenilenir.

Üst çubuktaki yenileme yalnız seçili sekmenin sorgusunu tekrarlar. **Zamanlanmış** açıkken **Çalışmalar** listesi, **Çalışmalar** açıkken zamanlanmış işler ve başka çalışma alanları yenilenmez. Tarayıcı sayfası yeniden yüklenmez; filtreler korunur.

<a id="scheduled-operations"></a>

## Zamanlanmış İşler

Zamanlanmış görünüm Active Directory rotasyonu (`DIRECTORY_ROTATION`), dizin eşitlemesi (`DIRECTORY_SYNC`), sertifika yaşam döngüsü (`CERTIFICATE_LIFECYCLE`) ve kalıcı SMTP giden kutusu (`SMTP_OUTBOX`) kaynaklarını birlikte gösterir. Her kart kaynak, tetikleyici, çalışma sıklığı, sonraki çalışma, son çalışma, son sonuç, ilişkili yürütme ve varsa sınırlı log özetini taşır.

Sertifika yaşam döngüsü taraması sıfır-bilgi sınırı nedeniyle yalnız yetkili, açık ve kilidi çözülmüş tarayıcı oturumunda çalışır. Sunucuda bağımsız sertifika payload runner'ı varmış gibi sahte son/sonraki çalışma zamanı üretilmez. Kart saatlik sıklığı ve `CLIENT_SESSION_REQUIRED` sonucunu gösterebilir; gerçekleşen 15, 7, 3, 1 gün ve süresi doldu olayları redakte denetim geçmişinden gelir.

| Durum | Anlamı |
| --- | --- |
| **Hazır** (`READY`) | Kural etkin ve bir sonraki zamanını bekliyor. |
| **Vadesi geldi** (`DUE`) | Çalıştırıcı tarafından alınmayı bekliyor. |
| **Çalışıyor** (`RUNNING`) | İlişkili yürütme etkin. |
| **Yeniden deniyor** (`RETRYING`) | Kaynak ilk başarısızlıktan sonra kontrollü bekleme uyguluyor. |
| **Engellendi** (`BLOCKED`) | Yetki, ajan sağlığı, kasa durumu veya kalıcı hata nedeniyle ilerleyemiyor. |
| **Duraklatıldı** (`PAUSED`) | Kural operatör ya da kaynak ilkesi tarafından durdurulmuş. |

Filtreler **Tümü**, **Aktif**, **Dikkat**, **Hazır** ve **Duraklatıldı** seçenekleridir. Çalışma sıklığı günlük, haftalık, aylık, özel aralık, saatlik sertifika taraması veya kaynağın yeniden deneme aralığı olabilir. Tetikleyici **Takvim**, **Gizli değer gösterildi** veya **Parola yaşı** olabilir. **Kaynağa git**, rotasyon ilkesi, Active Directory sağlayıcısı, Sertifikalar ekranı ya da SMTP ayarının doğru bağlamını açar; yeni çalışma başlatmaz.

## Veri Kaynakları ve Kapsam

Sunucu en fazla 80 kaydı son güncellenen önce olacak şekilde birleştirir:

| Kaynak | Ekrandaki kaynak etiketi | Ne gösterir | **Kaynağı aç** hedefi |
| --- | --- | --- | --- |
| Güncelleme işi | `Update job` | Sunucu veya tarayıcı eklentisi güncellemesinin canlı durum, adım ve mesajlarını | Güncelleme Merkezi |
| Dizin ajan işlemi | `AD ajan işlemi` | Bekleyen, ajan tarafından alınan veya tamamlanan AD eylemini | Entegrasyonlar |
| Denetim olayı | `Denetim olayı` | Paylaşım, güvenlik, Discovery, kasa, entegrasyon ve sistem işlemlerinin kalıcı kaydını | Denetim Geçmişi |

Discovery taramasının canlı işi bu listeye ayrı bir Discovery çalışma kaydı olarak eklenmez. Politika kaydetme, tarama başlatma, bulgu bastırma, içe aktarım hazırlama/tamamlama ve iyileştirme tamamlama gibi seçili Discovery olayları **Kaydedildi** durumunda denetim kaydı olarak görünür. Canlı ilerleme, iptal ve tamamlanmış çalışma yönetimi için Discovery ekranını kullanın.

Sunucu ayarı kaydetme, yeniden başlatma ve bakım temizliği gibi izlenen bakım olayları da **Sistem** kategorisinde kalıcı denetim kaydı olabilir. İşlem kayıtlarını yedekleyip temizleme veya geri yükleme bu ekranda yapılmaz; **Sunucu ayarları > Operasyonlar** kullanılır. Bakım temizliği tamamlanmış güncelleme ve dizin işlem kayıtlarını kaldırabilir, aktif işlemleri korur ve kendi bakım denetim kaydını üretir.

## Filtreler

Kategori ve durum filtreleri satırları birlikte daraltır. Ancak düğmelerdeki sayılar kesişimi göstermez: kategori sayıları seçili durum filtresinden bağımsız, durum sayıları da seçili kategori filtresinden bağımsız olarak yüklenmiş anlık görünümün tamamından hesaplanır.

| Kategori | İçerik |
| --- | --- |
| **Tümü** | Yüklenen bütün kaynaklar. |
| **Güncelleme** | Canlı güncelleme işleri ile güncelleme denetim olayları. |
| **Dizin ajanı** | Canlı AD ajan işlemleri ve bunların seçili denetim kayıtları. |
| **Paylaşım** | Paylaşma ve paylaşımı geri çekme denetim olayları. |
| **Güvenlik** | Kullanıcı/oturum/2FA ve Discovery güvenlik olayları. |
| **Entegrasyon** | Dizin, entegrasyon ve eklenti denetim olayları. |
| **Kasa** | Silme, dışa/içe aktarma ve tamamlanan Discovery içe aktarımı gibi kasa olayları. |
| **Sistem** | Bakım, yeniden başlatma, lisans ve diğer sistem denetim olayları. |

| Durum filtresi | Dahil ettiği satır durumları |
| --- | --- |
| **Tüm durumlar** | Bütün durumlar. |
| **Aktif** | **Bekliyor**, **Çalışıyor** ve çalıştırıcı onayı bekleyen **İptal isteniyor**. |
| **Sorunlu** | **Başarısız**, **Engellendi** ve **İnceleme**. |
| **Tamamlanan** | **Başarılı**, **Kaydedildi** ve **İptal**. |

**İptal** satırlarının **Tamamlanan** filtresinde bulunması, başarılı oldukları anlamına gelmez; yalnız artık aktif olmadıklarını gösterir. Filtrelenmiş görünümde satır yoksa **Bu filtrede işlem kaydı yok** gösterilir. Bu mesaj, başka bir filtrede veya 80 kayıtlık görünüm sınırının dışında kayıt bulunmadığını kanıtlamaz.

## Satır, Adım ve Log Ayrıntıları

Her kartta işlem adı, özet, durum rozeti ve yüzde ilerleme bulunur. Meta satırı kaynak, hedef, aktör ve **Güncellendi** zamanını gösterir. Kaynakta bulunmayan hedef veya aktör `-` olarak görünür.

Kart, varsa ilk beş adımı gösterir. Her adımda etiket, ayrıntı veya genel durum karşılığı ve yüzde bulunur. Adım durumları `PENDING`, `RUNNING`, `DONE`, `BLOCKED` veya `FAILED` olabilir. Daha fazla adım varsa bu ekranda gösterilmez.

**Loglar** bölümü varsa ilk altı kayıt görünür. Her kayıtta seviye (**Bilgi**, **Başarılı**, **Uyarı**, **Hata**), mesaj, zaman ve varsa teknik ayrıntı yer alır. Log bölümü **Çalışıyor**, **Başarısız** ve **Engellendi** satırlarında varsayılan olarak açıktır; diğer durumlarda elle açılır. Bu özet tam sunucu logu veya teslim/çalıştırma makbuzu değildir.

Kart, işlem kimliğini, başlangıç zamanını veya tamamlanma zamanını ayrı alan olarak göstermez. Destek kanıtında görünmeyen bir işlem kimliği bulunduğunu varsaymayın; kimliği ancak güvenilir özel kaynak kanıtında gerçekten mevcutsa kullanın.

## Durumların Anlamı

| Görünen durum | Kaynak durumu ve yorum |
| --- | --- |
| **Bekliyor** | Kuyruğa alınmış veya hazır güncelleme işi ya da bekleyen AD ajan işlemi. Henüz ajan/işçi tarafından yürütülüyor saymayın. |
| **Çalışıyor** | Güncelleme çalışıyor veya AD ajanı işlemi yürütmek üzere teslim almış. İlerleme yüzdesi tek başına canlılık kanıtı değildir; güncellenme zamanını da izleyin. |
| **Başarılı** | Güncelleme tamamlanmış ya da AD ajan işlemi başarıyla sonuçlanmış. Kaynak ekranındaki sonucu ayrıca doğrulayın. |
| **Başarısız** | AD ajan işlemi hata ile sonuçlanmış. Mesajı ve redakte log ayrıntısını koruyun; bu ekranda yeniden deneme yoktur. |
| **Engellendi** | Güncelleme işi ilerleyememiş. Adım ve log ayrıntısını inceleyip Güncelleme Merkezine geçin. |
| **İptal isteniyor** | `CANCEL_REQUESTED` kaydedilmiş ancak çalıştırıcı henüz son durum vermemiş. Aktif kabul edin ve sonucu bekleyin. |
| **İptal** | AD ajan işlemi Sahip tarafından durdurulmuş. Tamamlanmış işlem ve denetim kanıtı silinmez. |
| **İnceleme** | Dizin ajanındaki `STALE_REVIEW_REQUIRED` durumu. Başarı veya sıradan kuyruk beklemesi saymayın; ajan sağlığını ve hedef işlemi inceleyin. |
| **Kaydedildi** | İzlenen bir denetim olayı kalıcı olarak yazılmış. Bu, ilişkili dış işlemin başarılı teslim edildiğini veya tamamlandığını tek başına kanıtlamaz. |

## Yenileme, Durdurma ve Yeniden Deneme

**Yenile**, yeni bir işlem başlatmadan yalnız liste sorgusunu tekrarlar. Sorgu sürerken düğme devre dışı kalır ve **Yenileniyor** olarak işaretlenir. Yetkili ve kilidi açık oturumda İşlemler görünümü açıkken otomatik sorgu yaklaşık 2,5 saniyede bir çalışır.

**İşlemi durdur** yalnız kaynağı `AD ajan işlemi` olan **Bekliyor** veya **Çalışıyor** satırında ve yalnız Sahip için gösterilir. Onay, önce `CANCEL_REQUESTED` yazar. Çalıştırıcı isteği kabul edip son durum bildirmeden işlem tamamlanmış veya iptal edilmiş sayılmaz. Askıda kalan eski çalıştırıcı daha sonra sonuç yazamaz. Tamamlanmış işlemler ile denetim kayıtları silinmez; güncelleme işleri ve denetim olayı satırları bu ekrandan durdurulamaz.

Bu ekranda yeniden deneme yoktur. **Kaynağı aç**, işlemi tekrar çalıştırmaz; yalnız ilgili çalışma alanına gider. Özellikle **Kaydedildi** durumundaki Discovery veya bakım kaydı canlı bir işi iptal etme ya da yeniden başlatma denetimi değildir.

## Önerilen İş Akışları

### Sorunlu bir işlemi inceleme

1. **Sorunlu** filtresini açın ve ilgili kategoriyi seçin.
2. Durumun **Başarısız**, **Engellendi** veya **İnceleme** olduğunu ayırın.
3. Son güncelleme zamanını, ilerlemeyi, adımları ve ilk altı log satırını inceleyin.
4. Aktör, hedef, Dizin DN'si, host, dosya yolu ve hata ayrıntısını paylaşmadan önce redakte edin.
5. **Kaynağı aç** ile doğru çalışma alanına geçin; kaynak ekranda yeni eylem başlatmadan önce aynı işin hâlâ aktif olmadığını doğrulayın.

### Aktif bir AD ajan işlemini durdurma

1. **Dizin ajanı** ve **Aktif** filtrelerini seçin.
2. Hedefi, aktörü, son güncelleme zamanını ve ajan sağlığını doğrulayın.
3. İşlemin gerçekten **Bekliyor** veya **Çalışıyor** olduğunu ve yanlış hedef seçilmediğini kontrol edin.
4. Sahip rolüyle **İşlemi durdur** seçeneğini kullanıp onayı okuyun.
5. Liste yenilendiğinde **İptal** durumunu ve ilgili denetim kanıtını doğrulayın.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Yükleniyor | Beş satırlık iskelet görünür; varsayılan boş görünümü kesin sonuç saymayın. |
| Filtrede kayıt yok | Kategoriyi veya durum filtresini genişletin; 80 kayıt sınırını ve kaynak ekranını ayrıca kontrol edin. |
| Yenileniyor | Aynı anda ikinci yenileme başlatmayın; mevcut sorgunun bitmesini bekleyin. |
| Liste yenilenemedi | Ekranda ayrı hata kartı olmayabilir. Oturum/kasa kilidi, rol ve sunucu bağlantısını doğrulayıp tekrar yenileyin; boş görünümü kayıt yok kanıtı saymayın. |
| Bekliyor | İşin kuyruğa alındığını gösterir; kaynak ekranında yinelenen ikinci iş başlatmayın. |
| Çalışıyor | Son güncelleme zamanı ilerliyorsa bekleyin; sabitse kaynak ekranı ve servis/ajan sağlığını inceleyin. |
| Başarısız | Redakte hata kanıtını koruyun; buradan yeniden deneyemezsiniz. |
| Engellendi | Engellenen adımı ve log ayrıntısını okuyup Güncelleme Merkezine geçin. |
| İnceleme | Dizin ajanı eylemini başarı saymayın; ajan/bağlantı ve hedef durumunu inceleyin. |
| Başarılı | Kaynak ekranındaki hedef sonucu doğrulayın; yüzde 100 tek başına dış etki kanıtı değildir. |
| Kaydedildi | Kalıcı denetim kaydı vardır; ilişkili işin canlı veya başarılı olduğunu buradan çıkarmayın. |
| İptal | Eylem aktif değildir; kayıt **Tamamlanan** filtresinde kalır ve denetim kanıtı korunur. |
| Durdurma görünmüyor | Satır AD ajan işlemi değildir, artık aktif değildir veya rol Sahip değildir. Salt okunur lisansta düğme görünebilir ancak sunucu isteği reddeder; kontrolü aşmaya çalışmayın. |

## İşlemden Önce

- Oturum rolünü ve lisansın yazılabilir durumunu kontrol edin; görüntüleme ile durdurma yetkisini birbirine karıştırmayın.
- Kategori ile durum filtresini not edin; filtrelenmiş boş görünümü tam geçmiş olarak yorumlamayın.
- Son güncelleme zamanının değişip değişmediğini ve aynı kaynakta mevcut aktif iş olup olmadığını kontrol edin.
- Durdurma öncesinde hedef ve aktörün doğru olduğunu doğrulayın; ajan tarafından alınmış AD eyleminin etkisi başlamış olabilir.
- Güncelleme, Discovery ve bakım kayıtlarında **Kaydedildi** ile gerçek iş sonucu arasındaki farkı koruyun.
- İşlem kaydı bakım temizliği veya geri yükleme kapsamındaysa önce özel kanıtı ve onaylı yedek akışını tamamlayın.

## Güvenli Kanıt

- Paylaşılabilir: kaynak ve kategori sınıfı, görünen durum, yaklaşık ilerleme yüzdesi, geniş zaman aralığı, redakte işlem/adım adı, log seviyesi ve genel hata kategorisi.
- Gizli kalmalı: aktör/kullanıcı adı, gerçek hedef etiketi ve Dizin DN'si, host/domain, yerel yol, dosya/paket adı ve konumu, tam log mesajı/ayrıntısı, tam denetim karma değeri, yedek dosya adı/özet değeri ve makineye özgü iz.
- Ekran görüntüsünde kart başlığının güvenli olduğunu varsaymayın; özet, hedef, aktör, adım ayrıntısı ve log satırlarını ayrı ayrı inceleyip maskeleyin.
- Destek için mümkünse kategori, durum, geniş zaman aralığı ve redakte hata kodunu paylaşın. Ham logu veya Dizin hedefini yalnız onaylı özel kanalda ve gerekli en dar kapsamla iletin.

## Ne Zaman Durmalı ve Destek İstemelisiniz

Çalışan satırın güncellenme zamanı ilerlemiyorsa, aynı işlem tekrar tekrar oluşuyorsa, **İnceleme** durumunun nedeni belirsizse, güncelleme **Engellendi** kalıyorsa, durdurulan AD eylemi hedefte etkisini sürdürüyorsa veya liste kaynak ekranıyla çelişiyorsa yeni görev başlatmayı bırakın. Redakte kaynak, kategori, durum, geniş zaman aralığı, son görünen adım ve genel hata koduyla özel destek kaydı açın.

## Operatör Notları

İşlemler, farklı yaşam döngülerini tek görünümde toplar; her satır aynı türden bir çalışma değildir. **Kaydedildi** denetim olayı, **Başarılı** iş sonucu ve **İptal** terminal durumu birbirinin yerine kullanılamaz. Kartta gösterilen adım ve log sayısı sınırlıdır; görünmeyen ayrıntıyı yok saymayın veya tahmin etmeyin.

## İlgili

- [Operasyon runbook](operator-runbook.md)
- [Güncelleme Merkezi](update-center.md)
- [Discovery ekranı](screen-discovery.md)
- [Entegrasyonlar ekranı](screen-integrations.md)
- [Denetim Geçmişi ekranı](screen-audit-log.md)
- [Sunucu ayarları ekranı](screen-server-settings.md)
