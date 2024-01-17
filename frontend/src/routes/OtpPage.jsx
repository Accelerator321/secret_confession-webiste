import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {TextField,Button, Box} from '@mui/material'
import { useAlert } from '../contexts/AlertPprovider';

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const url = location.state?.url || null;
  const {setAlert} = useAlert();
  const navigate = useNavigate();



  const handleSubmitWithOtp = async (e) => {
    e.preventDefault();
    let res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });
    if(res.status==200){
     
      setAlert({type:"success", msg:"successfull"});
      navigate("/");

    }
    else {
      res = await res.json();
             setAlert({type:"warning", msg:res.err.msg});
  }
  };
  useEffect(()=>{
    console.log(url)
    if (url==null) navigate("/");
  },[])
  return (
    <div className='container'>
      
  <Box component={"div"} display="flex" flexDirection="row" justifyContent={"center"} className="form-container"
    >
    <Box component="form" display="flex" flexDirection="column" onSubmit={handleSubmitWithOtp}
       sx={{  p:3}}
       className = "form"
    >
        
        <TextField label="Otp" color="secondary" name='otp' variant='standard' sx={{my:2}} 
          value={otp}
          onChange={(e) => setOtp(e.target.value)} />
        <Button variant="contained" type="submit" sx={{width:"3rem",alignSelf:"center"}}>Submit</Button>
        
    </Box>
    </Box>
    </div>
  );
};

export default OtpPage;
