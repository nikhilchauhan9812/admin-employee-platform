import React, { useState } from 'react';
import './sigin.css';
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';

const Signin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [name, setName] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  
  const postdata=()=>{
    setLoader(true);

    const newemail = email.toLowerCase()
    if(!newemail || !password || !name){
      setLoader(false);

      return enqueueSnackbar('please enter all the feilds!', { variant:'error' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );
      
    }
    
    
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      setLoader(false);
    
      return enqueueSnackbar('Invalid email format!', { variant:'error' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );
   

  }
  fetch('/signup',{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      email:newemail,
      password
    })
  }).then(res =>res.json()).then(data=>{
    if(data.error){
      setLoader(false);

   enqueueSnackbar(data.error, { variant:'error' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );

    }else{  
      setLoader(false);

      enqueueSnackbar(data.message, { variant:'success' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );

    navigate('/login')
    }
  }).catch(err=>{
    console.log(err)
  })
}
  return (
    <div style={{ height: '91vh', backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="signincard">
        <h5 className="welcome-text">
          Sign in to your  account
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <label>Full Name</label>
              <input onChange={(e) => setName(e.target.value)} type='email' className='sigininput' placeholder='full name' />
            </div><div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <label>Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} type='email' className='sigininput' placeholder='Email Address' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type='password' className='sigininput' placeholder='Password' />
            </div>
          </div>
          <button onClick={postdata} className='siginbutton'>
         
          {loader ? <CircularProgress style={{color:'white'}}/> : 'signup'}
       
            </button>
          <p>Already have an account?<Link to='/login'>Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
