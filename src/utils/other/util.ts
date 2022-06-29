import dayjs  from 'dayjs';
import { tyme } from './types';





export const formatTyme =(time?:tyme)=>{
  if(time){
    const ty= new Date(
        //@ts-ignore
      time.seconds * 1000 + time.nanoseconds / 1000000
    
    );
    return dayjs(ty).format("DD/MM/YYYY")
 }  

  return dayjs(new Date()).format("DD/MM/YYYY")
 
}

export const justTym =(time:tyme|null|undefined)=>{
    if(time){
      const ty= new Date(
          //@ts-ignore
        time.seconds * 1000 + time.nanoseconds / 1000000
      );
   return ty
   }  
   return null
   
  }

  
  
