"use client";

import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ClassRoomNavProps {
  id: string;
  role: string;
}

const commonLinks = (id: string, role: string, pathname: string) => (
  <>
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
          การบ้าน
        </Link>
      </li>
      <li
        className={`px-8 py-4 rounded-md ${
          pathname.includes("/score") ? "bg-[#3049724D]" : ""
        } hover:bg-[#3049724D] cursor-pointer`}
      >
        <Link
          href={`/${role.toLowerCase()}/courses/${id}/score`}
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
    </div>
  </>
);

export default function ClassRoomNav({ id, role }: ClassRoomNavProps) {
  const pathname = usePathname();
  return (
    <div className="border-r-[1px] border-[#D7D7D71A] w-1/4">
      <ul className="flex flex-col text-lg text-[#FAFAFA] mt-10 mx-8 h-[calc(100vh-2.5rem)]">
        {role === "STUDENT" || role === "TEACHER"
          ? commonLinks(id, role, pathname)
          : null}

        {role === "ADMIN" && (
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
        )}
      </ul>
    </div>
  );
}
