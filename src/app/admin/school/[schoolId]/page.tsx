"use client";

import React, { useEffect, useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import { useParams } from "next/navigation";
import { getSchoolById } from "@/app/services/school.service";
import { ISchool } from "@/app/interfaces/school.interface";
import { statusActiveColor, textStatusActiveColor } from "@/app/utils/color.util";
import { textActivedUser } from "@/app/utils/text.util";
import { IProfile } from "@/app/interfaces/user.interface";
import { Role } from "@/app/enum/enum";
import Profiler from "@/app/assets/setting/Profileuser.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function School() {
    const param = useParams<{ schoolId: string }>()
    const [school, setSchool] = useState<ISchool>()
    const [teachers, setTeachers] = useState<IProfile[]>()
    const [students, setStudents] = useState<IProfile[]>()
    const [search, setSearch] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
        const fetchSchool = async () => {
            const response: ISchool = await getSchoolById(param.schoolId)
            setSchool(response)
            setTeachers(response.users.filter((user) => user.role === Role.TEACHER))
            setStudents(response.users.filter((user) => user.role === Role.STUDENT))
        }
        fetchSchool()
    }, [param])

    useEffect(() => {
        setTeachers(school?.users.filter((user) => user.role === Role.TEACHER && (user.firstName.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))))
        setStudents(school?.users.filter((user) => user.role === Role.STUDENT && (user.firstName.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))))
    }, [search, school?.users])

    return (
        <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen">
            <div className="flex justify-between items-center self-stretch">
                <div onClick={() => router.back()} className="cursor-pointer">
                    <ArrowBackIosNewRoundedIcon className="text-[#FAFAFA]" />
                </div>
                <span className="flex w-full p-[10px] text-3xl text-zinc-50">{school?.schoolName}</span>
            </div>

            <div className="flex flex-col w-[1670px] gap-[48px] pt-5 pr-6 pb-5  ">
                <div className="flex flex-col items-start gap-9 self-stretch">
                    <div className="flex pt-[20px] pr-6 pb-5 pl-12 justify-between items-start self-stretch rounded-xl bg-[#2A3A50] bg-opacity-30">
                        <div className="flex gap-12 items-center">
                            <Image src={school?.pictureUrl || Profiler} width={100} height={100} alt="icon" className="w-[140px] h-[140px]" />
                            <div className="flex flex-col items-start gap-4">
                                <button className="flex justify-center items-center py-2 px-3 rounded-[6px] border border-[#2A3A50] text-zinc-50" >{school?.package[0].toUpperCase()}{school?.package.slice(1).toLowerCase()}</button>
                                <span className="flex w-full text-2xl text-zinc-50">{school?.schoolName}</span>
                                <span className="flex w-full text-xl text-zinc-50">{school?.address} {school?.district} {school?.subDistrict} {school?.province} {school?.postCode}</span>
                                <div className="flex gap-4">
                                    <span className="text-xl text-zinc-50">ผู้สอน {school?.count.teacher} คน</span>
                                    <CircleIcon className="text-[#FAFAFA]" />
                                    <span className="text-xl text-zinc-50">ผู้เรียน {school?.count.student} คน</span>
                                </div>
                            </div>
                        </div>
                        <ModeEditOutlineOutlinedIcon className="text-[#FAFAFA]" />
                    </div>
                    {/* container Search and Button */}
                    <div className="flex-col contents self-stretch gap-[36px] w-full lg:flex-row">

                        {/* Search */}
                        <div className="flex gap-9 self-stretch">
                            <div className="flex items-center flex-grow gap-2 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto">
                                <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
                                <input type="text" className="text-[18px] text-neutral-50 bg-transparent outline-none w-full" placeholder="ค้นหา" onChange={(e) => setSearch(e.target.value)} />
                            </div>

                            {/* Button */}
                            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#FAFAFA] w-auto ">
                                <NoteAddRoundedIcon className="text-[#5572FA] w-6 h-6" />
                                <span className="text-lg text-[#5572FA]">นำเข้าไฟล์</span>
                            </button>

                            {/* Button */}
                            <button className="flex items-center justify-center gap-4 py-3 px-4 rounded-md bg-[#5572FA] w-auto ">
                                <AddRoundedIcon className="text-neutral-50 w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    <div className="flex  items-start gap-9 w-full justify-between">
                        {/* บัญชีผู้สอน */}
                        <div className="flex flex-col items-start gap-9 w-full">
                            <div className="flex flex-col items-start gap-6 self-stretch ">
                                <div className="flex h-16 items-center gap-2.5 self-stretch p-2 px-6 rounded-xl bg-[#2A3A50] bg-opacity-30">
                                    <span className="text-zinc-50 text-xl">บัญชีผู้สอน</span>
                                </div>
                                {/* ข้อมูลรายชื่อผู้สอน */}

                                {
                                    teachers?.filter((teacher) => teacher.isEnable).map((teacher) => {
                                        return <div key={teacher.username} className="flex items-center justify-between gap-2.5 self-stretch p-2 px-6">
                                            <div className="flex items-center gap-5">
                                                <Image src={teacher.pictureUrl || Profiler} alt="icon" className="w-16 h-16 rounded-full" width={100} height={100} />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-zinc-50 text-xl">{teacher.firstName} {teacher.lastName}</span>
                                                    <span className="text-zinc-50 text-base">{teacher.email}</span>
                                                </div>
                                            </div>
                                            <div className="flex align-center gap-4">
                                                <div className={`flex align-center gap-4 py-2 px-4 rounded-md border border-[${statusActiveColor(teacher.isActived, teacher.allowLogin)}]`}>
                                                    <CircleIcon className={`${textStatusActiveColor(teacher.isActived, teacher.allowLogin)}`} />
                                                    <span className={`flex justify-center items-center text-[${statusActiveColor(teacher.isActived, teacher.allowLogin)}]`}>{textActivedUser(teacher.isActived, teacher.allowLogin)}</span>
                                                </div>
                                                <div className="flex items-center justify-center px-2 rounded-md border border-[#2A3A50]">
                                                    <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                        </div>

                        {/* บัญชีผู้เรียน */}
                        <div className="flex flex-col items-start gap-9 w-full">
                            <div className="flex flex-col items-start gap-6 self-stretch ">
                                <div className="flex h-16 items-center gap-2.5 self-stretch p-2 px-6 rounded-xl bg-[#2A3A50] bg-opacity-30">
                                    <span className="text-zinc-50 text-xl">บัญชีผู้เรียน</span>
                                </div>
                                {/* ข้อมูลรายชื่อผู้เรียน */}

                                {
                                    students?.filter((student) => student.isEnable).map((student) => {
                                        return <div key={student.username} className="flex items-center justify-between gap-2.5 self-stretch p-2 px-6">
                                            <div className="flex items-center gap-5">
                                                <Image src={student.pictureUrl || Profiler} alt="icon" className="w-16 h-16 rounded-full" width={100} height={100} />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-zinc-50 text-xl">{student.firstName} {student.lastName}</span>
                                                    <span className="text-zinc-50 text-base">{student.email}</span>
                                                </div>
                                            </div>
                                            <div className="flex align-center gap-4">
                                                <div className={`flex align-center gap-4 py-2 px-4 rounded-md border border-[${statusActiveColor(student.isActived, student.allowLogin)}]`}>
                                                    <CircleIcon className={`${textStatusActiveColor(student.isActived, student.allowLogin)}`} />
                                                    <span className={`flex justify-center items-center text-[${statusActiveColor(student.isActived, student.allowLogin)}]`}>{textActivedUser(student.isActived, student.allowLogin)}</span>
                                                </div>
                                                <div className="flex items-center justify-center px-2 rounded-md border border-[#2A3A50]">
                                                    <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

