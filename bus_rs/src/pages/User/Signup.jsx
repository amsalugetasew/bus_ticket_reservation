import React from 'react'
import { useState } from 'react';
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
	const handleChange = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
		setError("");
		setFormError("");
	};
	
	
	// Handle submit to signup user
	const handleSubmit = async (e) => {
		e.preventDefault();
		form.role = 'Admin';
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
			// navigate("/Admin/Signup");
		}

	}

	return (
		<div className="main" id='background-Img-contactt'>
			<main className="app" id='background-Img-contacts'>
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form" id='background'>
								{/* Signup User Form */}
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
									<div className="screen-home__submit-wrap">
										<span className="line">
										{formError &&
											<Alert style={{marginLeft:'-1em', marginTop:'2em',  color:'red'}} severity='error'>{formError}</Alert>
										}
										{error &&
											<Alert style={{marginLeft:'-1em', marginTop:'2em', color:'teal'}} severity='success'>{error}</Alert>
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