import React, { useState, useEffect } from "react";
import Header from "../Header";
import AvailabilityCard from "../AvailabilityCard";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";


const Timeslots = () => {
  const [doctors, setDoctors] = useState(false);
  const [appointments, setAppointments] = useState(false);
  const [token, setToken] = useToken();
  const user = useUser();

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
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeslots;
