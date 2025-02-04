"use client";

import React, { useEffect, useState } from "react";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { getSchoolBinInfo } from "@/app/services/school.service";
import { ISchools, ISchoolBin } from "@/app/interfaces/school.interface";
import Image from "next/image";
import { Role } from "@/app/enum/enum";
import Profiler from "@/app/assets/setting/Profileuser.svg";
import { IProfile } from "@/app/interfaces/user.interface";
import { Option } from "@/app/components/Options/Option";
import { Dropdown } from "@/app/components/Input/Dropdown";

export default function SchoolBin() {
  const [schoolBinInfo, setSchoolBinInfo] = useState<ISchoolBin>();
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<IProfile[]>();
  const [schools, setSchools] = useState<ISchools[]>(); 
  const [valueDropDown, setValueDropdown] = useState<string>("ทั้งหมด")

  useEffect(() => {
    const fetchData = async () => {
      const response: ISchoolBin = await getSchoolBinInfo();
      setSchoolBinInfo(response);
      setUser(response.user);
      setSchools(response.school);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setUser(
      schoolBinInfo?.user?.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search) ||
          user.lastName.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search),
      ),
    );
    setSchools(
      schoolBinInfo?.school?.filter((school) =>
        school.schoolName.toLowerCase().includes(search),
      ),
    );
  }, [search, schoolBinInfo]);

  useEffect(() => {
    if(valueDropDown === "ผู้สอน"){
      setUser(
        schoolBinInfo?.user.filter((user) => user.role === Role.TEACHER)
      )
      setSchools([])
    }else if(valueDropDown === 'ผู้เรียน'){
      setUser(
        schoolBinInfo?.user.filter((user) => user.role === Role.STUDENT)
      )
      setSchools([])
    } else if(valueDropDown === 'โรงเรียน'){
      setSchools(schoolBinInfo?.school)
      setUser([])
    } else {
      setSchools(schoolBinInfo?.school)
      setUser(schoolBinInfo?.user)
    }
  }, [valueDropDown])

  return (
    <>
      <div className="flex flex-col items-center gap-[80px] self-stretch pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen bg-[#0B111B]">
        <span className="flex w-full p-[10px] text-3xl  text-neutral-50">
          ถังขยะ
        </span>

        <div className="flex flex-col items-center gap-[149px] w-full">
          {/* container Search and Button */}
          <div className="flex-col contents self-stretch gap-[36px] w-full lg:flex-row">
            {/* Search */}
            <div className="flex gap-9 self-stretch">
              <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-full">
                <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
                <input
                  type="text"
                  className="text-[18px] text-neutral-50 bg-transparent outline-none w-full"
                  placeholder="ค้นหา"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Button */}
              <Dropdown name="type"  value={valueDropDown} onChange={(value) => setValueDropdown(value)} options={['ทั้งหมด', 'โรงเรียน', 'ผู้สอน', 'ผู้เรียน']} className="w-[160px]" topClass="top-16"/>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
            <table className="table-auto w-full border-collapse text-neutral-50">
              <thead>
                <tr className="bg-[#304972] bg-opacity-30 text-[18px]">
                  <th className="text-start px-6 py-3 rounded-l-md !font-normal truncate">ชื่อ</th>
                  <th className="text-start px-6 py-3 !font-normal truncate">ที่ตั้ง</th>
                  <th className="text-center px-6 py-3 !font-normal truncate">ประเภท</th>
                  <th className="px-2 py-3 rounded-r-md !font-normal"></th>
                </tr>
              </thead>

              <tbody className="text-base">
                {/* data in Table */}
                <tr>
                  <td className="h-6" />
                </tr>
                {
                  user?.map((user) => <tr key={user.username} className="justify-center">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5 truncate">
                        <Image
                          src={user.pictureUrl || Profiler}
                          alt="school logo"
                          className="w-[64px] h-[64px] min-w-[64px] min-h-[64px] object-cover"
                          width={100}
                          height={100}
                        />
                        <span className="truncate">{user.firstName} {user.lastName}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[16px] truncate">-</td>
                    <td className="text-center">{user.role === Role.STUDENT ? "ผู้เรียน":"ผู้สอน"}</td>
                    <td className="flex w-full h-[92px] items-center justify-center">
                      <Option />
                    </td>
                  </tr>
                  )
                }

                {
                  schools?.map((school) => <tr key={school.schoolId} className="justify-center">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5 truncate">
                        <Image
                          src={school.pictureUrl}
                          alt="school logo"
                          className="w-[64px] h-[64px] min-w-[64px] min-h-[64px] object-cover"
                          width={100}
                          height={100}
                        />
                        <span className="truncate">{school.schoolName}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[16px] truncate">
                      {school.address} {school.subDistrict} {school.district} {school.province} {school.postCode}
                    </td>
                    <td className="text-center">โรงเรียน</td>
                    <td className="flex w-full h-[92px] items-center justify-center">
                      <Option />
                    </td>
                  </tr>
                  )
                }
              </tbody>
            </table>
          </div>
      </div>
    </>
  );
}
