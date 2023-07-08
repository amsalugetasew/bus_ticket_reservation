import axios from 'axios';
import React, { useState } from 'react'
import { CiLock } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Members from '../Image/members.jfif'
import Member from '../Image/member.jfif'
function Signin() {
    const [form, setForm] = useState({
		email: "",
		password: "",
	})
	const [formError, setFormError] = useState("");
	const navigate = useNavigate();

	// These methods will update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	// This function will handle the submission.
	async function onSubmit(e) {
		e.preventDefault();
		const newPerson = { ...form };
		axios.post('http://localhost:8000/users/login', newPerson)
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
	return (
		<div className="main" >
			<main className="app" id='background-Img-contacts' style={{height:'500px'}}>
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form">
								<form>
									<div id="formdetail">
										<div className="screen-home__location">
											<div className="lable">
												<figure className="icon"><img src={Members} style={{width:'60px', height:'60px'}} alt='ic' /></figure>
												<span className="text">Login Details</span> 
                                                <figure className="icon"><img src={Member} style={{width:'80px', height:'80px', marginLeft:'2em'}} alt='ic' /></figure>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">E-mail</span>
														<FaRegUser size='3em' style={{color:'white', marginLeft:'-3em'}} className='icons' />
														<input name='email' id='email'
															className='input'
															value={form.email}
															onChange={(e) => updateForm({ email: e.target.value })}
                                                            style={{textAlign:'center'}}
															required
														/>
													</div>
												</div>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">Password</span>
														<CiLock size='3em' style={{color:'white', marginLeft:'-3em'}} className='icons' /> 
														<input name='password' id='password'
															className='input'
															type='password'
															value={form.password}
															style={{textAlign:'center'}}
															onChange={(e) => updateForm({ password: e.target.value })}
															required
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
									{/* <figure className="icon"><img src="https://i.ibb.co/dM8cwj6/recent-search.png" alt='btn' /></figure> */}
									{/* <span className="text">Remeber Me</span> */}
									<input style={{marginLeft:'3em'}} type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label className='label' for="vehicle1"> Remeber Me</label><br/>
                            <p style={{marginLeft:'10em', cursor:'pointer'}}>Forget Password</p>
									{formError && <div className="error_msg" id='error_msg'>{formError}</div>}

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