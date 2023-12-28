import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./authcontext";
import axios from "axios";
const { Typography } = require("@mui/material");
const { useState } = require("react");


const Paysalary = () => {


    const { schoolId } = useContext(AuthContext);

    const [selectedPerson, setSelectedPerson] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [data, setData] = useState([]);
    const [peonData, setPeonData] = useState([]);
    const [search, setSearch] = useState('');
    const [paidTeacherIds, setPaidTeacherIds] = useState([]);
    const [paidPeonIds, setPaidPeonIds] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8181/show_teachers')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                console.log(data)
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        fetch('http://localhost:8181/show_peons')
            .then((res) => res.json())
            .then((peonData) => {
                setPeonData(peonData)
                console.log(data)
            })
            .catch(err => console.log(err))

    }, [])

    const handlePayClick = (teacher_id, teacher_name) => {
        axios
            .post('http://localhost:8181/teacher_salary_credentials', {
                teacher_name,
                teacher_id,
                month,
                year,
                salaryStatus: 'paid',
                schoolId,
            })
            .then((res) => {
                // Handle the response here if needed
                console.log(res.data); // This line will log the response data
                setPaidTeacherIds((prevPaidTeacherIds) => [
                    ...prevPaidTeacherIds,
                    teacher_id,
                ]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handlePeonPayClick = (peon_id, peon_name) => {
        axios
            .post('http://localhost:8181/peon_salary_credentials', {
                peon_name,
                peon_id,
                month,
                year,
                salaryStatus: 'paid',
                schoolId,
            })
            .then((res) => {
                // Handle the response here if needed
                console.log(res.data); // This line will log the response data
                setPaidPeonIds((prevpaidPeonIds) => [
                    ...prevpaidPeonIds,
                    peon_id,
                ]);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className="container text-center">
            <div className="container">
                <div className="display-3 text-center">
                    <span><img src="/images/money-icon.png" alt="" width={100} />Pay Salary</span>
                </div>
                <div className="col">
                    <div className="col">
                        <Typography>Enter Year</Typography>
                        <input
                            type="number"
                            required
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                    <Typography>Select Month</Typography>
                    <select onChange={(e) => setMonth(e.target.value)}>
                        <option disabled selected value="">Select Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                    </select>
                </div> <br />
                <div className="col">
                    <Typography>Select Entity</Typography>
                    <select onChange={(e) => setSelectedPerson(e.target.value)}>
                        <option disabled selected value="">Select Entity</option>
                        <option>Teacher</option>
                        <option>Peon</option>
                    </select>
                </div> <br />

            </div>

            {/* Render Teacher Section if 'Teacher' is selected */}
            {selectedPerson === 'Teacher' && (
                <div className="container">
                    <div className="col-md-4 text-left">
                        <h2><mark>Teacher Data Table</mark></h2> <br />
                    </div>
                    <span>Search Here: </span>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter name" /> <br /> <br />
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data
                                .filter((item) => { return search.toLowerCase == '' ? item : item.teacher_name.toLowerCase().includes(search); })
                                .map((d, i) => {
                                    if ((d.schoolId == schoolId) && (!paidTeacherIds.includes(d.teacher_id))) {
                                        return (
                                            <tr key={i}>
                                                <td>{d.teacher_id}</td>
                                                <td>{d.teacher_name}</td>
                                                <td>{d.teacher_age}</td>
                                                <td>{d.teacher_phone}</td>
                                                <td>{d.teacher_mail}</td>
                                                <td>{d.teacher_password}</td>
                                                <td>{d.teacher_salary}</td>
                                                <td>
                                                    <button class="btn btn-success" onClick={() => { handlePayClick(d.teacher_id, d.teacher_name) }}>Pay</button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null; // Return null for rows that don't match the condition
                                })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Render Peon Section if 'Peon' is selected */}
            {selectedPerson === 'Peon' && (
                <div className="container">
                    <div className="col-md-4 text-left">
                        <h2><mark>Peon Data Table</mark></h2> <br />
                    </div>
                    <span>Search Here: </span>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter name" /> <br /> <br />
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peonData
                                .filter((item) => { return search.toLowerCase == '' ? item : item.peon_name.toLowerCase().includes(search); })
                                .map((d, i) => {
                                    if ((d.schoolId == schoolId)&& (!paidPeonIds.includes(d.peon_id))) {
                                        return (
                                            <tr key={i}>
                                                <td>{d.peon_id}</td>
                                                <td>{d.peon_name}</td>
                                                <td>{d.peon_age}</td>
                                                <td>{d.peon_phoneno}</td>
                                                <td>{d.peon_designation}</td>
                                                <td>{d.peon_salary}</td>
                                                <td>{d.peon_address}</td>
                                                <td>
                                                    <button class="btn btn-success" onClick={()=>{handlePeonPayClick(d.peon_id , d.peon_name)}}>Pay</button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null; // Return null for rows that don't match the condition
                                })}
                        </tbody>
                    </table>
                </div>

            )}
        </div>
    );
}

export default Paysalary;  
