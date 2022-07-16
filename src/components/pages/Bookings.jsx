import Appointments from "../Appointments";
import { DatePicker, Button, Dropdown, Menu, Space } from "antd";
import React, { useState } from "react";

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
    const doctorSelection = e.domEvent.target.textContent;
    console.log(doctorSelection);
    setDoctor(doctorSelection);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "doctorA",
          key: "1",
        },
        {
          label: "doctorB",
          key: "2",
        },
        {
          label: "doctorC",
          key: "3",
        },
      ]}
    />
  );

  // return statement
  return (
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
  );
};

export default Bookings;
