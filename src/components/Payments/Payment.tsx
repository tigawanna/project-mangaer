import React,{useState} from 'react'
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { TheTable } from 'table-for-react';
import { tyme } from './../../utils/other/types';
import { header } from './payment-vars';

interface paymentProps {

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

export const Payment: React.FC<paymentProps> = ({}) => {

    const [update, setUpdate] = useState(true);
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
 <div className='w-full h-full'>

   <div className='w-full overflow-x-scroll h-full absolute '>
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
