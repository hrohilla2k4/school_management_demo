import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from './authcontext';


const Exportpeondata = () => {
    const [data, setData] = useState([]);
    const { schoolId } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8181/show_peons')
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
                <h2><mark>Peon Data Table</mark></h2> <br />
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Peon Id</th>
                        <th>Peon Name</th>
                        <th>Peon Age</th>
                        <th>Peon Phone</th>
                        <th>Peon Designation</th>
                        <th>Peon Salary</th>
                        <th>Peon Address</th>
                     
                    </tr>
                </thead>
                <tbody>
                    {data
                        .map((d, i) => {
                            if ((d.schoolId == schoolId)) {
                                return (
                                    <tr key={i}>
                                        <td>{d.peon_id}</td>
                                        <td>{d.peon_name}</td>
                                        <td>{d.peon_age}</td>
                                        <td>{d.peon_phoneno}</td>
                                        <td>{d.peon_designation}</td>
                                        <td>{d.peon_salary}</td>
                                        <td>{d.peon_address}</td>
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

export default Exportpeondata;
