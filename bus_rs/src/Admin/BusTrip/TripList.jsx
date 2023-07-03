import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import "./table.scss";
import axios from 'axios';
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// toast.configure()
function TripList() {
    const [Data, setData] = useState([]);
    const [formError, setFormError] = useState("");
    async function getRecords() {
        const response = await fetch(`http://localhost:8000/trip/fetch/`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const records = await response.json();
        setData(records);
    }
    useEffect(() => {
        getRecords();
    })

    const onDeleteTrip = async (id) => {
        if (window.confirm("Are you sure you want remove trip")) {
            const response = await axios.delete(`http://localhost:8000/trip/delete/${id}`);
            if (response.status === 200) {
                // console.log(response.data);
                setFormError(response.data)
                // toast.success(response.data);
                getRecords();
            }
            else{
                console.log(window.alert("DB not connected"))
            }
        }
    }

    return (
        <div>
            <div className='row'>
                <div className="mt-5 mb-4">
                    <Link to='/Admin/Trip_reg' style={{ marginLeft: "35em" }} className='btn btn-edit'>Add New Trip</Link>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive" style={{ marginTop: "10px", marginLeft: "40px" }}>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center", display: "flex" }}>TripTitle</th>
                                <th style={{ textAlign: "center" }}>Plate Number</th>
                                <th style={{ textAlign: "center" }}>Departing City</th>
                                <th style={{ textAlign: "center" }}>Departing Date</th>
                                <th style={{ textAlign: "center" }}>Departing Time</th>
                                <th style={{ textAlign: "center" }}>Destination City</th>
                                <th style={{ textAlign: "center" }}>Arrival Time</th>
                                <th style={{ textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <>
                                    <tr key={item._id}>
                                        <td>{item.TripName}</td>
                                        <td>{item.plateNumber}</td>
                                        <td>{item.DepartingCity}</td>
                                        <td>{item.Date}</td>
                                        <td>{item.Time}</td>
                                        <td>{item.DestinationCity}</td>
                                        <td>{item.Arriv_Time}</td>
                                        <td className='display-flex'>
                                            <Link to={`/Admin/Trip_reg/${item._id}`}>
                                                <button className="btn btn-edit">Edit</button>
                                            </Link>
                                            <button className="btn btn-delete" onClick={() => onDeleteTrip(item._id)}>Delete</button>
                                            <Link to={`/Admin/view/${item._id}`}>
                                                <button className="btn btn-view">View</button>
                                            </Link>
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                    {formError && <div className="error_msg" id='error_msg'>{formError}</div>}
                </div>
            </div>
        </div>
    )
}


export default TripList