"use client";

import React, { ReactNode, useEffect, useState } from "react";
import StudentLayout from "./StudentLayout";
import TeacherLayout from "./TeacherLayout";
import AdminLayout from "./AdminLayout";
import { jwtDecode } from "jwt-decode"; 
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface IJwt {
  username: string;
  role: string;
  schoolId: string;
  iat: number;
  exp: number;
}

interface LayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if the token is present and try to decode it
    if (token) {
      try {
        const decoded = jwtDecode<IJwt>(token);
        setRole(decoded.role); // Set the role in state
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/login"); // Redirect to login on error
      }
    } else {
      router.push("/login"); // Redirect to login if no token is found
    }
  }, [token, router]);

  // Render loading state while checking token
  if (!role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="bg-gray-300 rounded h-8 w-3/4" />
          <div className="bg-gray-300 rounded h-48 w-full" />
          <div className="bg-gray-300 rounded h-8 w-1/2" />
        </div>
      </div>
    );
  }

  // Render layout based on the role
  switch (role) {
    case "STUDENT":
      return <StudentLayout role={role}>{children}</StudentLayout>;
    case "TEACHER":
      return <TeacherLayout role={role}>{children}</TeacherLayout>;
    case "ADMIN":
      return <AdminLayout role={role}>{children}</AdminLayout>;
    default:
      return <div>Invalid role</div>; // Handle invalid role
  }
};

export default UserLayout;
