import { User} from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';



interface HomeProps {
user?:User|null
}


export const Home: React.FC<HomeProps> = ({user}) => {


return (
 <div className='w-full min-h-full bg-slate-400 flex-center flex-col'> 

 <div className="flex-center bg-slate-500 w-[90%] md:w-[50%]">
 <div className="flex-center flex-col bg-slate-300 p-[5%] w-full md:w-[50%] rounded">
 <div className="flex-center text-slate-600 text-4xl font-bold w-full p-[5%]">Welcome</div>
 <div className="flex-center text-slate-600 text-4xl font-bold p-[5%]">
  {user?.displayName}</div>
  {/* @ts-ignore */}
{user?.photoURL?<img src={user?.photoURL} 
alt="user"
className='w-[200px] h-[200px]'
/>:null}
  </div>


 </div>
 </div>
);


}
