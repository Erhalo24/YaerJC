document.getElementById("loginBtn").onclick = () => {
  window.location.href = "login.html";
};

document.getElementById("registerBtn").onclick = () => {
  window.location.href = "register.html";
};

document.getElementById("guestBtn").onclick = () => {
  localStorage.setItem("guest", "true");
  window.location.href = "guesthome.html";
};

