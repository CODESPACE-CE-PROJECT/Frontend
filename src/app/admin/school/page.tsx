"use client";

import React, { useEffect, useState } from "react";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { ISchool } from "@/app/interfaces/school.interface";
import { getAllSchool } from "@/app/services/school.service";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function School() {
  const [schools, setSchools] = useState<ISchool[]>()
  const [schoolsData, setSchoolsDate] = useState<ISchool[]>()
  const [search, setSearch] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const fetchSchools = async () => {
      const response: ISchool[] = await getAllSchool()
      setSchoolsDate(response)
      setSchools(response)
    }
    fetchSchools()
  }, [])

  useEffect(() => {
    setSchools(schoolsData?.filter((school) => school.schoolName.toLowerCase().includes(search)))
  }, [search, schoolsData])

  return (
    <>
      <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen bg-[#0B111B]">
        <span className="flex w-full p-[10px] text-3xl  text-neutral-50">โรงเรียน</span>

        {/* container Search and Button */}
        <div className="flex-col contents self-stretch gap-[36px] w-full lg:flex-row">

          {/* Search */}
          <div className="flex gap-9 self-stretch">
            <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto focus-within:border-[#5572FA]">
                <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
                <input type="text" className="text-[18px] text-neutral-50 bg-transparent outline-none w-full" placeholder="ค้นหา" onChange={(e) => setSearch(e.target.value)} />
            </div> 

            {/* Button */}
            <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-md bg-[#5572FA] w-auto cursor-pointer hover:bg-blue-300" onClick={() => router.push("/admin/school/schooladd")}>
              <AddRoundedIcon className="text-neutral-50 w-6 h-6" />
              <span className="text-[16px] text-neutral-50">เพิ่มโรงเรียน</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 self-stretch">
            <div className="flex items-center gap-2.5 p-2 px-6 rounded-md self-stretch bg-[#304972] bg-opacity-30">
              <span className="flex w-[540px] h-[45px] items-center gap-5 text-[18px]	text-neutral-50">ชื่อ</span>
              <span className="flex w-[658px] h-[45px] items-center gap-5 text-[18px]	text-neutral-50">ที่ตั้ง</span>
              <span className="flex w-[170px] h-[45px] justify-center items-center gap-5 text-[18px]	text-neutral-50">ผู้สอน</span>
              <span className="flex w-[170px] h-[45px] justify-center items-center gap-5 text-[18px]	text-neutral-50">ผู้เรียน</span>
              <span className="flex w-[36px] h-[45px] items-center gap-5text-[18px]	text-neutral-50"></span>
            </div>

            {/* card data school */}

            {
              schools?.map((school) => {
                return <div key={school.schoolId} className="flex flex-col items-start gap-6 self-stretch w-full">
                  <div className="flex flex-row items-center gap-2.5 p-2 px-6 rounded-md justify-evenly">
                    <span className="flex flex-row w-[540px] h-[60px] items-center gap-5 text-[18px]	text-neutral-50 cursor-pointer" onClick={() => router.push(`/admin/school/${school.schoolId}`)}>
                      <Image src={school?.pictureUrl} alt="icon" className="w-[80px] h-[80px] object-cover" width={100} height={100} />
                      {school.schoolName}
                    </span>
                    <span className="flex w-[658px] h-[60px] items-center gap-5 text-[14px]	text-neutral-50">{school.address} {school.district} {school.subDistrict} {school.province} {school.postCode}</span>
                    <span className="flex w-[170px] h-[60px] justify-center items-center gap-5 text-[20px]	text-neutral-50">{school.count.teacher}</span>
                    <span className="flex w-[170px] h-[60px] justify-center items-center gap-5 text-[20px]	text-neutral-50">{school.count.student}</span>
                    <div className="flex items-center justify-center h-9 w-9 rounded-md border border-[#2A3A50]">
                      <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                    </div>
                  </div>
                </div>
              })
            }

          </div>
        </div>
      </div>
    </>
  );
}
