import { createContext, useState } from "react";

export let counterContext=createContext();

export default function CounterContextBrovider(props){

   const [counter,setCounter]=useState(10)

   function increase(){
    setCounter(counter+1)
   }
    return<>
    
    <counterContext.Provider value={{counter,increase}}>{props.children}</counterContext.Provider>
    </>
}
