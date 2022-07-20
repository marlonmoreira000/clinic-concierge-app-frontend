import { DatePicker, Button, Dropdown, Menu } from "antd";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";

const Bookings = () => {
  // dynamic data ("state")
  const [doctors, setDoctors] = useState(false);
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState(""); // represents doctor selected on dropdown
  const [dropdownItems, setDropdownItems] = useState(false);
  const [appointments, setAppointments] = useState(false);

  useEffect(() => {
    // get doctors info from API
    fetch("https://clinic-concierge.herokuapp.com/api/v1/doctors/")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setDropdownItems(getDropdownItems(data));
        console.log("doctors", data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // get available appointments from API
    fetch("https://clinic-concierge.herokuapp.com/api/v1/appointments?booked=false")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        console.log("all appointments", data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fromDate = new Date(date);
    const toDate = new Date(date);
    toDate.setDate(toDate.getDate() + 1);
    const fromTime = fromDate.toJSON() || "";
    const toTime = toDate.toJSON() || "";
    console.log(fromTime, toTime);
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/appointments?fromTime=${fromTime}&toTime=${toTime}&doctorId=${doctor}&booked=false`
    )
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        console.log("filtered appointments", data);
      });
  }, [date, doctor]);

  // functions
  const getDropdownItems = (data) => {
    let arr = [{ label: "All doctors", key: "0" }]; // set initial value
    // let arr = []; // set initial value
    data.forEach((item, index) => {
      arr.push({
        label: <a id={item["_id"]}>{item["first_name"]}</a>,
        key: `${index + 1}`,
      });
    });
    return arr;
  };

  const handleCalendarClick = (date, dateString) => {
    setDate(dateString);
    console.log(date, dateString);
  };

  const handleDropdownClick = (e) => {
    const doctorId = e.domEvent.target.id;
    setDoctor(doctorId);
    console.log(doctorId);
  };

  const menu = <Menu onClick={handleDropdownClick} items={dropdownItems} />;

  // return statement
  return (
    <>
      <Header text="Bookings." />
      <div className="w-full p-8 bg-[#f0edeb]">
        <div className="text-center">
          {/* filter bar */}
          <div>
            <DatePicker onChange={handleCalendarClick} />
            <Dropdown overlay={menu} placement="bottom">
              <Button className="bg-white">Choose Doctor</Button>
            </Dropdown>
          </div>
          {/* time slots */}
          <div>
            <ul className="pt-6">
              {appointments
                ? appointments.map((item, index) => {
                    return (
                      <Link to={`/bookings/${item._id}`}>
                        <li
                          className="border py-4 my-4 max-w-[700px] mx-auto rounded-lg bg-white shadow-md hover:bg-gray-100 text-black hover:text-black"
                          key={index}
                        >
                          <div className="mx-auto">
                            <p className="w-full text-4xl font-bold">
                              {item.appointment_slot.start_time.slice(11, 16)}
                            </p>
                            <p className="w-full">
                              <span className="font-bold">Date: </span>
                              {item.appointment_slot.start_time.slice(0, 10)}
                            </p>
                            <p className="w-full">
                              <span className="font-bold">Doctor: </span>
                              { doctors ?
                                doctors.find(
                                  (doc) => doc._id === item.doctor_id
                                ).first_name : "...loading"
                              }
                            </p>
                          </div>
                        </li>
                      </Link>
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

export default Bookings;
