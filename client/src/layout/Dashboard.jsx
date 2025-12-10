import {
  FaBook,
  FaCalendar,
  FaFirstOrder,
  FaHome,
  FaList,
  FaShoppingCart,
  FaStarAndCrescent,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FcContacts } from "react-icons/fc";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const { cart } = useCart();
  const isAdmin = true; // TODO: Fetch this from DB
  const navLinkBase =
    "px-4 py-2 font-semibold transition duration-300 rounded-md";
  const navLinkActive = "text-green-400 font-bold border-b-2 border-green-400";
  const navLinkDefault = "text-black hover:text-green-400";
  const navLinks = (
    <>
      {isAdmin ? (
        <>
          <li>
            <NavLink
              to="/dashboard/adminHome"
              className={"text-lg font-semibold flex items-center gap-1"}
            >
              <FaHome />
              Admin Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/addItems"
              className={"text-lg font-semibold flex items-center gap-1"}
            >
              <FaUtensils />
              Add items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manageItems"
              className={"text-lg font-semibold  flex items-center gap-1"}
            >
              <FaList />
              Manage items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manageBooking"
              className={"text-lg font-semibold  flex items-center gap-1"}
            >
              <FaBook />
              Manage bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/allUsers"
              className={"text-lg font-semibold  flex items-center gap-1"}
            >
              <FaUser />
              All Users
            </NavLink>
          </li>
        </>
      ) : (
        <>
          {/* USER ROUTES */}
          <li>
            <NavLink
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkDefault}`
              }
              to="/dashboard/userHome"
            >
              <FaHome /> User Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkDefault}`
              }
              to="/dashboard/reservation"
            >
              <FaCalendar /> Reservation
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkDefault}`
              }
              to="/dashboard/cart"
            >
              <FaShoppingCart /> My Cart ({cart?.length || 0})
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkDefault}`
              }
              to="/dashboard/review"
            >
              <FaStarAndCrescent /> Add Review
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkDefault}`
              }
              to="/dashboard/bookings"
            >
              <TbBrandBooking /> My Bookings
            </NavLink>
          </li>
        </>
      )}

      <div className="divider"></div>

      {/* PUBLIC LINKS */}
      <li>
        <NavLink
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : navLinkDefault}`
          }
          to="/"
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : navLinkDefault}`
          }
          to="/order/salad"
        >
          <MdRestaurantMenu /> Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : navLinkDefault}`
          }
          to="/contact"
        >
          <FcContacts /> Contact
        </NavLink>
      </li>
      {!isAdmin && (
        <li>
          <NavLink
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : navLinkDefault}`
            }
            to="/order/salad"
          >
            <FaFirstOrder /> Order
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-200">
        {/* Top Navbar */}
        <div className="navbar bg-base-100 border-b">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          <div className="flex-1 font-bold text-xl">Dashboard</div>
        </div>

        {/* Outlet Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu w-72 bg-white min-h-full p-4 text-base font-medium border-r shadow-md">
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
