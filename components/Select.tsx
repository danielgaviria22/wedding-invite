import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  required?: boolean;
  hasError?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  className,
  hasError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };
  return (
    <div
      ref={selectRef}
      className={`relative mb-6 w-full max-w-3xl ${className}`}
    >
      <label
        className={`block text-sm mb-2 ${
          hasError ? "text-red-error" : "text-blue-light"
        }`}
        htmlFor={label}
      >
        {label}
      </label>
      <div
        className={`border-b cursor-pointer p-2 ${
          hasError
            ? "border-red-error text-red-error"
            : "border-blue-light text-blue-light"
        }`}
        onClick={toggleDropdown}
      >
        <span>{value || "No seleccionado"}</span>
        <span
          className={`absolute right-1 bottom-1 transform transition-all ${
            isOpen ? "-rotate-90" : ""
          }`}
        >
          <Image
            src="/icons/arrow-down.svg"
            alt="▼"
            width={13}
            height={7}
            className="py-2"
          />
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full max-h-96 overflow-y-auto bg-blue-darkest text-blue-light border-t border-r-2 border-b-2 border-l border-blue-light shadow-lg mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              className="py-2 px-4 hover:bg-blue-950 cursor-pointer border-b border-blue-light last:border-0"
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
