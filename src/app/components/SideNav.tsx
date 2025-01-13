// src/app/components/SideNav.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'; // no action DashBoard
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'; // action DashBoard
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'; // no action School
import SchoolIcon from '@mui/icons-material/School'; // action School
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'; //no action Bin
import DeleteIcon from '@mui/icons-material/Delete'; // action Bin

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CodeIcon from "@mui/icons-material/Code";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PlatformIcon from "../assets/CoursesAssets/PlatformIcon.svg";

import { logout } from "../services/auth.service";
import { useRouter } from "next/navigation";

interface SideNavProps {
  role: string; // Accept role as a prop
}

export default function SideNav({ role }: SideNavProps) {
  const router = useRouter();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await logout();
      console.log(response.status);
      if (response.status === 200) {
        router.push("/login");
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 flex flex-col justify-between bg-[#0B111B] text-white w-[120px] h-screen pt-[40px] pr-[16px] pb-[60px] pl-[16px] border-r-2 border-r-[#d7d7d7] border-opacity-10">
      {/* Navigation Links */}
      <ul className="flex flex-col items-center gap-[72px] self-stretch">
        <li>
          <a
            href="/"
            className="flex w-[82px] h-[51px] justify-center items-center"
          >
            <Image className="w-16" src={PlatformIcon} alt=""></Image>
          </a>
        </li>

        <ul className="flex flex-col items-center gap-5 self-stretch ">
        {role === "STUDENT" && (
          <>
            <li>
              <a
                href="/student/courses"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <SpaceDashboardOutlinedIcon className=" text-3xl " />
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
          </>
        )}

        {role === "TEACHER" && (
          <>
            <li>
              <a
                href="/teacher/courses"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <ClassIcon className=" text-3xl " />
                <span className=" text-sm ">คอร์สเรียน</span>
              </a>
            </li>

            <li>
              <a
                href="/teacher/workingspace"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <CodeIcon className="text-3xl " />
                <span className="text-sm">เขียนโปรแกรม</span>
              </a>
            </li>

            <li>
              <a
                href="/teacher/calendar"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <CalendarTodayIcon className="text-3xl" />
                <span className="text-sm">ปฏิทิน</span>
              </a>
            </li>

            <li>
              <a
                href="/teacher/homeworkspace"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <AssignmentIcon className="text-3xl " />
                <span className="text-sm">แบบฝึกหัด</span>
              </a>
            </li>

            <li>
              <a
                href="/teacher/profile"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <PermIdentityIcon className="text-3xl" />
                <span className="text-sm">โปรไฟล์</span>
              </a>
            </li>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <li>
              <a
                href="/admin/dashboard"
                className="flex flex-col items-center rounded-lg space-y-2 w-[88px] h-[72px] pt-[16px] pr-[8px] pb-[12px] pl-[8px]"
              >
                <SpaceDashboardIcon className="text-3xl" />
                <span className=" text-sm ">แดชบอร์ด</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/school"
                className="flex flex-col items-center rounded-lg space-y-2 w-[88px] h-[72px] pt-[16px] pr-[8px] pb-[12px] pl-[8px]"
              >
                <SchoolOutlinedIcon className="text-3xl" />
                <span className=" text-sm ">โรงเรียน</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/profile"
                className="flex flex-col items-center rounded-lg space-y-2 w-[88px] h-[72px] pt-[16px] pr-[8px] pb-[12px] pl-[8px]"
              >
                <DeleteOutlineOutlinedIcon className="text-3xl" />
                <span className="text-sm">ถังขยะ</span>
              </a>
            </li>
          </>
        )}
      </ul>
      </ul>


      <button
        onClick={handleLogout}
        className="cursor-pointer flex justify-center items-center font-bold rounded-lg w-[88px] h-[72px]"
      >
        <LogoutIcon className="text-3xl text-white rotate-180" />
      </button>
    </nav>
  
      

  );
}