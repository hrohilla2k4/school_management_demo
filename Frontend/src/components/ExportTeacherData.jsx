import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from './authcontext';


const Exportteacherdata = () => {
    const [data, setData] = useState([]);
    const {schoolId} = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8181/show_teachers')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);

            });
    }
        , [])

    return (
        <div className="container">
            <div className="col-md-4 text-left">
                <h2><mark>Teacher Data Table</mark></h2> <br />
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Teacher Id</th>
                        <th>Teacher Name</th>
                        <th>Teacher Age</th>
                        <th>Teacher Phone</th>
                        <th>Teacher Mail</th>
                        <th>Teacher Password</th>
                        <th>Teacher Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => {
                            if ((d.schoolId == schoolId)) {
                                return (
                                    <tr key={i}>
                                        <td>{d.teacher_id}</td>
                                        <td>{d.teacher_name}</td>
                                        <td>{d.teacher_age}</td>
                                        <td>{d.teacher_phone}</td>
                                        <td>{d.teacher_mail}</td>
                                        <td>{d.teacher_password}</td>
                                        <td>{d.teacher_salary}</td>
                                    </tr>
                                );
                            }
                            return null; // Return null for rows that don't match the condition
                        })}
                </tbody>
            </table>



            <CSVLink data={data}><Button variant='contained' color='success'>Export</Button></CSVLink>


        </div>
    );
};

export default Exportteacherdata;
