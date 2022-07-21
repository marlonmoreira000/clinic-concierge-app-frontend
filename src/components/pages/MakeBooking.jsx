import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import { Input, message } from "antd";

const MakeBooking = () => {
  // state
  const [appointment, setAppointment] = useState("");
  const [notes, setNotes] = useState("");

  // variables
  const { TextArea } = Input;
  const params = useParams();
  const nav = useNavigate();

  // effects
  useEffect(() => {
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/appointments/${params.id}`
    )
      .then((res) => res.json())
      .then((data) => setAppointment(data))
      .catch((err) => console.log(err));
  }, []);

  // functions
  const handleNotesChange = (e) => {
    // console.log(e.target.value);
    setNotes(e.target.value);
  };

  const handleButtonClick = (e) => {
    // send POST request to make booking
    fetch(`https://clinic-concierge.herokuapp.com/api/v1/bookings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointment_id: appointment._id,
        patient_id: "62d037df1ceb4dda0110949c", // hard-coded value for MVP
        reason_for_visit: notes || 'no notes provided',
      }),
    })
      .then((res) => res.json())
        .then((data) => {
            console.log(data)
            nav("/")
            message.success("Your appointment has been booked!");
        })
        .catch((err) => {
            console.log("error", err)
            nav("/")
            message.error("There was a booking error. Please try again.");
        });
      
    // redirect to homepage with 
  };

  return (
    <>
      <Header text="Make Booking" />
      <div className="bg-[#f0edeb] py-8">
        <div className="p-12 flex flex-col justify-center max-w-[700px] mx-auto border border-gray-300 rounded-lg bg-white">
          <div>
            <h3 className="text-2xl font-bold pb-2">Appointment Details</h3>
            <p className="py-2">
              <span className="font-bold">Patient name:</span> LeChamp McDoggus
            </p>
            <p className="py-2">
              <span className="font-bold">Date/Time: </span>
              {appointment
                ? appointment.appointment_slot.start_time
                : "...loading"}
            </p>
            <p className="py-2">
              <span className="font-bold">Duration:</span> 1 hour
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
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeBooking;
