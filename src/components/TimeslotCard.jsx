import React from "react";
import { Link } from "react-router-dom";

const TimeslotCard = (params) => {
  const { item, index, doctors } = params;
  return (
    <Link to={`/bookings/${item._id}`}>
      <li
        key={index}
        className="border py-4 my-4 max-w-[700px] mx-auto rounded-lg bg-white shadow-md hover:bg-gray-100 text-black hover:text-black"
      >
        <div className="mx-auto">
          <p className="w-full text-4xl font-bold">
            {item.appointment_slot.start_time.slice(11, 16)}
          </p>
          <p className="w-full">
            <span className="font-bold">Date: </span>
            {item.appointment_slot.start_time.slice(0, 10)}
          </p>
          <p className="w-full">
            <span className="font-bold">Doctor: </span>
            {doctors
              ? doctors.find((doc) => doc._id === item.doctor_id).last_name
              : "...loading"}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default TimeslotCard;
