import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom';
import './User.scss'
import axios from 'axios';
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
  const updateForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
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
							<div className="screen-home__form">
								<form>
									<div id="formdetail">
										<div className="screen-home__location">
											<div className="lable">
												<figure className="icon"><img src="https://i.ibb.co/KwnYdXN/location.png" alt='ic' /></figure>
												<span className="text">Reservation Details</span>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">First Name</span>
														<input name='firstName' id='firstName'
															className='input'
															value={form.firstName}
															onChange={updateForm}
														/>
													</div>
												</div>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">Middle Name</span>
														<input name='middleName' id='middleName'
															className='input'
															value={form.middleName}
															onChange={updateForm}
														/>
													</div>
												</div>
											</div>

											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">Last Name</span>
														<input name='lastName' id='lastName'
															className='input'
															value={form.lastName}
															onChange={updateForm}
														/>
													</div>
												</div>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">Passanger Age</span>
														<input name='age' id='age'
															className='input'
															value={form.age}
															onChange={updateForm}
														/>
													</div>
												</div>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">E-mail</span>
														<input name='email' id='email'
															className='input'
															value={form.email}
															onChange={updateForm}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="screen-home__date">
											<div className="input-wrap">
												<div className="inside-wrap">
													<span className="inside-lable">Phone Number</span>
													<input name='phoneNumber' id='phoneNumber'
														className='input'
														value={form.phoneNumber}
														onChange={updateForm}
													/>
												</div>
											</div>
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
									{formError && <div className="error_msg" id='error_msg'>{formError}</div>}
									{success && <div className="success_msg" id='success_msg'>Reserved Successfully
										<div>{form.firstName} Your <b><i>PSR Code</i></b> is: <b><u><i><span>{success}</span></i></u></b></div>
										<div>For More use your <b><i>Departing time, Phone Number, and PSR code</i></b></div>
									</div>}
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