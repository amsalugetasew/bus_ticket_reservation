import React, { useState } from 'react'
// import Select from 'react-select';
import '../Admin/BusTrip/Bus_style.scss'
import './Card.scss'
import { Link } from 'react-router-dom';
// const City = [
//   {
//     label: "City",
//     value: "City",
//   },
//   {
//     label: "Addis Ababa",
//     value: "Addis Ababa",
//   },
//   {
//     label: "Gondar",
//     value: "Gondar",
//   },
//   {
//     label: "Bahir Dar",
//     value: "Bahir Dar",
//   },
//   {
//     label: "Hawassa",
//     value: "Hawassa",
//   },
//   {
//     label: "Dessie",
//     value: "Dessie",
//   },
//   {
//     label: "Jima",
//     value: "Jima",
//   },
//   {
//     label: "Gambela",
//     value: "Gambela",
//   },
//   {
//     label: "JigJiga",
//     value: "JigJiga",
//   },
//   {
//     label: "Assosa",
//     value: "Assosa",
//   },
// ];
const SearchTrip = () => {
  const [Data, setData] = useState([]);
  const [dates, setDates] = useState("")
  const [form, setForm] = useState({
    Date: "",
    plateNumber: "",
    statues: "",
    per: ""
  })
  const updateForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
  };
  
  const getRecords = async (e) => {
    e.preventDefault();
    setDates(form.Date)
    // console.log(dates)
    const formval = { ...form };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formval)
    };
    fetch('http://localhost:8000/reserve/ab/fetch/', requestOptions)
      .then(response => response.json())
      .then(data => { data ? setData(data) : window.alert('There is no trip in this data') })
      .catch((error) => {
        window.alert(error);
      })
  }
  return (
    <div className='container'>
      <form onSubmit={getRecords}>
        <input className="box" type="date" name="Date" style={{ width: "97%", marginLeft: "0em" }}
          id="Date" placeholder="Date " required
          value={form.Date}
          onChange={updateForm}
        /><input type="submit" id="submitDetails"
          name="submitDetails"
          value="Search"
        />
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
                            <Link to={`/User/Reserve_seat/${item._id}`}>
                              <button className="btn btn-edit">Select</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>: <>{ dates ? <div className="error_msg" id='error_msg'>No Available Trip</div> : ""} </>}
        </div>
      </div>
    </div>
  )
}

export default SearchTrip