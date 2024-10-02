import React, { useState } from "react";
import Image from "next/image";
import ClassIcon from "@mui/icons-material/Class";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CodeIcon from "@mui/icons-material/Code";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";

import AssignmentIcon from "@mui/icons-material/Assignment";

import PlatformIcon from "../assets/CoursesAssets/PlatformIcon.svg";

export default function SideNav() {
  return (
    <>
      <nav className="sticky top-0 flex flex-col justify-between bg-[#0B111B] text-white w-[6vw] h-screen">
        {/* Navigation Links */}
        <ul className="space-y-10 mt-8">
          <li>
            <a
              href="/"
              className="flex flex-col items-center rounded-lg space-y-2 w-full"
            >
              <Image className="w-16" src={PlatformIcon} alt=""></Image>
            </a>
          </li>

          <li>
            <a
              href="/student/courses"
              className="flex flex-col items-center rounded-lg space-y-2 w-full"
            >
              <ClassIcon className=" text-3xl " />
              <span className=" text-sm ">คอร์สเรียน</span>
            </a>
          </li>

          <li>
            <a
              href="/student/workingspace"
              className="flex flex-col items-center rounded-lg space-y-2 w-full"
            >
              <CodeIcon className="text-3xl " />
              <span className="text-sm">เขียนโปรแกรม</span>
            </a>
          </li>

          <li>
            <a
              href="/student/calendar"
              className="flex flex-col items-center rounded-lg space-y-2 w-full"
            >
              <CalendarTodayIcon className="text-3xl" />
              <span className="text-sm">ปฏิทิน</span>
            </a>
          </li>

          <li>
            <a
              href="/student/homeworkspace"
              className="flex flex-col items-center rounded-lg space-y-2 w-full"
            >
              <AssignmentIcon className="text-3xl " />
              <span className="text-sm">แบบฝึกหัด</span>
            </a>
          </li>

          <li>
            <a
              href="/student/profile"
              className="flex flex-col items-center rounded-lg space-y-2 w-full"
            >
              <PermIdentityIcon className="text-3xl" />
              <span className="text-sm">โปรไฟล์</span>
            </a>
          </li>
        </ul>
        {/* bottom */}

        <a className="cursor-pointer flex flex-row justify-center font-bold rounded-lg pb-10 w-full">
          <LogoutIcon className="text-3xl text-white rotate-180" />
        </a>
      </nav>
    </>
  );
}
