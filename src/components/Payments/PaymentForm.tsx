
import { User } from "firebase/auth";
import { collection,query,orderBy, where } from "firebase/firestore";
import { useFirestoreQueryData} from "@react-query-firebase/firestore";
import React from "react";
import { useState } from "react";
import { getmonth,handleChange } from "../../utils/paymentutils";
import { db } from './../../firebase/firebaseConfig';
import { Payment, Shop } from './../../utils/other/types';
import { SharedPaymentForm } from '../Shared/SharedPaymentForm';
import { handleSubmit } from './../../utils/paymentutils';
import { QueryClient } from 'react-query';


;




interface PaymentFormProps {
  user?: User|null;
  open:boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  queryClient: QueryClient

}

export const PaymentForm: React.FC<PaymentFormProps> = ({ open,setOpen,user,queryClient}) => {
 
  const floors = [["ground","G-"], ["first","M1-"], ["second","M2-"], ["third","M3-"]];
 

  const [floor, setFloor] = useState("ground");
  const [formopen, setFormOpen] = useState(false);
  
 
  const [error, setError] = useState({ name: "", error: "" });
  
  console.log("error ==== ",error)

  const [input, setInput] = useState<Payment>({
    date: new Date(),
    shopnumber:"G-01",
    payment:0,
    paymentId:"",
    madeBy:"",
    month:getmonth,
    paymentmode:"cash"

  });


 const shopsRef = query(
    collection(db, "shops", floor, "shops"),
    orderBy("shopnumber", "asc"),
    where("shopfloor", "==", floor)
  );


const updateFloor=(newfloor:string[])=>{
   setFloor(newfloor[0])
}
 
const updateShop=(sop:Shop)=>{
setInput({...input,shopnumber:sop.shopnumber})
setFormOpen(!formopen)
 }



 const handleTheChange=(e:any)=>{
   handleChange({e,input,setInput})
 }

 const handleTheSubmit=async(e:any)=>{
   handleSubmit({e,input,floor,user,error,setError,open,setOpen,formopen,setFormOpen,queryClient})
 }


const shopQuery = useFirestoreQueryData(["shops", floor], shopsRef); 

if (shopQuery.error) {
    return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
      ERROR LOADING SHOPS {shopQuery.error.message}
        </div> );
  }

  if (shopQuery.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
  }

  const floorshops = shopQuery.data as Shop[]
  return (
    <div className="w-full h-[90%]  flex-col justify-center items-center">
    
       <div className="w-full flex-center flex flex-wrap ">
         {floors.map((item,index)=>{
           return(
          <div key={index}
          style={{backgroundColor:floor===item[0]?"purple":""}}
          onClick={()=>updateFloor(item)}
          className="rounded-sm m-1 p-2 bg-slate-600 hover:bg-purple-600 
          font-bold text-white cursor-pointer">
            {item[0]}</div>)
          })}
          </div>  

        <div className="flex-center  w-full flex-wrap">
    
            <div className="w-full flex-center  flex-wrap bg-slate-400 ">
                {
                floorshops.map((item,index)=>{
                return(
                <div key={index}
                style={{backgroundColor:input.shopnumber===item.shopnumber?"purple":""}}
                onClick={()=>updateShop(item)}
                className="p-2 m-1 bg-slate-700  w-[45%] md:w-[15%]
                cursor-pointer hover:bg-slate-800 text-white">
                <div className="text-lg font-bold ">{item.shopnumber}</div>
                <div className="flex-center p-1 m-1 bg-slate-500">{item.shopname}</div>
               </div>
                )
                })
                }
          </div>
      </div>
       {formopen?<SharedPaymentForm
       formopen={formopen}
       input={input}
       setFormOpen={setFormOpen}
       handleChange={handleTheChange}
       handleSubmit={handleTheSubmit}
       error={error}
       />:null}
      </div>
 
  );
};
