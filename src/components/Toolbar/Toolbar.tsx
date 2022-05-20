import React from 'react'
import { GrHome } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import { Link} from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { useAuthSignOut} from '@react-query-firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { User } from 'firebase/auth';
interface ToolbarProps {
user?:User|null
}

export const Toolbar: React.FC<ToolbarProps> = ({user}) => {
const mutation = useAuthSignOut(auth);
const userImg =user?.photoURL;
const image =userImg?userImg:'https://picsum.photos/id/237/100/100'
return (
 <div className='w-full bg-slate-500 h-16'>
<IconContext.Provider value={{ size: "25px", className: "table-edit-icons" }} >
 <div className='flex flex-grow flex-3'>
<div className='m-1 w-full p-3 bg-slate-800'>
     <Link to="/"><GrHome /></Link>
     </div>
     <div className='m-1 w-full p-3 bg-slate-600'>
     <Link to="/project">Project</Link>
     </div>
     <div className='m-1 w-fit p-3 bg-slate-700'>
      {!user?<FaUserCircle />
       :<img  
    //   @ts-ignore 
       src={image} 
       alt={'no'}
       onClick={()=>{mutation.mutate()}}
       className="rounded-[50%] h-full  w-[70px]"
       />}
     </div>

</div>   
</IconContext.Provider>
 </div>
);
}
