import axios from "axios";
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { useState } = require("react");




const Editpeon = () => {

    const [peonId, setPeonId] = useState('');
    const [editForm, setEditForm] = useState(false);
    const [data, setData] = useState('');


    const [peonData, setPeonData] = useState({

        peonName: '',
        peonAge: '',
        peonPhone: '',
        peonSalary: '',
        peonAddress: '',
        peonDesignation: '',
        peonId: ''

    });

    const handleSubmitClick = async () => {
        try {
            // Make the GET request to fetch teacher data
            const response = await axios.get(`http://localhost:8181/edit_peon/${peonId}`, {
                headers: {
                    Accept: 'application/json',
                },
            });

            // Check if the response contains data and is an array
            if (Array.isArray(response.data) && response.data.length > 0) {
                // Extract the first object from the array
                const fetchedPeonData = response.data[0];
                toast.success(`Data fetched for ${peonId}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setPeonData(fetchedPeonData);
                setEditForm(true);
            } else {
                toast.error(`Data not fetched for ${peonId}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (err) {
            console.error('Error fetching peon data:', err.message);
        }
    };

    const updatePeonData = async () => {
        try {
            // Make the PUT request to update teacher data
            const response = await axios.put(`http://localhost:8181/edited_peon`, peonData, {
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
            });

            if (response.status === 200) {
                toast.success(`Data updated for ${peonId}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });

                

                
                // Optionally, you can reset the form or perform any other actions after a successful update.
            } else {
                toast.error(`Data not updated for ${peonId}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (err) {
            console.error('Error updating peon data:', err.message);
        }
    };

    const handleDelete = () => {
        axios
          .delete(`http://localhost:8181/delete_peon/${peonId}`)
          .then((res) => {
            if (res.status == 200) {
              toast.success("Deleted record!", { position: toast.POSITION.TOP_CENTER });
            } else {
              toast.error("Error in deleting record", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((error) => {
            toast.error(`Error in deleting record for ${peonId}`, {
              position: toast.POSITION.TOP_RIGHT,
            });
            console.log(error);
          });
      };
      
    




    return (
        <div>
            <div>
                <Typography>Enter peon id</Typography>
                <TextField variant="standard" type="number" required value={peonId} onChange={(e) => setPeonId(e.target.value)} /> <br /> <br />
                <Button variant="contained" color="primary" onClick={handleSubmitClick}>Submit</Button>

            </div>
            {
                editForm ?
                    (
                        <div>
                            <Typography>Peon Name</Typography>
                            <TextField variant="standard" required value={peonData.peon_name} onChange={(e) => setPeonData({ ...peonData, peon_name: e.target.value })}/> <br /> <br />
                            <Typography>Peon Age</Typography>
                            <TextField variant="standard" required value={peonData.peon_age} onChange={(e) => setPeonData({ ...peonData, peon_age: e.target.value })}/> <br /> <br />
                            <Typography>Peon Phone</Typography>
                            <TextField variant="standard" required value={peonData.peon_phoneno} onChange={(e) => setPeonData({ ...peonData, peon_phoneno: e.target.value })} /> <br /> <br />
                            <Typography>Peon Salary</Typography>
                            <TextField variant="standard" required value={peonData.peon_salary} onChange={(e) => setPeonData({ ...peonData, peon_salary: e.target.value })}/> <br /> <br />
                            <Typography>Peon Designation</Typography>
                            <TextField variant="standard" required value={peonData.peon_designation} onChange={(e) => setPeonData({ ...peonData, peon_designation: e.target.value })}/> <br /> <br />
                            <Typography>Peon Address</Typography>
                            <TextField variant="standard" required value={peonData.peon_address} onChange={(e) => setPeonData({ ...peonData, peon_address: e.target.value })}/> <br /> <br />
                            <Button variant="contained" color="success" onClick={updatePeonData}><EditIcon />Update</Button> <br /> <br />
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

export default Editpeon;