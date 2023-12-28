import axios from "axios";
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const { useState } = require("react");




const Editteacher = () => {

    const [teacherId, setTeacherId] = useState('');
    const [editForm, setEditForm] = useState(false);
    const [data, setData] = useState('');


    const [teacherData, setTeacherData] = useState({

        teacherName: '',
        teacherAge: '',
        teacherPhone: '',
        teacherMail: '',
        teacherPassword: '',
        teacherSalary: ''

    });

    const handleSubmitClick = async () => {
        try {
            // Make the GET request to fetch teacher data
            const response = await axios.get(`http://localhost:8181/edit_teacher/${teacherId}`, {
                headers: {
                    Accept: 'application/json',
                },
            });

            // Check if the response contains data and is an array
            if (Array.isArray(response.data) && response.data.length > 0) {
                // Extract the first object from the array
                const fetchedTeacherData = response.data[0];
                toast.success(`Data fetched for ${teacherId}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setTeacherData(fetchedTeacherData);
                setEditForm(true);
            } else {
                toast.error(`Data not fetched for ${teacherId}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (err) {
            console.error('Error fetching teacher data:', err.message);
        }
    };

    const updateTeacherData = async () => {
        try {
            // Make the PUT request to update teacher data
            const response = await axios.put(`http://localhost:8181/edited_teacher`, teacherData, {
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
            });

            if (response.status === 200) {
                toast.success(`Data updated for ${teacherId}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });

                

                
                // Optionally, you can reset the form or perform any other actions after a successful update.
            } else {
                toast.error(`Data not updated for ${teacherId}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (err) {
            console.error('Error updating teacher data:', err.message);
        }
    };

    const handleDelete = () => {
        axios
        .delete(`http://localhost:8181/delete_teacher/${teacherId}`)
        .then((response) => {
            toast.success(`Record deleted of ${teacherId}`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
        .catch((error) => {
            toast.success(`Error in deleting record for ${teacherId}`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        });

        };
    




    return (
        <div>
            <div>
                <Typography>Enter teacher id</Typography>
                <TextField variant="standard" type="number" required value={teacherId} onChange={(e) => setTeacherId(e.target.value)} /> <br /> <br />
                <Button variant="contained" color="primary" onClick={handleSubmitClick}>Submit</Button>

            </div>
            {
                editForm ?
                    (
                        <div>
                            <Typography>Teacher Name</Typography>
                            <TextField variant="standard" required value={teacherData.teacher_name} onChange={(e) => setTeacherData({ ...teacherData, teacher_name: e.target.value })}/> <br /> <br />
                            <Typography>Teacher Age</Typography>
                            <TextField variant="standard" required value={teacherData.teacher_age} onChange={(e) => setTeacherData({ ...teacherData, teacher_age: e.target.value })}/> <br /> <br />
                            <Typography>Teacher Phone</Typography>
                            <TextField variant="standard" required value={teacherData.teacher_phone} onChange={(e) => setTeacherData({ ...teacherData, teacher_phone: e.target.value })} /> <br /> <br />
                            <Typography>Teacher mail</Typography>
                            <TextField variant="standard" required value={teacherData.teacher_mail} onChange={(e) => setTeacherData({ ...teacherData, teacher_mail: e.target.value })}/> <br /> <br />
                            <Typography>Teacher password</Typography>
                            <TextField variant="standard" required value={teacherData.teacher_password} onChange={(e) => setTeacherData({ ...teacherData, teacher_password: e.target.value })}/> <br /> <br />
                            <Typography>Teacher salary</Typography>
                            <TextField variant="standard" required value={teacherData.teacher_salary} onChange={(e) => setTeacherData({ ...teacherData, teacher_salary: e.target.value })}/> <br /> <br />
                            <Button variant="contained" color="success" onClick={updateTeacherData}><EditIcon />Update</Button> <br /> <br />
                            <Button variant="outlined" ><HomeIcon />Go home</Button> <span></span>
                            <Button variant="contained" color="error" onClick={handleDelete}><DeleteIcon />Delete</Button>
                            <ToastContainer />
                        </div>
                    )
                    :
                    (
                        <div></div>
                    )
            }
        </div>
    )
};

export default Editteacher;