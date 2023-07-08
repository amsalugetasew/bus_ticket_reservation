import React, { useState } from 'react'
import './res.scss'
import { Link } from 'react-router-dom';
import Trips from './Image/trips.png'
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
// const gt = ['gt', 'ad', 'bd']
const SearchTrip = () => {
	// const [val, setVal] = useState(null)
	// console.log({val})

	const [selected, setSelected] = useState({ label: "" });
	const handleChange = (e, v) => setSelected(v);
	const [selected_Dest, setSelected_Dest] = useState({ label: "" });
	const handleChanges = (e, v) => setSelected_Dest(v);
	// console.log(selected.value);


	const [Data, setData] = useState([]);
	const [dates, setDates] = useState("")
	const [form, setForm] = useState({
		Date: "",
		source: "",
		dest: ""
	})
	form.source = selected.value
	form.dest = selected_Dest.value
	// console.log(form.source, form.dest);
	const updateForm = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
	};

	const getRecords = async (e) => {
		e.preventDefault();
		setDates(form.Date)
		// window.alert(form.new)
		const formval = { ...form };
		// console.log(formval)
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
												<figure className="icon"><img style={{ width: '30px', height: '30px' }}
													src={Trips} alt='ic' /></figure>
												<span className="text">Trip Details</span>
											</div>
											<div className="input-wrap" style={{backgroundColor:'white'}}>
												<div className="inside-wrap" style={{backgroundColor:'white'}}>
													<div className="rotate-btn" style={{ marginTop: '0.5em' }}>
														<figure>
															<img src="https://i.ibb.co/HPBrQkn/rotate-btn.png" alt='rt' />
														</figure>
													</div>
													<div className="from" style={{backgroundColor:'white'}}>
														{/* <span className="inside-lable">From</span> */}
														<Stack spacing={2} width='250px' backgroundColor='white'>
															<Autocomplete
																disablePortal
																id="combo-box-demo"
																options={City}
																sx={{ width: 700, marginLeft: '-1em', marginBottom: '2.5em' }}
																value={selected}
																onChange={handleChange}
																renderInput={(params) => <TextField {...params} label="Source City" className='input' />}
															/>
														</Stack>
													</div>
													<div className="To">
														<Stack spacing={2} width='250px' backgraoundColor='white'>
															<Autocomplete
																disablePortal
																id="combo-box-demo"
																options={City}
																sx={{ width: 700 }}
																value={selected_Dest}
																onChange={handleChanges}
																renderInput={(params) => <TextField {...params}
																	className='input'
																	label="Destination City" />}
															/>
														</Stack>
													</div>
													
												</div>
												<div className="To">
														<div className="lable">
															<figure className="icon"><img src="https://i.ibb.co/7N5zdnc/calendar.png" alt='dt' /></figure>
															<span className="text">Date Details</span>
														</div>
														<input type="date" name="Date"
															id="Date" placeholder="Date " required
															value={form.Date}
															onChange={updateForm}
															className='input'
															style={{ width: '700px', opacity:'0.5', color:'black', border: '1px black solid' }}
														/>
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
									<figure className="icon"><img style={{ width: '30px', height: '30px' }}
										src={Trips} alt='btn' /></figure>
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
													<div className="screen-home__rs-date" style={{ marginTop: '1em' }}>{item.Date}</div>
													<div className="screen-homers-from-to">
														<Link to={`/Reserve_seat/${item._id}`}>

															<div className="screen-home__submit-wrap">
																<span className="line"></span>
																<div className="screen-home__bus-page" id="buspage">
																	<figure className="screen-home__bus-arrow-wrap">
																		<img src="https://i.ibb.co/nQ4khG8/arrow.png" alt='btn' />
																	</figure>
																</div>
															</div>
														</Link>
													</div>
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

export default SearchTrip