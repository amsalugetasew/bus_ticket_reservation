const Contact = () => {
    return (
      <div className="signup_container">
            <div className="signup_form_container">
                <div className="left">
                    <div className='h'>
                        <h6>Address</h6>
                        <h8>+251-582-110-481</h8>
                        <h8>+251-940-961-646</h8>
                        <h8> aragawm2016@gmail.com</h8>
                        <h8>gafataddis1@gmail.com</h8>
                        <h8>PoBox 612</h8>
                    </div>
                    <h1><a href="https://www.google.com/maps/place/Gondar/@12.6142319,37.4290276,12.21z/data=!4m5!3m4!1s0x164328823d244edf:0x7826245358a8a65!8m2!3d12.6030181!4d37.4521319" target="_blank" rel="noopener noreferrer">Google Map</a></h1>
                </div>
                <div className="right">
                    <form className="form_container" 
                    // onSubmit={handleSubmit}
                    >
                        <h1>Contact Us</h1>
                        <input
                            type="text"
                            placeholder="Abel"
                            name="firstName"
                            // value={data.firstName}
                            className="input"
                            // onChange={handleChange}
                        />
                        {/* <p className='error_msg'>{formError.firstName}</p> */}
                        <input
                            type="text"
                            placeholder="Yonas"
                            name="lastName"
                            // value={data.lastName}
                            className="input"
                            // onChange={handleChange}
                        />
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            name="email"
                            // value={data.email}
                            className="input"
                            // onChange={handleChange}
                        />
                         <input
                            type="text"
                            placeholder="+251-928-531-589"
                            name="phone"
                            // value={data.phone}
                            className="input"
                            // onChange={handleChange}
                        />
                        
                        <input
                            type="textarea"
                            placeholder="Coment"
                            name="coment"
                            // value={data.coment}
                            className="input"
                            // onChange={handleChange}
                        />
                        {/* {error && <div className="error_msg">{error}</div>} */}
                        <button type='submit' className="green_btn">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
  };
  
  export default Contact;