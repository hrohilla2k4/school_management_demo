import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { firebase } from "./firebaseaut";
import { signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const Teacherlogin = () => {

    const [teacherPhone, setTeacherPhone] = useState('');
    const [teacherPassword, setTeacherPassword] = useState('');
    const [data, setData] = useState([]);
    const [confirmationResult, setConfirmationResult] = useState('');
    const [otp, setOtp] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:8181/teacher_login')
            .then(res => res.json())
            .then((data) => {
                setData(data)
                console.log(data);
            })
            .catch(err => alert(err))
    }, [])

    const onSubmit = () => {
        const phoneNumber = "+91-" + teacherPhone;
        configureCaptcha();
        const appVerifier = window.recaptchaVerifier;

        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = setConfirmationResult(confirmationResult);
                setShowForm(true);
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log("Error ! otp not sent" + error)
            });

    }

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

    const formValidation = () => {
        if ((teacherPassword === '') || (teacherPhone === '')) {
            alert('Please fill the fields');
        }
        else {
            const teacherExists = data.find((t) => { return (t.teacher_password === teacherPassword) && (t.teacher_phone === teacherPhone) })


            if (teacherExists) {

                alert('sending otp');
                onSubmit();
            }
            else {
                alert('Teacher do not exists')
            }

        }

    }

    const verifyOtp = (e) => {
        e.preventDefault();
        const code = otp;
        console.log(code);
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            //alert("User verified");
            navigate('/teacher_panel');
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...

            alert("Wrong otp ! please enter again");
        });

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation();


    }



    return (
        <div>
            <form >
                <div className="col-md-5 container">

                    <div className="container display-6">
                        <p className="p-5 text-center" >Teacher Login<img src="/images/key-icon.png" alt="" width={35} /></p>
                    </div>
                </div>
                <div className="container mt-1 border bg-danger text-center text-white col-md-3">
                    <Typography>Teacher Phone Number</Typography>
                    <TextField variant="standard" required value={teacherPhone} onChange={(e) => setTeacherPhone(e.target.value)} />
                    <br /> <br />
                    <Typography>Teacher Password</Typography>
                    <TextField variant="standard" required value={teacherPassword} onChange={(e) => setTeacherPassword(e.target.value)} /> <br /> <br />
                </div>
                <div className="col-md-4 container text-center">
                    <br />
                    <Button variant="contained" onClick={handleSubmit} id='login-button'>Login</Button>
                </div>
                

            </form>
            {
                showForm ?
                    (
                        <form onSubmit={verifyOtp}>
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

        </div>
    )
}

export default Teacherlogin;