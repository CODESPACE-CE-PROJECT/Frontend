"use client"; // Add this line at the top

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Next.js router for client-side navigation

import Class101 from "@/app/assets/CoursesAssets/Class101.svg";
import Class102 from "@/app/assets/CoursesAssets/Class102.svg";

// Define courses with title, description, and image
const courses = [
  {
    id: "class101",
    title: "พื้นฐานการเขียนโปรแกรม สำหรับสร้างเว็บ 101",
    description:
      "เรียนรู้พื้นฐานของการเขียนโค้ดและการพัฒนาเว็บที่ช่วยให้สามารถควบคุมทุกรายละเอียดในการออกแบบ",
    image: Class101,
  },
  {
    id: "class102",
    title: "พื้นฐานการเขียนโปรแกรม สำหรับสร้างเว็บ 102",
    description:
      "การพัฒนาเว็บขั้นสูงที่เพิ่มความยืดหยุ่นและปรับใช้เทคนิคที่ซับซ้อนมากขึ้น",
    image: Class102,
  },
];

export default function Courses() {
  const router = useRouter(); // Use router for client-side navigation

  const handleCourseClick = (id: string) => {
    router.push(`/student/courses/${id}/general`); // Navigate dynamically to the course page
  };

  return (
    <div className="flex flex-col text-[#FAFAFA] m-14 w-full">
      <h1 className="text-lg font-medium mb-6">คอร์สเรียน</h1>
      <div className="flex flex-row flex-wrap gap-5">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleCourseClick(course.id)}
            className="flex flex-col items-center bg-[#16233A] hover:bg-[#2C3A4E] cursor-pointer rounded-md space-y-3 px-7 py-5 w-80 h-auto"
          >
            <Image className="w-20" src={course.image} alt={course.title} />
            <h2 className="font-medium text-wrap text-xl">{course.title}</h2>
            <p className="line-clamp-2 text-sm">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
