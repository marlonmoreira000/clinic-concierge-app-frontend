import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../form_components/FormInput";
// import { useToken } from "../auth/useToken";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  // const [token, setToken] = useToken();
  const navigate = useNavigate();

  // Send request with supplied values to server for confirmation
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/v1/register", values);
        email: 
      // If registration successful, notify user and redirect to login, otherwise notify error
      if (!response.data.error) {
        toast.success(response.data.message);
        toast("Redirecting to Login");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Form details

  // Use state to update form input fields with user-supplied values - setting initial values to empty
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
      errorMessage:
        "Password should be 8-26 characters and include at least: 1 upper- and 1 lower-case letter, 1 number, and 1 special character",
      label: "Password",
      pattern: `^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,26}).*$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  // Update input fields with user-supplied values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="registrationForm">
      <form onSubmit={onFinish}>
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
        <button>Submit</button>
      </form>
      <Link to="/register">Log In</Link>
    </div>
  );
};

export default Register;
