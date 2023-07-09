import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./Style.scss"
import axios from 'axios';
const ChangePassword = () => {
    const { email } = useParams()
	const [form, setForm] = useState({
		email: "",
		password: "",
		cpassword: ""
	})
	const [formError, setFormError] = useState("");
	const navigate = useNavigate();

	// These methods will update the state properties.
	function updateForm(value) {
		setFormError("")
		return setForm((prev) => {
			return { ...prev, ...value };
		});
		
	}

	// This function will handle the submission.
	async function onSubmit(e) {
		e.preventDefault();
		form.email = email;
		// console.log(form.password, form.cpassword )
		if (form.password === form.cpassword) {
			const newPerson = { ...form };
			axios.post('http://localhost:8000/change/password', newPerson)
				.then(function (res) {
					// window.alert(res.data)
					if (res.data === "Incorrect Email or Password") {
						setFormError(res.data)
					}
					else {

						navigate(`/Admin/user/${res.data}`)
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
									<div id="formdetail">
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
									</div>
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