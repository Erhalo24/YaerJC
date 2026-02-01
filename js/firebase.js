// Firebase CDN (HTML + JS için)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Senin Firebase ayarların
const firebaseConfig = {
  apiKey: "AIzaSyAEiFzZQVh7wen6Nj1A9E2LVEw8AigYP98",
  authDomain: "yearjc-c8d92.firebaseapp.com",
  projectId: "yearjc-c8d92",
  storageBucket: "yearjc-c8d92.firebasestorage.app",
  messagingSenderId: "687622359865",
  appId: "1:687622359865:web:f6982f83d7f7e1071436e8",
  measurementId: "G-PXMRKFXP4Z"
};

// Firebase başlat
export const app = initializeApp(firebaseConfig);

// Servisler
export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);
