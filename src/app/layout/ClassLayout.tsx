"use client";

import React, { ReactNode } from "react";
import ClassRoomNav from "@/app/components/ClassRoomNav";
import Cookies from "js-cookie"; // Import js-cookie
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import UserNav from "@/app/components/UserNav";
import { Role } from "@/app/enum/enum";
import { usePathname } from "next/navigation";

interface IJwt {
  role: Role;
}

interface LayoutProps {
  children: ReactNode;
  id: string;
}

const ClassLayout: React.FC<LayoutProps> = ({ children, id }) => {
  const pathname = usePathname();
  let role: Role | null = null;

  switch (true) {
    case /^\/student(\/|$)/.test(pathname):
      role = Role.STUDENT;
      break;
    case /^\/teacher(\/|$)/.test(pathname):
      role = Role.TEACHER; 
      break;
    case /^\/admin(\/|$)/.test(pathname):
      role = Role.ADMIN;
      break;
    default:
      role = null;
  }

  return (
    <div className="flex flex-row overflow-y-hidden overscroll-none">
      <ClassRoomNav  id={id} role={role} />
      <div className="text-[#FAFAFA] my-10 mx-[3.75rem] h-full w-full">
        <UserNav role={role}/>
        {children}
      </div>
    </div>
  );
};

export default ClassLayout;
