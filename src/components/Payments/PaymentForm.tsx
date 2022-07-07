import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { User } from "firebase/auth";
import { doc,collection, writeBatch, query} from "firebase/firestore";
import { orderBy, where } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import React from "react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { getmonth } from "./paymentutils";
import { db } from './../../firebase/firebaseConfig';
import { paymentValidation } from "./payment-form-validate";
import { Shop } from './../../utils/other/types';
var uniqid = require('uniqid');


interface Payment{
    shopno:string,
    payment:number,
    paymentId:string,
    madeBy?:string|null,
    month:string,
    date:Date,
    paymentmode:"cheque"|"cash_deposit"|"mpesa"|"direct_transfer"
}

interface PaymentFormProps {
  user?: User|null;
  open:boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>

}

export const PaymentForm: React.FC<PaymentFormProps> = ({ open,setOpen,user}) => {
  const floormap = { ground: "G-", first: "M1-",second: "M2-",third: "M3-" };
  const floors = [["ground","G-"], ["first","M1-"], ["second","M2-"], ["third","M3-"]];
  const queryClient = useQueryClient();

  const [floor, setFloor] = useState("ground");
  const [formopen, setFormOpen] = useState(false);
  const [error, setError] = useState({ name: "", message: "" });
  
  console.log("error ==== ",error)

  const [input, setInput] = useState<Payment>({
    date: new Date(),
    shopno:"G-01",
    payment:0,
    paymentId:"",
    madeBy:"",
    month:getmonth,
    paymentmode:"cash_deposit"

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
setInput({...input,shopno:sop.shopnumber})
setFormOpen(!formopen)
 }
  const paymentId=uniqid(input.shopno,floor)

  const batch = writeBatch(db);

  const paymentRef = doc(db, "payments",paymentId);
  const shopPaymentRef = doc(db, "shops",floor,"shops",input.shopno,"paymenthistory",paymentId);
  
  // const addMhopMutation = useFirestoreDocumentMutation(
  //   shopPaymentRef,
  //   { merge: true },
  //   {
  //     onMutate: async (newShop) => {
  //       // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  //       console.log(newShop)
  //       await queryClient.cancelQueries(["shops",floor]);
  //       // Snapshot the previous value
  //       const previousShops = queryClient.getQueryData(["shops",floor]);
  //       // Optimistically update to the new value
  //        if(previousShops){
  //         //@ts-ignore
  //         queryClient.setQueryData(["shops",floor], (old) => [...old, newShop]);
         
  //       }
    
  //       // Return a context object with the snapshotted value
  //       return { previousShops };
  //     },
  //     // If the mutation fails, use the context returned from onMutate to roll back
  //     onError: (err, newTodo, context) => {
  //       //@ts-ignore
  //       queryClient.setQueryData(["shops",floor], context.previousShops);
  //     },
  //     // Always refetch after error or success:
  //     onSettled: () => {
  //          queryClient.invalidateQueries(["shops",floor]);
  //     },
  //   }
  // );


// console.log("input === ",input)
const handleChange = (e: any) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.id]: value,
    });
  };



const handleSubmit = async(e: any) => {
  e.preventDefault();

  const item:Payment={
  date:input.date,
  shopno:input.shopno.toUpperCase(),
  madeBy:user?.displayName,
  month:input.month,
  payment:input.payment ,
  paymentmode:input.paymentmode,
  paymentId

}




if (paymentValidation({ input, error, setError })){
    // addMhopMutation.mutate(item)
    batch.set(paymentRef,item)
    batch.set(shopPaymentRef,item)
    batch.commit().then((stuff)=>console.log("stuff after batch write===",stuff))
    .catch((stuff)=>console.log("error writing batch ===",stuff))
    setOpen(!open)

    setFormOpen(!formopen)
    // console.log('mutatin done',addMhopMutation)
    }

 };

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
                style={{backgroundColor:input.shopno===item.shopnumber?"purple":""}}
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





    {formopen?
    <div className="w-[90%] md:w-[40%] h-[60%] flex-center fixed left-[5%] md:left-[30%] top-[20%] z-20">
        
        <form className="w-full h-full flex-center ">
         <div className="p-2 w-[90%] flex flex-col items-center justify-center 
             rounded-md text-white bg-slate-500">

            <div className="w-full h-full flex sm:flex-row flex-col ">
            {/* shop number */}
            <div className="w-full flex flex-col m-1">
                <label className="text-sm">Shop Number</label>
                <input
                type="text"
                placeholder="Shop number"
                className="p-2 w-[95%]  rounded-md text-black"
                id="shopno"
                onChange={handleChange}
                value={input.shopno}
                />
                {error && error.name === "shopno" ? (
                <div className="shop-form-error">{error.message}</div>
                ) : null}
            </div>

            {/* shop name */}
            <div className="w-full flex flex-col m-1">
                <label className="text-sm">payment</label>
                <input
                type="text"
                placeholder="Payment"
                className="p-2 w-[95%]  rounded-md text-black"
                id="payment"
                onChange={handleChange}
                value={input.payment}
                />
                {error && error.name === "payment" ? (
                <div className="shop-form-error">{error.message}</div>
                ) : null}
            </div>
            </div>

            <div className="w-full h-full flex sm:flex-row flex-col ">
            {/* monthly rent */}
            <div className="w-[95%] flex flex-col m-1 ">
            <label className="text-sm">Mode</label>
                    <select id="paymentmode" onChange={handleChange} className="p-2 border-0 text-black">
                    <option value="cash_deposit">select the payment mode</option>
                    <option value="cash_deposti">cash deposit</option>
                    <option value="cheque">Cheque</option>
                    <option value="mpesa">Mpesa</option>
                    <option value="direct_deposit">Direct Deposit</option>
                    </select>
                
                {error && error.name === "paymentmode" ? (
                <div className="shop-form-error">{error.message}</div>
                ) : null}
            </div>
            </div>
            <button
            onClick={(e)=>handleSubmit(e)}
            className="py-2 px-5 m-2 bg-slate-700 rounded 
            hover:bg-slate-800 capitalize font-medium text-white"
            >add</button>
            </div>
        </form>
        </div>:null}
         {formopen?<div 
         onClick={()=>setFormOpen(!formopen)}
         className="bg-slate-700 opacity-70 fixed top-0 w-full h-full z-10"></div>:null}


   
      </div>
 
  );
};
