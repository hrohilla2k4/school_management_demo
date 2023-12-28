import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addstudent = () => {

    const [studentClass, setStudentClass] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentFName, setStudentFName] = useState('');
    const [studentMName, setStudentMName] = useState('');
    const [studentRollno, setStudentRollno] = useState('');
    const [studentAddress, setStudentAddress] = useState('');
    const [studentFeesAmt, setStudentFeesAmt] = useState('');
    const [studentFPhone, setStudentFPhone] = useState('');
    const [studentMPhone, setStudentMPhone] = useState('');
    const [studentSection, setStudentSection] = useState('');

    const {schoolId , schoolPassword} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/teacher_panel');
    }


    const postData = () => {
        axios.post('http://localhost:8181/add_student', { studentClass, studentName, studentFName, studentMName, studentRollno, studentAddress, studentFeesAmt, studentFPhone, studentMPhone, studentSection , schoolId })
            .then(res => {
                toast.success("Student added into records",{position: toast.POSITION.TOP_CENTER})
            })
            .catch(err => toast.error("Error in saving the record",{position: toast.POSITION.BOTTOM_CENTER}))

    }

    const formValidation = () => {
        if ((studentClass === '') || (studentName === '') || (studentFName === '') || (studentMName === '') || (studentRollno === '') || (studentAddress === '') || (studentFeesAmt === '') || (studentFPhone === '') || (studentMPhone === '') || (studentSection === '')) {
            alert("Please fill all the fields")
        }
        else {
            postData();
            setStudentClass('');
            setStudentName('');
            setStudentFName('');
            setStudentMName('');
            setStudentFeesAmt('');
            setStudentRollno('');
            setStudentAddress('');
            setStudentFPhone('');
            setStudentMPhone('');
            setStudentSection('');
        }

    }


    return (
        <div className="container">
            <div className="display-3 border text-center bg-info">
                <span> <img src="/images/student-icon.png" alt="" width={100} /> Add student</span>
            </div>
            <br />

            <div className="row">
                <div className="col"><Typography>Student Class</Typography>
                    <TextField variant="standard" type="number" placeholder="1 , 2 or any class" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} /></div>
                <div className="col"><Typography>Student Section</Typography>
                    <TextField variant="standard" value={studentSection} onChange={(e) => setStudentSection(e.target.value)} /> <small>Please enter first letter capital Ex. Ruby , Topaz , A , B etc.</small>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col"><Typography>Student Name</Typography>
                    <TextField variant="standard" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                </div>

                <div className="col">
                    <Typography>Student Father Name</Typography>
                    <TextField variant="standard" value={studentFName} onChange={(e) => setStudentFName(e.target.value)} />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col"><Typography>Student Mother Name</Typography>
                    <TextField variant="standard" value={studentMName} onChange={(e) => setStudentMName(e.target.value)} />
                </div>

                <div className="col"><Typography>Student Roll No</Typography>
                    <TextField variant="standard" type="number" placeholder="1 , 2 or any roll no" value={studentRollno} onChange={(e) => setStudentRollno(e.target.value)} />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col"><Typography>Student address</Typography>
                    <TextField variant="outlined" placeholder="Ex. Patel nagar gali no 2" value={studentAddress} onChange={(e) => setStudentAddress(e.target.value)} />
                </div>

                <div className="col"><Typography>Student Fees Amount</Typography>
                    <TextField variant="standard" type="number" placeholder="Ex. 1200" value={studentFeesAmt} onChange={(e) => setStudentFeesAmt(e.target.value)} />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col"><Typography>Student Father Phone Number</Typography>
                    <TextField variant="standard" placeholder="Ex. 8684XXXXx" value={studentFPhone} onChange={(e) => setStudentFPhone(e.target.value)} />
                </div>
                <div className="col"><Typography>Student Mother Phone Number</Typography>
                    <TextField variant="standard" placeholder="905026XXX" value={studentMPhone} onChange={(e) => setStudentMPhone(e.target.value)} />
                </div>
            </div>
            <br />

            <br />
            <Button variant="outlined" color="success" onClick={formValidation}>Submit</Button> <br /> <br />
            <Button variant="contained" color="error" onClick={handleGoBack}>Go Back</Button>
            <ToastContainer />
        </div>
    )
}


export default Addstudent
