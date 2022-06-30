import React, { useState } from "react";
import { Payment } from "./Shop";
import { formatTyme } from "../../utils/other/util";
import { addComma } from "./shoputil";
import { FaCheck, FaEdit, FaRegWindowClose } from "react-icons/fa";
import { IconContext } from "react-icons";

interface ShopRowProps {
  payment: Payment;
  editIdx:number
  index:number
  setEditIdx: React.Dispatch<React.SetStateAction<number>>
  startEditing: (index: number, x: Payment) => void
  stopEditing: (index: number, x: Payment) => void
  handleRemove: (index: number, x: Payment) => void
  handleChange: (e: any) => void
  input: Payment
  setInput: React.Dispatch<React.SetStateAction<Payment>>
}

export const ShopRow: React.FC<ShopRowProps> = (
  { payment,
    editIdx,
    index,
    setEditIdx,
 
    input,
    setInput,
    startEditing,
    stopEditing,
    handleRemove
  }) => {
let editing = editIdx===index

 
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
    // setEditing(false);
   stopEditing(index,payment)
  };

  const rowInput = (value: any) => {
    //@ts-ignore
    const key = Object.keys(payment).find((key) => payment[key] === value);
    // console.log("value ===", value);
    // console.log("keys ==== ", key);
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
          className="p-1 w-[90%]  rounded-md text-center bg-slate-200 
          text-black border-black border-1 font-medium"
          id={key}
          onChange={handleChange}
          value={value}
        />
      );
    }
  };

  return (
    <tr key={payment.paymentId + index}>
      <td>{rowInput(payment.paymentId)}</td>
      <td>{rowInput(payment.paymentId)}</td>
      <td>{rowInput(payment.date)}</td>
      <td>{rowInput(payment.paymentmode)}</td>
      <td>{rowInput(payment.payment)}</td>

      <td className="flex-center bg-slate-600 p-2 ">
      <IconContext.Provider value={{ size: "20px", className:"text-slate-600" }} >
        {editing ? (
          <FaCheck 
          className="mx-1"
          onClick={(e) => handleSubmit(e)} />
        ) : (
          <FaEdit 
          className="mx-1"
          onClick={() => startEditing(index,payment)} />
        )}
          {editing ? (
         <FaRegWindowClose
          className="mx-1"
              onClick={() => handleRemove(index, payment)}
              />
            ) : null}
      </IconContext.Provider>
      </td>
    </tr>
  );
};
