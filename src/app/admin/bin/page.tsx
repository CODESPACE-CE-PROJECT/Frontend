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

        <div className="flex flex-col items-start gap-6 self-stretch">
          <div className="flex flex-col w-full items-start gap-3 px-6 py-2 align-self-stretch rounded-xl bg-[#2A3A50]">

            <div className="flex h-[45px] items-start gap-[12px] self-stretch">
              <div className="flex w-[560px] h-12 gap-3 self-stretch items-center">
                <span className="text-xl text-neutral-50">ชื่อ</span>
              </div>
              <div className="flex w-[800px] h-12 gap-3 self-stretch items-center">
                <span className="text-xl text-neutral-50">ที่ตั้ง</span>
              </div>
              <div className="flex w-[240px] h-12 gap-3 self-stretch justify-center items-center">
                <span className="text-xl text-neutral-50">ประเภท</span>
              </div>
              <div className="flex w-[36px] h-12 gap-3 self-stretch ml-auto justify-center items-center">
                <span className="text-xl text-neutral-50"></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start gap-4 w-full self-stretch">
            <div className="flex px-6 py-2 items-center gap-4 self-stretch">
              <div className="flex w-[560px] items-center gap-6">
                <img src="https://undubzapp.com/wp-content/uploads/2023/04/01-most-beautiful-korean-actress.jpg" alt="icon" className="w-16 h-16 rounded-full" />
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-50 text-xl">รัตนพร สมใจนึก</span>
                  <span className="text-zinc-50 text-base">rattanaporn@kmitl.ac.th</span>
                </div>
              </div>
              <div className="flex w-[800px] h-12 gap-3 items-center">
                <span className="text-xl items-center text-neutral-50">Uplace เลขที่ 655/11 ฉลองกรุง 1 ซอย RNP แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ.</span>
              </div>

              <div className="flex w-[240px] h-12 gap-3 justify-center items-center">
                <span className="text-xl items-center text-neutral-50">ผู้เรียน</span>
              </div>

              <div className="flex w-8 h-8 gap-3 ml-auto justify-center items-center rounded-md border border-[#2A3A50]">
                <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
              </div>

            </div>
          </div>
        </div>



      </div>

    </>
  );
}
