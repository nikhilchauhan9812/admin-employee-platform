import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [course, setCourse] = useState([]);
  const [gender, setGender] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [bcaChecked, setBcaChecked] = useState(false);
  const [mcaChecked, setMcaChecked] = useState(false);
  const [bscChecked, setBscChecked] = useState(false);
 
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const { employee_id } = useParams();

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

    switch (name) {
      case 'BCA':
        setBcaChecked(checked);
        break;
      case 'MCA':
        setMcaChecked(checked);
        break;
      case 'BSC':
        setBscChecked(checked);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (employee_id) {
      fetch(`/getemployeedetails/${employee_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setName(result.result.employee_name);
          setMobile(result.result.employee_phone);
          setCourse(result.result.employee_courses.map(course => course.course_name));
          setGender(result.result.employee_gender);
          setDesignation(result.result.employee_designation);
          setEmail(result.result.employee_email);
          setImage(result.result.employee_image);
          

          result.result.employee_courses.forEach((course) => {
            switch (course.course_name) {
              case 'BCA':
                setBcaChecked(true);
                break;
              case 'MCA':
                setMcaChecked(true);
                break;
              case 'BSC':
                setBscChecked(true);
                break;
              default:
                break;
            }
          });
        })
        .catch((error) => {
          console.error('There was an error fetching the data!', error);
        });
    }
  }, [employee_id]);

  useEffect(() => {
    if (url) {
      const newEmail = email.toLowerCase();
      fetch(`/updateemployeedetails/${employee_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          name,
          email: newEmail,
          mobile,
          designation,
          gender,
          course,
          image: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false);
          if (data.error) {
            enqueueSnackbar(data.error, {
              variant: 'error',
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
          } else {
            enqueueSnackbar(data.message, {
              variant: 'success',
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
            navigate('/employeelist');
          }
        })
        .catch((err) => {
          setLoader(false);
          console.error(err);
        });
    }
  }, [url]);

  const postdata = () => {
    setLoader(true);
    if (!name || !email || !mobile || !designation || !image || !gender || course.length === 0) {
      setLoader(false);
      return enqueueSnackbar('Please enter all the fields!', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }

    if (mobile && !/^[0-9]{10}$/.test(mobile)) {
      setLoader(false);
      return enqueueSnackbar('Invalid mobile number', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'flicksee');
    data.append('cloud_name', 'dpsvrdlmt');
    fetch('https://api.cloudinary.com/v1_1/dpsvrdlmt/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'ButtonFace', padding: '20px', width: '30%' }}>
        <h2 style={{ textAlign: 'center' }}>Update Employee Data</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type='text' className='sigininput' placeholder='Full Name' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Email Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='sigininput' placeholder='Email Address' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Mobile</label>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} type='text' className='sigininput' placeholder='Mobile' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Designation</label>
          <select value={designation} onChange={(e) => setDesignation(e.target.value)} className='sigininput'>
            <option value=''>Select</option>
            <option value='HR'>HR</option>
            <option value='Manager'>Manager</option>
            <option value='Sales'>Sales</option>
          </select>
        </div>
        <FormControl>
          <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value='female' control={<Radio />} label='Female' />
            <FormControlLabel value='male' control={<Radio />} label='Male' />
          </RadioGroup>
        </FormControl>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Courses</label>
          <div>
            <Checkbox
              name='BCA'
              checked={bcaChecked}
              onChange={(e) => {
                handleCourseChange(e);
              }}
              inputProps={{ 'aria-label': 'BCA' }}
            />
            BCA
            <Checkbox
              name='MCA'
              checked={mcaChecked}
              onChange={(e) => {
                handleCourseChange(e);
              }}
              inputProps={{ 'aria-label': 'MCA' }}
            />
            MCA
            <Checkbox
              name='BSC'
              checked={bscChecked}
              onChange={(e) => {
                handleCourseChange(e);
              }}
              inputProps={{ 'aria-label': 'BSC' }}
            />
            BSC
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <label>Image Upload</label>
          <input type='file' accept=".jpg, .jpeg, .png"   onChange={(e) => setImage(e.target.files[0])} className='sigininput' />
        </div>
        <Button onClick={postdata} variant='contained'>
          {loader ? <CircularProgress style={{color:'white'}}/> : 'Update'}
        </Button>
      </div>
    </div>
  );
};

export default Createtask;
