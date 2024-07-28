import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import M from "materialize-css";
const Routers = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const user=JSON.parse(localStorage.getItem("user"))
  const handleSignout = () => {

    localStorage.clear();
    Navigate('/login')
}
  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        marginLeft: "20px",
        marginTop: "20px",
      }}
    >
<div>Home</div>
<div>Employee List</div>
<div> {user ?<h4 style={{fontSize:"20px", color:'black',textAlign:'center',marginRight:'20px'}}>Hi, <span style={{color:"golden"}}>{user.name}</span></h4>:null}
            
            </div>
            <div>{ user ? <button className="signout-btn" onClick={handleSignout}>Sign out</button> :null }</div>

     
  
    </div>
  );
};

export default Routers;
