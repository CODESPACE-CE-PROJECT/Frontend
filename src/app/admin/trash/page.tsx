"use client"

import { getSchoolBinInfo } from "@/actions/school";
import { SearchBar } from "@/components/Input/SerachBar";
import { Loading } from "@/components/Loading/Loading";
import { TrashTable } from "@/components/Table/TrashTable";
import { ISchoolBin, ISchools } from "@/types/school";
import { IProfile } from "@/types/user";
import { useEffect, useState } from "react";
import { Dropdown } from "@/components/Input/Dropdown";

export default function Page() {
     const [isLoading, setIsLoading] = useState<boolean>(false)
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

     return isLoading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
               <Loading className="size-20" />
          </div>
     ) : (
          <div className="flex flex-col w-full h-full gap-y-8">
               <div className="flex flex-row items-center w-full gap-x-5">
                    <SearchBar onChange={(value) => setSearch(value)} />
                    <Dropdown name="type"  value={valueDropDown} onChange={(value) => setValueDropdown(value)} options={['ทั้งหมด', 'โรงเรียน', 'ผู้สอน', 'ผู้เรียน']} className="w-36 h-full" topClass="top-16"/>
               </div>
               <TrashTable />
          </div>
     )
}