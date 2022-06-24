import { User } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, orderBy, where } from "firebase/firestore";
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { useState } from 'react';
import { Shop } from '../../utils/other/types';
import { ShopCard, ShopFloor } from './ShopCard';


interface ShopsProps {
user?:User|null
}

export const Shops: React.FC<ShopsProps> = ({user}) => {

const [floor, setFloor] = useState("first")
const shopsRef = query( collection(db,"shops",floor,"shops"),orderBy("shopnumber","asc"),
   where("shopfloor", "==", floor)
);
const floors=["ground","first","second","third"]

 

const shopQuery = useFirestoreQueryData(["shops",floor],shopsRef);
// console.log("query  ==== ",shopQuery)
// console.log("shop query ==== ",shopQuery?.data)
const data = shopQuery.data as Shop[]
if(shopQuery.error){
return (
<div className='w-full h-full flex-center'> ERROR LOADING SHOPS {shopQuery.error.message}  </div>);
}

if(shopQuery.isLoading){
return (
<div className='w-full h-full flex-center'> loading .....  </div>);
}


return (
<div className='w-full h-full flex-col'>
<div className='flex flex-wrap h-[10%]w-full '>

<div className='flex h-[10%] w-full mx-1'>
    {floors.map((floor,index)=>{
        return(<ShopFloor floor={floor} setFloor={setFloor} key={index}/>)
    })}
</div>
</div>

<div className='flex flex-wrap  w-full bg-pink-300 justify-center m-2'>
{
data.map((shop,index)=>{
return(<ShopCard shop={shop} key={index}/>)
})

}
</div>
</div>

);
}
