"use client"

import React, { ReactNode } from "react";
import Logo from '@/assets/Login/logo.svg'
import Image from "next/image";
import Link from 'next/link'
import { NavItem } from "../components/Navbar/NavItem";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CodeIcon from '@mui/icons-material/Code';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "@/actions/auth";
import { toast } from 'react-toastify'
import {useRouter} from 'next/navigation'
import { TopNav } from "../components/Navbar/TopNav";

interface Props {
  children: ReactNode
}

export const StudentLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleLogout = async () => {
    toast.promise(logout(), {
      pending: 'กำลังออกจากระบบ',
      success: 'ออกจากระบบเสร็จสมบูรณ์',
      error: 'เกิดข้อผิดผลาดในการออกจากระบบ'
    },{
      position: 'top-center'
    }).then(() => router.push('/'))
  }

  return <div className="flex flex-col md:flex-row md:w-screen overflow-x-hidden overscroll-none">
    <nav className="flex flex-col gap-y-10 xl:gap-y-20 p-3 px-3 pt-8 items-center justify-start md:w-[8vw] md:h-[100vh] border-transparent  md:border-r-border-page border-[1px]">
      <Link href={"/"}>
        <Image
          src={Logo}
          alt="logo"
          width={60}
          height={60}
        />
      </Link>

      <div className="flex flex-col flex-grow justify-between w-full">
          <div className="flex flex-col gap-y-4">
            <NavItem text="คอร์สเรียน" href="/student/courses">
              <LibraryBooksIcon fontSize="large" />
            </NavItem>

            <NavItem text="เขียนโปรแกรม" href="/student/workingspace">
              <CodeIcon fontSize="large" />
            </NavItem>

            <NavItem text="ปฏิทิน" href="/student/calendar">
              <DateRangeIcon fontSize="large" />
            </NavItem>

          </div>

          <div className="text-center mb-10 px-4 py-3 hover:bg-hover-navbar rounded-lg" onClick={handleLogout}>
              <LogoutIcon fontSize="large" />
          </div>
        </div>

    </nav>

    <div className="flex flex-col m-10 w-screen overflow-x-hidden overscroll-none">
      <TopNav />
      {children}
    </div>
  </div>;
};