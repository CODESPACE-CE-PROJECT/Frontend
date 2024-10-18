// src/app/components/ClassRoomNav.tsx
"use client";

import React from "react";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GenClass101 from "@/app/assets/CoursesAssets/GenClass101.svg";

export default function ClassRoomNav({ id }: { id: string }) {
  return (
    <ul className="flex flex-col text-lg text-[#FAFAFA] gap-y-3 pt-5 w-1/5 h-screen">
      <li className="pl-10 flex flex-row">
        <a href="/student/courses" className="flex items-center">
          <ArrowBackIosIcon className="text-2xl" />
          <p className="font-medium">คอร์สเรียน</p>
        </a>
      </li>
      <Image className="pl-10 my-5" src={GenClass101} alt="" />
      <li className="z-0 pl-10 py-1 hover:bg-[#2B3245] cursor-pointer">
        <a href={`/student/courses/${id}/general`} className="flex items-center">
          ทั่วไป
        </a>
      </li>
      <li className="pl-10 py-1 hover:bg-[#2B3245] cursor-pointer">
        <a href={`/student/courses/${id}/assignment`} className="flex items-center">
          การบ้าน
        </a>
      </li>
      <li className="pl-10 py-1 hover:bg-[#2B3245] cursor-pointer">
        <a href={`/student/courses/${id}/announcement`} className="flex items-center">
          ประกาศ
        </a>
      </li>
      <li className="pl-10 py-1 hover:bg-[#2B3245] cursor-pointer">
        <a href={`/student/courses/${id}/people`} className="flex items-center">
          สมาชิก
        </a>
      </li>
    </ul>
  );
}
