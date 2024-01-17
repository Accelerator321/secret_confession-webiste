import React, { createContext, useContext, useEffect, useState } from 'react'
import useUrl from './Url';
import { useAlert } from './AlertPprovider';
const AuthContext = createContext(null);

export function useAuth(){
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null);
  
  const {alert} = useAlert();

  const getUser = async()=>{
    let res = await fetch(useUrl("/getuser"),{
      credentials:"include"
    });
    if(res.status==200){
      let userData = await res.json();
      setUser(userData);
    }
    else{
      setUser(null);
    }
  }


  useEffect(()=>{
    getUser();
  },[alert])
  
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider