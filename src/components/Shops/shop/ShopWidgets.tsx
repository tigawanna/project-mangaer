import React from 'react'

interface ShopWidgetsProps {

}

export const ShopWidgets: React.FC<ShopWidgetsProps> = ({}) => {
return (
 <div className=''>

 </div>
);
}

interface ShopDetailsProps {

}

export const ShopDetails: React.FC<ShopDetailsProps> = ({}) => {
return (
 <div className='w-full h-full bg-slate-400'>
 <div className='flex w-full h-full  bg-slate-500 '>
 <div className='w-full  bg-slate-500 p-5 text-3xl font-bold'>
 <div className='w-full text-3xl font-bold'>
 TEST SHOP
 </div>
 <div className='w-full text-8xl font-bold p-5'>
 G-67
 </div>
 </div>

 <div className='w-full h-full flex-center flex-col  bg-slate-600'>
    <div className='w-full  text-4xl font-meduium text-center '>arrears</div>
<div className='shadow-md shadow-white rounded-lg p-10 w-[80%] flex-center mt-2'>
<div className='w-full  text-4xl font-meduium text-center'>13,500</div>
 </div>
</div>
 </div>
 </div>
);
}

interface ShopTableProps {

}

export const ShopTable: React.FC<ShopTableProps> = ({}) => {
let i;
let dummyArr=[]
 for(i=1;i<20;i++){
 dummyArr.push({"ID":i,"Date":i+i+i,"Mode":"cash","Amount":i*1000})
 }   


return (
 <div className='w-full'>
 <table className='w-full table-auto'>
<thead>
<tr>
    <th>ID</th>
    <th>Date</th>
    <th>Mode</th>
    <th>Amount</th>
 </tr>

    </thead>
    <tbody>
    {
 dummyArr.map(({ID,Date,Mode,Amount})=>{
   return(
   <tr key={ID}>
    <td>{ID}</td>
    <td>{Date}</td>
    <td>{Mode}</td>
    <td>{Amount}</td>
    </tr>
    )
        })
        }

    </tbody>
 </table>
 </div>
);
}
