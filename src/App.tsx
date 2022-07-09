import React from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import { BrowserRouter} from "react-router-dom";
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar";
import '../node_modules/table-for-react/dist/tailwind.css'

import { Home } from "./components/Home/Home";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { Login } from "./components/auth/Login";
import { ProtectedRoute } from "./components/auth/PrivateRoutes";
import { Project } from './components/Projects/Project';
import {Shops} from "./components/Shops/Shops";
import { Shop } from "./components/shop/Shop";
import { Payment } from "./components/Payments/Payment";
import { PrintPreview } from './components/Print/PrintPreview';


function App() {
  const query = useAuthUser("user", auth);
  // console.log("user present query   ====  ", query.data);
  const dummy_user={
    "uid": "QzeS3kr8aLJ7gskbpQvSL1TWCLUN",
    "email": "grass.peach.739@example.com",
    "emailVerified": true,
    "displayName": "Grass Peach",
    "isAnonymous": false,
    "photoURL": "https://picsum.photos/id/433/100/100",
    "providerData": [
        {
            "providerId": "google.com",
            "uid": "1124461558434315010083819269750700415015",
            "displayName": "Grass Peach",
            "email": "grass.peach.739@example.com",
            "phoneNumber": null,
            "photoURL": "\"https://picsum.photos/id/433/100/100\""
        }
    ],
    "stsTokenManager": {
        "refreshToken": "eyJfQXV0aEVtdWxhdG9yUmVmcmVzaFRva2VuIjoiRE8gTk9UIE1PRElGWSIsImxvY2FsSWQiOiJRemVTM2tyOGFMSjdnc2ticFF2U0wxVFdDTFVOIiwicHJvdmlkZXIiOiJnb29nbGUuY29tIiwiZXh0cmFDbGFpbXMiOnt9LCJwcm9qZWN0SWQiOiJuZXRuaW5qYXByb2plY3RzIn0=",
        "accessToken": "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiR3Jhc3MgUGVhY2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9waWNzdW0ucGhvdG9zL2lkLzQzMy8xMDAvMTAwIiwiZW1haWwiOiJncmFzcy5wZWFjaC43MzlAZXhhbXBsZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXV0aF90aW1lIjoxNjU3Mzg5MDY2LCJ1c2VyX2lkIjoiUXplUzNrcjhhTEo3Z3NrYnBRdlNMMVRXQ0xVTiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ3Jhc3MucGVhY2guNzM5QGV4YW1wbGUuY29tIl0sImdvb2dsZS5jb20iOlsiMTEyNDQ2MTU1ODQzNDMxNTAxMDA4MzgxOTI2OTc1MDcwMDQxNTAxNSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifSwiaWF0IjoxNjU3MzkzNDQwLCJleHAiOjE2NTczOTcwNDAsImF1ZCI6Im5ldG5pbmphcHJvamVjdHMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmV0bmluamFwcm9qZWN0cyIsInN1YiI6IlF6ZVMza3I4YUxKN2dza2JwUXZTTDFUV0NMVU4ifQ.",
        "expirationTime": 1657397041076
    },
    "createdAt": "1657386807388",
    "lastLoginAt": "1657389066466",
    "apiKey": "AIzaSyAfscLOXmlCazzFVH9TbJsk4QWKplg9b20",
    "appName": "[DEFAULT]"
  }


  const user = query.data;
  if (query.isFetching) {
    return <div className="w-full h-full flex-center ">Loading ....</div>;
  }

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <BrowserRouter>
        <div className="fixed top-[0px] w-[100%] z-50">
          <Toolbar user={user} />
        </div>
        <div className="w-full h-full mt-16 ">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Home user={user}/>
                </ProtectedRoute>
              }
            />
        

            <Route
              path="/project"
              element={
    
                  <Project user={user}/>

              }
            />

          <Route
              path="/shops"
              element={
                <ProtectedRoute user={user}>
                  <Shops user={user}/>
                </ProtectedRoute>
              }
            />

          <Route
              path="/shop"
              element={
                <ProtectedRoute user={user}>
                  <Shop user={user} floor={'ground'} shopId={'G-01'} />
                </ProtectedRoute>
              }
            /> 
            <Route
              path="/payments"
              element={
                <ProtectedRoute user={user}>
                  <Payment user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/print-preview" element={<PrintPreview user={user}/>}
            />
            {/* @ts-ignore */}
            <Route path="/login" element={<Login user={user} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
