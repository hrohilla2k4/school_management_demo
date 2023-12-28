import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPeon = () => {
  //Setting the states for data. 
  const [peonName, setPeonName] = useState('');
  const [peonAge, setPeonAge] = useState('');
  const [peonPhone, setPeonPhone] = useState('');
  const [peonSalary, setPeonSalary] = useState('');
  const [peonAddress, setPeonAddress] = useState('');
  const [peonDesignation, setPeonDesignation] = useState('');

  const {schoolId , schoolPassword} = useContext(AuthContext); //For saving the records according to the schoolId. 

  const navigate = useNavigate(); // Navigating to other pages , when needed. 

  const postData = () => {

    axios.post('http://localhost:8181/add_peon', {
      peonName,
      peonAge,
      peonPhone,
      peonSalary,
      peonAddress,
      peonDesignation,
      schoolId,
      schoolPassword
    })
      .then(res => {toast.success("Record saved successfully",{position:toast.POSITION.TOP_CENTER})})
      .catch(err => {toast.error("Error in saving the record",{position:toast.POSITION.TOP_CENTER})});
    setPeonName('');
    setPeonAge('');
    setPeonPhone('');
    setPeonSalary('');
    setPeonAddress('');
    setPeonDesignation('');
  };

  const goBack = () => {
    navigate('/admin_panel');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      peonName === '' ||
      peonAge === '' ||
      peonPhone === '' ||
      peonSalary === '' ||
      peonAddress === '' ||
      peonDesignation === ''
    ) {
      alert("Please fill all the fields first");
    } else {
      postData();
    }
  };

  return (
    <div className="container">
      <div className="display-3 border text-center bg-info">
        <span> <img src="/images/peon-icon.png" alt="" width={100} /> Add Peon</span>
      </div>
      <br />

      <div className="row">
       
        <div className="col">
          <Typography>Peon Name</Typography>
          <TextField variant="standard" required value={peonName} onChange={(e) => setPeonName(e.target.value)} /> <br /> <br />
        </div>
        <div className="col">
          <Typography>Peon Designation</Typography>
          <TextField variant="standard" required value={peonDesignation} onChange={(e) => setPeonDesignation(e.target.value)} /> <br /> <br />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Typography>Peon Age</Typography>
          <TextField variant="standard" required value={peonAge} onChange={(e) => setPeonAge(e.target.value)} /> <br /> <br />
        </div>
        <div className="col">
          <Typography>Peon Phone</Typography>
          <TextField variant="standard" required value={peonPhone} onChange={(e) => setPeonPhone(e.target.value)} /> <br /> <br />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Typography>Peon Salary</Typography>
          <TextField variant="standard" required value={peonSalary} onChange={(e) => setPeonSalary(e.target.value)} /> <br /> <br />
        </div>
        <div className="col">
          <Typography>Peon Address</Typography>
          <TextField variant="standard" required value={peonAddress} onChange={(e) => setPeonAddress(e.target.value)} /> <br /> <br />
        </div>
      </div>
      

      <Button variant="contained" color="success" onClick={handleSave}><SaveIcon /> Save</Button> <br /> <br />
      <Button variant="outlined" onClick={goBack}>Go Back</Button>
      <ToastContainer />
    </div>
  );
};

export default AddPeon;
