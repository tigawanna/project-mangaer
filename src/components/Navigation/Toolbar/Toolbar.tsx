import React from 'react'
import { GrHome } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import { Link} from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { useAuthSignOut} from '@react-query-firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { User } from 'firebase/auth';
import { useQueryClient } from 'react-query';
import { Consent } from '../../Modal/Consent';
import { useState } from 'react';

interface ToolbarProps {
user?:User|null
}

export const Toolbar: React.FC<ToolbarProps> = ({user}) => {
const [open, setOpen] = useState(false)

const queryClient = useQueryClient()   
const mutation = useAuthSignOut(auth,{
   onSuccess: () => {  queryClient.invalidateQueries('user')  },
   });


const image =user?.photoURL;


return (
 <div className='w-[100%] bg-slate-500 h-16 max-h-16'>
<IconContext.Provider value={{ size: "25px", className: "table-edit-icons" }} >

{open?<Consent setOpen={setOpen} message={"Sign Out?"} action={mutation.mutate}/>:null}

 <div className='flex flex-grow flex-3 text-lg font-bold'>
     <div className='m-1 w-full p-3 bg-slate-400 flex-center'>
     <Link to="/"><GrHome /></Link>
     </div>
     {/* <div className='m-1 w-full p-3 bg-slate-600 flex-center'>
     <Link to="/project">Project</Link>
     </div> */}
      <div className='m-1 w-full p-3 bg-slate-300 flex-center'>
     <Link to="/payments">Payments</Link>
     </div>
     <div className='m-1 w-full p-3 bg-slate-300 flex-center'>
     <Link to="/shops">Shops</Link>
     </div>

     <div 
      onClick={()=>setOpen(true)}
     className='m-1   border-slate-900 border-2 rounded-md hover:bg-slate-700 flex-center'>
      {!user?<FaUserCircle />
       :<img  
    //   @ts-ignore 
       src={image} 
       alt={''}
       className="rounded-md h-full max-h-[50px] min-w-[40px] w-full"
       />}
     </div>

</div>   
</IconContext.Provider>
 </div>
);
}
