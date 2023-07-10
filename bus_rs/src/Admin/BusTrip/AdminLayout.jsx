import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import "./Admin.scss"
import { BiTrip, BiEditAlt, BiLogOutCircle } from 'react-icons/bi'
import { GiCarSeat } from 'react-icons/gi'
import { FaRegUser, FaBusAlt } from 'react-icons/fa'
import logo from '../../pages/Image/golden_bus.jfif';
const AdminLayout = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'))
        if (user) {
            setUsers(user)
        }
    }, [])
    return (
        <>
            <nav>
                <div className="container">
                    <section>
                        <div>
                            <div className="logo">
                                <Link id="active" to="/"><img src={logo} className="logoImage" style={{ borderRadius: '20%', marginTop: '-1em', marginLeft: '20em' }} alt="logo" /></Link>
                            </div>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to='/Admin/Available/seat/'> <GiCarSeat size='1rem' id='icon' /> Seats Information</Link>
                                </li>
                                <li>
                                    <Link to='/Admin/Bus_reg/'><FaBusAlt size='1rem' id='icon' />Add Bus</Link>
                                </li>
                                <li>
                                    <Link to='/Admin/Trip_reg/'><BiTrip size={'1em'} id='icon' /> Add Trip</Link>
                                </li>
                                <li> <Link to="#" id='admins'>
                                {users[0] && users[0].firstName}
                                </Link>
                                    <div id='sub-menu'>
                                        <ul>
                                            <li><Link to='/Admin/Signup/'> <FaRegUser id='icon' size={'1em'} />Create User</Link></li>
                                            <li><Link to='/Admin/Signup/'><BiEditAlt id='icon' size={'1em'} /> Edit User</Link></li>
                                            <li><Link to='/Admin/changePassword/'> <BiEditAlt id='icon' size={'1em'} />Change Password </Link></li>
                                            <li><Link to="/Signin"><BiLogOutCircle id='icon' size='1em' /> Logout</Link></li>
                                        </ul>
                                    </div>
                                </li>

                            </ul>

                        </nav>
                    </section>
                </div>
            </nav>
            <Outlet />
        </>
    )
};

export default AdminLayout