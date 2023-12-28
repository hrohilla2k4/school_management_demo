import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import CustomModal from "./Modal";
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import { AuthContext } from "./authcontext";
import './print.css'

const Showstudents = () => {
    const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState(false);
    const [studentClass, setStudentClass] = useState("");
    const [studentSection, setStudentSection] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [billingPeriod, setBillingPeriod] = useState('');
    const [receiptDate, setReceiptDate] = useState('');
    const [paidAmount, setPaidAmount] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [search , setSearch] = useState('');

    const {schoolId} = useContext(AuthContext);

    useEffect(() => {
        fetch("http://localhost:8181/show_students")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8181/attendance_info")
            .then((res) => res.json())
            .then((attendanceData) => {
                setAttendanceData(attendanceData);
            });
    }, []);

    const receiptNo = uuidv4();

    const handleDataSubmit = () => {
        setStudentData(true);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleGenerateReceipt = (student) => {
        setSelectedStudent(student);
        openModal();
    };

    const handlePrint = () => {
        window.print();
    }

    return (
        <div className="container text-center">
            <div className="display-3 text-center">
                <span>
                    {" "}
                    <img src="/images/receipt-icon.png" alt="" width={100} /> Generate Receipt
                </span>
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <Typography>Select Class</Typography>
                    <select onChange={(e) => setStudentClass(e.target.value)}>
                        <option disabled selected value="">
                            Select Class
                        </option>
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
                    <select onChange={(e) => setStudentSection(e.target.value)}>
                        <option disabled selected value="">
                            Select Section
                        </option>
                        {attendanceData.filter((d)=>d.schoolId == schoolId)
                        .map((d, index) => (
                            <option key={index} value={d.sSection}>
                                {d.sSection}
                            </option>
                        ))}
                    </select>{" "}
                    <br /> <br /> <br />


                </div>
                <div className="row">
                    <div className="col">
                        <Typography>Enter Billing Period</Typography>
                        <TextField type="text" variant="standard" placeholder="ex. october-november" value={billingPeriod} onChange={(e) => setBillingPeriod(e.target.value)} />
                    </div>

                    <br /> <br />
                    <div className="col">
                        <Typography>Enter Date</Typography>
                        <TextField type="date" variant="standard" value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} />
                    </div>

                    <br /> <br />

                    <div className="col">
                        <Typography>Enter Amount</Typography>
                        <TextField type="number" variant="standard" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} />
                    </div>

                    <div className="col">
                        <Typography>School Name</Typography>
                        <TextField type="text" variant="standard" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                    </div>


                </div>
            </div>
            <div>
                <br /> <br />
                <Button variant="outlined" color="success" onClick={handleDataSubmit}>
                    Submit
                </Button>
            </div>
            <br />
            {studentData ? (
                <div className="container">
                    <div className="col-md-4 text-left">
                        <h2>
                            <mark>Student Data Table</mark>
                        </h2>{" "} <br />
                    <span>Search Here: </span>
                    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />

                        <br />
                    </div>
                    <br />
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Student Class</th>
                                <th>Student Id</th>
                                <th>Student Section</th>
                                <th>Student Name</th>                                
                                <th>Student Father Name</th>                                
                                <th>Student Roll No</th>                                
                                <th>Student Fees Amount</th>                                

                            </tr>
                        </thead>
                        <tbody>
                            {data
                            .filter((item)=>{return search.toLowerCase()==''? item: item.sname.toLowerCase().includes(search)})
                            .map((d, i) => {
                                if (d.sSection == studentSection && d.class == studentClass) {
                                    return (
                                        <tr key={i}>
                                            <td>{d.class}</td>
                                            <td>{d.sid}</td>
                                            <td>{d.sSection}</td>
                                            <td>{d.sname}</td>
                                            <td>{d.sfname}</td>
                                            <td>{d.srollno}</td>
                                            <td>{d.sfeesamt}</td>
                                           
                                            
                                            <td>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleGenerateReceipt(d)}
                                                >
                                                    Generate Receipt
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                }
                                return null; // Return null for rows that don't match the condition
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div></div>
            )}
            <CustomModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                content={
                    <div>
                        <h4 class = "school-heading">{schoolName}</h4>
                        {selectedStudent && (
                            <div>
                                <p>Student Name: {selectedStudent.sname}</p>
                                <p>Student Father Name: {selectedStudent.sfname}</p>
                                <p>Student Class: {selectedStudent.class}</p>
                                <p>Student Section: {selectedStudent.sSection}</p>
                                <p>Student Roll No: {selectedStudent.srollno}</p>
                                <p>Billing Period: {billingPeriod}</p>
                                <p>Receipt Date: {receiptDate}</p>
                                <p>Receipt Number: {receiptNo}</p>
                                <p>Paid amount: {paidAmount}</p>

                            </div>
                        )}
                        <Button variant="contained" color="success" onClick={handlePrint}>
                            Print Receipt
                        </Button>
                    </div>
                }
            />
        </div>
    );
};

export default Showstudents;
