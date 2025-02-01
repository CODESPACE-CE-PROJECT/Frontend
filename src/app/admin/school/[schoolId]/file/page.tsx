"use client";

import React, { useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

export default function schooladdedfiles() {
    return (
        <>
            <div className="flex flex-col items-center self-stretch gap-10 pt-10 px-6 pb-10 w-full min-h-screen">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 w-full">
                    <div className="flex items-center w-full">
                        <ArrowBackIosNewRoundedIcon className="text-[#FAFAFA]" />
                        <span className="flex w-full p-2 text-2xl md:text-3xl text-zinc-50">เพิ่มสมาชิกในโรงเรียน</span>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full md:flex-row md:justify-end">
                        <button className="flex w-full md:w-auto items-center justify-center gap-2 py-3 px-9 rounded-md bg-[#FAFAFA] text-lg text-[#5572FA]">ยกเลิก</button>
                        <button className="flex w-full md:w-auto items-center justify-center gap-2 py-3 px-9 rounded-md bg-[#5572FA] text-lg text-zinc-50">เพิ่ม</button>
                    </div>
                </div>

                {/* Search & Buttons */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-9 self-stretch">
                    <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50]">
                        <SearchTwoToneIcon className="text-neutral-50 w-4 h-4" />
                        <span className="text-[18px] text-neutral-50">ค้นหา</span>
                    </div>
                    <button className="flex w-full md:w-auto items-center justify-center gap-2 py-3 px-4 rounded-md border-2 border-[#EFA443] text-lg text-[#EFA443]">ลบข้อมูลซ้ำจากไฟล์</button>
                    <button className="flex w-full md:w-auto items-center justify-center gap-4 py-3 px-4 rounded-md border-2 border-[#EF4343] text-lg text-[#EF4343] bg-[#EF4343] bg-opacity-10">ลบข้อมูลซ้ำในระบบ</button>
                </div>

                {/* Table Header */}
                <div className="overflow-auto flex flex-col w-full justify-center items-start gap-4">
                    <div className="flex flex-col items-start gap-4 self-stretch">
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-2.5 p-3 px-4 md:px-6 rounded-md self-stretch bg-[#304972] bg-opacity-30 text-neutral-50 text-[16px] md:text-[18px]">
                            <span className="w-28 md:w-36 text-center">รหัสประจำตัว</span>
                            <span className="w-40 md:w-80 text-center">ชื่อ</span>
                            <span className="w-40 md:w-80 text-center">นามสกุล</span>
                            <span className="w-20 md:w-28 text-center">เพศ</span>
                            <span className="w-40 md:w-80 text-center">ผู้ใช้งาน</span>
                            <span className="w-40 md:w-80 text-center">อีเมล</span>
                            <span className="w-28 md:w-36 text-center">ประเภท</span>
                            <span className="w-40 md:w-56 text-center"></span>
                        </div>
                    </div>
                    
                    {/* Data Row */}
                    <div className="flex flex-col items-start gap-4 self-stretch">
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-2.5 p-3 px-4 md:px-6 self-stretch text-neutral-50">
                            <span className="w-28 md:w-36 text-center">64010726</span>
                            <span className="w-40 md:w-80 text-center">รัตนพร</span>
                            <span className="w-40 md:w-80 text-center">สมใจนึก</span>
                            <span className="w-20 md:w-28 text-center">หญิง</span>
                            <span className="w-40 md:w-80 text-center">rattanaporn.ratta</span>
                            <span className="w-40 md:w-80 text-center">64010726@kmitl.ac.th</span>
                            <span className="w-28 md:w-36 text-center">ผู้เรียน</span>
                            <div className="flex w-40 md:w-56 items-center gap-2">
                                <CheckCircleOutlineRoundedIcon className="text-[#00DACC] w-4 h-4" />
                                <span className="text-[16px] md:text-[18px] text-[#00DACC]">สามารถเพิ่มได้</span>
                            </div>
                        </div>
                    </div>

                    {/* Duplicate from File */}
                    <div className="flex flex-col items-start gap-4 self-stretch">
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-2.5 p-3 px-4 md:px-6 rounded-md self-stretch bg-[#EF4343] bg-opacity-10 text-neutral-50">
                            <span className="w-28 md:w-36 text-center">64010726</span>
                            <span className="w-40 md:w-80 text-center">รัตนพร</span>
                            <span className="w-40 md:w-80 text-center">สมใจนึก</span>
                            <span className="w-20 md:w-28 text-center">หญิง</span>
                            <span className="w-40 md:w-80 text-center">rattanaporn.ratta</span>
                            <span className="w-40 md:w-80 text-center">64010726@kmitl.ac.th</span>
                            <span className="w-28 md:w-36 text-center">ผู้เรียน</span>
                            <div className="flex w-40 md:w-56 items-center gap-2">
                                <CheckCircleOutlineRoundedIcon className="text-[#EF4343] w-4 h-4" />
                                <span className="text-[16px] md:text-[18px] text-[#EF4343]">รายชื่อซ้ำจากไฟล์</span>
                                <span className="text-[16px] md:text-[18px] underline text-[#EF4343] cursor-pointer">ลบ</span>
                            </div>
                        </div>
                    </div>

                     {/* รายชื่อซ้ำในระบบ */}
                     <div className="flex flex-col items-start gap-4 self-stretch">
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-2.5 p-3 px-4 md:px-6 rounded-md self-stretch bg-[#FF9000] bg-opacity-10 text-neutral-50">
                            <span className="w-28 md:w-36 text-center">64010726</span>
                            <span className="w-40 md:w-80 text-center">รัตนพร</span>
                            <span className="w-40 md:w-80 text-center">สมใจนึก</span>
                            <span className="w-20 md:w-28 text-center">หญิง</span>
                            <span className="w-40 md:w-80 text-center">rattanaporn.ratta</span>
                            <span className="w-40 md:w-80 text-center">64010726@kmitl.ac.th</span>
                            <span className="w-28 md:w-36 text-center">ผู้เรียน</span>
                            <div className="flex w-40 md:w-56 items-center gap-2">
                                <CheckCircleOutlineRoundedIcon className="text-[#EFA443] w-4 h-4" />
                                <span className="text-[16px] md:text-[18px] text-[#EFA443]">รายชื่อซ้ำในระบบ</span>
                                <span className="text-[16px] md:text-[18px] underline text-[#EFA443] cursor-pointer">ลบ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
