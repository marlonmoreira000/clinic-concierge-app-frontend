import React, { useState, useEffect } from "react";
import Header from "../Header";
import AvailabilityCard from "../AvailabilityCard";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import { useNavigate } from "react-router-dom";


const Timeslots = () => {
  const [doctors, setDoctors] = useState(false);
  const [appointments, setAppointments] = useState(false);
  const [token, setToken] = useToken();
  const user = useUser();

  const nav = useNavigate();
  const handleButtonClick = (e) => {
    nav("/appointments");
  };

  useEffect(() => {
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/appointments?userId=${user._id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": " application/json",
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        console.log("appointments", data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header text="Your Availability" />
      <div className="w-full p-8 bg-[#f0edeb]">
        <div className="text-center">
          <div>
            <ul className="pt-6">
              {appointments
                ? appointments.map((item, index) => {
                    return (
                      <AvailabilityCard
                        item={item}
                        index={index}
                        doctors={doctors}
                      />
                    );
                  })
                : "Loading..."}
            </ul>
            <button
              onClick={handleButtonClick}
              className="bg-[#23375d] hover:bg-[#334b88] text-gray-100 font-bold py-3 px-6 rounded-md my-[6rem]"
            >
              New Availability
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeslots;
