import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvZj0K2Limrdls9VMl5remuwZC21-nW-c",
  authDomain: "quickeats-d66f5.firebaseapp.com",
  projectId: "quickeats-d66f5",
  storageBucket: "quickeats-d66f5.firebasestorage.app",
  messagingSenderId: "554480994956",
  appId: "1:554480994956:web:6d5e35c1debc137d2f49a9",
  measurementId: "G-B081K06WVZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);