import React, { useState, useEffect } from "react";

interface ToggleButtonProps {
  initialState?: boolean;
  onToggle: (isLock: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ initialState = false, onToggle }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  useEffect(() => {
    setIsChecked(initialState);
  }, [initialState]);

  const handleToggle = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    onToggle(newIsChecked);
  };

  return (
    <div className=" items-center cursor-pointer ">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div
        className={`relative w-12 h-6 rounded-full 
          ${!isChecked ? "bg-[#00DACC]" : "bg-[#2A3A50]"}`}
      >
        <div
          className={`absolute top-0.5 left-[2px] bg-white border border-gray-300 rounded-full w-5 h-5 transition-transform duration-300 
          ${!isChecked ? "translate-x-6" : "translate-x-0"}`}
        />
      </div>
     
    </div>
  );
};

export default ToggleButton;
