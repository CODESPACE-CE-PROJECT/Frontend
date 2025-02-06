import React, { useState } from "react";

import ProbNav from "./ProbNav";
import UploadIcon from '@mui/icons-material/Upload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function WorkHeadNav() {
    return (
        <>

            <div className="flex flex-row justify-between items-center m-2">
                <div className="flex flex-row ml-7 space-x-4 items-center">
                    <Link href="/student/courses/classroom/assignment"><ArrowBackIcon className="text-white" fontSize="large" /></Link>
                    <ProbNav />
                    <div className=" text-white">
                        Problem List
                    </div>
                </div>

                <button className="flex flex-row rounded-md items-center text-[#95F9A7] bg-[#044A10] px-4 py-2 hover:bg-[#1E9733]  hover:text-white">
                    <PlayArrowIcon className=" mr-2" />
                    <div className=" text-lg font-bold">Run</div>
                </button>


                <div className="flex flex-row space-x-3 mr-4 ">


                    <button className="flex flex-row rounded-md items-center bg-[#1C2333] border-white px-4 py-2">
                        <UploadIcon fontSize="large" className="mr-1 text-white" />
                        <div className="text-white text-lg ">อัพโค้ด</div>
                    </button>

                    <button className="flex flex-row  text-[#95F9A7] bg-[#044A10] hover:bg-[#1E9733]  hover:text-white rounded-md px-0.5 py-4 ">
                        <CloudUploadIcon className="ml-3 " />
                        <div className="px-3  font-bold">
                            Submit
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}