import React from "react";
import { Form, DatePicker, message } from "antd";
import Header from "../Header";
import axios from "axios";
import { useToken } from "../auth/useToken";

const Appointment = () => {
  const [token, setToken] = useToken();
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
    // Format values from time-picker form
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const fromTime = new Date(rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"));
    const toTime = new Date(rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"));

    // Include times in request
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
        }
      );
      // Notify on success/failure
      if (!response.data.error) {
        message.success('Time slot added!');
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
  };

  //Notify user if form submission fails
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
