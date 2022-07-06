import { User } from 'firebase/auth';
import React, { useState } from 'react'
import { ShopDetails} from './ShopParts';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { query, collection, orderBy} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { tyme } from '../../utils/other/types';
import { useLocation } from 'react-router-dom';
import {Shop as ShopType} from '../../utils/other/types'
import { useNavigate } from 'react-router-dom';
import { TheTable } from 'table-for-react';
import { header } from './shop-table-yars';
import { IconContext } from 'react-icons';
import { FaRegEdit } from 'react-icons/fa';


interface ShopProps {
user?: User | null;
floor:string
shopId:string
}

export interface Payment{
date:tyme
floor:string
madeBy:string
month: string
payment:string
paymentId:string
paymentmode:string
shopno:string
}


export const Shop: React.FC<ShopProps> = ({}) => {

const { state } = useLocation();
const navigate = useNavigate();
const shop=state as ShopType
const [update, setUpdate] = useState(false);
const [error, setError] = useState({name:"",error:""});




const validate=(prev:any,current:any)=>{
 if(current.name!=="john"){
  setError({name:"name",error:"not john"})
   return false
 } 

 setError({name:"",error:""})
 return true
}


const saveChanges=(prev:any,current:any)=>{
// console.log("saving ...",current)
}

const deleteRow=(current:any)=>{
// console.log("delteing current ,",current)
setError({name:"name",error:"not john"})
}

const clearError=()=>{
setError({name:"",error:""})
}

const toggleEditMode=()=>{
  setUpdate(!update)
}


const paymentRef = query(
collection(db, "shops", shop?.shopfloor, "shops",shop?.shopnumber,"paymenthistory"),orderBy("date", "desc")
);

const paymentQuery = useFirestoreQueryData(["payment", shop?.shopfloor,shop?.shopnumber], paymentRef);


const payments=paymentQuery.data as Payment[]




if (paymentQuery.error) {
    return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
      ERROR LOADING payments {paymentQuery.error.message}
        </div> );
  }

if (paymentQuery.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
}

console.log(payments)
return (
 <div className='h-full w-full bg-slate-600 overflow-y-hidden'>
  
   <div className='h-fit w-full  flex-center fixed top-[70px]'>
   <div className='h-full w-fit p-2 bg-slate-600 hover:bg-slate-700 flex-center '>
  <IconContext.Provider
  value={{ size: "20px",className:"mx-[2px] text-white" }}>
   <FaRegEdit onClick={() => setUpdate(!update)} />
  </IconContext.Provider>
    </div>  
   </div>
   
<div className='w-full h-fit bg-slate-500 overfloe-x-hidden'>
<ShopDetails shop={shop}/>
</div>
<div className='w-full h-fit z-40 overflow-x-scroll lg:overflow-x-hidden 
flex justify-center'>
<div className='absolute w-[99%] bg-white '>
<TheTable
     rows={payments}
     error={error}
     update={update}
     validate={validate}
     saveChanges={saveChanges}
     deleteRow={deleteRow}
     header={header}
     clearError={clearError}
     />
    </div>
</div>

 </div>
);
}
