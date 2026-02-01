/* =======================
   FIREBASE IMPORT + INIT
======================= */
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getDatabase, ref, get, set } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEiFzZQVh7wen6Nj1A9E2LVEw8AigYP98",
  authDomain: "yearjc-c8d92.firebaseapp.com",
  projectId: "yearjc-c8d92",
  storageBucket: "yearjc-c8d92.firebasestorage.app",
  messagingSenderId: "687622359865",
  appId: "1:687622359865:web:f6982f83d7f7e1071436e8"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

/* =======================
   SOHBET DEĞİŞKENLERİ
======================= */
let chats = [];
let currentChatId = null;

let waitingForAnswer = false;
let lastQuestion = "";

/* =======================
   SIDEBAR
======================= */
function toggleSidebar() {
  document.getElementById("sidebar")?.classList.toggle("open");
  document.getElementById("overlay")?.classList.toggle("show");
}

/* =======================
   YÖNLENDİRME
======================= */
function goProfile() {
  window.location.href = "profile.html";
}

function goSettings() {
  window.location.href = "settings.html";
}

/* =======================
   SOHBET YÖNETİMİ
======================= */
function newChat() {
  const id = Date.now();
  const name = "Sohbet " + (chats.length + 1);

  chats.push({
    id,
    name,
    messages: []
  });

  currentChatId = id;
  renderChatList();
  renderMessages();
}

function renderChatList() {
  const list = document.getElementById("chatList");
  if (!list) return;

  list.innerHTML = "";

  chats.forEach(chat => {
    const div = document.createElement("div");
    div.className = "chat-item";
    div.innerText = chat.name;
    div.onclick = () => openChat(chat.id);
    list.appendChild(div);
  });
}

function openChat(id) {
  currentChatId = id;
  renderMessages();
}

/* =======================
   MESAJ GÖNDERME (ÖNEMLİ)
======================= */
async function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text || !currentChatId) return;

  const chat = chats.find(c => c.id === currentChatId);

  // Kullanıcı mesajı
  chat.messages.push({ from: "user", text });
  input.value = "";
  renderMessages();

  // Öğretme modu
  if (waitingForAnswer) {
    await learnAnswer(text);

    chat.messages.push({
      from: "ai",
      text: "Tamam 👍 Bunu öğrendim."
    });

    renderMessages();
    return;
  }

  // AI cevabı
  const aiReply = await getAIAnswer(text);

  chat.messages.push({
    from: "ai",
    text: aiReply
  });

  renderMessages();
}

/* =======================
   MESAJLARI ÇİZ
======================= */
function renderMessages() {
  const box = document.getElementById("messages");
  if (!box || !currentChatId) return;

  box.innerHTML = "";

  const chat = chats.find(c => c.id === currentChatId);
  chat.messages.forEach(m => {
    const div = document.createElement("div");
    div.className = m.from === "user" ? "msg user" : "msg ai";
    div.innerText = m.text;
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
}

/* =======================
   YEARJC AI
======================= */
async function getAIAnswer(question) {
  const q = question.toLowerCase().trim();
  const snap = await get(ref(db, "knowledge/" + q));

  if (snap.exists()) {
    const answers = snap.val().answers;
    return answers[Math.floor(Math.random() * answers.length)];
  } else {
    waitingForAnswer = true;
    lastQuestion = q;
    return "Galiba bu sorunun cevabını bilmiyorum, öğretir misin?";
  }
}

async function learnAnswer(answerText) {
  if (!waitingForAnswer) return;

  const answers = answerText.split(",").map(a => a.trim());

  await set(ref(db, "knowledge/" + lastQuestion), {
    answers
  });

  waitingForAnswer = false;
  lastQuestion = "";
}

/* =======================
   EVENTLER
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }

  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") sendMessage();
    });
  }

  // Sayfa açılınca otomatik sohbet
  newChat();
});
