import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import "./User.scss"
const UserLayout = () => {
    return (
        <>
            <nav>
                <div class="container">
                    <section>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/User">Steats Information</Link>
                                </li>
                                <li>
                                    <Link to="Search_Trip">Search Trip</Link>
                                </li>
                                {/* <li>
                                    <Link to="Reserve_seat">Researve Seat</Link>
                                </li> */}
                                <li>
                                    <Link to="Cancel_Trip">Cancel Trip</Link>
                                </li>
                                <li>

                                </li>
                                <Link className="logout" to="/">Exit</Link>
                            </ul>

                        </nav>
                    </section>
                </div>
            </nav>
            <Outlet />
        </>
    )
};

export default UserLayout