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

        <div className="w-full overflow-x-auto pb-4">
          <table className="table-auto w-full text-neutral-50">
            <thead>
              <tr className="bg-[#304972] bg-opacity-30 text-[18px]">
                <th className="px-6 py-3 rounded-l-md !font-normal truncate">ชื่อ</th>
                <th className="px-6 py-3 !font-normal">ที่ตั้ง</th>
                <th className="px-6 py-3 !font-normal">ประเภท</th>
                <th className="px-6 py-3 rounded-r-md !font-normal truncate"></th>
              </tr>
            </thead>
            <tbody>
              {/* Data */}
              <tr className="items-cente truncate">
                <td className="px-6 py-4 flex items-center gap-3 truncate">
                  <img
                    src="https://undubzapp.com/wp-content/uploads/2023/04/01-most-beautiful-korean-actress.jpg"
                    alt="icon"
                    className="w-14 h-12 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-base text-zinc-50 truncate">รัตนพร สมใจนึก</span>
                    <span className="text-base text-zinc-50 truncate">rattanaporn@kmitl.ac.th</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-base truncate">
                  Uplace เลขที่ 655/11 ฉลองกรุง 1 ซอย RNP แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ.
                </td>
                <td className="px-6 py-4 text-center text-base truncate">ผู้เรียน</td>
                <td className="px-6 py-4 text-center justify-center">
                  <div className="h-9 w-9 flex items-center justify-center rounded-md border border-[#2A3A50]">
                    <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                  </div>
                </td>
              </tr>

              {/* Data */}
              <tr className="items-cente truncate">
                <td className="px-6 py-4 flex items-center gap-3 truncate">
                  <img
                    src="https://undubzapp.com/wp-content/uploads/2023/04/01-most-beautiful-korean-actress.jpg"
                    alt="icon"
                    className="w-14 h-12 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-base text-zinc-50 truncate">รัตนพร สมใจนึก</span>
                    <span className="text-base text-zinc-50 truncate">rattanaporn@kmitl.ac.th</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-base truncate">
                  Uplace เลขที่ 655/11 ฉลองกรุง 1 ซอย RNP แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ.
                </td>
                <td className="px-6 py-4 text-center text-base truncate">ผู้เรียน</td>
                <td className="px-6 py-4 text-center justify-center">
                  <div className="h-9 w-9 flex items-center justify-center rounded-md border border-[#2A3A50]">
                    <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
