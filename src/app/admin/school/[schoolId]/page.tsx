'use client'

import { getSchoolById } from "@/actions/school";
import { Loading } from "@/components/Loading/Loading";
import { TopNav } from "@/components/Navbar/TopNav";
import { Role } from "@/enum/enum";
import { ISchool } from "@/types/school";
import { IProfile } from "@/types/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SchoolCard } from "@/components/Card/SchoolCard";
import { getProfile } from "@/actions/user";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { SearchBar } from "@/components/Input/SerachBar";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { InpuFileButton } from "@/components/Button/InputFileButton";
import {UserTable} from '@/components/Table/UserTable'

export default function Page() {
     const router = useRouter();
     const param = useParams<{ schoolId: string }>();
     const [school, setSchool] = useState<ISchool>();
     const [teachers, setTeachers] = useState<IProfile[]>();
     const [students, setStudents] = useState<IProfile[]>();
     const [search, setSearch] = useState<string>("");
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [profile, setProfile] = useState<IProfile>()

     useEffect(() => {
          const fetchSchool = async () => {
               try {
                    const response: ISchool = await getSchoolById(param.schoolId);
                    const profile: IProfile = await getProfile()
                    setProfile(profile)
                    setSchool(response);
                    setTeachers(response.users.filter((user) => user.role === Role.TEACHER));
                    setStudents(response.users.filter((user) => user.role === Role.STUDENT));
               } catch (error) {

               } finally {
                    setIsLoading(false)
               }
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

     return isLoading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
               <Loading className="size-20" />
          </div>
     ) : (<div className="flex flex-col gap-y-12">
          <TopNav disableNotification={true} imageUrl={profile?.pictureUrl} role={profile?.role} gender={profile?.gender}>
               <div className="flex flex-row items-center gap-x-3">
                    <div className="cursor-pointer hover:text-primary" onClick={() => router.back()}>
                         <ArrowBackIosNewRoundedIcon />
                    </div>
                    <p>{school?.schoolName}</p>
               </div>
          </TopNav>

          <div className="flex flex-col gap-9">
               <SchoolCard data={school} />
               <div className="flex flex-row items-center gap-x-4">
                    <SearchBar onChange={(value) => setSearch(value)} />
                    <InpuFileButton className="flex flex-row font-semibold items-center justify-center w-36"/>
                    <ConfirmButton className="px-3">
                         <AddRoundedIcon className="text-neutral-50 w-6 h-6" />
                    </ConfirmButton>
               </div>
               <div className="flex flex-col xl:flex-row md:gap-y-6 gap-x-9">
                    <UserTable title="บัญชีผู้สอน" data={teachers}/>
                    <UserTable title="บัญชีผู้เรียน" data={students}/>
               </div>
          </div>
     </div>)
}