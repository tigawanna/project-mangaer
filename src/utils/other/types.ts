export interface Shop{
date:Date    
shopname:string
shopnumber:string
shopfloor:string
monthlyrent:number
shoparrears?:string
}

export interface ShopFormError{
    name:string
    message:string
}
export interface tyme{
    nanoseconds: number,
    seconds:number
  }

export interface  ShopFormValidate{
    input: Shop
    error: ShopFormError
    setError: React.Dispatch<React.SetStateAction<ShopFormError>>
    shops:Shop[]
}  
