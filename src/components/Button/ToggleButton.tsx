import React from "react";

interface ToggleButtonProps {
  isChecked?: boolean;
  onToggle: () => void;
  className?: string
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isChecked, onToggle, className }) => {
  return (
    <div className="cursor-pointer w-14" onClick={() => onToggle()}>
      <div
        className={`relative h-6 rounded-full ${className}
          ${isChecked ? "bg-green-l" : "bg-gray-600"}`}
      >
        <div
          className={`absolute top-0.5 left-[2px] bg-white border border-gray-300 rounded-full size-5 transition-transform duration-300 
          ${isChecked ? "translate-x-8" : "translate-x-0"}`}
        />
      </div>
    </div>
  );
};

export default ToggleButton;
