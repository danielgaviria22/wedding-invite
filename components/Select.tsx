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
          hasError ? "text-red-error" : "text-red-main"
        }`}
        htmlFor={label}
      >
        {label}
      </label>
      <div
        className="text-red-main border-b border-red-main cursor-pointer p-2"
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
        <div className="absolute z-10 w-full max-h-96 overflow-y-auto bg-beige text-red-main border-t border-r-2 border-b-2 border-l border-red-main shadow-lg mt-1">
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
