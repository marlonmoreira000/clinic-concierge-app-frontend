import { useState } from "react";
import FormInput from "../form_components/FormInput";

const Register = () => {
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

  // Prevent page refresh on form submission
  // UPDATE TO INCLUDE REDIRECT LOGIC ?
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Update input fields with user-supplied values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="registrationForm">
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default Register;
