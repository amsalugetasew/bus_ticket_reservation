import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Admin/BusTrip/Bus_style.scss'
import './User.scss'
const SeatInfo = () => {
  const [Data, setData] = useState([]);
  const [form, setForm] = useState({
    Date: ""
  })
  const updateForm = ({ currentTarget: input }) => {

    setForm({ ...form, [input.name]: input.value });
  };
  async function getRecords() {
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
      })
  }
  return (
    <>
      <div className='container'>
        <input className="box" type="type" name="seatCode" style={{ width: "97%", marginLeft: "0em" }}
          value={form.seatCode}
          onChange={updateForm}
          onPointerLeave={getRecords}
          id="seatCode" placeholder="Seat Code " required
        />
        {/* <button className='btn btn-edit' onClick={getRecords}>Seat Info</button> */}
      </div>
      <div style={{ marginTop: "40px" }}>
        <div className='card'>
          <div className='card-header'>
            <p>Seat Detail</p>
          </div>
          <div className='container'>
            <strong>Plate Number: </strong>
            {Data.map((item, i) => (
              <>
                <span>{item.plateNumber}</span>
              </>
            ))}
            <br />
            <br />
            <strong>Bus Title: </strong>
            {Data.map((item, i) => (
              <>
                <span>{item.busTitle}</span>
              </>
            ))}
            <br />
            <br />
            <strong>Seat Number/Code: </strong>
            {Data.map((item, i) => (
              <>
                <span>{item.seatNumber}</span>
              </>
            ))}
            <br />
            <br />
            <strong>Seat Facility: </strong>
            {Data.map((item, i) => (
              <>
                <span>{item.facility}</span>
              </>
            ))}
            <br />
            <br />
            <strong>Seat Position: </strong>
            {Data.map((item, i) => (
              <>
                <span>{item.seatPosition}</span>
              </>
            ))}
            <br />
            <br />
            <strong>Special Service: </strong>
            <Link to="/Admin/trip_list" className='btn btn-edit'>Go back</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SeatInfo