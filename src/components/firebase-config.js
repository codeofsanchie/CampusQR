import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrcIuSbGIUpJtRonIGKngQB5sbB2UGlfQ",
  authDomain: "campusqr-559ab.firebaseapp.com",
  projectId: "campusqr-559ab",
  storageBucket: "campusqr-559ab.appspot.com",
  messagingSenderId: "780996651027",
  appId: "1:780996651027:web:fd3e4b851d88721f5cf7e6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
