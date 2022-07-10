import { User} from 'firebase/auth';




interface HomeProps {
user?:User|null
}


export const Home: React.FC<HomeProps> = ({user}) => {


return (
 <div className='w-full h-full  bg-slate-400 flex-center  '> 

 <div className="min-h-fit h-[80%] flex-col md:flex-row center-flex bg-slate-700 p-5 w-[95%] overflow-y-hidden">
 <div className="flex-center text-slate-200  font-medium w-full p-5 m-2 h-[50%] overflow-y-scroll">
   <p className='h-full'> Welcome, This is the demo of the property manager app 
    made with create-react-app ,tailwindcss , react-query and firebase plus 
    a custom table that i made too. @table-for-react
   It's using mock data instead of a real firebase backend because misuse is a concern
   ,mileage may vary and not all the 
   components were assigned mock data , but most of them will let you create 
   new mutations which will be stored in cache.

   everything needed to make the live back end is in the repo and might take some setting
   up you can refer to the README
  click on the user propfile pic on the top corner to signout but it won't work as expected since a dummy user
   immediatly gets inected into cache. explore the routes on the toolbar and have fun
   </p>
  </div>
 <div className="w-full h-fit flex-col center-flex md:flex-center bg-slate-500">
 <div className='w-full flex-center text-slate-100 text-xl md:text-4xl font-bold'> 
 Welcome {user?.displayName}</div>
    <div className='w-full flex-center '>
      {/* @ts-ignore */}
      {user?.photoURL?<img src={user?.photoURL} 
      alt="user"
     className='w-44 h-44 rounded-[50%] min-h-fit m-2'
     />:null}
    </div>


    </div>

  </div>


 </div>
);


}
