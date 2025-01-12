"use client"; 
import React from "react";
import Link from "next/link";

interface ClassRoomNavProps {
  id?: string; 
  role?: string;
}

export default function Score({ id = "defaultId", role = "student" }: ClassRoomNavProps) {
  return (
    <>
      <div className="relative w-full flex">
        <div className="flex pl-10">
          <h1 className="z-10 border-[#1E90FF] border-b-2 font-semibold text-lg py-4">
            แบบฝึกหัด
          </h1>
        </div>
        <div className="flex pl-10">
          <Link
            href={`/${role.toLowerCase()}/courses/${id}/score/testscore`}
            className="flex items-center"
          >
            การทดสอบ
          </Link>
        </div>
        <span className="z-0 absolute bottom-0 bg-[#090B11] p-[1px] w-full"></span>
      </div>

      <div className="flex justify-between items-center px-8 rounded-lg py-7">
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] flex-1 text-center mr-4">
          แบบฝึกหัด
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] w-48 text-center mr-4">
          คะแนน
        </div>
      </div>

      <div className="flex justify-between items-center px-8 py-4 rounded-lg">
        <div className="text-white text-lg px-4 py-3 rounded-md flex-1 text-center mr-4 flex items-center gap-4">
          <div className="font-semibold">1. ทดสอบความรู้เบื้องต้น</div>
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-4">
          10 / 10
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-4 rounded-lg">
        <div className="text-white text-lg px-4 py-3 rounded-md flex-1 text-center mr-4 flex items-center gap-4">
          <div className="font-semibold">2. ทดสอบความรู้เบื้องต้น</div>
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-4">
          10 / 10
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-4 rounded-lg">
        <div className="text-white text-lg px-4 py-3 rounded-md flex-1 text-center mr-4 flex items-center gap-4">
          <div className="font-semibold">3. ทดสอบความรู้เบื้องต้น</div>
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-4">
          10 / 10
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-4 rounded-lg">
        <div className="text-white text-lg px-4 py-3 rounded-md flex-1 text-center mr-4 flex items-center gap-4">
          <div className="font-semibold">4. ทดสอบความรู้เบื้องต้น</div>
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-4">
          10 / 10
        </div>
      </div>

      <div className="flex justify-end px-8 py-4">
        <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-8">
          คะแนนรวม 15/30
        </div>
      </div>
    </>
  );
}
