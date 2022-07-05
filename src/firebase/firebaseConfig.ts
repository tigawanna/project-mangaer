
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth} from "firebase/auth";

import { connectAuthEmulator } from "firebase/auth";
import {connectFirestoreEmulator} from "firebase/firestore"
import { connectFunctionsEmulator } from "firebase/functions";

import { getFunctions} from "firebase/functions";
import { getApp } from "firebase/app";


//USE THIS TO CHECK IF ENVS ARE ACCESSIBLE

// const fireConfig=[
//   `${process.env.REACT_APP_FIREBASE_API_KEY}`,
//   `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
//   `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
//   `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
//   `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
//   `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
//   `${process.env.REACT_APP_FIREBASE_APP_ID}`,
// ]
// console.log("project CONFIG is === ",fireConfig)

const firebaseConfig = {
  apiKey:`${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain:`${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  databaseURL:`${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
  projectId:`${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket:`${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId:`${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId:`${process.env.REACT_APP_FIREBASE_APP_ID}`
};


const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const db = getFirestore();
export const auth = getAuth(app)
export const functions = getFunctions(getApp());

//comment ou all the below code to run it on the live backend 

//for use on local network :type ipconfig into powershell and replace 192.168.0.105 
//with your  ipv4 one


// console.log("ipv4  ===== ",`${process.env.REACT_APP_IPV4}`)


// comment this out for locahost LAN use

const ipv4 =`192.168.43.238`
// const ipv4=`${process.env.REACT_APP_IPV4}` 
console.log("ipv4  in var ===== ",ipv4)
connectFunctionsEmulator(functions, "localhost", 5001);
connectFirestoreEmulator(db,ipv4, 8080);
connectAuthEmulator(auth, `http://${ipv4}:9099`);


//comment this out for localhost use

// connectFirestoreEmulator(db, 'localhost', 8080);
// connectAuthEmulator(auth, "http://localhost:9099");
// connectFunctionsEmulator(functions, "localhost", 5001);




