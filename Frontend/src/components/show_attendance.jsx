import { Typography } from "@mui/material";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "./authcontext";

const Showattendance = () => {
    const [studentClass, setStudentClass] = useState('');
    const [studentSection, setStudentSection] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [studentDataForm, setStudentDataForm] = useState(false);
    const [status, setStatus] = useState('')
    const [search, setSearch] = useState('');

    const {schoolId} = useContext(AuthContext);


    useEffect(() => {
        fetch('http://localhost:8181/attendance_info')
            .then(res => res.json()) // Return the response data here
            .then(data => {
                setData(data)
                console.log(data);
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:8181/get_attendance')
            .then(res => res.json()) // Return the response data here
            .then(attendanceData => {
                setAttendanceData(attendanceData)

            })
    }, [])

    // const formatDate = (inputDate) => {
    //     const dateObj = new Date(inputDate);
    //     const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    //     const day = dateObj.getDate().toString().padStart(2, '0');
    //     const year = dateObj.getFullYear();
    //     return `${month}/${day}/${year}`;
    // };


    // const handleDateChange = (e) => {
    //     const selectedDate = e.target.value;
    //     setDate(selectedDate); // Update the state with the selected date
    // };

    const handleDataSubmit = () => {
        setStudentDataForm(true);
    }


    return (
        <div className="container col text-center">
            <div className="container text-center">
                <div className="container">
                    <div className="display-3 text-center">

                        <span> <img src="/images/list-icon.png" alt="" width={100} />Attendance List</span>

                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <Typography>Show records of date</Typography>
                    <TextField variant="standard" type="date" required value={date} onChange={(e) => setDate(e.target.value)} /> <br /> <br />
                </div>
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
            </div>

            <div className="row">
                <div className="col">
                    <Typography>Select Section</Typography>
                    <select onChange={(e) => (setStudentSection(e.target.value))}>
                        <option disabled selected value="">Select Section</option>
                        {data.filter((d)=>d.schoolId == schoolId)
                        .map((d, index) => (
                            <option key={index} value={d.sSection}>
                                {d.sSection}
                            </option>
                        ))}
                    </select> <br /> <br />
                </div>

                <div className="col">
                    <Typography>Select Status</Typography>
                    <select onChange={(e) => (setStatus(e.target.value))}>
                        <option disabled selected value="">Select Status</option>
                        <option>P</option>
                        <option>A</option>
                        <option>L</option>
                    </select> <br /> <br />
                </div>

            </div>

            <Button variant="contained" color="success" size="small" onClick={handleDataSubmit}>Submit</Button>
            <br /> <br />
            {
                studentDataForm ?
                    (
                        <div className="container">
                            <div className="container ">
                                <div>
                                    <h2><mark>Attendance Table</mark></h2> <br />
                                </div> <br /> <br />
                                <span>Search Here: </span>
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} /> <br /> <br />
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Student Section</th>
                                        <th>Student Class</th>
                                        <th>Student Roll No</th>
                                        <th>Attendance Status</th>
                                        <th>Take Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceData
                                        .filter((item) => { return search.trim() === '' ? true : (item.roll_no || '').toString().includes(search) })
                                        .map((t, i) => {
                                            const currentDate = new Date(t.currentDate);
                                            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                                            const day = currentDate.getDate().toString().padStart(2, '0');
                                            const year = currentDate.getFullYear();
                                            const formattedDate = `${year}-${month}-${day}`;

                                            if (t.class == studentClass && t.section == studentSection && formattedDate == date && t.status == status) {
                                                return (
                                                    <tr key={i}>
                                                        <td>{formattedDate}</td>
                                                        <td>{t.section}</td>
                                                        <td>{t.class}</td>
                                                        <td>{t.roll_no}</td>
                                                        <td>{t.status}</td>
                                                        <td>
                                                            <button className="btn btn-secondary btn-sm">Send Message</button>
                                                        </td>
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

        </div>
    )
}
export default Showattendance;