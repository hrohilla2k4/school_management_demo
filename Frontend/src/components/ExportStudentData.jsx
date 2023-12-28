import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from './authcontext';


const ExportStudentdata = () => {
    const [data, setData] = useState([]);
    const {schoolId} = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8181/show_students')
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
                <h2><mark>Student Data Table</mark></h2> <br />
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Student Id</th>
                        <th>Student Name</th>
                        <th>Student Father Name</th>
                        <th>Student Mother Name</th>
                        <th>Student Roll No</th>
                        <th>Student Address</th>
                        <th>Student Fees Amount</th>
                        <th>Student Father Phone</th>
                        <th>Student Mother Phone</th>
                        <th>Student Section Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => {
                            if ((d.schoolId == schoolId)) {
                                return (
                                    <tr key={i}>
                                        <td>{d.class}</td>
                                        <td>{d.sid}</td>
                                        <td>{d.sname}</td>
                                        <td>{d.sfname}</td>
                                        <td>{d.smname}</td>
                                        <td>{d.srollno}</td>
                                        <td>{d.saddress}</td>
                                        <td>{d.feesamt}</td>
                                        <td>{d.sfphone}</td>
                                        <td>{d.smphone}</td>
                                        <td>{d.sSection}</td>
                                    </tr>
                                );
                            }
                            return null; // Return null for rows that don't match the condition
                        })}
                </tbody>
            </table>



            <CSVLink data={data} ><Button variant='contained' color='success'>Export</Button></CSVLink>


        </div>
    );
};

export default ExportStudentdata;
