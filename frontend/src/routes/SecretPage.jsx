import { Card, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useUrl from '../contexts/Url';
import { useParams } from 'react-router-dom';
import { useAlert } from '../contexts/AlertPprovider';

const SecretPage = () => {
    const {id}  = useParams();
    const  [content, setContent] = useState("");
    

    const getContent = async ()=>{
        let res= await fetch(useUrl("/secretsbyid"),{
            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({id})
        })

        if(res.status==200){
            res = await res.json();
            setContent(res.message);
        }

        else setContent("there was some error in loading the data");

    }
    useEffect(()=>{
        getContent();
    },[])
  return (
    
    <div className='container'>
    <Card sx={{width:"95vw",margin:"auto"}}>
        <CardContent>
            {content}
        </CardContent>
    </Card>
    </div>
  )
}

export default SecretPage