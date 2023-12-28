import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./authcontext";
import TypingEffect from "./typingeffect";

const HomePage = () => {
  const [schoolName, setSchoolName] = useState(""); // Add state for school name
  const { schoolId } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:8181/school_login")
      .then((res) => res.json())
      .then((data) => {
        const schoolData = data.find((d) => d.schoolId === schoolId);
        if (schoolData) {
          setSchoolName(schoolData.schoolName);
        }
      })
      .catch((err) => console.log(err));
  }, [schoolId]);

  const navigate = useNavigate();

  const checkPreviousAdmins = () => {
    navigate("/previous_admins");
  };

  const becomeAdminClick = () => {
    checkPreviousAdmins();
  };

  const loginAsAdmin = () => {
    navigate("/admin_login");
  };

  const handleResetPassword = () => {
    navigate("/reset_admin_password");
  };

  const handleTeacherLogin = () => {
    navigate("/teacher_login");
  };

  return (
    <Container>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h3" align="center" color="primary">
              <img
                src="/images/logo-smart-schooling.png"
                alt=""
                width={250}
              />{" "}
              Smart-Schooling
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            <TypingEffect text={`${schoolName}`} />
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="success"
            size="small"
            fullWidth
            onClick={becomeAdminClick}
          >
            Become An Admin
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="info"
            size="small"
            fullWidth
            onClick={loginAsAdmin}
          >
            Login As Admin
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
            onClick={handleTeacherLogin}
          >
            Login As Teacher
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="error"
            size="small"
            fullWidth
            onClick={handleResetPassword}
          >
            Reset Password For Admin
          </Button>
        </Grid>
      </Grid>

      <footer
        className="footer border"
        style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <Container>
          <small>
            <mark>Contact us:</mark>
            <dl>
              <dt>
                <WhatsAppIcon />
              </dt>
              <dd>
                <Link
                  underline="hover"
                  color="inherit"
                  href="whatsapp://send?phone=8684809123&text=Hello%20from%20my%20web%20app!"
                >
                  -Send a WhatsApp message
                </Link>
              </dd>

              <dt>
                <CallIcon />
              </dt>
              <dd>
                <Link
                  underline="hover"
                  color="inherit"
                  href="tel:8684809123"
                >
                  -Call us
                </Link>
              </dd>
            </dl>

            <div className="display-10">
              <small>© 2023 Harsh Rohilla</small>
            </div>
          </small>
        </Container>
      </footer>
    </Container>
  );
};

export default HomePage;
