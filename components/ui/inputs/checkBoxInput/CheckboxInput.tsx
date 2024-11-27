import React from "react";
import cssmodule from "./CheckboxInput.module.css";

interface CheckboxInputProps {
  children: React.ReactNode;
  label: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ children, label }) => {
  return (
    <div className={`checkboxinput-container ${cssmodule.checkboxinput_container}`}>
      <input type="checkbox" id={label} className={`checkboxinput ${cssmodule.checkboxinput}`} />
      <label htmlFor={label} className="text-sm text-gray-700 cursor-pointer">
        {children}
      </label>
    </div>
  );
};

export default CheckboxInput;
