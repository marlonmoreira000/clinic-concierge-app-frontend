import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Nav = () => {
  // state for navigation menu
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full bg-[#f0edeb]">
      <div className="flex justify-between items-center h-24 mx-auto px-6 max-w-[1240px]">
        <h1 className="w-full text-3xl font-bold text-[#23375d]">
          Beachside GP.
        </h1>
        <ul className="hidden lg:flex uppercase text-[#23375d] font-bold">
          <li className="p-4"><Link to="/">Home</Link></li>
          <li className="p-4 flex-shrink-0"><Link to="/about">About us</Link></li>
          <li className="p-4"><Link to="/doctors">Doctors</Link></li>
          <li className="p-4"><Link to="/bookings">Bookings</Link></li>
          <li className="p-4"><Link to="/contact">Contact</Link></li>
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
            <li className="p-4 border-b border-gray-600">Home</li>
            <li className="p-4 border-b border-gray-600 flex-shrink-0">
              About us
            </li>
            <li className="p-4 border-b border-gray-600">Doctors</li>
            <li className="p-4 border-b border-gray-600">Bookings</li>
            <li className="p-4">Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
