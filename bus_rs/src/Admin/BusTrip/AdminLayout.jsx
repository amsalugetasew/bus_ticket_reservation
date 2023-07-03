import React, { useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import "./Admin.scss"
const AdminLayout = () => {
    const { email } = useParams();
    const [isOpen1, setIsOpen1] = useState(false);
    const toggling1 = () => setIsOpen1(!isOpen1);
    return (
        <>
            <nav>
                <div className="container">
                    <section>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/Admin/Available/seat">Steats Information</Link>
                                </li>
                                {/* <li>
                                    <Link to="/Admin">Available Trip Information</Link>
                                </li> */}
                                <li>
                                    <Link to="Bus_reg">Add Bus</Link>
                                </li>
                                <li>
                                    <Link to="Trip_reg">Add Trip</Link>
                                </li>
                                {/* <li>
                                    <Link to="Seat_reg">Add Seat</Link>
                                </li> */}
                                <li>
                                <div className="Main">
                                    <li className='limenu' onMouseOver={toggling1}><Link to="">Admin</Link></li>
                                    <div className='DropDownContainer'>
                                        {isOpen1 && (
                                            <div className='DropDownListContainer'>
                                                <div className='DropDownList'>
                                                    <div className='ListItem'><Link to="#"> Change Password </Link></div>
                                                    <div className='ListItem'><Link to="#"> Edit User</Link></div>
                                                    <div className='ListItem'><Link to="/Signin">Logout</Link></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                </li>
                                <Link to="/Signin">{email} Logout</Link>

                            </ul>

                        </nav>
                    </section>
                </div>
            </nav>
            <Outlet />



            {/* <div className='menu'>
                <li className='limenu'><Link to="/Admin/Available/seat">Available Steats Information</Link></li>
                <li className='limenu'><Link to="/Admin">Available Trip Information</Link></li>
                <li className='limenu'><Link to="Bus_reg">Add Bus</Link></li>
                <li className='limenu'><Link to="Trip_reg">Add Trip</Link></li>
                <li className='limenu'><Link to="Seat_reg">Add Seat</Link></li>
                <div className="Main">
                    <li className='limenu' onMouseOver={toggling1}><Link to="">{email}</Link></li>
                    <div className='DropDownContainer'>
                        {isOpen1 && (
                            <div className='DropDownListContainer'>
                                <div className='DropDownList'>
                                    <div className='ListItem'><Link to="#"> Change Password </Link></div>
                                    <div className='ListItem'><Link to="#"> Edit User</Link></div>
                                    <div className='ListItem'><Link to="/Signin">Logout</Link></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div> */}
        </>
    )
};

export default AdminLayout