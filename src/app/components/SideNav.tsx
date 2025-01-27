// src/app/components/SideNav.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import ClassIcon from "@mui/icons-material/Class";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CodeIcon from "@mui/icons-material/Code";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PlatformIcon from "../assets/CoursesAssets/PlatformIcon.svg";
import SchoolIcon from '@mui/icons-material/School';
import { logout } from "../services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <nav className="sticky top-0 flex flex-col justify-between border-r-[1px] border-[#D7D7D71A] bg-[#0B111B] text-white w-[6vw] h-screen">
      {/* Navigation Links */}
      <ul className="space-y-10 mt-8">
        <li>
          <Link
            href="/"
            className="flex flex-col items-center rounded-lg space-y-2 w-full"
          >
            <Image className="w-16" src={PlatformIcon} alt=""></Image>
          </Link>
        </li>

        {role === "STUDENT" && (
          <>
            <li>
              <Link
                href="/student/courses"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <ClassIcon className=" text-3xl " />
                <span className=" text-sm text-center">คอร์สเรียน</span>
              </Link>
            </li>

            <li>
              <Link
                href="/student/workingspace"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <CodeIcon className="text-3xl " />
                <span className="text-sm text-center">เขียนโปรแกรม</span>
              </Link>
            </li>

            <li>
              <Link
                href="/student/calendar"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <CalendarTodayIcon className="text-3xl" />
                <span className="text-sm text-center">ปฏิทิน</span>
              </Link>
            </li>

            <li>
              <Link
                href="/student/homeworkspace"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <AssignmentIcon className="text-3xl " />
                <span className="text-sm text-center">แบบฝึกหัด</span>
              </Link>
            </li>

            <li>
              <Link
                href="/student/profile"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <PermIdentityIcon className="text-3xl" />
                <span className="text-sm text-center">โปรไฟล์</span>
              </Link>
            </li>
          </>
        )}

        {role === "TEACHER" && (
          <>
            <li>
              <Link
                href="/teacher/courses"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <ClassIcon className=" text-3xl " />
                <span className=" text-sm text-center">คอร์สเรียน</span>
              </Link>
            </li>

            <li>
              <Link
                href="/teacher/workingspace"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <CodeIcon className="text-3xl " />
                <span className="text-sm text-center">เขียนโปรแกรม</span>
              </Link>
            </li>

            <li>
              <Link
                href="/teacher/calendar"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <CalendarTodayIcon className="text-3xl" />
                <span className="text-sm text-center">ปฏิทิน</span>
              </Link>
            </li>

            <li>
              <Link
                href="/teacher/homeworkspace"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <AssignmentIcon className="text-3xl " />
                <span className="text-sm text-center">แบบฝึกหัด</span>
              </Link>
            </li>

            <li>
              <Link
                href="/teacher/profile"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <PermIdentityIcon className="text-3xl" />
                <span className="text-sm text-center">โปรไฟล์</span>
              </Link>
            </li>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <li>
              <Link
                href="/admin/dashboard"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <ClassIcon className="text-3xl" />
                <span className=" text-sm text-center">แดชบอร์ด</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/school"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <SchoolIcon className="text-3xl" />
                <span className=" text-sm text-center">โรงเรียน/สถาบัน</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/profile"
                className="flex flex-col items-center rounded-lg space-y-2 w-full"
              >
                <PermIdentityIcon className="text-3xl" />
                <span className="text-sm text-center">โปรไฟล์</span>
              </Link>
            </li>
          </>
        )}
      </ul>

      <button
        onClick={handleLogout}
        className="cursor-pointer flex flex-row justify-center font-bold rounded-lg pb-10 w-full"
      >
        <LogoutIcon className="text-3xl text-white rotate-180" />
      </button>
    </nav>
  );
}
