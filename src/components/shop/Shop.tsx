import { User } from 'firebase/auth';
import React from 'react'
import { ShopDetails, ShopTable } from './ShopWidgets';

interface ShopProps {
user?: User | null;
}

export const Shop: React.FC<ShopProps> = ({}) => {
return (
 <div className='h-full w-full bg-slate-600'>
<div className='w-full h-[40%] fixed top-[60px] z-30 bg-slate-500'>
<ShopDetails/>
</div>
<div className='w-full mt-[320px] sm:mt-[300px] relative z-40 bg-slate-500'>
<ShopTable/>
</div>

 </div>
);
}
