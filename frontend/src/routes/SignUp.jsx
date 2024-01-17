import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {TextField,Button, Box} from '@mui/material';
import { useAlert } from '../contexts/AlertPprovider';

const SignUp = () => {
    const [form,setForm] = useState({name:"", email:"",password:""});
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    

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
                 let res = await fetch('http://localhost/otp',{
            method:"POST",
            credentials: 'include',
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({...form})
        });
        if(res.status==200) navigate('/otp',{ state: { url:"http://localhost/signup"} });
        // navigate('/second-route', { state: { yourData: 'Hello from the first route!' } });
        
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
       sx={{ p:3} }
       className="form"
    >
        
        
        <TextField label="Name" color="secondary"  name='name' variant='standard' sx={{my:2}} onChange={handleFormChange} value={form.name} />
        
        
          <TextField label="email" color="secondary" type='email' name='email' variant='standard' onChange={handleFormChange} sx={{my:2}}   value={form.email} />
        
        <TextField label="password" color="secondary" type='password' name='password' variant='standard' onChange={handleFormChange} sx={{my:2}} value={form.password} />
        <Button variant="contained" type="submit" sx={{width:"3rem",alignSelf:"center"}}>Submit</Button>
        
    </Box>
    </Box>
    
    </div>
  )
}

export default SignUp