import React, { useState } from 'react'
// import './res.scss'
import { Link } from 'react-router-dom';
import {Stack, Autocomplete, TextField} from '@mui/material'
const City = [
  {
    label: "City From - To",
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
const SearchTrip = () => {
	const [val, setVal] = useState(null)
	console.log({val})
  const [Data, setData] = useState([]);
	const [dates, setDates] = useState("")
	const [form, setForm] = useState({
		Date: "",
		source: "",
		dest: ""
	})
	const updateForm = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
	};

	const getRecords = async (e) => {
		e.preventDefault();
		setDates(form.Date)
		window.alert(dates)
		const formval = { ...form };
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
												<figure className="icon"><img src="https://i.ibb.co/KwnYdXN/location.png" alt='ic' /></figure>
												<span className="text">Location Details</span>
											</div>
											<div className="input-wrap">
												<div className="inside-wrap">
													<div className="rotate-btn">
														<figure>
															<img src="https://i.ibb.co/HPBrQkn/rotate-btn.png" alt='rt' />
														</figure>
													</div>
													<div className="from">
														<Stack spacing={2} width='250px'>
															<Autocomplete
															options = {City}
															renderInput = {(params)=>
																<TextField {...params}
																label='City'/>}
															value ={val}
															onChange = {(event) =>setVal(newVal)}
															/>
														</Stack>
														<span className="inside-lable">From</span>
														<select name='source' id='source'
															className='input'
															value={form.source}
															onChange={updateForm}
														>
															Trip Title
															{City.map((option) => (
																<option className='inputs' value={option.value}>{option.label}</option>))}
														</select>
													</div>
													<div className="To">
														<span className="inside-lable">To</span>
														<select name='dest' id='dest'
															className='input'
															value={form.dest}
															onChange={updateForm}
														>
															Trip Title
															{City.map((option) => (
																<option className='inputs' value={option.value}>{option.label}</option>))}
														</select>
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
													<div className="screen-homers-from-to">
														<Link to={`/Reserve_seat/${item._id}`}>
														
														<div className="screen-home__submit-wrap">
															<span className="line"></span>
															<div className="screen-home__bus-page" id="buspage">
																<figure className="screen-home__bus-arrow-wrap">
																	<img  src="https://i.ibb.co/nQ4khG8/arrow.png" alt='btn' />
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