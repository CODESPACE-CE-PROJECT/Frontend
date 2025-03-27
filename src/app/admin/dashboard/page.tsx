"use client";

import React, { useEffect, useState } from "react";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { getDashboardInfo } from "@/actions/dashboard";
import { IDashboardInfo } from "@/types/dashboard";
import { CountInfoCard } from "@/components/Dashboard/CountInfoCard";
import { ColumnChart } from "@/components/Dashboard/ColumnChart";
import { DonutPie } from "@/components/Dashboard/DonutPie";
import { Loading } from "@/components/Loading/Loading";
import { ProvinceTable } from "@/components/Table/ProvinceTable";

export default function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState<IDashboardInfo>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
      setIsLoading(true)
      try {
        const response: IDashboardInfo = await getDashboardInfo()
        setDashboardInfo(response)
        setDataSet({
          student: response.months.flatMap((item) => item.student),
          teacher: response.months.flatMap((item) => item.teacher),
          school: response.months.flatMap((item) => item.school),
          month: response.months.flatMap((item) => item.month)
        })
      } catch (error) {

      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    isLoading ? (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loading className="size-20" />
      </div>
    ) : (
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-y-4 lg:flex-row items-center lg:gap-x-4 w-full ">
          <CountInfoCard title="โรงเรียน" count={`${dashboardInfo?.count.school.toString()} แห่ง`}><LocationCityIcon fontSize="large" /></CountInfoCard>
          <CountInfoCard title="ผู้สอน" count={`${dashboardInfo?.count.teacher.toString()} คน`}><SchoolOutlinedIcon fontSize="large" /> </CountInfoCard>
          <CountInfoCard title="ผู้เรียน" count={`${dashboardInfo?.count.student.toString()} คน`}><PersonOutlineIcon fontSize="large" /></CountInfoCard>
        </div>
        <p className="mt-[80px] text-center text-2xl font-bold">ผู้ใช้งานทั้งหมด {dashboardInfo?.count.totalUser} คน</p>
        <ColumnChart school={dataSet.school} student={dataSet.student} teacher={dataSet.teacher} month={dataSet.month} />
        <div className="flex flex-col gap-y-4 lg:flex-row w-full h-full mt-[80px]">
          <DonutPie className="self-center" province={dashboardInfo?.province}/>
          <ProvinceTable provinces={dashboardInfo?.province}/>
        </div>
      </div>
    ));
}