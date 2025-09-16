import { FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div className="w-64 min-h-full bg-orange-400">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/cart">
              <FaShoppingCart></FaShoppingCart>My Cart{" "}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
