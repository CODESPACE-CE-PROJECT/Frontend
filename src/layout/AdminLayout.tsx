"use client"

import React, { ReactNode } from "react";
import Logo from '@/assets/Login/logo.svg'
import Image from "next/image";
import Link from 'next/link'
import { NavItem } from "../components/Navbar/NavItem";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "@/actions/auth";
import SchoolIcon from '@mui/icons-material/School';
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode
}

export const AdminLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleLogout = async () => {
    const id = notify(NotifyType.LOADING, "กำลังออกจากระบบ")
    const {status} = await logout()
  
    if(id !== undefined){
      if(status === 200){
        updateNotify(id, NotifyType.SUCCESS, "ออกจากระบบเสร็จสมบูรณ์")
      }else{
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการออกจากระบบ")
      }
    }
    router.push("/login")
  }

  return <div className="flex flex-col md:flex-row h-screen md:w-full overflow-x-hidden overscroll-none">
    <nav className="flex flex-col gap-y-10 xl:gap-y-20 p-3 px-3 pt-8 items-center justify-start md:w-[8vw] md:h-[100vh] border-transparent md:border-r-border-page border-[1px]">
      <Link href={"/"}>
        <Image
          src={Logo}
          alt="logo"
          width={60}
          height={60}
        />
      </Link>

      <div className="flex flex-col flex-grow justify-between w-full h-full">
          <div className="flex flex-col gap-y-4">
            <NavItem text="แดชบอร์ด" href="/admin/dashboard">
              <SpaceDashboardIcon fontSize="large" />
            </NavItem>

            <NavItem text="โรงเรียน" href="/admin/school">
              <SchoolIcon fontSize="large" />
            </NavItem>

            <NavItem text="ถังขยะ" href="/admin/trash">
              <DeleteIcon fontSize="large" />
            </NavItem>

          </div>

          <div className="text-center mb-10 px-4 py-3 hover:bg-hover-navbar rounded-lg rotate-180" onClick={handleLogout}>
              <LogoutIcon fontSize="large" />
          </div>
      </div>

    </nav>

    <div className="flex flex-col w-full overflow-x-hidden overscroll-none">
      {children}
    </div>
  </div>;
};