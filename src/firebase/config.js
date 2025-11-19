// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCM9Qxuu0rvnlBCNUahBwyXHKjMVb9NLFM",
  authDomain: "lattelab-u4-1b1f7.firebaseapp.com",
  projectId: "lattelab-u4-1b1f7",
  storageBucket: "lattelab-u4-1b1f7.firebasestorage.app",
  messagingSenderId: "783687292704",
  appId: "1:783687292704:web:b3c7b7859efc5e5918a945"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Firestore para usarlo en todo tu proyecto
export const db = getFirestore(app);
export const auth = getAuth(app);