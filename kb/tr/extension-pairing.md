# Extension eşleşmesi pending kalıyor

Chromium extension kurulu ama PassMan paneli cihazı onaylamıyor veya sync başlamıyorsa bunu kullanın.

## Kontroller

1. Extension server origin değeri PassMan host ve scheme ile eşleşmeli.
2. Pairing code süresi dolduysa eşleştirmeyi yeniden başlatın.
3. Extension içindeki username PassMan hesabıyla eşleşmeli.
4. PassMan web UI içinde en az bir kasa açık olmalı.
5. Cihaz PassMan Extension ekranından onaylanmalı.
6. Eski veya duplicate cihazları revoke edip yeniden deneyin.

## Güvenlik

Extension, pairing material değerlerini Chromium profilinde PIN ile sarmalar. Plaintext secret değerleri persistent browser storage içinde tutulmamalıdır.
