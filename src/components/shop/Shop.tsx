import { User } from "firebase/auth";
import React, { useState } from "react";
import { ShopDetails } from "./ShopParts";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { query, collection, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useLocation } from "react-router-dom";
import { Payment, Shop as ShopType } from "../../utils/other/types";
import { useNavigate } from "react-router-dom";
import { TheTable } from "table-for-react";
import { header } from "./shop-table-yars";
import { IconContext } from "react-icons";
import { FaRegEdit, FaPrint, FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { setPayment,deletePayment } from "../../utils/sharedutils";
import { QueryClient } from "react-query";


interface ShopProps {
  user?: User | null;
  floor: string;
  shopId: string;
}

export const Shop: React.FC<ShopProps> = ({ user }) => {
  const { state } = useLocation();
  const shop = state as ShopType;
  const queryClient = new QueryClient()
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState({ name: "", error: "" });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const validate = (prev:Payment, current:Payment) => {
    if(current.payment<1000){
      setError({ name: "payment", error: "payment seems too low, 1k minimun" });
      return false      
    }
    // if(current.paymentmode!=="cash_deposit"||"cheque"||"mpesa"||"direct_transfer"){
    //   setError({ name: "paymentmode", error: "payment mode unrecognized" });
    //   return false      
    // }
    // if(current.paymentmode!=="cash_deposit"){
    //   setError({ name: "paymentmode", error: "payment mode unrecognized" });
    //   return false      
    // }

    setError({ name: "", error: "" });
    return true;
  };

  const saveChanges = (prev:Payment, current: Payment) => {
    console.log("saving ...", current);

    const item: Payment = {
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
    setPayment(item, current.paymentId, shop.shopfloor, 
      shop.shopnumber,["payment",shop?.shopfloor, shop?.shopnumber]);
  };

  const deleteRow = (current: any) => {
    console.log("delteing current ,",current)
    deletePayment(current.paymentId, shop.shopfloor, shop.shopnumber);
  };

  const clearError = () => {
    setError({ name: "", error: "" });
  };

  

  const paymentRef = query(
    collection(
      db,
      "shops",
      shop?.shopfloor,
      "shops",
      shop?.shopnumber,
      "paymenthistory"
    ),
    orderBy("date", "desc")
  );

  const paymentQuery = useFirestoreQueryData(
    ["payment", shop?.shopfloor, shop?.shopnumber],
    paymentRef
  );



  const payments = paymentQuery.data as Payment[];

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

  console.log(payments);
  return (
    <div className="h-full w-full bg-slate-600 overflow-y-hidden">
      <div
        className="h-fit w-full bg-slate-400  flex-wrap flex-center relative top-0 
      right-1 left-1 p-1"
      >
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
                    title: `${payments[0].month} payments for ${shop.shopname}`,
                  },
                })
              }
            />
          </IconContext.Provider>
        </div>
      </div>

      <div className="w-full h-fit bg-slate-500 overfloe-x-hidden">
        <ShopDetails shop={shop} />
      </div>
      <div
        className="w-full h-fit z-40 overflow-x-scroll lg:overflow-x-hidden 
flex justify-center"
      >
        <div className="absolute w-[99%] bg-white ">
          <TheTable
            rows={payments}
            error={error}
            update={update}
            validate={validate}
            saveChanges={saveChanges}
            deleteRow={deleteRow}
            header={header}
            clearError={clearError}
          />
        </div>
      </div>
    </div>
  );
};
