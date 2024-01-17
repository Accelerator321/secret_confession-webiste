import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import { useAlert } from '../contexts/AlertPprovider';


const MyAlert = () => {
    const {alert} = useAlert();
    const [display, setDisplay] = useState("none");
         
    const handleDisplay = ()=>{
        
        setDisplay("none");
    }
    useEffect(()=>{
        if(alert.msg) setDisplay("flex");
        let tout = setTimeout( handleDisplay, 4000);
        return ()=>{
            clearTimeout(tout);
        }
    },[alert])
  return (
    <>
    {/* `${display}` */}
    <Alert severity={alert.type||"info"} sx={{display:`${display}`, zIndex:"10",position:"relative"}}>
        {alert.msg}
    </Alert>

    </>
  )
}

export default MyAlert