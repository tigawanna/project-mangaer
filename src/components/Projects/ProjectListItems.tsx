import React from "react";
import { dynColor } from './projectUtil';
import { useNavigate } from 'react-router-dom';
import { TinyProjectdDtails } from './TinyProjectDetails';
import { ListProjectItem } from './Project';
import { User } from 'firebase/auth';

interface ProjectItemsProps {
  Project: ListProjectItem;
  id: string;
  user?:User|null
}

export const Projectitems: React.FC<ProjectItemsProps> = ({ Project, id ,user}) => {
const navigate = useNavigate();
const theme=dynColor(Project.details.status)
const goFullpage=()=>{
  navigate('/oneproject',{state: {Project,theme,id,from:"oneproject"}})
}
return (
    <div 
    onClick={()=>goFullpage()}
    className="Project-items-container" >
      <div 
        style={{borderColor:theme,borderWidth:"2px",borderRadius:"5px"}
       }
      className="Project-items-contain">
        <div 
        className="Project-item-main">
          <div
            className="h-fill w-[100%] p-2  flex justify-start items-start text-2xl font-extrabold font-boldoverflow-x-clip"
          >
            {Project.title}
          </div>
          <p className="h-fill w-[100%] max-w-full p-1  flex justify-start items-start overflow-x-clip font-medium">
            {Project.desc}
          </p>
        </div>

    <div className="Project-item-details-main-container">
        
    <div className="Project-item-details-container">
{/*@ts-ignore */}
    <TinyProjectdDtails Project={Project} id={id} user={user}/>
      </div>
        <div style={{backgroundColor:theme}}
        className="h-[100%] w-[5%] p-2 md:w-[5%]"></div>
        </div>
      </div>
    </div>
  );
};
