"use client";

import React, { ReactNode } from "react";
import ClassRoomNav from "@/app/components/ClassRoomNav";
import Cookies from "js-cookie"; // Import js-cookie
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import UserNav from "@/app/components/UserNav";
import { Role } from "@/app/enum/enum";

interface IJwt {
  role: Role;
}

interface LayoutProps {
  children: ReactNode;
  id: string;
}

const ClassLayout: React.FC<LayoutProps> = ({ children, id }) => {
  // Get the token from cookies
  const token = Cookies.get("accessToken");

  let role: Role | null = null ; // Set a default role to null

  if (token) {
    try {
      const decoded = jwtDecode<IJwt>(token);
      role = decoded.role; // Extract the role from the decoded token
    } catch (error) {
      console.error("Error decoding token:", error);
      // Optionally handle the error case here
    }
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
