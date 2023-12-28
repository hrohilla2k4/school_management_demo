import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";
import { Button } from "@mui/material";
import {Typography} from "@mui/material";
import {TextField} from "@mui/material";
import { firebase } from "./firebaseaut";

const ResetAdminPassword = () => {

    
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showotpForm, setShowOtpForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [adminPhone, setAdminPhone] = useState('');
    const [confirmationResult, setConfirmationResult] = useState('');
    const [data , setData] = useState('');
    const [otp , setOtp] = useState('');

    useEffect(() => {
        fetch('http://localhost:8181/admin_login')
            .then((res => res.json()))
            .then(data => setData(data))
            .catch(err => console.log(err))
    }, []);

    const configureCaptcha = () => {

        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'reset-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber. 
                console.log("Captcha verified");
            }
        });
    }

    const onSubmitting = () => {

        
        const phoneNumber = "+91-" + adminPhone;
        console.log(phoneNumber);
        configureCaptcha();
        const appVerifier = window.recaptchaVerifier;

        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = setConfirmationResult(confirmationResult);
                console.log("Otp has been sent");
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log("Error ! otp not sent" + error)
            });

    }

    const verifyOtp = (e) => {
        e.preventDefault();
        const code = otp;
        console.log(code);
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            //alert("User verified");
            // ...
            setShowPasswordForm(true);
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log("error in verification" + error);
        });

    }

    const formValidation = (e) => {
        e.preventDefault();
        data.map((d) => {
            if (d.admin_phone === adminPhone) {
                onSubmitting();
                setShowOtpForm(true);

            }
            else {
                alert("wrong phone number");
            }
        })
    }

    const passwordValidation = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            axios.put('http://localhost:8181/reset_admin_password',{ password , adminPhone})
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))

            navigate('/');
        }
        else {
            alert("Please match both passwords");
        }
    }


    return (
        <div>
            <form onSubmit={formValidation}>
                <Typography>Enter admin's mobile number</Typography>
                <TextField variant="standard"  required value={adminPhone} onChange={(e) => setAdminPhone(e.target.value)} />
                <br /> <br />
                <Button variant="outlined" id="reset-button" size="small" onClick={formValidation}>Reset Password</Button>
            </form>

            {
                showotpForm ?
                    (
                        <form onSubmit={verifyOtp}>
                            <Typography>Enter otp sent to your mobile</Typography>
                            <TextField  required onChange={(e) => setOtp(e.target.value)} />
                            <br />
                            <Button variant="contained" onClick={verifyOtp}>Submit</Button>
                        </form>
                    ) :
                    (
                        <span></span>
                    )
            }

            {
                showPasswordForm ?
                    (
                        <form onSubmit={passwordValidation}>
                            <Typography>Enter new password for admin</Typography>
                            <TextField variant="standard" type="text" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Typography>Re-enter password</Typography>
                            <TextField variant="standard" type="text" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                             <br /> <br />
                            <Button variant="contained" onClick={passwordValidation}>Submit</Button>
                        </form>
                    ) :
                    (
                        <span></span>
                    )



            }
           
        </div>
    )
};

export default ResetAdminPassword;