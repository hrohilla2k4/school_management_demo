import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authcontext";
import { useContext } from "react";


const Showteachers = () => {

    const [data, setData] = useState([]);
    const [showTeacherData, setShowTeacherData] = useState(false);
    const [search , setSearch] = useState('');

    const {schoolId} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:8181/show_teachers')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                console.log(data)
            })
            .catch(err => console.log(err))

    }, [])

    const handleEditTeacher = (teacherId) => {
        navigate(`/edit_teacher/${teacherId}`)
    }

    const handleSectionSubmit = () => {
        setShowTeacherData(true);
    }
    return (
        <div className="container text-center">
            <div className="container">
                <div className="display-3 text-center">

                    <span> <img src="/images/list-icon.png" alt="" width={100} />Teachers List</span>

                </div>
            </div>
            <br />
            <Button variant="contained" color="success" onClick={handleSectionSubmit}>Show</Button> <br /> <br />
            {
                showTeacherData ?
                    (

                        <div className="container">
                            <div className="col-md-4 text-left">
                                <h2><mark>Teacher Data Table</mark></h2> <br />
                            </div>
                            <span>Search Here: </span>
                            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Enter name"/> <br /> <br />
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Teacher Id</th>
                                        <th>Teacher Name</th>
                                        <th>Teacher Age</th>
                                        <th>Teacher Phone</th>
                                        <th>Teacher Mail</th>
                                        <th>Teacher Password</th>
                                        <th>Teacher Salary</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data
                                    .filter((item)=>{return search.toLowerCase == ''? item: item.teacher_name.toLowerCase().includes(search); })
                                    .map((d, i) => {
                                        if ((d.schoolId == schoolId)) {
                                            return (
                                                <tr key={i}>
                                                    <td>{d.teacher_id}</td>
                                                    <td>{d.teacher_name}</td>
                                                    <td>{d.teacher_age}</td>
                                                    <td>{d.teacher_phone}</td>
                                                    <td>{d.teacher_mail}</td>
                                                    <td>{d.teacher_password}</td>
                                                    <td>{d.teacher_salary}</td>
                                                    <td>
                                                        <button class="btn btn-success" onClick={() => handleEditTeacher(d.teacher_id)}>Edit</button>
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

export default Showteachers;