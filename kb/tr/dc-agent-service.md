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
