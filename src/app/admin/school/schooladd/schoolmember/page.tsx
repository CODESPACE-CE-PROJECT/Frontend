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

export default function schoolmember() {
    return (
        <>
            <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full min-h-screen">
                <div className="flex justify-between items-center self-stretch">
                    <ArrowBackIosNewRoundedIcon className="text-[#FAFAFA]" />
                    <span className="flex w-full p-[10px] text-3xl text-zinc-50">สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</span>
                </div>

                <div className="flex flex-col w-full max-w-[1670px] gap-[48px] pt-5 pr-6 pb-5">
                    <div className="flex flex-col items-start gap-9 self-stretch">
                        <div className="flex pt-[20px] pr-6 pb-5 pl-12 justify-between items-start self-stretch rounded-xl bg-[#2A3A50] bg-opacity-30">
                            <div className="flex gap-12">
                                <img src="https://www.eng.kmitl.ac.th/wp-content/uploads/2024/06/About-4-B.png" alt="icon" className="w-[140px] h-[140px]" />
                                <div className="flex flex-col items-start gap-4">
                                    <button className="flex justify-center items-center py-2 px-3 rounded-[6px] border border-[#2A3A50] text-zinc-50">Standard</button>
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

                        <div className="flex flex-col md:flex-row w-full gap-9">
                            {/* <!-- Search --> */}
                            <div className="flex flex-col lg:flex-row w-full gap-9">
                                <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-full lg:w-auto">
                                    <SearchTwoToneIcon className="text-neutral-50 w-6 h-4" />
                                    <span className="text-lg text-neutral-50">ค้นหา</span>
                                </div>
                                <div className="flex flex-col items-center gap-4 lg:flex-row">
                                    {/* <!-- Button --> */}
                                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#FAFAFA] w-full lg:w-auto">
                                        <NoteAddRoundedIcon className="text-[#5572FA] w-6 h-4" />
                                        <span className="text-lg text-[#5572FA]">นำเข้าไฟล์</span>
                                    </button>

                                    {/* <!-- Button --> */}
                                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#5572FA] w-full lg:w-auto">
                                        <AddRoundedIcon className="text-neutral-50 w-6 h-4" />
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="2xl:flex 2xl:flex-row 2xl:justify-between 2xl:gap-12 border-spacing-y-4 w-full ">
                            {/* <!-- Tables for Teachers --> */}
                            <div className="w-full flex flex-col lg:flex-row justify-between gap-6">
                                {/* <!-- Teacher Table --> */}
                                <div className="w-full lg:w-full overflow-x-auto">
                                    {/* <div className="overflow-x-auto"> */}
                                    <table className="min-w-[800px] w-full table-auto">
                                        <thead className="bg-[#304972] bg-opacity-30 text-neutral-50 text-[16px] lg:text-[18px] lg:rounded-md ">
                                            <tr>
                                                <th className="p-3 px-4 lg:px-6 !font-normal 2xl:flex">บัญชีผู้สอน</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="flex justify-between items-center self-stretch text-neutral-50 py-2 px-6">
                                                <div className="flex items-center gap-5">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DRbqox4LWEzG6pEKOuDdytBPvE0KE1Iopw&s" alt="icon" className="w-16 h-16 rounded-full" />
                                                    <div className="flex flex-col justify-center items-start">
                                                        <td className="p-2 text-center rounded-l-md overflow-hidden ">วรวิทย์ สุขเกษม</td>
                                                        <td className="p-2 text-center overflow-hidden">example1@gmail.com</td>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 truncate">
                                                    <td className="py-2 px-3 text-center text-[#00DACC] flex items-center justify-center gap-2 border-2 border-[#00DACC] rounded-md">
                                                        <CircleIcon className="text-[#00DACC]" /> ออนไลน์
                                                    </td>
                                                    <td className="py-2 px-3 text-center border-2 border-[#2A3A50] rounded-md">
                                                        <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                                                    </td>
                                                </div>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* <!-- Student Table --> */}
                            <div className="w-full flex flex-col lg:flex-row justify-between gap-6">
                                {/* <!-- Teacher Table --> */}
                                <div className="w-full lg:w-full overflow-x-auto">
                                    {/* <div className="overflow-x-auto"> */}
                                    <table className="min-w-[800px] w-full table-auto">
                                        <thead className="bg-[#304972] bg-opacity-30 text-neutral-50 text-[16px] lg:text-[18px]">
                                            <tr>
                                                <th className="p-3 px-4 lg:px-6 !font-normal 2xl:flex ">บัญชีผู้สอน</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="flex justify-between items-center self-stretch text-neutral-50 py-2 px-6">
                                                <div className="flex items-center gap-5">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DRbqox4LWEzG6pEKOuDdytBPvE0KE1Iopw&s" alt="icon" className="w-16 h-16 rounded-full" />
                                                    <div className="flex flex-col justify-center items-start">
                                                        <td className="p-2 text-center rounded-l-md overflow-hidden ">วรวิทย์ สุขเกษม</td>
                                                        <td className="p-2 text-center overflow-hidden">example1@gmail.com</td>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 truncate">
                                                    <td className="py-2 px-3 text-center text-[#00DACC] flex items-center justify-center gap-2 border-2 border-[#00DACC] rounded-md">
                                                        <CircleIcon className="text-[#00DACC]" /> ออนไลน์
                                                    </td>
                                                    <td className="py-2 px-3 text-center border-2 border-[#2A3A50] rounded-md">
                                                        <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                                                    </td>
                                                </div>
                                            </tr>

                                            <tr className="flex justify-between items-center self-stretch text-neutral-50 py-2 px-6">
                                                <div className="flex items-center gap-5">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DRbqox4LWEzG6pEKOuDdytBPvE0KE1Iopw&s" alt="icon" className="w-16 h-16 rounded-full" />
                                                    <div className="flex flex-col justify-center items-start">
                                                        <td className="p-2 text-center rounded-l-md overflow-hidden ">วรวิทย์ สุขเกษม</td>
                                                        <td className="p-2 text-center overflow-hidden">example1@gmail.com</td>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 truncate">
                                                    <td className="py-2 px-3 text-center text-neutral-50 flex items-center justify-center gap-2 border-2 border-[#fafafa] rounded-md">
                                                        <CircleOutlinedIcon className="text-neutral-50" /> ออฟไลน์
                                                    </td>
                                                    <td className="py-2 px-3 text-center border-2 border-[#2A3A50] rounded-md">
                                                        <MoreHorizOutlinedIcon className="text-neutral-50" />
                                                    </td>
                                                </div>
                                            </tr>

                                            <tr className="flex justify-between items-center self-stretch text-neutral-50 py-2 px-6">
                                                <div className="flex items-center gap-5">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DRbqox4LWEzG6pEKOuDdytBPvE0KE1Iopw&s" alt="icon" className="w-16 h-16 rounded-full" />
                                                    <div className="flex flex-col justify-center items-start">
                                                        <td className="p-2 text-center rounded-l-md overflow-hidden ">วรวิทย์ สุขเกษม</td>
                                                        <td className="p-2 text-center overflow-hidden">example1@gmail.com</td>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 truncate">
                                                    <td className="py-2 px-3 text-center text-[#EF4343] flex items-center justify-center gap-2 border-2 border-[#EF4343] rounded-md">
                                                        <HighlightOffRoundedIcon className="text-[#EF4343]" /> ปิดใช้งานชั่วคราว
                                                    </td>
                                                    <td className="py-2 px-3 text-center border-2 border-[#2A3A50] rounded-md">
                                                        <MoreHorizOutlinedIcon className=" text-neutral-50" />
                                                    </td>
                                                </div>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

