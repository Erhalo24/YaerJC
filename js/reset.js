import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.resetPassword = async function () {
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg");

  msg.style.color = "red";
  msg.textContent = "";

  if (!email) {
    msg.textContent = "E-posta girmen gerekiyor.";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    msg.style.color = "lime";
    msg.textContent = "Şifre sıfırlama maili gönderildi ✔️";
  } catch (error) {
    msg.textContent = "Bu e-posta kayıtlı değil veya hatalı.";
  }
};
