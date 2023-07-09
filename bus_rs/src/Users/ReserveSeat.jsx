import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom';
import './User.scss'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
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
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("")
  // const updateForm = ({ currentTarget: input }) => {
  //   setForm({ ...form, [input.name]: input.value });
  //   setFormError("");
  //   setSuccess("");
  // };
  const handleChange = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
		setFormError("");
    setSuccess("");
	};
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
									<span className="text">Recent search</span>
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
    // <div className='Acount'>
    //   <div className='container'>
    //     <div className="row">
    //       <div className="col-md-3">
    //       </div>
    //       <div className="col-md-6 main">
    //         <form onSubmit={onSubmit}>
    //           <h1> Seat Reservation Page </h1>
    //           <div className='both'>
    //             <div className='left'>
    //               <div className='both'>
    //                 <label htmlFor="FName" className='box'>First Name</label>
    //                 <input className="box"
    //                   type="text" name="firstName" id="firstName"
    //                   placeholder="First Name " required
    //                   value={form.firstName}
    //                   onChange={updateForm}
    //                 />
    //               </div>
    //               <div className='both'>
    //                 <label htmlFor="MName" className='box'>Middle Name</label>
    //                 <input className="box"
    //                   type="text" name="middleName" id="middleName"
    //                   placeholder="Middle Name " required
    //                   value={form.middleName}
    //                   onChange={updateForm}
    //                 /></div>
    //               <div className='both'>
    //                 <label htmlFor="LName" className='box'>Last Name</label>
    //                 <input className="box"
    //                   type="text" name="lastName" id="lastName"
    //                   placeholder="Last Name " required
    //                   value={form.lastName}
    //                   onChange={updateForm}
    //                    />
    //               </div>
    //               <div className='both'>
    //                 <label htmlFor="Age" className='box'>Passanger Age</label>
    //                 <input className="box" type="number" name="age"
    //                   id="age" placeholder="Age" required
    //                   value={form.age}
    //                   onChange={updateForm}
    //                 /></div>
                  
                  
    //             </div>
    //             <div className='right'>
    //               <div className='both'>
    //                 <label htmlFor="Gender" className='box'>Gender</label>
    //                 <select className='box' name='gender' id='gender' value={form.gender} onChange={updateForm}>
    //                   <option value={''}>Gender</option>
    //                   <option value={'Male'}>Male</option>
    //                   <option value={'Female'}>Female</option>
    //                 </select>
    //               </div>
    //               <div className='both'>
    //                 <label htmlFor="Email" className='box'>Email </label>
    //                 <input className="box" type="email" name="email"
    //                   id="email" placeholder="E-mail " required
    //                   value={form.email}
    //                   onChange={updateForm}
    //                   // onChange={(e) => updateForm({ email: e.target.value })}
    //                 /></div>
    //               <div className='both'>
    //                 <label htmlFor="Phone_no" className='box'>Phone</label>
    //                 <input className="box" type="phone" name="phoneNumber"
    //                   id="phoneNumber" placeholder="Phone Number " required
    //                   value={form.phoneNumber}
    //                   onChange={updateForm}
    //                   // onChange={(e) => updateForm({ phoneNumber: e.target.value })}
    //                 />
    //               </div>
    //               {/*<div className='both'>
    //                 <label htmlFor="Seat_no" className='box'>Seat</label>
    //                 <input className="box" type="text" name="Seat_no"
    //                   id="Seat_no" placeholder="Seat Number " required
    //                   value={form.Seat_no}
    //                   onChange={(e) => updateForm({ Seat_no: e.target.value })}
    //                 />
    //               </div>
    //                <div className='both'>
    //                 <label htmlFor="Arrival_city" className='box'>Arrival City</label>
    //                 <select className='box' name='Destination' id='Destination'>
    //                   <option value={''}>Arrival City</option>
    //                   <option value={'Addis Ababa'}>Addis Ababa</option>
    //                   <option value={'Gondar'}>Gondar</option>
    //                 </select>
    //               </div>
    //               <div className='both'>
    //                 <label htmlFor="ATime" className='box'>Arrival Time</label>
    //                 <input className="box" type="time" name="ATime"
    //                   id="ATime" placeholder="Expected Arrival Time " required
    //                   value={form.ATime}
    //                   onChange={(e) => updateForm({ ATime: e.target.value })}
    //                 />
    //               </div> */}
    //             </div>
    //           </div>
    //           {formError && <div className="error_msg" id='error_msg'>{formError}</div>}
    //           {success && <div className="success_msg" id='success_msg'>Reserved Successfully 
    //           <div>{form.firstName} Your <b><i>PSR Code</i></b> is: <b><u><i><span>{success}</span></i></u></b></div>
    //           <div>For More use your <b><i>Departing time, Phone Number, and PSR code</i></b></div>
    //           </div>}
    //           <input className='submit' disabled = {success? true : false} type="submit" id="submitDetails"
    //             name="submitDetails" value="Reserve Seat" />
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default ReserveSeat