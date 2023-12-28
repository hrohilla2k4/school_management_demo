import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useContext } from "react";
import { AuthContext } from "./authcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Becomeadmin = () => {

    const {schoolId , schoolPassword} = useContext(AuthContext);

    const navigate = useNavigate();

    const [adminName, setAdminname] = useState('');
    const [adminDesignation, setAdmindesignation] = useState('');
    const [adminEmail, setAdminemail] = useState('');
    const [adminPhone, setAdminphone] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState();



    const postData = () => {
        axios.post('http://localhost:8181/become_admin', {
          adminName,
          adminDesignation,
          adminEmail,
          adminPhone,
          adminPassword,
          schoolId,
          schoolPassword
        })
          .then(res => {
            if (res.status == 204) {
              toast.error("Error in making admin , Probably admin exists",{position: toast.POSITION.TOP_CENTER})
            }
            else if(res.status == 200)
            {   
                toast.success("Admin made: Login now", {position: toast.POSITION.TOP_CENTER})
            } 
            else {
              // Handle other response statuses here
              toast.error("Network error , can't make admin right now",{position: toast.POSITION.TOP_CENTER})
            }
          })
          .catch(err => {
            toast.error("Error!!! Contact owner",{postion:toast.POSITION.TOP_CENTER})
          });
      };
      



    const adminLogin = () => {
        navigate('/admin_login');
    }

    const formValidation = () => {
        if ((adminName !== '') && (adminDesignation !== '') && (adminEmail !== '') && (adminPhone !== '') && (adminPassword !== '') && (confirmPassword !== '')) {
            if (adminPassword === confirmPassword) {

                postData();

                if (postData) {
                    adminLogin();
                }

                // checkPreviousAdmins();
            }
            else if ((adminName === '') || (adminDesignation === '') || (adminEmail === '') || (adminPhone === '') || (adminPassword === '') || (confirmPassword === '')) {
                alert("Please fill out all fields");
            }
            else if (adminPassword !== confirmPassword) {
                alert("Password do not match");
            }
            else {
                alert("Encountered some problem , try again");
            }
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation();
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="display-3 border text-center bg-warning">
                    <img src="/images/admin-icon.png" alt="" width={100} />
                    <span>Become Admin</span>

                </div>
                <br /> <br />
                <div className="row">
                    <div className="col">
                        <Typography >Admin Name: </Typography>
                        <TextField variant="standard" required value={adminName} onChange={(e) => setAdminname(e.target.value)} />
                    </div>
                    <div className="col"><Typography >Admin Designation: </Typography>
                        <TextField variant="standard" required value={adminDesignation} onChange={(e) => setAdmindesignation(e.target.value)} /></div>
                </div>
                <br />
                <div>
                    <div className="row">
                        <div className="col">
                            <Typography>Admin Email: </Typography>
                            <TextField variant="standard" required value={adminEmail} onChange={(e) => setAdminemail(e.target.value)} /> <br /> <br />
                        </div>

                        <div className="col">
                        <Typography >Admin Phone No: </Typography>
                        <TextField variant="standard" required value={adminPhone} onChange={(e) => setAdminphone(e.target.value)} /> <br /> <br />
                        </div>
                    </div>
                </div>
                <br />

               <div>
               <div className="row">
                    <div className="col"><Typography className="col-md-2">Password: </Typography>
                    <TextField variant="standard" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} /> <br /> <br />
                    </div>
                    <div className="col">
                    <Typography>Confirm Password:</Typography>
                    <TextField variant="standard" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> <br /> <br />
                    </div>
                </div>
               </div>
                <br />
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
                    Submit
                </Button>

                <ToastContainer />

            </div>

        </form>
    )
}

export default Becomeadmin;