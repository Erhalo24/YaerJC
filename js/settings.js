import { getAuth, sendEmailVerification, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// Not: Firebase import yolunu kendi projenin versiyonuna göre kontrol etmeyi unutma!

const auth = getAuth();

// --- MENÜ AÇMA/KAPAMA MANTIĞI ---
document.querySelectorAll('.settings-item').forEach(item => {
    item.addEventListener('click', () => {
        const menuId = item.getAttribute('data-menu');
        const menu = document.getElementById(menuId);
        
        // Diğer tüm submenüleri kapat (isteğe bağlı, daha temiz görünür)
        document.querySelectorAll('.submenu').forEach(s => {
            if(s !== menu) s.style.display = "none";
        });

        // Tıklananı aç/kapat
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });
});

// --- BUTON OLAY DİNLEYİCİLERİ ---
// Geri Butonu
document.getElementById('btnBack')?.addEventListener('click', () => window.history.back());

// Profil Butonları
document.getElementById('btnProfile')?.addEventListener('click', () => window.location.href = "profile.html");
document.getElementById('btnUsername')?.addEventListener('click', () => alert("Kullanıcı adı değiştirme yakında 👀"));
document.getElementById('btnEmail')?.addEventListener('click', () => alert("E-posta değiştirme yakında 👀"));

// Güvenlik Butonları
document.getElementById('btnResetPassword')?.addEventListener('click', () => {
    const user = auth.currentUser;
    if (!user) return alert("Misafir kullanıcı şifre sıfırlayamaz");
    
    sendPasswordResetEmail(auth, user.email)
        .then(() => alert("Şifre sıfırlama maili gönderildi"))
        .catch(err => alert(err.message));
});

document.getElementById('btnVerifyEmail')?.addEventListener('click', () => {
    const user = auth.currentUser;
    if (!user) return alert("Misafir kullanıcı doğrulama yapamaz");

    sendEmailVerification(user)
        .then(() => alert("Doğrulama e-postası gönderildi"))
        .catch(err => alert(err.message));
});

// Hesap Butonları
document.getElementById('btnLogout')?.addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = "index.html");
});

document.getElementById('btnLogin')?.addEventListener('click', () => {
    window.location.href = "login.html";
});
