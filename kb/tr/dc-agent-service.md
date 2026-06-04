# DC Agent servis sorunları

PassMan DC Agent Service kurulamıyor, bağlanamıyor, sync yapamıyor veya toparlanamıyorsa bunu kullanın.

## Servis kimliği

```text
Service name: PassManDCAgent
Display name: PassMan DC Agent Service
```

## Komutlar

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -Status
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -TailLog
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -RepairService
```

## Kontroller

- PassMan URL, domain tarafındaki makineden erişilebilir olmalı.
- Bind username `DOMAIN\username` veya `username@domain.local` formatında olmalı.
- Local loglar token, password ve secret-like değerleri redacted göstermeli.
- Repair mode servis wrapper'ını credential yazdırmadan yeniden kurmalı.

## Kurulum veya repair sırasında 401 Unauthorized

Endpoint erişilebilir olduğu halde script `Directory agent authorization failed` yazıyorsa bunu AD bind hatası değil, PassMan ajan yetkilendirme hatası olarak ele alın. PassMan 1.8.19 veya daha yeni sürüme geçin, mevcut provider kartından token yenileyin ve gösterilen repair komutunu tekrar çalıştırın.

Hata devam ederse PassMan server logunda redakte edilmiş sebebi kontrol edin:

- `provider_not_found`: agent id mevcut provider ile eşleşmiyor.
- `token_revoked`: provider tokenı iptal edilmiş.
- `token_missing`: provider üzerinde aktif token hash yok.
- `token_mismatch`: komut eski veya yanlış token kullanıyor.

Gerçek `pma_` agent id veya `pmt_` token değerini public support kanalına yapıştırmayın. Placeholder kullanın ve token ifşa olduysa yenileyin.
