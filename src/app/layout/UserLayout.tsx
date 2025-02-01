"use client";

import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import RoleLayout from "./RoleLayout";
import { Role } from "@/app/enum/enum";

interface LayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
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
      router.push("/login"); // Redirect to login if role is unknown
      return null;
  }

  return <RoleLayout role={role}>{children}</RoleLayout>;
};

export default UserLayout;
