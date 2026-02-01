import { db } from "./firebase.js";
import { ref, get, push } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let count = 0;
const MAX = 10;

window.ask = async () => {
  if (count >= MAX) {
    document.getElementById("limit").textContent =
      "Misafir kullanıcı 10 soru sorabilir";
    return;
  }

  const q = document.getElementById("question").value.trim();
  if (!q) return;

  count++;

  const msgBox = document.getElementById("messages");
  msgBox.innerHTML += `<div class="user">${q}</div>`;

  const snap = await get(ref(db, "ai/" + q));
  if (snap.exists()) {
    msgBox.innerHTML += `<div class="bot">${snap.val()}</div>`;
  } else {
    msgBox.innerHTML += `<div class="bot">
      Galiba bu sorunun cevabını bilmiyorum, öğretir misin?
    </div>`;

    document.getElementById("question").onkeydown = async (e) => {
      if (e.key === "Enter") {
        await push(ref(db, "ai/" + q), e.target.value);
        e.target.value = "";
      }
    };
  }
};
