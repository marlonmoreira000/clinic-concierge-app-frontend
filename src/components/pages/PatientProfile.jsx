import { Form, Input, Button, Radio, InputNumber, Select } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";

const PatientProfile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useToken();

  // Send request with supplied values to server for confirmation
  const onFinish = async (values) => {
    const request = {
      first_name: values.first_name,
      last_name: values.last_name,
      contact_number: values.contact_number,
      address: {
        street_number: values.street_number,
        street_name: values.street_name,
        suburb: values.suburb,
        state: values.state,
        postcode: values.postcode,
      },
    };
    if (values.gender) {
      request.gender = values.gender;
    }
    if (values.age) {
      request.age = values.age;
    }
    try {
      const response = await axios.post(
        "https://clinic-concierge.herokuapp.com/api/v1/patients",
        request,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": " application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      // If profile creation successful, notify user and redirect to homepage, otherwise notify error
      if (!response.data.error) {
        toast.success(response.data.message);
        toast("Profile  created successfully.");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: %O", errorInfo);
    toast.error("Something went wrong, %O", errorInfo);
  };

  return (
    <>
      <Toaster />
      <Header text="My Profile" />
      <div className="bg-[#f0edeb] py-8">
        <div className="p-12 flex flex-col justify-center max-w-[400px] mx-auto border border-gray-300 rounded-lg bg-white">
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                {
                  type: "string",
                  message: "Must be valid name",
                },
                {
                  required: true,
                  message: "First name is required",
                },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  type: "string",
                  message: "Must be valid name",
                },
                {
                  required: true,
                  message: "Last name is required",
                },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              label="Contact Number"
              name="contact_number"
              rules={[
                {
                  required: true,
                  message: "Contact number is required",
                },
              ]}
            >
              <Input
                placeholder="Contact Number"
                maxLength={10}
                minLength={9}
              />
            </Form.Item>
            <Input.Group compact>
              <Form.Item
                name="street_number"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Street number is required",
                  },
                ]}
              >
                <Input placeholder="street number" />
              </Form.Item>
              <Form.Item
                name="street_name"
                rules={[
                  {
                    required: true,
                    message: "Street name is required",
                  },
                ]}
              >
                <Input placeholder="street name" />
              </Form.Item>
            </Input.Group>
            <Form.Item
              name="suburb"
              rules={[
                {
                  required: true,
                  message: "Suburb/city is required",
                },
              ]}
            >
              <Input placeholder="suburb/city" />
            </Form.Item>
            <Form.Item
              name="state"
              rules={[
                {
                  required: true,
                  message: "State is required",
                },
              ]}
            >
              <Select placeholder="State">
                <Select.Option value="Victoria">VIC</Select.Option>
                <Select.Option value="Queensland">QLD</Select.Option>
                <Select.Option value="South Australia">SA</Select.Option>
                <Select.Option value="Western Australia">WA</Select.Option>
                <Select.Option value="Australian Capital Territory">
                  ACT
                </Select.Option>
                <Select.Option value="New South Wales">NSW</Select.Option>
                <Select.Option value="Tasmania">TAS</Select.Option>
                <Select.Option value="Northern Territory">NT</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="postcode"
              rules={[
                {
                  required: true,
                  message: "Postcode is required",
                },
              ]}
            >
              <Input placeholder="Postcode" maxLength={4} minLength={4} />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Radio.Group>
                <Radio.Button value="male">Male</Radio.Button>
                <Radio.Button value="female">Female</Radio.Button>
                <Radio.Button value="other">Other</Radio.Button>
                <Radio.Button value="prefer not to say">
                  Prefer not to say
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                {
                  type: "number",
                  max: 120,
                  min: 0,
                  message: "Must be between valid age range",
                },
              ]}
            >
              <InputNumber placeholder="Age" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Create Profile!
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
