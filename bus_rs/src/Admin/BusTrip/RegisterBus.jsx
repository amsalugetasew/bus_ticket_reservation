import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import View from '../../pages/Image/view.jfif'
import Register from '../../pages/Image/register.jfif'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
function RegisterBus() {
  const [form, setForm] = useState({
    plateNumber: "",
    busNumber: "",
    busTitle: "",
    seatNumber: "",
    facility: ""
  })
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("")
  const navigate = useNavigate();
  const updateForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
    setSuccess("")
    setFormError("")
  };
  const handleSubmit = async (e) => {
    const newBus = { ...form };
    if (form.busNumber.trim().length === 0) {
      setFormError("Bus Number is required")
    }
    else {
      axios.post('http://localhost:8000/bus/add', newBus)
        .then(function (res) {
          if (res.data === ("Bus with plate number " + form.plateNumber + " already exist")) {
            setFormError(res.data)
          }
          else if (res.data === ("Bus with bus number " + form.busNumber + " already exist")) {
            setFormError(res.data)
          }
          else {
            navigate("/Admin/bus_list");
          }
        })
    }
  }
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleBus(id);
    }
  }, [id]);
  const getSingleBus = async (id) => {
    const response = await axios.get(`http://localhost:8000/bus/${id}`);
    if (response.status === 200) {
      setForm({ ...response.data })
    }

  }
  const handleEdit = async (id) => {
    const newBus = { ...form };
    if (form.busNumber.trim().length === 0) {
      setFormError("Bus Number is required")
    }
    else {
      axios.put(`http://localhost:8000/bus/${id}`, newBus)
        .then(res => console.log(res.data.busTitle));
      navigate("/Admin/bus_list");
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
                      <div className="lable" style={{marginLeft:'10em'}}>
                        <figure className="icon"><img style={{ width: '60px', height: '60px' }} src={Register} alt='ic' /></figure>
                        <span className="text">Bus {id ? "Modification" : "Registration"} Page Details</span>
                        <Link to="/Admin/bus_list" >
                          <figure className="icon"><img style={{ width: '60px', height: '60px', marginLeft: '3em' }}
                            src={View} alt='ic' /></figure>
                        </Link>
                      </div>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: '10em' }}>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Plate Number"
											variant="outlined"
											name='plateNumber'
											value={form.plateNumber}
											onChange={updateForm}
										/>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Bus Number"
											variant="outlined"
											name='busNumber'
											value={form.busNumber}
											onChange={updateForm}
										/>
                    <TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Bus Name"
											variant="outlined"
											name='busTitle'
											value={form.busTitle}
											onChange={updateForm}
										/>
                    <TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Number of Seat"
											variant="outlined"
											name='seatNumber'
											value={form.seatNumber}
											onChange={updateForm}
										/>
                    <TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Facility"
											variant="outlined"
											name='facility'
											value={form.facility}
											onChange={updateForm}
										/>

									</Box>
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
										<Alert style={{ color: 'red' }} serverity="error">{formError}</Alert>
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
export default RegisterBus