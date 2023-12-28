import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from './authcontext';


const Exportsalarydata = () => {
    const [data, setData] = useState([]);
    const [peonData, setPeonData] = useState([]);
    const { schoolId } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8181/teacher_salary_data')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);

            });
    }
        , [])

        useEffect(() => {
            fetch('http://localhost:8181/peon_salary_data')
                .then((response) => response.json())
                .then((peondata) => {
                    setPeonData(peondata); // Use setPeonData instead of setPeonData
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }, []);


    return (
        <div className="container">
            <div className="col-md-4 text-left">
                <h2><mark> Teacher Salary Data Table</mark></h2> <br />
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Teacher Name</th>
                        <th>Teacher Id</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {data
                        .map((d, i) => {
                            if ((d.schoolId == schoolId)) {
                                return (
                                    <tr key={i}>
                                        <td>{d.teacherName}</td>
                                        <td>{d.teacherId}</td>
                                        <td>{d.Month}</td>
                                        <td>{d.Year}</td>
                                        <td>{d.status}</td>

                                    </tr>
                                );
                            }
                            return null; // Return null for rows that don't match the condition
                        })}
                </tbody>
            </table>


            <CSVLink data={data}><Button variant='contained' color='success'>Export</Button></CSVLink> <br /> <br />

            {/**Peon Data */}

            <div className="col-md-4 text-left">
                <h2><mark>Peon Salary Data Table</mark></h2> <br />
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Peon Name</th>
                        <th>Peon Id</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {peonData.map((dd, ii) => {
                            if ((dd.schoolId == schoolId)) {
                                return (
                                    <tr key={ii}>
                                        <td>{dd.peonName}</td>
                                        <td>{dd.peonId}</td>
                                        <td>{dd.Month}</td>
                                        <td>{dd.Year}</td>
                                        <td>{dd.status}</td>
                                    </tr>
                                );
                            }
                            return null; // Return null for rows that don't match the condition
                        })}
                </tbody>
            </table>


            <CSVLink data={peonData}><Button variant='contained' color='success'>Export</Button></CSVLink>


        </div>
    );
};

export default Exportsalarydata;
