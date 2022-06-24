import React from 'react'
import { Shop } from '../../utils/other/types';

interface ShopCardProps {
shop:Shop
}

export const ShopCard: React.FC<ShopCardProps> = ({shop}) => {
return (
 <div className=' p-5 m-1 flex-col bg-slate-500 shadow-md shadow-purple-900 
 hover:shadow-lg rounded w-[95%] md:w-[30%] '>
<div className='text-xl font-bold'>{shop.shopnumber}</div>
<div className='h-[80%] flex-col justify-end items-end'>
<div className='text-lg'>{shop.shopfloor}</div>
<div className='text-6xl'>{shop.shopname}</div>
<div className='text-lg font-medium'>{shop.monthlyrent}</div>
</div>
 </div>
);
}





interface ShopFloorProps {
floor:string
setFloor: React.Dispatch<React.SetStateAction<string>>
}


export const ShopFloor: React.FC<ShopFloorProps> = ({floor,setFloor}) => {
const floorClicked=(floor:string)=>{setFloor(floor)} 
return (
 <div 
 className='w-fit h-full p-2 m-1 bg-slate-500 text-lg font-normal text-center capitalize cursor-pointer'
 onClick={()=>floorClicked(floor)}
 >
{floor}
 </div>
);
}
