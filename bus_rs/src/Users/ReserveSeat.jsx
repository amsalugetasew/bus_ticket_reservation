import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './User.scss'
import axios from 'axios';
const ReserveSeat = () => {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    phoneNumber: "",
    action: ""
  })
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("")
  const navigate = useNavigate();
  const updateForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
  };
  const { id } = useParams();
  async function onSubmit(e) {
    e.preventDefault();
    handleEdit(id)
  }

  useEffect(() => {
    if (id) {
      getSingleBus(id);
    }
  }, [id]);
  const getSingleBus = async (id) => {
    const response = await axios.get(`http://localhost:8000/reserve/${id}`);
    if (response.status === 200) {
      setForm(response.data);
    }
  }

  const handleEdit = async (id) => {
    const newBus = { ...form };
    if (form.firstName.trim().length === 0) {
      setFormError("First Name is required")
    }
    else {
      axios.put(`http://localhost:8000/reserve/${id}`, newBus)
        .then(function(res){
          console.log(res.data)
          setSuccess(res.data)
        });
        // navigate("/User/Search_Trip");
    }
  }
  return (
    <div className='Acount'>
      <div className='container'>
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-6 main">
            <form onSubmit={onSubmit}>
              <h1> Seat Reservation Page </h1>
              <div className='both'>
                <div className='left'>
                  <div className='both'>
                    <label htmlFor="FName" className='box'>First Name</label>
                    <input className="box"
                      type="text" name="firstName" id="firstName"
                      placeholder="First Name " required
                      value={form.firstName}
                      onChange={updateForm}
                      // onChange={(e) => updateForm({ firstName: e.target.value })}
                    />
                  </div>
                  <div className='both'>
                    <label htmlFor="MName" className='box'>Middle Name</label>
                    <input className="box"
                      type="text" name="middleName" id="middleName"
                      placeholder="Middle Name " required
                      value={form.middleName}
                      onChange={updateForm}
                      // onChange={(e) => updateForm({ middleName: e.target.value })}
                    /></div>
                  <div className='both'>
                    <label htmlFor="LName" className='box'>Last Name</label>
                    <input className="box"
                      type="text" name="lastName" id="lastName"
                      placeholder="Last Name " required
                      value={form.lastName}
                      onChange={updateForm}
                      // onChange={(e) => updateForm({ lastName: e.target.value })}
                       />
                  </div>
                  <div className='both'>
                    <label htmlFor="Age" className='box'>Passanger Age</label>
                    <input className="box" type="number" name="age"
                      id="age" placeholder="Age" required
                      value={form.age}
                      onChange={updateForm}
                      // onChange={(e) => updateForm({ age: e.target.value })}
                    /></div>
                  {/*<div className='both'>
                    <label htmlFor="DCity" className='box'>Departing City</label>
                    <input className="box" type="text" name="DepartingCity"
                      id="DepartingCity" placeholder="Departing City" required
                      value={form.DepartingCity}
                      onChange={(e) => updateForm({ DepartingCity: e.target.value })}
                      readOnly
                    />
                  </div>
                  <div className='both'>
                    <label htmlFor="DDate" className='box'>Departing Date</label>
                    <input className="box" type="date" name="DDate"
                      id="DDate" placeholder="Departing Date " required
                      value={form.DDate}
                      onChange={(e) => updateForm({ DDate: e.target.value })}
                    />
                  </div>
                   <div className='both'>
                    <label htmlFor="DTime" className='box'>Departing Time</label>
                    <input className="box" type="time" name="DTime"
                      id="DTime" placeholder="Departing Time " required
                      value={form.DTime}
                      onChange={(e) => updateForm({ DTime: e.target.value })}
                    />
                  </div> */}
                </div>
                <div className='right'>
                  <div className='both'>
                    <label htmlFor="Gender" className='box'>Gender</label>
                    <select className='box' name='gender' id='gender' value={form.gender} onChange={updateForm}>
                      <option value={''}>Gender</option>
                      <option value={'Male'}>Male</option>
                      <option value={'Female'}>Female</option>
                    </select>
                  </div>
                  <div className='both'>
                    <label htmlFor="Email" className='box'>Email </label>
                    <input className="box" type="email" name="email"
                      id="email" placeholder="E-mail " required
                      value={form.email}
                      onChange={updateForm}
                      // onChange={(e) => updateForm({ email: e.target.value })}
                    /></div>
                  <div className='both'>
                    <label htmlFor="Phone_no" className='box'>Phone</label>
                    <input className="box" type="phone" name="phoneNumber"
                      id="phoneNumber" placeholder="Phone Number " required
                      value={form.phoneNumber}
                      onChange={updateForm}
                      // onChange={(e) => updateForm({ phoneNumber: e.target.value })}
                    />
                  </div>
                  {/*<div className='both'>
                    <label htmlFor="Seat_no" className='box'>Seat</label>
                    <input className="box" type="text" name="Seat_no"
                      id="Seat_no" placeholder="Seat Number " required
                      value={form.Seat_no}
                      onChange={(e) => updateForm({ Seat_no: e.target.value })}
                    />
                  </div>
                   <div className='both'>
                    <label htmlFor="Arrival_city" className='box'>Arrival City</label>
                    <select className='box' name='Destination' id='Destination'>
                      <option value={''}>Arrival City</option>
                      <option value={'Addis Ababa'}>Addis Ababa</option>
                      <option value={'Gondar'}>Gondar</option>
                    </select>
                  </div>
                  <div className='both'>
                    <label htmlFor="ATime" className='box'>Arrival Time</label>
                    <input className="box" type="time" name="ATime"
                      id="ATime" placeholder="Expected Arrival Time " required
                      value={form.ATime}
                      onChange={(e) => updateForm({ ATime: e.target.value })}
                    />
                  </div> */}
                </div>
              </div>
              {formError && <div className="error_msg" id='error_msg'>{formError}</div>}
              {success && <div className="success_msg" id='success_msg'>Reserved Successfully 
              <div>{form.firstName} Your <b><i>PSR Code</i></b> is: <b><u><i><span>{success}</span></i></u></b></div>
              <div>For More use your <b><i>Departing time, Phone Number, and PSR code</i></b></div>
              </div>}
              <input className='submit' disabled = {success? true : false} type="submit" id="submitDetails"
                name="submitDetails" value="Reserve Seat" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReserveSeat