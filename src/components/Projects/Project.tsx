import { User } from 'firebase/auth';
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { grabCache } from './grabcache';

interface ProjectProps {
user?:User|null
}

export const Project: React.FC<ProjectProps> = ({user}) => {
const queryClient = useQueryClient()

// queryClient.setQueryData('myData', {diet:"black cocks"})
// const cachedump = queryClient.getQueryData(["user"])
// console.log("cache dump  ==== ",cachedump)

grabCache(queryClient)
return (
 <div className='h-full w-full flex-center'>
proiects
 </div>
);
}
