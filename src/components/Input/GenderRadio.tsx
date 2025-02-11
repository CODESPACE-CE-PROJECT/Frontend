import React from "react";
import { Gender } from "@/enum/enum"; // ใช้ enum จากไฟล์ภายนอก

type GenderRadioProps = {
  value: Gender;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disable: boolean;
};

const GenderRadio: React.FC<GenderRadioProps> = ({ value, checked, onChange, disable }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name="gender"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden peer"
        disabled={!disable}
      />
      <div
        className={`w-6 h-6 flex items-center justify-center border-2 rounded-full ${
          checked ? "bg-[#15A7D5] border-transparent" : "border-[#15A7D5]"
        }`}
      >
        {checked && <div className="w-3 h-3 bg-[#2A3A50] rounded-full"></div>}
      </div>
      <span className="text-white">
        {value === Gender.MALE ? "ชาย" : value === Gender.FEMALE ? "หญิง" : "อื่นๆ"}
      </span>
    </label>
  );
};

export default GenderRadio;
