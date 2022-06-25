import React from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import { BrowserRouter} from "react-router-dom";
import { Toolbar } from "./components/Toolbar/Toolbar";

import { Home } from "./components/Home/Home";
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { Login } from "./components/auth/Login";
import { ProtectedRoute } from "./components/auth/PrivateRoutes";
import { Project } from './components/Projects/Project';
import {Shops} from "./components/Shops/Shops";
import { ShopForm } from "./components/Shops/ShopForm/ShopForm";


function App() {
  const query = useAuthUser("user", auth);
  console.log("user present query   ====  ", query.data);
  const user = query.data;
  if (query.isFetching) {
    return <div className="w-full h-full flex-center ">Loading ....</div>;
  }

  return (
    <div className="h-screen w-screen overflow-x-hidden ">
      <BrowserRouter>
        <div className="fixed top-[0px] right-1 w-full z-30">
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
                <ProtectedRoute user={user}>
                  <Project user={user}/>
                </ProtectedRoute>
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

          {/* <Route
              path="/test"
              element={
                <ProtectedRoute user={user}>
                  <ShopForm user={user} floor={"ground"}/>
                </ProtectedRoute>
              }
            /> */}

            {/* @ts-ignore */}
            <Route path="/login" element={<Login user={user} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
