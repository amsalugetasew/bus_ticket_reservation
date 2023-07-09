import React, { useEffect } from 'react'
import { useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function Signup() {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		role: "",
		email: "",
		password: "",
		cpassword: ""
	})
	const [error, setError] = useState("");
	const [formError, setFormError] = useState("");
	const navigate = useNavigate();
	const handleChange = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
		setError("");
		setFormError("");
	};
	// const [data, setData] = useState({
	// 	firstName: "",
	// 	lastName: "",
	// 	role: "",
	// 	email: "",
	// 	password: "",
	// 	cpassword: ""
	// });
	const { email } = useParams()
	// const [Cpasswords, setCpassword] = useState({ Cpassword: "" });
	
	// const handleChange = ({ currentTarget: input }) => {
	// 	setData({ ...data, [input.name]: input.value });
	// 	setError("");
	// 	setFormError("");
	// };
	async function getUserData() {
		const formval = { email };
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formval)
		};
		fetch('http://localhost:8000/find/User/', requestOptions)
			.then(response => response.json())
			.then(data => { data ? setForm(data) : window.alert('There is no trip in this data') })
			.catch((error) => {
				window.alert(error);
			})
	}
	useEffect(() => {
		getUserData()
	})




	
	const handleSubmit = async (e) => {
		e.preventDefault();
		// window.alert(data.email)
		form.role = 'Admin';
		// window.alert(form.email)
		const newPerson = { ...form };
		if (!isNaN(form.firstName)) {
			setFormError("First Name couldn't be number")
		}
		else if (form.password !== form.cpassword) {
			setFormError("Password not matched")
		}
		else {
			axios.post('http://localhost:8000/users/Add', newPerson)
				.then(function (res) {
					window.alert(res.data)
					if (res.data === "Email Alread exist") {
						setFormError(res.data)
					}
					else {
						setError(res.data)
					}
				})
			navigate("/Signup");
		}

	}

	return (
		<div className="main" id='background-Img-contactt'>
			<main className="app" id='background-Img-contacts'>
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form" id='background'>
								<form>
								<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="First Name"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<AccountCircle />
													</InputAdornment>
												),
											}}
											variant="outlined"
											name='firstName'
											value={form.firstName}
											onChange={handleChange}
										/>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Last Name"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<AccountCircle />
													</InputAdornment>
												),
											}}
											variant="outlined"
											name='lastName'
											value={form.lastName}
											onChange={handleChange}
										/>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Email"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<AccountCircle />
													</InputAdornment>
												),
											}}
											variant="outlined"
											name='email'
											value={form.email}
											onChange={handleChange}
										/>
										<FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
											<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
											<OutlinedInput
												id="outlined-adornment-password"
												type={showPassword ? 'text' : 'password'}
												endAdornment={
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
															edge="end"
														>
															{showPassword ? <VisibilityOff /> : <Visibility />}
														</IconButton>
													</InputAdornment>
												}
												label="Password"
												name= 'password'
												value={form.password}
												onChange={handleChange}
											/>
										</FormControl>
										<FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
											<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
											<OutlinedInput
												id="outlined-adornment-password"
												type={showPassword ? 'text' : 'password'}
												endAdornment={
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
															edge="end"
														>
															{showPassword ? <VisibilityOff /> : <Visibility />}
														</IconButton>
													</InputAdornment>
												}
												label="Confirmation Password"
												name= 'cpassword'
												value={form.cpassword}
												onChange={handleChange}
											/>
										</FormControl>

									</Box>
									{/* <div id="formdetail">
										<div className="screen-home__location">
											<div className="lable">
												<span className="text">Sign Up Details</span>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">First Name</span>
														<input name='firstName' id='firstName'
															className='input'
															value={data.firstName}
															onChange={handleChange}
															required
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
															value={data.lastName}
															onChange={handleChange}
															required
														/>
													</div>
												</div>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">E-mail</span>
														<input name='email' id='email'
															type='email'
															className='input'
															value={data.email}
															onChange={handleChange}
															required
														/>
													</div>
												</div>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">New Password</span>
														<input name='password' id='password'
															type='password'
															className='input'
															value={data.password}
															onChange={handleChange}
															required
														/>
													</div>
												</div>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">Confirmation Password</span>
														<input name='cpassword' id='cpassword'
															type='password'
															className='input'
															value={data.cpassword}
															onChange={handleChange}
															required
														/>
													</div>
												</div>
											</div>
										</div>
									</div> */}
									<div className="screen-home__submit-wrap">
										<span className="line">
										{formError &&
											<Alert style={{marginLeft:'-1em', marginTop:'2em',  color:'red'}} severity='error'>({formError})</Alert>
										}
										{error &&
											<Alert style={{marginLeft:'-1em', marginTop:'2em', color:'teal'}} severity='success'>({error})</Alert>
										}
										</span>
										<div className="screen-home__bus-page" id="buspage">
											<figure className="screen-home__bus-arrow-wrap">
												<img
													onClick={handleSubmit}
													src="https://i.ibb.co/nQ4khG8/arrow.png" alt='btn' />
											</figure>
										</div>
									</div>
								</form>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}
export default Signup