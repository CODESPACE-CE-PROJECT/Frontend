"use client"

import { getAllSchool } from "@/actions/school"
import { getProfile } from "@/actions/user"
import { Loading } from "@/components/Loading/Loading"
import { ISchools } from "@/types/school"
import { useEffect, useState } from "react"
import { SearchBar } from "@/components/Input/SerachBar"
import { ConfirmButton } from "@/components/Button/ConfirmButton"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { SchoolTable } from "@/components/Table/SchoolTable"
import { TopNav } from "@/components/Navbar/TopNav"
import { IProfile } from "@/types/user"

export default function Page() {
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [schools, setSchools] = useState<ISchools[]>()
     const [schoolsData, setSchoolsDate] = useState<ISchools[]>()
     const [search, setSearch] = useState<string>("")
     const [profile, setProfile] = useState<IProfile>()

     useEffect(() => {
          const fetchSchools = async (): Promise<void> => {
               try {
                    const response: ISchools[] = await getAllSchool()
                    const profile: IProfile = await getProfile()
                    setProfile(profile)
                    setSchoolsDate(response)
                    setSchools(response)
               } catch (error) {
                    
               } finally {
                    setIsLoading(false)
               }
          }
          fetchSchools()
     }, [])

     useEffect(() => {
          setSchools(schoolsData?.filter((school) => school.schoolName.toLowerCase().includes(search)))
     }, [search, schoolsData])

     return isLoading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
               <Loading className="size-20" />
          </div>
     ) : (
          <div className="flex flex-col w-full h-full gap-y-12">
               <TopNav disableNotification={true} imageUrl={profile?.pictureUrl} role={profile?.role}>
                    <p>โรงเรียน</p>
               </TopNav>
               <div className="flex flex-row items-center w-full gap-x-5">
                    <SearchBar onChange={(value) => setSearch(value)} />
                    <div >
                         <ConfirmButton className="flex flex-row md:w-40 text-center justify-center items-center px-4 gap-x-2">
                              <AddRoundedIcon className="text-neutral-50 w-6 h-6 " />
                              <p className="hidden md:block">เพิ่มโรงเรียน</p>
                         </ConfirmButton>
                    </div>
               </div>
               <SchoolTable schools={schools} />
          </div>
     )
}