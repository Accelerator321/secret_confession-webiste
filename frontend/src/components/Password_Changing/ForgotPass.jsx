

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useUrl from '../../contexts/Url';
import { useAuth } from '../../contexts/AuthProvider';
import {TextField,Button, Box} from '@mui/material'
import { useAlert } from '../../contexts/AlertPprovider';

const ForgotPass = () => {
    const [form,setForm] = useState({ email:"",password:""});
   
    const navigate = useNavigate();
    const user = useAuth();
    const {setAlert} = useAlert();
    

    const handleFormChange = (e)=>{
        const name = e.target.name;
        // const [otpPage,setOtp] = useState(true)

        setForm((form)=>
        {
        return {...form,[name]:e.target.value};
    })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
                 let res = await fetch(useUrl("/otp"),{
            method:"POST",
            credentials: 'include',
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({...form})
        });
        if(res.status==200) navigate('/otp',{state:{url:useUrl("/changepassword")}});
        // navigate('/second-route', { state: { yourData: 'Hello from the first route!' } });
        else {
          res = await res.json();
                     setAlert({type:"warning", msg:res.err.msg});
      }
        
    }
    useEffect(()=>{
        if(user) setForm((form)=>{return {...form,email:user.email}});
    },[user])
  return (
    <div className='container'>
    
    <Box component={"div"} display="flex" flexDirection="row" justifyContent={"center"} className="form-container"
    >
    <Box component="form" display="flex" flexDirection="column" onSubmit={handleSubmit}
       sx={{  p:3}}
       className='form'
    >
        
        <TextField label="email" color="secondary"  variant='standard' sx={{my:2}} 
          type='email' value={form.email} name="email" onChange={handleFormChange}
          disabled={user?true:false} />

        <TextField label="new password" color="secondary" variant='standard' sx={{my:2}} 
          value={form.password} name="password" onChange={handleFormChange} />

        <Button variant="contained" type="submit" sx={{width:"3rem",alignSelf:"center"}}>Submit</Button>
        
    </Box>
    </Box>
    </div>
  )
}

export default ForgotPass