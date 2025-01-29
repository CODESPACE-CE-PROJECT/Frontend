"use client";

import React, { useEffect, useState } from "react";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { getDashboardInfo } from "@/app/services/dashboard.service";
import { IDashboardInfo } from "@/app/interfaces/dashboard.interface";

export default function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState<IDashboardInfo>()

  useEffect(() => {

    const fetchData = async () => {
      const response: IDashboardInfo = await getDashboardInfo()
      console.log(response)
      setDashboardInfo(response) 
    }

    fetchData()
  }, [])
  
  return (
    <>
      <div className="flex flex-col items-center gap-[80px] self-stretch pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen bg-[#0B111B]">
        <span className="flex w-full p-[10px] text-3xl  text-neutral-50">ภาพรวม</span>
        {/* container card */}
        <div className="flex flex-col items-center justify-center gap-4 self-stretch lg:flex-row">
          <div className="flex items-center justify-center gap-[16px] relative w-full h-32 ">
            {/* School Card */}
            <div className="flex items-center gap-9 p-6 rounded-xl bg-[#304972] bg-opacity-30  w-[550px] h-[128px]">
              <div className="flex items-center justify-center w-20 h-20 px-1 rounded-full bg-[#0B111B]">
                <LocationCityIcon className="text-neutral-50" fontSize="large"/>
              </div>
              <div className="flex flex-col gap-1">
                <span className=" text-sm text-neutral-50">โรงเรียน</span>
                <span className=" text-sm text-neutral-50">{dashboardInfo?.count.school}</span>
              </div>
            </div>
          </div>
          {/* Teacher card */}
          <div className="flex items-center justify-center gap-[16px] relative w-full h-32 ">
            <div className="flex items-center gap-9 p-6 rounded-xl bg-[#304972] bg-opacity-30  w-[550px] h-[128px]">
              <div className="flex items-center justify-center w-20 h-20 px-1 rounded-full bg-[#0B111B]">
                <SchoolOutlinedIcon className=" text-neutral-50" fontSize="large" />
              </div>
              <div className="flex flex-col gap-1">
                <span className=" text-sm text-neutral-50">ผู้สอน</span>
                <span className=" text-sm text-neutral-50">{dashboardInfo?.count.teacher}</span>
              </div>
            </div>
          </div>
          {/* Student Card */}
          <div className="flex items-center justify-center gap-[16px] relative w-full h-32 ">
            <div className="flex items-center gap-9 p-6 rounded-xl bg-[#304972] bg-opacity-30  w-[550px] h-[128px]">
              <div className="flex items-center justify-center w-20 h-20 px-1 rounded-full bg-[#0B111B]">
                <PersonOutlineIcon className="text-neutral-50" fontSize="large"/>
              </div>
              <div className="flex flex-col gap-1">
                <span className=" text-sm text-neutral-50">ผู้เรียน</span>
                <span className=" text-sm text-neutral-50">{dashboardInfo?.count.student}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
