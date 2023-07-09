import React, { useEffect } from 'react'
import { useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
function Signup() {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		role: "",
		email: "",
		password: "",
		cpassword: ""
	});
	const { email } = useParams()
	// const [Cpasswords, setCpassword] = useState({ Cpassword: "" });
	const [error, setError] = useState("");
	const [formError, setFormError] = useState("");
	const navigate = useNavigate();
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		setError("");
		setFormError("");
		// setCpassword({ ...Cpasswords, [input.name]: input.value })
	};
	async function getUserData() {
		const formval = { email };
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formval)
		};
		fetch('http://localhost:8000/find/User/', requestOptions)
			.then(response => response.json())
			.then(data => { data ? setData(data) : window.alert('There is no trip in this data') })
			.catch((error) => {
				window.alert(error);
			})
	}
	useEffect(() => {
		getUserData()
	})




	
	const handleSubmit = async (e) => {
		e.preventDefault();
		window.alert(data.email)
		data.role = 'Admin';
		const newPerson = { ...data };
		if (!isNaN(data.firstName)) {
			setFormError("First Name couldn't be number")
		}
		else if (data.password !== data.cpassword) {
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
									<div id="formdetail">
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
									</div>
									<div className="screen-home__submit-wrap">
										<span className="line">
											{formError && <div className="error_msg" id='error_msg'>{formError}</div>}
											{error && <div className="success_msg" id='success_msg'>{error}</div>}
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