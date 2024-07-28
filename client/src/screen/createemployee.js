import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';

const Createtask = () => {
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [course, setCourse] = useState([]);
  const [gender, setGender] = useState();
  const [designation, setDesignation] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [url , setUrl] = useState()
  const [bcaChecked, setBcaChecked] = useState(false);
  const [mcaChecked, setMcaChecked] = useState(false);
  const [bscChecked, setBscChecked] = useState(false);
  const [loader,setloader] = useState(false)
  
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const handleCourseChange = (event) => {
    const { name, checked } = event.target;
    setCourse((prevCourses) => {
      if (checked) {
        return [...prevCourses, name];
      } else {
        return prevCourses.filter((course) => course !== name);
      }
    });
  };
console.log(image)
useEffect(()=>{
  if(url){
        const newmail = email.toLowerCase();
    fetch('/createemployee', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        name,
        email:newmail,
        mobile,
        designation,
        gender,
        course,
        image:url
      })
  }).then(res => res.json()).then(data => {
    if (data.error) {
      setloader(false)

    enqueueSnackbar(data.error, { variant:'error' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );

      
  } else {
    enqueueSnackbar( data.message, { variant:'success' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );
    navigate('/employeelist');
  }
}).catch(err => {
  console.log(err);
});
}

},[url])

const postdata = () => {
  setloader(true)
    if (!name || !email || !mobile || !designation||!image || !gender || course.length === 0) {
      setloader(false)
      return enqueueSnackbar('please enter all the feilds!', { variant:'error' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );
     
    }
    if(mobile){
      if(!/^[0-9]{10}$/.test(mobile)){
      setloader(false)
                    
        return enqueueSnackbar('Invalid mobile number', { variant:'error' ,  anchorOrigin:{vertical:'top', horizontal:'right' }} );

    }
    }
    const data= new FormData()
    data.append('file',image)
    data.append('upload_preset',"flicksee")
  data.append('cloud_name',"dpsvrdlmt")
  fetch('https://api.cloudinary.com/v1_1/dpsvrdlmt/image/upload',{
    method:"post",
    body:data
    
  }).then(res=>res.json()).then(data=>{
    setUrl(data.url)
    

    
  }).catch(err=>{
    console.log(err);
  })
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: '2px',
        width: '100%'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'ButtonFace', padding: '20px', width: '30%' }}>
        <h2 style={{ textAlign: "center" }}>Create Employee</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Full Name</label>
          <input onChange={(e) => setName(e.target.value)} type='text' className='sigininput' placeholder='Full Name' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)} type='email' className='sigininput' placeholder='Email Address' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Mobile</label>
          <input onChange={(e) => setMobile(e.target.value)} type='text' className='sigininput' placeholder='Mobile' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Designation</label>
          <select onChange={(e) => setDesignation(e.target.value)} className='sigininput'>
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <FormControl>

        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => setGender(e.target.value)}

        >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
       
       
      </RadioGroup>
        </FormControl>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Courses</label>
          <div>
            <Checkbox
              name="BCA"
              checked={bcaChecked}
              onChange={(e) => {
                handleCourseChange(e);
                setBcaChecked(e.target.checked);
              }}
              inputProps={{ 'aria-label': 'BCA' }}
            /> BCA
            <Checkbox
              name="MCA"
              checked={mcaChecked}
              onChange={(e) => {
                handleCourseChange(e);
                setMcaChecked(e.target.checked);
              }}
              inputProps={{ 'aria-label': 'MCA' }}
            /> MCA
            <Checkbox
              name="BSC"
              checked={bscChecked}
              onChange={(e) => {
                handleCourseChange(e);
                setBscChecked(e.target.checked);
              }}
              inputProps={{ 'aria-label': 'BSC' }}
            /> BSC
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Image Upload</label>
          <input type='file'accept=".jpg, .jpeg, .png"  onChange={(e) => setImage(e.target.files[0])} className='sigininput' />
        </div>
        <Button onClick={postdata} variant="contained">
          { loader?
        <CircularProgress style={{color:'white'}}/>:
          'Create'
          }
        </Button>
      </div>
    </div>
  );
}

export default Createtask;
