import React from 'react'
import { ListProjectItem } from './Project';

import { toTyme } from './projectUtil';
import { User } from 'firebase/auth';




interface TinyDetailsProps {
Project:ListProjectItem,
user?:User|null
}

export const TinyProjectdDtails: React.FC<TinyDetailsProps> = ({Project,user}) => {


    const status=Project.details.status
    const frequency=Project.details.frequency
    const addedby=Project.details.addedBy 
    const addedon=Project.details.addedon  
    const deadline=Project.details.deadline 
    const editedBy=Project.details.editedBy
    const editedOn=Project.details.editedOn 
    const approvedOn=Project.details.approvedOn 
    const fundedOn=Project.details.fundedOn
    const doneOn=Project.details.doneOn 
    
if(!Project){
return <div>loading details</div>
} 
 
return (
<div className=" flex flex-col p-1 ">


{/* edited tab*/}
<div className=" flex ">
{
editedBy?
<div className="Project-item-detail-item">
<div className="label-style">Edited By : </div>
<div>{Project.details.editedBy}</div>
</div>:null
}
{
editedOn?
<div className="Project-item-detail-item">
<div className="label-style">edited on : </div>
<div>{toTyme(editedOn) }</div>
</div>:null
 }

</div>
{/* addeded tab , shows on top if in onescreen*/}
<div className=" flex ">
{
addedby?
<div className="Project-item-detail-item">
<div className="label-style">Added By : </div>
<div>{user?.displayName}</div>
</div>:null
}

{
addedon?
<div className="Project-item-detail-item">
<div className="label-style">Added On : </div>
<div>{ toTyme() }</div>
</div>:null
 }

</div>


{/* status */}

<div className=" flex flex-wrap mb-2 bg-slate-400">
{/* status tab */}
<div>
{
status?
<div className="Project-item-detail-status">
<div className="label-style">Status :</div>
<div>{status}</div>
</div>:null
}
 </div>


{/* approvr on */}

<div>
{approvedOn?
<div className="Project-item-detail-status">
<div className="label-style">Approved On:</div>
<div> {toTyme(approvedOn)}</div>
</div>:null
}
</div>

{/* funded on , only show if approved*/}


<div>
{fundedOn?
<div className="Project-item-detail-status">
<div className="label-style">Funded On:</div>
<div> {toTyme(fundedOn)}</div>
</div>:null
}
</div>

{/* done on , only show if funded*/}

<div>
{doneOn?
<div className="Project-item-detail-status">
<div className="label-style">Dune On:</div>
<div> {toTyme(doneOn)}</div>
</div>:null
}
</div>
{/* end of status */}
</div>

{/* frquency ,editable field */}
<div className=" flex mb-2">
{
frequency?
<div className="Project-item-detail-freq">
<div className="label-style">Frequency :</div>
<div> {frequency}</div>
</div>:null
}
</div>    
{/* deadline date/date picker, editable field*/}
   {
   deadline!==null&&deadline?
   <div className="Project-item-detail-item ">
    <div className="label-style">Deadline : </div>
    <div>{ toTyme(deadline) }</div>
  </div>:null
  }

    </div>

);
}
