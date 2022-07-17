import { useState } from "react";
import FormInput from "../form_components/FormInput";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import toast from "react-hot-toast";

const Login = () => {
  const [token, setToken] = useToken ()
  
  // Login
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/login", values);
      if (!response.data.error) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        // navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //Form Data

  // Use state to update form input fields with user-supplied values - setting initial values to empty
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Array of input/form fields to render
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Must be a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  // Update input fields with user-supplied values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginForm">
      <form onFinish={onFinish}>
        <h1>Register</h1>

        {/* Render form/input field for each input supplied above */}
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Log In</button>
      </form>
      <Link to="/register">Register</Link>
      <Link to="/forgot-password">Forgotten Password?</Link>
    </div>
  );
};

export default Login;
