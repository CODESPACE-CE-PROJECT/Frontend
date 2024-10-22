"use client";

import React, { ReactNode } from "react";
import ClassRoomNav from "@/app/components/ClassRoomNav";
import Cookies from "js-cookie"; // Import js-cookie
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

interface IJwt {
  role: string;
}

interface LayoutProps {
  children: ReactNode;
  id: string;
}

const ClassLayout: React.FC<LayoutProps> = ({ children, id }) => {
  // Get the token from cookies
  const token = Cookies.get("accessToken");

  let role = ""; // Initialize role variable

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
    <div className="flex flex-row">
      <ClassRoomNav id={id} role={role} /> {/* Pass role to ClassRoomNav */}
      <div className="text-[#FAFAFA] h-full w-full shadow-[-10px_0px_10px_-5px_rgba(0,0,0,0.3)]">
        {children}
      </div>
    </div>
  );
};

export default ClassLayout;
