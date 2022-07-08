
import { QueryClient } from 'react-query';

export const grabCache=(queryClient:QueryClient)=>{
    queryClient.setQueryData('myData', {diet:"black cocks"})
    const cachedump = queryClient.getQueryData(["user"])
    console.log("cache dump  ==== ",cachedump)
}
