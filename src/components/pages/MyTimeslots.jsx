import { DatePicker, Button, Dropdown, Menu } from "antd";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import TimeslotCard from "../TimeslotCard";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

const Timeslots = () => {
  const [doctors, setDoctors] = useState(false);
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState(""); // represents doctor selected on dropdown
  const [dropdownItems, setDropdownItems] = useState(false);
  const [appointments, setAppointments] = useState(false);
  const [token, setToken] = useToken();
  const user = useUser();

  useEffect(() => {
    // get appointments info from API
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

  useEffect(() => {
    // get user bookings from API
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
      .then((res) => {
        if (res.status !== 200) {
          message.error("Could not find your availabilities");
          nav("/");
        }
        return res.json();
      })
      .then((data) => {
        console.log("my availability", data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Header text="Your Availability" />
      <div className="w-full p-8 bg-[#f0edeb]">
        <div className="text-center">
          {/* filter bar */}
          {/* time slots */}
          <div>
            <ul className="pt-6">
              {appointments
                ? appointments.map((item, index) => {
                    return (
                      <TimeslotCard
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
