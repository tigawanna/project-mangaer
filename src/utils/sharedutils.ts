
import { writeBatch,doc } from 'firebase/firestore';
import { db } from './../firebase/firebaseConfig';
import dayjs from 'dayjs';
import { Payment, tyme, Shop } from './other/types';
import { QueryClient } from 'react-query';




const appendtoCache=async(index:any[],newobj:any)=>{
  const queryClient = new QueryClient()
  console.log("index for the query === ",index)
  await queryClient.cancelQueries(index);
  // Snapshot the previous value
  const previous = queryClient.getQueryData(index);
  console.log("previous data in the query cahe vs new === ",previous,newobj)
  // Optimistically update to the new value
   if(previous){
    console.log("previous data in the query cahe vs new === ",previous,newobj)
    //@ts-ignore
    queryClient.setQueryData(index, (oldobj) => [...oldobj, newobj]);
   
  }
}

export  const setPayment=(item:Payment,paymentId:string,floor:string,
  shopNo:string,index:any[])=>{
   const paymentRef = doc(db, "payments",paymentId);
   const shopPaymentRef = doc(db, "shops",floor,"shops",shopNo,"paymenthistory",paymentId);

       //add payment to the payment collection and the nesyed shop paymenyhistory collection
   const batch = writeBatch(db);
   batch.set(paymentRef,item)
   batch.set(shopPaymentRef,item)
   batch.commit().then((stuff)=>{
    appendtoCache(index,item)
    console.log("stuff after batch write===",stuff)})
   .catch((stuff)=>{console.log("error writing batch ===",stuff)})
  }



  export  const deletePayment=(paymentId:string,floor:string,shopNo:string)=>{
    const paymentRef = doc(db, "payments",paymentId);
    const shopPaymentRef = doc(db, "shops",floor,"shops",shopNo,"paymenthistory",paymentId);
 
    //add payment to the payment collection and the nesyed shop paymenyhistory collection
    const batch = writeBatch(db);
    batch.delete(paymentRef)
    batch.delete(shopPaymentRef)
    batch.commit().catch((stuff)=>{console.log("error deleting batch ===",stuff)})
   } 





export const formatTyme =(time?:tyme|Date)=>{

    if(time){
      const ty= new Date(
          //@ts-ignore
        time.seconds * 1000 + time.nanoseconds / 1000000
      
      );
      return dayjs(ty).format("DD/MM/YYYY")
   }  
  
    return dayjs(new Date()).format("DD/MM/YYYY")
   
  }

  export const addComma=(figure:number)=>{
    return figure.toLocaleString()
  }



  
export const getNextShopNumber=(shops:Shop[])=>{
    //@ts-ignore
  let num:[number] =[];  
   shops.forEach((shop)=>{
  
    if(shop.shopnumber.includes('G'))
    {
      num.push(parseInt(shop.shopnumber.slice(2,4)))
    }
    else
    {
      num.push(parseInt(shop.shopnumber.slice(3,5)))
    } 
   })

  const nextShopNo= num.reduce(function (p, v) {return ( p > v ? p : v );})+1
  return {existingShopNo:num,nextShopNo}
  }
  