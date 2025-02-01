"use client";

import React, { useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

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

                <div className="overflow-x-auto ">
                    
                </div>



            </div >
        </>
    );
}

