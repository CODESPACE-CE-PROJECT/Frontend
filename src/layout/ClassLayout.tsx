"use client";

import React, { ReactNode } from "react";
import ClassRoomNav from "@/components/Navbar/ClassRoomNav";

interface LayoutProps {
  children: ReactNode;
  id: string;
}

const ClassLayout: React.FC<LayoutProps> = ({ children}) => {
  return (
    <div className="flex flex-row overflow-y-hidden overscroll-none">
      <ClassRoomNav/>
      <div className="text-[#FAFAFA] my-10 mx-[3.75rem] h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default ClassLayout;
