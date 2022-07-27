import React from "react";
import Header from "../Header";
import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState(false);
  const [myAppointments, setMyAppointments] = useState(false);
  const [doctors, setDoctors] = useState(false);
  const [deleteButtonClick, setDeleteButtonClick] = useState(false);
  const [token, setToken] = useToken();
  const nav = useNavigate();
  const user = useUser();

  useEffect(() => {
    // get doctors info from API
    fetch("https://clinic-concierge.herokuapp.com/api/v1/doctors/", {
      headers: {
        Accept: "application/json",
        "Content-Type": " application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        console.log("doctors", data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // get appointments info from API
    fetch("https://clinic-concierge.herokuapp.com/api/v1/appointments/", {
      headers: {
        Accept: "application/json",
        "Content-Type": " application/json",
        authorization: `Bearer ${token}`,
      },
    })
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
      `https://clinic-concierge.herokuapp.com/api/v1/bookings?userId=${user._id}`,
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
          message.error("Could not find your appointments")
          nav("/")
        }
        return res.json()
      }
      )
      .then((data) => {
          setMyAppointments(data);
          console.log("my bookings", data);
      })
      .catch((err) => console.log(err));
  }, [deleteButtonClick]);

  const handleDeleteButtonClick = (e) => {
    const bookingId = e.target.id;
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/bookings/${bookingId}`,
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
        message.success("Your appointment was deleted.");
        setDeleteButtonClick(deleteButtonClick ? false : true); // this triggers rerender of myAppointments
      })
      .catch((err) => {
        console.log(err);
        message.error("There was an error deleting message");
      });
  };

  const handleEditButtonClick = (e) => {
    const appointmentId = e.target.attributes.appt.value;
    nav(`/bookings/${appointmentId}`);
    console.log(appointmentId);
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
                                :
                                  "...loading"}
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
                                appt={item.appointment_id}
                                id={item._id}
                                onClick={handleEditButtonClick}
                                className="bg-[#d6c44e] hover:bg-[#e2d687] text-gray-100 font-bold py-2 px-6 rounded-md mt-2 mb-2 mx-[1rem]"
                              >
                                Edit
                              </button>
                              <button
                                appt={item.appointment_id}
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
                    }) :
                  "Loading..."}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAppointments;
