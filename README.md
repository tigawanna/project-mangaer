# `PROPERTY MANAGER`

## `Brief descrption`
### Simple property manager to input tenants and keep track of their payments 

made with 
- ### React with create-react-app

- ### Tailwindcss for styling

- ### react-query for state management and api calls
- ### Firebase for tha backend 


`Getting started`

clone the repo and npm install

- Create a firebase project :[firebase official docs](https://cloud.google.com/firestore/docs/client/get-firebase)

- add the firebaseConfig obect that looks something like this
```
const firebaseConfig = {
      apiKey: "apikeey..................",
      authDomain: "yurdomain.firebaseapp.com",
      databaseURL: "https://yourdomain-default-rtdb.firebaseio.com",
      projectId: "yourproect",
      storageBucket: "yourproect.appspot.com",
      messagingSenderId: "1234567890",
      appId: "6:4500000000-9999990222222"
    };

``` 
and add it to the .env file

```

 REACT_APP_FIREBASE_API_KEY=apikeey..................
 REACT_APP_FIREBASE_AUTH_DOMAIN=yurdomain.firebaseapp.com
 REACT_APP_FIREBASE_DATABASE_URL=https://yourdomain-default-rtdb.firebaseio.com
 REACT_APP_FIREBASE_PROJECT_ID=yourproject
 REACT_APP_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com
 REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1234567890
 REACT_APP_FIREBASE_APP_ID=1::4500000000-9999990222222


 REACT_APP_IPV4=192.168.43.238
```

> the ipv4 address can be found by running ipconfig in your terminal,
> i use it to test on other devices on the same local network.

`for the firebase setup`

your firebase config should look like this and work if all the .env variable were set right

```


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth} from "firebase/auth";

// import { connectAuthEmulator } from "firebase/auth";
// import {connectFirestoreEmulator} from "firebase/firestore"
// import { connectFunctionsEmulator } from "firebase/functions";

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
// const ipv4=`${process.env.REACT_APP_IPV4}` 

// comment this out for locahost LAN use

// connectFunctionsEmulator(functions, "localhost", 5001);
// connectFirestoreEmulator(db,ipv4, 8080);
// connectAuthEmulator(auth, `http://${ipv4}:9099`);


//comment this out for localhost use

// connectFirestoreEmulator(db, 'localhost', 8080);
// connectAuthEmulator(auth, "http://localhost:9099");
// connectFunctionsEmulator(functions, "localhost", 5001);

```

Testing is best done locally , and firebase emulator willhelp you in that 
[article link](https://dev.to/tigawanna/firebase-emulator-16l2)

after setting up comment out either of these

```
// connectFunctionsEmulator(functions, "localhost", 5001);
// connectFirestoreEmulator(db,ipv4, 8080);
// connectAuthEmulator(auth, `http://${ipv4}:9099`);


//comment this out for localhost use

// connectFirestoreEmulator(db, 'localhost', 8080);
// connectAuthEmulator(auth, "http://localhost:9099");
// connectFunctionsEmulator(functions, "localhost", 5001);

```

Change your firebase.json  to include the host variabble which is your ipv4 

```
{
  "functions": {
    "source": "functions"
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "emulators": {
    "auth": {
      "port": 9099,
      "host": "192.168.43.238"
    },
    "functions": {
      "port": 5001,
      "host": "192.168.43.238"
    },
    "firestore": {
      "port": 8080,
      "host": "192.168.43.238"
    },
    "ui": {
      "enabled": true
    }
  }
}

```
