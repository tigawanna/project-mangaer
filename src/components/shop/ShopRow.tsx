import React, { useState } from "react";
import { Payment } from "./Shop";
import { formatTyme } from "./../../utils/other/util";
import { addComma } from "./shoputil";
import { FaCheck, FaEdit } from "react-icons/fa";

interface ShopRowProps {
  payment: Payment;
}

export const ShopRow: React.FC<ShopRowProps> = ({ payment }) => {
  const [editing, setEditing] = useState(false);

  const [input, setInput] = useState<Payment>(payment);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submitting === ", input);
    setEditing(false);
  };

  const rowInput = (value: any) => {
    //@ts-ignore
    const key = Object.keys(payment).find((key) => payment[key] === value);
    console.log("value ===", value);
    console.log("keys ==== ", key);
    if (!editing) {
      if (key === "date") {
        return (
          <p className="p-2 w-[100%]  rounded-md "> {formatTyme(value)}</p>
        );
      }
      if (key === "payment") {
        return (
          <p className="p-2 w-[100%]  rounded-md ">
            {" "}
            {addComma(parseInt(value))}
          </p>
        );
      }
      return <p className="p-2 w-[100%]  rounded-md ">{value}</p>;
    } else {
      return (
        <input
          type="text"
          placeholder={key}
          className="p-1 w-[95%]  rounded-md text-center bg-slate-200 text-black border-black border-1 font-medium"
          id={key}
          onChange={handleChange}
          value={value}
        />
      );
    }
  };

  return (
    <tr key={payment.paymentId}>
      <td>{rowInput(payment.paymentId)}</td>
      <td>{rowInput(payment.paymentId)}</td>
      <td>{rowInput(payment.date)}</td>
      <td>{rowInput(payment.paymentmode)}</td>
      <td>{rowInput(payment.payment)}</td>

      <td className="flex-center bg-slate-600 p-2 ">
        {editing ? (
          <FaCheck onClick={(e) => handleSubmit(e)} />
        ) : (
          <FaEdit onClick={() => setEditing(!editing)} />
        )}
      </td>
    </tr>
  );
};
