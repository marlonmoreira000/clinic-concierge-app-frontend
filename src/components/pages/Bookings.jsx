import Appointments from "../Appointments";
import { DatePicker, Button, Dropdown, Menu, Col, Row } from "antd";
import React from "react";


const Bookings = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              1st menu item
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu item
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              3rd menu item
            </a>
          ),
        },
      ]}
    />
  );

    return (
      <div class="w-full p-8">
        <div class="text-center">
          {/* filter bar */}
          <div>
            <DatePicker onChange={onChange} />
            <Dropdown overlay={menu} placement="bottom">
              <Button class="">bottom</Button>
            </Dropdown>
          </div>
          {/* time slots */}
          <div>

          </div>
        </div>
      </div>
    );
}

export default Bookings