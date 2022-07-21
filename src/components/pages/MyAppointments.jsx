import React from "react";
import Header from "../Header";
import { useEffect, useState } from "react";
import { message } from "antd";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState(false);
  const [myAppointments, setMyAppointments] = useState(false);
  const [doctors, setDoctors] = useState(false);
  const [deleteButtonClick, setDeleteButtonClick] = useState(false);

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
  }, [deleteButtonClick]);

  const handleDeleteButtonClick = (e) => {
    //   get booking id
    const bookingId = e.target.id;
    // delete booking using id
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/bookings/${bookingId}`,
      { method: "DELETE" }
    )
      .then(() => {
        message.success("Your appointment was deleted.");
        setDeleteButtonClick(deleteButtonClick ? false : true) // this triggers rerender of myAppointments
      })
      .catch((err) => {
        console.log(err);
        message.error("There was an error deleting message");
      });
  };

  const handleEditButtonClick = (e) => {
    console.log(e.target.id);
  };

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
                            {doctors && appointments
                              ? doctors.find(
                                  (doc) =>
                                    doc._id ===
                                    appointments.find(
                                      (appt) => appt._id === item.appointment_id
                                    ).doctor_id
                                ).first_name
                              : "...loading"}
                          </p>
                          <div>
                            <button
                              id={item._id}
                              onClick={handleEditButtonClick}
                              className="bg-[#d6c44e] hover:bg-[#e2d687] text-gray-100 font-bold py-2 px-6 rounded-md mt-2 mb-2 mx-[1rem]"
                            >
                              Edit
                            </button>
                            <button
                              id={item._id}
                              onClick={handleDeleteButtonClick}
                              className="bg-[#d25c5c] hover:bg-[#e49292] text-gray-100 font-bold py-2 px-6 rounded-md mt-2 mb-2 mx-[1rem]"
                            >
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
