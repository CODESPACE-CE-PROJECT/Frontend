// src/app/components/SideNav.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import SchoolIcon from '@mui/icons-material/School'; // action School
import ClassIcon from "@mui/icons-material/Class";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CodeIcon from "@mui/icons-material/Code";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import PlatformIcon from "../assets/CoursesAssets/PlatformIcon.svg";
import { logout } from "../services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface SideNavProps {
  role: string; // Accept role as a prop
}

export default function SideNav({ role }: SideNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await logout();
      if (response?.status === 200) {
        router.push("/login");
      } else {
        console.log("Unexpected status code:", response?.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 flex flex-col justify-between border-r-[1px] border-[#D7D7D71A] bg-[#0B111B] text-white w-[7vw] h-screen">
      {/* Navigation Links */}
      <ul className="space-y-10 mt-10 mx-4">
        <li>
          <Link
            href="/"
            className="flex w-[82px] h-[51px] justify-center items-center"
          >
            <Image className="w-16" src={PlatformIcon} alt=""></Image>
          </Link>
        </li>

        <ul className="flex flex-col gap-y-5 items-stretch">
        {role === "STUDENT" && (
          <>
            <li>
              <Link
                href="/student/courses"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/courses") ? "bg-[#0E2244]" : ""
                }`}
              >
                <ClassIcon className=" text-3xl " />
                <p className=" text-sm text-center text-nowrap">คอร์สเรียน</p>
              </Link>
            </li>

            <li>
              <Link
                href="/student/workingspace"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/workingspace") ? "bg-[#0E2244]" : ""
                }`}
              >
                <CodeIcon className="text-3xl " />
                <p className="text-sm text-center text-nowrap">เขียนโปรแกรม</p>
              </Link>
            </li>

            <li>
              <Link
                href="/student/calendar"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/calendar") ? "bg-[#0E2244]" : ""
                }`}
              >
                <CalendarTodayIcon className="text-3xl" />
                <p className="text-sm text-center text-nowrap">ปฏิทิน</p>
              </Link>
            </li>
          </>
        )}

        {role === "TEACHER" && (
          <>
            <li>
              <Link
                href="/teacher/courses"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/courses") ? "bg-[#0E2244]" : ""
                }`}
              >
                <ClassIcon className=" text-3xl " />
                <span className=" text-sm text-center text-nowrap">
                  คอร์สเรียน
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/teacher/workingspace"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/workingspace") ? "bg-[#0E2244]" : ""
                }`}
              >
                <CodeIcon className="text-3xl " />
                <span className="text-sm text-center text-nowrap">
                  เขียนโปรแกรม
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/teacher/calendar"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/calendar") ? "bg-[#0E2244]" : ""
                }`}
              >
                <CalendarTodayIcon className="text-3xl" />
                <span className="text-sm text-center text-nowrap">ปฏิทิน</span>
              </Link>
            </li>

            <li>
              <Link
                href="/teacher/school"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/school") ? "bg-[#0E2244]" : ""
                }`}
              >
                <PermIdentityIcon className="text-3xl" />
                <span className="text-sm text-center text-nowrap">
                  โรงเรียน
                </span>
              </Link>
            </li>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <li>
              <Link
                href="/admin/dashboard"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/dashboard") ? "bg-[#0E2244]" : ""
                }`}
              >
                <ClassIcon className="text-3xl" />
                <span className=" text-sm text-center text-nowrap">
                  แดชบอร์ด
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/school"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/school") ? "bg-[#0E2244]" : ""
                }`}
              >
                <SchoolIcon className="text-3xl" />
                <span className=" text-sm text-center text-nowrap">
                  โรงเรียน
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/bin"
                className={`flex flex-col items-center rounded-lg space-y-2 w-full px-2 pb-3 pt-4 ${
                  pathname.includes("/bin") ? "bg-[#0E2244]" : ""
                }`}
              >
                <PermIdentityIcon className="text-3xl" />
                <span className="text-sm text-center text-nowrap">ถังขยะ</span>
              </Link>
            </li>
          </>
        )}
      </ul>
      </ul>
      <button
        onClick={handleLogout}
        className="cursor-pointer flex flex-row justify-center font-bold rounded-lg mb-16 w-full"
      >
        <LogoutIcon className="text-3xl text-white rotate-180" />
      </button>
    </nav>

  );
}