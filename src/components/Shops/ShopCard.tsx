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
      className=" p-5 m-1 flex-col bg-slate-500 shadow-md shadow-purple-900 
                           hover:shadow-lg rounded w-[95%] md:w-[30%] ">
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
  const selected = current === floor ? { background: "purple" } : {};
  return (
    <div
      className="w-24 h-fit p-2 m-1 bg-slate-500 hover:bg-slate-600 text-lg font-normal 
 text-center capitalize cursor-pointer"
      onClick={() => floorClicked(floor)}
      style={selected}
    >
      {floor}
    </div>
  );
};



interface AddShopCardProps {
 
  }
  
  export const AddShopCard: React.FC<AddShopCardProps> = ({ }) => {
    return (
      <div className=" p-5 m-1 flex-center bg-slate-500 shadow-md shadow-purple-900 
      hover:shadow-lg rounded w-[95%] md:w-[30%] ">
         <IconContext.Provider value={{ size: "45px", className: "table-edit-icons" }} >
         <FaPlus/>
         </IconContext.Provider>
    
      </div>
    );
  };
