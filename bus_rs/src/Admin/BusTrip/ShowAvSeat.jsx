import React, { useState } from 'react'
import { Stack, Autocomplete, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
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
// This page code works for searching and retrieve available and researved seat both Per Trip and Per Bus
const ShowAvSeat = () => {
	// Get selected Trip Name value AutoComplete
	const [selectedTrip, setSelectedTrip] = useState({ label: "" });
	const handleChange = (e, v) => setSelectedTrip(v);
	// Get selected Per Value Bus/Trip value AutoComplete
	const [selectedPer, setSelectedPer] = useState({ label: "" });
	const handleChanges = (e, v) => setSelectedPer(v);
	// Get selected Status value AutoComplete
	const [selectedStatus, setSelectedStatus] = useState({ label: "" });
	const handleChangest = (e, v) => setSelectedStatus(v);

	const [dates, setDates] = useState("")
	const [Data, setData] = useState([]);
	const [formError, setFormError] = useState("");
	// Define form name
	const [form, setForm] = useState({
		Date: "",
		plateNumber: "",
		tripName: "",
		per: "",
		status: ""
	})
	// Get some form Values
	const updateForm = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
	};
	// filter Date from Detailed selected date
	const [date, setDate] = useState()
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
	form.tripName = selectedTrip.value
	form.per = selectedPer.value
	form.status = selectedStatus.value
	// Fetch Requested Data based on search criteria
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

	// Define Column/Field Name and Its Header
	const columns = [
		{
			field: 'plateNumber',
			headerName: 'Plate Number',
			width: 100,
			editable: true,
		},
		{
			field: 'DepartingCity',
			headerName: 'Source City',
			width: 100,
			editable: true,
		},
		{
			field: 'DestinationCity',
			headerName: 'Destination City',
			width: 150,
			editable: true,
		},
		{
			field: 'Time',
			headerName: 'Start Time',
			width: 100,
			editable: true,
		},
		{
			field: 'Arriv_Time',
			headerName: 'Arrival Time',
			width: 100,
			editable: true,
		},
		{
			field: 'seatNumber',
			headerName: 'Number of Seat',
			width: 150,
		},
		{
			field: 'Date',
			headerName: 'Trip Date',
			width: 100,
		},

	];

	return (
		<div className="main" >
			<main className="app">
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form">
								{/* form for search criteia */}
								<form>
									<div id="formdetail">
										<div className="screen-home__location">
											<div className="lable" >
												<span className="text">Available Seat Details</span>

											</div>
											<div className="input-wrap" style={{ paddingTop: '2em' }}>
												<div className="inside-wrap" id='flex'>
													<div className="from" style={{ marginTop: '-2em' }}>

														<TextField
															sx={{ m: 1, width: '35ch' }}
															id="outlined-basic"
															label="Plate Number"
															variant="outlined"
															name='plateNumber'
															value={form.plateNumber}
															onChange={updateForm}
														/>
													</div>
													<div className="To" style={{ width: '30em', marginTop:'-1em' }}>
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
													</div>
												</div>
											</div>
											<div className="input-wrap" >
												<div className="inside-wrap" id='flex'>
													<div className="from" style={{ marginTop: '-0.5em', marginRight: '0em' }}>
														<Stack spacing={1} width='250px'>
															<Autocomplete
																disablePortal
																id="combo-box-demo"
																options={Per}
																sx={{ width: 320 }}
																value={selectedPer}
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
											<div className="To" style={{ marginTop: '1em', marginLeft: '1.5em' }}>
												<Box component="form"

													sx={{
														'& > :not(style)': { m: 1, width: '72ch', marginLeft: '0em' },
													}}
												>
													<LocalizationProvider dateAdapter={AdapterDayjs}>
														<DatePicker
															id="outlined-basic" label="Date" variant="oulined"
															selected={date} onChange={date => setDate(date)}
														/>
													</LocalizationProvider>
												</Box>
											</div>
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
							<div className="screen-home__recent-search" style={{ marginTop: '4em' }}>
								<div className="lable">
									<figure className="icon"><img src="https://i.ibb.co/dM8cwj6/recent-search.png" alt='btn' /></figure>
									<span className="text">Recent search</span>
								</div>
								{/* Retrieve resulted data from search */}
								{Data[0] ?
									<div className="screen-home__rs-wrap">
										<ul className="screen-home__rs-row">
											<Box sx={{
												height: 400, width: '100%',
												'& .actions': {
													color: 'text.secondary',
												},
												'& .textPrimary': {
													color: 'text.primary',
												},
											}}>
												<DataGrid
													rows={Data}
													columns={columns}
													editMode='row'
													getRowId={(row) => row._id}
													initialState={{
														pagination: {
															paginationModel: {
																pageSize: 5,
															},
														},
													}}
													pageSizeOptions={[5]}
													checkboxSelection
													disableRowSelectionOnClick
												/>
											</Box>
										</ul>
									</div>
									: <>{dates ?
										<Stack sx={{ width: '100%' }} spacing={2}>
											<Alert style={{ color: 'gold' }} serverity="info">No Available Trip</Alert>
										</Stack>
										: ""} </>}
								{formError &&
									<Stack sx={{ width: '100%' }} spacing={2}>
										<Alert style={{ color: 'teal' }} serverity="success">{formError}</Alert>
									</Stack>
								}
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}
export default ShowAvSeat