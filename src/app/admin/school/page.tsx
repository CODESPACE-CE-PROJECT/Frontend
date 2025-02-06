"use client";

import React, { useEffect, useState } from "react";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ISchool } from "@/app/types/school";
import { getAllSchool } from "@/app/services/school.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OptionSchool } from "@/app/components/Options/OptionSchool";

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
      console.log(response)
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
          <div className="flex gap-x-4 w-full">
            <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto focus-within:border-blue-300">
              <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
              <input type="text" className="text-[18px] text-neutral-50 bg-transparent outline-none w-full" placeholder="ค้นหา" onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* Button */}
            <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-md bg-[#5572FA] w-auto cursor-pointer hover:bg-blue-300" onClick={() => router.push("/admin/school/schooladd")}>
              <AddRoundedIcon className="text-neutral-50 w-6 h-6" />
              <span className="text-[16px] text-neutral-50">เพิ่มโรงเรียน</span>
            </div>
          </div>

          <div className="w-full h-full">
            <table className="table-auto w-full border-collapse text-neutral-50">
              <thead>
                <tr className="bg-[#304972] bg-opacity-30 text-[18px]">
                  <th className="text-start px-6 py-3 rounded-l-md !font-normal truncate">ชื่อ</th>
                  <th className="text-start px-6 py-3 !font-normal truncate">ที่ตั้ง</th>
                  <th className="px-6 py-3 !font-normal truncate">ผู้สอน</th>
                  <th className="px-6 py-3 !font-normal truncate">ผู้เรียน</th>
                  <th className="px-6 py-3 rounded-r-md !font-normal"></th>
                </tr>
              </thead>

              <tbody className="text-base">
                {/* data in Table */}
                <tr>
                  <td className="h-6" />
                </tr>
                {
                  schools?.map((school) => <tr key={school.schoolId} className="justify-center">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5 truncate cursor-pointer" onClick={() => router.push(`/admin/school/${school.schoolId}`)}>
                        <Image
                          src={school.pictureUrl}
                          alt="school logo"
                          className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] object-cover"
                          width={100}
                          height={100}
                          priority={true}
                        />
                        <span className="truncate">{school.schoolName}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[16px] truncate">
                      {school.address} {school.subDistrict} {school.district} {school.province} {school.postCode}
                    </td>
                    <td className="text-center">{school.count.teacher}</td>
                    <td className="px-6 py-4 text-center">{school.count.student}</td>
                    <td className="flex w-full h-[92px] items-center justify-center">
                      <OptionSchool />
                    </td>
                  </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}