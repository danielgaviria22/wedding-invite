import React, { useState } from "react";

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  required?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  className,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };
  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-sm mb-2 text-red-main" htmlFor={label}>
        {label}
      </label>
      <div
        className="relative text-red-main border-b border-red-main cursor-pointer p-2"
        onClick={toggleDropdown}
      >
        <span>{value || "No seleccionado"}</span>
        <span
          className={`absolute right-1 bottom-1 transform transition-all ${
            isOpen ? "-rotate-90" : ""
          }`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-beige text-red-main border-t border-r-2 border-b-2 border-l border-red-main shadow-lg mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer border-b border-red-main last:border-0"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
