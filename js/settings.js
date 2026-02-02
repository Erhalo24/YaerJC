// 1. Firebase modüllerini import et
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, sendEmailVerification, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyASKGbu8lQqSHXPkY8PoulLC9f4SR3SYiw",
  authDomain: "code-group-3b6e8.firebaseapp.com",
  projectId: "code-group-3b6e8",
  storageBucket: "code-group-3b6e8.firebasestorage.app",
  messagingSenderId: "197761010794",
  appId: "1:197761010794:web:9d781c891cfd0de1264e13",
  measurementId: "G-5NM5Z1JLR7"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// HTML yüklendikten sonra çalışsın
document.addEventListener("DOMContentLoaded", () => {

  // MENÜ AÇ KAPA
  const headers = document.querySelectorAll(".settings-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const parentItem = header.parentElement;

      document.querySelectorAll(".settings-item").forEach(item => {
        if (item !== parentItem) item.classList.remove("open");
      });

      parentItem.classList.toggle("open");
    });
  });

  // GERİ BUTONU
  const btnBack = document.getElementById("btnBack");
  if (btnBack) btnBack.onclick = () => window.history.back();

  // PROFİL
  document.getElementById("btnProfile")?.addEventListener("click", e => {
    e.stopPropagation();
    window.location.href = "profile.html";
  });

  // ŞİFRE SIFIRLA
  document.getElementById("btnResetPassword")?.addEventListener("click", e => {
    e.stopPropagation();
    const user = auth.currentUser;
    if (!user) return alert("Önce giriş yap");

    sendPasswordResetEmail(auth, user.email)
      .then(() => alert("Şifre sıfırlama maili gönderildi"))
      .catch(err => alert("Hata " + err.message));
  });

  // ÇIKIŞ
  document.getElementById("btnLogout")?.addEventListener("click", e => {
    e.stopPropagation();
    signOut(auth)
      .then(() => window.location.href = "index.html")
      .catch(err => alert("Çıkış yapılamadı " + err.message));
  });

  // GİRİŞ
  document.getElementById("btnLogin")?.addEventListener("click", e => {
    e.stopPropagation();
    window.location.href = "login.html";
  });

  // YAKINDA
  ["btnUsername", "btnEmail", "btnVerifyEmail"].forEach(id => {
    document.getElementById(id)?.addEventListener("click", e => {
      e.stopPropagation();
      alert("Bu özellik yakında aktif");
    });
  });

});
