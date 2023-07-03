import { Outlet, Link } from "react-router-dom";
import  './Layout.scss'
const Layout = () => {
  return (
    <>
    <nav>
  <div class="container">
  <section>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/User">Reservation</Link>
          </li>
          <Link className="signup" to="Signup">Sign Up</Link>
          <Link  className="signin" to="signin">Sign In</Link>
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