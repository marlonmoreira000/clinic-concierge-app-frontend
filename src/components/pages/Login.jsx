import { Input, Button, message, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import Header from "../Header";

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useToken();

  // Login
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://clinic-concierge.herokuapp.com/api/v1/login",
        values
      );
      if (!response.data.error) {
        message.success(response.data.message);
        setToken(response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate("/");
      }
    } catch (error) {
      if (error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log(`Failed: ${errorInfo}`);
    message.error("Something went wrong, ${errorInfo}");
  };

  return (
    <>
      <Header text="Sign in." />
      <div className="bg-[#f0edeb] py-8">
        <div className="p-12 flex flex-col justify-center max-w-[400px] mx-auto border border-gray-300 rounded-lg bg-white">
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input placeholder="Password" type="password" />
            </Form.Item>
            <div className="flex flex-wrap justify-center pt-4">
              <button
                htmlType="submit"
                className="w-full bg-[#23375d] hover:bg-[#334b88] text-gray-100 py-3 px-6 rounded-md mx-4"
              >
                Sign in
              </button>
              <Link className="anchor pt-4" to="/register">
                Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
