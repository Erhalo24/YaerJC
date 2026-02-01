import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 📧 E-posta + Şifre ile giriş
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = ""; // eski hatayı temizle

  if (!email || !password) {
    errorMsg.textContent = "E-posta ve şifre boş olamaz";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(() => {
      // 🔴 Firebase yanlışsa buraya düşer
      errorMsg.textContent = "E-posta veya şifreniz yanlış";
    });
};

// 🔥 Google ile giriş
window.googleLogin = function () {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(() => {
      const errorMsg = document.getElementById("errorMsg");
      errorMsg.textContent = "Google ile giriş başarısız";
    });
};
