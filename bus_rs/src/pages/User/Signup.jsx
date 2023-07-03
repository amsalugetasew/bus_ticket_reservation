import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Styles.scss";
// import Footer from '../Footer';
import axios from "axios";
function Signup() {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        password: ""
    });
    const [Cpasswords, setCpassword] = useState({ Cpassword: "" });
    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
        setCpassword({ ...Cpasswords, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        data.role = 'Admin';
        const newPerson = { ...data };
        if (!isNaN(data.firstName)) {
            setFormError("First Name couldn't be number")
        }
        else if (data.password !== Cpasswords.Cpassword) {
            setFormError("Password not matched")
        }
        else {
            axios.post('http://localhost:8000/users/add', newPerson)
            .then(function (res) {
                window.alert(res.data)
                if(res.data === "Email Alread exist"){
                setFormError(res.data)
                }
                else{
                    setError(res.data)
                }
            })
            // console.log(myData)
            // try {
            //     await fetch("http://localhost:8000/users/add", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(newPerson),
            //     })
            //         .catch(error => {
            //             window.alert(error);
            //             if (error.response &&
            //                 error.response.status >= 400 &&
            //                 error.response.status <= 500
            //             ) {
            //                 setError(error.response.data.message);
            //             }
            //             return;
            //         });
            //     setData({ firstName: "", lastName: "", email: "", password: "", Cpassword: "" });
            // console.log(newPerson)   
            // setError('Error') 
            navigate("/Signup");
            }
            // catch (error) {
            //     if (error.response &&
            //         error.response.status >= 400 &&
            //         error.response.status <= 500
            //     ) {
            //         setError(error.response.data.message);
            //     }
            // }
        // }
    }
    return (
        <div className='signupTop'>
            {/* <div className="signupTopmenu">
                <TopMenu />
            </div>
            <div className="menuContainer">
                <MenuIndex />
            </div> */}
            <div className="signup_container">
                <div className="signup_form_container">
                    <div className="left">
                        <h1>I have Account</h1>
                        <Link to="/Signin">
                            <button type="button" className="white_btn">
                                Sign in
                            </button>
                        </Link>
                    </div>
                    <div className="right">
                        <form className="form_container" onSubmit={handleSubmit}>
                            <h1>Create Account</h1>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={data.firstName}
                                className="input"
                                id='firstName'
                                onChange={handleChange}
                            />
                            {/* <p className='error_msg'>{formError.firstName}</p> */}
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={data.lastName}
                                className="input"
                                id='lastName'
                                onChange={handleChange}
                            />
                            {/* <input className="input"
                                type="text" name="role" id="role"
                                placeholder="Role " required
                                value={'User'}
                                onChange={handleChange}
                            /> */}
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={data.email}
                                className="input"
                                id='email'
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={data.password}
                                className="input"
                                id='password'
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                placeholder="Confirmation Password"
                                name="Cpassword"
                                value={data.Cpassword}
                                className="input"
                                id='Cpassword'
                                onChange={handleChange}
                            />
                            {formError && <div className="error_msg" id='error_msg'>{formError}</div>}
                            {error && <div className="success_msg" id='success_msg'>{error}</div>}
                            <button type='submit' className="green_btn" id='input'>
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* <div className="bottom2">
                <Footer />
            </div> */}
        </div>
    )
}
export default Signup