import React, { useState } from 'react'
import '../pages/res.scss'
import axios from 'axios';
import Trips from '../pages/Image/trips.png'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import {  Stack, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
const CancelReservation = () => {
	const [dates, setDates] = useState("")
	const [Data, setData] = useState([]);
	const [formError, setFormError] = useState("");
	const [form, setForm] = useState({
		Date: "",
		phoneNumber: "",
		PSR: ""
	})
	const handleChange = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
		setFormError("")
	};
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



	const handleEdit = (id) => () => {
		const newBus = { ...form };
		axios.put(`http://localhost:8000/cancel/${id}`, newBus)
			.then(function (res) {
				window.alert("PSR " + form.PSR + " " + res.data)
				setFormError("PSR " + form.PSR + " " + res.data)
				setData("")
			});
	}



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


		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id }) => {
				return [
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEdit(id)}
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
							<div className="screen-home__form" id='background'>
								<form>
									<Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: '10em' }}>
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
											label="Passanger Seat Record Code"
											variant="outlined"
											name='PSR'
											value={form.PSR}
											onChange={handleChange}
										/>

									</Box>
									<Box component="form"

												sx={{
													'& > :not(style)': { m: 1, width: '45ch', marginLeft: '10em' },
												}}
											>
												<LocalizationProvider dateAdapter={AdapterDayjs}>
													<DatePicker
														id="outlined-basic" label="Date" variant="oulined"
														selected={date} onChange={date => setDate(date)}
													/>
												</LocalizationProvider>
											</Box>
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
									<span className="text">Trips to be cancel</span>
								</div>
								{Data[0] ?
									<div className="screen-home__rs-wrap">
										<ul className="screen-home__rs-row">
											<Box sx={{
												height: 280, width: '100%',
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


export default CancelReservation