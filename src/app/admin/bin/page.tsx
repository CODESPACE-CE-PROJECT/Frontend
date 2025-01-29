"use client";

import React, { useEffect, useState } from "react";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { getSchoolBinInfo } from "@/app/services/school.service";
import { ISchools, ISchoolBin } from "@/app/interfaces/school.interface";
import Image from "next/image";
import { Role } from "@/app/enum/enum";
import Profiler from "@/app/assets/setting/Profileuser.svg";
import { IProfile } from "@/app/interfaces/user.interface";

export default function SchoolBin() {

  const [schoolBinInfo, setSchoolBinInfo] = useState<ISchoolBin>()
  const [search, setSearch] = useState<string>("")
  const [user, setUser] = useState<IProfile[]>()
  const [school, setSchool] = useState<ISchools[]>()

  useEffect(() => {
    const fetchData = async () => {
      const response: ISchoolBin = await getSchoolBinInfo()
      setSchoolBinInfo(response)
      setUser(response.user)
      setSchool(response.school)
    }
    fetchData()
  }, [])

  useEffect(() => {
        setUser(schoolBinInfo?.user?.filter((user) => user.firstName.toLowerCase().includes(search) || user.lastName.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)))
        setSchool(schoolBinInfo?.school?.filter((school) => school.schoolName.toLowerCase().includes(search)))
    },[search, schoolBinInfo])

  return (
    <>
      <div className="flex flex-col items-center gap-[80px] self-stretch pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen bg-[#0B111B]">
        <span className="flex w-full p-[10px] text-3xl  text-neutral-50">ถังขยะ</span>

        <div className="flex flex-col items-center gap-[149px] w-full">
          {/* container Search and Button */}
          <div className="flex-col contents self-stretch gap-[36px] w-full lg:flex-row">
            {/* Search */}
            <div className="flex gap-9 self-stretch">
              <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto">
                <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
                <input type="text" className="text-[18px] text-neutral-50 bg-transparent outline-none w-full" placeholder="ค้นหา" onChange={(e) => setSearch(e.target.value)} />
              </div>

              {/* Button */}
              <div className="flex justify-between items-center gap-3 py-2 px-4 rounded-md bg-[#2A3A50] w-40 ">
                <span className="text-xl text-neutral-50">ทั้งหมด</span>
                <KeyboardArrowDownRoundedIcon className="text-neutral-50 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 self-stretch">
          <div className="flex flex-col w-full items-start gap-3 px-6 py-2 align-self-stretch rounded-xl bg-[#2A3A50]">

            <div className="flex h-[45px] items-start gap-[12px] self-stretch">
              <div className="flex w-[560px] h-12 gap-3 self-stretch items-center">
                <span className="text-xl text-neutral-50">ชื่อ</span>
              </div>
              <div className="flex w-[800px] h-12 gap-3 self-stretch items-center">
                <span className="text-xl text-neutral-50">ที่ตั้ง</span>
              </div>
              <div className="flex w-[240px] h-12 gap-3 self-stretch justify-center items-center">
                <span className="text-xl text-neutral-50">ประเภท</span>
              </div>
              <div className="flex w-[36px] h-12 gap-3 self-stretch ml-auto justify-center items-center">
                <span className="text-xl text-neutral-50"></span>
              </div>
            </div>
          </div>

          {
            user?.map((user) => {
              return <div key={user.username} className="flex flex-col items-start gap-6 self-stretch">
                <div className="flex flex-col w-full items-start gap-3 px-6 py-2 align-self-stretch rounded-xl">
                  <div className="flex h-[45px] items-start gap-[12px] self-stretch">
                    <div className="flex w-[560px] h-12 gap-3 self-stretch items-center">
                      <Image src={user.pictureUrl || Profiler} alt="icon" className="w-16 h-16 rounded-full" width={100} height={100} />
                      <div className="flex flex-col gap-y-2 text-xl text-neutral-50">
                        <span>{user.firstName} {user.lastName}</span>
                        <p className="text-sm">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex w-[800px] h-12 gap-3 self-stretch items-center">
                      <span className="text-xl text-neutral-50">-</span>
                    </div>
                    <div className="flex w-[240px] h-12 gap-3 self-stretch justify-center items-center">
                      <span className="text-xl text-neutral-50">{user.role == Role.TEACHER ? 'ผู้สอน' : 'ผู้เรียน'}</span>
                    </div>
                    <div className="flex w-8 h-8 gap-3 ml-auto justify-center items-center rounded-md border border-[#2A3A50]">
                      <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                    </div>
                  </div>
                </div>
              </div>
            })
          }

          {
            school?.map((school) => {
              return <div key={school.schoolId} className="flex flex-col items-start gap-6 self-stretch">
                <div className="flex flex-col w-full items-start gap-3 px-6 py-2 align-self-stretch rounded-xl">
                  <div className="flex h-[45px] items-start gap-[12px] self-stretch">
                    <div className="flex w-[560px] h-12 gap-3 self-stretch items-center">
                      <Image src={school.pictureUrl} alt="icon" className="w-16 h-16 rounded-full" width={100} height={100} />
                      <span className="text-xl text-neutral-50">{school.schoolName}</span>
                    </div>
                    <div className="flex w-[800px] h-12 gap-3 self-stretch items-center">
                      <span className="text-xl text-neutral-50">-</span>
                    </div>
                    <div className="flex w-[240px] h-12 gap-3 self-stretch justify-center items-center">
                      <span className="text-xl text-neutral-50">โรงเรียน</span>
                    </div>
                    <div className="flex w-8 h-8 gap-3 ml-auto justify-center items-center rounded-md border border-[#2A3A50]">
                      <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  );
}
