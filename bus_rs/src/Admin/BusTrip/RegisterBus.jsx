import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Bus_style.scss'
import axios from 'axios';
// import Select from 'react-select';

// const aquaticCreatures = [
//   { label: 'Shark', value: 'Shark' },
//   { label: 'Dolphin', value: 'Dolphin' },
//   { label: 'Whale', value: 'Whale' },
//   { label: 'Octopus', value: 'Octopus' },
//   { label: 'Crab', value: 'Crab' },
//   { label: 'Lobster', value: 'Lobster' },
// ];
function RegisterBus() {

  const [form, setForm] = useState({
    plateNumber: "",
    busNumber: "",
    busTitle: "",
    seatNumber: "",
    facility: ""
  })
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const updateForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    const newBus = { ...form };
    if (form.busNumber.trim().length === 0) {
      setFormError("Bus Number is required")
    }
    else {
      axios.post('http://localhost:8000/bus/add', newBus)
        .then(res => console.log(res.data));
      navigate("/Admin/bus_list");
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
    <div className='Acount'>
      <div className='container'>
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-6 main">
            <Link to="/Admin/bus_list" style={{ marginLeft: "35em", marginBottom: "-25em" }} className='btn btn-edit'>List of bus</Link>
            <form onSubmit={onSubmit}>
              <h1> Bus {id ? "Modification" : "Registration"} Page </h1>
              {/* <Select id='sl'
                options={aquaticCreatures}
              /> */}
              <input className="box"
                type="text" name="plateNumber" id="plateNumber"
                placeholder="Plate Number " required
                value={form.plateNumber}
                onChange={updateForm}
              />

              <input className="box" type="text" name="busNumber"
                id="busNumber" placeholder="Bus Number " required
                value={form.busNumber}
                onChange={updateForm}
              // onChange={(e) => updateForm({ Bus_no: e.target.value })}
              />
              <input className="box" type="text" name="busTitle"
                id="busTitle" placeholder="Bus Title " required
                value={form.busTitle}
                onChange={updateForm}
              />
              <input className="box" type="text" name="seatNumber"
                id="seatNumber" placeholder="Number Seat " required
                value={form.seatNumber}
                onChange={updateForm}
              />
              <input className="box" type="text" name="facility"
                id="facility" placeholder="Facility " required
                value={form.facility}
                onChange={updateForm}
              />
              {formError && <div className="error_msg" id='error_msg'>{formError}</div>}
              <input type="submit" id="submitDetails"
                name="submitDetails"
                value={id ? "Edit Bus" : "Add Bus"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterBus