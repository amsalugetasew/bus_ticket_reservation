import { useState } from 'react';
import Contacts from '../pages/Image/contact.png'
const Contact = () => {
    const [form, setForm] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		coment: ""
	})
	const [formError, setFormError] = useState("");
	const updateForm = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
	};
	// setFormError('form.fullName')

	return (
		<div className="main" id='background-Img-contactt'>
			<main className="app" id='background-Img-contacts'>
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form">
								<form>
									<div id="formdetail">
										<div className="screen-home__location">
											<div className="lable">
												<figure className="icon"><img 
                                                style={{width:'30px', height:'30px'}} 
                                                src={Contacts}
                                                alt='ic' /></figure>
												<span className="text">Contact Details</span>
											</div>
											<div className="screen-home__date">
												<div className="input-wrap">
													<div className="inside-wrap">
														<span className="inside-lable">Full Name</span>
														<input name='fullName' id='fullName'
															className='input'
															value={form.fullName}
															onChange={updateForm}
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
															className='input'
															value={form.email}
															onChange={updateForm}
															required
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="screen-home__date">
											<div className="input-wrap">
												<div className="inside-wrap">
													<span className="inside-lable">Phone Number</span>
													<input name='phoneNumber' id='phoneNumber'
														className='input'
														value={form.phoneNumber}
														onChange={updateForm}
														required
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="screen-home__date">
										<div className="input-wrap">
											<div className="inside-wrap">
												<span className="inside-lable">Comment</span>
												<textarea className='input'  placeholder="Write Your Comment..."
												value={form.coment}
												onChange={updateForm}
												required
													name="coment" id='coment' ></textarea>
											</div>
										</div>
									</div>
									<div className="screen-home__submit-wrap">
										<span className="line"></span>
										<div className="screen-home__bus-page" id="buspage">
											<figure className="screen-home__bus-arrow-wrap">
												<img 
												// onClick={onSubmit} 
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
  export default Contact;