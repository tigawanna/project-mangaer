
import { writeBatch,doc} from 'firebase/firestore';
import { db } from './../firebase/firebaseConfig';
import dayjs from 'dayjs';
import { Payment, tyme, Shop } from './other/types';
import { QueryClient } from 'react-query';


export const getPaymentRef=(paymentId:string)=>{
  return doc(db, "payments",paymentId);
}

export const getShopPaymentRef=(paymentId:string,floor:string,shopNo:string)=>{
  return doc(db, "shops",floor,"shops",shopNo,"paymenthistory",paymentId);  
}

// export const getPaymentBacthInstance=(item:Payment,paymentId:string,floor:string,shopNo:string)=>{
//   const paymentRef = doc(db, "payments",paymentId);
//   const shopPaymentRef = doc(db, "shops",floor,"shops",shopNo,"paymenthistory",paymentId);
//   const batch = writeBatch(db);
//   batch.set(paymentRef,item)
//   batch.set(shopPaymentRef,item)
 
//   return batch
// }

// export const useBatchPayment=(item:Payment,paymentId:string,floor:string,shopNo:string,index:any[])=>{
// const batch = writeBatch(db);

// const paymentRef = doc(db, "payments",paymentId);
// const shopPaymentRef = doc(db, "shops",floor,"shops",shopNo,"paymenthistory",paymentId);  
// const mutation = useFirestoreWriteBatch(batch,{
// onSuccess: async(data,variables)=>{
//   console.log("batch hook success === ",data)
// }
// });
// batch.set(paymentRef,item)
// batch.set(shopPaymentRef,item)


// mutation.mutate()
// }



const appendtoCache=async(queryClient:QueryClient,newobj:any,index:any[])=>{
  
  // console.log("index for the query === ",index)
  // console.log("new data to append=== ",newobj)

  await queryClient.cancelQueries(index);
  // Snapshot the previous value
  const previous = queryClient.getQueryData(index) as any[]

  // Optimistically update to the new value
   if(previous){
    console.log("previous data exists === ",previous)


    //@ts-ignore
    queryClient.setQueryData(index, (oldobj:any) => {
      console.log("oldobj === ",oldobj)
      let final =  [...oldobj, newobj]
      for(let i = 0; i<oldobj.length; i++){
        if(oldobj[i].paymentId === newobj.paymentId){
         console.log("exists") 
         oldobj.splice(i,1,newobj)
         final = oldobj
         console.log("oldobj after splice=== ",oldobj)  
         break
        }
      }
      
      return(final)
    });
   
  }
}



  export  const setPayment=(item:Payment,paymentId:string,floor:string,shopNo:string,queryClient:QueryClient)=>{
   const paymentRef = doc(db, "payments",paymentId);
   const shopPaymentRef = doc(db, "shops",floor,"shops",shopNo,"paymenthistory",paymentId);

  //  console.log("item when updating",item)
   //query indexes to manually resolve cache
   const payment_index=["payments",item.month]
   const shoppayment_index =["payment", floor, item.shopnumber]
    //add payment to the payment collection and the nesyed shop paymenyhistory collection
   const batch = writeBatch(db);
   batch.set(paymentRef,item)
   batch.set(shopPaymentRef,item)

   batch.commit().then((stuff)=>{

   appendtoCache(queryClient,item,payment_index)
   appendtoCache(queryClient,item,shoppayment_index)
   
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

  const nextNo= num.reduce(function (p, v) {return ( p > v ? p : v );})+1
  const nextShopNo = nextNo<10?'0'+nextNo:nextNo
  return {existingShopNo:num,nextShopNo}
  }
  