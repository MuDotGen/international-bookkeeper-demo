import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  } from "firebase/auth"
import { 
  getFirestore,
  query,
  where,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  onSnapshot,
  setDoc,
  Timestamp,
  orderBy
} from "firebase/firestore"

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "[YOUR_API_KEY]",
  authDomain: "[YOUR_AUTH_DOMAIN].firebaseapp.com",
  projectId: "international-bookkeeper",
  storageBucket: "[YOUR_STORAGE_BUCKET].appspot.com",
  messagingSenderId: "[YOUR_MESSAGING_SENDER_ID]",
  appId: "[YOUR_APP_ID]"
};

export const app = initializeApp(firebaseConfig);

// Make auth and firestore references
console.log("Get Auth begin")
const auth = getAuth()
console.log("Get Auth finished")
const db = getFirestore()
// update firestore settings
// db.settings({ timestampsInSnapshots: true });

export { 
  auth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  query,
  where,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  onSnapshot,
  setDoc,
  Timestamp,
  orderBy
}

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase