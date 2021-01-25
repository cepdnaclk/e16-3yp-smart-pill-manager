import React from "react";

const Input = ({
  name,
  label,
  autoFocus,
  onChange,
  value,
  error,
  type,
  placeholder,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        className="form-control"
        autoFocus={autoFocus}
        onChange={onChange}
        placeholder={placeholder}
      />
      <p className="text text-danger">{error}</p>
    </div>
  );
};

export default Input;
