import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Exportdata = () => {

    const navigate = useNavigate();

    const handleExportStudent = () => {
        navigate('/student_data_export');
    }
    const handleExportTeacher = () => {
        navigate('/teacher_data_export');
    }

    const handleExportPeon = () => {
        navigate('/peon_data_export');
    }

    const handleExportSalary = () => {
        navigate('/salary_data_export')
    }
    const handleExportAttendance = () => {
        navigate('/attendance_data_export')
    }

    const handleExportFees = () => {
        navigate('/fees_data_export')
    }


    return (
        <div className="container">
            <div className="row">
                <div className="heading display-1 col">
                    <p className="border bg-danger text-white text-center">Export Data</p> <br />

                </div>
            </div>

            <br />

            <div className="col-md-5 container">
                <div className="row button">
                    <div className="image col">
                        <img src="/images/export-icon.png" alt="school image" width={200} height={200} />
                    </div>
                    <div className="col">
                        <div className="col"><Button color="warning" variant="contained" onClick={handleExportStudent}>Export Student Data</Button></div>
                        <div className="col mt-2"><Button color="info" variant="contained" onClick={handleExportTeacher}>Export Teacher Data</Button></div>
                        <div className="col mt-2"><Button color="warning" variant="contained" onClick={handleExportPeon} >Export Peon Data</Button> </div>
                        <div className="col mt-2"><Button color="info" variant="contained" onClick={handleExportSalary}>Export Salary Data</Button></div>
                        <div className="col mt-2"> <Button color="info" variant="contained" onClick={handleExportAttendance}>Export Attendance Data</Button></div>
                        <div className="col mt-2"> <Button color="warning" variant="contained" onClick={handleExportFees}>Export Fees Data</Button></div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Exportdata;