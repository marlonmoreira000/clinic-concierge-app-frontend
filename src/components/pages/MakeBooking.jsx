import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import { Input, message } from "antd";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import moment from "moment";

const MakeBooking = () => {
  // state
  const [appointment, setAppointment] = useState("");
  const [notes, setNotes] = useState("");
  const [bookings, setBookings] = useState("");
  const [doctors, setDoctors] = useState("");
  const user = useUser();

  // variables
  const { TextArea } = Input;
  const params = useParams();
  const nav = useNavigate();
  const [token, setToken] = useToken();

  // effects
  useEffect(() => {
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/appointments/${params.id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": " application/json",
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setAppointment(data))
      .catch((err) => console.log(err));
  }, []);

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
    // get bookings info from API
    fetch("https://clinic-concierge.herokuapp.com/api/v1/bookings", {
      headers: {
        Accept: "application/json",
        "Content-Type": " application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        console.log("bookings", data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (bookings && appointment && appointment.booked) {
      setNotes(bookings.find((item) => item.appointment_id === appointment._id).reason_for_visit)
    }
  }, [bookings, appointment]);

  // functions
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleButtonClick = (e) => {
    // send POST request to make booking or PUT to update existing booking
    const booking = bookings.find((item) => item.appointment_id === appointment._id);
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/bookings/${appointment.booked ? booking._id : ""}`,
      {
        method: appointment.booked ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": " application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          appointment_id: params.id,
          reason_for_visit: notes || "no notes provided",
        }),
      }
    ).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.error) {
        message.error(data.message)
      } else {
        nav("/my-appointments");
        message.success(
          `Your appointment has been ${appointment.booked ? "changed" : "booked"
          }!`
        );
      }
    }).catch((err) => {
      console.log("error:", err);
      message.error("There was an error. Please try again.");
    });
  };

  return (
    <>
      <Header text="Make Booking" />
      <div className="bg-[#f0edeb] py-8">
        <div className="p-12 flex flex-col justify-center max-w-[700px] mx-auto border border-gray-300 rounded-lg bg-white">
          <div>
            <h3 className="text-2xl font-bold pb-2">Appointment Details</h3>
            <p className="py-2">
              <span className="font-bold">Doctor name:</span>{" "}
              {(appointment && doctors)
                ? doctors.find((doc) => doc._id === appointment.doctor_id).first_name + " " + doctors.find((doc) => doc._id === appointment.doctor_id).last_name
                : "...loading"}
            </p>
            <p className="py-2">
              <span className="font-bold">Date/Time: </span>
              {appointment
                ? moment(appointment.appointment_slot.start_time).format('DD.MM.YYYY h:mm A')
                : "...loading"}
            </p>
            <p className="py-2">
              <span className="font-bold">Duration: </span>
              {appointment
                ? moment.duration(moment(appointment.appointment_slot.end_time).format('h:mm')).asMinutes() - moment.duration(moment(appointment.appointment_slot.start_time).format('h:mm')).asMinutes() + " minutes"
                : "...loading"}
            </p>
            <p className="py-2">
              <span className="font-bold">Reference No:</span> {params.id}
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-2xl font-bold">Notes</h3>
            <TextArea
              showCount
              maxLength={200}
              value={notes}
              style={{
                height: 180,
              }}
              onChange={handleNotesChange}
            />
          </div>
          <div className="font-bold flex justify-center pt-6">
            <button
              onClick={handleButtonClick}
              className="bg-[#23375d] hover:bg-[#334b88] text-gray-100 py-3 px-6 rounded-md"
            >
              {appointment.booked ? "Confirm Changes" : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeBooking;
