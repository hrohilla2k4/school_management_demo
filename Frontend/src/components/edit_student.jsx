import axios from "axios";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContext } from "./authcontext";
const { useState } = require("react");


const Editstudent = () => {
    const [studentClass, setStudentClass] = useState("");
    const [studentRollno, setStudentRollno] = useState("");
    const [studentSection, setStudentSection] = useState("");
    const [editForm, setEditForm] = useState(false);
    const [data, setData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [studentData, setStudentData] = useState({
        studentId: "",
        studentName: "",
        studentFName: "",
        studentMName: "",
        studentAddress: "",
        studentFeesAmt: "",
        studentFPhone: "",
        studentMPhone: "",
    });

    const {schoolId} = useContext(AuthContext);

    const handleSubmit = async () => {
        try {
            // Make the GET request to fetch teacher data
            const response = await axios.get(`http://localhost:8181/edit_student/${studentClass}/${studentRollno}/${studentSection}`, {
                headers: {
                    Accept: 'application/json',
                },
            });

            // Check if the response contains data and is an array
            if (Array.isArray(response.data) && response.data.length > 0) {
                // Extract the first object from the array
                const fetchedStudentData = response.data.find((student)=>
                    student.srollno == studentRollno && 
                    student.class == studentClass &&
                    student.sSection == studentSection
                );
                toast.success(`Data fetched for ${studentRollno}`,{
                    position: toast.POSITION.TOP_RIGHT,
                });

                
                setStudentData(fetchedStudentData);
                setEditForm(true);
            } else {
                toast.error(`No data fetched`,{
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (err) {
            console.error('Error fetching student data:', err.message);
        }
    };

    useEffect(() => {
        fetch("http://localhost:8181/show_students")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8181/attendance_info")
            .then((res) => res.json())
            .then((attendanceData) => {
                setAttendanceData(attendanceData);
            });
    }, []);

    const updateStudentData = async () => {
        try {
            // Make the PUT request to update teacher data
            const response = await axios.put(`http://localhost:8181/edit_student`, studentData, {
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
            });

            if (response.status === 200) {
                toast.success(`Data Updated For Rollno:  ${studentRollno}`,{
                    position: toast.POSITION.TOP_RIGHT,
                });
                // Optionally, you can reset the form or perform any other actions after a successful update.
            } else {
                toast.error(`Failed To Update Data For Rollno: ${studentRollno}`,{
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (err) {
            console.error('Error updating Student data:', err.message);
        }
    };

    const deleteStudent = async () => {
        try {
            const response = await axios.delete(`http://localhost:8181/delete_student/${studentClass}/${studentSection}/${studentRollno}`);
            if (response.status === 200) {
                toast.success(`Record Deleted For Rollno: ${studentRollno}`, {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                toast.error(`Error in deleting record for Rollno: ${studentRollno}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            toast.error(`Error in deleting record for Rollno: ${studentRollno}`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    
    
    


     

    return (
        <div className="container text-center">
            <div className="display-3 text-center">
                <span>
                    <img src="/images/list-icon.png" alt="" width={100} />
                    Edit Students
                </span>
            </div>
            <br />

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
                    <select onChange={(e) => setStudentSection(e.target.value)}>
                        <option disabled selected value="">
                            Select Section
                        </option>
                        {attendanceData.filter((d)=> d.schoolId == schoolId)
                        .map((d, index) => (
                            <option key={index} value={d.sSection}>
                                {d.sSection}
                            </option>
                        ))}
                    </select>
                    <br />
                    <br />
                </div>
                <div className="col">
                    <Typography>Select Roll No</Typography>
                    <select onChange={(e) => setStudentRollno(e.target.value)}>
                        <option disabled selected value="">
                            Select Roll No
                        </option>
                        {data.map((d, index) => {
                            if (d.sSection == studentSection && d.class == studentClass && d.schoolId == schoolId) {
                                return (
                                    <option key={index} value={d.srollno}>
                                        {d.srollno}
                                    </option>
                                );
                            }
                        })}
                    </select>
                    <br />
                    <br />
                </div>
            </div>

            <div>
                <Button variant="outlined" color="success" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            <br />
            {editForm ? (
                <div>
                    {data.map((d) => {
                        if (
                            d.sSection == studentSection &&
                            d.srollno == studentRollno &&
                            d.class == studentClass &&
                            d.schoolId == schoolId
                        ) {
                            return (
                                <div key={d.id}>
                                    <div className="row">
                                        <div className="col">
                                            <Typography>Student Class</Typography>
                                            <TextField
                                                variant="standard"
                                                type="number"
                                                value={studentData.class}
                                                onChange={(e) => setStudentClass({...studentData,class:e.target.value})}
                                            />
                                        </div>
                                        <div className="col">
                                            <Typography>Student Id</Typography>
                                            <TextField
                                                variant="standard"
                                                disabled = {true}
                                                type="number"
                                                value={studentData.sid}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        sid: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col">
                                            <Typography>Student Name</Typography>
                                            <TextField
                                                variant="standard"
                                                value={studentData.sname}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        sname: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="col">
                                            <Typography>Student Father Name</Typography>
                                            <TextField
                                                variant="standard"
                                                value={studentData.sfname}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        sfname: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col">
                                            <Typography>Student Mother Name</Typography>
                                            <TextField
                                                variant="standard"
                                                value={studentData.smname}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        smname: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="col">
                                            <Typography>Student Roll No</Typography>
                                            <TextField
                                                variant="standard"
                                                type="number"
                                                value={studentData.srollno}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        srollno: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col">
                                            <Typography>Student address</Typography>
                                            <TextField
                                                variant="outlined"
                                                value={studentData.saddress}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        saddress: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="col">
                                            <Typography>Student Fees Amount</Typography>
                                            <TextField
                                                variant="standard"
                                                type="number"
                                                value={studentData.sfeesamt}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        sfeesamt: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col">
                                            <Typography>Student Father Phone</Typography>
                                            <TextField
                                                variant="standard"
                                                type="number"
                                                value={studentData.sfphone}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        sfphone: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="col">
                                            <Typography>Student Mother Phone</Typography>
                                            <TextField
                                                variant="standard"
                                                type="number"
                                                value={studentData.smphone}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        smphone: e.target.value,
                                                    })
                                                }
                                            />
                                            <Typography>Student Section</Typography>
                                            <TextField
                                                variant="standard"
                                                type="number"
                                                value={studentData.sSection}
                                                onChange={(e) =>
                                                    setStudentData({
                                                        ...studentData,
                                                        sSection: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={updateStudentData}
                    >
                        Update
                    </Button>

                    <span> </span>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={deleteStudent}
                    >
                        Delete
                    </Button>
                    <ToastContainer />
                </div>
            ) : null}
        </div>
    );
};

export default Editstudent;
