import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Teacherpanel = () => {
    const navigate = useNavigate();

    const handleAddStudents = () => {
        navigate('/add_students');
    }

    const handleShowExistingStudents = () => {
        navigate('/show_students');
    }

    const handleTakeAttendance = () => {
        navigate('/take_attendance');
    }

    const handleShowAttendance = () => {
        navigate('/show_attendance');
    }

    const handleEditStudent = () => {
        navigate('/edit_student');
    }

    return (
        <div style={{ background: 'linear-gradient(135deg, #4caf50, #2196F3)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.9)', maxWidth: '500px' }}>
                <Typography variant="h4" style={{ marginBottom: '20px', color: '#1976D2' }}>
                    Teacher Panel
                </Typography>
                <img src="/images/teacher-panel-icon.png" alt="Teacher Panel" width={100} height={100} style={{ marginBottom: '20px' }} />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleAddStudents}>
                            Add Students
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="secondary" fullWidth onClick={handleShowExistingStudents}>
                            Show Existing Students
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleTakeAttendance}>
                            Take Attendance
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="secondary" fullWidth onClick={handleEditStudent}>
                            Edit Student
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleShowAttendance}>
                            Show Students Attendance
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Teacherpanel;
