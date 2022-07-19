import Appointments from "../Appointments";
import { DatePicker, Button, Dropdown, Menu, Space } from "antd";
import React, { useState } from "react";
import Header from "../Header";

const Bookings = () => {
  // dynamic data ("state")
  const [doctor, setDoctor] = useState(false);

  // static data
  const doctors = {
    doctorA: {
      appointments: [1, 2, 3, 4, 5],
    },
    doctorB: {
      appointments: [1, 2, 4, 5],
    },
    doctorC: {
      appointments: [2, 3, 4],
    },
  }


  // functions
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleMenuClick = (e) => {
    // make an api call to get appts for doctor1

    fetch(url)
    .then()

    // const doctorSelection = e.domEvent.target.textContent;
    // console.log(doctorSelection);
    // setDoctor(doctorSelection);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "doctor1",
          key: "1",
        },
        {
          label: "doctor2",
          key: "2",
        },
        {
          label: "doctor3",
          key: "3",
        },
      ]}
    />
  );

  // return statement
  return (
    <>
      <Header text="Bookings." />
      <div className="w-full p-8">
        <div className="text-center">
          {/* filter bar */}
          <div>
            <DatePicker onChange={onChange} />
            <Dropdown overlay={menu} placement="bottom">
              <Button>Choose Doctor</Button>
            </Dropdown>
          </div>
          {/* time slots */}
          <div>
            <ul>
              <li>
                {doctor
                  ? doctors[doctor].appointments.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })
                  : "select a doctor"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
