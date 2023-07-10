import { Outlet, Link } from "react-router-dom";
import { Fragment } from 'react';
import './Layout.scss'
import logo from './Image/golden_bus.jfif';
import {FaHome} from 'react-icons/fa';
import {FcAbout, FcCancel} from 'react-icons/fc';
import {MdLogin} from 'react-icons/md';
import {AiOutlinePhone} from 'react-icons/ai';
import {BiTrip} from 'react-icons/bi';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const Layout = () => {
  return (
    <>
      <nav>
      <div className="container">
          <section>
          <div>
            <div className="logo">
            <Link id="active" to="/"><img src={logo} style={{borderRadius:'20%', marginTop:'-2em', marginLeft:'-30em'}} alt="logo" className="logoImage"/></Link>
            </div>
          </div>
         <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>
          <Link id="active" to="/"><FaHome id="icon" /> Home</Link>
          </Typography>
          <Typography sx ={{minWidth: 100}}>
          <Link to="/about"><FcAbout id="icon"/> About</Link>
          </Typography>
          <Typography sx ={{minWidth: 100}}>
          <Link to="/contact"><AiOutlinePhone id="icon" />Contact</Link>
          </Typography>
          <Typography sx ={{minWidth: 100}}>
          <Link to="/search"><BiTrip id="icon" /> Trip Info</Link>
          </Typography>
          <Typography sx ={{minWidth: 100}}>
          <Link to="Cancel_Trip" ><FcCancel id='icon'/>Cancel Trip</Link>
          </Typography>
          <Typography sx ={{minWidth: 100}}>
          <Link to="signin"><MdLogin id="icon" />Sign In</Link>
          </Typography>

        
      </Box>
    </Fragment>
        </section>
        </div>
        
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;