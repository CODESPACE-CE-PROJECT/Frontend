"use client";

import React, { useEffect, useState } from "react";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { getDashboardInfo } from "@/app/services/dashboard.service";
import { IDashboardInfo } from "@/app/types/dashboard";
import { CountInfoCard } from "@/app/components/Dashboard/CountInfoCard";
import { ColumnChart } from "@/app/components/Dashboard/ColumnChart";
import { DonutPie } from "@/app/components/Dashboard/DonutPie";

export default function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState<IDashboardInfo>()
  const [dataSet, setDataSet] = useState<{
    student: number[],
    teacher: number[],
    school: number[],
    month: string[]
  }>({
    student: [],
    teacher: [],
    school: [],
    month: []
  })

  useEffect(() => {
    const fetchData = async () => {
      const response: IDashboardInfo = await getDashboardInfo()
      setDashboardInfo(response)
      setDataSet({
        student: response.months.flatMap((item) => item.student),
        teacher: response.months.flatMap((item) => item.teacher),
        school: response.months.flatMap((item) => item.school),
        month: response.months.flatMap((item) => item.month)
      })
    }

    fetchData()
  }, [])

  return <div className="flex flex-col h-full p-[60px] pt-[40px] text-neutral-50">
    <p className="text-3xl font-semibold mb-[80px]">ภาพรวม</p>
    <div className="flex flex-col gap-y-4 lg:flex-row items-center lg:gap-x-4 w-full ">
      <CountInfoCard title="โรงเรียน" count={`${dashboardInfo?.count.school.toString()} แห่ง`}><LocationCityIcon fontSize="large" /></CountInfoCard>
      <CountInfoCard title="ผู้สอน" count={`${dashboardInfo?.count.teacher.toString()} คน`}><SchoolOutlinedIcon fontSize="large" /> </CountInfoCard>
      <CountInfoCard title="ผู้เรียน" count={`${dashboardInfo?.count.student.toString()} คน`}><PersonOutlineIcon fontSize="large" /></CountInfoCard>
    </div>
    <p className="mt-[80px] text-center text-2xl font-bold">ผู้ใช้งานทั้งหมด {dashboardInfo?.count.totalUser} คน</p>
    <ColumnChart school={dataSet.school} student={dataSet.student} teacher={dataSet.teacher} month={dataSet.month} />
    <div className="flex flex-col gap-y-4 lg:flex-row w-full h-full mt-[80px]">
      <DonutPie  className="self-center"/>
      <table className="w-full">
        <thead className="bg-[#3049724D] h-[61px]">
          <tr className="text-xl">
            <th className="pl-6 rounded-l-xl text-left">จังหวัด</th>
            <th className="rounded-r-xl">โรงเรียน</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-lg h-10">
            <td className="pl-6">กรุงเทพมหานคร</td>
            <td className="text-center">2</td>
          </tr>
           <tr className="text-lg h-10">
            <td className="pl-6">กาญจนบุรี</td>
            <td className="text-center">1</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>;
}
