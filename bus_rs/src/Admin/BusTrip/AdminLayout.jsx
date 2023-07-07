import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import "./Admin.scss"
import { BiTrip, BiEditAlt, BiLogOutCircle } from 'react-icons/bi'
import { GiCarSeat } from 'react-icons/gi'
import { FaRegUser, FaBusAlt } from 'react-icons/fa'
import logo from '../../pages/Image/golden_bus.jfif';
const AdminLayout = () => {
    const { email } = useParams();
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
                                    <Link to={`/Admin/Available/seat/${email}`}> <GiCarSeat size='1rem' /> Seats Information</Link>
                                </li>
                                <li>
                                    <Link to={`/Admin/Bus_reg/${email}`}> <FaBusAlt size='1rem' />Add Bus</Link>
                                </li>
                                <li>
                                    <Link to={`/Admin/Trip_reg/${email}`}><BiTrip size={'1em'} /> Add Trip</Link>
                                </li>
                                <li> <Link to="#" id='admins'><FaRegUser id='admin' size='2rem' /></Link> Getasew Amsalu
                                    <div id='sub-menu'>
                                        <ul>
                                            <li><Link to='/Admin/Signup/'> Create User</Link></li>
                                            <li><Link to={`/Admin/Signup/${email}`}> Edit User</Link></li>
                                            <li><Link to={`/Admin/changePassword/${email}`}> <BiEditAlt size={'1em'} />Change Password </Link></li>
                                            <li><Link to="/Signin"><BiLogOutCircle size='1em' /> Logout</Link></li>
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