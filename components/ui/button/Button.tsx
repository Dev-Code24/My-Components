import React, { useState } from "react";

interface ButtonProps {
  variant: "outlined" | "ghost" | "contained";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, children }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const localStyle = () => {
    switch (variant) {
      case "outlined":
        return {
          color: "#1e40af",
          border: "2px solid #1e40af",
          backgroundColor: hovered ? "#e0e7ff" : "transparent",
          boxShadow: focused ? "0 0 4px #1e40af" : "none",
        };
      case "ghost":
        return {
          color: "#1e40af",
          backgroundColor: hovered ? "#d1d5db" : "#fff",
          boxShadow: focused ? "0 0 3px #000" : "none",
        };
      case "contained":
        return {
          color: "#ffffff",
          backgroundColor: hovered ? "#1e3a8a" : "#1e40af",
          boxShadow: focused ? "0 0 4px #ffffff" : "none",
        };
    }
  };

  return (
    <button
      style={{ ...localStyle(), width: "100%", padding: "0.75rem", borderRadius: "12px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </button>
  );
};

export default Button;
