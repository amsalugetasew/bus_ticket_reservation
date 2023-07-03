import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import '../Admin/BusTrip/Bus_style.scss'
import axios from 'axios';

const CancelReservation = () => {

  const [dates, setDates] = useState("")
  const [Data, setData] = useState([]);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    Date: "",
    phoneNumber: "",
    PSR: ""
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
    fetch('http://localhost:8000/reserve/cancel/fetch/', requestOptions)
      .then(response => response.json())
      .then(data => { data ? setData(data) : window.alert('There is no trip in this data') })
      .catch((error) => {
        window.alert(error);
      })
  }
  
 

  const handleEdit = async (id) => {
    const newBus = { ...form };
    axios.put(`http://localhost:8000/cancel/${id}`, newBus)
      .then(function(res){
        window.alert("PSR " +form.PSR + " " + res.data)
        setFormError("PSR " +form.PSR + " " + res.data)
      });
    // navigate("/User/Search_Trip");
  }

  return (
    <div className='container'>
      <form onSubmit={getRecords}>
        <div>
        <input className="box" type="phone" name="phoneNumber" style={{ width: "20%", marginLeft: "1em" }}
          id="phoneNumber" placeholder="Phone Number" required
          value={form.phoneNumber}
          onChange={updateForm}
        />
        <input className="box" type="text" name="PSR" style={{ width: "20%", marginLeft: "1em" }}
          id="PSR" placeholder="PSR Code" required
          value={form.PSR}
          onChange={updateForm}
        />
        <input className="box" type="date" name="Date" style={{ width: "20%", marginLeft: "1em" }}
          id="Date" placeholder="Date " required
          value={form.Date}
          onChange={updateForm}
        />
        
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
                            {/* <Link to={`/User/Reserve_seat/${item._id}`}> */}
                            <button className="btn btn-delete" onClick={() => handleEdit(item._id)}>Cancel Reservation</button>
                            {/* </Link> */}
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

export default CancelReservation