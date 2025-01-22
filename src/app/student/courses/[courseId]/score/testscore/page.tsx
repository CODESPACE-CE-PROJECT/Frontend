"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Score() {
  const params = useParams<{ courseId: string }>(); // ดึงค่า courseId จาก URL
  const { courseId } = params;

  return (
    <>

      <div className="text-2xl pl-10 pb-5 mt-6">
        คะแนน
      </div>


      <div className="relative w-full ">
        <div className="flex gap-12 pl-14">
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



      <div className="flex justify-between items-center px-8 rounded-lg py-7">
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] flex-1 text-center mr-4">
          แบบฝึกหัด
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] w-48 text-center mr-4">
          คะแนน
        </div>
      </div>

      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="flex justify-between items-center px-8 py-4 rounded-lg"
        >
          <div className="text-white text-lg px-4 py-3 rounded-md flex-1 text-center mr-4 flex items-center gap-4">
            <div className="font-semibold">{`${index}. ทดสอบความรู้เบื้องต้น`}</div>
          </div>
          <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-4">
            10 / 10
          </div>
        </div>
      ))}

      <div className="flex justify-end px-8 py-4">
        <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-8">
          คะแนนรวม 15/30
        </div>
      </div>
    </>
  );
}
