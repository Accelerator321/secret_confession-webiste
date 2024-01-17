import React, { useEffect, useState } from 'react'
import useUrl from '../contexts/Url';
import { useNavigate } from 'react-router-dom';
import {TextField,Button, Box, TextareaAutosize} from '@mui/material'
import { useAuth } from '../contexts/AuthProvider';
import { useAlert } from '../contexts/AlertPprovider';
const PostSecret = () => {
    const [text,setText] = useState("");
    
    const user = useAuth();
    const {setAlert} = useAlert();
   
    
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const options = {
            method:"POST",
            credentials: 'include',
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({message:text}),

        }
        let res =await fetch(useUrl('/secrets'),options);
                 if(res.status==200) navigate('/');
        else {
            res = await res.json();
                         setAlert({type:"warning", msg:res.err.msg});
        }
    }

    useEffect(()=>{
        if(!user) navigate('/signin');
    })
  return (
    <div className='container'>
        
        <Box component={"div"} display="flex" flexDirection="row" justifyContent={"center"} className="secret-form-container"
    >
    <Box component="form" display="flex"  flexDirection="column" onSubmit={handleSubmit}
       sx={{ p:3} }
       className="secret-form"
    >
            secret:
            <textarea type="text" value={text} rows={20} cols={5} 
            onChange={(e)=>setText(e.target.value)}/>
            
            
            
             
              
            <Button variant="contained" type="submit" sx={{width:"3rem",alignSelf:"center"}}>Post</Button>
                
    </Box>
    </Box>
    
    </div>
  )
}

export default PostSecret