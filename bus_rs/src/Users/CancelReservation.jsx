import React, { useState } from 'react'
import '../pages/res.scss'
import axios from 'axios';
import Close from '../pages/Image/closes.png'
import Trips from '../pages/Image/trips.png'
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
												<figure className="icon"><img style={{width:'30px', height:'30px'}} 
                                                src={Trips} alt='ic' /></figure>
												<span className="text">Trip Search Details to Cancel<span style={{marginLeft:'1em', color:'sandybrown'}}>Make Sure remaining Trip Start time greater than 6hrs!</span></span>
											</div>
											<div className="input-wrap">
												<div className="inside-wrap">
													<div className="from">
														<span className="inside-lable">Phone Number</span>
														<input name='phoneNumber' id='phoneNumber'
															className='input'
															value={form.phoneNumber}
															onChange={updateForm}
														/>
													</div>
													<div className="To">
														<span className="inside-lable">PSR Code</span>
														<input name='PSR' id='PSR'
															className='input'
															value={form.PSR}
															onChange={updateForm}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="screen-home__date">
											<div className="lable">
												<figure className="icon"><img src="https://i.ibb.co/7N5zdnc/calendar.png" alt='dt' /></figure>
												<span className="text">Date Details</span>
											</div>
											<div className="input-wrap">
												<div className="inside-wrap">
													<div className="onward">

														<input type="date" name="Date"
															id="Date" placeholder="Date " required
															value={form.Date}
															onChange={updateForm}
															className='input'
															style={{color:'white', width:'20em'}}
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
												<img onClick={getRecords} src="https://i.ibb.co/nQ4khG8/arrow.png" alt='btn' />
											</figure>
										</div>
									</div>
								</form>
							</div>
							<div className="screen-home__recent-search">
								<div className="lable">
									<figure className="icon"><img style={{width:'30px', height:'30px'}} 
                                                src={Trips} alt='btn' /></figure>
									<span className="text">Trips to be cancel</span>
								</div>
								{Data[0] ?
									<div className="screen-home__rs-wrap">
										<ul className="screen-home__rs-row">
											{Data.map((item, i) =>
												<li className="screen-home__rs-col">
													<div className="screen-homers-from-to">
														<span>{item.DepartingCity}</span>
														<span className="screen-home__rs-arrow"></span>
														<span>{item.DestinationCity}</span>
													</div>
													<div className="screen-homers-from-to">
														<span>{item.plateNumber}</span>
													</div>
													<div className="screen-homers-from-to">
														<span>{item.Time}</span>
														<span className="screen-home__rs-arrow"></span>
														<span>{item.Arriv_Time}</span>
													</div>
													<div className="screen-homers-from-to">
														<span>{item.seatNumber}</span>
													</div>
													<div className="screen-home__rs-date" style={{marginTop:'1em'}}>{item.Date}</div>
													<div className="screen-homers-from-to">
														
														<div className="screen-home__submit-wrap">
															<span className="line"></span>
															<div className="screen-home__bus-page" id="buspage" style={{backgroundColor:'red'}}>
																<figure className="screen-home__bus-arrow-wrap" style={{color:'sandybrown'}}>
																	<img onClick={() => handleEdit(item._id)} style={{width:'30px', height:'30px'}}  src={Close} alt="Cancel" />
																</figure>
															</div>
														</div>
													</div>
												</li>
											)}
										</ul>
									</div>
									: <>{dates ? <div className="error_msg" id='error_msg'>No Available Trip</div> : ""} </>}
									{formError && <div className="success_msg" id='success_msg'>{formError}</div>}
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}


export default CancelReservation