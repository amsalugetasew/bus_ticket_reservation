import './App.scss'
import bus from './Image/golden_bus.jfif'
import seat from './Image/seat.jpg'
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="background-Img-home">
    <div className="row">
    <div className="col-2">
        <img src={bus} alt="bus" />
      </div>
      <div className="col-2">
        <h1>Administrators Tasks! on Ticket Reservation System</h1>
        <p>
          Administrator register bus and Trip and 
          they can also check available and/or reserved seat per bus and per trip
          Again Administrator manege user
        </p>
        <Link to ='#' className='buttons'>Explore Now &#8596;</Link>
      </div>
      
      <div className="row">
        <div className="col-2">
        <h1>Travelling Customer Tasks! on Ticket Reservation System</h1>
        <p>
          <ul>
          <li>Custemor allowed to check available seats</li> 
          <li>Allowed to Reserve Seat</li>
          <li>Allowed to Cancel Reserved Seat</li>
          </ul>
        </p>
          <Link to ='#' className='buttons'>Explore Now &#8596;</Link>
        </div>
        <div className="col-2">
          <img src={seat} alt="seat" />
        </div>
      </div>
    </div>
  </div>
  )
  };
  
  export default About;