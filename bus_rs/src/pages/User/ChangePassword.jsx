import React, { useEffect, useState } from 'react'
import "./Style.scss"
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import { VisibilityOff } from '@mui/icons-material';
const ChangePassword = () => {
	// Fetch stored Data during login
	const [users, setUsers] = useState([])
	const [formSuccess, setFormSuccess] = useState("");
	const [formError, setFormError] = useState("");
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'))
        if (user) {
            setUsers(user)
        }
    }, [])
	let emails
    if(users[0]){
        emails= users[0].email;
    }
	// console.log(emails)
	const [form, setForm] = useState({
		email: emails,
		password: "",
		cpassword: ""
	})
	
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleChange = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
		setFormError("")
		setFormSuccess("");
	};
	form.email = emails
	// console.log(form.email)
	
	// Get Email from Logged User
	
	// This function will handle the submission. that change password by using Logged Email
	async function onSubmit(e) {
		e.preventDefault();
		// form.email = email;
		if (form.password === form.cpassword) {
			const newPerson = { ...form };
			axios.post('http://localhost:8000/change/password', newPerson)
				.then(function (res) {
					// window.alert(res.data)
					if (res.data === "Incorrect Email or Password") {
						setFormError(res.data)
					}
					else {

						setFormSuccess('Password Changed sucessfully')
					}
				})
		}
		else {
			setFormError("Password not match")
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
																						
										<FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
											<InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
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
												label="New Password"
												name= 'password'
												value={form.password}
												onChange={handleChange}
											/>
										</FormControl>
										<FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
											<InputLabel htmlFor="outlined-adornment-password">Confirmation Password</InputLabel>
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
												<span className="text">Change Password Details</span>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">New Password</span>
														<input name='password' id='password'
															type='password'
															className='input'
															value={form.password}
															onChange={(e) => updateForm({ password: e.target.value })}
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
															value={form.cpassword}
															onChange={(e) => updateForm({ cpassword: e.target.value })}
															required
														/>
													</div>
												</div>
											</div>
										</div>
									</div> */}
									<div className="screen-home__submit-wrap">
										<span className="line">
										{formError && <div className="error_msg" id='error_msg'>{formError}</div>}
										</span>
										<div className="screen-home__bus-page" id="buspage">
											<figure className="screen-home__bus-arrow-wrap">
												<img
													onClick={onSubmit}
													src="https://i.ibb.co/nQ4khG8/arrow.png" alt='btn' />
											</figure>
										</div>
									</div>
									{formError &&
											<Alert style={{marginLeft:'-25em', marginBottom:'5em', color:'red'}} severity='error'>({formError})</Alert>
										}
										{formSuccess &&
											<Alert style={{marginLeft:'-1em', marginTop:'2em', color:'teal'}} severity='success'>({formSuccess})</Alert>
										}
								</form>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}
export default ChangePassword