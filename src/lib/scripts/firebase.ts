import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyAFpyQeEtKCgPL2oqbf2jgX9qkhplQjcVA",
  authDomain: "iki-log.firebaseapp.com",
  databaseURL: "https://iki-log-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iki-log",
  storageBucket: "iki-log.appspot.com",
  messagingSenderId: "884128984227",
  appId: "1:884128984227:web:04847bbee77f973a12e316"
}

export const app = initializeApp(config);
export const db = getDatabase(app);
export const auth = getAuth(app);