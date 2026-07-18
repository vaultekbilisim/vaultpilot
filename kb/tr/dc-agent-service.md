# DC Agent servis sorunları

VaultPilot DC Agent Service kurulamıyor, bağlanamıyor, sync yapamıyor veya toparlanamıyorsa bunu kullanın.

## Servis kimliği

```text
Service name: VaultPilotDCAgent
Display name: VaultPilot DC Agent Service
```

## Komutlar

```powershell
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -Status
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -TailLog
powershell -ExecutionPolicy Bypass -File .\vaultpilot-dc-agent.ps1 -RepairService -PromptAgentToken
```

## Kontroller

- VaultPilot URL, domain tarafındaki makineden erişilebilir olmalı.
- Bind username `DOMAIN\username` veya `username@domain.local` formatında olmalı.
- Local loglar token, password ve secret-like değerleri redacted göstermeli.
- Repair mode servis wrapper'ını credential yazdırmadan yeniden kurmalı.
- Kurulum ve onarım komutu erişim anahtarını içermemeli; yalnız `-PromptAgentToken` kullanmalı.

<a id="sync-works-actions-disabled"></a>

## Eşitleme Çalışıyor Ama İşlemler Kapalı

Başarılı eşitleme yalnız OU, grup ve kullanıcı meta verisinin alınabildiğini kanıtlar; hassas işlem yeteneğini veya ajan yükseltmesini kanıtlamaz. Hazırlanan VaultPilot 2.2.0 sürümündeki **Kilidi aç**, **Parola değişimi iste**, **Şimdi rastgele parola ata** ve **Hesabı kapat** işlemleri için aşağıdakilerin hepsi gerekir:

- sağlayıcı sağlığı `CONNECTED`;
- servis ve PowerShell çalışanı `ready`;
- her ikisinin de güncel paket sürümü `1.2.21` bildirmesi;
- ilgili ajan yeteneği;
- Sahip rolü, yazılabilir lisans ve çözümlenebilen USER hedefi;
- yerleşik veya bind hesabı olmayan hedef.

`1.2.20` öncesindeki ajanlar eşitleme yapabilir fakat kimliğe bağlı hassas işlemleri güvenli biçimde kapalı tutar. Güncel paket `1.2.21` sürümüdür; 1.2.20 kimlik sınırını korurken yapılandırma kurtarmasını, idempotent sonuç teslimini, belirsiz teslimatın denetimli incelemeye taşınmasını ve sınırlı tanılamayı güçlendirir. **Durum** çıktısında sürümü doğrulayın, sonra mevcut sağlayıcıda anahtarı yenileyip güncel betikle onarım yapın. İkinci sağlayıcı oluşturmayın. Kurulu sunucu hâlâ eski betiği indiriyorsa statik indirme dosyası ile önbelleği doğrulayın.

**Parola değişimi iste** yeni parola üretmez; yalnız sonraki girişte değişim bayrağını ayarlar. **Şimdi rastgele parola ata** AD parolasını hemen değiştirir. **Gizli değeri göster** ise yalnız kasada önceden şifreli bir değer varsa çalışır; ajan mevcut AD parolasını okuyamaz.

## Kurulum veya repair sırasında 401 Unauthorized

Endpoint erişilebilir olduğu halde script `Directory agent authorization failed` yazıyorsa bunu AD bind hatası değil, ajan yetkilendirme hatası olarak ele alın. VaultPilot 2.0.0 ve daha yeni sürümlerde yayınlanmış release veya içeride onaylanmış build kullanın. Eski compatibility kurulumlarında PassMan 1.8.19 veya daha yeni sürümü kullanın. Sonra mevcut provider kartından token yenileyin ve gösterilen repair komutunu tekrar çalıştırın.

Hata devam ederse VaultPilot server logunda redakte edilmiş sebebi kontrol edin:

- `provider_not_found`: agent id mevcut provider ile eşleşmiyor.
- `token_revoked`: provider tokenı iptal edilmiş.
- `token_missing`: provider üzerinde aktif token hash yok.
- `token_mismatch`: komut eski veya yanlış token kullanıyor.

Gerçek `pma_` agent id veya `pmt_` token değerini public support kanalına yapıştırmayın. Placeholder kullanın ve token ifşa olduysa yenileyin.

Erişim anahtarı yenilendiğinde eski değer hemen geçersiz olur. Yeni değeri komuta eklemeyin; ayrı kopyalayıp yalnız yerel gizli PowerShell istemine yapıştırın.

## İlgili

- [Active Directory ajanı](../../docs/tr/active-directory-agent.md)
- [Etki alanı dashboard'u](../../docs/tr/screen-domain-dashboard.md)
- [Active Directory kayıtları ekranı](../../docs/tr/screen-active-directory-records.md)
- [Public issue redaction](public-issue-redaction.md)
