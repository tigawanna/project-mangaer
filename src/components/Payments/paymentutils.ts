const d = new Date();
let month = [];
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
export const getmonth= month[d.getMonth()];
export const monthindex=d.getMonth();
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
export const minimonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const monthsmap = {
    "January":0,
    "February":1,
    "March":2,
    "April":3,
    "May":4,
    "June":5,
    "July":6,
    "August":7,
    "September":8,
    "October":9,
    "November":10,
   "December":11
}


export const getMonthIndex=(index:string)=>{
    //@ts-ignore
    return monthsmap[index]
}

