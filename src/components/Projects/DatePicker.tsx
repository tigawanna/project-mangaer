import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import "./picker.css"

interface DatePickerProps {
selected:Date|undefined,
setSelected: React.Dispatch<React.SetStateAction<Date | undefined>>,
open:boolean,
setOpen: React.Dispatch<React.SetStateAction<boolean>>,

}

export const DatePickerComp: React.FC<DatePickerProps> = ({selected,setSelected,open,setOpen}) => {

  const today=new Date()  
  const currenttime= today.getTime()
  const selectedMs=selected?.getTime() as number

  const deadline=()=>{
  const start =Math.floor(currenttime/3600000)
  const end =Math.floor(selectedMs/3600000)
  const dead = end - start
  const deadline = dead===0?dead:dead+10
  return deadline
  }




        let footer = <p>Please pick a day.</p>;
        if (selected) {
          footer = <p className='text-sm'>Deadline {format(selected, 'PP')}, which is :{deadline()} hrs away</p>;
        }
        return (
      <div className=" w-fit h-fit max-h-[95%] p-1 bg-black flex flex-col-reverse justify-center items-center text-white ">
      { open?<DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
      captionLayout="dropdown"
      fromDate={today}
     
      />:null}
      <div className="cursor-pointer text-xs text-center"
      onClick={()=>{setOpen(!open)}}>
        {open?"hide":"add deadline"}</div>
      </div>
        
        );
}
