import {
  FaCalendar,
  FaHome,
  FaShoppingCart,
  FaStarAndCrescent,
} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { TbBrandBooking } from "react-icons/tb";
const Dashboard = () => {
  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome></FaHome>User Home{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservation">
              <FaCalendar></FaCalendar>Reservation{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaShoppingCart></FaShoppingCart>My Cart{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review">
              <FaStarAndCrescent />
              Add a Review{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bookings">
              <TbBrandBooking />
              My Bookings{" "}
            </NavLink>
          </li>

          <div className="divider w-full "></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <MdRestaurantMenu /> Menu{" "}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
