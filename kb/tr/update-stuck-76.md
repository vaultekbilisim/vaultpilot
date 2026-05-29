# Güncelleme yüzde 76 civarında kalıyor

Yüzde 76 aşaması genellikle PassMan'ın MSI doğrulamasını bitirdiği ve sessiz Windows Installer akışına geçtiği aşamadır. Servis bu sırada yeniden başlayabilir.

## Kontroller

1. Servis yeniden başlama penceresinin bitmesini bekleyin.
2. PassMan'ı tekrar açıp çalışan versiyonu kontrol edin.
3. Update Center içindeki job detayını inceleyin.
4. Durum uzlaşmıyorsa verbose MSI loglarını kontrol edin.
5. Latest release manifest'inin beklenen MSI ve SHA-256 değerine işaret ettiğini doğrulayın.

## Not

PassMan-managed update; manifest imzası, SHA-256, dosya metadata ve signer thumbprint doğrular. Local signer yalnızca signed manifest tarafından pin'lenmişse kabul edilir.
