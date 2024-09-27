// student/StudentLayout.tsx
import React, { ReactNode } from "react";

import UserNav from "@/app/components/UserNav";
import SideNav from "@/app/components/SideNav";

interface LayoutProps {
  children: ReactNode;
}

const StudentLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="flex flex-row">
        <SideNav />
        <div className="flex flex-col w-screen overflow-x-hidden overscroll-none">
          <UserNav />
          <>{children}</>
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
