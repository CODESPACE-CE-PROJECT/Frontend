"use client"

import { deleteSchoolById, getSchoolBinInfo, setEnableSchoolById } from "@/actions/school";
import { SearchBar } from "@/components/Input/SerachBar";
import { Loading } from "@/components/Loading/Loading";
import { TrashTable } from "@/components/Table/TrashTable";
import { ISchoolBin, ISchools } from "@/types/school";
import { IProfile } from "@/types/user";
import { useEffect, useState } from "react";
import { Dropdown } from "@/components/Input/Dropdown";
import { NotifyType, Role } from "@/enum/enum";
import { notify, updateNotify } from "@/utils/toast.util";
import { deleteUserByUsername, setEnableUserByUsername } from "@/actions/user";

export default function Page() {
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [schoolBinInfo, setSchoolBinInfo] = useState<ISchoolBin>();
     const [search, setSearch] = useState<string>("");
     const [users, setUser] = useState<IProfile[]>();
     const [schools, setSchools] = useState<ISchools[]>();
     const [valueDropDown, setValueDropdown] = useState<string>("ทั้งหมด")

     const handleOnClickOption = async (name: string, type: string, id: string) => {
          if (name === "recover") {
               if(type === "school"){
                    const notifyId = notify(NotifyType.LOADING, "กำลังกู้ข้อมูลโรงเรียน")
                    const { status } = await setEnableSchoolById(id, true)
                    if (notifyId) {
                         if (status === 200) {
                              updateNotify(notifyId, NotifyType.SUCCESS, 'กู้ข้อมูลโรงเรียนสำเร็จ');
                              const response = await getSchoolBinInfo()
                              setSchoolBinInfo(response)
                              setSchools(response.school)
                              setUser(response.user)
                         } else {
                              updateNotify(notifyId, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการกู้ข้อมูลโรงเรียน')
                         }
                    }
               } else if (type === "user"){
                    const notifyId = notify(NotifyType.LOADING, "กำลังกู้ข้อมูลบัญชีผู้ใช้")
                    const { status } = await setEnableUserByUsername(id, true)
                    if (notifyId) {
                         if (status === 200) {
                              updateNotify(notifyId, NotifyType.SUCCESS, 'กู้ข้อมูลบัญชีผู้ใช้เสร็จสิ้น');
                              const response = await getSchoolBinInfo()
                              setSchoolBinInfo(response)
                              setSchools(response.school)
                              setUser(response.user)
                         } else {
                              updateNotify(notifyId, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการกู้ข้อมูลบัญชีผู้ใช้')
                         }
                    }
               }      
          } else if (name === "delete") {
               if(type === "school"){
                    const notifyId = notify(NotifyType.LOADING, "กำลังลบโรงเรียน")
                    const { status } = await deleteSchoolById(id)
                    if (notifyId) {
                         if (status === 200) {
                              updateNotify(notifyId, NotifyType.SUCCESS, 'ลบโรงเรียนสำเร็จ');
                              const response = await getSchoolBinInfo()
                              setSchoolBinInfo(response)
                              setSchools(response.school)
                              setUser(response.user)
                         } else {
                              updateNotify(notifyId, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการการลบโรงเรียน')
                         }
                    }
               } else if (type === "user"){
                    const notifyId = notify(NotifyType.LOADING, "กำลังลบข้อมูลบัญชีผู้ใช้")
                    const { status } = await deleteUserByUsername(id)
                    if (notifyId) {
                         if (status === 200) {
                              updateNotify(notifyId, NotifyType.SUCCESS, 'ลบข้อมูลบัญชีผู้ใช้เสร็จสิ้น');
                              const response = await getSchoolBinInfo()
                              setSchoolBinInfo(response)
                              setSchools(response.school)
                              setUser(response.user)
                         } else {
                              updateNotify(notifyId, NotifyType.ERROR, 'เกิดข้อผิดผลาดในลบข้อมูลบัญชีผู้ใช้')
                         }
                    }
               }      
          }
     }

     useEffect(() => {
          const fetchData = async () => {
               const response: ISchoolBin = await getSchoolBinInfo();
               setSchoolBinInfo(response);
               setUser(response.user);
               setSchools(response.school);
               setIsLoading(false)
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
          if (valueDropDown === "ผู้สอน") {
               setUser(
                    schoolBinInfo?.user.filter((user) => user.role === Role.TEACHER)
               )
               setSchools([])
          } else if (valueDropDown === 'ผู้เรียน') {
               setUser(
                    schoolBinInfo?.user.filter((user) => user.role === Role.STUDENT)
               )
               setSchools([])
          } else if (valueDropDown === 'โรงเรียน') {
               setSchools(schoolBinInfo?.school)
               setUser([])
          } else {
               setSchools(schoolBinInfo?.school)
               setUser(schoolBinInfo?.user)
          }
     }, [valueDropDown, schoolBinInfo])

     return isLoading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
               <Loading className="size-20" />
          </div>
     ) : (
          <div className="flex flex-col w-full h-full gap-y-8">
               <div className="flex flex-row items-center w-full gap-x-5">
                    <SearchBar onChange={(value) => setSearch(value)} />
                    <Dropdown name="type" value={valueDropDown} onChange={(value) => setValueDropdown(value)} options={['ทั้งหมด', 'โรงเรียน', 'ผู้สอน', 'ผู้เรียน']} className="w-36 h-full z-20" topClass="top-16" />
               </div>
               <TrashTable school={schools} user={users} onClickOption={handleOnClickOption} />
          </div>
     )
}