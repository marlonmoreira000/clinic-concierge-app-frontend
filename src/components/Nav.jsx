import { Link } from "react-router-dom";

//

const Nav = () => {
  return (
    <div className="flex justify-between items-center h-24 mx-auto px-4 max-w-[1240px]">
      <h1 className="w-full text-3xl font-bold">Clinic Concierge.</h1>
      <ul className="flex">
        <li className="p-4">Home</li>
        <li className="p-4 flex-shrink-0">About us</li>
        <li className="p-4">Doctors</li>
        <li className="p-4">Bookings</li>
        <li className="p-4">Contact</li>
      </ul>
    </div>
  );
};

export default Nav;
