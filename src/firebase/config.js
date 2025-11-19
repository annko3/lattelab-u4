

import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCM9Qxuu0rvnlBCNUahBwyXHKjMVb9NLFM",
  authDomain: "lattelab-u4-1b1f7.firebaseapp.com",
  projectId: "lattelab-u4-1b1f7",
  storageBucket: "lattelab-u4-1b1f7.firebasestorage.app",
  messagingSenderId: "783687292704",
  appId: "1:783687292704:web:b3c7b7859efc5e5918a945",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 