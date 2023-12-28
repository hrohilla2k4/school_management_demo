import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "./authcontext";


const Showstudents = () => {

    const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState(false);
    const [studentClass, setStudentClass] = useState('');
    const [studentSection, setStudentSection] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [search, setSearch] = useState('');

    const { schoolId } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8181/show_students')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                console.log(data)
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        fetch('http://localhost:8181/attendance_info')
            .then(res => res.json()) // Return the response data here
            .then(attendanceData => {
                setAttendanceData(attendanceData)
            })
    }, [])

    const handleDataSubmit = () => {
        setStudentData(true);
    };




    return (
        <div className="container text-center">

            <div className="display-3 text-center">

                <span> <img src="/images/list-icon.png" alt="" width={100} />Students List</span>

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
                    <select onChange={(e) => (setStudentSection(e.target.value))}>
                        <option disabled selected value="">Select Section</option>
                        {attendanceData.filter((d)=>d.schoolId == schoolId)
                        .map((d, index) => (
                            <option key={index} value={d.sSection}>
                                {d.sSection}
                            </option>
                        ))}
                    </select>
                </div>


            </div>

            <div><Button variant="outlined" color="success" onClick={handleDataSubmit}>Submit</Button></div>
            <br />

            {
                studentData ?
                    (
                        <div className="container">
                            <div className="col-md-4 text-left">
                                <h2><mark>Student Data Table</mark></h2> <br />
                                <span>Search here: </span>
                                <input type="text" placeholder="Enter name of student" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <br />
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Student Class</th>
                                        <th>Student ID</th>
                                        <th>Student Section</th>
                                        <th>Student Name</th>
                                        <th>Student Father Name</th>
                                        <th>Student Mother Name</th>
                                        <th>Student Roll Number</th>
                                        <th>Student Address</th>
                                        <th>Student Fees Amount</th>
                                        <th>Student Father Phone</th>
                                        <th>Student Mother Phone</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.
                                        filter((item) => { return search.toLowerCase() == '' ? item : item.sname.toLowerCase().includes(search); })
                                        .map((d, i) => {
                                            if ((d.sSection == studentSection) && (d.class == studentClass) && (d.schoolId == schoolId)) {
                                                return (
                                                    <tr key={i}>
                                                        <td>{d.class}</td>
                                                        <td>{d.sid}</td>
                                                        <td>{d.sSection}</td>
                                                        <td>{d.sname}</td>
                                                        <td>{d.sfname}</td>
                                                        <td>{d.smname}</td>
                                                        <td>{d.srollno}</td>
                                                        <td>{d.saddress}</td>
                                                        <td>{d.sfeesamt}</td>
                                                        <td>{d.sfphone}</td>
                                                        <td>{d.smphone}</td>

                                                    </tr>
                                                );
                                            }
                                            return null; // Return null for rows that don't match the condition
                                        })}
                                </tbody>
                            </table>
                        </div>
                    )
                    :
                    (
                        <div>
                        </div>
                    )
            }


        </div >
    )
}

export default Showstudents;