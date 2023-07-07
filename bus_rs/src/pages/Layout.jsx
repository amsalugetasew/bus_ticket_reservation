import { Outlet, Link } from "react-router-dom";
import './Layout.scss'
import logo from './Image/golden_bus.jfif';
import {FaHome} from 'react-icons/fa';
import {FcAbout, FcCancel} from 'react-icons/fc';
import {MdLogin} from 'react-icons/md';
import {AiOutlinePhone} from 'react-icons/ai';
import {BiTrip} from 'react-icons/bi';
const Layout = () => {
  return (
    <>
      <nav>
        
        <div className="container">
          <section>
          <div>
            <div className="logo">
            <Link id="active" to="/"><img src={logo} style={{borderRadius:'20%', marginTop:'-1em', marginLeft:'20em'}} alt="logo" className="logoImage"/></Link>
            </div>
          </div>
            <nav>
              <ul>
                <li >
                  <Link id="active" to="/"><FaHome id="icon" /> Home</Link>
                </li>
                <li>
                  <Link to="/about"><FcAbout id="icon"/> About</Link>
                </li>
                <li>
                  <Link to="/contact"><AiOutlinePhone id="icon" />Contact</Link>
                </li>
                <li>
                  <Link to="/search"><BiTrip id="icon" /> Trip Info</Link>
                </li>
                <li><Link  to="reserve">reserv</Link></li>
                <li><Link to="Cancel_Trip"><FcCancel id='icon'/>Cancel Trip</Link> </li>
                <li><Link to="signin"><MdLogin id="icon" />Sign In</Link></li>

              </ul>
            </nav>
          </section>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;