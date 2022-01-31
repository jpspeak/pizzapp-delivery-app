import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_Mp-qp4NriF-x53P1Dvhi4APvB0tKvTw",
  authDomain: "pizzapp-b8f65.firebaseapp.com",
  projectId: "pizzapp-b8f65",
  storageBucket: "pizzapp-b8f65.appspot.com",
  messagingSenderId: "783574231334",
  appId: "1:783574231334:web:680bdb83f38030b6ceb9e7"
};

const app = initializeApp(firebaseConfig);

export const twitterProvider = new TwitterAuthProvider();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
