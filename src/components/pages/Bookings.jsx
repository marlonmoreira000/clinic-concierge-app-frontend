import { DatePicker, Button, Dropdown, Menu } from "antd";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import TimeslotCard from "../TimeslotCard";
import { useToken } from "../auth/useToken";

const Bookings = () => {
  const [doctors, setDoctors] = useState(false);
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState(""); // represents doctor selected on dropdown
  const [dropdownItems, setDropdownItems] = useState(false);
  const [appointments, setAppointments] = useState(false);
  const [token, setToken] = useToken();

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
        setDropdownItems(getDropdownItems(data));
        console.log("doctors", data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // get available appointments from API
    fetch(
      "https://clinic-concierge.herokuapp.com/api/v1/appointments?booked=false",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": " application/json",
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        console.log("all appointments", data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // filter the appointments based on date/doctor selection
    const fromDate = new Date(date);
    const toDate = new Date(date);
    toDate.setDate(toDate.getDate() + 1);
    const fromTime = fromDate.toJSON() || "";
    const toTime = toDate.toJSON() || "";
    console.log(fromTime, toTime);
    fetch(
      `https://clinic-concierge.herokuapp.com/api/v1/appointments?fromTime=${fromTime}&toTime=${toTime}&doctorId=${doctor}&booked=false`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": " application/json",
          authorization: `Bearer ${token}`,
        },
      }
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
        label: <a id={item["_id"]}>{item["last_name"]}</a>,
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
                      <TimeslotCard
                        item={item}
                        index={index}
                        doctors={doctors}
                      />
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
