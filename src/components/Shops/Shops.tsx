import { User } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig";
import { collection, query, orderBy, where } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { useState } from "react";
import { Shop } from "../../utils/other/types";
import { AddShopCard, ShopCard, ShopFloor } from "./ShopCard";
import { ShopForm } from './ShopForm/ShopForm';
import { FaTimes } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';

interface ShopsProps {
  user?: User | null;
}

export const Shops: React.FC<ShopsProps> = ({ user }) => {
  const [floor, setFloor] = useState("ground");
  const [open, setOpen] = useState(false);

  const shopsRef = query(
    collection(db, "shops", floor, "shops"),
    orderBy("shopnumber", "asc"),
    where("shopfloor", "==", floor)
  );
  const floors = ["ground", "first", "second", "third"];

  const shopQuery = useFirestoreQueryData(["shops", floor], shopsRef);
  // console.log("query  ==== ",shopQuery)
  // console.log("shop query ==== ",shopQuery?.data)

  const data = shopQuery.data as Shop[];
  if (shopQuery.error) {
    return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
      ERROR LOADING SHOPS {shopQuery.error.message}
        </div> );
  }

  if (shopQuery.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
  }

  return (
    <div className="w-full h-full flex-col text-white">
      <div className="right-0 left-0 flex flex-wrap h-[10%]w-full ">
       <div className="fixed flex h-[10%] w-full mx-1 justify-center ">
          {floors.map((afloor, index) => (
            <ShopFloor
              floor={afloor}
              setFloor={setFloor}
              key={index}
              current={floor}
            />
          ))}
        </div>
      </div>
   {open?<div 

   className="fixed z-40 h-full w-full bg-slate-400 bg-opacity-50 ">
    <div className="fixed z-50  ">
    <IconContext.Provider value={{ size: "50px", className:"text-slate-600" }} ><FaTimes onClick={()=>setOpen(false)}/></IconContext.Provider>
      </div>
    <ShopForm floor={floor} shops={data} open={open} setOpen={setOpen}/>
    </div>:null}

      <div className="flex-center  w-full  m-2 mt-14 flex-wrap">
         <AddShopCard open={open} setOpen={setOpen}/>
        {data.map((shop, index) =><ShopCard shop={shop} key={index} />)}
  
      </div>
    </div>
  );
};
