import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
const City = [
  {
    label: "City",
    value: "City",
  },
  {
    label: "Addis Ababa",
    value: "Addis Ababa",
  },
  {
    label: "Gondar",
    value: "Gondar",
  },
  {
    label: "Bahir Dar",
    value: "Bahir Dar",
  },
  {
    label: "Hawassa",
    value: "Hawassa",
  },
  {
    label: "Dessie",
    value: "Dessie",
  },
  {
    label: "Jima",
    value: "Jima",
  },
  {
    label: "Gambela",
    value: "Gambela",
  },
  {
    label: "JigJiga",
    value: "JigJiga",
  },
  {
    label: "Assosa",
    value: "Assosa",
  },
];
const RegitserTrip = () => {
  const [form, setForm] = useState({
    TripName: "",
    BusNumber: "",
    plateNumber: "",
    DepartingCity: "",
    DepartingCitys: "",
    seatNumber: "",
    Date: "",
    Time: "",
    DestinationCity: "",
    Arriv_Time: ""
  })
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("")
  const navigate = useNavigate();
  const updateForm = ({ currentTarget: input }) => {

    setForm({ ...form, [input.name]: input.value });
  };
  const handleSubmit = async () => {
    const newBus = { ...form };
    if (form.plateNumber.trim().length === 0) {
      setFormError("Plate Number is required")
    }
    else if (form.DepartingCity === "City") {
      setFormError("Select Departing City")
    }
    else if (form.DestinationCity === "City") {
      setFormError("Select Destination City")
    }
    else if (form.DepartingCity === form.DestinationCity) {
      setFormError("Source and Destination couldn't Same")
    }
    else {
      axios.post('http://localhost:8000/trip/add', newBus)
        .then(function (res) {
          if (res.data === "Bus is already reserved on this date") {
            window.alert(res.data)
            setFormError(res.data);
          }
          else if (res.data === "Please try to change departing city") {
            setFormError("Please try to change departing city");
            window.alert("Please try to change departing city")
          }
          else if (res.data === "Please try to change Destination city") {
            setFormError("Please try to change Destination city")
            window.alert("Please try to change Destination city")
          }
          else if (res.data === "please select correct source and destination city") {
            setFormError("please select correct source and destination city")
            window.alert("please select correct source and destination city")
          }
          else {
            window.alert("Trip Reserved Successfully with Trip Name " + form.DepartingCity + ' to ' + form.DestinationCity)
            setSuccess(form.DepartingCity  + ' to ' + form.DestinationCity)
            axios.post('http://localhost:8000/reserve/add', newBus)
              .then(res => res.data);
            // navigate("/Admin/trip_list");
          }
        });


    }
  }

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleTrip(id);
    }
  }, [id]);
  const getSingleTrip = async (id) => {
    const response = await axios.get(`http://localhost:8000/trip/${id}`);
    if (response.status === 200) {
      setForm({ ...response.data })
    }
  }
  const handleEdit = async (id) => {
    const newBus = { ...form };
    if (form.BusNumber.trim().length === 0) {
      setFormError("Bus Number is required")
    }
    else if (form.DepartingCity === "City") {
      setFormError("Select Departing City")
    }
    else if (form.DestinationCity === "City") {
      setFormError("Select Destination City")
    }
    else if (form.DepartingCity === form.DestinationCity) {
      setFormError("Source and Destination couldn't Same")
    }
    else {
      axios.put(`http://localhost:8000/trip/${id}`, newBus)
        .then(res => console.log(res.data.TripName));
      navigate("/Admin/trip_list");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      handleSubmit();
    }
    else {
      handleEdit(id);
    }
  }
  const [singleTrip, setsingleTrip] = useState([]);
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
  const getSingleRecords = async (e) => {
    e.preventDefault();
    if (form.plateNumber === "Plate Number") {
      console.log("Wait")
    }
    else {
      const val = form.plateNumber;
      const formval = { ...form };
      if (val) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formval)
        };
        fetch('http://localhost:8000/get/numberofseat/fetch/', requestOptions)
          .then(response => response.json())
          .then(data => { data ? setsingleTrip(data) : window.alert('There is no trip in this data') })
          .catch((error) => {
            window.alert(error);
          })
      }
      else {
        console.log('Pls Select plate number')
      }
    }
  }
  useEffect(() => {
    getRecords();
  })
  return (
    <div className='Acount'>
      <div className='container'>
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-6 main">
            <Link to="/Admin/trip_list" style={{ marginLeft: "35em", marginBottom: "-25em" }} className='btn btn-edit'>List of Trip</Link>
            <form onSubmit={onSubmit}>
              <h1> Trip {id ? "Modification" : "Registration"} Page </h1>
              {/* <input className="box"
                type="text" name="TripName" id="TripName"
                placeholder="Trip Name " required
                value={form.TripName}
                onChange={updateForm}
              /> */}
              <select name='plateNumber' id='plateNumber'
                value={form.plateNumber}
                onChange={updateForm}
                onMouseLeave={getSingleRecords}
              >
                <option value="Plate Number">Plate Number</option>
                {Data.map((item, i) => (
                  <option value={item.plateNumber}>{item.plateNumber}</option>
                ))}
              </select>
              <select name='seatNumber' id='seatNumber'
              // style={{display: "none"}}
                value={form.seatNumber}
                onMouseMove={updateForm}
                // className='display'
                
              >
                {singleTrip.map((item, i) => (
                  <option value={item.seatNumber}>{item.seatNumber}</option>
                ))}
              </select>
              <select name='DepartingCity' id='DepartingCity' value={form.DepartingCity} onChange={updateForm}>
                {City.map((option) => (
                  <option value={option.value}>Departing {option.label}</option>))}
              </select>
              <select name='DestinationCity' id='DestinationCity' value={form.DestinationCity} onChange={updateForm}>{City.map((option) => (
                <option value={option.value}>Destination {option.label}</option>))}
              </select>
              <input className="box" type="date" name="Date"
                id="Date" placeholder="Date "
                required
                value={form.Date}
                onChange={updateForm}
              />
              <input className="box" type="Time" name="Time"
                id="Time" placeholder="Time "
                required
                value={form.Time}
                onChange={updateForm}
              />
              <input className="box" type="Time" name="Arriv_Time"
                id="Arriv_Time" placeholder="Arrival Time "
                required
                value={form.Arriv_Time}
                onChange={updateForm}
              />
              {formError && <div className="error_msg" id='error_msg'>{formError}</div>}
              {success && <div className="success_msg" id='success_msg'>Trip Reserved Successfully with <b><i>Trip Name:</i></b> <b><u>{success}</u></b></div>}
              <input type="submit" id="submitDetails"
                name="submitDetails"
                value={id ? "Edit Trip" : "Add Trip"}
              />
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}


export default RegitserTrip