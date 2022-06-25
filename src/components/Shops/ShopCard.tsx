import React from "react";
import { FaPlus } from "react-icons/fa";
import { Shop } from "../../utils/other/types";
import { IconContext } from 'react-icons';

interface ShopCardProps {
  shop: Shop;
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  return (
    <div
      className=" p-4 m-1 flex-col bg-slate-500 hover:shadow-purple-900 
                           hover:shadow-lg rounded w-[90%] md:w-[30%] ">
      <div className="text-xl font-bold">{shop.shopnumber}</div>
      <div className="h-[80%] flex-col justify-end items-end">
        <div className="text-lg">{shop.shopfloor}</div>
        <div className="text-6xl capitalize">{shop.shopname}</div>
        <div className="text-lg font-medium">{shop.monthlyrent}</div>
      </div>
    </div>
  );
};




interface ShopFloorProps {
  floor: string;
  setFloor: React.Dispatch<React.SetStateAction<string>>;
  current: string;
}

export const ShopFloor: React.FC<ShopFloorProps> = ({
  floor,
  setFloor,
  current,
}) => {
  const floorClicked = (floor: string) => {
    setFloor(floor);
  };
  const selected = current === floor ? { background: "#475569",color:"white" } : {};
  return (
    <div
      className="w-24 h-fit p-2 m-1 bg-slate-200 hover:bg-slate-600 hover:text-white text-xl font-bold 
       text-center capitalize cursor-pointer "
      onClick={() => floorClicked(floor)}
      style={selected}
    >
      {floor}
    </div>
  );
};



interface AddShopCardProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
  
  export const AddShopCard: React.FC<AddShopCardProps> = ({ open,setOpen}) => {
    return (
      <div 
      onClick={()=>setOpen(!open)}
      className="  p-12 m-1 flex-center bg-slate-500 hover:shadow-purple-900 
      hover:shadow-lg rounded w-[90%] md:w-[30%] ">
         <IconContext.Provider value={{ size: "75px", }} >
         <FaPlus/>
         </IconContext.Provider>
    
      </div>
    );
  };
