import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import View from '../../pages/Image/view.jfif'
import Register from '../../pages/Image/register.jfif'
import { Stack, Autocomplete, TextField } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
  // const updateForm = ({ currentTarget: input }) => {

  //   setForm({ ...form, [input.name]: input.value });
  //   setFormError("");
  //   setSuccess("");
  // };
  const [PlateNumber, setPlateNumber] = useState('');
  const [SeatNumber, setSeatNumber] = useState('');
  const handlePlate = (event) => {
    setPlateNumber(event.target.value);
  };
  const handleSeat = (event) => {
    setSeatNumber(event.target.value);
  };
  
  // window.alert(age+times)
  const [times, setTimes] = useState("")
  const [atimes, setATimes] = useState("")
  // console.log(times)

  const [date, setDate] = useState()
let d = new Date(times);
let cminute = d.getMinutes();
let chour = d.getHours();

if (chour < 10) {
  chour = '0' + chour
}
if (cminute < 10) {
  cminute = '0' + cminute
}
let a = new Date(atimes);
let aminute = a.getMinutes();
let ahour = a.getHours();

if (ahour < 10) {
  ahour = '0' + ahour
}
if (aminute < 10) {
  aminute = '0' + aminute
}
const showTime = chour.toString() +':'+ cminute.toString()
const ashowTime = ahour.toString() +':'+ aminute.toString()
// window.alert(showTime)
  // window.alert(mytime)
  let mydate = new Date(date)
  let dateto = ""
  if (mydate) {
    let year = mydate.getFullYear();
    let month = mydate.getMonth() + 1;
    let day = mydate.getDate()
    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month;
    }
    dateto = year + '-' + month + '-' + day
  }
  form.Date = dateto
  form.DepartingCity = selectedDep.value
  form.DestinationCity = selectedDes.value
  form.plateNumber = PlateNumber;
  form.seatNumber = SeatNumber
  form.Time = showTime;
  form.Arriv_Time = ashowTime
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
                          <FormControl sx={{ m: 1, minWidth: 120, width:'36ch' }}>
                            <InputLabel id="demo-simple-select-error-label">Plate Number</InputLabel>
                            <Select
                              labelId="demo-simple-select-error-label"
                              id="demo-simple-select-error"
                              name='plateNumber'
                              value={PlateNumber}
                              label="Plate Number"
                              onMouseLeave={getSingleRecords}
                              onChange={handlePlate}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {Data.map((item, i) => (
                                <MenuItem value={item.plateNumber}>{item.plateNumber}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, minWidth: 120, width: '36ch' }}>
                            <InputLabel id="demo-simple-select-error-label">Number of Seat</InputLabel>
                            <Select
                              labelId="demo-simple-select-error-label"
                              id="demo-simple-select-error"
                              value={SeatNumber}
                              label="Number of Seat"
                              onChange={handleSeat}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {singleTrip.map((item, i) => (
                                <MenuItem value={item.seatNumber}>{item.seatNumber}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className="input-wrap" >
                        <div className="inside-wrap" id='flex'>
                          <div className="from" style={{ marginTop: '-0.5em', marginRight:'2.6em', marginLeft:'-0.6em'}}>
                            <Stack spacing={3} width='250px' height='10px' >
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={City}
                                sx={{ width: '36ch', height: 10 }}
                                value={selectedDep}
                                onChange={handleChanges}
                                renderInput={(params) => <TextField {...params} label="Source City" className='input' />}
                              />
                            </Stack>
                          </div>
                          <div className="To" style={{ marginLeft: '2em' }}>
                            <Stack spacing={1} width='250px'>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={City}
                                sx={{ width: '36ch' }}
                                value={selectedDes}
                                onChange={handleChangest}
                                renderInput={(params) => <TextField {...params} label="Destination City" className='input' />}
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
                      <div className="To" style={{marginBottom: '1em' }}>
                        <Box component="form"

                          sx={{
                            '& > :not(style)': { m: 1, width: '74ch', marginLeft:'1em' },
                          }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              id="outlined-basic" label="Date" variant="oulined"
                              selected={date} onChange={date => setDate(date)}
                            />
                          </LocalizationProvider>
                        </Box>
                        {/* <div className="lable">
                          <figure className="icon"><img src="https://i.ibb.co/7N5zdnc/calendar.png" alt='dt' /></figure>
                          <span className="text">Date Details</span>
                        </div>

                        <input type="date" name="Date"
                          id="Date" placeholder="Date " required
                          value={form.Date}
                          onChange={updateForm}
                          className='input'
                          style={{ width: '670px', opacity: '0.5', color: 'black', border: '1px black solid' }}
                        /> */}
                      </div>
                        <div  id='flex'style={{width:'80ch'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} width='36ch' marginRight='2.6em' marginLeft='1em'>
                        <DemoContainer components={['TimePicker']} >
                          <TimePicker label="Start Time"
                          
                            selected={times} onChange={times => setTimes(times)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['TimePicker']} width='60ch'>
                          <TimePicker label="Arrival Time"
                            selected={atimes} onChange={times => setATimes(times)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      </Box>
                      
                          {/* <div className="rotate-btn" >
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
                          </div> */}
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
                      {formError &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                          <Alert style={{ color: 'teal' }} serverity="success">{formError}</Alert>
                        </Stack>
                      }
                      {success &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                          <Alert style={{ color: 'teal' }} serverity="success">Trip Reserved Successfully with <b><i>Trip Name:</i></b> <b><u>{success}</u></b></Alert>
                        </Stack>
                      }
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