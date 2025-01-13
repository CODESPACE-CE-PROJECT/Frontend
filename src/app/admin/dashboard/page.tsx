"use client";

import React, { useState } from "react";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

export default function dashboard() {
  return (
    <>
      <div className="flex flex-col items-center gap-[80px] self-stretch pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen bg-[#0B111B]">
        <span className="flex w-full p-[10px] text-3xl  text-neutral-50">ภาพรวม</span>
        {/* container card */}
        <div className="flex flex-col items-center justify-center gap-4 self-stretch lg:flex-row">
          <div className="flex items-center justify-center gap-[16px] relative w-full h-32 ">
            {/* //card 1 */}
            <div className="flex items-center gap-9 p-6 rounded-xl bg-[#304972] bg-opacity-30  w-[550px] h-[128px]">
              <div className="flex items-center justify-center w-20 h-20 px-1 rounded-full bg-[#0B111B]">
                <SchoolOutlinedIcon className=" text-3xl text-neutral-50 w-10 h-10" />
              </div>
              <div className="flex flex-col gap-1">
                <span className=" text-sm text-neutral-50">คอร์สเรียน</span>
                <span className=" text-sm text-neutral-50">1 แห่ง</span>
              </div>
            </div>
          </div>
          {/* //card 2 */}
          <div className="flex items-center justify-center gap-[16px] relative w-full h-32 ">
            <div className="flex items-center gap-9 p-6 rounded-xl bg-[#304972] bg-opacity-30  w-[550px] h-[128px]">
              <div className="flex items-center justify-center w-20 h-20 px-1 rounded-full bg-[#0B111B]">
                <SchoolOutlinedIcon className=" text-3xl text-neutral-50 w-10 h-10" />
              </div>
              <div className="flex flex-col gap-1">
                <span className=" text-sm text-neutral-50">คอร์สเรียน</span>
                <span className=" text-sm text-neutral-50">1 แห่ง</span>
              </div>
            </div>
          </div>
          {/* //card 3 */}
          <div className="flex items-center justify-center gap-[16px] relative w-full h-32 ">
            <div className="flex items-center gap-9 p-6 rounded-xl bg-[#304972] bg-opacity-30  w-[550px] h-[128px]">
              <div className="flex items-center justify-center w-20 h-20 px-1 rounded-full bg-[#0B111B]">
                <SchoolOutlinedIcon className=" text-3xl text-neutral-50 w-10 h-10" />
              </div>
              <div className="flex flex-col gap-1">
                <span className=" text-sm text-neutral-50">คอร์สเรียน</span>
                <span className=" text-sm text-neutral-50">1 แห่ง</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  );
}
