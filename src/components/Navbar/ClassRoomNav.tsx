"use client";

import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Role } from "@/enum/enum";

export default function ClassRoomNav() {
  const pathname = usePathname();
  const param = useParams<{ courseId: string }>();
  const id = param.courseId;

  const role: Role = /^\/student(\/|$)/.test(pathname)
    ? Role.STUDENT
    : /^\/teacher(\/|$)/.test(pathname)
    ? Role.TEACHER
    : Role.ADMIN;

  return (
    <div className="h-screen sticky top-0 border-r-[1px] border-[#D7D7D71A] w-1/4">
      <ul className="flex flex-col text-lg text-[#FAFAFA] mt-10 mx-8 h-[calc(100vh-2.5rem)]">
        <li className="flex flex-row mb-6">
          <Link
            href={`/${role.toLowerCase()}/courses`}
            className="flex items-center"
          >
            <ArrowBackIosIcon className="text-3xl" />
            <p className="font-semibold text-3xl">คอร์สเรียน</p>
          </Link>
        </li>
        <div className="flex flex-col gap-3">
          <li
            className={`px-8 py-4 rounded-md ${
              pathname.includes("/general") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            <Link
              href={`/${role.toLowerCase()}/courses/${id}/general`}
              className="flex items-center"
            >
              ประกาศ
            </Link>
          </li>
          <li
            className={`px-8 py-4 rounded-md ${
              pathname.includes("/announcement") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            <Link
              href={`/${role.toLowerCase()}/courses/${id}/announcement`}
              className="flex items-center"
            >
              การแจ้งเตือน
            </Link>
          </li>
          <li
            className={`px-8 py-4 rounded-md ${
              pathname.includes("/assignment") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            <Link
              href={`/${role.toLowerCase()}/courses/${id}/assignment`}
              className="flex items-center"
            >
              แบบฝึกหัด
            </Link>
          </li>
          <li
            className={`px-8 py-4 rounded-md ${
              pathname.includes("/score") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            <Link
              href={
                role === "STUDENT"
                  ? `/${role.toLowerCase()}/courses/${id}/score/homeworkscore`
                  : role === "TEACHER"
                  ? `/${role.toLowerCase()}/courses/${id}/score/homeworkscore`
                  : `/${role.toLowerCase()}/courses/${id}/score`
              }
              className="flex items-center"
            >
              คะแนน
            </Link>
          </li>

          <li
            className={`px-8 py-4 rounded-md ${
              pathname.includes("/people") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            <Link
              href={`/${role.toLowerCase()}/courses/${id}/people`}
              className="flex items-center"
            >
              สมาชิก
            </Link>
          </li>
          {role === "TEACHER" ? (
            <li
              className={`px-8 py-4 rounded-md ${
                pathname.includes("/setting") ? "bg-[#3049724D]" : ""
              } hover:bg-[#3049724D] cursor-pointer`}
            >
              <Link
                href={`/${role.toLowerCase()}/courses/${id}/setting`}
                className="flex items-center"
              >
                ตั้งค่า
              </Link>
            </li>
          ) : null}
        </div>
      </ul>
    </div>
  );
}
