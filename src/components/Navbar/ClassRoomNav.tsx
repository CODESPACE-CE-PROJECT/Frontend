"use client";

import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
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
      <div className="flex flex-col text-lg text-[#FAFAFA] mt-10 mx-8 h-[calc(100vh-2.5rem)]">
        <Link
          href={`/${role.toLowerCase()}/course`}
          className="flex items-center mb-6 cursor-pointer"
        >
          <ArrowBackIosNewRoundedIcon className="hover:text-primary"/>
          <p className="font-semibold text-3xl">คอร์สเรียน</p>
        </Link>
        <div className="flex flex-col gap-3">
          <Link
            href={`/${role.toLowerCase()}/course/${id}/general`}
            className={`flex items-center px-8 py-4 rounded-md ${
              pathname.includes("/general") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            ประกาศ
          </Link>

          <Link
            href={`/${role.toLowerCase()}/course/${id}/announcement`}
            className={`flex items-center px-8 py-4 rounded-md ${
              pathname.includes("/announcement") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            การแจ้งเตือน
          </Link>

          <Link
            href={
              role === "STUDENT"
                ? `/${role.toLowerCase()}/course/${id}/assignment/exercise`
                : role === "TEACHER"
                ? `/${role.toLowerCase()}/course/${id}/assignment/exercise`
                : `/${role.toLowerCase()}/course/${id}/assignment`
            }
            className={`flex items-center px-8 py-4 rounded-md ${
              pathname.includes("/assignment") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            แบบฝึกหัด
          </Link>

          <Link
            href={
              role === "STUDENT"
                ? `/${role.toLowerCase()}/course/${id}/score/exercise `
                : role === "TEACHER"
                ? `/${role.toLowerCase()}/course/${id}/score/exercise `
                : `/${role.toLowerCase()}/course/${id}/score`
            }
            className={`flex items-center px-8 py-4 rounded-md ${
              pathname.includes("/score") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            คะแนน
          </Link>

          <Link
            href={`/${role.toLowerCase()}/course/${id}/people`}
            className={`flex items-center px-8 py-4 rounded-md ${
              pathname.includes("/people") ? "bg-[#3049724D]" : ""
            } hover:bg-[#3049724D] cursor-pointer`}
          >
            สมาชิก
          </Link>

          {role === "TEACHER" ? (
            <Link
              href={`/${role.toLowerCase()}/course/${id}/setting`}
              className={`flex items-center px-8 py-4 rounded-md ${
                pathname.includes("/setting") ? "bg-[#3049724D]" : ""
              } hover:bg-[#3049724D] cursor-pointer`}
            >
              ตั้งค่า
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
