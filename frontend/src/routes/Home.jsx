import React, { useEffect, useState } from 'react'
import useUrl from '../contexts/Url';

import SecretsCrad from "../components/SecretsCard"
import { Grid } from '@mui/material';
import { useAlert } from '../contexts/AlertPprovider';

const Home = () => {

    let [secrets,setSecrets] = useState([]);
   
    const {setAlert} = useAlert();

    const handleSecrets = async ()=>{
        let results = await fetch(useUrl("/secrets"));
        if(results.status ===200){
            results = await results.json();
            setSecrets((secrets)=>[...results]);
        }

        else {
          res = await res.json();
                     setAlert({type:"warning", msg:res.err.msg});
      }
        

        
    }
    
    useEffect(()=>{
         handleSecrets();
         console.log(1)

    },[])
  return (
    <>
    
    <div className="container">
    <Grid container spacing={2} >
    {secrets.map((item,key)=> {
      return <Grid key={key} item md={4} lg={4} sm={6} xs={12}> 
    <SecretsCrad  message={item.message} id={item._id}/>
    </Grid>
    

})}
    </Grid>
    </div>
    </>
  )
}

export default Home