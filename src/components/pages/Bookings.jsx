import { DatePicker, Button, Dropdown, Menu } from "antd";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";

const Bookings = () => {
  // dynamic data ("state")
  const [doctors, setDoctors] = useState(false);
  const [date, setDate] = useState(false)
  const [doctor, setDoctor] = useState('');
  const [dropdownItems, setDropdownItems] = useState(false); // represents the doctor selected on dropdown
  const [appointments, setAppointments] = useState(false)

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
    // get appointments info from API
    // if (date && doctor) {
      
    // } else if (date) {

    // } else if (doctor) {

    // } else {

    // }
    const fromDate = new Date(date);
    const toDate = new Date(date);
    toDate.setDate(toDate.getDate() + 1);
    const fromTime = fromDate.toJSON();
    const toTime = toDate.toJSON();
    // console.log(fromTime, toTime);
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/appointments?fromTime=${fromTime}&toTime=${toTime}&doctorId=${doctor}`
    ).then((res) => res.json())
      .then((data) => {
        setAppointments(data)
        console.log("appointments 2", data)
      });
  }, [date, doctor]);


  // functions
  const getDropdownItems = (data) => {
    let arr = [];
    data.forEach((item, index) => {
      arr.push({
        label: <a id={item["_id"]}>{item["first_name"]}</a>,
        key: `${index + 1}`,
      });
    });
    return arr;
  };

  const handleCalendarClick = (date, dateString) => {
    setDate(dateString)
    console.log(date, dateString);
  };

  const handleDropdownClick = (e) => {
    const doctorId = e.domEvent.target.id;
    setDoctor(doctorId);
    console.log(doctorId);

    // get appointments for that doctor from the api (using doctor id)
    // fetch(
    //   `https://clinic-concierge.herokuapp.com/api/v1/appointments?doctorId=${doctorId}`
    // )
    //   .then((res) => res.json())
  };

  const menu = <Menu onClick={handleDropdownClick} items={dropdownItems} />;

  // return statement
  return (
    <>
      <Header text="Bookings." />
      <div className="w-full p-8">
        <div className="text-center">
          {/* filter bar */}
          <div>
            <DatePicker onChange={handleCalendarClick} />
            <Dropdown overlay={menu} placement="bottom">
              <Button>Choose Doctor</Button>
            </Dropdown>
          </div>
          {/* time slots */}
          <div>
            <ul>
              {appointments
                ? appointments.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link to="#">{item.doctor_id}</Link>
                      </li>
                    );
                  })
                : "Select a date and/or doctor"}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
