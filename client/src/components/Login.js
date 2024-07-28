
import React, { useState } from 'react';
import './sigin.css';
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);


  const navigate = useNavigate();

  const postdata=()=>{
    setLoader(true);
    if(!email || !password){
      setLoader(false);
     return enqueueSnackbar('please enter all the feilds!', { variant:'error' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );
     
    }


  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    setLoader(false);
    return enqueueSnackbar('Invalid email format!', { variant:'error' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );
   

  }
  fetch('/signin',{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
   
      email,
      password
    })
  }).then(res =>res.json()).then(data=>{
    if(data.error){
      setLoader(false);
   enqueueSnackbar(data.error, { variant:'error' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );

    }else{  
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user",JSON.stringify(data.user))
      
      enqueueSnackbar("Successfully signed in", { variant:'success' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );
      setLoader(false);     
      navigate("/");
    }
  }).catch(err=>{
    console.log(err)
  })
}
  return (
    <div style={{ height: '91vh', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="signincard">
        <h5 className="welcome-text">
         Log in to your  account
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            
          
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <label>Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} type='email' className='sigininput' placeholder='Email Address' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type='password' className='sigininput' placeholder='Password' />
            </div>
          </div>
          <button onClick={postdata} className='siginbutton'>
           
          {loader ? <CircularProgress style={{color:'white',fontSize:'12px'}}/> : ' Login'}
            </button>

          <p>
         Don't have an account?<Link to="/signup">signup</Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

