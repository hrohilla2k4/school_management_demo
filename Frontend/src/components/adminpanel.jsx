import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Typography } from "@mui/material";

const Adminpanel = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    margin: "10px",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="container">
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h2" align="center" color="primary">
              Admin Panel
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <div style={containerStyle}>
        <img src="/images/icon-admin-panel.png" alt="school image" width={200} height={200} />
      </div>

      <Grid container justifyContent="center">
        <Button
          color="warning"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/add_teacher")}
        >
          Add teacher
        </Button>
        <Button
          color="info"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/add_peons")}
        >
          Add peons
        </Button>
        <Button
          color="warning"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/check_salaries")}
        >
          Check Salaries
        </Button>
        <Button
          color="info"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/check_fees")}
        >
          Check Fees
        </Button>
        <Button
          color="warning"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/show_teachers")}
        >
          Check existing teachers
        </Button>
        <Button
          color="info"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/accept_fees")}
        >
          Accept Fees
        </Button>
        <Button
          color="warning"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/teacher_panel")}
        >
          Show Teacher Panel
        </Button>
        <Button
          color="warning"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/pay_salary")}
        >
          Pay Salary
        </Button>
        <Button
          color="warning"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/show_peons")}
        >
          Show Existing Peons
        </Button>
        <Button
          color="warning"
          variant="contained"
          style={buttonStyle}
          onClick={() => navigate("/export_data")}
        >
          Export Data
        </Button>
      </Grid>
    </div>
  );
};

export default Adminpanel;
