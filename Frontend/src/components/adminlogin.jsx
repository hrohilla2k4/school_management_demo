import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { firebase } from "./firebaseaut";
import { useContext } from "react";
import { AuthContext } from "./authcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const Adminlogin = () => {
    const navigate = useNavigate();

    const {schoolId} = useContext(AuthContext);


    useEffect(() => {
        fetch('http://localhost:8181/admin_login')
            .then((res => res.json()))
            .then(data => setData(data))
            .catch(err => {toast.error("Error in fetching data",{position:toast.POSITION.TOP_CENTER})})
    }, []);

    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState('');


    const configureCaptcha = () => {

        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'login-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber. 
                console.log("Captcha verified");
            }
        });
    }

    const onSubmitting = (e) => {


        const phoneNumber = "+91-" + phoneNo;
        //console.log(phoneNumber); 
        configureCaptcha();
        toast.info("Sendint OTP to your mobile",{position:toast.POSITION.TOP_CENTER})
        const appVerifier = window.recaptchaVerifier;

        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = setConfirmationResult(confirmationResult);

                setShowForm(true);
              
            }).catch((error) => {
                
                toast.error("Error in sending OTP",{position:toast.POSITION.TOP_CENTER})
            });

    }

    const formValidation = () => {
        data.filter((d)=> d.schoolId == schoolId)
        .map((d) => {
            if ((d.admin_phone == phoneNo) && (d.admin_password == password)) {
                onSubmitting();
            }
            else {
                toast.error("Password Or Number Mismatch",{position:toast.POSITION.TOP_CENTER})
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation();


    }

    const verifyOtp = (e) => {
        e.preventDefault();
        const code = otp;
        console.log(code);
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            //alert("User verified");
            navigate('/admin_panel');
            // ...
        }).catch((error) => {
            toast.error("Wrong otp",{position:toast.POSITION.TOP_CENTER})
        });

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="col-md-5 container">

                    <div className="container display-6">
                        <p className="p-5 text-center" >Admin Login<img src="/images/key-icon.png" alt="" width={35} /></p>
                    </div>

                    <div className="container mt-1 border bg-warning text-center text-white col-md-5">
                        <Typography>Admin Phone Number: </Typography>
                        <TextField variant="standard" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                        <br /> <br />
                        <Typography>Admin Password: </Typography>
                        <TextField variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br /> <br />

                    </div>
                    <div className="col-md-4 container">
                        <Button className="container mt-3" variant="contained" color="success" endIcon={<SendIcon />} onClick={handleSubmit} id="login-button">
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
            {
                showForm ?
                    (
                        <form onSubmit={verifyOtp} className="mt-5">
                            <br />
                            <Typography><mark>Enter <kbd>otp</kbd> sent to your mobile</mark></Typography>
                            <TextField variant="standard" required onChange={(e) => setOtp(e.target.value)} />
                            <br /> <br />
                            <Button variant="outlined" onClick={verifyOtp}>Submit</Button>
                        </form>
                    ) :
                    (
                        <span></span>
                    )
            }
            <ToastContainer />
        </div>
    )
};

export default Adminlogin;