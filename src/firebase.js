import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxeA69PTNmlZSaLlVYfcIIO_gcE-J5iIc",
  authDomain: "portafolio-digital-18ddd.firebaseapp.com",
  projectId: "portafolio-digital-18ddd",
  storageBucket: "portafolio-digital-18ddd.firebasestorage.app",
  messagingSenderId: "273012525078",
  appId: "1:273012525078:web:4622451b4c9ab70fd00d37",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
