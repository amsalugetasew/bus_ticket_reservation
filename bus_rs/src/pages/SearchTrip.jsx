import React, { useState } from 'react'
import './res.scss'
import Trips from './Image/trips.png'
import { Stack, Autocomplete, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
// import { DateField } from '@mui/x-date-pickers';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
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
const SearchTrip = () => {

	const [selected, setSelected] = useState({ label: "" });
	const handleChange = (e, v) => setSelected(v);
	const [selected_Dest, setSelected_Dest] = useState({ label: "" });
	const handleChanges = (e, v) => setSelected_Dest(v);
	const [Data, setData] = useState([]);
	const [dates, setDates] = useState("")
	const [form] = useState({
		Date: "",
		source: "",
		dest: ""
	})
	// const [selected, setSelected] = useState({ label: "" });
	// const handleDateChange = (e, v) => setSelected(v);
	// const [selected_Dest, setSelected_Dest] = useState({ label: "" });
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
	form.source = selected.value
	form.dest = selected_Dest.value
	form.Date = dateto
	const getRecords = async (e) => {
		e.preventDefault();
		setDates(form.Date)
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
	const navigate = useNavigate();
	const handleEditClick = (id) => () => {
		navigate(`/Reserve_seat/${id}`);
	};

	const columns = [
		{ field: '_id', headerName: 'ID', width: 180, editable: true },
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


		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id }) => {
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];
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
											<div className="input-wrap" style={{ backgroundColor: 'white' }}>
												<div className="inside-wrap" style={{ backgroundColor: 'white' }}>
													{/* <div className="rotate-btn" style={{ marginTop: '0.5em' }}>
														<figure>
															<img src="https://i.ibb.co/HPBrQkn/rotate-btn.png" alt='rt' />
														</figure>
													</div> */}
													<div className="from" style={{ backgroundColor: 'white' }}>
														{/* <span className="inside-lable">From</span> */}
														<Stack spacing={2} width='45ch' marginLeft='10em' backgroundColor='white'>
															<Autocomplete
																disablePortal
																id="combo-box-demo"
																options={City}
																sx={{ width: '45ch', marginLeft: '-1em' }}
																value={selected}
																onChange={handleChange}
																renderInput={(params) => <TextField {...params} label="Source City" className='input' />}
															/>
														</Stack>
													</div>
													<div className="To">
														<Stack spacing={2} width='45ch' marginLeft='10em' backgraoundColor='white'>
															<Autocomplete
																disablePortal
																id="combo-box-demo"
																options={City}
																sx={{ width: '45ch' }}
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
													<Box component="form"
														sx={{
															'& > :not(style)': { m: 1, width: '45ch', marginLeft:'10em' },
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
										//  <div className="error_msg" id='error_msg'>No Available Trip</div>
										<Stack sx={{ width: '100%' }} spacing={2}>
											<Alert style={{color:'gold'}} serverity="info">No Available Trip</Alert>
										</Stack>
										: ""} </>}
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}

export default SearchTrip