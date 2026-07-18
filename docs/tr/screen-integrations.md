# Entegrasyonlar Ekranı

Üst çubuktaki `?` simgesi **Dış API** ve **Active Directory** sekmelerinde bu rehberi açar. **Tarayıcı eklentisi** sekmesinde aynı simge, o akışın ayrı [Tarayıcı Eklentisi ekranı](screen-browser-extension.md) rehberine gider. Entegrasyonlar ekranı bu üç ürün yüzeyini yönetir.

## Erişim ve Lisans Sınırı

Entegrasyonlar ekranı yalnız VaultPilot **Sahip** sistem rolüne gösterilir. Yönetici, Denetçi ve Kullanıcı rolleri API istemcilerini veya dizin sağlayıcılarını bu ekrandan listeleyemez ve yönetemez. Sol menüde ekranın açılması için lisansın **Entegrasyon** yeteneğini içermesi gerekir; kapsam yoksa menü devre dışı kalır ve Sahip lisans ekranına yönlendirilir.

Salt okunur lisans yeni API istemcisi ve AD ajanı oluşturmayı; dizin kapsamı kaydetme, anlık eşitleme, ajan işlemi, ajan erişim anahtarı yenileme/iptal etme, sağlayıcı silme ve kasaya AD kaydı aktarma gibi yazma işlemlerini kapatır. Güvenlik amacıyla mevcut bir API istemcisini veya tarayıcı eklentisi cihazını iptal etme yolu salt okunur lisans altında da kullanılabilir. Tarayıcı eklentisi ayrı lisanslanmaz; **Entegrasyon** yeteneğine dahildir. Eski imzalı `extension` lisansları yalnız eklenti erişimini geriye dönük olarak korur ve Dış API veya Active Directory kapsamını açmaz.

## Burada Ne Yapılır

- **Dış API** sekmesinde salt okunur API yetkilerini seçin, gerekiyorsa en az bir kasa atayın ve istemci oluşturun.
- Yeni istemcinin gizli değerini süre dolmadan kopyalayın; daha sonra geri gösterilemez.
- **İstemci defteri** içinde etkin ve iptal edilmiş istemcileri, kapsamları, kasa sayısını, son okumayı ve oluşturma bilgisini inceleyin.
- **Audit akışı** içinden istemci oluşturma, endpoint erişimi ve iptal olaylarını filtreleyip Denetim Geçmişindeki özgün olaya geçin.
- **Active Directory** sekmesinde tek ajan kaydını kurun veya onarın; eşitleme durumunu, OU/grup/kullanıcı ağacını ve ajan yeteneklerini izleyin.
- VaultPilot giriş kapsamı ile kasaya aktarılacak AD kullanıcı kapsamını ayrı yönetin.
- **Tarayıcı eklentisi** sekmesinde Chrome Web Store kanalını, bekleyen/onaylı cihazları ve iptal edilmiş veya süresi dolmuş cihaz arşivini yönetin.

## Dış API

### Yetki matrisi ve endpoint kapsamı

Ekran ilk açıldığında üç operasyonel durum yetkisi seçilidir. En az bir yetki her zaman seçili kalır. **Kasa verisi** seçilmedikçe kasa ataması görünmez ve oluşturulan istemci hiçbir kasa kaydını okuyamaz.

| Ekrandaki yetki | İç kapsam | İzin verilen endpoint | Veri sınırı |
| --- | --- | --- | --- |
| Kasa verisi | `SECRETS_READ` | `GET /api/public/v1/secrets` ve `GET /api/public/v1/secrets/{secretId}` | Yalnız atanmış kasaların şifreli snapshot ve tek kayıt çıktısı; düz metin kasa içeriği dönmez. |
| Sunucu durumu | `SERVER_STATUS_READ` | `GET /api/public/v1/server/status` | Sunucu sağlık ve çalışma durumu. |
| Active Directory | `DIRECTORY_STATUS_READ` | `GET /api/public/v1/directory/status` | Ajan bağlantısı, eşitleme ve seçili nesne sayıları. |
| Güncelleme durumu | `UPDATE_STATUS_READ` | `GET /api/public/v1/updates/status` | Update Center paket ve sürüm sinyali. |

**Kasa verisi** yüksek dikkat isteyen yetkidir. Seçildiğinde **API kapsamındaki kasalar** alanından en az bir kasa işaretlenmeden istemci oluşturulamaz. Yalnız durum endpointlerini kullanan istemci için kasa seçmeyin; bu seçimde sunucu kasa verisini çözmez.

### İstemci oluşturma ve gizli değer sınırı

1. **Yetki matrisi** içinde yalnız tüketen sistemin ihtiyaç duyduğu grupları seçin.
2. **Endpoint kapsamı** alanında oluşan gerçek yolları kontrol edin.
3. `SECRETS_READ` seçiliyse gerekli en küçük kasa kümesini işaretleyin.
4. **İstemci adı** alanına sistemi ve amacı ayırt eden bir ad yazın.
5. **İstemci oluştur** düğmesini kullanın.
6. Tam istemci kimliğini ve **Gizli anahtarı kopyala** ile alınan gizli değeri tüketen sistemin onaylı gizli değer deposuna aktarın.

Gizli değer ekranda maskeli kalır. 120 saniyelik sayaç sonunda veya **Temizle** seçildiğinde yalnız tek seferlik sonuç paneli kapanır; istemci kaydı ve sunucuda saklanan gizli değer özeti silinmez. Kaybolan gizli değer yeniden açılamaz. Gizli değer kopyalandığında VaultPilot 30 saniye sonra, yalnız aynı değer hâlâ panodaysa, panoyu temizlemeyi dener. Tarayıcı izni temizliği engelleyebilir; başka bir yere yapıştırılmış veya kaydedilmiş kopya geri alınamaz. İstemci kimliği kopyası bu süreli pano temizliğini kullanmaz.

### İstemci defteri, audit ve iptal

İstemci defteri durum, ad, kısaltılmış istemci kimliği, yetkiler, kasa/yetki/denetim kaydı sayıları, son okuma, oluşturan kullanıcı ve oluşturma zamanını gösterir. **İstemci kimliğini kopyala** tam kimliği alır. **Logları gör** ilgili istemciyi Audit akışında seçer. Sunucu, başarılı public API kullanımında **Son okuma** zamanını ve `INTEGRATION_SYNC` denetim olayını her istek için değil, istemci başına en fazla beş dakikada bir günceller. Audit akışı geçerli filtre için en yeni sekiz oluşturma, örneklenmiş endpoint erişimi veya iptal olayını gösterir; bir satır seçildiğinde Entegrasyon kategorisindeki Denetim Geçmişi olayı açılır.

**Erişimi iptal et** onaydan sonra istemciyi `REVOKED` durumuna taşır. İptal edilmiş kayıt defterde kanıt olarak kalır, yeniden etkinleştirilemez ve aynı gizli değer döndürülemez. Değişim gerekiyorsa dar kapsamlı yeni istemciyi oluşturun, tüketen sistemi yeni kimlik bilgisine geçirin ve ardından eski istemciyi iptal edin.

<a id="active-directory-agent"></a>

## Active Directory

### Veri ve parola sınırı

VaultPilot DC ajanı etki alanı denetleyicisiyle aynı ağda çalışır. DC, Base DN, bind kullanıcı adı, OU, grup, kullanıcı ve AD durum bilgisini VaultPilot'a gönderir. Bind parolası ve mevcut AD kullanıcı parolaları VaultPilot'a gönderilmez veya ekranda gösterilmez. Kasaya aktarılan AD kaydı kullanıcı/UPN/DN ve durum meta verisiyle, boş parola alanıyla oluşturulur; gerekirse yeni parola daha sonra yetkili ajan işlemiyle atanır ve şifreli kayda yazılır.

### İlk ajan kaydı ve yerel kurulum

1. Sağlayıcı adını doğrulayın; varsayılan otomatik eşitleme aralığı 10 dakikadır.
2. **Ajan kaydı oluştur** ile tek sağlayıcı kaydını hazırlayın.
3. **Ajan scriptini indir** ile `/downloads/vaultpilot-dc-agent.ps1` dosyasını alın.
4. Ekranda maskeli duran ajan erişim anahtarını **Anahtarı kopyala** ile ayrı alın.
5. **Komutu kopyala** ile servis kurulum komutunu alın ve yönetici PowerShell'de çalıştırın; erişim anahtarını yalnız yerel gizli isteme yapıştırın.
6. Gerekirse **VaultPilot ön kontrol**, **LDAP ön kontrol**, **Durum komutu** ve **Canlı log** komutlarını kullanın.

HTTPS üzerinden açılan konsol, etkin VaultPilot sertifikasının parmak izini ajan komutuna sabitler. Kurumsal CA kullanıyorsanız Windows güven deposunu veya kurum dağıtım politikasını ayrıca yönetin. Ajan kaydı zaten varsa ikinci sağlayıcı oluşturmayın; mevcut satırdaki **Erişim anahtarını yenile** işlemi yeni erişim anahtarı ve onarım komutu üretir.

**Anahtarı kopyala** ile alınan erişim anahtarı ve **Komutu kopyala** ile alınan kurulum veya onarım komutu için VaultPilot, aynı içerik hâlâ panodaysa 30 saniye sonra en iyi çabayla temizlik dener. **VaultPilot ön kontrol**, **LDAP ön kontrol**, **Durum komutu** ve **Canlı log** kopyaları bu süreli temizliği kullanmaz; işiniz bitince bunları panodan kendiniz kaldırın.

### Sağlayıcı durumu, ağaç ve kapsamlar

Sağlayıcı kartı DC, Base DN, ajan sürümü, bind kullanıcı adı, son bağlantı, son eşitleme ve eşitleme aralığını gösterir. Durum etiketi **AJAN BEKLENİYOR**, **BAĞLI**, **BAĞLANTI ESKİ**, **ÇEVRİMDIŞI** veya **ANAHTAR İPTAL** olabilir. Bağlı bir ajan ayrıca **EŞİTLENİYOR**, **EŞİTLEME KUYRUKTA** veya **HATA** gösterebilir. **Şimdi eşitle** yalnız komutu kuyruğa alır; sonuç için sağlayıcı durumunu ve İşlemler ekranını izleyin.

**Dizin ağacında ara** alanı OU, grup, kullanıcı, UPN ve DN içinde arar. **Ağaç**, **OU**, **Gruplar** ve **Kullanıcılar** görünümleri yalnız listeyi süzer. Kullanıcıların VaultPilot ile giriş seçimi anında ayrı giriş kapsamına kaydedilir; Active Directory kayıt aktarımı için yapılan dal/kullanıcı seçimleri taslak olarak kalır. Önce **Kapsamı kaydet**, sonra **Seçilenleri kasaya aktar** kullanın. Aktarım için etkin kasada Düzenleyici veya Yönetici erişimi ve yazılabilir lisans gerekir.

Hazırlanan VaultPilot 2.2.0 sürümünde seçilmiş kullanıcı aynı kasada zaten varsa kayıt atlanmak yerine kimlik ve AD durum meta verisiyle uzlaştırılır. Bu adım yalnız ilgili yazılabilir kasa yetkili tarayıcıda açıkken tamamlanabilir; ajan ve sunucu şifreli kaydı açamaz. Mevcut parola boş dizin verisiyle değiştirilmez, kapsamdan çıkan veya dizinde bulunamayan kullanıcı kaydı kendiliğinden silinmez. Sağlayıcı eşitlemesi başarılı olsa bile kasa uzlaştırması kısmi sonuç verebilir; satır bazlı sonucu inceleyin.

**Ajan yetenekleri** şeridi yalnız ajanın bildirdiği desteği gösterir: **Parola durumu**, **Kilidi aç**, **Parola değişimi iste**, **Şimdi rastgele parola ata** ve **Hesabı kapat**. Bu şerit işlem başlatmaz. Sahip rolü, yazılabilir lisans, `CONNECTED` ajan sağlığı, hazır çalışan ve ilgili yetenek birlikte doğrulanmadıkça hassas ajan işlemleri fail-closed kalır. Kimliğe bağlı bu işlemler için servis ile çalışanın `1.2.20` veya daha yeni sürüm bildirmesi gerekir; güncel indirme ve onarım hedefi `1.2.21` sürümüdür ve başarılı eşitleme eski ajanı yükseltmez. Yerleşik hesaplar ve bind hesabı her durumda korunur. Ayrıcalıklı diğer hedefler elle işlemde ikinci onay, otomatik rotasyonda ayrıca kalıcı ilke onayı ister. Sonuçlar **Ajan işlemleri** zaman çizgisinde görünür.

**Erişim anahtarını yenile** eski anahtarı hemen geçersiz kılar ve yeni anahtarı yalnız geçerli sonuç panelinde verir. **Tehlikeli işlemler** altındaki **Erişim anahtarını iptal et**, ajanı yeniden kayıt/onarıma kadar eşitlemeden çıkarır. **Sağlayıcıyı kaldır**, sağlayıcı kaydını siler; Windows ajanı yeniden bağlanmak için yeni kayıt ve erişim anahtarı ister.

Kurulum ve onarım komutunda erişim anahtarının kendisi bulunmaz; komut `-PromptAgentToken` kullanır. Anahtarı ayrı kopyalayın ve yalnız yönetici PowerShell'deki yerel gizli isteme yapıştırın. Komuta düz metin erişim anahtarı eklemeyin.

## Tarayıcı Eklentisi

Bu sekme Chrome Web Store'u normal kurulum kanalı olarak açar; yerel ZIP veya geliştirici modu günlük kurulum akışı değildir. Özet kartları son eşitlemeyi ve onaylı/bekleyen cihaz sayılarını yeniler. **Aktif cihazlar** sekmesi `PENDING` ve `APPROVED`, **Arşiv** sekmesi `REVOKED` ve `EXPIRED` cihazları gösterir.

Bekleyen isteği onaylamak için eklenti popup'ındaki `XXXX-XXXX` biçimli sekiz karakterli kodu girin. En az bir kasanın kilidi açık ve lisans yazılabilir olmalıdır. Cihaz satırı yalnız cihaz adını, eşleştirme kodunun son dört karakterini ve kasa yetkisi sayısını gösterir; kullanıcı, hesap, tarayıcı profili ve talebin kaynağı gibi diğer kimlik kontrollerini kurum içi kanaldan ayrıca yapın. Onay, açık kasaların anahtarlarını cihazın açık anahtarı için sarar; düz metin kasa kaydı veya ana parola eklenti cihaz listesinde gösterilmez. Onaylı cihazda görünen kesin işlem etiketi **İptal et**'tir. Bu sekmedeki `?`, ayrıntılı eşleştirme ve cihaz durumları için Tarayıcı Eklentisi ekranı rehberini açar.

## Önerilen İş Akışları

### Yalnız durum okuyan API istemcisi

1. **Kasa verisi** seçimini kapalı tutun.
2. Sunucu, Active Directory ve Güncelleme durumu yetkilerinden gerekenleri seçin.
3. Endpoint özetinde kasa yolunun bulunmadığını ve kasa seçicinin açılmadığını doğrulayın.
4. İstemciyi oluşturup gizli değeri onaylı sisteme aktarın.
5. İlk başarılı çağrıdan sonra **Son okuma** ve Audit akışındaki **Endpoint erişimi** olayını doğrulayın. Aynı istemcinin sonraki çağrıları beş dakikalık örnekleme aralığında bu iki alanı yeniden güncellemeyebilir.

### Dizin ajanını onarma

1. Ajan sağlığı ve son bağlantı zamanını kontrol edin; **Durum** ve **Canlı log** komutlarıyla Windows servisini doğrulayın.
2. Erişim anahtarı geçersiz veya onarım gerekiyorsa **Erişim anahtarını yenile** için onay verin.
3. Yeni erişim anahtarını ayrı kopyalayın, onarım komutunu yönetici PowerShell'de çalıştırın ve değişmeyen DC/bind ayarlarını Enter ile koruyun.
4. Sağlık `BAĞLI` olduktan sonra **Şimdi eşitle** kullanın; ilk eşitleme tamamlanmadan kapsam veya kasa aktarımı yapmayın.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| API istemcileri yükleniyor | İstemci defterindeki iskelet satırlar bitmeden yeni istemci oluşturmayın. |
| API istemcisi yok | Yetki matrisini gözden geçirip yalnız gerçek tüketen sistem için ilk istemciyi oluşturun. |
| API istemcisi iptal | Kaydı yeniden kullanmayın; gerekiyorsa yeni ve dar kapsamlı istemci oluşturun. |
| API istemcisi oluşturulamadı | Sahip rolünü, yazılabilir lisansı, seçili yetkiyi ve `SECRETS_READ` için kasa atamasını kontrol edin. |
| AD sağlayıcıları yükleniyor | Mevcut kayıt doğrulanana kadar yeni ajan kaydı oluşturmayın. |
| AD sağlayıcıları alınamadı | **Yeniden dene** kullanın; hata sürerken ikinci sağlayıcı oluşturmayın. |
| Ajan bekleniyor | Script, yerel erişim anahtarı istemi, VaultPilot erişimi ve ilk Windows servis bağlantısını doğrulayın. |
| Bağlantı eski / çevrimdışı | Hassas dizin işlemlerini durdurun; durum ve canlı log komutlarıyla servisi ve ağı kontrol edin. |
| Ajan erişim anahtarı iptal | Yeni erişim anahtarı ve onarım komutu olmadan eşitleme beklemeyin. |
| İlk eşitleme bekleniyor | **İlk eşitlemeyi iste** kullanın ve ağaç dolana kadar kapsam seçmeyin. |
| Kapsam değişikliği kaydedilmedi | Önce **Kapsamı kaydet** veya **Değişiklikleri bırak**; kasa aktarımı bu sırada kapalıdır. |
| Eklenti eşleştirmesi bekliyor | Satırdaki cihaz adı ve kod ipucunu eşleştirin; kullanıcı, hesap ve tarayıcı profili doğrulamasını kurum içi kanaldan tamamlayın. |
| Eklenti isteği süresi doldu / iptal | Arşivde kanıt olarak inceleyin; gerekirse eklentiden yeni istek başlatın. |
| Salt okunur lisans | Yeni kimlik bilgisi, eşleştirme ve dizin yazmaları kapalıdır; mevcut API istemcisi veya eklenti cihazı güvenlik amacıyla iptal edilebilir. |

## İşlemden Önce

- Oturumun Sahip rolünde olduğunu ve lisansın Entegrasyon yeteneğini içerdiğini doğrulayın.
- İşlemin Dış API, Active Directory veya Tarayıcı eklentisi sekmesine ait olduğunu kesinleştirin.
- API istemcisi için tüketen sistem, iş sahibi, gerekli endpointler, en küçük kasa kümesi ve gözden geçirme tarihini kaydedin.
- İptalden önce yeni istemciye veya yeni ajan erişim anahtarına geçişin tamamlandığını doğrulayın; acil güvenlik iptalinde beklemeyin.
- AD ajanı değişikliğinde DC erişimi, bind kullanıcı adı, yönetici PowerShell, script kaynağı ve geri dönüş yolunu hazırlayın.
- Kasaya AD kaydı aktarırken doğru kasanın açık, yazılabilir ve rolünüzün Düzenleyici/Yönetici olduğunu kontrol edin.
- Eklenti cihazını onaylamadan önce satırdaki cihaz adı, kod ipucu ve kasa yetkisi sayısını kontrol edin; kullanıcı talebini ve tarayıcı profilini kurum içi kanaldan ayrıca doğrulayın.

## Güvenli Kanıt

- Paylaşılabilir: sekme adı, yetki adı, redakte endpoint yolu, genel HTTP durum kodu, ajan sağlık sınıfı, nesne sayısı ve eklenti sürümü/mağaza kanalı.
- Gizli kalmalı: tam istemci kimliği, istemci gizli değeri, ajan kimliği/erişim anahtarı, kurulum veya onarım komutu, eşleştirme kodu, cihaz kimliği, iç DC/alan adı, Base DN, bind kullanıcı adı, UPN/DN ve kasa adı.
- API istemci gizli değeri, ajan erişim anahtarı veya eşleştirme kodu açığa çıktıysa genel paylaşımı durdurun; ilgili erişimi iptal edin veya yenileyin ve tüketen sistemi özel kanaldan güncelleyin.
- Ekran görüntüsünde yalnız kırpma yapmayın; kod, kimlik, alan adı, kullanıcı, dosya yolu, komut ve zaman ilişkisini tamamen maskeleyin.

## Ne Zaman Durmalı ve Destek İstemelisiniz

Beklenen istemciler defterde görünmüyorsa, aynı AD sağlayıcısından ikinci kayıt oluşmak üzereyse, ajan erişim anahtarı veya istemci gizli değeri yanlış sisteme yapıştırıldıysa, eşleştirme isteğinin sahibi doğrulanamıyorsa, ajan `STALE`, `OFFLINE` veya `REVOKED` durumundan çıkmıyorsa ya da kasaya aktarım beklenmeyen kullanıcıları içeriyorsa durun. Gizli değer eklemeden; sekme, genel durum, redakte kayıt kimliği, zaman, son güvenli adım ve hata metniyle özel destek kaydı açın.

## Operatör Notları

Bu ekran dış sistemlere yazma yetkisi veren genel bir entegrasyon merkezi değildir. Public API yalnız tanımlı okuma kapsamlarını kullanır. AD ajanı mevcut parolaları okumaz; desteklenen değişiklikleri yetkili komut olarak uygular. Tarayıcı eklentisi de yalnız onaylanan cihaz ve sarılmış kasa anahtarı sınırında çalışır.

`pmc_` istemci kimliği, `pms_` istemci gizli değeri, `pmt_` ajan erişim anahtarı, eşleştirme kodu veya iç sunucu bilgisi içeren ekran görüntüsü ve terminal çıktısı yayımlamayın.

## İlgili

- [Entegrasyon API istemcileri](api-clients.md)
- [Public API referansı](public-api-reference.md)
- [Active Directory ajanı](active-directory-agent.md)
- [Active Directory kayıtları ekranı](screen-active-directory-records.md)
- [Tarayıcı Eklentisi ekranı](screen-browser-extension.md)
- [Tarayıcı eklentisi](browser-extension.md)
