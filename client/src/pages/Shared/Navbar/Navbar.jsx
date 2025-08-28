import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 font-semibold transition ${
      isActive
        ? "text-green-400 font-bold border-b-2 border-green-400"
        : "text-gray-300 hover:text-green-400"
    }`;

  const navOptions = (
    <>
      <li>
        <NavLink className={navLinkStyle} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkStyle} to="/menu">
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkStyle} to="/order/salad">
          Order Food
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-10 backdrop-blur-3xl text-white bg-black/40 shadow-sm">
      <div className="navbar-start">
        <Link to="/">
          <span className="font-extrabold text-xl  ">Bistro Boss</span> <br />
          <span className="tracking-widest">Restaurant</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
        <div className="dropdown dropdown-end ms-3">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
