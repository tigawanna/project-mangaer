export interface Shop{
date:tyme | Date  
shopname:string
shopnumber:string
shopfloor:string
monthlyrent:number
shoparrears?:string
}
export interface Payment{
  shopnumber:string,
   payment:number,
   paymentId:string,
   madeBy?:string|null,
   month:string,
   date:Date,
   paymentmode:"cheque"|"cash_deposit"|"mpesa"|"direct_transfer",
   editedOn?:Date|null,
   editedBy?:string|null
}
export interface ShopFormError{
    name:string
    message:string
}
export interface tyme{
    nanoseconds:number,
    seconds:number
  }

export interface  ShopFormValidate{
    input: Shop
    error: ShopFormError
    setError: React.Dispatch<React.SetStateAction<ShopFormError>>
    shops:Shop[]
}  

export interface ErrorState {
    name: string;
    error: string;
  }
