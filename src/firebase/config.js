// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVYM0yxxwUNlENawbyXHKj7MvD9NLFM",
  authDomain: "lattelab-u4-1b17f.firebaseapp.com",
  projectId: "lattelab-u4-1b17f",
  storageBucket: "lattelab-u4-1b17f.appspot.com",
  messagingSenderId: "178387692424",
  appId: "1:178387692424:web:30378569afc56918a945"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Firestore para usarlo en todo tu proyecto
export const db = getFirestore(app);