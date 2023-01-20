import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBYH1iCNAuxfH37PREMPR2OC8RedrW1FKE",
  authDomain: "shopzilla-9de50.firebaseapp.com",
  projectId: "shopzilla-9de50",
  storageBucket: "shopzilla-9de50.appspot.com",
  messagingSenderId: "1024547675634",
  appId: "1:1024547675634:web:20c2f5afa45f99f27f9f6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
