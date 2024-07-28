import { useNavigate ,Link} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
export default function Navbar() {
  const [open, setOpen] = useState(false);

const navigate=useNavigate()
const user=JSON.parse(localStorage.getItem("user"))
    const handleSignout = () => {
          setOpen(true)
         
        }
        
        const handleAgree = () => {
        localStorage.clear();
        navigate('/login')
        setOpen(false);
      };
    
      const handleDisagree = () => {
        setOpen(false);
      };
    return (
        <div style={{display:'flex',flexDirection:"column"}}>
          
          <img  src='/image.png' height={70} width={90} />

      { user ?

          <div style={{display:'flex', justifyContent:"space-between",borderTop:'1px solid grey',borderBottom:'1px solid grey' ,alignItems:'center'}}>

        <div style={{display:'flex',gap:'20px', marginLeft:"30px"}} >
            <p  style={{fontWeight:"600" , cursor:'pointer'}}onClick={()=>navigate('/')} >Home</p>
      <p style={{fontWeight:"600" , cursor:'pointer'}} onClick={()=>navigate('/employeelist')} >Employee List</p>
      </div>
     <div style={{display:'flex', gap:'20px',alignItems:'center'}}> {user ?<h4 style={{fontSize:"20px", color:'black',}}>Hi, <span style={{color:"golden"}}>{user.name}</span></h4>:null}
            
            
            { user ? <button className="signout-btn" onClick={handleSignout}>Sign out</button> :null }</div>

     
        </div>:null
  
}
    
       
        <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {"Confirm Sign out"}
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
          Signout
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}