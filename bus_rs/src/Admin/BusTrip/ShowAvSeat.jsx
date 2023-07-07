import React, { useState } from 'react'
import { Stack, Autocomplete, TextField } from '@mui/material'
const City = [
  {
    label: "Trip Title",
  },
  {
    label: "Addis Ababa to Gondar",
    value: "Addis Ababa  to Gondar",
  },
  {
    label: "Gondar to Addis Ababa",
    value: "Gondar to Addis Ababa",
  },
  {
    label: "Bahir Dar to Addis Ababa",
    value: "Bahir Dar to Addis Ababa",
  },
  {
    label: "Hawassa to Addis Ababa",
    value: "Hawassa to Addis Ababa",
  },
  {
    label: "Dessie to Addis Ababa",
    value: "Dessie to Addis Ababa",
  },
  {
    label: "Jima to Addis Ababa",
    value: "Jima to Addis Ababa",
  },
  {
    label: "Gambela to Addis Ababa",
    value: "Gambela to Addis Ababa",
  },
  {
    label: "JigJiga to Addis Ababa",
    value: "JigJiga to Addis Ababa",
  },
  {
    label: "Assosa to Addis Ababa",
    value: "Assosa to Addis Ababa",
  },
];
const Per = [
	{
	  label: "Trip Title",
	},
	{
	  label: "Bus",
	  value: "Bus",
	},
	{
		label: "Trip",
	  value: "Trip",
	}
];

const Status = [
	{
	  label: "Status",
	},
	{
	  label: "Available",
	  value: "Available",
	},
	{
		label: "Reserved",
	  value: "Reserved",
	}
];

const ShowAvSeat = () => {
	const [selectedTrip, setSelectedTrip] = useState({ label: "" });
	const handleChange = (e, v) => setSelectedTrip(v);
	const [selectedPer, setSelectedPer] = useState({ label: "" });
	const handleChanges = (e, v) => setSelectedPer(v);
	const [selectedStatus, setSelectedStatus] = useState({ label: "" });
	const handleChangest = (e, v) => setSelectedStatus(v);

	const [dates, setDates] = useState("")
	const [Data, setData] = useState([]);
	const [formError, setFormError] = useState("");
	const [form, setForm] = useState({
	  Date: "",
	  plateNumber: "",
	  tripName: "",
	  per: "",
	  status: ""
	})
	const updateForm = ({ currentTarget: input }) => {
	  setForm({ ...form, [input.name]: input.value });
	};
	form.tripName = selectedTrip.value
	form.per = selectedPer.value
	form.status = selectedStatus.value
	const getRecords = async (e) => {
	  e.preventDefault();
	  setDates(form.Date)
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
		  setFormError(error)
		})
	}
  
	return (
		<div className="main" >
			<main className="app">
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form">
								<form>
									<div id="formdetail">
										<div className="screen-home__location">
											<div className="lable">
												{/* <figure className="icon">
                          <img style={{ width: '60px', height: '60px' }} src={Register} alt='ic' /></figure> */}
												<span className="text">Available Seat Details</span>
												
											</div>
											<div className="input-wrap" >
												<div className="inside-wrap" id='flex'>
													<div className="from" style={{ marginTop: '-0.5em' }}>
														<span className="inside-lable">Plate Number</span>
														<input name='plateNumber' id='plateNumber'
															value={form.plateNumber}
															onChange={updateForm}
															className='input'
														/>
													</div>
													<div className="To" style={{ width: '30em' }}>
													<Stack spacing={1} width='250px' backgraoundColor='white'>
															<Autocomplete
																disablePortal
																id="combo-box-demo"
																options={City}
																sx={{ width: 300 }}
																value={selectedTrip}
																onChange={handleChange}
																renderInput={(params) => <TextField {...params} label="Trip Name" className='input' />}
															/>
														</Stack>
														{/* <span className="inside-lable">Trip Name</span>
														<select name='tripName' id='tripName' value={form.tripName}
															className='input'
															onChange={updateForm}>
															Trip Title
															{City.map((option) => (
																<option value={option.value}>{option.label}</option>))}
														</select> */}
													</div>
												</div>
											</div>
											<div className="input-wrap" >
												<div className="inside-wrap" id='flex'>
													<div className="from" style={{ marginTop: '-0.5em', marginRight:'1em' }}>
													<Stack spacing={1} width='250px'>
															<Autocomplete
																disablePortal
																id="combo-box-demo"
																options={Per}
																sx={{ width: 335 }}
																value={selectedPer}
																onChange={handleChanges}
																renderInput={(params) => <TextField {...params} label="Per" className='input' />}
															/>
														</Stack>
													</div>
													<div className="To" style={{marginLeft:'4.5em'}}>
													<Stack spacing={1} width='250px'>
															<Autocomplete
																disablePortal
																id="combo-box-demo"
																options={Status}
																sx={{ width: 300 }}
																value={selectedStatus}
																onChange={handleChangest}
																renderInput={(params) => <TextField {...params} label="Status" className='input' />}
															/>
														</Stack>
													</div>
												</div>
											</div>
											<div className="screen-home__date">
												<div className="lable">
													<figure className="icon"><img src="https://i.ibb.co/7N5zdnc/calendar.png" alt='dt' /></figure>
													<span className="text">Date</span>
												</div>
												<div className="input-wrap">
													<div className="inside-wrap">
														<div className="onward">

															<input name="Date"
																type='date'
																id="Date" placeholder="Date " required
																value={form.Date}
																onChange={updateForm}
																className='input'
															/>
														</div>
													</div>
												</div>
											</div>
											{/* <div className="input-wrap" >
							<div className="inside-wrap" id='flex'>
							  <div className="rotate-btn" >
								<figure style={{ marginLeft: '-22em' }}>
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
							  <div className="To" style={{ marginTop: '-1.5em' }}>
								<span className="inside-lable">To</span>
								<input name='Arriv_Time' id='Arriv_Time'
								  type='Time'
								  className='input'
								  value={form.Arriv_Time}
								  onChange={updateForm}
								/>
							  </div>
							</div>
						  </div> */}
										</div>
									</div>
									<div className="screen-home__submit-wrap">
										<span className="line"></span>
										<div className="screen-home__bus-page" id="buspage">
											<figure className="screen-home__bus-arrow-wrap">
												<img
													onClick={getRecords}
													src="https://i.ibb.co/nQ4khG8/arrow.png" alt='btn' />
											</figure>
										</div>
									</div>
									<div className="screen-home__recent-search">
										<div className="lable" style={{ marginTop: '-5em', marginLeft: '6em' }}>
											{formError && <div className="error_msg" id='error_msg'>{formError}</div>}
										</div>
									</div>
								</form>

							</div>
							<div className="screen-home__recent-search">
								<div className="lable">
									<figure className="icon"><img src="https://i.ibb.co/dM8cwj6/recent-search.png" alt='btn' /></figure>
									<span className="text">Recent search</span>
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
													
												</li>
											)}
										</ul>
									</div>
									: <>{dates ? <div className="error_msg" id='error_msg'>No Available Trip</div> : ""} </>}
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}
export default ShowAvSeat