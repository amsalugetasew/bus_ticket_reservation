import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import View from '../../pages/Image/view.jfif'
import Register from '../../pages/Image/register.jfif'
import { Stack, Autocomplete, TextField } from '@mui/material'
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
  const [selectedDep, setSelectedDep] = useState({ label: "" });
  const handleChanges = (e, v) => setSelectedDep(v);
  const [selectedDes, setSelectedDes] = useState({ label: "" });
  const handleChangest = (e, v) => setSelectedDes(v);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("")
  const navigate = useNavigate();
  const updateForm = ({ currentTarget: input }) => {

    setForm({ ...form, [input.name]: input.value });
    setFormError("");
    setSuccess("");
  };
  form.DepartingCity = selectedDep.value
  form.DestinationCity = selectedDes.value
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
            setSuccess(form.DepartingCity + ' to ' + form.DestinationCity)
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
    <div className="main" >
      <main className="app" id='background-Img-contactss' style={{ height: '500px' }}>
        <div className="screen-wrap">
          <section className="screen-home">
            <div className="screen-home__form-wrap">
              <div className="screen-home__form">
                <form>
                  <div id="formdetail">
                    <div className="screen-home__location">
                      <div className="lable">
                        <figure className="icon"><img style={{ width: '60px', height: '60px' }} src={Register} alt='ic' /></figure>
                        <span className="text">Trip {id ? "Modification" : "Registration"} Page Details</span>
                        <Link to="/Admin/trip_list" >
                          <figure className="icon"><img style={{ width: '60px', height: '60px', marginLeft: '3em' }}
                            src={View} alt='ic' /></figure>
                        </Link>
                      </div>
                      <div className="input-wrap" >
                        <div className="inside-wrap" id='flex'>
                          <div className="from" style={{ marginTop: '-0.5em' }}>
                            <span className="inside-lable">Plate Number</span>
                            <select name='plateNumber' id='plateNumber'
                              value={form.plateNumber}
                              onChange={updateForm}
                              onMouseLeave={getSingleRecords}
                              className='input'
                            >
                              <option value="Plate Number">Plate Number</option>
                              {Data.map((item, i) => (
                                <option value={item.plateNumber}>{item.plateNumber}</option>
                              ))}
                            </select>
                          </div>
                          <div className="To" style={{ width: '25em' }}>
                            <span className="inside-lable">Number of Seat</span>
                            <select name='seatNumber' id='seatNumber'
                              className='input'
                              value={form.seatNumber}
                              onMouseMove={updateForm}
                            >
                              {singleTrip.map((item, i) => (
                                <option value={item.seatNumber}>{item.seatNumber}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      {/* <div className="input-wrap" >
                        <div className="inside-wrap" id='flex'>
                          <div className="from" style={{ marginTop: '-0.5em', marginRight: '1em' }}>
                            <Stack spacing={1} width='250px'>
                              
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                  options={City}
                                sx={{ width: 335 }}
                                value={selectedDep}
                                onChange={handleChanges}
                                renderInput={(params) => <TextField {...params} label="Per" className='input' />}
                              />
                            </Stack>
                          </div>
                          <div className="To" style={{ marginLeft: '4.5em' }}>
                            <Stack spacing={1} width='250px'>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={City}
                                sx={{ width: 300 }}
                                value={selectedDes}
                                onChange={handleChangest}
                                renderInput={(params) => <TextField {...params} label="Status" className='input' />}
                              />
                            </Stack>
                          </div>
                        </div>
                      </div> */}




                      <div className="input-wrap" >
                        <div className="inside-wrap" id='flex'>
                          <div className="from" style={{ marginTop: '-0.5em', marginRight: '1em' }}>
                            <Stack spacing={1} width='250px'>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={City}
                                sx={{ width: 335 }}
                                value={selectedDep}
                                onChange={handleChanges}
                                renderInput={(params) => <TextField {...params} label="Per" className='input' />}
                              />
                            </Stack>
                          </div>
                          <div className="To" style={{ marginLeft: '4.5em' }}>
                            <Stack spacing={1} width='250px'>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={City}
                                sx={{ width: 300 }}
                                value={selectedDes}
                                onChange={handleChangest}
                                renderInput={(params) => <TextField {...params} label="Status" className='input' />}
                              />
                            </Stack>
                          </div>
                        </div>
                      </div>
                      {/* <div className="input-wrap" >
                        <div className="inside-wrap" id='flex'>
                          <div className="rotate-btn" >
                            <figure style={{ marginLeft: '-21em'}}>
                              <img src="https://i.ibb.co/HPBrQkn/rotate-btn.png" alt='rt' />
                            </figure>
                          </div>
                          <div className="from" style={{ marginTop: '-0.5em' }}>
                            <span className="inside-lable">From</span>
                            <select name='DepartingCity' id='DepartingCity'
                              className='input'
                              value={form.DepartingCity}
                              onChange={updateForm}
                            >
                              Trip Title
                              {City.map((option) => (
                                <option className='inputs' value={option.value}>{option.label}</option>))}
                            </select>
                          </div>
                          <div className="To" style={{ marginLeft:'2em'}}>
                            <span className="inside-lable">To</span>
                            <select name='DestinationCity' id='DestinationCity'
                              className='input'
                              value={form.DestinationCity}
                              onChange={updateForm}
                            >
                              Trip Title
                              {City.map((option) => (
                                <option className='inputs' value={option.value}>{option.label}</option>))}
                            </select>
                          </div>
                        </div>
                      </div> */}
                      <div className="screen-home__date">
                        <div className="lable">
                          <figure className="icon"><img src="https://i.ibb.co/7N5zdnc/calendar.png" alt='dt' /></figure>
                          <span className="text">Date Details</span>
                        </div>
                        <div className="input-wrap">
                          <div className="inside-wrap">

                            <input type="date" name="Date"
                              id="Date" placeholder="Date " required
                              value={form.Date}
                              onChange={updateForm}
                              className='input'
                            />
                          </div>
                        </div>
                      </div>
                      <div className="input-wrap" >
                        <div className="inside-wrap" id='flex'>
                          <div className="rotate-btn" >
                            <figure style={{ marginLeft: '-21em' }}>
                              <img src="https://i.ibb.co/HPBrQkn/rotate-btn.png" alt='rt' />
                            </figure>
                          </div>
                          <div className="from" style={{ marginTop: '-2em' }}>
                            <span className="inside-lable">From</span>
                            <input name='Time' id='Time'
                              className='input'
                              type='Time'
                              value={form.Time}
                              onChange={updateForm}
                            />
                          </div>
                          <div className="To" style={{ marginTop: '-1.5em', marginLeft: '2em' }}>
                            <span className="inside-lable">To</span>
                            <input name='Arriv_Time' id='Arriv_Time'
                              type='Time'
                              className='input'
                              value={form.Arriv_Time}
                              onChange={updateForm}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="screen-home__submit-wrap">
                    <span className="line"></span>
                    <div className="screen-home__bus-page" id="buspage">
                      <figure className="screen-home__bus-arrow-wrap">
                        <img
                          onClick={onSubmit}
                          src="https://i.ibb.co/nQ4khG8/arrow.png" alt='btn' />
                      </figure>
                    </div>
                  </div>
                  <div className="screen-home__recent-search">
                    <div className="lable" style={{ marginTop: '-5em', marginLeft: '6em' }}>
                      {formError && <div className="error_msg" id='error_msg'>{formError}</div>}
                      {success && <div style={{ marginLeft: '-3em', backgroundColor: 'white', marginTop: '-0.6em' }} className="success_msg" id='success_msg'>Trip Reserved Successfully with <b><i>Trip Name:</i></b> <b><u>{success}</u></b></div>}
                    </div>
                  </div>
                </form>

              </div>

            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
export default RegitserTrip