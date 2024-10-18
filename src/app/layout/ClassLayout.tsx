// src/app/layout/ClassLayout.tsx
import React, { ReactNode } from "react";
import ClassRoomNav from "@/app/components/ClassRoomNav";

interface LayoutProps {
  children: ReactNode;
  id: string; // Accept id as a prop
}

const ClassLayout: React.FC<LayoutProps> = ({ children, id }) => {
  return (
    <div className="flex flex-row">
      <ClassRoomNav id={id} /> {/* Pass id to ClassRoomNav */}
      <div className="text-[#FAFAFA] h-full w-full shadow-[-10px_0px_10px_-5px_rgba(0,0,0,0.3)]">
        {children}
      </div>
    </div>
  );
};

export default ClassLayout;
  