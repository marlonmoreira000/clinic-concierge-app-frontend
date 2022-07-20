import React from "react";
import Header from "../Header";
import { useEffect, useState } from "react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState(false);
  const [myAppointments, setMyAppointments] = useState(false);
  const [doctors, setDoctors] = useState(false);

  useEffect(() => {
    // get doctors info from API
    fetch("https://clinic-concierge.herokuapp.com/api/v1/doctors/")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        console.log("doctors", data);
      })
      .catch((err) => console.log(err));
  }, []);
    
    useEffect(() => {
      // get doctors info from API
      fetch("https://clinic-concierge.herokuapp.com/api/v1/appointments/")
        .then((res) => res.json())
        .then((data) => {
          setAppointments(data);
          console.log("appointments", data);
        })
        .catch((err) => console.log(err));
    }, []);

  useEffect(() => {
    // get my appointments from API
    fetch(
      "https://clinic-concierge.herokuapp.com/api/v1/bookings?patientId=62d037df1ceb4dda0110949c" // hard-coded patientId used for MVP
    )
      .then((res) => res.json())
      .then((data) => {
        setMyAppointments(data);
        console.log("my appointments", data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header text="My Appointments." />
      <div className="w-full p-8 bg-[#f0edeb]">
        <div className="text-center">
          {/* time slots */}
          <div>
            <ul className="pt-6">
              {myAppointments
                ? myAppointments.map((item, index) => {
                    return (
                      <li
                        className="border py-4 my-4 max-w-[700px] mx-auto rounded-lg bg-white shadow-md hover:bg-gray-100 text-black hover:text-black"
                        key={index}
                      >
                        <div className="mx-auto">
                          <p className="w-full text-4xl font-bold">
                            {appointments
                              ? appointments
                                  .find(
                                    (appt) => appt._id === item.appointment_id
                                  )
                                  .appointment_slot.start_time.slice(11, 16)
                              : "...loading"}
                          </p>
                          <p className="w-full">
                            <span className="font-bold">Date: </span>
                            {appointments
                              ? appointments
                                  .find(
                                    (appt) => appt._id === item.appointment_id
                                  )
                                  .appointment_slot.start_time.slice(0, 10)
                              : "...loading"}
                          </p>
                          <p className="w-full">
                            <span className="font-bold">Doctor: </span>
                            doctor here
                          </p>
                          <div>
                            <button className="bg-[#d6c44e] hover:bg-[#e2d687] text-gray-100 font-bold py-2 px-6 rounded-md mt-2 mb-2 mx-[1rem]">
                              Edit
                            </button>
                            <button className="bg-[#d25c5c] hover:bg-[#e49292] text-gray-100 font-bold py-2 px-6 rounded-md mt-2 mb-2 mx-[1rem]">
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
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

export default MyAppointments;
