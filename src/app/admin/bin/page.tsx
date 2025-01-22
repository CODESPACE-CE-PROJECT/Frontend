"use client";

import React, { useState } from "react";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function bin() {
  return (
    <>
      <div className="flex flex-col items-center gap-[80px] self-stretch pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen bg-[#0B111B]">
        <span className="flex w-full p-[10px] text-3xl  text-neutral-50">ถังขยะ</span>

        <div className="flex flex-col items-center gap-[149px] w-full">
          {/* container Search and Button */}
          <div className="flex-col contents self-stretch gap-[36px] w-full lg:flex-row">

            {/* Search */}
            <div className="flex gap-9 self-stretch">
              <div className="flex items-center flex-grow gap-4 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto">
                <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
                <span className="text-lg	text-neutral-50">ค้นหา</span>
              </div>

              {/* Button */}
              <div className="flex justify-between items-center gap-3 py-2 px-4 rounded-md bg-[#2A3A50] w-40 ">
                <span className="text-xl text-neutral-50">ทั้งหมด</span>
                <KeyboardArrowDownRoundedIcon className="text-neutral-50 w-6 h-6" />
              </div>
            </div>
          </div>

        </div>

        {/* containter data del */}
        <div className="flex flex-col items-start gap-6 self-stretch">
          <div className="flex justify-between items-start gap-2.5 self-stretch p-2 px-6 rounded-xl bg-[#2A3A50]">
            <div className="flex h-12 gap-3 self-stretch justify-center items-center">
              <span className="text-xl	text-neutral-50">ชื่อ</span>
            </div>
            <div className="flex h-12 gap-3 self-stretch justify-center items-center">
              <span className="text-xl	text-neutral-50">ที่ตั้ง</span>
            </div>
            <div className="flex h-12 gap-3 self-stretch justify-center items-center">
              <span className="text-xl	text-neutral-50">ประเภท</span>
            </div>

          </div>

        </div>
      </div>

    </>
  );
}
