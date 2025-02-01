"use client";

import React, { useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

export default function schooladdedfiles() {
    return (
        <>
            <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen">
                <div className="flex items-start justify-between gap-6 w-full">
                    <div className="flex items-center self-stretch w-full">
                        <ArrowBackIosNewRoundedIcon className="text-[#FAFAFA]" />
                        <span className="flex w-full p-[10px] text-3xl text-zinc-50">เพิ่มสมาชิกในโรงเรียน</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#FAFAFA] w-40 h-14 ">
                            <span className="text-lg text-[#5572FA]">ยกเลิก</span>
                        </button>

                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#5572FA] w-40 h-14 ">
                            <span className="text-lg text-zinc-50">เพิ่ม</span>
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="flex gap-9 self-stretch">
                    <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto">
                        <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
                        <span className="text-[18px] text-neutral-50">ค้นหา</span>
                    </div>

                    {/* Button */}
                    <button className="flex w-auto items-center justify-center gap-2 py-3 px-4 rounded-md border-2 border-[#EFA443] ">
                        <span className="text-lg text-[#EFA443]">ลบข้อมูลซ้ำจากไฟล์</span>
                    </button>

                    {/* Button */}
                    <button className="flex w-auto items-center justify-center gap-4 py-3 px-4 rounded-md border-2 border-[#EF4343] ">
                        <span className="text-lg text-[#EF4343]">ลบข้อมูลซ้ำในระบบ</span>
                    </button>
                </div>

                <div className="overflow-x-auto flex flex-col w-full justify-center items-start gap-9">
                    <div className="flex flex-col items-start gap-6 self-stretch">
                        <div className="flex items-center gap-2.5 p-2 px-6 rounded-md self-stretch bg-[#304972] bg-opacity-30">
                            <span className="flex w-36 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">รหัสประจำตัว</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">ชื่อ</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">นามสกุล</span>
                            <span className="flex w-28 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">เพศ</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">ผู้ใช้งาน</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">อีเมล</span>
                            <span className="flex w-36 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">ประเภท</span>
                            <span className="flex w-56 h-[45px] items-center gap-5text-[18px] text-neutral-50"></span>
                        </div>
                    </div>
                    {/* ข้อมูลปกติ */}
                    <div className="flex flex-col items-start gap-6 self-stretch">
                        <div className="flex items-center gap-2.5 p-2 px-6 self-stretch ">
                            <span className="flex w-36 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">64010726</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">รัตนพร</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">สมใจนึก</span>
                            <span className="flex w-28 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">หญิง</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">rattanaporn.ratta</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">64010726@kmitl.ac.th</span>
                            <span className="flex w-36 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">ผู้เรียน</span>
                            <div className="flex w-56 items-center gap-2  ">
                                <CheckCircleOutlineRoundedIcon className=" text-[#00DACC] w-4 h-4" />
                                <div className="flex justify-center items-center gap-7">
                                    <span className="text-[18px] text-[#00DACC]">สามารถเพิ่มได้</span>
                                    {/* <span className="text-[18px] underline text-[#00DACC]">ลบ</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* รายชื่อซ้ำจากไฟล์ */}
                    <div className="flex flex-col items-start gap-6 self-stretch">
                        <div className="flex items-center gap-2.5 p-2 px-6 rounded-md self-stretch bg-[#EF4343] bg-opacity-10">
                            <span className="flex w-36 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">64010726</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">รัตนพร</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">สมใจนึก</span>
                            <span className="flex w-28 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">หญิง</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">rattanaporn.ratta</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">64010726@kmitl.ac.th</span>
                            <span className="flex w-36 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">ผู้เรียน</span>
                            <div className="flex w-56 items-center gap-2  ">
                                <CheckCircleOutlineRoundedIcon className=" text-[#EF4343] w-4 h-4" />
                                <div className="flex justify-center items-center gap-7">
                                    <span className="text-[18px] text-[#EF4343]">รายชื่อซ้ำจากไฟล์</span>
                                    <span className="text-[18px] underline text-[#EF4343]">ลบ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* รายชื่อซ้ำในระบบ */}
                    <div className="flex flex-col items-start gap-6 self-stretch">
                        <div className="flex items-center gap-2.5 p-2 px-6 rounded-md self-stretch bg-[#FF9000] bg-opacity-10">
                            <span className="flex w-36 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">64010726</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">รัตนพร</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">สมใจนึก</span>
                            <span className="flex w-28 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">หญิง</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">rattanaporn.ratta</span>
                            <span className="flex w-80 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">64010726@kmitl.ac.th</span>
                            <span className="flex w-36 h-[45px] justify-center items-center gap-5 text-[18px] text-neutral-50">ผู้เรียน</span>
                            <div className="flex w-56 items-center gap-2  ">
                                <CheckCircleOutlineRoundedIcon className=" text-[#EFA443] w-4 h-4" />
                                <div className="flex justify-center items-center gap-7">
                                    <span className="text-[18px] text-[#EFA443]">สามารถเพิ่มได้</span>
                                    <span className="text-[18px] underline text-[#EFA443]">ลบ</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>


            </div >
        </>
    );
}

