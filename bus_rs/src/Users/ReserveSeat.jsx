import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const ReserveSeat = () => {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    phoneNumber: "",
    action: ""
  })
  const [genders, setGenders] = useState('');
  const handleGender = (event) => {
    setGenders(event.target.value);
  };
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("")
  const handleChange = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
		setFormError("");
    setSuccess("");
	};
  form.gender = genders
  const { id } = useParams();
  async function onSubmit(e) {
    e.preventDefault();
    handleEdit(id)
  }

  useEffect(() => {
    if (id) {
      getSingleBus(id);
    }
  }, [id]);
  const getSingleBus = async (id) => {
    const response = await axios.get(`http://localhost:8000/reserve/${id}`);
    if (response.status === 200) {
      setForm(response.data);
    }
  }

  const handleEdit = async (id) => {
    const newBus = { ...form };
    if (form.firstName.trim().length === 0) {
      setFormError("First Name is required")
    }
    else {
      axios.put(`http://localhost:8000/reserve/${id}`, newBus)
        .then(function(res){
          console.log(res.data)
          setSuccess(res.data)
        });
        // navigate("/User/Search_Trip");
    }
  }
  return (
    <div className="main">
			<main className="app">
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form" id='background'>
								<form>
									<div id="formdetail">
										<div className="screen-home__location">
											<div className="lable" style={{marginLeft:'10em'}}>
												<figure className="icon"><img src="https://i.ibb.co/KwnYdXN/location.png" alt='ic' /></figure>
												<span className="text">Reservation Details</span>
											</div>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft:'10em'}}>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="First Name"
											variant="outlined"
											name='firstName'
											value={form.firstName}
											onChange={handleChange}
										/>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="middleName"
											variant="outlined"
											name='middleName'
											value={form.middleName}
											onChange={handleChange}
										/>
                    <TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Last Name"
											variant="outlined"
											name='lastName'
											value={form.lastName}
											onChange={handleChange}
										/>
                    <TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Email"
											variant="outlined"
											name='email'
											value={form.email}
											onChange={handleChange}
										/>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Phone Number"
											variant="outlined"
											name='phoneNumber'
											value={form.phoneNumber}
											onChange={handleChange}
										/>
                    <FormControl sx={{ m: 1, minWidth: 120, width: '45ch' }}>
                            <InputLabel id="demo-simple-select-error-label">Gender</InputLabel>
                            <Select
                              labelId="demo-simple-select-error-label"
                              id="demo-simple-select-error"
                              value={genders}
                              label="Gender"
                              onChange={handleGender}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                            </Select>
                          </FormControl>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Age"
											variant="outlined"
											name='age'
											value={form.age}
											onChange={handleChange}
										/>

									</Box>
											</div>
									</div>
									<div className="screen-home__submit-wrap">
										<span className="line"></span>
										<div className="screen-home__bus-page" id="buspage">
											<figure className="screen-home__bus-arrow-wrap">
												<img onClick={onSubmit} src="https://i.ibb.co/nQ4khG8/arrow.png" alt='btn' />
											</figure>
										</div>
									</div>

								</form>
							</div>
							<div className="screen-home__recent-search">
								<div className="lable">
									<figure className="icon"><img src="https://i.ibb.co/dM8cwj6/recent-search.png" alt='btn' /></figure>
									<span className="text">Reservation Message</span>
									{formError &&
                   <Stack sx={{ width: '100%' }} spacing={2}>
											<Alert style={{color:'red'}} serverity="info">{formError}</Alert>
										</Stack>
                  }
									{success && 
                    <Stack sx={{ width: '100%' }} spacing={2}>
											<Alert style={{color:'teal'}} serverity="info">Reserved Successfully 
                      <div>{form.firstName} Your <b><i>PSR Code</i></b> is: <b><u><i><span>{success}</span></i></u></b></div>
										<div>For More use your <b><i>Departing time, Phone Number, and PSR code</i></b></div>
                      </Alert>
										</Stack>
                    }
								</div>


							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
  )
}

export default ReserveSeat