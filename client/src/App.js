
import './App.css';
import { useEffect } from 'react';
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import Login from './components/Login';
import Createtask from './screen/createemployee';


import Navbar from './components/Navbar';

import Updatetask from './screen/updateemployee';

import Signin from './components/signin';
import Dashboard from './screen/dashboard';
import EmployeeData from './screen/home';

function App() {
  const user=JSON.parse(localStorage.getItem("user"))
  
  const Routing = () => {
    const navigate=useNavigate()
    
    useEffect(()=>{
      if(!user){
        navigate('/login')
      }
    },[user])
    
   
    return(
<Routes>
  <Route path='/' element={<Dashboard/>}/>
  <Route path='/employeelist' element={<EmployeeData/>}/>
  <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Signin/>} />
  <Route path='/createtask' element={<Createtask/>}/>
  <Route path='/updateemployee/:employee_id' element={<Updatetask/>}/>
  


  </Routes>
    )}

  return (
   

<BrowserRouter>
<Navbar/>


<Routing />
  </BrowserRouter>
   
  );
}

export default App;
