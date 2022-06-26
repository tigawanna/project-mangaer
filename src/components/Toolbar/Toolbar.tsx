import React from 'react'
import { GrHome } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import { Link} from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { useAuthSignOut} from '@react-query-firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { User } from 'firebase/auth';
import { useQueryClient } from 'react-query';

interface ToolbarProps {
user?:User|null
}

export const Toolbar: React.FC<ToolbarProps> = ({user}) => {

const queryClient = useQueryClient()   
const mutation = useAuthSignOut(auth,{
   onSuccess: () => {  queryClient.invalidateQueries('user')  },
   });


const userImg =user?.photoURL;
const image =userImg?userImg:'https://picsum.photos/id/237/100/100'
return (
 <div className='w-full bg-slate-500 h-16'>
<IconContext.Provider value={{ size: "25px", className: "table-edit-icons" }} >
 <div className='flex flex-grow flex-3 text-lg font-bold'>
     <div className='m-1 w-full p-3 bg-slate-400 flex-center'>
     <Link to="/"><GrHome /></Link>
     </div>
     {/* <div className='m-1 w-full p-3 bg-slate-600 flex-center'>
     <Link to="/project">Project</Link>
     </div> */}
     <div className='m-1 w-full p-3 bg-slate-300 flex-center'>
     <Link to="/shops">Shops</Link>
     </div>

     <div className='m-1 w-full p-3 bg-slate-300 flex-center'>
     <Link to="/shop">Shop</Link>
     </div>

     <div className='m-1 w-fit p-3 bg-slate-400 flex-center'>
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
