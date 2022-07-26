import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./auth/useUser";
import { message } from "antd";
import { useToken } from "./auth/useToken";

const Nav = () => {
  const [nav, setNav] = useState(false);
  const [token, setToken] = useToken();
  const navigator = useNavigate();

  const user = useUser();
  console.log(user)

  const handleNav = () => {
    setNav(!nav);
  };

  const logOut = (e) => {
    // perform logout API request
    fetch("https://clinic-concierge.herokuapp.com/api/v1/refreshToken/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": " application/json",
      },
      body: JSON.stringify({
        refreshToken: `${localStorage.getItem("refreshToken")}`,
      }), // is this the right token to send?
    })
      .then((res) => res.json())
      .then((data) => {
        message.success(data.message);
      })
      .catch((err) => {
        console.log(err.message);
        message.error(err.message);
      });

    // return to homepage
    navigator("/");

    // clear storage and reset tokens
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return (
    <div className="w-full bg-[#f0edeb]">
      <div className="flex justify-between items-center h-24 mx-auto px-6 max-w-[1240px]">
        <h1 className="w-full text-3xl font-bold text-[#23375d]">
          Beachside GP.
        </h1>
        <ul className="hidden lg:flex uppercase text-[#23375d] font-bold">
          <li className="p-4">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 flex-shrink-0">
            <Link to="/about">About us</Link>
          </li>
          <li className="p-4">
            <Link to="/doctors">Doctors</Link>
          </li>
          <li className="p-4">
            <Link to="/bookings">Bookings</Link>
          </li>
          {
            <li className="p-4 flex-shrink-0">
              {user.roles[1] == "doctor" ? (
                <Link to="/appointments">My appts</Link>
              ) : (
                <Link to="/my-appointments">My appts</Link>
              )}
            </li>
          }
          <li className="p-4">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-4">
            {localStorage.getItem("token") ? (
              ""
            ) : (
              <Link to="/register">Register</Link>
            )}
          </li>
          <li className="p-4">
            {localStorage.getItem("token") ? (
              <Link onClick={logOut} to="/">
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
        <div onClick={handleNav} className="block lg:hidden">
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-600 bg-[#d3d3d3] ease-in-out duration-500"
              : "fixed left-[-100%]"
          }
        >
          <h1 className="w-full text-3xl font-bold pl-6 pt-10">
            Clinic Concierge.
          </h1>
          <ul className="pt-12 pl-6 uppercase">
            <li className="p-4 border-b border-gray-400">
              <Link to="/">Home</Link>
            </li>
            <li className="p-4 border-b border-gray-400 flex-shrink-0">
              <Link to="/about">About us</Link>
            </li>
            <li className="p-4 border-b border-gray-400">
              <Link to="/doctors">Doctors</Link>
            </li>
            <li className="p-4 border-b border-gray-400">
              <Link to="/bookings">Bookings</Link>
            </li>
            <li className="p-4 border-b border-gray-400">
              <Link to="/my-appointments">My appts</Link>
            </li>
            <li className="p-4 border-b border-gray-400">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="p-4 border-b border-gray-400">
              <Link to="/register">Register</Link>
            </li>
            <li className="p-4 border-b border-gray-400">
              {localStorage.getItem("token") ? (
                <Link onClick={logOut} to="/">
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
