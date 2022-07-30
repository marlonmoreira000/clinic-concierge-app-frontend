import React from "react";
import { message } from "antd";
import { useToken } from "./auth/useToken";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const AvailabilityCard = (params) => {
  const navigate = useNavigate();
  const [token, setToken] = useToken();
  const handleDeleteButtonClick = (e) => {
    const appointmentId = e.target.id;
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/appointments/${appointmentId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": " application/json",
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
          message.success("Timeslot deleted.");
          window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        message.error("There was an error deleting message");
      });
  };

  const { item, index } = params;
  return (
    <li
      key={index}
      className="border py-4 my-4 max-w-[700px] mx-auto rounded-lg bg-white shadow-md hover:bg-gray-100 text-black hover:text-black"
    >
      <div className="mx-auto">
        <p className="w-full text-4xl font-bold">
          {moment(item.appointment_slot.start_time).format('h:mm A')}
        </p>
        <p className="w-full">
          <span className="font-bold">Date: </span>
          {moment(item.appointment_slot.start_time).format('DD.MM.YYYY')}
        </p>
      </div>
      <div>
        <button
          appt={item.appointment_id}
          id={item._id}
          onClick={handleDeleteButtonClick}
          className="bg-[#d25c5c] hover:bg-[#e49292] text-gray-100 font-bold py-2 px-6 rounded-md mt-2 mb-2 mx-[1rem]"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default AvailabilityCard;
