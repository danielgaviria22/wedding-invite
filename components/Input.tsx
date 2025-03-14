import React from "react";

type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  hasError?: boolean;
};

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  hasError = false,
}) => {
  return (
    <div className="mb-6">
      <label
        className={`block text-sm mb-2 ${
          hasError ? "text-red-error" : "text-red-main"
        }`}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b p-2 border-red-main text-red-main focus:outline-none placeholder:text-red-main"
      />
    </div>
  );
};
