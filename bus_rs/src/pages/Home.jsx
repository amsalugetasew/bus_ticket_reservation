import bus from './Image/golden_bus.jfif'
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="fcontainer">
      <div className="row">
        <div className="col-2">
          <h1>Cross-City Bus Ticket <br />Reservation System!</h1>
          <p>
            Develop a cross-city bus trip reservation system. <br />The system should allow role-based authentication and
            authorization<br /> (login from different privileged users<br /> i.e., admin and travelling customer).
            <br /> The admin user typeshould be able to
          </p>
          <Link to ='#' className='buttons'>Explore Now &#8596;</Link>
        </div>
        <div className="col-2">
          <img src={bus} alt="bus" />
        </div>
      </div>
    </div>
  )
};

export default Home;