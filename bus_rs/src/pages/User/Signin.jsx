import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
import { Checkbox } from '@mui/material';
function Signin() {
	const [showPassword, setShowPassword] = useState(false);
	const label = {inputProps:{'arial-lable':"Checkbox demo"}}
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const [form, setForm] = useState({
		email: "",
		password: "",
	})
	const [formError, setFormError] = useState("");
	const navigate = useNavigate();
	const handleChange = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
		setFormError("")
	};
	// Handle Login store logged use profile on local storage
	async function onSubmit(e) {
		e.preventDefault();
		const newPerson = { ...form };
		axios.post('http://localhost:8000/users/login', newPerson)
			.then(function (res) {
				// window.alert(res.data)
				if (res.data === "Incorrect Email or Password") {
					setFormError(res.data);
				}
				else {
					localStorage.setItem('User', JSON.stringify(res.data));
					// const session = localStaorage.getItem(res.data)
					navigate(`/Admin/user/`)
				}
			})
	}
	return (

		<div className="main" >

			<main className="app" id='background-Img-contacts' style={{ height: '500px' }}>
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form" id='backgrounds'>
								<form>

									<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
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

									</Box>
									<div className="screen-home__submit-wrap">
										<span className="line"></span>
										<div className="screen-home__bus-page" id="buspage">
											<figure className="screen-home__bus-arrow-wrap">
												<img
													onClick={onSubmit}
													src="https://i.ibb.co/nQ4khG8/arrow.png" alt='btn' />
											</figure>
										</div>
									</div>
								</form>
							</div>
							<div className="screen-home__recent-search">
								<div className="lable">
									<Checkbox {...label}/>									
									<label className='label' for="password"> Remeber Me</label><br />
									<p style={{ marginLeft: '10em', cursor: 'pointer' }}>Forget Password</p>
									{formError &&
											<Alert style={{marginLeft:'-25em', marginBottom:'5em', color:'red'}} severity='error'>({formError})</Alert>
										}

								</div>


							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}
export default Signin