"use client";
import React, { useState } from "react";

interface TextInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  type?: "text" | "password";
}

const TextInput: React.FC<TextInputProps> = ({ label, value = "", onChange, placeholder = "", style, type = "text" }) => {
  const [focused, setFocused] = useState(false);
  const fieldId = label.toLowerCase().split(" ").join("-");
  return (
    <div
      className="relative"
      style={{
        ...style,
      }}
    >
      <label
        htmlFor={fieldId}
        className={`absolute left-3 ${
          focused || value ? "-top-2 text-sm text-blue-800" : "top-3 text-gray-500 text-base"
        } transition-all duration-250 bg-white px-1 cursor-text`}
      >
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        value={value}
        placeholder={focused ? placeholder : ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full p-3 text-base border rounded-xl outline-none border-gray-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-300 transition-all"
      />
    </div>
  );
};

export default TextInput;
