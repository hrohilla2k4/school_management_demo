import { useEffect, useState } from "react";
import {
    FormControl, InputLabel, MenuItem, Select, TextField, Typography,
    Table, TableHead, TableBody, TableRow, TableCell, Button
} from "@mui/material";
import { AuthContext } from "./authcontext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checksalaries = () => {
    const [entity, setEntity] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [teacherData, setTeacherData] = useState([]);
    const [peonData, setPeonData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { schoolId } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:8181/teacher_salary_data')
            .then(res => res.json())
            .then((teacherData) => {
                setTeacherData(teacherData);
                toast.success("Teacher salary data fetched", { position: toast.POSITION.TOP_CENTER })
            })
            .catch((err) => { toast.error("Teacher salary data not fetched", { position: toast.POSITION.TOP_CENTER }) });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8181/peon_salary_data')
            .then(res => res.json())
            .then((peonData) => {
                setPeonData(peonData);
                toast.success("Peon salary data fetched!", { position: toast.POSITION.TOP_RIGHT })
            })
            .catch((err) => { toast.error("Peon salary data not fetched", { position: toast.POSITION.TOP_CENTER }) });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    const filterTeacherData = teacherData.filter((teacher) => (
        teacher.schoolId == schoolId &&
        teacher.Month == month &&
        teacher.Year == year &&
        (teacher.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) || teacher.teacherId.toString().includes(searchQuery))
    ));

    const filterPeonData = peonData.filter((peon) => (
        peon.schoolId == schoolId &&
        peon.Month == month &&
        peon.Year == year &&
        (peon.peonName.toLowerCase().includes(searchQuery.toLowerCase()) || peon.peonId.toString().includes(searchQuery))
    ));

    // Define a function to render the data table for teachers
    const renderTeacherTable = (filteredData) => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Teacher ID</TableCell>
                    <TableCell>Teacher Name</TableCell>
                    <TableCell>Salary Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredData.map((teacher) => (
                    <TableRow key={teacher.teacherId}>
                        <TableCell>{teacher.teacherId}</TableCell>
                        <TableCell>{teacher.teacherName}</TableCell>
                        <TableCell>{teacher.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    // Define a function to render the data table for peons
    const renderPeonTable = (filteredData) => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Peon ID</TableCell>
                    <TableCell>Peon Name</TableCell>
                    <TableCell>Salary Status</TableCell>
                    {/* Add more table headers as needed */}
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredData.map((peon) => (
                    <TableRow key={peon.peonId}>
                        <TableCell>{peon.peonId}</TableCell>
                        <TableCell>{peon.peonName}</TableCell>
                        <TableCell>{peon.status}</TableCell>
                        {/* Add more table cells for other peon data */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div className="container" style={{ padding: '20px' }}>
            <Typography variant="h4" align="center">Check Salaries</Typography>
            <div className="row">
                <div className="col-md-6" style={{ padding: '10px' }}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel>Select Entity</InputLabel>
                        <Select
                            value={entity}
                            onChange={(e) => setEntity(e.target.value)}
                        >
                            <MenuItem value="">Select Entity</MenuItem>
                            <MenuItem value="Teacher">Teacher</MenuItem>
                            <MenuItem value="Peon">Peon</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="col-md-3" style={{ padding: '10px' }}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel>Select Month</InputLabel>
                        <Select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <MenuItem value="">Select Month</MenuItem>
                            <MenuItem value="January">January</MenuItem>
                            <MenuItem value="February">February</MenuItem>
                            <MenuItem value="March">March</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="June">June</MenuItem>
                            <MenuItem value="July">July</MenuItem>
                            <MenuItem value="August">August</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="October">October</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="December">December</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="col-md-3" style={{ padding: '10px' }}>
                    <TextField
                        label="Enter Year"
                        variant="outlined"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            <TextField
                label="Search by Name or ID"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                fullWidth
            />

            <div style={{ margin: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </div>

            {entity === 'Teacher' && renderTeacherTable(filterTeacherData)}
            {entity === 'Peon' && renderPeonTable(filterPeonData)}

            <ToastContainer />
        </div>
    );
}

export default Checksalaries;
