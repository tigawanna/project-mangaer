import React, { useState } from "react";
import { collection, limit, orderBy, query,where } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { TheTable } from "table-for-react";
import { Payment as PaymentType} from "./../../utils/other/types";
import { header } from "../../utils/payment-vars";
import { IconContext } from "react-icons";
import { FaRegEdit, FaTimes, FaPlus, FaPrint } from "react-icons/fa";
import { PaymentForm } from "./PaymentForm";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { monthindex, months,getMonthIndex, getmonth } from "../../utils/paymentutils";
import { deletePayment, setPayment, dummy_payment, insert_dummy_to_cache } from './../../utils/sharedutils';
import { findFloor } from './../../utils/other/util';

import { useQueryClient} from 'react-query';

interface paymentProps {
  user?: User | null;
}



export const Payment: React.FC<paymentProps> = ({ user }) => {
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState({ name: "", error: "" });
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<string>(getmonth);
  const navigate = useNavigate();
  const queryClient = useQueryClient() 

  const validate = (prev: any, current: any) => {
    setError({ name: "", error: "" });
    return true;
  };

  const saveChanges = (prev: PaymentType, current:PaymentType) => {
    // console.log("saving ...",current)
    const item: PaymentType = {
      date: current.date,
      shopnumber: current.shopnumber.toUpperCase(),
      madeBy: current.madeBy,
      month: current.month,
      payment: current.payment,
      paymentmode: current.paymentmode,
      paymentId: current.paymentId,
      editedBy: user?.displayName,
      editedOn: new Date(),
    };
    setPayment(item, current.paymentId,findFloor(current.shopnumber),current.shopnumber,queryClient);
  };

  const deleteRow = (current:PaymentType) => {
    // console.log("delteing current ,",current)
    setError({name:"name",error:"not john"})
    deletePayment(current,findFloor(current.shopnumber),current.shopnumber,queryClient)
  };

  const clearError = () => {
    setError({ name: "", error: "" });
  };

  const selectMonth = (index: number) => {
    setMonth(months[index]);
};


  const paymentRef = query(collection(db, "payments"), orderBy("date", "desc")
  // ,where('month', "==" , month)
  );
  const paymentQuery = useFirestoreQueryData(["payments",month], paymentRef,{
  
  });

  if (paymentQuery.error && month === getmonth) {
    insert_dummy_to_cache(dummy_payment,["payments",getmonth],queryClient)
   }

  if (paymentQuery.error) {
    return (
      <div className="w-full h-full flex flex-wrap  text-red-900">
        ERROR LOADING payments {paymentQuery.error.message}
      </div>
    );
  }

  if (paymentQuery.isLoading) {
    return <div className="w-full h-full flex-center"> loading ..... </div>;
  }

  const payments = paymentQuery.data as PaymentType[];
 
//  console.log("paymets being sent to table ====== ",payments)

 return (
    <div className="w-full h-[85%] overflow-y-hidden absolute">

      <div className="h-fit w-full bg-slate-400  flex-wrap flex-center relative top-0 
      right-1 left-1 p-1">
        <div className="h-full w-fit bg-slate-600 p-2  flex-center rounded-xl">
          <IconContext.Provider
            value={{
              size: "25px",
              className: "mx-[15px] text-white hover:text-purple-600",
            }}
          >
            <FaRegEdit onClick={() => setUpdate(!update)} />
            {!open ? (
              <FaPlus onClick={() => setOpen(!open)} />
            ) : (
              <FaTimes onClick={() => setOpen(!open)} />
            )}
            <FaPrint
              onClick={() =>
                navigate("/print-preview", {
                  state: {
                    rows: payments,
                    header,
                    title: `payments for ${payments[0].month}`,
                  },
                })
              }
            />
          </IconContext.Provider>
        </div>
        <div className="  ml-3 flex-center flex-wrap">
          {/* eslint-disable-next-line array-callback-return */}
          {months.map((item, index) => {
            if (index <= monthindex) {
              return (
                <div
                style={{ backgroundColor:index === getMonthIndex(month) ? "purple" : "",
                  }}
                  key={index}
                  onClick={() => selectMonth(index)}
                  className="w-fit m-1 bg-slate-600 hover:bg-purple-700 p-2 text-white 
                  cursor-pointer rounded-lg"
                >
                  {item}
                </div>
              );
            }
          })}
        </div>
      </div>

      {open ? (
        <div className="bg-slate-700 fixed z-50 w-full h-full">
          <PaymentForm user={user} open={open} setOpen={setOpen} queryClient={queryClient}/>
        </div>
      ) : null}

      <div className="absolute h-full w-full z-40 overflow-x-scroll lg:overflow-x-hidden">
        <TheTable
          rows={payments}
          header={header}
          update={update}
          error={error}
          validate={validate}
          saveChanges={saveChanges}
          deleteRow={deleteRow}
          clearError={clearError}
        />
      </div>
    </div>
  );
};
