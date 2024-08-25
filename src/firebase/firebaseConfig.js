import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCVqe-vDXESi4e7cXBaOO0kFGdk37ZgG9g",
  authDomain: "store-4cccf.firebaseapp.com",
  projectId: "store-4cccf",
  storageBucket: "store-4cccf.appspot.com",
  messagingSenderId: "568795641796",
  appId: "1:568795641796:web:286fb30c1b9f753fbb9691",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
