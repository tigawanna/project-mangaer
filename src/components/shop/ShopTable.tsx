import {useState} from "react";
import { Payment } from "./Shop";
import { ShopRow } from "./ShopRow";

interface ShopTableProps {
  payments: Payment[];
}

export const ShopTable: React.FC<ShopTableProps> = ({ payments }) => {

  const [editIdx, setEditIdx] = useState(-69);
  const [data, setData] = useState(payments)
  const [init, setInit] = useState({})
  //@ts-ignore
  const [input, setInput] = useState<Payment>({});

  const handleRemove = (index:number,x:Payment) => {
    console.log(index,data)
    setData(data.filter((row, j) => j !== index));
    console.log(x)
    // props.deleteRecord(x)
    // props.updateDeleteArrears(x)
    // props.deleteRecordHistory(x)
    setEditIdx(-1);
   console.log(index,x,data)

  };

  const startEditing = (index:number, x:Payment) => {
    setInit(x)
    setInput(x)
    setEditIdx(index);
  };

  const stopEditing = (index:number, x:Payment) => {
    if(x===init){
    console.log("nothing changed, not saving===",x,init)  
    setEditIdx(-1);
    }
    console.log("changes happened, saving....",x,init)  
    // props.updateRecord(x,init)
    // props.updateEditArrears(x,init)
    // props.updateRecordHistory(x,init)
 
  };
   
  const handleChange = (e: any) => {
    const { value } = e.target;
    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

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
          {data.map((item, index) => {
            return(
            <ShopRow
            key ={index} 
            payment={item} 
            index={index}
            editIdx={editIdx}
            setEditIdx={setEditIdx}
            startEditing={startEditing}
            stopEditing={stopEditing}
            handleRemove={handleRemove}
            handleChange={handleChange}
            input={input}
            setInput={setInput}
            />);
          })}
        </tbody>
      </table>
    </div>
  );
};
