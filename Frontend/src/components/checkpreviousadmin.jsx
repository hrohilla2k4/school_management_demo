import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authcontext";
const { useState, useEffect } = require("react")


const Checkpreviousadmin = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const {schoolId} = useContext(AuthContext);

  const goToAdminLogin = () => {
    navigate("/admin_login")
  }


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch('http://localhost:8181/users')
        .then((res) => res.json())
        .then((data) => {
          console.log(data); // Log the data
          setData(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, 5000);
  }, []);

  const checkData = () => {
    const retreivedData = data.filter((d) => d.schoolId == schoolId);
  
    console.log(retreivedData);
    if (retreivedData.length == 0) {
      alert("Admin Does Not Exist, Proceed to Become Admin");
      navigate('/become_admin');
    } else {
      alert("Admin Exists, Try Logging In");
      goToAdminLogin();
    }
  };

  return (
    <div className="previousAdminCheck">

      <div className="ContentsPreviousAdminCheck">
        {
          loading ?
            (
              <PuffLoader
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />

            )
            :
            (
              <button onClick={checkData} id="checkresultbtn">Check results</button>
            )}


      </div>

    </div>
  )
}

export default Checkpreviousadmin;