import React from 'react'
import { Shop } from '../../utils/other/types';
import { addComma, formatTyme } from './shoputil';

interface ShopWidgetsProps {

}

export const ShopWidgets: React.FC<ShopWidgetsProps> = ({}) => {
return (
 <div className=''>

 </div>
);
}

interface ShopDetailsProps {
shop:Shop
}

export const ShopDetails: React.FC<ShopDetailsProps> = ({shop}) => {
return (
 <div className='w-full h-full bg-slate-400 text-white'>
 <div className='flex flex-col sm:flex-row w-full h-full  bg-slate-500 '>

 <div className='w-full  bg-slate-500 p-2  font-bold'>
 <div className='w-full text-2xl sm:text-3xl font-medium  capitalize'>
 {shop.shopname}
 </div>

 <div className='flex-center w-full capitalize'>
 <div className='w-full text-6xl sm:text-8xl font-bold p-5 '>
 {shop.shopnumber}
 </div>
 <div className='w-full text-base sm:text-lg font-light  text-center capitalize'>
 <div className='bg-slate-700 m-1 p-1'>{shop.shopfloor}</div>
 <div className='bg-slate-700 m-1 p-1'>{shop.monthlyrent.toLocaleString()}</div>
 <div className='bg-slate-700 m-1 p-1'>{formatTyme(shop.date)}</div>
 </div>
</div>

</div>

<div className='w-full h-full flex-center flex-col  bg-slate-600 p-5'>
<div className='shadow-md shadow-white rounded-lg p-5 w-[80%] flex-center '>
<div className='w-full  text-4xl font-medium text-center '>13,500</div>
 </div>
</div>

 </div>
 </div>
);
}


