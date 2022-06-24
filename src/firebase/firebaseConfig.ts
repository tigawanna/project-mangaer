
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth} from "firebase/auth";

import { connectAuthEmulator } from "firebase/auth";
import {connectFirestoreEmulator} from "firebase/firestore"
import { connectFunctionsEmulator } from "firebase/functions";

import { getFunctions} from "firebase/functions";
import { getApp } from "firebase/app";


export const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
}


const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const db = getFirestore();
export const auth = getAuth(app)
export const functions = getFunctions(getApp());

// connectFunctionsEmulator(functions, "localhost", 5001);
// connectFirestoreEmulator(db, '192.168.43.238', 8080);
// connectAuthEmulator(auth, "http://192.168.43.238:9099");


connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, "http://localhost:9099");
connectFunctionsEmulator(functions, "localhost", 5001);




