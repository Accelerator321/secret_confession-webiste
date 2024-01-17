import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useUrl from '../contexts/Url';
import {TextField,Button, Box} from '@mui/material'
import { useAlert } from '../contexts/AlertPprovider';

function SignIn() {
    const [form,setForm] = useState({ email:"",password:""});
 
    const navigate = useNavigate();
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
                 let res = await fetch(useUrl("/signin"),{
            method:"POST",
            credentials: 'include',
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({...form})
        });
        
        if(res.status==200) {
            setAlert({type:"success", msg:"Logged in"});
            navigate('/');
        }
            
        
        else {
            res = await res.json();
                         setAlert({type:"warning", msg:res.err.msg});
        }
        
    }
  return (
    <div className='container'>
   
    <Box component={"div"} display="flex" flexDirection="row" justifyContent={"center"} className="form-container"
    >
    <Box component="form" display="flex"  flexDirection="column" onSubmit={handleSubmit}
       sx={{p:3}} className='form'
    >
        
        
        
        
        <TextField label="email" color="secondary" type='email' name='email' variant='standard' onChange={handleFormChange} sx={{my:2}}   value={form.email} />
        
        <TextField label="password" color="secondary" type='password' name='password' variant='standard' onChange={handleFormChange} sx={{my:2}} value={form.password} />
        <Box component={"div"} display="flex" flexDirection={"row"} justifyContent={"space-between"}>
        <Link style={{alignSelf:"center"}} to={"/forgotpass"}>Forgot Password</Link>
        <Button variant="contained" type="submit" sx={{width:"3rem"}}>Submit</Button>
        
        </Box>
        
        
    </Box>
    </Box>
    </div>
  )
}

export default SignIn