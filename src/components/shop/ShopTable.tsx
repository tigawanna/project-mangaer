import React from 'react'
import { Payment } from './Shop';
import { formatTyme } from './../../utils/other/util';
import { addComma } from './shoputil';

interface ShopTableProps {
payments:Payment[]
}

export const ShopTable: React.FC<ShopTableProps> = ({payments}) => {
     
    
    
    return (
     <div className='w-[100%] h-full text-white p-2 overflow-x-scroll'>
     <table className='w-full '>
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
     payments.map(({paymentId,date,paymentmode,payment},index)=>{
       return(
       <tr key={paymentId}>
        <td>{paymentId}</td>
        <td>{paymentId}</td>
        <td>{formatTyme(date)}</td>
        <td>{paymentmode}</td>
        <td>{addComma(parseInt(payment))}</td>
        </tr>
        )
            })
            }
    
        </tbody>
     </table>
     </div>
    );
    }
    
