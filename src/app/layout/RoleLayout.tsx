"use client"

import React, { ReactNode } from "react";
import UserNav from "@/app/components/UserNav";
import SideNav from "@/app/components/SideNav";

interface LayoutProps {
  children: ReactNode;
  role: string;
}

const RoleLayout: React.FC<LayoutProps> = ({ children, role }) => {
  return (
    <div className="flex flex-row">
      <SideNav role={role} />
      <div className="flex flex-col w-screen overflow-x-hidden overscroll-none">
        {children}
      </div>
    </div>
  );
};

export default RoleLayout;