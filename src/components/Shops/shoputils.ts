import { Shop } from './../../utils/other/types';

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
  
  

