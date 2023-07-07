import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Signin from './pages/User/Signin';
import Signup from './pages/User/Signup';
import RegisterBus from './Admin/BusTrip/RegisterBus';
import RegitserTrip from './Admin/BusTrip/RegitserTrip';
import ReserveSeat from './Users/ReserveSeat';
import AdminLayout from "./Admin/BusTrip/AdminLayout";
import CancelReservation from "./Users/CancelReservation";
import UserLayout from "./Users/UserLayout";
import UserList from "./pages/User/UserList";
import BusList from "./Admin/BusTrip/BusList";
import TripList from "./Admin/BusTrip/TripList";
import SingleTrip from "./Admin/BusTrip/SingleTrip";
import SingleBus from "./Admin/BusTrip/SingleBus";
import SeatInfo from "./Users/SeatInfo";
import SingleSeat from "./Admin/BusTrip/SingleSeat";
import ShowAvSeat from "./Admin/BusTrip/ShowAvSeat";
import ChangePassword from "./pages/User/ChangePassword";
import Resrvation from "./Admin/BusTrip/resrvation";
import SearchTrip from "./pages/SearchTrip";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Front Page Menu Route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="Signin" element={<Signin />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="UserList" element={<UserList/>}/>
          <Route path="search" element={<SearchTrip/>}/>
          <Route path="reserve" element={<Resrvation/>}/>
          <Route path="Cancel_Trip" element={<CancelReservation />} />
          <Route path="Reserve_seat/:id" element={<ReserveSeat />} />
          
        </Route>

        {/* //Admin Page Route */}
        <Route path="/Admin" element={<AdminLayout />}>
        <Route path="user/:email" element={<ShowAvSeat />} />
        <Route path="reserve/:email" element={<Resrvation />} />
        <Route path="changePassword/:email" element={<ChangePassword />} />
        <Route path="Signup/:email" element={<Signup />} />
        <Route path="Signup" element={<Signup />} />
          <Route path="Bus_reg/:email" element={<RegisterBus />} />
          <Route path="Available/seat/:email" element={<ShowAvSeat />} />
          <Route path="Bus_reg/:id" element={<RegisterBus />} />
          <Route path ="Bus_list" element={<BusList/>}/>
          <Route path ="Trip_list" element={<TripList/>}/>         
          <Route path="Trip_reg/:email" element={<RegitserTrip />} />
          <Route path="Trip_reg/:id" element={<RegitserTrip />} />
          <Route path="view/:id" element={<SingleTrip />} />
          <Route path="bus/view/:id" element={<SingleBus />} />
          <Route path="seat/view/:id" element={<SingleSeat />} />
          <Route path="Logout" element={<Signin/>}/>
        </Route>
        {/* User Page Route */}
        <Route path="/User" element={<UserLayout />}>
        <Route index element={<SeatInfo />} />
          <Route path="Search_Trip" element={<SearchTrip />} />
          <Route path="Reserve_seat" element={<ReserveSeat />} />
          <Route path="Reserve_seat/:id" element={<ReserveSeat />} />
          <Route path="Cancel_Trip" element={<CancelReservation />} />


          {/* Page Not Found Route */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
