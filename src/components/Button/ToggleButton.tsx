import React, { useState } from "react";

interface ToggleButtonProps {
  initialState: boolean;
  onToggle: (newState: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ initialState, onToggle }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle(newState);
  };

  return (
    <label className="inline-flex cursor-pointer w-[140px] items-center justify-center">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div
        className={`relative w-12 h-6 rounded-full transition-all ${
          isChecked ? "bg-[#00DACC]" : "bg-[#2A3A50]"
        }`}
      >
        <div
          className={`absolute top-0.5 start-[2px] bg-white border border-gray-300 rounded-full w-5 h-5 transition-all ${
            isChecked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
      <span className="ms-3 text-sm font-medium text-white">
        {isChecked ? "เปิด" : "ปิด"}
      </span>
    </label>
  );
};

export default ToggleButton;
