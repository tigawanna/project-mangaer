import dayjs from 'dayjs';
import { tyme } from './../../utils/other/types';


export const formatTyme =(time?:tyme|Date)=>{

    if(time){
      const ty= new Date(
          //@ts-ignore
        time.seconds * 1000 + time.nanoseconds / 1000000
      
      );
      return dayjs(ty).format("DD/MM/YYYY")
   }  
  
    return dayjs(new Date()).format("DD/MM/YYYY")
   
  }

  export const addComma=(figure:number)=>{
    return figure.toLocaleString()
    }
