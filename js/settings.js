// 1. Firebase modüllerini import et
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, sendEmailVerification, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// !!! BURASI ÖNEMLİ: Firebase Config bilgini buraya eklemelisin !!!
// Eğer firebase-config.js gibi ayrı bir dosyan varsa oradan import et.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Tüm kodun HTML yüklendikten sonra çalışmasını sağla
document.addEventListener('DOMContentLoaded', () => {

    // --- MENÜ AÇMA/KAPAMA ---
    const headers = document.querySelectorAll('.settings-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const parentItem = header.parentElement;
            
            document.querySelectorAll('.settings-item').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('open');
                }
            });
            parentItem.classList.toggle('open');
        });
    });

    // --- BUTON TIKLAMALARI (KESİN ÇÖZÜM) ---

    // Geri Butonu
    const btnBack = document.getElementById('btnBack');
    if(btnBack) btnBack.onclick = () => window.history.back();

    // Profil Sayfası
    document.getElementById('btnProfile')?.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = "profile.html";
    });

    // Şifre Sıfırla
    document.getElementById('btnResetPassword')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const user = auth.currentUser;
        if (!user) return alert("Lütfen önce giriş yapın.");
        
        sendPasswordResetEmail(auth, user.email)
            .then(() => alert("Şifre sıfırlama maili gönderildi!"))
            .catch(err => alert("Hata: " + err.message));
    });

    // Çıkış Yap
    document.getElementById('btnLogout')?.addEventListener('click', (e) => {
        e.stopPropagation();
        signOut(auth).then(() => {
            window.location.href = "index.html";
        }).catch(err => alert("Çıkış yapılamadı: " + err.message));
    });

    // Giriş Yap
    document.getElementById('btnLogin')?.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = "login.html";
    });

    // Yakında Gelecekler İçin Toplu Atama
    ['btnUsername', 'btnEmail', 'btnVerifyEmail'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', (e) => {
            e.stopPropagation();
            alert("Bu özellik yakında aktif edilecek! 👀");
        });
    });

});
