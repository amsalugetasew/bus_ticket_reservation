import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './Singl.scss'
import axios from 'axios';
const SingleBus = () => {
    const [singleTrip, setsingleTrip] = useState(null);
    const {id} = useParams();
  useEffect(()=>{
      if(id){
          getSingleTrip(id);
      }
  }, [id]);
  const getSingleTrip = async(id) =>{
      const response = await axios.get(`http://localhost:8000/bus/${id}`);
          if(response.status === 200){
              setsingleTrip({...response.data})
          }
  }
  return (
    <div style={{marginTop: "40px"}}>
        <div className='card'>
            <div className='card-header'>
                <p>Bus Detail</p>
            </div>
            <div className='container'>
                <strong>Palte Number: </strong>
                <span>{singleTrip && singleTrip.plateNumber}</span>
                <br/>
                <br/>
                <strong>Bus Number: </strong>
                <strong>{singleTrip && singleTrip.busNumber}</strong>
                <br/>
                <br/>
                <strong>Bus Name: </strong>
                <strong>{singleTrip && singleTrip.busTitle}</strong>
                <br/>
                <br/>
                <strong>Number of Seat: </strong>
                <strong>{singleTrip && singleTrip.seatNumber}</strong>
                <br/>
                <br/>
                
                <Link to="/Admin/bus_list" className='btn btn-edit'>Go back</Link>
            </div>
        </div>
    </div>
  )
}

export default SingleBus