import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { Input } from "antd";
const { TextArea } = Input;


const MakeBooking = () => {
  const [appointment, setAppointment] = useState("");
  const [notes, setNotes] = useState("");

  const params = useParams();

  useEffect(() => {
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/appointments/${params.id}`
    )
      .then((res) => res.json())
      .then((data) => setAppointment(data))
      .catch((err) => console.log(err));
  }, []);
    
    
    const handleNotesChange = (e) => {
        // console.log(e.target.value);
        setNotes(e.target.value)
};

  return (
    <>
      <Header text="Make Booking" />
      <div>
        <div className="p-12 flex flex-col justify-center max-w-[700px] mx-auto border border-gray-300 rounded-lg my-8">
          <div>
            <h3 className="text-xl font-bold pb-2">Appointment Details</h3>
            <p className="py-2"><span className="font-bold">Patient name:</span> LeChamp McDoggus</p>
            <p className="py-2">
              <span className="font-bold">Date/Time: </span>
              {appointment
                ? appointment.appointment_slot.start_time
                : "...loading"}
            </p>
            <p className="py-2"><span className="font-bold">Duration:</span> 1 hour</p>
            <p className="py-2"><span className="font-bold">Reference No:</span> {params.id}</p>
          </div>
          <div className="pt-6">
            <h3 className="text-xl font-bold">Notes</h3>
            <TextArea
              showCount
              maxLength={200}
              style={{
                height: 180,
              }}
              onChange={handleNotesChange}
            />
          </div>
          <div className="font-bold flex justify-center">
            <button className="bg-[#23375d] hover:bg-[#334b88] text-gray-100 py-3 px-6 rounded-md">
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeBooking;
