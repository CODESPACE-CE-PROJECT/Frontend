import { useState } from "react";
import ClassIcon from "@mui/icons-material/Class";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CodeIcon from "@mui/icons-material/Code";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from "@mui/icons-material/Logout";

import AssignmentIcon from '@mui/icons-material/Assignment';

interface SideNavProps {
  isVisible: boolean;
  toggleSideNav: () => void;
}

export default function SideNav({ isVisible, toggleSideNav }: SideNavProps) {
  return (
    <>
      <nav
        className={` absolute z-20 h-full flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } bg-gray-800 text-white border-r-2 border-[#E1E1E1] w-[5vw] pt-10`}
      >
        {/* Navigation Links */}
        <ul className=" space-y-10 mt-8">
          <li>
            <a
              href="/courses"
              className="flex flex-col items-center rounded-lg space-y-2 w-full"
            >
              <ClassIcon className=" text-3xl " />
              <span className=" text-sm ">คอร์สเรียน</span>
            </a>
          </li>

          <li>
            <a
              href="/workingspace"
              className="flex flex-col items-center rounded-lg space-y-2 w-full"
            >
              <CodeIcon className="text-3xl " />
              <span className="text-sm">เขียนโปรแกรม</span>
            </a>
          </li>

          <li>
            <a
              href="/calendar"
              className="flex flex-col items-center rounded-lg space-y-2 w-full"
            >
              <CalendarTodayIcon className="text-3xl" />
              <span className="text-sm">ปฏิทิน</span>
            </a>
          </li>

          <li>
            <a className="flex flex-col items-center rounded-lg space-y-2 w-full">
              <AssignmentIcon className="text-3xl " />
              <span className="text-sm">แบบฝึกหัด</span>
            </a>
          </li>

          <li>
            <a className="flex flex-col items-center rounded-lg space-y-2 w-full">
              <PermIdentityIcon className="text-3xl" />
              <span className="text-sm">โปรไฟล์</span>
            </a>
          </li>
        </ul>
        {/* bottom */}

        <a className="flex flex-row items-center font-bold rounded-lg space-x-3 p-3 pb-10 w-full">
          <LogoutIcon className="text-3xl text-[#9A9AB0]" />
          <span>Log out</span>
        </a>
      </nav>
    </>
  );
}
