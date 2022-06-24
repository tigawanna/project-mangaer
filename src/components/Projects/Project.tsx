import { User } from 'firebase/auth';
import React from 'react'

interface ProjectProps {
user?:User|null
}

export const Project: React.FC<ProjectProps> = ({user}) => {
return (
 <div className='h-full w-full flex-center'>
Project
 </div>
);
}
