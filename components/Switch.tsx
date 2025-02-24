import React from "react";

type SwitchProps = {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
  children: React.ReactNode;
};

export const Switch: React.FC<SwitchProps> = ({
  isChecked,
  onToggle,
  children,
}) => {
  const handleToggle = () => onToggle(!isChecked);

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={handleToggle}
      role="button"
      aria-pressed={isChecked}
    >
      <div
        className={`w-10 h-6 flex items-center rounded-full p-1 transition-all border border-red-main ${
          isChecked ? "bg-red-main" : "bg-beige"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full shadow-md transform transition-all ${
            isChecked ? "translate-x-4 bg-beige" : "translate-x-0 bg-red-main"
          }`}
        />
      </div>
      <span className="ml-3 text-red-main">{children}</span>
    </div>
  );
};
