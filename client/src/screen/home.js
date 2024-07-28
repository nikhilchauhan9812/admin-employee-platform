import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function EmployeeData() {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetch("/allemployeedetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.result);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleSearch = () => {
    if (input) {
      fetch(`/searchemployee/${input}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            enqueueSnackbar(result.error, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
          } else {
           
            setData(result.data);
          }
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  };

  const handleDelete = (id) => {
    fetch(`/deleteemployee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setData(data.filter(employee => employee.employee_id !== id));
        enqueueSnackbar(result.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      })
      .catch((err) => console.error("Error deleting data:", err));
  };

  const handleAgree = () => {
    handleDelete(deleteId);
    setDeleteId(null);
    setOpen(false);
  };

  const handleDisagree = () => {
    setDeleteId(null);
    setOpen(false);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortOption = (option) => {
    const sortedData = [...data].sort((a, b) => {
      if (option === 'name') {
        return a.employee_name.localeCompare(b.employee_name);
      } else if (option === 'email') {
        return a.employee_email.localeCompare(b.employee_email);
      } else if (option === 'createdAt') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
    setData(sortedData);
    handleSortClose();
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid grey', marginRight: '20px', alignItems: 'center', gap: '20px' }}>
          <p>Total Count: {data.length}</p>
          <button style={{border:'none', padding:'5px 10px',color:'blue',backgroundColor:'whitesmoke',cursor:'pointer'}} onClick={() => navigate('/createtask')}> 
            <div style={{ display: 'flex',alignItems:'center',gap:'10px'}}>
               <AddCircleOutlineIcon/> Create Employee
              
              </div>
               </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: 'flex-end',
            marginBottom: "10px",
            marginRight: '30px',
            alignItems: 'center',
            gap: "10px",
            marginTop: '10px'
          }}
        >
          <input type="text" onChange={(e) => setInput(e.target.value)} className="search-input" placeholder="Search by Employee name..." />
          <button
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              backgroundColor: "rgba(38, 37, 98, 1)",
              cursor: "pointer",
              border: "none",
              fontSize: "15px",
              color: "white",
            }}
            onClick={handleSearch}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <SearchIcon /> Search
            </div>
          </button>
          <SortIcon style={{ cursor: "pointer" }} onClick={handleSortClick} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleSortClose}
          >
            <MenuItem onClick={() => handleSortOption('name')}>Name</MenuItem>
            <MenuItem onClick={() => handleSortOption('email')}>Email</MenuItem>
            <MenuItem onClick={() => handleSortOption('createdAt')}>Create Date</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="employee-grid-container">
      <div>
        <h3>Employee List</h3>
      </div>

        <table className="employee-grid">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {
            data.length !==0?
            <tbody>
            {data ?data.map((employee, index) => (
              <tr key={index}>
                <td>{employee.employee_id}</td>
                <td>
                  <img
                    style={{ textAlign: "center" }}
                    src={employee.employee_image}
                    alt="employee"
                    className="employee-image"
                    />
                </td>
                <td>{employee.employee_name}</td>
                <td style={{ color: "blue" }}>{employee.employee_email}</td>
                <td>{employee.employee_phone}</td>
                <td>{employee.employee_designation}</td>
                <td>{employee.employee_gender}</td>
                <td>
                  {employee.employee_courses
                    .map((course) => course.course_name)
                    .join(", ")}
                </td>
                <td>
                  {new Date(employee.createdAt).toLocaleString().slice(0, 9)}
                </td>
                <td style={{ alignItems: "center", gap: "20px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "20px" }}
                    >
                    <button
                      onClick={() =>
                        navigate(`/updateemployee/${employee.employee_id}`)
                      }
                      className="action-button"
                      >
                      Edit
                    </button>
                    <button onClick={() => confirmDelete(employee.employee_id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )):<p style={{textAlign:'center'}}>loading..</p>}
          </tbody>
         :<div  style={{margin:'0 auto',alignSelf:'center'}}>

         <p style={{textAlign:'center',alignSelf:'center'}}>No Data Available!</p>
         </div> 
         }
        </table>
      </div>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this employee?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmployeeData;
