"use client";

import React, { useEffect, useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CircleIcon from "@mui/icons-material/Circle";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import { useParams } from "next/navigation";
import { getSchoolById } from "@/app/services/school.service";
import { ISchool } from "@/app/interfaces/school.interface";
import { textPackage } from "@/app/utils/text.util";
import SchoolIcon from '@mui/icons-material/School';
import {
  statusActiveColor,
  textStatusActiveColor,
} from "@/app/utils/color.util";
import { textActivedUser } from "@/app/utils/text.util";
import { IProfile } from "@/app/interfaces/user.interface";
import { Role } from "@/app/enum/enum";
import Profiler from "@/app/assets/setting/Profileuser.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OptionUser } from "@/app/components/Options/OptionUser";
import {AddUserModal} from "@/app/components/Modals/AddUserModal";

export default function School() {
  const param = useParams<{ schoolId: string }>();
  const [school, setSchool] = useState<ISchool>();
  const [teachers, setTeachers] = useState<IProfile[]>();
  const [students, setStudents] = useState<IProfile[]>();
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchSchool = async () => {
      const response: ISchool = await getSchoolById(param.schoolId);
      setSchool(response);
      setTeachers(response.users.filter((user) => user.role === Role.TEACHER));
      setStudents(response.users.filter((user) => user.role === Role.STUDENT));
    };
    fetchSchool();
  }, [param]);

  useEffect(() => {
    setTeachers(
      school?.users.filter(
        (user) =>
          user.role === Role.TEACHER &&
          (user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())),
      ),
    );
    setStudents(
      school?.users.filter(
        (user) =>
          user.role === Role.STUDENT &&
          (user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())),
      ),
    );
  }, [search, school?.users]);

  return (
    <div className="flex flex-col items-center justify-start p-[60px] w-full min-h-screen">
      <div className="flex flex-row items-center gap-x-4 mb-[80px] w-full">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <ArrowBackIosNewRoundedIcon className="text-[#FAFAFA]" />
        </div>
        <span className="text-3xl text-zinc-50">{school?.schoolName}</span>
      </div>

      <div className="flex flex-col w-full gap-[48px] pt-5 pr-6 pb-5">
        <div className="flex flex-col items-start gap-9">
          <div className="flex pt-[20px] w-full pr-6 pb-5 pl-12 justify-between items-start rounded-xl bg-[#2A3A50] bg-opacity-30">
            <div className="flex gap-12 items-center">
              {
                school?.pictureUrl ?
                  <Image src={school?.pictureUrl} alt="icon" className="w-[140px] h-[140px] object-cover" width={100} height={100} priority={true}/> :
                  <SchoolIcon fontSize="large" />
              }
              <div className="flex flex-col items-start gap-4">
                <button className="flex justify-center items-center py-2 px-3 rounded-[6px] border border-[#2A3A50] text-zinc-50">{textPackage(school?.package)}</button>
                <span className="flex w-full text-2xl text-zinc-50">{school?.schoolName}</span>
                <span className="flex w-full text-xl text-zinc-50">{school?.address} {school?.subDistrict} {school?.district} {school?.province} {school?.postCode}</span>
                <div className="flex gap-4 items-center">
                  <span className="text-xl text-zinc-50">ผู้สอน {school?.count.teacher} คน</span>
                  <CircleIcon className="text-[#FAFAFA]" fontSize="small" />
                  <span className="text-xl text-zinc-50">ผู้เรียน {school?.count.student} คน</span>
                </div>
              </div>
            </div>
            <div onClick={() => router.push(`/admin/school/${school?.schoolId}/edit`)} className="cursor-pointer">
              <ModeEditOutlineOutlinedIcon className="text-[#FAFAFA]" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-9">
            {/* <!-- Search --> */}
            <div className="flex flex-col lg:flex-row w-full gap-9">
              <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto focus-within:border-blue-300">
                <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
                <input type="text" className="text-[18px] text-neutral-50 bg-transparent outline-none w-full" placeholder="ค้นหา" onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="flex flex-col items-center gap-4 lg:flex-row">
                {/* <!-- Button --> */}
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#FAFAFA] w-full lg:w-auto hover:bg-slate-300">
                  <NoteAddRoundedIcon className="text-[#5572FA]" fontSize="medium" />
                  <span className="text-lg text-[#5572FA]">นำเข้าไฟล์</span>
                </button>

                {/* <!-- Button --> */}
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#5572FA] w-full h-full lg:w-auto hover:bg-blue-300">
                  <AddRoundedIcon className="text-neutral-50" />
                </button>
              </div>

            </div>
          </div>

          <div className="2xl:flex 2xl:flex-row 2xl:justify-between 2xl:gap-12 border-spacing-y-4 z-0">
            {/* <!-- Tables for Teachers --> */}
            <div className="w-full flex flex-col lg:flex-row justify-between gap-6 mb-4 lg:mb-0">
              {/* <!-- Teacher Table --> */}
              <div className="w-full lg:w-full overflow-x-auto">
                {/* <div className="overflow-x-auto"> */}
                <table className="min-w-[800px] w-full">
                  <thead>
                    <tr className="bg-[#304972] text-left bg-opacity-30 text-neutral-50 text-[16px] lg:text-[18px]">
                      <th className="rounded-xl py-4 px-6 lg:px-6 !font-normal">บัญชีผู้สอน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers?.map((teacher) => {
                      return <tr key={teacher.username} className="flex justify-between items-center text-neutral-50 py-2 px-6">
                      <td className="flex flex-row w-full h-full justify-between mt-7">
                        <div className="flex flex-row gap-x-5 items-center">
                          <Image src={teacher.pictureUrl || Profiler} alt="icon" className="w-16 h-16 rounded-full" width={100} height={100}/>
                          <div className="flex flex-col justify-center items-start">
                            <p className="p-2 text-xl rounded-l-md overflow-hidden ">{teacher.firstName} {teacher.lastName}</p>
                            <p className="px-2 text-sm overflow-hidden">{teacher.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 truncate">
                          <p className={`py-2 px-3 text-center flex items-center ${textStatusActiveColor(teacher.isActived, teacher.allowLogin)} justify-center gap-2 border-2 border-[${statusActiveColor(teacher.isActived, teacher.allowLogin)}] rounded-md`}>
                            <CircleIcon /> {textActivedUser(teacher.isActived, teacher.allowLogin)}
                          </p>
                          <OptionUser />
                        </div>
                      </td>
                    </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* <!-- Student Table --> */}
            <div className="w-full flex flex-col lg:flex-row justify-between gap-6">
              {/* <!-- Teacher Table --> */}
              <div className="w-full lg:w-full overflow-x-auto">
                {/* <div className="overflow-x-auto"> */}
                <table className="min-w-[800px] w-full table-auto z-0">
                  <thead>
                    <tr className="bg-[#304972] text-left bg-opacity-30 text-neutral-50 text-[16px] lg:text-[18px]">
                      <th className="rounded-xl py-4 px-6 lg:px-6 !font-normal">บัญชีผู้เรียน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students?.map((student) => {
                      return <tr key={student.username} className="flex justify-between items-center text-neutral-50 py-2 px-6">
                      <td className="flex flex-row w-full justify-between mt-7">
                        <div className="flex flex-row gap-x-5 items-center">
                          <Image src={student.pictureUrl || Profiler} alt="icon" className="w-16 h-16 rounded-full" width={100} height={100}/>
                          <div className="flex flex-col justify-center items-start">
                            <p className="p-2 text-xl rounded-l-md overflow-hidden ">{student.firstName} {student.lastName}</p>
                            <p className="px-2 text-sm overflow-hidden">{student.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 truncate">
                          <p className={`py-2 px-3 text-center flex items-center ${textStatusActiveColor(student.isActived, student.allowLogin)} justify-center gap-2 border-2 border-[${statusActiveColor(student.isActived, student.allowLogin)}] rounded-md`}>
                            <CircleIcon /> {textActivedUser(student.isActived, student.allowLogin)}
                          </p>
                          <OptionUser />
                        </div>
                      </td>
                    </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AddUserModal /> */}
    </div>
  );
}
