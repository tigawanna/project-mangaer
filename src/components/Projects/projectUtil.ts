import dayjs  from 'dayjs';



export interface tyme{
  nanoseconds: number,
  seconds:number
}


export const dynColor=(status:string)=>{

if(status==="pending"){
    return '#e30403'
}

if(status==="approved"){
    return '#93C5FD'
}
if(status==="funded"){
    return '#34D399'
}
if(status==="done"){
    return '#4C1D95'
}
}


export const toTyme =(time?:tyme)=>{
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
