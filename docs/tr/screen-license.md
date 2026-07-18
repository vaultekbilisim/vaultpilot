# Lisans Ekranı

Üst çubuktaki `?` simgesi Lisans ekranına ait bu rehberi açar. Burada yalnız “lisans var mı?” sorusunun cevabı değil; doğrulanan plan, aktif kullanıcı kapasitesi, kalan süre, yazma durumu ve kullanılabilir modüller birlikte görülür.

Bu ekranın operatörü **Sahip (Owner)** rolüdür. Yönetici, Denetçi ve Kullanıcı rolleri lisansın etkisini kilitli modüller veya salt okunur davranış üzerinden görebilir, ancak Lisans çalışma alanını açamaz ve lisans kaydını yönetemez. Lisans etkinleştirme ya da temizleme gerektiğinde işlemi Sahip kullanıcıya aktarın. Rol sınırını başka bir hesap veya doğrudan API isteğiyle aşmaya çalışmayın.

## Burada Ne Yapılır

- Durum rozetini **Aktif kullanıcı**, **Plan**, **Kalan gün**, kapasite çubuğu ve **Plan yetenekleri** ile birlikte okuyun.
- Deneme sürümündeki 30 gün ve 3 kullanıcı sınırını, imzalı lisansın müşteri ve kullanıcı limitiyle karıştırmayın.
- Menü görünür olsa bile mevcut plana dahil olmayan modülün kilitli kalabileceğini unutmayın.
- Tarayıcı eklentisinin ayrı plan kartı olmadığını; **Entegrasyonlar** yeteneğine dahil gösterildiğini bilin.
- **Mevcut lisansı temizle** işleminin kasa verisini, kullanıcıları, oturumları veya denetim kanıtını değil, sunucuda saklanan tüm lisans kayıtlarını kaldırdığını bilin.

## Ekranı Nasıl Okumalısınız

Üst bölümdeki rozet lisans modunu, kapasite çubuğu aktif kullanıcıların limite oranını gösterir. **Yazma durumu** salt okunur olduğunda kasa kayıtlarını değiştirme, yeni kullanıcı ve kasa oluşturma, paylaşım, eklenti eşleştirme, Discovery yönetimi ve içe aktarımı, dizin ajanı değişiklikleri ile güncelleme kurulumu gibi yazma ve yönetim işlemleri kapanır. Mevcut şifreli veriyi okuma ve kurtarma yolları korunur. İzin verilen kesin işlemler için salt okunur mod rehberini izleyin. **Plan yetenekleri** bölümündeki açık ve sınırlı kartlar, bir modülün neden kullanılabildiğini ya da kilitli kaldığını açıklar.

**Lisans yaşam döngüsü** bandı, yenilemenin ne kadar acil olduğunu 60, 30 ve 7 günlük pencerelerle belirtir. Yalnız rozet rengine bakmayın; müşteri, plan, kalan gün, kapasite ve yetenek listesinin birbiriyle tutarlı olduğundan emin olun.

## Önerilen İş Akışları

### Lisans durumunu açıklama

1. Modu, yazma durumunu ve kalan günü okuyun.
2. Aktif kullanıcı sayısını lisans limitiyle karşılaştırın.
3. Kullanılmak istenen modülü **Plan yetenekleri** içinde bulun.
4. Son olarak kullanıcının rolünün o işlemi yapmaya izin verip vermediğini kontrol edin.

Beklenen sonuç, sorunun süre, kapasite, plan kapsamı veya rol kaynaklı olduğunun açıkça ayrılmasıdır. Ekran verisi yüklenmiyorsa lisans kodunu yeniden girmeyin; sayfayı yenileyin ve sunucu sağlığını doğrulayın.

### İmzalı lisansı etkinleştirme

1. Sahip hesabıyla oturum açın.
2. Kodun doğru müşteriye ve satın alınan plana ait olduğunu özel kanaldan doğrulayın.
3. Kodu **Lisans kodu** alanına yapıştırıp **Lisansı etkinleştir** düğmesini kullanın.
4. Doğrulama sonrası müşteri, plan, limit, kalan gün, yazma durumu ve yetenek listesini yeniden okuyun.

Başarılı işlemde imzalı lisans bilgileri görünür ve yalnız satın alınan yetenekler açılır. Ekran **Lisans kodu doğrulanamadı** hatası verirse art arda denemeyin; alanı temizleyin, hata metnini hassas ayrıntıları çıkararak kaydedin ve özel desteğe geçin. Aktivasyon tamamlanır ancak müşteri, plan veya kapasite beklediğiniz değerle uyuşmazsa yeni bir değişiklik yapmadan durun.

### Yenileme ve kapasite planlama

Kalan süre 60, 30 veya 7 gün bandına geldiğinde yenileme sorumlusunu ve hedef tarihi belirleyin. Kapasite yüzde 90'a yaklaşıyorsa yeni kullanıcı açmadan önce aktif kullanıcı listesini satın alınan limitle uzlaştırın. Yeni kod hazır değilse mevcut lisansı temizlemeyin; temizleme bir geri alma mekanizması değildir ve sunucuyu deneme ya da salt okunur davranışına taşıyabilir.

### Lisansı yenileme veya değiştirme

Yeni kod hazır olduğunda mevcut lisansı önceden temizlemeyin. Sahip hesabıyla yeni kodu doğrudan **Lisansı etkinleştir** alanından uygulayın. En son etkinleştirilen lisans kaydı güncel kayıt olur. Müşteri, plan, kullanıcı limiti, kalan gün, yazma durumu ve özelliklerin beklenen değerleri gösterdiğini doğrulayın. Sonuç farklıysa ikinci bir kod denemeden durun.

### Mevcut lisansı temizleme

**Mevcut lisansı temizle**, yenileme veya geri alma düğmesi değildir. Sunucuda saklanan tüm lisans kayıtlarını açıkça kaldırmak ve kurulum tarihine göre deneme veya salt okunur durumunun yeniden hesaplanmasını kabul etmek istediğinizde kullanın. Onay penceresini okuyun. İşlemden sonra kasa verisinin, kullanıcıların, oturumların ve denetim kanıtının korunduğunu, lisans modunun ise beklenen duruma geçtiğini doğrulayın.

## Ekran Durumları

| Durum | Operatör cevabı |
| --- | --- |
| Lisanslı | Açık özelliklerin satın alınan planla eşleştiğini doğrulayın. |
| Deneme | 30 günlük süreyi, 3 kullanıcı sınırını ve kilitli modülleri planlayın. |
| Salt okunur | Kurtarma erişimini koruyun ve değişiklikten önce salt okunur mod rehberini izleyin. |
| Kapasite kullanılabilir | Kullanımı izleyin; işlem gerekmez. |
| Kapasite dolmak üzere | Yeni kullanıcı açmadan önce aktif kullanıcı sayısını ve satın alınan limiti uzlaştırın. |
| Yaşam döngüsü uyarısı | 60, 30 veya 7 günlük yenileme eşiğine göre onay sahibini ve hedef tarihi belirleyin. |
| Aktivasyon doğrulanamadı | Tekrar tekrar denemeyin; hata metnini hassas ayrıntıları çıkararak kaydedip özel destek isteyin. |
| Yükleniyor | Kod girmeden önce kısa süre bekleyin; gerekirse sayfayı yenileyip sunucu erişimini doğrulayın. |

## İşlemden Önce

- Eksik bir özelliği araştırmadan önce lisans durumunu, planı, bitiş tarihini, kapasiteyi ve açık modülleri doğrulayın.
- Lisans değişiminden önce Sahip hesabıyla oturum açabildiğinizi ve yedek dışa aktarma yolunun erişilebilir olduğunu doğrulayın.
- Lisans kodlarını, imzalı lisans içeriğini ve müşteriye ait kullanım haklarını herkese açık destek kanallarından uzak tutun.
- Kurumdaki değişiklik onay sahibini ve etkilenen paydaşları belirleyin; yeni kodun hazır olduğunu doğrulayın.
- Değişiklikten sonra yalnız rozetin rengini değil, yazma durumunu ve plan yeteneklerini de yeniden kontrol edin.

## Güvenli Kanıt

- Paylaşılabilir: lisans durumu, genel plan grubu, süre penceresi, açık özellik kategorisi ve hassas ayrıntıları çıkarılmış hata kodu.
- Gizli kalmalı: lisans kodu, imzalı lisans içeriği, lisansı düzenleyen tarafa ait özel imza materyali, müşteriye ait kullanım hakları ve müşteri adını gösteren ekran görüntüleri.
- Lisans kodu doğrulanamıyorsa, kapasite satın alınan değerle uyuşmuyorsa veya kurtarma erişimi belirsizse özel destek kullanın.
- Ekran görüntüsü gerekiyorsa müşteri adı ve e-posta alanlarını tamamen maskeleyin; yalnız kırpmak yeterli değildir.

## Ne Zaman Durmalı ve Destek İstemelisiniz

Lisans kodu doğrulanamıyorsa, etkinleştirme sonrası lisans başka bir müşteriyi gösteriyorsa, kapasite satın alınan değerle uyuşmuyorsa veya salt okunur durumda kurtarma erişimi belirsizse değişiklik yapmayı bırakın. Lisans kodunu ya da imzalı içeriği göndermeden görünür durumu, hassas ayrıntıları çıkarılmış hata kodunu, genel plan grubunu ve süre penceresini içeren özel destek kaydı açın.

## Operatör Notları

Lisans kodu, özel lisans materyali, imzalı lisans içeriği veya müşteriye ait kullanım haklarını gösteren ekran görüntüsü yayınlamayın.

## İlgili

- [Lisans yaşam döngüsü](license-lifecycle.md)
- [Lisans salt okunur mod rehberi](../../kb/tr/license-read-only.md)
- [İlk kurulum, Sahip kullanıcı ve lisans](first-run-owner-license.md)
