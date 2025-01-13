"use client";

import React, { useState } from "react";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

export default function schooladd() {
  return (
    <>
      <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen bg-[#0B111B]">
        <div className="flex justify-between items-center self-stretch">
          <ArrowBackIosNewRoundedIcon className="text-[#FAFAFA]" />
          <span className="flex w-full p-[10px] text-3xl text-zinc-50">เพิ่มโรงเรียน</span>
        </div>


        {/* container Search and Button */}
        <div className="flex w-[1670px] py-[80px] flex-col items-center gap-[149px] lg:flex-row">
          <div className="flex w-[1670px] py-[80px] flex-col items-center gap-[149px]">
            <div className="flex w-[840px] flex-col items-center gap-[36px]">
              <div className="flex flex-col items-start gap-[10px] self-stretch">
                <div className="flex flex-col justify-end items-end gap-[51px] self-stretch">
                  <div className="flex flex-col items-start gap-[35px] self-stretch">
                    <div className="flex w-[840px] py-[24px] flex-col items-center gap-[15.576px] rounded-[12px] border-2 border-dashed border-[#2A3A50]">
                      <div className="flex w-[450px] h-[115px] flex-col items-center gap-[20px]">
                        <CloudUploadOutlinedIcon className="w-8 h-8 text-[#FAFAFA]" />
                        <span className=" text-zinc-50">เลือกรูปภาพโปรไฟล์ของโรงเรียน</span>
                        <span className=" text-[#CED4DA]">JPEG, PNG ขนาดไม่เกิน 50MB</span>
                      </div>
                      <button className="flex justify-center items-center gap-[15.576px] p-[12px_24px] rounded-[6px] border border-[#2A3A50] text-zinc-50" >เลือกไฟล์</button>
                    </div>
                    {/* แพ็กเกจการใช้งาน */}
                    <div className="">
                      <span className="text-zinc-50">แพ็กเกจการใช้งาน</span>
                      <span className="text-[#EF4343]">*</span>

                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{/* <div className="flex items-center px-4"> */ }
