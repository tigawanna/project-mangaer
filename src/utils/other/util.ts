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


  export const findfloor=(shopnumber:string)=>{
  const floormaps=[
   ["G-" ,"ground"],
   ["M1-","first"],
   ["M2-","second"],
   ["M3-","third"],
   ["M4-","fourth"],
   ["M5-","fifth"],
  ]
  let floor="ground"
  for(let i=0; i<floormaps.length; i++){
   if(shopnumber.includes(floormaps[i][0])){
    floor = floormaps[i][1]
    break
   } 
  }
 return floor
  }

  
  

