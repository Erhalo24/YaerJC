import { getAuth, sendEmailVerification, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

// --- MENÜ AÇMA/KAPAMA MANTIĞI (CSS ANIMASYONU İLE UYUMLU) ---
document.querySelectorAll('.settings-header').forEach(header => {
    header.addEventListener('click', () => {
        const parentItem = header.parentElement; // .settings-item
        
        // 1. Diğer tüm açık menüleri kapat (Akordeon efekti)
        document.querySelectorAll('.settings-item').forEach(item => {
            if (item !== parentItem) {
                item.classList.remove('open');
            }
        });

        // 2. Tıklanan menüyü aç veya kapat
        parentItem.classList.toggle('open');
    });
});

// --- BUTON OLAY DİNLEYİCİLERİ ---

// Geri Butonu
document.getElementById('btnBack')?.addEventListener('click', () => {
    window.history.back();
});

// Profil Butonları
document.getElementById('btnProfile')?.addEventListener('click', (e) => {
    e.stopPropagation(); // Menünün kapanmasını engellemek için
    window.location.href = "profile.html";
});

document.getElementById('btnUsername')?.addEventListener('click', (e) => {
    e.stopPropagation();
    alert("Kullanıcı adı değiştirme yakında 👀");
});

document.getElementById('btnEmail')?.addEventListener('click', (e) => {
    e.stopPropagation();
    alert("E-posta değiştirme yakında 👀");
});

// Güvenlik Butonları
document.getElementById('btnResetPassword')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const user = auth.currentUser;
    if (!user) {
        alert("Misafir kullanıcı şifre sıfırlayamaz. Lütfen giriş yapın.");
        return;
    }
    
    sendPasswordResetEmail(auth, user.email)
        .then(() => alert("Şifre sıfırlama maili e-posta adresinize gönderildi!"))
        .catch(err => alert("Hata: " + err.message));
});

document.getElementById('btnVerifyEmail')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const user = auth.currentUser;
    if (!user) {
        alert("Misafir kullanıcı doğrulama yapamaz.");
        return;
    }

    sendEmailVerification(user)
        .then(() => alert("Doğrulama e-postası gönderildi. Lütfen kutunuzu kontrol edin."))
        .catch(err => alert("Hata: " + err.message));
});

// Hesap Butonları
document.getElementById('btnLogout')?.addEventListener('click', (e) => {
    e.stopPropagation();
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch(err => console.error("Çıkış hatası:", err));
});

document.getElementById('btnLogin')?.addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = "login.html";
});
