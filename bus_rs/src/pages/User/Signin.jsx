import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Style.scss"
import axios from 'axios';
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
                window.alert(res.data)
                if(res.data === "Incorrect Email or Password"){
                    setFormError(res.data)
                // navigate("/Admin");
                // navigate(`/Admin/user/${res.data}`)
                }
                else{
                    
                    navigate(`/Admin/user/${res.data}`)
                }
            })

        // await fetch("http://localhost:5000/signup/add", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newPerson),
        // })
        // .catch(error => {
        //   window.alert(error);
        //   return;
        // });

        // setForm({ email: "", password: "" });
        
    }


    return (
        <div className='Acount'>
        <div className='container'>
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 main">
                    <form onSubmit={onSubmit}>
                        <h1> Sign In </h1>
                        <input className="box"
                            type="email" name="email" id="email"
                            placeholder="E-Mail " required
                            value={form.email}
                            onChange={(e) => updateForm({ email: e.target.value })}
                        />
                        
                        <input className="box" type="password" name="password"
                            id="password" placeholder="Password " required
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                        {formError && <div className="error_msg" id='error_msg'>{formError}</div>}
                        <input type="submit" id="submitDetails"
                            name="submitDetails" value="Sign In" />
                    </form>
                    <div className="item">
                        <Link to="/Signup" style={{ textDecoration: "none" }}>
                            <li>Sign Up</li>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}


export default Signin