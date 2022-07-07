
import { writeBatch,doc } from 'firebase/firestore';
import { db } from './../firebase/firebaseConfig';


export interface Payment{
    shopno:string,
    payment:number,
    paymentId:string,
    madeBy?:string|null,
    month:string,
    date:Date,
    paymentmode:"cheque"|"cash_deposit"|"mpesa"|"direct_transfer"
}

export  const setPayment=(item:Payment,paymentId:string,floor:string,shopNo:string)=>{
   const paymentRef = doc(db, "payments",paymentId);
   const shopPaymentRef = doc(db, "shops",floor,"shops",shopNo,"paymenthistory",paymentId);

       //add payment to the payment collection and the nesyed shop paymenyhistory collection
   const batch = writeBatch(db);
   batch.set(paymentRef,item)
   batch.set(shopPaymentRef,item)
   batch.commit().then((stuff)=>{console.log("stuff after batch write===",stuff)})
   .catch((stuff)=>{console.log("error writing batch ===",stuff)})
  }
