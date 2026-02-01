import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

window.register = function () {
  const username = document.getElementById("username").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = "";

  // 🔴 Şifreler uyuşmuyor
  if (password !== password2) {
    errorMsg.textContent = "Şifreler uyuşmuyor";
    return;
  }

  if (!username || !phone || !email || !password) {
    errorMsg.textContent = "Tüm alanları doldur";
    return;
  }

  // 🔐 Firebase Auth kayıt
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      // 📦 Database’e kullanıcı bilgileri
      return set(ref(db, "users/" + uid), {
        username: username,
        phone: phone,
        email: email,
        createdAt: Date.now()
      });
    })
    .then(() => {
      window.location.href = "home.html";
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
    });
};
