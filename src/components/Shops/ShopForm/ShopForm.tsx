import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { User } from "firebase/auth";
import { doc,collection, addDoc, query } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { Shop, ShopFormError } from "../../../utils/other/types";
import { useQueryClient } from "react-query";
import { validate } from "./shopformvalidate";
import { getNextShopNumber } from './../shoputils';
import { tyme } from './../../../utils/other/types';



interface ShopFormProps {
  user?: User | null;
  floor: string;
  shops:Shop[]
  open:boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShopForm: React.FC<ShopFormProps> = ({ floor,shops,open,setOpen }) => {
  const floormap = {
    ground: "G-",
    first: "M1-",
    second: "M2-",
    third: "M3-",
  };
  const queryClient = useQueryClient();
  const {existingShopNo,nextShopNo}=getNextShopNumber(shops)

  const [error, setError] = useState<ShopFormError>({ name: "", message: "" });
  const [input, setInput] = useState<Shop>({
  
    date: new Date(),
    monthlyrent: 10000,
    shopfloor: floor,
    shopname: "",
    //@ts-ignore
    shopnumber: `${floormap[floor]}${nextShopNo}`,

  });



 

  const shopRef = doc(db, "shops",floor,"shops",input.shopnumber);
  
  
  const addMhopMutation = useFirestoreDocumentMutation(
    
    shopRef,
    { merge: true },
    {
      onMutate: async (newShop) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        console.log(newShop)
        await queryClient.cancelQueries(["shops",floor]);
        // Snapshot the previous value
        const previousShops = queryClient.getQueryData(["shops",floor]);
        // Optimistically update to the new value
         if(previousShops){
          //@ts-ignore
          queryClient.setQueryData(["shops",floor], (old) => [...old, newShop]);
         
        }
    
        // Return a context object with the snapshotted value
        return { previousShops };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newTodo, context) => {
        //@ts-ignore
        queryClient.setQueryData(["shops",floor], context.previousShops);
      },
      // Always refetch after error or success:
      onSettled: () => {
           queryClient.invalidateQueries(["shops",floor]);
      },
    }
  );



  
  const handleChange = (e: any) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.id]: value,
    });
  };



  const handleSubmit = async(e: any) => {
    e.preventDefault();

  const item={
  date:input.date,
   shopnumber:input.shopnumber.toUpperCase(),
   shopname:input.shopname.toLowerCase(),
   monthlyrent:input.monthlyrent,
   shopfloor:input.shopfloor.toLowerCase()
  }



    console.log('mutatin done',addMhopMutation)

    if (validate({ input, error, setError ,shops})) {
          addMhopMutation.mutate(item)
       setOpen(!open)
    }

 };






  return (
    <div className="w-full h-[90%]  flex-center flex-col">
    
        <form className="w-[90%] h-[80%] md:h-[60%] md:w-[60%] flex-center">
            
          <div className="w-full h-full  flex-center flex-col bg-slate-500">
 
          <div className="w-full flex-center flex flex-wrap">
          <div className="w-fit bg-slate-500 p-2 text-white">existing shop Nos:</div>
          {existingShopNo.map((item,index)=>{
           return(
          <div key={index} className="rounded-[50%] m-1 p-2 bg-slate-600 font-bold text-white">
            {item}</div>)
          })}
          </div>
            <div className="p-2 w-[95%] flex flex-col flex-center bg-slate-600 rounded-md text-white">
            <label className="text-4xl font-bold capitalize mb-2 w-full ">{floor}</label>
              <div className="w-full h-full flex sm:flex-row flex-col ">
                {/* shop number */}
                <div className="w-full flex flex-col m-1">
                  <label className="text-sm">Shop Number</label>
                  <input
                    type="text"
                    placeholder="Shop number"
                    className="p-2 w-[100%]  rounded-md "
                    id="shopnumber"
                    onChange={handleChange}
                    value={input.shopnumber}
                  />
                  {error && error.name === "shopnumber" ? (
                    <div className="shop-form-error">{error.message}</div>
                  ) : null}
                </div>

                {/* shop name */}
                <div className="w-full flex flex-col m-1">
                  <label className="text-sm">Shop Name</label>
                  <input
                    type="text"
                    placeholder="Shop name"
                    className="p-2 w-[100%]  rounded-md "
                    id="shopname"
                    onChange={handleChange}
                    value={input.shopname}
                  />
                  {error && error.name === "shopname" ? (
                    <div className="shop-form-error">{error.message}</div>
                  ) : null}
                </div>
              </div>

              <div className="w-full h-full flex sm:flex-row flex-col ">
                {/* monthly rent */}
                <div className="w-full flex flex-col m-1">
                  <label className="text-sm">Monthly Rent</label>
                  <input
                    type="number"
                    placeholder="monthlyrent"
                    className="p-2  w-[100%]  rounded-md "
                    id="monthlyrent"
                    onChange={handleChange}
                    value={input.monthlyrent}
                  />
                  {error && error.name === "monthlyrent" ? (
                    <div className="shop-form-error">{error.message}</div>
                  ) : null}
                </div>
              </div>
            </div>
             <button
             onClick={(e)=>handleSubmit(e)}
             className="py-2 px-5 m-2 bg-slate-700 rounded 
             hover:bg-slate-800 capitalize font-medium text-white"
             >add</button>

          </div>
        </form>
      </div>
 
  );
};
