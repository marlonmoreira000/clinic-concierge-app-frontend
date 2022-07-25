// Appointments for Doctor. Need to query DB for info for this particular doctor - decrypt token for user id?

// Appointments require:
// doctor_id
// appointment_slot

import React from "react";
import { Form, DatePicker, message } from "antd";
import Header from "../Header";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

const user = useUser

const Appointment = () => {
  const [token, setToken] = useToken();
  const user = useUser();
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

  const onFinish = async (fieldsValue) => {
    const rangeTimeValue = fieldsValue["range-time-picker"];
    // const values = {
    //   ...fieldsValue,
    //   "range-time-picker": [
    //     rangeTimeValue[0].format("YYYY-MM-DD HH:mm"),
    //     rangeTimeValue[1].format("YYYY-MM-DD HH:mm"),
    //   ],
    // };

    console.log("FieldsValue: %O" + fieldsValue);

    const fromDate = new Date(rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"));
    const toDate = new Date(rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"));

    const fromTime = fromDate;
    const toTime = toDate;
    console.log(fromTime, toTime);
    
    
    console.log(user.roles[0])

    // console.log(`Values: %O${values}`);

    const request = {
      start_time: fromTime,
      end_time: toTime,
    };
    try {
      const response = await axios.post(
        "https://clinic-concierge.herokuapp.com/api/v1/appointments",
        request,
        {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // values,
        }
      );
      // If registration successful, notify user and redirect to login, otherwise notify error
      if (!response.data.error) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      if (error.message) {
        message.error(error.message);
      } else {
        message.error("Something went wrong");
      }
    }
    // console.log("Received values of form: ", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(`Failed: ${errorInfo}`);
    message.error("Something went wrong, ${errorInfo}");
  };

  return (
    <>
      <Header text="Create New Availability" />
      <div className="bg-[#f0edeb] py-8">
        <div className="p-12 flex flex-col justify-center max-w-[400px] mx-auto border border-gray-300 rounded-lg bg-white">
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="range-time-picker"
              label="Set Appointment Time"
              {...rangeConfig}
            >
              <RangePicker showTime format="YYYY-MM-DD HH:mm" />
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

export default Appointment;
