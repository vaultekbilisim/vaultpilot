# HTTPS sertifika uyarısı

HTTPS etkinleştiğinde kullanıcılar tarayıcı uyarısı görüyorsa bunu kullanın.

## Kontroller

1. Kullanıcıların açtığı host adı sertifika SAN içinde yer almalı.
2. PFX/P12 paketi PassMan servisi tarafından okunabilir olmalı.
3. Yapılandırılan port açık olmalı.
4. Sertifika süresi dolmamış olmalı.
5. Private sertifika materyali doküman, log veya ticket içine konmamalı.

## Support için önerilen veri

- Public host adı.
- Port.
- Sertifika subject/SAN özeti.
- Son geçerlilik tarihi.
- Tarayıcı hata kodu.
