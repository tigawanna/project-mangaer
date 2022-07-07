import React from 'react'
import { TheTable } from 'table-for-react';

const error = { name: "", error: "" };

const validate = (prev: any, current: any) => {
return true;
};

const saveChanges = (prev: any, current: any) => {};

const deleteRow = (current: any) => {};

const clearError = () => {};

type MyProps = {
  // using `interface` is also ok
title:string  
ref: React.MutableRefObject<null>
header:{name:string,prop:string,type:string,editable:boolean}[],
rows:any[]
};
type MyState = {
  title:string
  header:{name:string,prop:string,type:string,editable:boolean}[],
  rows:any[]
}

export class PrintThis extends React.Component<MyProps, MyState> {
    constructor(props:any){
        super(props);
        this.state={
            header:this.props.header,
            rows:this.props.rows,
            title:this.props.title
        }

    }

    render() {
    console.log("class components recieving head === ",this.state)
      return (
        <div className='m-9'>
         <div  className="capitaliza text-xl font-bold m-1">{this.state.title}</div> 
        <TheTable
         rows={this.state.rows}
         header={this.state.header}
        error={error}
        update={false}
        validate={validate}
        saveChanges={saveChanges}
        deleteRow={deleteRow}
        clearError={clearError}
        />
      </div>
      );
    }
  }
