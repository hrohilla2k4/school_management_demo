import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import  {AuthContext}  from "./authcontext";


const Schoolloginscreen = () => {

    
    const [schoolLoginData, setSchoolLoginData] = useState([]);

    const {schoolId , setSchoolId , schoolPassword, setSchoolPassword} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8181/school_login')
            .then(res => res.json())
            .then(schoolLoginData => setSchoolLoginData(schoolLoginData))
            .catch(err => console.log(err))
    }, [])

    const formValidation = () => {
        if (schoolId == '' || schoolPassword == '') {
            alert("Please fill all the fields first");
        }
    }

    // Assuming schoolLoginData is an array of school objects with schoolId and schoolPassword properties



    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation();

        const foundSchool = schoolLoginData.find((d) => d.schoolId === schoolId && d.schoolPassword === schoolPassword);

        if (foundSchool) {
            // Successful login
            navigate('/home_screen');
        } else {
            alert("Wrong credentials");
        }

    }


    return (
        <div>
            <form>
                <div className="col-md-5 container">

                    <div className="container display-6">
                        <p className="p-5 text-center" >School Login<img src="/images/key-icon.png" alt="" width={35} /></p>
                    </div>

                    <div className="container mt-1 border bg-warning text-center text-white col-md-5">
                        <Typography>School Id: </Typography>
                        <TextField variant="standard" required value={schoolId} onChange={(e) => setSchoolId(e.target.value)} />
                        <br /> <br />
                        <Typography>School Password: </Typography>
                        <TextField variant="standard" value={schoolPassword} onChange={(e) => setSchoolPassword(e.target.value)} />
                        <br /> <br />

                    </div>
                    <div className="col-md-4 container">
                        <Button className="container mt-3" onClick={handleSubmit} variant="contained" color="success" endIcon={<SendIcon />} >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Schoolloginscreen;