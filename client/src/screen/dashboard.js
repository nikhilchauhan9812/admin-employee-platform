
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const Dashboard = () => {
  const navigate =useNavigate()
 return (
  <>
     <button style={{border:'none',marginTop:'20px',padding:'5px 10px',color:'blue',backgroundColor:'whitesmoke',cursor:'pointer'}} onClick={() => navigate('/createtask')}> 
            <div style={{ display: 'flex',alignItems:'center',gap:'10px'}}>
               <AddCircleOutlineIcon/> Create Employee
              
              </div>
               </button>
  <div style={{height:'60vh',
    display:'flex' , justifyContent:"center",alignItems:'center'}}>
    <h1 style={{color:'grey'}}>Welcome to Admin Panel </h1>
</div>
 
  </>

  )
}

export default Dashboard