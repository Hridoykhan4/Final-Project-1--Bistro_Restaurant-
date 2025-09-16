import { Link, NavLink } from "react-router-dom";
import useAuthValue from "../../../hooks/useAuthValue";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
const Navbar = () => {
  const { user, logOut } = useAuthValue();
  const [cart] = useCart();
  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 font-semibold transition ${
      isActive
        ? "text-green-400 font-bold border-b-2 border-green-400"
        : "text-white hover:text-green-400"
    }`;

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: "Sign out?",
      text: "Do you really want to log out?",
      icon: "question",
      background: "#f0f9ff",
      color: "#0f172a",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Stay logged in",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-lg font-semibold",
        htmlContainer: "text-sm",
        confirmButton: "px-4 py-2 rounded-lg",
        cancelButton: "px-4 py-2 rounded-lg",
      },
    });

    if (result?.isConfirmed) {
      try {
        const res = await logOut();
        console.log(res);
        Swal.fire({
          title: "Signed out!",
          text: "You have been logged out successfully.",
          icon: "success",
          background: "#ecfdf5",
          color: "#065f46",
          confirmButtonColor: "#10b981",
          customClass: {
            popup: "rounded-2xl shadow-lg",
            confirmButton: "px-4 py-2 rounded-lg",
          },
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while logging out.",
          icon: "error",
          background: "#fef2f2",
          color: "#7f1d1d",
          confirmButtonColor: "#ef4444",
          customClass: {
            popup: "rounded-2xl shadow-lg",
          },
        });
      }
    }
  };

  const navOptions = (
    <>
      <li>
        <NavLink className={navLinkStyle} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkStyle} to="/contact">
          Contact Us
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
      {user && (
        <li>
          <NavLink className={navLinkStyle} to="/secret">
            Secret
          </NavLink>
        </li>
      )}

      <li>
        <NavLink className={navLinkStyle} to="/dashboard/cart">
          <button className="flex gap-2 items-center">
            <FaShoppingCart></FaShoppingCart>{" "}
            <div className="badge badge-sm badge-secondary">+{cart?.length}</div>
          </button>
        </NavLink>
      </li>

      {user ? (
        <>
          <button
            onClick={handleLogOut}
            className="px-5 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors duration-300 shadow-sm"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={navLinkStyle}>
            Login
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar  fixed z-50 backdrop-blur-3xl text-white bg-black/40 shadow-sm">
      <div className="navbar-start w-full">
        <Link className="" to="/">
          <span style={{boxShadow: '5px 13px 15px 1px #000000'}} className="font-extrabold text-xl pr-2">Bistro Boss</span> <br />
          <span className="tracking-widest">Restaurant</span>
        </Link>
      </div>
      <div className="navbar-center items-end self-end ms-auto hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end w-fit lg:ms-3">
        {/* <Link className="btn" to="/login">Login</Link> */}
        {/* <button className="btn">Cart</button> */}
        <div className="dropdown dropdown-end ms-3">
          <div tabIndex={0} role="button" className="btn btn-outline lg:hidden">
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
            className="menu menu-sm dropdown-content  bg-gray-700 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
