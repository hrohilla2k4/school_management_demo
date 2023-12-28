import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authcontext";
import { useContext } from "react";


const Showpeons = () => {

    const [data, setData] = useState([]);
    const [showPeonData, setShowPeonData] = useState(false);
    const [search , setSearch] = useState('');

    const {schoolId} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:8181/show_peons')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                console.log(data)
            })
            .catch(err => console.log(err))

    }, [])

    const handleEditPeon = (Peonid) => {
        //Make edit peon page
        navigate('/edit_peon')
    }

    const handleSectionSubmit = () => {
        setShowPeonData(true);
    }
    return (
        <div className="container text-center">
            <div className="container">
                <div className="display-3 text-center">

                    <span> <img src="/images/list-icon.png" alt="" width={100} />Peons List</span>

                </div>
            </div>
            <br />
            <Button variant="contained" color="success" onClick={handleSectionSubmit}>Show</Button> <br /> <br />
            {
                showPeonData ?
                    (

                        <div className="container">
                            <div className="col-md-4 text-left">
                                <h2><mark>Peon Data Table</mark></h2> <br />
                            </div>
                            <span>Search Here: </span>
                            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Enter name"/> <br /> <br />
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Peon Id</th>
                                        <th>Peon Name</th>
                                        <th>Peon Age</th>
                                        <th>Peon Phone</th>
                                        <th>Peon Designation</th>
                                        <th>Peon Salary</th>
                                        <th>Peon Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data
                                    .filter((item)=>{return search.toLowerCase == ''? item: item.peon_name.toLowerCase().includes(search); })
                                    .map((d, i) => {
                                        if ((d.schoolId == schoolId)) {
                                            return (
                                                <tr key={i}>
                                                    <td>{d.peon_id}</td>
                                                    <td>{d.peon_name}</td>
                                                    <td>{d.peon_age}</td>
                                                    <td>{d.peon_phoneno}</td>
                                                    <td>{d.peon_designation}</td>
                                                    <td>{d.peon_salary}</td>
                                                    <td>{d.peon_address}</td>
                                                    <td>
                                                        <button class="btn btn-success" onClick={() => handleEditPeon(d.peon_id)}>Edit</button>
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

export default Showpeons;