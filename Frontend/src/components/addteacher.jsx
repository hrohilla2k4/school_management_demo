import axios from "axios";
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { useState } = require("react");



const Addteacher = () => {

  const [teacherName, setTeacherName] = useState('');
  const [teacherAge, setTeacherAge] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherMail, setTeacherMail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherSalary, setTeacherSalary] = useState('');

  const { schoolId, schoolPassword } = useContext(AuthContext);

  const navigate = useNavigate();

  const postData = () => {
    axios.post('http://localhost:8181/add_teacher', { teacherName, teacherAge, teacherPhone, teacherMail, teacherPassword, teacherSalary, schoolId, schoolPassword })
      .then(res => {toast.success("Teacher added into records",{position:toast.POSITION.TOP_CENTER})})
      .catch(err => {toast.error("Teacher not added into records",{position:toast.POSITION.TOP_CENTER})})
    setTeacherName('');
    setTeacherAge('');
    setTeacherPhone('');
    setTeacherMail('');
    setTeacherPassword('');
    setTeacherSalary('');




  }



  const goBack = () => {
    navigate('/admin_panel');
  }



  const handleSave = (e) => {
    e.preventDefault();
    if ((teacherAge === '') || (teacherName === '') || (teacherPhone === '') || (teacherMail === '') || (teacherPassword === '') || (teacherSalary == '')) {
      alert("Please fill all the fields first");
    }
    else {
      postData();
    }
  }

  return (
    <div className="container">

      <div className="display-3 border text-center bg-info">

        <span> <img src="/images/teacher-icon.png" alt="" width={100} /> Add Teacher</span>

      </div>
      <br />

      <div className="row">

        <div className="col"><Typography>Teacher Name</Typography>
          <TextField variant="standard" required value={teacherName} onChange={(e) => setTeacherName(e.target.value)} /> <br /> <br /></div>
        <div className="col">
          <Typography>Teacher Salary</Typography>
          <TextField variant="standard" required value={teacherSalary} onChange={(e) => setTeacherSalary(e.target.value)} /> <br /> <br />
        </div>
      </div>
      <div className="row">
        <div className="col"><Typography>Teacher Age</Typography>
          <TextField variant="standard" required value={teacherAge} onChange={(e) => setTeacherAge(e.target.value)} /> <br /> <br /></div>
        <div className="col"><Typography>Teacher Phone</Typography>
          <TextField variant="standard" required value={teacherPhone} onChange={(e) => setTeacherPhone(e.target.value)} /> <br /> <br /></div>
      </div>
      <div className="row">
        <div className="col"><Typography>Teacher mail</Typography>
          <TextField variant="standard" required value={teacherMail} onChange={(e) => setTeacherMail(e.target.value)} /> <br /> <br /></div>
        
          {/* <TextField variant="standard"  value={teacherSection} onChange={(e) => setTeacherSection(e.target.value)} /><small><mark>First letter must be capital , ex. <kbd>Ruby</kbd> , <kbd>Topaz</kbd> , <kbd>A </kbd>etc</mark></small> <br /> <br /></div> */}
        </div>
        <div className="row">
          <div className="col">
            <Typography>Teacher password</Typography>
            <TextField variant="standard" required value={teacherPassword} onChange={(e) => setTeacherPassword(e.target.value)} /> <br /> <br />
          </div>


        </div>
        <div>
          <Button variant="contained" color="success" onClick={handleSave}><SaveIcon /> Save</Button> <br /> <br />
          <Button variant="outlined" onClick={goBack}>Go Back</Button>
        </div>
        <ToastContainer />
      </div>

  )
}

export default Addteacher;