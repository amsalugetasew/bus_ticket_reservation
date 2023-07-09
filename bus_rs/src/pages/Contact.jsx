import { useState } from 'react';
import Contacts from '../pages/Image/contact.png'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
const Contact = () => {
    const [form, setForm] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		coment: ""
	})
	const [formError, setFormError] = useState("");
	// const updateForm = ({ currentTarget: input }) => {
	// 	setForm({ ...form, [input.name]: input.value });
	// 	setFormError("")
	// };
	const handleChange = ({ currentTarget: input }) => {
		setForm({ ...form, [input.name]: input.value });
		setFormError("")
	};
	// setFormError('form.fullName')

	return (
		<div className="main" >
			<main className="app" >
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form" >
								<form>
								<div className="lable" style={{marginLeft:'10em'}}>
												<figure className="icon"><img 
                                                style={{width:'30px', height:'30px'}} 
                                                src={Contacts}
                                                alt='ic' /></figure>
												<span className="text">Contact Details</span>
											</div>
								<Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft:'10em' }}>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="fullName"
											variant="outlined"
											name='fullName'
											value={form.fullName}
											onChange={handleChange}
										/>
										<TextField
											sx={{ m: 1, width: '45ch' }}
											id="outlined-basic"
											label="Email"
											variant="outlined"
											name='email'
											value={form.email}
											onChange={handleChange}
										/>
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
											label="Comment"
											variant="outlined"
											name='coment'
											value={form.coment}
											onChange={handleChange}
										/>

									</Box>
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
									{formError &&
											<Alert style={{marginLeft:'-25em', marginBottom:'5em', color:'red'}} severity='error'>({formError})</Alert>
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
  export default Contact;