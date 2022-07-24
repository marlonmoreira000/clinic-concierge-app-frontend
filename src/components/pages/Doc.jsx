// Appointments for Doctor. Need to query DB for info for this particular doctor - decrypt token for user id?

// Appointments require:
// doctor_id
// appointment_slot

import React from "react";
import { Form, DatePicker, Button } from "antd";
import Header from "../Header";

const Doc = () => {
  const { RangePicker } = DatePicker;
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const onFinish = (fieldsValue) => {
      // Should format date value before submit.

      const rangeTimeValue = fieldsValue["range-time-picker"];
      const values = {
        ...fieldsValue,
        "range-time-picker": [
          rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
          rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
        ],
      };
      console.log("Received values of form: ", values);
    };

  return (
    <>
      <Header text="Create New Available Appointment" />
      <div className="bg-[#f0edeb] py-8">
        <div className="p-12 flex flex-col justify-center max-w-[400px] mx-auto border border-gray-300 rounded-lg bg-white">
          <Form
            layout="vertical"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="range-time-picker"
              label="RangePicker[showTime]"
              {...rangeConfig}
            >
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <div className="flex flex-wrap justify-center pt-4">
              <button
                htmlType="submit"
                className="w-full bg-[#23375d] hover:bg-[#334b88] text-gray-100 py-3 px-6 rounded-md mx-4"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Doc;
