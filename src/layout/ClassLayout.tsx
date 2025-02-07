"use client";

import React, { ReactNode } from "react";
import ClassRoomNav from "@/components/Navbar/ClassRoomNav";
import { Role } from "@/enum/enum";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
  id: string;
}

const ClassLayout: React.FC<LayoutProps> = ({ children, id }) => {
  const pathname = usePathname();

  const role: Role = /^\/student(\/|$)/.test(pathname)
    ? Role.STUDENT
    : /^\/teacher(\/|$)/.test(pathname)
    ? Role.TEACHER
    : /^\/admin(\/|$)/.test(pathname)
    ? Role.ADMIN
    : Role.STUDENT;

  return (
    <div className="flex flex-row overflow-y-hidden overscroll-none">
      <ClassRoomNav id={id} role={role} />
      <div className="text-[#FAFAFA] my-10 mx-[3.75rem] h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default ClassLayout;
