import { User } from 'firebase/auth';
import React from 'react'
import { ShopDetails, ShopTable } from './ShopWidgets';

interface ShopProps {
user?: User | null;
}

export const Shop: React.FC<ShopProps> = ({}) => {
return (
 <div className='h-full w-full '>
<div className='w-full h-[40%] fixed top-[64px] z-30'>
<ShopDetails/>
</div>
<div className='w-full mt-[300px] relative z-40'>
<ShopTable/>
</div>

 </div>
);
}
