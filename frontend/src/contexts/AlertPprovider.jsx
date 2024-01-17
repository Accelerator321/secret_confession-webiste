import React, { createContext, useContext, useState } from 'react'

const AlertConetxt = createContext();


export function useAlert(){
  return useContext(AlertConetxt);
}
const AlertProvider = ({children}) => {

  const [alert,setAlert] = useState({type:null,msg:null});
  const value = {
    alert, setAlert
  }
     return (
    <AlertConetxt.Provider value={value}> 
      {children}
    </AlertConetxt.Provider>
  )
}

export default AlertProvider