import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './Bus_style.scss'
import './Trip.scss'
// import axios from 'axios';
const ShowAvSeat = () => {
  const [dates, setDates] = useState("")
  const [Data, setData] = useState([]);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    Date: "",
    plateNumber: "",
    tripName: "",
    per: "",
    status: ""
  })
  const updateForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
  };
  const getRecords = async (e) => {
    e.preventDefault();
    setDates(form.Date)
    const formval = { ...form };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formval)
    };
    fetch('http://localhost:8000/seat/info/fetch/', requestOptions)
      .then(response => response.json())
      .then(data => { data ? setData(data) : window.alert('There is no trip in this data') })
      .catch((error) => {
        window.alert(error);
        setFormError(error)
      })
  }
  
 


  return (
    <div className='container'>
      <form onSubmit={getRecords} style={{marginBottom:"4em", marginTop:"2em"}}>
        <div>
        <input className="box" type="text" name="plateNumber" style={{ width: "15%", marginLeft: "1em" }}
          id="plateNumber" placeholder="Plate Number" required
          value={form.plateNumber}
          onChange={updateForm}
        />
        <input className="box" type="text" name="tripName" style={{ width: "10%", marginLeft: "1em" }}
          id="tripName" placeholder="Trip Name" required
          value={form.tripName}
          onChange={updateForm}
        />
        <input className="box" type="date" name="Date" style={{ width: "10%", marginLeft: "1em" }}
          id="Date" placeholder="Date " required
          value={form.Date}
          onChange={updateForm}
        />
        <select style={{ width: "10%", marginLeft: "1em" }}
          id="per" name="per" required
          value={form.per}
          onChange={updateForm}>
          <option value={'per'}>per</option>
          <option value={'Bus'}>Bus</option>
          <option value={'Trip'}>Trip</option>
        </select>
        <select style={{ width: "10%", marginLeft: "1em" }}
          id="status" name="status" required
          value={form.status}
          onChange={updateForm}>
          <option value={'status'}>Status</option>
          <option value={'Reserved'}>Reserved</option>
          <option value={'Available'}>Available</option>
        </select>
        
        <input type="submit" id="submitDetails" 
        style={{ width: "10%", marginLeft: "0.1em", backgroundColor:"white", color: "black" }}
          name="submitDetails"
          value="Search"
        />
        </div>
      </form>

      <div className="row">
        <div className="responsive" style={{ marginTop: "10px", marginLeft: "40px" }}>
          {Data[0] ?
            <>
              {Data.map((item, i) =>
                <>
                  <div className='cardc'>
                    <div className='flip-card-inner'>
                      <div style={{ display: "flex" }}>
                        <div>{i + 1}</div>
                        <div style={{ textAlign: "center", alignContent: "center" }}>
                          <div style={{ display: "flex" }}>
                            <div style={{ width: '10rem' }}>{item.Date}</div>
                            <div style={{ width: '10rem' }}>{item.seatNumber}</div>
                            <div style={{ width: '10rem' }}>{item.Date}</div>
                          </div>
                          <div style={{ display: "flex" }}>
                            <div style={{ width: '10rem' }}>{item.Time}</div>
                            <div style={{ width: '10rem' }}>{item.plateNumber}</div>
                            <div style={{ width: '10rem' }}>{item.Arriv_Time}</div>
                          </div>
                          <div style={{ display: "flex" }}>
                            <div style={{ width: '10rem' }}>{item.DepartingCity}</div>
                            <div style={{ width: '10rem' }}>{item.TripName}</div>
                            <div style={{ width: '10rem' }}>{item.DestinationCity}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>: <>{ dates ? <div className="error_msg" id='error_msg'>No Available Trip</div> : ""} </>}
            {formError && <div className="success_msg" id='success_msg'>{formError}</div>}
        </div>
      </div>
    </div>
  )
}


export default ShowAvSeat