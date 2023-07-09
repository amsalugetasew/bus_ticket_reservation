import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import View from '../../pages/Image/view.jfif'
import Register from '../../pages/Image/register.jfif'

function RegisterBus() {
  const [form, setForm] = useState({
    plateNumber: "",
    busNumber: "",
    busTitle: "",
    seatNumber: "",
    facility: ""
  })
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("")
  const navigate = useNavigate();
  const updateForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
    setSuccess("")
    setFormError("")
  };
  const handleSubmit = async (e) => {
    const newBus = { ...form };
    if (form.busNumber.trim().length === 0) {
      setFormError("Bus Number is required")
    }
    else {
      axios.post('http://localhost:8000/bus/add', newBus)
        .then(function (res) {
          if (res.data === ("Bus with plate number " + form.plateNumber + " already exist")) {
            setFormError(res.data)
          }
          else if (res.data === ("Bus with bus number " + form.busNumber + " already exist")) {
            setFormError(res.data)
          }
          else {
            navigate("/Admin/bus_list");
          }
        })
    }
  }
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleBus(id);
    }
  }, [id]);
  const getSingleBus = async (id) => {
    const response = await axios.get(`http://localhost:8000/bus/${id}`);
    if (response.status === 200) {
      setForm({ ...response.data })
    }

  }
  const handleEdit = async (id) => {
    const newBus = { ...form };
    if (form.busNumber.trim().length === 0) {
      setFormError("Bus Number is required")
    }
    else {
      axios.put(`http://localhost:8000/bus/${id}`, newBus)
        .then(res => console.log(res.data.busTitle));
      navigate("/Admin/bus_list");
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      handleSubmit();
    }
    else {
      handleEdit(id);
    }
  }
  return (
    <div className="main" >
      <main className="app" id='background-Img-contactss' style={{ height: '500px' }}>
        <div className="screen-wrap">
          <section className="screen-home">
            <div className="screen-home__form-wrap">
              <div className="screen-home__form">
                <form>
                  <div id="formdetail">
                    <div className="screen-home__location">
                      <div className="lable">
                        <figure className="icon"><img style={{ width: '60px', height: '60px' }} src={Register} alt='ic' /></figure>
                        <span className="text">Bus {id ? "Modification" : "Registration"} Page Details</span>
                        <Link to="/Admin/bus_list" >
                          <figure className="icon"><img style={{ width: '60px', height: '60px', marginLeft: '3em' }}
                            src={View} alt='ic' /></figure>
                        </Link>
                      </div>
                      <div className="input-wrap" >
                        <div className="inside-wrap" id='flex'>
                          <div className="from" style={{ marginTop: '-0.5em' }}>
                            <span className="inside-lable" style={{color:'teal'}}>Plate Number</span>
                            <input name='plateNumber' id='plateNumber'
                              value={form.plateNumber}
                              onChange={updateForm}
                              placeholder="Plate Number"
                              className='input'
                            />
                          </div>
                          <div className="To" style={{ width: '30em' }}>
                            <span className="inside-lable" style={{color:'teal'}}>Bus Number</span>
                            <input name='busNumber' id='busNumber'
                              className='input'
                              value={form.busNumber}
                              onChange={updateForm}
                              placeholder="Bus Number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="input-wrap" >
                        <div className="inside-wrap" id='flex'>
                          <div className="from" style={{ marginTop: '-0.5em' }}>
                            <span className="inside-lable" style={{color:'teal'}}>Bus Name</span>
                            <input name='busTitle' id='busTitle'
                              className='input'
                              placeholder="Bus Name"
                              value={form.busTitle}
                              onChange={updateForm}
                            />
                          </div>
                          <div className="To">
                            <span className="inside-lable" style={{color:'teal'}}>Number of Seat</span>
                            <input name='seatNumber' id='seatNumber'
                              className='input'
                              placeholder="Number of Seat"
                              value={form.seatNumber}
                              onChange={updateForm}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="To" style={{ marginLeft:'1.5em'}}>
                      <span className="inside-lable" style={{color:'teal'}}>Facility</span>
                              <input name="facility"
                                id="facility" placeholder="Facility " required
                                value={form.facility}
                                onChange={updateForm}
                                className='input'
                                style={{ width: '670px', opacity:'0.5', color:'black', border: '1px black solid' }}
                              />
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
                  <div className="screen-home__recent-search">
                    <div className="lable" style={{ marginTop: '-5em', marginLeft: '6em' }}>
                      {formError && <div className="error_msg" id='error_msg'>{formError}</div>}
                      {success && <div style={{ marginLeft: '-3em', backgroundColor: 'white', marginTop: '-0.6em' }} className="success_msg" id='success_msg'>Trip Reserved Successfully with <b><i>Trip Name:</i></b> <b><u>{success}</u></b></div>}
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
export default RegisterBus