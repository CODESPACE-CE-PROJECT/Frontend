"use client"; 

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Score() {
  const params = useParams<{ courseId: string }>(); // ดึงค่า courseId จาก URL
  const { courseId } = params;

  return (
    <>
      <div className="relative w-full ">
        <div className="flex gap-12 pl-10">
          <Link href={`/student/courses/${courseId}/score/homeworkscore`}>
            <h1
              className={`text-lg font-semibold cursor-pointer pb-2 ${window.location.pathname.includes("homeworkscore")
                  ? "text-white border-b-4 border-[#1E90FF]"
                  : "text-gray-400"
                }`}
            >
              แบบฝึกหัด
            </h1>
          </Link>
          <Link href={`/student/courses/${courseId}/score/testscore`}>
            <h1
              className={`text-lg font-semibold cursor-pointer pb-2 ${window.location.pathname.includes("testscore")
                  ? "text-white border-b-4 border-[#1E90FF]"
                  : "text-gray-400"
                }`}
            >
              การทดสอบ
            </h1>
          </Link>
        </div>
      </div>

    </>
  );
}
