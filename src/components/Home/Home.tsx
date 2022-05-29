import { User} from 'firebase/auth';
import React,{useEffect}  from 'react'
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { auth, functions } from '../../firebase/firebaseConfig';
import { httpsCallable } from 'firebase/functions';



interface HomeProps {
user?:User|null
}




export const Home: React.FC<HomeProps> = () => {
  const googleLogin = httpsCallable(functions, 'redirect');


return (
 <div className='w-full min-h-full bg-slate-400 flex-center flex-col'>
<button
className='bg-slate-700 p-5 text-xl font-bold'
onClick={()=>{
  googleLogin()
  .then((result) => { console.log("response from calling google ==== ",result)})
  .catch((err) => { console.log("error calling google ==== ",err)})
  }}
>click</button>

 </div>
);


}
