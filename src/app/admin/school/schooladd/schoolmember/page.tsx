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
import Image from "next/image";

export default function schoolmember() {
    return (
        <>
            <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen">
                <div className="flex justify-between items-center self-stretch">
                    <ArrowBackIosNewRoundedIcon className="text-[#FAFAFA]" />
                    <span className="flex w-full p-[10px] text-3xl text-zinc-50">สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</span>
                </div>

                <div className="flex flex-col w-[1670px] gap-[48px] pt-5 pr-6 pb-5  ">
                    <div className="flex flex-col items-start gap-9 self-stretch">
                        <div className="flex pt-[20px] pr-6 pb-5 pl-12 justify-between items-start self-stretch rounded-xl bg-[#2A3A50] bg-opacity-30">
                            <div className="flex gap-12">
                                <Image src="https://www.eng.kmitl.ac.th/wp-content/uploads/2024/06/About-4-B.png" alt="icon" className="w-[140px] h-[140px]" />
                                <div className="flex flex-col items-start gap-4">
                                    <button className="flex justify-center items-center py-2 px-3 rounded-[6px] border border-[#2A3A50] text-zinc-50" >Standard</button>
                                    <span className="flex w-full text-2xl text-zinc-50">สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</span>
                                    <span className="flex w-full text-xl text-zinc-50">1 ซอยฉลองกรุง 1 เขตลาดกระบัง อำเภอลาดกระบัง จังหวัดกรุงเทพมหานคร 10520</span>
                                    <div className="flex gap-4">
                                        <span className="text-xl text-zinc-50">ผู้สอน 2 คน</span>
                                        <CircleIcon className="text-[#FAFAFA]" />
                                        <span className="text-xl text-zinc-50">ผู้เรียน 1 คน</span>
                                    </div>
                                </div>
                            </div>
                            <ModeEditOutlineOutlinedIcon className="text-[#FAFAFA]" />
                        </div>
                        {/* container Search and Button */}
                        <div className="flex-col contents self-stretch gap-[36px] w-full lg:flex-row">

                            {/* Search */}
                            <div className="flex gap-9 self-stretch">
                                <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto">
                                    <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
                                    <span className="text-[18px] text-neutral-50">ค้นหา</span>
                                </div>

                                {/* Button */}
                                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#FAFAFA] w-auto ">
                                    <NoteAddRoundedIcon className="text-[#5572FA] w-6 h-6" />
                                    <span className="text-lg text-[#5572FA]">นำเข้าไฟล์</span>
                                </button>

                                {/* Button */}
                                <button className="flex items-center justify-center gap-4 py-3 px-4 rounded-md bg-[#5572FA] w-auto ">
                                    <AddRoundedIcon className="text-neutral-50 w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex  items-start gap-9 w-full justify-between">
                            {/* บัญชีผู้สอน */}
                            <div className="flex flex-col items-start gap-9 w-full">
                                <div className="flex flex-col items-start gap-6 self-stretch ">
                                    <div className="flex h-16 items-center gap-2.5 self-stretch p-2 px-6 rounded-xl bg-[#2A3A50] bg-opacity-30">
                                        <span className="text-zinc-50 text-xl">บัญชีผู้สอน</span>
                                    </div>
                                    {/* ข้อมูลรายชื่อผู้สอน */}
                                    <div className="flex items-center justify-between gap-2.5 self-stretch p-2 px-6">
                                        <div className="flex items-center gap-5">
                                            <Image src="https://undubzapp.com/wp-content/uploads/2023/04/01-most-beautiful-korean-actress.jpg" alt="icon" className="w-16 h-16 rounded-full" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-zinc-50 text-xl">รัตนพร สมใจนึก</span>
                                                <span className="text-zinc-50 text-base">rattanaporn@kmitl.ac.th</span>
                                            </div>
                                        </div>
                                        {/* more */}
                                        <div className="flex align-center gap-4">
                                            <div className="flex align-center gap-4 py-2 px-4 rounded-md border border-[#00DACC]">
                                                <CircleIcon className="text-[#00DACC]" />
                                                <span className="flex  justify-center items-center text-[#00DACC]">ออนไลน์</span>
                                            </div>
                                            <div className="flex items-center justify-center px-2 rounded-md border border-[#2A3A50]">
                                                <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* บัญชีผู้เรียน */}
                            <div className="flex flex-col items-start gap-9 w-full">
                                <div className="flex flex-col items-start gap-6 self-stretch ">
                                    <div className="flex h-16 items-center gap-2.5 self-stretch p-2 px-6 rounded-xl bg-[#2A3A50] bg-opacity-30">
                                        <span className="text-zinc-50 text-xl">บัญชีผู้เรียน</span>
                                    </div>
                                    {/* ข้อมูลรายชื่อผู้เรียน */}
                                    <div className="flex items-center justify-between gap-2.5 self-stretch p-2 px-6">
                                        <div className="flex items-center gap-5">
                                            <Image src="https://undubzapp.com/wp-content/uploads/2023/04/01-most-beautiful-korean-actress.jpg" alt="icon" className="w-16 h-16 rounded-full" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-zinc-50 text-xl">รัตนพร สมใจนึก</span>
                                                <span className="text-zinc-50 text-base">rattanaporn@kmitl.ac.th</span>
                                            </div>
                                        </div>
                                        {/* more */}
                                        <div className="flex align-center gap-4">
                                            <div className="flex align-center gap-4 py-2 px-4 rounded-md border border-[#00DACC]">
                                                <CircleIcon className="text-[#00DACC]" />
                                                <span className="flex  justify-center items-center text-[#00DACC]">ออนไลน์</span>
                                            </div>
                                            <div className="flex items-center justify-center px-2 rounded-md border border-[#2A3A50]">
                                                <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* ข้อมูลรายชื่อผู้เรียน */}
                                    <div className="flex items-center justify-between gap-2.5 self-stretch p-2 px-6">
                                        <div className="flex items-center gap-5">
                                            <Image src="https://undubzapp.com/wp-content/uploads/2023/04/01-most-beautiful-korean-actress.jpg" alt="icon" className="w-16 h-16 rounded-full" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-zinc-50 text-xl">รัตนพร สมใจนึก</span>
                                                <span className="text-zinc-50 text-base">rattanaporn@kmitl.ac.th</span>
                                            </div>
                                        </div>
                                        {/* more */}
                                        <div className="flex align-center gap-4">
                                            <div className="flex align-center gap-4 py-2 px-4 rounded-md border border-[#fafafa]">
                                                <CircleOutlinedIcon className="text-zinc-50" />
                                                <span className="flex  justify-center items-center text-zinc-50">ออฟไลน์</span>
                                            </div>
                                            <div className="flex items-center justify-center px-2 rounded-md border border-[#2A3A50]">
                                                <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ข้อมูลรายชื่อผู้เรียน */}
                                    <div className="flex items-center justify-between gap-2.5 self-stretch p-2 px-6">
                                        <div className="flex items-center gap-5">
                                            <Image src="https://undubzapp.com/wp-content/uploads/2023/04/01-most-beautiful-korean-actress.jpg" alt="icon" className="w-16 h-16 rounded-full" />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-zinc-50 text-xl">รัตนพร สมใจนึก</span>
                                                <span className="text-zinc-50 text-base">rattanaporn@kmitl.ac.th</span>
                                            </div>
                                        </div>
                                        {/* more */}
                                        <div className="flex align-center gap-4">
                                            <div className="flex align-center gap-4 py-2 px-4 border rounded-md border-[#EF4343]">
                                                <HighlightOffRoundedIcon className="text-[#EF4343]" />
                                                <span className="flex  justify-center items-center text-[#EF4343]">ปิดใช้งานชั่วคราว</span>
                                            </div>
                                            <div className="flex items-center justify-center px-2 rounded-md border border-[#2A3A50]">
                                                <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}

