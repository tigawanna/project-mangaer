import React from "react";
import { Payment } from "./Shop";
import { ShopRow } from "./ShopRow";

interface ShopTableProps {
  payments: Payment[];
}

export const ShopTable: React.FC<ShopTableProps> = ({ payments }) => {
  return (
    <div className="w-[100%] h-full text-white p-2 overflow-x-scroll">
      <table className="w-full ">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID</th>
            <th>Date</th>
            <th>Mode</th>
            <th>Amount</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item, index) => {
            return <ShopRow payment={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
