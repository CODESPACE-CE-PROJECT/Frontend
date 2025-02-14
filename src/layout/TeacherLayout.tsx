"use client"

import React, { ReactNode } from "react";
import Logo from '@/assets/Login/logo.svg'
import Image from "next/image";
import Link from 'next/link'
import { NavItem } from "../components/Navbar/NavItem";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CodeIcon from '@mui/icons-material/Code';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "@/actions/auth";
import { useRouter } from 'next/navigation'
import { NotifyType } from "@/enum/enum";
import { notify, updateNotify } from "@/utils/toast.util";
import ClassRoomNav from "@/components/Navbar/ClassRoomNav";


interface Props {
  children: ReactNode
}

export const TeacherLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleLogout = async () => {
    const id = notify(NotifyType.LOADING, "กำลังออกจากระบบ")
    const { status } = await logout()

    if (id !== undefined) {
      if (status === 200) {
        updateNotify(id, NotifyType.SUCCESS, "ออกจากระบบเสร็จสมบูรณ์")
      } else {
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการออกจากระบบ")
      }
    }
    router.push("/login")
  }


  return <div className="flex flex-col md:flex-row md:w-full overflow-x-hidden overscroll-none">
    <nav className="flex flex-col gap-y-10 xl:gap-y-20 p-3 px-3 pt-8 items-center justify-start md:w-[9vw] md:h-[100vh] border-transparent md:border-r-border-page border-[1px]">
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
          <NavItem text="คอร์สเรียน" href="/teacher/course">
            <LibraryBooksIcon fontSize="large" />
          </NavItem>

          <NavItem text="เขียนโปรแกรม" href="/teacher/editor">
            <CodeIcon fontSize="large" />
          </NavItem>

          <NavItem text="ปฏิทิน" href="/teacher/calendar">
            <DateRangeIcon fontSize="large" />
          </NavItem>

          <NavItem text="โรงเรียน" href="/teacher/school">
            <SchoolIcon fontSize="large" />
          </NavItem>
        </div>

        <div className="text-center mb-10 px-4 py-3 hover:bg-hover-navbar rotate-180 rounded-lg" onClick={handleLogout}>
          <LogoutIcon fontSize="large" />
        </div>
      </div>

    </nav>

    <div className="flex flex-row w-screen overflow-x-hidden overscroll-none">
        <ClassRoomNav />
        {/* ClassRoomNav ยังเปิด/ปิดไม่ได้ เดี๋ยวมาแก้ให้ */}
        <div className="flex flex-col p-10 w-screen h-screen">{children}</div>
      </div>

    
  </div>;
};