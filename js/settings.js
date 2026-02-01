import { getAuth, sendEmailVerification, sendPasswordResetEmail, signOut } from "firebase/auth";

const auth = getAuth();

function toggleMenu(id) {
  const menu = document.getElementById(id);
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function goBack() {
  window.history.back();
}

function goProfile() {
  window.location.href = "profile.html";
}

function changeUsername() {
  alert("Kullanıcı adı değiştirme yakında 👀");
}

function changeEmail() {
  alert("E-posta değiştirme yakında 👀");
}

function resetPassword() {
  const user = auth.currentUser;
  if (!user) {
    alert("Misafir kullanıcı şifre sıfırlayamaz");
    return;
  }

  sendPasswordResetEmail(auth, user.email)
    .then(() => alert("Şifre sıfırlama maili gönderildi"))
    .catch(err => alert(err.message));
}

function verifyEmail() {
  const user = auth.currentUser;
  if (!user) {
    alert("Misafir kullanıcı doğrulama yapamaz");
    return;
  }

  sendEmailVerification(user)
    .then(() => alert("Doğrulama e-postası gönderildi"))
    .catch(err => alert(err.message));
}

function logout() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}

function goLogin() {
  window.location.href = "login.html";
}
