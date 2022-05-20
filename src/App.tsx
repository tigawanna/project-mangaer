import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Project } from './components/Projects/Project';
import { Home } from './components/Home/Home';
import { useAuthUser } from '@react-query-firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { Login } from './components/auth/Login';
import { ProtectedRoute } from './components/auth/PrivateRoutes';

function App() {

const query = useAuthUser("user", auth); 
console.log("user present query   ====  ",query.data)  
const user = query.data
if(query.isFetching){
  return <div className='w-full h-full flex-center '>Loading ....</div>
}

  return (
    <div className="h-screen w-screen overflow-x-hidden ">
      <BrowserRouter>

      <div className="fixed top-[0px] right-1 w-full z-30">
      <Toolbar user={user}/>
      </div>
      <div className="w-full h-full mt-16 ">
      <Routes>
        
          <Route path="/" element={
          <ProtectedRoute user={user}><Home /></ProtectedRoute>
          } />
         
          <Route path="/project" element={
          <ProtectedRoute user={user}><Project /></ProtectedRoute>
          } />
          {/* @ts-ignore */}
        <Route path="/login" element={<Login user={user}/>} />
       </Routes> 
      </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
