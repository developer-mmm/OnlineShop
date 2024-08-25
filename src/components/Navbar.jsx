import React from "react";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/userslice";
import { Link } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Contact, Home } from "../pages";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { calculator } = useSelector((state) => state.user);
  const amount = calculator.amount;

  const logOutProfile = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon");
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar fixed z-10   bg-gradient-to-r from-red-500 to-red-800 dark:from-gray-900 dark:to-black max-w-full mx-auto border-b-2 shadow-lg rounded-lg">
      <div className="flex-1  navbar-start flex items-center space-x-4">
        <Link
          to="/"
          className="text-purple-600 ml-8 mr-96 font-bold text-2xl m-0"
        >
          Online shop
        </Link>
        <div className="">
          <Link
            to="/contact"
            className="text-purple-600 font-bold text-xl ml-14"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="flex-none items-center mr-10">
        <div className="mr-4 text-lg text-white sm:flex hidden dark:text-gray-300">
          {user ? user.displayName : "Guest"}
        </div>

        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            aria-label="User menu"
            className="btn btn-ghost btn-circle avatar hover:bg-red-600 dark:hover:bg-gray-800 transition duration-300"
          >
            <div className="w-10 rounded-full border-2 border-white dark:border-gray-500">
              {user ? (
                <img
                  alt="User avatar"
                  src={user.photoURL}
                  className="rounded-full"
                />
              ) : (
                <img
                  alt="Default avatar"
                  src="https://via.placeholder.com/150"
                  className="rounded-full"
                />
              )}
            </div>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-3 w-52 z-[2]"
          >
            <li>
              <button
                onClick={logOutProfile}
                className="text-red-500 dark:text-red-400 flex items-center space-x-2 hover:bg-red-100 dark:hover:bg-gray-700"
              >
                <RiLogoutCircleRLine className="text-xl" />
                <span className="text-xl text-white">EXIT</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="ml-4">
          <Link
            to="/cart"
            className="btn btn-ghost btn-circle hover:bg-red-600 dark:hover:bg-gray-800 transition duration-300"
          >
            <div className="indicator">
              <FaCartPlus className="w-6 h-6 text-white dark:text-gray-300" />
              <span className="badge badge-sm indicator-item bg-red-500 dark:bg-red-600 text-white">
                {amount}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
