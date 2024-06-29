import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALIfhBIwR3F7q6FDRx0OgKiRk7qOi29-4",
  authDomain: "olx-3226d.firebaseapp.com",
  projectId: "olx-3226d",
  storageBucket: "olx-3226d.appspot.com",
  messagingSenderId: "63086840376",
  appId: "1:63086840376:web:e16e6b80893ada46ef34cd",
  measurementId: "G-C3EF7ZX589",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
