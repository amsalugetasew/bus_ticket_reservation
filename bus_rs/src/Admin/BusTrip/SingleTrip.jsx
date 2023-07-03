import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './Singl.scss'
import axios from 'axios';
const SingleTrip = () => {
    const [singleTrip, setsingleTrip] = useState(null);
    const {id} = useParams();
  useEffect(()=>{
      if(id){
          getSingleTrip(id);
      }
  }, [id]);
  const getSingleTrip = async(id) =>{
      const response = await axios.get(`http://localhost:8000/trip/${id}`);
          if(response.status === 200){
              setsingleTrip({...response.data})
          }
  }
  return (
    <div style={{marginTop: "40px"}}>
        <div className='card'>
            <div className='card-header'>
                <p>Trip Detail</p>
            </div>
            <div className='container'>
                <strong>Trip Name: </strong>
                <span>{singleTrip && singleTrip.TripName}</span>
                <br/>
                <br/>
                <strong>Bus Number: </strong>
                <strong>{singleTrip && singleTrip.BusNumber}</strong>
                <br/>
                <br/>
                <strong>Departing City: </strong>
                <strong>{singleTrip && singleTrip.DepartingCity}</strong>
                <br/>
                <br/>
                <strong>Departing Date: </strong>
                <strong>{singleTrip && singleTrip.Date}</strong>
                <br/>
                <br/>
                <strong>Departing Time: </strong>
                <strong>{singleTrip && singleTrip.Time}</strong>
                <br/>
                <br/>
                <strong>Destination City: </strong>
                <strong>{singleTrip && singleTrip.DestinationCity}</strong>
                <br/>
                <br/>
                <strong>Arriv Time: </strong>
                <strong>{singleTrip && singleTrip.Arriv_Time}</strong>
                <br/>
                <br/>
                
                <Link to="/Admin/trip_list" className='btn btn-edit'>Go back</Link>
            </div>
        </div>
    </div>
  )
}

export default SingleTrip