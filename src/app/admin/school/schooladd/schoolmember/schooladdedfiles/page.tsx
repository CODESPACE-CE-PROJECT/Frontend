"use client";

import React, { useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

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
                    <button className="flex w-full md:w-auto items-center justify-center gap-2 py-3 px-4 rounded-md border-2 border-[#EFA443] text-lg text-[#EFA443] hover:bg-[#EFA443] hover:text-zinc-50">ลบข้อมูลซ้ำจากไฟล์</button>
                    <button className="flex w-full md:w-auto items-center justify-center gap-4 py-3 px-4 rounded-md border-2 border-[#EF4343] text-lg text-[#EF4343] bg-[#EF4343] bg-opacity-10 hover:bg-[#EF4343] hover:text-zinc-50">ลบข้อมูลซ้ำในระบบ</button>
                </div>

                <div className="w-full overflow-x-auto pb-4">
                    <table className="table-auto w-full  border-separate border-spacing-y-[12px]">
                        {/* Table Header */}
                        <thead className="  bg-[#304972] bg-opacity-30 text-neutral-50 text-[16px] md:text-[18px]">
                            <tr className="">
                                <th className="p-3 px-4 md:px-6 text-center rounded-l-md truncate">รหัสประจำตัว</th>
                                <th className="p-3 px-4 md:px-6 text-center truncate">ชื่อ</th>
                                <th className="p-3 px-4 md:px-6 text-center truncate">นามสกุล</th>
                                <th className="p-3 px-4 md:px-6 text-center truncate">เพศ</th>
                                <th className="p-3 px-4 md:px-6 text-center truncate">ผู้ใช้งาน</th>
                                <th className="p-3 px-4 md:px-6 text-center truncate">อีเมล</th>
                                <th className="p-3 px-4 md:px-6 text-center truncate">ประเภท</th>
                                <th className="p-3 px-4 md:px-6 text-center rounded-r-md"></th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {/* Data Row */}
                            <tr className=" text-neutral-50">
                                <td className="p-3 px-4 md:px-6 text-center rounded-l-md truncate">64010726</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">รัตนพร</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">สมใจนึก</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">หญิง</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">rattanaporn.ratta</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">64010726@kmitl.ac.th</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">ผู้เรียน</td>
                                <td className="p-3 px-4 md:px-6 text-center rounded-r-md truncate">
                                    <div className="flex justify-start items-center gap-2">
                                        <CheckCircleOutlineRoundedIcon className="text-[#00DACC] w-4 h-4" />
                                        <span className="text-[14px] md:text-[18px] text-[#00DACC]">สามารถเพิ่มได้</span>
                                    </div>
                                </td>
                            </tr>
                            {/* รายชื่อซ้ำจากไฟล์ */}
                            <tr className=" text-neutral-50 rounded-md bg-[#EF4343] bg-opacity-10">
                                <td className="p-3 px-4 md:px-6 text-center rounded-l-md">64010726</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">รัตนพร</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">สมใจนึก</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">หญิง</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">rattanaporn.ratta</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">64010726@kmitl.ac.th</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">ผู้เรียน</td>
                                <td className="p-3 px-4 md:px-6 text-center rounded-r-md truncate">
                                    <div className="flex justify-start items-center gap-2">
                                        <HighlightOffRoundedIcon className="text-[#EF4343] w-4 h-4" />
                                        <span className="text-[14px] md:text-[18px] text-[#EF4343]">รายชื่อซ้ำจากไฟล์</span>
                                        <span className="text-[16px] md:text-[18px] underline text-[#EF4343] cursor-pointer">ลบ</span>
                                    </div>
                                </td>
                            </tr>
                            {/* รายชื่อซ้ำในระบบ */}
                            <tr className=" text-neutral-50 rounded-md bg-[#FF9000] bg-opacity-10">
                                <td className="p-3 px-4 md:px-6 text-center rounded-l-md truncate">64010726</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">รัตนพร</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">สมใจนึก</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">หญิง</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">rattanaporn.ratta</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">64010726@kmitl.ac.th</td>
                                <td className="p-3 px-4 md:px-6 text-center truncate">ผู้เรียน</td>
                                <td className="p-3 px-4 md:px-6 text-center rounded-r-md truncate">
                                    <div className="flex justify-start items-center gap-2">
                                        <HighlightOffRoundedIcon className="text-[#EFA443] w-4 h-4" />
                                        <span className="text-[14px] md:text-[18px] text-[#EFA443]">รายชื่อซ้ำในระบบ</span>
                                        <span className="text-[16px] md:text-[18px] underline text-[#EFA443] cursor-pointer">ลบ</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <div className="w-full overflow-x-auto pb-4">
                    <div className="w-full min-w-max"> */}
                {/* Table Header & Data Rows */}
                {/* <div className="w-full flex flex-col gap-3"> */}
                {/* Table Header */}
                {/* <div className="flex items-center gap-2.5 p-3 px-4 md:px-6 rounded-md bg-[#304972] bg-opacity-30 text-neutral-50 text-[16px] md:text-[18px] sticky top-0 z-10">
                                <span className="w-28 md:w-36 text-center">รหัสประจำตัว</span>
                                <span className="w-40 md:w-80 text-center">ชื่อ</span>
                                <span className="w-40 md:w-80 text-center">นามสกุล</span>
                                <span className="w-20 md:w-28 text-center">เพศ</span>
                                <span className="w-40 md:w-80 text-center">ผู้ใช้งาน</span>
                                <span className="w-40 md:w-80 text-center">อีเมล</span>
                                <span className="w-28 md:w-36 text-center">ประเภท</span>
                                <span className="w-40 md:w-56 text-center"></span>
                            </div> */}

                {/* Data Row */}
                {/* <div className="overflow-x-auto w-full">
                                <div className="flex items-center gap-2.5 p-3 px-4 md:px-6 text-neutral-50 ">
                                    <span className="w-28 md:w-36 text-center">64010726</span>
                                    <span className="w-40 md:w-80 text-center">รัตนพร</span>
                                    <span className="w-40 md:w-80 text-center">สมใจนึก</span>
                                    <span className="w-20 md:w-28 text-center">หญิง</span>
                                    <span className="w-40 md:w-80 text-center truncate">rattanaporn.ratta</span>
                                    <span className="w-40 md:w-80 text-center truncate">64010726@kmitl.ac.th</span>
                                    <span className="w-28 md:w-36 text-center">ผู้เรียน</span>
                                    <div className="flex w-40 md:w-56 items-center gap-2">
                                        <CheckCircleOutlineRoundedIcon className="text-[#00DACC] w-4 h-4" />
                                        <span className="text-[14px] md:text-[18px] text-[#00DACC]">สามารถเพิ่มได้</span>
                                    </div>
                                </div>
                            </div> */}

                {/* รายชื่อซ้ำจากไฟล์ */}
                {/* <div className="overflow-x-auto w-full">
                                <div className="flex items-center gap-2.5 p-3 px-4 md:px-6 text-neutral-50 rounded-md bg-[#EF4343] bg-opacity-10">
                                    <span className="w-28 md:w-36 text-center">64010726</span>
                                    <span className="w-40 md:w-80 text-center">รัตนพร</span>
                                    <span className="w-40 md:w-80 text-center">สมใจนึก</span>
                                    <span className="w-20 md:w-28 text-center">หญิง</span>
                                    <span className="w-40 md:w-80 text-center truncate">rattanaporn.ratta</span>
                                    <span className="w-40 md:w-80 text-center truncate">64010726@kmitl.ac.th</span>
                                    <span className="w-28 md:w-36 text-center">ผู้เรียน</span>
                                    <div className="flex w-40 md:w-56 items-center gap-2">
                                        <HighlightOffRoundedIcon className="text-[#EF4343] w-4 h-4" />
                                        <span className="text-[14px] md:text-[18px] text-[#EF4343]">สามารถเพิ่มได้</span>
                                        <span className="text-[16px] md:text-[18px] underline text-[#EF4343] cursor-pointer">ลบ</span>
                                    </div>
                                </div>
                            </div> */}

                {/* รายชื่อซ้ำในระบบ */}
                {/* <div className="overflow-x-auto w-full">
                                <div className="flex items-center gap-2.5 p-3 px-4 md:px-6 text-neutral-50 rounded-md bg-[#FF9000] bg-opacity-10">
                                    <span className="w-28 md:w-36 text-center">64010726</span>
                                    <span className="w-40 md:w-80 text-center">รัตนพร</span>
                                    <span className="w-40 md:w-80 text-center">สมใจนึก</span>
                                    <span className="w-20 md:w-28 text-center">หญิง</span>
                                    <span className="w-40 md:w-80 text-center truncate">rattanaporn.ratta</span>
                                    <span className="w-40 md:w-80 text-center truncate">64010726@kmitl.ac.th</span>
                                    <span className="w-28 md:w-36 text-center">ผู้เรียน</span>
                                    <div className="flex w-40 md:w-56 items-center gap-2">
                                        <HighlightOffRoundedIcon className="text-[#EFA443] w-4 h-4" />
                                        <span className="text-[14px] md:text-[18px] text-[#EFA443]">สามารถเพิ่มได้</span>
                                        <span className="text-[16px] md:text-[18px] underline text-[#EFA443] cursor-pointer">ลบ</span>
                                    </div>
                                </div>
                            </div> */}




            </div >
        </>
    );
}
