"use client";
import { useState } from 'react';

const Home = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  
  // สถานะการเตือน
  const [showWarning1, setShowWarning1] = useState(true);
  const [showWarning2, setShowWarning2] = useState(true);
  const [showWarning3, setShowWarning3] = useState(true);

  // ฟังก์ชันตรวจสอบเมื่อออกจาก input
  const handleBlur = (setter: string, warningSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!setter) {
      warningSetter(true);
    } else {
      warningSetter(false);
    }
  };

  return (
    <div>
      <div className="text-white font-sans flex justify-between">
        <div className="flex items-center gap-2">
          ตั้งเวลาประกาศ
          <input
            type="datetime-local"
            className="bg-[#2A3A50] ml-4 py-2 px-3 text-white rounded-md cursor-pointer"
          />
        </div>

        <div className="space-x-3">
          <button className="border border-[#2A3A50] w-[120px] h-[43px] rounded-[6px] text-center hover:bg-[#424951] ">
            ยกเลิก
          </button>
          <button className="bg-primary w-[120px] h-[43px] rounded-[6px] text-center hover:bg-[#7991f9] ">
            บันทึก
          </button>
        </div>
      </div>

      <div className="text-white font-sans flex justify-between mt-10">
        {/* ตั้งเวลาประกาศ */}
        <div className="flex flex-col">
          <span>ตั้งเวลาประกาศ {showWarning1 && <span className="text-red-500">*</span>}</span>
          <input
            className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md cursor-pointer"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            onBlur={() => handleBlur(value, setShowWarning1)} // Fixed: Passing setter and state updater
          />
        </div>

        {/* วันเวลาเริ่มต้น และ วันเวลาสิ้นสุด */}
        <div className="flex flex-row gap-3">
          <div className="flex flex-col">
            <span>วันเวลาเริ่มต้น {showWarning2 && <span className="text-red-500">*</span>}</span>
            <input
              type="datetime-local"
              className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md outline-none"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              required
              onBlur={() => handleBlur(value2, setShowWarning2)} // Fixed: Passing setter and state updater
            />
          </div>
          <div className="flex flex-col">
            <span>วันเวลาสิ้นสุด {showWarning3 && <span className="text-red-500">*</span>}</span>
            <input
              type="datetime-local"
              className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md cursor-pointer outline-none"
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
              required
              onBlur={() => handleBlur(value3, setShowWarning3)} // Fixed: Passing setter and state updater
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
