import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from './authcontext';


const Exportattendancedata = () => {
    const [data, setData] = useState([]);
    const { schoolId } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8181/get_attendance')
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
                <h2><mark>Fees Data Table</mark></h2> <br />
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Rollno</th>
                        <th>Status</th>
                        <th>Section</th>
                        <th>Date</th>
                        <th>Class</th>
                     
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => {
                            if ((d.schoolId == schoolId)) {
                                return (
                                    <tr key={i}>
                                        <td>{d.roll_no}</td>
                                        <td>{d.status}</td>
                                        <td>{d.section}</td>
                                        <td>{new Date(d.currentDate).toLocaleDateString()}</td>
                                        <td>{d.class}</td>
                                        
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

export default Exportattendancedata;
