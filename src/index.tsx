import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'



const queryClient = new QueryClient()
// const previous = queryClient.getQueryData(["payments","July"]);
// console.log("previous datda index.tsx === ",previous)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <QueryClientProvider client={queryClient}>
  <ReactQueryDevtools initialIsOpen={false} position={'top-left'}/> 
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </QueryClientProvider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
