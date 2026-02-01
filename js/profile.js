import { auth, db } from "./firebase.js";
import {
  sendEmailVerification,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  ref,
  get,
  update
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔐 Giriş kontrolü + bilgileri çek
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    location.href = "index.html";
    return;
  }

  document.getElementById("email").textContent = user.email;
  document.getElementById("verifyStatus").textContent =
    user.emailVerified ? "E-posta doğrulandı ✅" : "E-posta doğrulanmadı ❌";

  const snap = await get(ref(db, "users/" + user.uid));
  if (snap.exists()) {
    const data = snap.val();
    document.getElementById("phone").textContent = data.phone || "-";
    document.getElementById("usernameText").textContent = data.username || "-";
  }
});

// 🧭 Menü geçişi
window.showSection = function (id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

// 📧 Doğrulama
window.sendVerify = function () {
  sendEmailVerification(auth.currentUser)
    .then(() => alert("Doğrulama maili gönderildi"));
};

// 🔑 Şifre sıfırlama
window.resetPassword = function () {
  sendPasswordResetEmail(auth, auth.currentUser.email)
    .then(() => alert("Şifre sıfırlama maili gönderildi"));
};

// 👤 Kullanıcı adı değiştir
window.changeUsername = async function () {
  const newU = document.getElementById("newUsername").value.trim();
  const err = document.getElementById("userError");

  err.textContent = "";
  if (!newU) {
    err.textContent = "Kullanıcı adı boş olamaz";
    return;
  }

  await update(ref(db, "users/" + auth.currentUser.uid), {
    username: newU
  });

  document.getElementById("usernameText").textContent = newU;
  alert("Kullanıcı adı güncellendi");
};

window.goHome = () => {
  location.href = "home.html";
};
