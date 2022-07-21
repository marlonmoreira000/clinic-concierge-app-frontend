import "./formInput.css";
import { useState } from "react";

const FormInput = (props) => {
  // Responding to focus necessary for proper display of error message
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  // Responds to input field focus so error message only displays if focus moves off field and input is invalid
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="FormInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        // Password confirmation will be last field selected, so requires special behaviour to usefully warn user of invalid input before form submission
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
