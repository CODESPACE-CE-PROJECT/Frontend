"use client"; // Add this line at the top

import React, { useState } from "react";
import Image from "next/image";

import Class101 from "@/app/assets/CoursesAssets/Class101.svg";
import Class102 from "@/app/assets/CoursesAssets/Class102.svg";
import Cookies from 'js-cookie';  


export default function Courses() {

  const token = Cookies.get('accessToken'); // Replace 'authToken' with your cookie name
  
  console.log(token + "test");

  return (
    <>
      <div className="flex flex-col text-[#FAFAFA] m-14 w-full">
        <h1 className="text-lg font-medium mb-6">คอร์สเรียน</h1>
        <div className="flex flex-row flex-wrap gap-5 ">
          <a
            href="/student/courses/classroom/general"
            className="flex flex-col items-center bg-[#16233A] hover:bg-[#2C3A4E] rounded-md space-y-3 px-7 py-5 w-80 h-auto"
          >
            <Image className="w-20 " src={Class101} alt=""></Image>
            <h2 className="font-medium text-wrap text-xl">
              พื้นฐานการเขียนโปรแกรม สำหรับสร้างเว็บ 101
            </h2>
            <p className="line-clamp-2 ">
              พัฒนาเว็บไซต์ด้วยการเขียนโค้ดเพื่อความยืดหยุ่นและควบคุมทุกรายละเอียดของการออกแบบและการทำงานแบบนี้จะกระชับและให้ความหมายที่ชัดเจน
            </p>
          </a>

          <a
            href="/student/courses/classroom/general"
            className="flex flex-col items-center bg-[#16233A] hover:bg-[#2C3A4E] rounded-md space-y-3 px-7 py-5 w-80 h-auto"
          >
            <Image className="w-20 " src={Class102} alt=""></Image>
            <h2 className="font-medium text-wrap text-xl">
              พื้นฐานการเขียนโปรแกรม สำหรับสร้างเว็บ 102
            </h2>
            <p className="line-clamp-2 ...">
              พัฒนาเว็บไซต์ด้วยการเขียนโค้ดเพื่อความยืดหยุ่นและควบคุมทุกรายละเอียดของการออกแบบและการทำงานแบบนี้จะกระชับและให้ความหมายที่ชัดเจน
            </p>
          </a>
        </div>
      </div>
    </>
  );
}
