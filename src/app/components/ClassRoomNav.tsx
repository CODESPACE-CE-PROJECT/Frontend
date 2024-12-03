"use client";

import React from "react";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GenClass101 from "@/app/assets/CoursesAssets/GenClass101.svg";
import Link from "next/link"; // Import Link for client-side navigation

interface ClassRoomNavProps {
  id: string;
  role: string;
}

const commonLinks = (id: string, role: string) => (
  <>
    <li className="pl-10 flex flex-row">
      <Link href={`/${role.toLowerCase()}/courses`} className="flex items-center">
        <ArrowBackIosIcon className="text-2xl" />
        <p className="font-medium">คอร์สเรียน</p>
      </Link>
    </li>
    <Image className="pl-10 my-5" src={GenClass101} alt="Classroom Image" />
    <li className="z-0 pl-10 py-1 hover:bg-[#2B3245] cursor-pointer">
      <Link href={`/${role.toLowerCase()}/courses/${id}/general`} className="flex items-center">
        ทั่วไป
      </Link>
    </li>
    <li className="pl-10 py-1 hover:bg-[#2B3245] cursor-pointer">
      <Link href={`/${role.toLowerCase()}/courses/${id}/assignment`} className="flex items-center">
        การบ้าน
      </Link>
    </li>
    <li className="pl-10 py-1 hover:bg-[#2B3245] cursor-pointer">
      <Link href={`/${role.toLowerCase()}/courses/${id}/score`} className="flex items-center">
        คะแนน
      </Link>
    </li>
    <li className="pl-10 py-1 hover:bg-[#2B3245] cursor-pointer">
      <Link href={`/${role.toLowerCase()}/courses/${id}/people`} className="flex items-center">
        สมาชิก
      </Link>
    </li>
  </>
);

export default function ClassRoomNav({ id, role }: ClassRoomNavProps) {
  return (
    <ul className="flex flex-col text-lg text-[#FAFAFA] gap-y-3 pt-5 w-1/5 h-screen">
      {role === "STUDENT" || role === "TEACHER" ? commonLinks(id, role) : null}

      {role === "ADMIN" && (
        <li className="pl-10 py-1 hover:bg-[#2B3245] cursor-pointer">
          <Link href={`/admin/courses/${id}/people`} className="flex items-center">
            สมาชิก
          </Link>
        </li>
      )}
    </ul>
  );
}
