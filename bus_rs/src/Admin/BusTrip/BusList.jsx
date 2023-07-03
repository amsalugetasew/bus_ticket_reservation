import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
function BusList() {
    const [Data, setData] = useState([]);

    async function getRecords() {
        const response = await fetch(`http://localhost:8000/bus/fetch/`);

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
    const onDeleteBus = async(id) =>{
        if(window.confirm("Are you sure you want remove Bus")){
            // const Facilityresponse = await axios.delete(`http://localhost:8000/facility/delete/${id}`);
            // if(response.status === 200){
            //     console.log(response.data);
            //     getRecords();
            // }
            // const seatResponse = await axios.delete(`http://localhost:8000/seat/delete/${id}`);
            // if(seatResponse.status === 200){
            //     console.log(seatResponse.data);
            //     getRecords();
            // }
            const response = await axios.delete(`http://localhost:8000/bus/delete/${id}`);
            if(response.status === 200){
                console.log(response.data);
                getRecords();
            }
        }
    }
    return (
        <div>
            <div className='row'>
                <div className="mt-5 mb-4">
                <Link to='/Admin/Bus_reg' style={{marginLeft: "35em"}} className='btn btn-edit'>Add New Bus</Link>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive" style={{marginTop:"10px", marginLeft:"40px"}}>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}}>Bus Number</th>
                                <th style={{textAlign: "center"}}>Plate Number</th>
                                <th style={{textAlign: "center"}}>Bus Name</th>
                                <th style={{textAlign: "center"}}>Number of Seat</th>
                                <th style={{textAlign: "center"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.busNumber}</td>
                                    <td>{item.plateNumber}</td>
                                    
                                    <td>{item.busTitle}</td>
                                    <td>{item.seatNumber}</td>
                                    
                                    <td className='display-flex'>
                                        <Link to ={`/Admin/bus_reg/${item._id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                        </Link>
                                        <button className="btn btn-delete" onClick={()=> onDeleteBus(item._id)}>Delete</button>
                                        <Link to ={`/Admin/bus/view/${item._id}`}>
                                        <button className="btn btn-view">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default BusList