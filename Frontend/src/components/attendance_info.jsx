import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContext } from "./authcontext";


const Attendanceinfo = () => {

    const [date, setDate] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [section, setSection] = useState('');
    const [studentClass, setStudentClass] = useState(0);
    const [data, setData] = useState([]);
    const [attendanceform, setAttendanceform] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    // const [attendanceStatus, setAttendanceStatus] = useState('');
    const [studentRollno, setStudentRollno] = useState('');
    const [showEditButton, setShowEditButton] = useState(true);
    const [disabledButtons, setDisabledButtons] = useState({});

    const { schoolId } = useContext(AuthContext);

    // const [filteredData , setFilteredData] = useState([]);



    const handleDateSubmit = (e) => {
        e.preventDefault();
        if (date === '') {
            alert('Please enter the date');
        }
        else {
            setShowForm(true);
        }

    };

    const handlePresentNotification = (rollno) => {
        // Show a notification when the button is clicked
        toast.success(`Roll no ${rollno} present`, {
            position: toast.POSITION.TOP_RIGHT,
        });

    }

    const handleAbsentNotification = (rollno) => {
        // Show a notification when the button is clicked
        toast.error(`Roll no ${rollno} absent`, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    const handleLeaveNotification = (rollno) => {
        // Show a notification when the button is clicked
        toast.info(`Roll no ${rollno} on leave`, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    const handleDeleteNotification = (rollno) => {
        toast.info(`Entry deleted for ${rollno}`, {
            position: toast.POSITION.TOP_RIGHT
        })
    }


    useEffect(() => {
        fetch('http://localhost:8181/attendance_info')
            .then(res => res.json()) // Return the response data here
            .then(data => {
                setData(data)
                console.log(data);
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:8181/attendance_mark_data')
            .then(res => res.json()) // Return the response data here
            .then(attendanceData => {
                setAttendanceData(attendanceData)


            })
    }, [])

    const handleDataSubmit = (e) => {
        e.preventDefault();

        setAttendanceform(true);


    }

    const handlePresentClick = (r) => {


        setStudentRollno(r);
        if (studentRollno > 0) {
            axios.post('http://localhost:8181/attendance_data_send', { studentRollno: r, attendanceStatus: 'P', section, date, studentClass, schoolId })
                .then(res => console.log(res))
                .catch(err => console.log(err))

            handlePresentNotification(r);

            setDisabledButtons((prevDisabledButtons) => ({
                ...prevDisabledButtons,
                [r]: true, // Disable the button for the specific row
            }));



        }
        else {
            alert('roll no value is zeror');
        }



        /**see - present click karte hi , - section or class to same rahegi sabke liye , */
    }

    const handleAbsentClick = (r) => {

        setStudentRollno(r);
        if (studentRollno > 0) {
            axios.post('http://localhost:8181/attendance_data_send', { studentRollno: r, attendanceStatus: 'A', section, date, studentClass, schoolId })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            handleAbsentNotification(r);
            setDisabledButtons((prevDisabledButtons) => ({
                ...prevDisabledButtons,
                [r]: true, // Disable the button for the specific row
            }));
        }
        else {
            alert('roll no value is zeror');
        }

    }

    const handleLeaveClick = (r) => {

        setStudentRollno(r);
        if (studentRollno > 0) {
            axios.post('http://localhost:8181/attendance_data_send', { studentRollno: r, attendanceStatus: 'L', section, date, studentClass, schoolId })
                .then(res => console.log(res))
                .catch(err => console.log(err))

            handleLeaveNotification(r);
            setDisabledButtons((prevDisabledButtons) => ({
                ...prevDisabledButtons,
                [r]: true, // Disable the button for the specific row
            }));


        }
        else {
            alert('roll no value is zeror');
        }


    }

    const deleteRecord = (rollno, date, section, studentClass) => {
        axios
            .delete(`http://localhost:8181/attendance_info/${rollno}/${date}/${section}/${studentClass}/${schoolId}`)
            .then((response) => {
                console.log(response.data); // Successful deletion message
                // You can also update your component's state to reflect the change
            })
            .catch((error) => {
                console.error(error);
            });

        setDisabledButtons((prevDisabledButtons) => ({
            ...prevDisabledButtons,
            [rollno]: false, // Disable the button for the specific row
        }));

        handleDeleteNotification(rollno);


    };


    return (
        <div className="container">

            <div className="container">
                <div className="display-3 border text-center bg-warning">
                    <span> <img src="/images/attendance-icon.png" alt="" width={100} /> Attendance</span>
                </div>
            </div>
            <br />
            <Typography>Enter Today's Date</Typography>
            <TextField variant="standard" type="date" required value={date} onChange={(e) => { setDate(e.target.value) }} /> <br /> <br />
            <Button variant="contained" onClick={handleDateSubmit}>Submit</Button>
            {
                showForm ? (
                    <div className="row">
                        <div className="col">
                            <Typography>Select Class</Typography>
                            <select onChange={(e) => (setStudentClass(e.target.value))}>
                                <option disabled selected value="">Select Class</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>

                            </select>
                        </div>
                        <div className="col">
                            <Typography>Select Section</Typography>
                            <select onChange={(e) => (setSection(e.target.value))}>
                                <option disabled selected value="">Select Section</option>
                                {data.filter((d) => d.schoolId == schoolId)
                                .map((d, index) => (
                                        <option key={index} value={d.sSection}>
                                            {d.sSection}
                                        </option>
                                    ))}
                            </select> <br />
                            <br />
                        </div>
                        <div> <Button onClick={handleDataSubmit} variant="contained">Submit</Button></div>
                    </div>
                )
                    :
                    (
                        <span></span>
                    )
            }
            {
                attendanceform ? (
                    <div>
                        <br />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Student Class</th>
                                    <th>Student Section</th>
                                    <th>Student Roll Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    attendanceData.map((t, i) => {
                                        if ((t.class == studentClass) && (t.sSection == section) && (t.schoolId == schoolId)) {
                                            return (
                                                <tr key={i}>
                                                    <td>{t.class}</td>
                                                    <td>{t.sSection}</td>
                                                    <td>{t.srollno}</td>
                                                    <td>
                                                        <button className="btn btn-success" disabled={disabledButtons[t.srollno]} onClick={() => handlePresentClick(t.srollno)}>Present</button><span> </span>
                                                        <button className="btn btn-danger" disabled={disabledButtons[t.srollno]} onClick={() => handleAbsentClick(t.srollno)}>Absent</button> <span> </span>
                                                        <button className="btn btn-info" disabled={disabledButtons[t.srollno]} onClick={() => handleLeaveClick(t.srollno)}>Leave</button> <span> </span>
                                                        <button className="btn btn-secondary" onClick={() => deleteRecord(t.srollno, date, t.sSection, t.class)}>Edit</button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })
                                }
                            </tbody>
                        </table>

                        <br /> <br />
                        <Button variant="contained" color="success">Done</Button>
                        <ToastContainer />
                    </div>
                )
                    :
                    (
                        <div>
                            <span></span>
                        </div>
                    )
            }






        </div>
    )
}

export default Attendanceinfo;