import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./authcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AcceptFees = () => {

    //First creating the states that I will need. 

    const [data, setData] = useState([]); //for students all details
    const [studentData, setStudentData] = useState(false); //for form
    const [studentClass, setStudentClass] = useState(''); // for student's class in select option
    const [attendanceData, setAttendanceData] = useState([]); //for distinct sections
    const [section, setSection] = useState(''); //for section that is selected in the form. 
    const [rollno, setRollno] = useState(''); // for roll no of the student
    const [month, setMonth] = useState(''); //for month of the fees
    const [year, setYear] = useState(''); //for year of the fees
    const [paidStatus, setPaidStatus] = useState({}); //this is for sending paid and unpaid in the database
    const [search, setSearch] = useState(''); //this is for filtering the records. 
    const { schoolId } = useContext(AuthContext); //Using schoolId to filter the records. 



    // Fetching the records of all students
    useEffect(() => {
        fetch('http://localhost:8181/show_students')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                toast.success("Records fetched successfully", { position: toast.POSITION.BOTTOM_CENTER });
            })
            .catch(err => {
                console.log(err);
                toast.error("Error in fetching records", { position: toast.POSITION.BOTTOM_CENTER });
            });
    }, []);

    //Fetching records for getting distinct sections and distinct schoolId
    useEffect(() => {
        fetch('http://localhost:8181/attendance_info')
            .then(res => res.json()) // Return the response data here
            .then(attendanceData => {
                setAttendanceData(attendanceData)
            }) /**Want to schow notification here on error.  */
    }, [])

    //Setting the form true for showing the data.
    const handleDataSubmit = () => {
        setStudentData(true);
    }

    //When the user clicks - received this will happen
    const handleReceivedClick = (r, index) => {
        setRollno(r);
        if (rollno > 0) {
            axios
                .post('http://localhost:8181/accept_fees', {
                    month,
                    studentClass,
                    feesStatus: 'paid',
                    studentRollno: r,
                    section,
                    year,
                    schoolId
                })
                .then((res) => { toast.success("Fees Received - Entry Saved", { position: toast.POSITION.TOP_CENTER }) })
                .catch((err) => { toast.error("Fees Not Received - Entry Not Saved", { position: toast.POSITION.TOP_CENTER }) });

            setPaidStatus((prevStatus) => ({
                ...prevStatus,
                [index]: true,
            }));







        } else {
            toast.error("Please click again - didn't got the rollno value", { position: toast.POSITION.BOTTOM_CENTER })
        }
    };

    //When the user clicks - not received this will happen
    const handleNotReceivedClick = (r, index) => {
        setRollno(r);

        if (rollno > 0) {
            axios
                .post('http://localhost:8181/accept_fees', {
                    month,
                    studentClass,
                    feesStatus: 'unpaid',
                    studentRollno: r,
                    section,
                    year,
                    schoolId
                })
                .then((res) => { toast.info("Entry Save For Not Received", { position: toast.POSITION.TOP_CENTER }) })
                .catch((err) => { toast.info("Error In  Saving Not Received Entry", { position: toast.POSITION.TOP_CENTER }) });



            setPaidStatus((prevStatus) => ({
                ...prevStatus,
                [index]: false,
            }));
        }






        else {
            toast.error("Please click again - didn't got the rollno value", { position: toast.POSITION.BOTTOM_CENTER })
        }

    };

    //Print the fees - receipt
    const handlePrintReceiptClick = () => {
        const goHere = 'http://localhost:3000/print_fees'

        window.open(goHere, '_blank');
    }

    return (

        <div className="container">
            <div className="container text-center">
                <div className="container">
                    <div className="display-3 text-center">
                        <span> <img src="/images/money-icon.png" alt="" width={100} />Accept Fees</span>
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

                <div className="col">
                    <Typography>Select Section</Typography>
                    <select onChange={(e) => (setSection(e.target.value))}>
                        <option disabled selected value="">Select Section</option>
                        {attendanceData.filter((d) => d.schoolId == schoolId)
                            .map((d, index) => (
                                <option key={index} value={d.sSection}>
                                    {d.sSection}
                                </option>
                            ))}
                    </select> <br /> <br />

                </div>
            </div>

            <Typography>Enter year</Typography>
            <TextField variant="standard" type="number" required onChange={(e) => setYear(e.target.value)} />
            <br /> <br />

            <Button variant="outlined" color="success" onClick={handleDataSubmit}>Submit</Button><br /> <br />

            {
                studentData ?
                    (
                        <div>
                            <ToastContainer />
                            <span>Search Here: </span>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter name" /> <br /> <br />
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Student Class</th>
                                        <th>Student Section</th>
                                        <th>Student Name</th>
                                        <th>Student Roll Number</th>
                                        <th>Student Address</th>
                                        <th>Student Fees Amount</th>
                                        <th>Student Fees Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data
                                        .filter((item) => { return search.toLowerCase() === '' ? item : item.sname.toLowerCase().includes(search) })
                                        .map((d, i) => {
                                            if (d.sSection == section && d.class == studentClass && d.schoolId == schoolId) {
                                                return (
                                                    <tr key={i}>
                                                        <td>{d.class}</td>
                                                        <td>{d.sSection}</td>
                                                        <td>{d.sname}</td>
                                                        <td>{d.srollno}</td>
                                                        <td>{d.saddress}</td>
                                                        <td>{d.sfeesamt}</td>
                                                        <td>
                                                            {paidStatus[i] == true ?
                                                                (
                                                                    <span>Received</span>
                                                                ) :
                                                                paidStatus[i] === false ?
                                                                    (
                                                                        <span>Not Received</span>
                                                                    ) :
                                                                    (
                                                                        <div>
                                                                            <button
                                                                                className="btn btn-success btn-sm"
                                                                                onClick={() => handleReceivedClick(d.srollno, i)}
                                                                            >
                                                                                Received
                                                                            </button>
                                                                            <br />
                                                                            <button
                                                                                className="btn btn-danger btn-sm"
                                                                                onClick={() => handleNotReceivedClick(d.srollno, i)}
                                                                            >
                                                                                Not Received
                                                                            </button>
                                                                            <br />
                                                                        </div>
                                                                    )}

                                                        </td>
                                                        <td><button onClick={handlePrintReceiptClick}>Print Receipt</button></td>
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
};

export default AcceptFees;
