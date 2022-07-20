import { Form, Input, Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  // const [token, setToken] = useToken();
  const navigate = useNavigate();

  // Send request with supplied values to server for confirmation
  const onFinish = async (values) => {
    try {
      const response = await axios.post("https://clinic-concierge.herokuapp.com/api/v1/register", values);
      // If registration successful, notify user and redirect to login, otherwise notify error
      if (!response.data.error) {
        toast.success(response.data.message);
        toast("Redirecting to Login");
        navigate("/login");
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
    console.log(`Failed: ${errorInfo}`);
    toast.error("Something went wrong, ${errorInfo}");
  };

  return (
    <div className="authentication">
      <div><Toaster /></div>
      <div className="registration">
        <h1 className="card-title">Please Register</h1>
        <Form layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Must be valid email",
              },
              {
                required: true,
                message: "Email is required",
              }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                pattern: `^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,26}).*$`,
                message:
                  "${label} should be 8-26 characters and include at least: 1 upper- and 1 lower-case letter, 1 number, and 1 special character",
              },
              {
                required: true,
                message: "Password is required",
              }
            ]}
          >
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">Register!</Button>

          <Link className="anchor" to="/login">
            Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
