import React,{useState} from 'react'
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { TheTable } from 'table-for-react';
import { tyme } from './../../utils/other/types';
import { header } from './payment-vars';
import { IconContext } from 'react-icons';
import { FaRegEdit } from 'react-icons/fa';
import { PaymentForm } from './PaymentForm';
import { User } from 'firebase/auth';
import { FaTimes } from 'react-icons/fa';

interface paymentProps {
user?:User|null
}

export interface PaymentType{
    date:tyme
    floor:string
    madeBy:string
    month: string
    payment:string
    paymentId:string
    paymentmode:string
    shopno:string
    }

export const Payment: React.FC<paymentProps> = ({user}) => {

    const [update, setUpdate] = useState(false);
    const [error, setError] = useState({name:"",error:""});
    const [open, setOpen] = useState(true);
    
    
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
    // setError({name:"name",error:"not john"})
    }
    
    const clearError=()=>{
    setError({name:"",error:""})
    }   
const paymentRef = query(collection(db, "payments"),orderBy("date", "desc"));
const paymentQuery = useFirestoreQueryData(["payments"], paymentRef);   

if (paymentQuery.error) {
    return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
      ERROR LOADING payments {paymentQuery.error.message}
        </div> );
  }

if (paymentQuery.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
}

const payments=paymentQuery.data as PaymentType[]
return (
  <div className="w-full h-full overflow-y-hidden">

   <div className='h-fit w-fit  flex-center fixed top-[40px] left-[50px] z-50'>
   <div className='h-full w-fit p-2 bg-slate-600 hover:bg-slate-700 flex-center '>
   <IconContext.Provider
    value={{ size: "20px",className:"mx-[2px] text-white" }}>
   <FaRegEdit onClick={() => setUpdate(!update)} />
   </IconContext.Provider>
    </div>
    </div>

<div className='bg-slate-700 fixed z-50 w-full h-full'>
<PaymentForm user={user} open={open} setOpen={setOpen}/>
</div>

  <div className="absolute h-full w-full z-40 overflow-x-scroll lg:overflow-x-hidden">
    
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
);
}
