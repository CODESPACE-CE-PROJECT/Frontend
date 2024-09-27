"use client"; // Add this line at the top

import Image from "next/image";

import StudentLayout from "@/app/student/StudentLayout";

import Class101 from "@/app/assets/CoursesAssets/Class101.svg";
import Class102 from "@/app/assets/CoursesAssets/Class102.svg";

export default function Courses() {
  return (
    <>
      <div className="flex flex-col text-[#FAFAFA] m-14 w-full">
        <h1 className="text-lg font-medium mb-6">คอร์สเรียน</h1>
        <div className="flex flex-row flex-wrap gap-5 ">
          <a
            href="/student/courses/classroom"
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
            href="/student/courses/classroom"
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

// Optional: Adding the getLayout method to wrap the page with the StudentLayout
Courses.getLayout = function getLayout(page: React.ReactElement) {
  return <StudentLayout>{page}</StudentLayout>;
};
