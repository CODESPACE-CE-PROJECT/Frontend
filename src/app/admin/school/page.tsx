"use client";

import React, { useState } from "react";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

export default function school() {
  return (
    <>
      <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen bg-[#0B111B]">
        <span className="flex w-full p-[10px] text-3xl  text-neutral-50">โรงเรียน</span>

        {/* container Search and Button */}
        <div className="flex-col contents self-stretch gap-[36px] w-full lg:flex-row">

          {/* Search */}
          <div className="flex gap-9 self-stretch">
            <div className="flex items-center flex-grow gap-4 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto">
              <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
              <span className="text-[18px]	text-neutral-50">ค้นหา</span>
            </div>

            {/* Button */}
            <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-md bg-[#5572FA] w-auto ">
              <AddRoundedIcon className="text-neutral-50 w-6 h-6" />
              <span className="text-[16px] text-neutral-50">เพิ่มโรงเรียน</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 self-stretch">
            <div className="flex items-center gap-2.5 p-2 px-6 rounded-md self-stretch bg-[#304972] bg-opacity-30">
              <span className="flex w-[540px] h-[45px] items-center gap-5 text-[18px]	text-neutral-50">ชื่อ</span>
              <span className="flex w-[658px] h-[45px] items-center gap-5 text-[18px]	text-neutral-50">ที่ตั้ง</span>
              <span className="flex w-[170px] h-[45px] justify-center items-center gap-5 text-[18px]	text-neutral-50">ผู้สอน</span>
              <span className="flex w-[170px] h-[45px] justify-center items-center gap-5 text-[18px]	text-neutral-50">ผู้เรียน</span>
              <span className="flex w-[36px] h-[45px] items-center gap-5text-[18px]	text-neutral-50"></span>
            </div>

            {/* card data school */}
            <div className="flex flex-col items-start gap-6 self-stretch">
              <div className="flex items-center gap-2.5 p-2 px-6 rounded-md self-stretch">
                <span className="flex w-[540px] h-[60px] items-center gap-5 text-[18px]	text-neutral-50">
                  <img src="https://www.eng.kmitl.ac.th/wp-content/uploads/2024/06/About-4-B.png" alt="icon" className="w-[60px] h-[60px]" />
                  สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</span>
                <span className="flex w-[658px] h-[60px] items-center gap-5 text-[14px]	text-neutral-50">1 ซอยฉลองกรุง 1 เขตลาดกระบัง อำเภอลาดกระบัง จังหวัดกรุงเทพมหานคร 10520</span>
                <span className="flex w-[170px] h-[60px] justify-center items-center gap-5 text-[20px]	text-neutral-50">1</span>
                <span className="flex w-[170px] h-[60px] justify-center items-center gap-5 text-[20px]	text-neutral-50">2</span>
                <MoreHorizOutlinedIcon className="flex w-[36px] h-[36px] items-center rounded-md border-gray-100 text-[#FAFAFA]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

{/* <div className="flex items-center px-4"> */ }
