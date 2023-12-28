import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "./authcontext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Checkfees = () => {

    const [data, setData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [studentData, setStudentData] = useState(false);
    const [feeStatus, setFeeStatus] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [studentSection, setStudentSection] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [search , setSearch] = useState('');
    
    const {schoolId} = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8181/check_fees')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                toast.success("Data fetched",{position: toast.POSITION.TOP_CENTER})
            })
            .catch(err => {toast.error("Error in fetching data", {position: toast.POSITION.TOP_CENTER})})

    }, [])

    useEffect(() => {
        fetch('http://localhost:8181/attendance_info')
            .then(res => res.json()) // Return the response data here
            .then(attendanceData => {
                setAttendanceData(attendanceData)
            })
            .catch((err) => {toast.err("Error in fetching the sections",{position: toast.POSITION.TOP_CENTER})})
    }, [])

    const handleDataSubmit = () => {
        setStudentData(true);
    }

    const deleteRecord = (rollno, month, year, section, studentClass) => {
        axios
            .delete(`http://localhost:8181/check_fees/${rollno}/${month}/${year}/${section}/${studentClass}`)
            .then((response) => {
                
                toast.success("Record deletion success!",{position: toast.POSITION.TOP_CENTER})
                
            })
            .catch((error) => {
                toast.error("Error in deleting the record!",{position: toast.POSITION.TOP_CENTER})
            });

            setData(data => data.filter(d=>d.rollno!== rollno));
           
    };

    const printFees = () =>{
        const goHere = 'http://localhost:3000/print_fees';
        window.open(goHere,'_blank');
    }




    return (
        <div className="container">
            <div className="container text-center">
                <div className="container">
                    <div className="display-3 text-center">

                        <span> <img src="/images/money-icon.png" alt="" width={100} />Check Fees</span>

                    </div>
                </div>
            </div>
            <br /> <br />

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
                <div className="col">
                    <Typography>Select Fees Status</Typography>
                    <select onChange={(e) => (setFeeStatus(e.target.value))}>
                        <option disabled selected value="">Select Fees Status</option>
                        <option>paid</option>
                        <option>unpaid</option>
                    </select> <br /> <br />
                </div>

                <div className="col">
                    <Typography>Select Month</Typography>
                    <select onChange={(e) => (setMonth(e.target.value))}>
                        <option disabled selected value="">Select Month</option>
                        <option>January</option>
                        <option>Feburary</option>
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
                </div>
                <div>
                    <Typography>Enter year</Typography>
                    <TextField variant="standard" type="number" required onChange={(e) => setYear(e.target.value)} />
                    <br /> <br />
                </div>
            </div>






            <Button variant="outlined" color="success" onClick={handleDataSubmit}>Submit</Button>
            <br /> <br />

            {
                studentData ?
                    (
                        <div>
                            <span>Search Here: </span>
                            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Enter Rollno"/> <br /> <br />
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Student Class</th>
                                        <th>Student Section</th>
                                        <th>Student Roll Number</th>
                                        <th>Student Fees Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data
                                    .filter((item)=>{ return search.trim() === '' ? true : (item.rollno || '').toString().includes(search)})
                                    .map((d, i) => {
                                        if ((d.section == studentSection) && (d.class == studentClass) && (d.status == feeStatus) && (d.month == month) && (d.year == year)&& (d.schoolId == schoolId)) {
                                            return (
                                                <tr key={i}>
                                                    <td>{d.class}</td>
                                                    <td>{d.section}</td>
                                                    <td>{d.rollno}</td>
                                                    <td>{d.status}</td>
                                                    <td>
                                                        <button onClick={()=>deleteRecord(d.rollno,month,year,d.section,d.class)}>Delete</button>
                                                        <span> </span><button onClick={printFees}>Print Receipt</button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return null; // Return null for rows that don't match the condition
                                    })}
                                </tbody>
                            </table>
                            <ToastContainer />
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
export default Checkfees;