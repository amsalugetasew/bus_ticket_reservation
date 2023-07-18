import React, { useEffect, useState, Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom';
import "./Admin.scss"
import { BiTrip, BiEditAlt, BiLogOutCircle } from 'react-icons/bi'
import { GiCarSeat } from 'react-icons/gi'
import { FaRegUser, FaBusAlt } from 'react-icons/fa'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import logo from '../../pages/Image/golden_bus.jfif';
const AdminLayout = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'))
        if (user) {
            setUsers(user)
        }
    }, [])
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <>
        <nav>
      <div className="container">
          <section>
          <div>
            <div className="logo">
            <Link id="active" to="/"><img src={logo} className="logoImage" style={{ borderRadius: '20%', marginTop: '-2em', marginLeft: '-30em' }} alt="logo" /></Link>
            </div>
          </div>
         <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Typography sx={{ minWidth: 100 }}></Typography>
        <Typography sx={{ minWidth: 100 }}>
        <Link to='/Admin/Available/seat/'> <GiCarSeat size='1rem' id='icon' /> Seats Information</Link>
          </Typography>
          <Typography sx ={{minWidth: 100}}>
          <Link to='/Admin/Bus_reg/'><FaBusAlt size='1rem' id='icon' />Add Bus</Link>
          </Typography>
          <Typography sx ={{minWidth: 100}}>
          <Link to='/Admin/Trip_reg/'><BiTrip size={'1em'} id='icon' /> Add Trip</Link>
          </Typography>
        
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>G</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {users[0] && users[0].firstName}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> <Link to='/Admin/Signup/'> <FaRegUser id='icon' size={'1em'} />Add another account</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> <Link to='/Admin/EditUser/'><BiEditAlt id='icon' size={'1em'} /> Edit User</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Link to='/Admin/changePassword/'> <BiEditAlt id='icon' size={'1em'} />Change Password </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Link to="/Signin"><BiLogOutCircle id='icon' size='1em' /> Logout</Link>
        </MenuItem>
        <Divider />
      </Menu>
    </Fragment>
        </section>
        </div>
        </nav>
     
            <Outlet />
        </>
    )
};

export default AdminLayout