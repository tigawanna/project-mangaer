import React,{useState} from 'react'
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { TheTable } from 'table-for-react';
import { tyme } from './../../utils/other/types';
import { header } from './payment-vars';
import { IconContext } from 'react-icons';
import { FaRegEdit, FaTimes,FaPlus, FaPrint  } from 'react-icons/fa';
import { PaymentForm } from './PaymentForm';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


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
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
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
  <div className="w-full h-[85%] overflow-y-hidden absolute">

   <div className='h-fit w-full bg-slate-400  flex-center relative top-0'>
   <div className='h-full w-fit bg-slate-600 p-2  flex-center rounded-xl'>
   <IconContext.Provider
    value={{ size: "25px",className:"mx-[15px] text-white hover:text-purple-600" }}>
   <FaRegEdit onClick={() => setUpdate(!update)} />
  {!open?<FaPlus onClick={() => setOpen(!open)} />:<FaTimes onClick={() => setOpen(!open)} />}
   <FaPrint onClick={() => navigate('/print-preview', { state:{ rows:payments,header }
     })} />
   </IconContext.Provider>
    </div>
    </div>

{open?<div className='bg-slate-700 fixed z-50 w-full h-full'>
<PaymentForm user={user} open={open} setOpen={setOpen}/>
</div>:null}

  <div className="absolute h-full w-full z-40 overflow-x-scroll lg:overflow-x-hidden">
    
  <TheTable
   rows={payments}
   header={header}
   update={update}
   error={error}
   validate={validate}
   saveChanges={saveChanges}
   deleteRow={deleteRow}
   clearError={clearError}
   />
   </div>
  </div>
);
}
