import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useToken();

  // Login
  const onFinish = async (values) => {
    try {
      const response = await axios.post("https://clinic-concierge.herokuapp.com/api/v1/login", values);
      if (!response.data.error) {
        toast.success(response.data.message);
        setToken(response.data.accessToken);

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
    console.log(`Failed: ${errorInfo}`);
    toast.error("Something went wrong, ${errorInfo}");
  };

  return (
    <div className="authentication">
      <div><Toaster /></div>
      <div className="login">
        <h1 className="card-title">Sign In</h1>
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
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Sign In!
          </Button>

          <Link className="anchor" to="/register">
            Register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
