import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useToken();

  // Login
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/v1/login", values);
      if (!response.data.error) {
        toast.success(response.data.message);
        console.log(response.data)
        // navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="login">
        <h1 className="card-title">Sign In</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
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
              ,
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
