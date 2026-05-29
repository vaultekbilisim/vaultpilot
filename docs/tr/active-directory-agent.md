# Active Directory ve PassMan DC Agent Service

PassMan DC Agent Service domain controller'a yakın bir Windows host üzerinde çalışır ve dizin metadata'sını PassMan'a senkronize eder. AD bind parolasını veya AD kullanıcı parolalarını PassMan'a göndermez.

![PassMan Active Directory sync tree](../../assets/screenshots/active-directory-sync-tree.png)

## Servis Kimliği

| Öğe | Değer |
| --- | --- |
| Servis adı | `PassManDCAgent` |
| Görünen ad | `PassMan DC Agent Service` |
| Config dosyası | `%ProgramData%\PassMan\ad-agent\passman-dc-agent.json` |
| Servis logu | `%ProgramData%\PassMan\ad-agent\passman-dc-agent-service.log` |
| Agent logu | `%ProgramData%\PassMan\ad-agent\passman-dc-agent.log` |

## Kayıt Akışı

1. PassMan'da Entegrasyonlar -> Active Directory ekranını açın.
2. Ajan kaydı oluşturun.
3. Release asset'lerinden veya UI üzerinden `passman-ad-agent.ps1` dosyasını indirin.
4. Ajan makinesinde Administrator PowerShell ile kurulum komutunu çalıştırın.

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -InstallService -PassManUrl "<PASSMAN_URL>" -AgentId "<AGENT_ID>" -AgentToken "<AGENT_TOKEN>"
```

Script şu bilgileri ister:

- Domain controller IP veya hostname.
- AD bind kullanıcı adı.
- Lokal terminal prompt'u üzerinden AD bind parolası.

Parola lokalde alınır, loglara yazılmaz ve PassMan'a post edilmez.

## Operasyon Komutları

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -Status
```

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -TailLog
```

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -RepairService
```

```powershell
powershell -ExecutionPolicy Bypass -File .\passman-ad-agent.ps1 -UninstallService
```

## PassMan'da Görünenler

Senkron sonrası Active Directory sekmesi şunları gösterir:

- Sağlayıcı durumu ve son senkron zamanı.
- Domain controller, domain, base DN ve ajan sürümü.
- Aramalı OU, grup ve kullanıcı ağacı.
- Login erişimi ve credential import için ayrı checkbox kapsamları.
- Seçili credential adayları için import aksiyonu.

## Sıkılaştırma Notları

- Bind kullanıcısı için `DOMAIN\username` veya `username@domain.local` tercih edin.
- Senkron ihtiyacını karşılayan en dar yetkili delegated hesabı kullanın.
- Ajanı DC'ye yakın, kontrollü bir Windows host üzerinde çalıştırın.
- Kurulum komutu güvenli olmayan bir kanala kopyalandıysa agent token'ı döndürün.
- Ajan makinesi yeniden kuruluyorsa kaydı PassMan UI üzerinden iptal edip yeniden oluşturun.

## Sorun Giderme

| Belirti | Aksiyon |
| --- | --- |
| Servis kurulmuyor | Administrator PowerShell kullanın ve servis logunu inceleyin. |
| Wrapper compile hatası | En güncel `passman-ad-agent.ps1` kullanın; repair akışı eski servisi durdurup wrapper'ı güvenli şekilde yeniden oluşturur. |
| PassMan URL erişilemiyor | Ajan makinesinden URL'yi test edin, firewall/DNS yolunu doğrulayın. |
| Senkron sıfır nesne gösteriyor | Bind hesap kapsamını ve base DN değerini kontrol edin. |
| Ajan bağlı ama ağaç bayat | Şimdi senkronize et aksiyonunu kullanın, sonra servis ve ajan loglarına bakın. |
