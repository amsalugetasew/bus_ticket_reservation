import React, { useState } from 'react'
const SeatInfo = () => {
  const [Data, setData] = useState([]);
  const [form, setForm] = useState({
    PSR: ""
  })
  const updateForm = ({ currentTarget: input }) => {

    setForm({ ...form, [input.name]: input.value });
  };
  async function getRecords(e) {
    e.preventDefault();
    const formval = { ...form };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formval)
    };
    fetch('http://localhost:8000/reserved/seat/info/', requestOptions)
      .then(response => response.json())
      .then(data => { data ? setData(data) : window.alert('There is no trip in this data') })
      .catch((error) => {
        window.alert(error);
      })
  }
  return (
    <>
      <div className='container'>
      <form onSubmit={getRecords}>
        <input className="box" type="type" name="PSR" style={{ width: "20%", marginLeft: "0em" }}
          value={form.PSR}
          onChange={updateForm}
          // onPointerLeave={getRecords}
          id="PSR" placeholder="PSR Code" required
        />
        <input type="submit" id="submitDetails"
          name="submitDetails"
          value="Search" className='btn' style={{ width: "10%", marginLeft: "1em"}}
        />
      </form>
      
      </div>
      {Data[0] ?
      <div style={{ marginTop: "40px" }}>
        <div className='card'>
          <div className='card-header'>
          {Data.map((item, i) => (
              <>
                <p> {item.firstName}'s Seat Detail</p>
              </>
            ))}
            
          </div>
          <div className='container'>
            
            <span >Plate Number: </span>
            {Data.map((item, i) => (
              <>
                <span>{item.plateNumber}</span>
              </>
            ))}
            <span style={{marginLeft:'1.5em'}}>Seat Number/Code: </span>
            {Data.map((item, i) => (
              <>
                <span>{item.seatNumber}</span>
              </>
            ))}
            {/* <strong>Seat Facility: </strong>
            {Data.map((item, i) => (
              <>
                <span>{item.facility}</span>
              </>
            ))} */}
            <span style={{marginLeft:'1.5em'}}>Passanger Code: </span>
            {Data.map((item, i) => (
              <>
                <span><b><i>{item.PSR}</i></b></span>
              </>
            ))}
            {/* <Link to="/Admin/trip_list" id='btn-edit' className='btn-edit'>Go back</Link> */}
          </div>
        </div>
      </div>
      : <p style={{textAlign:'center'}}>Please enter Passanger Code and Wait to search...</p>}
    </>
  )
}

export default SeatInfo