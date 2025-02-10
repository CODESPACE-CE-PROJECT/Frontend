'use client'

import { Loading } from "@/components/Loading/Loading"
import { TopNav } from "@/components/Navbar/TopNav"
import { IProfile } from "@/types/user"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getProfile } from "@/actions/user"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { ConfirmButton } from "@/components/Button/ConfirmButton"
import { CancelButton } from "@/components/Button/CancelButton"
import { SearchBar } from "@/components/Input/SerachBar"
import { OutlineButton } from "@/components/Button/OutlineButton"
import { ImportFileUserTable } from "@/components/Table/ImportFileUserTable/ImportFileUserTable"
import { ConfirmFilModal } from "@/components/Modals/ConfirmFileModal"

export default function Page() {
     const router = useRouter()
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [profile, setProfile] = useState<IProfile>()
     const [isOpenConfirmFileModal, setIsConfirmFileModal] = useState<boolean>(false)

     useEffect(() => {
          const fetchData = async () => {
               const profile = await getProfile()
               setProfile(profile)
               setIsLoading(false)
          }
          fetchData()
     }, [])

     return isLoading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
               <Loading className="size-20" />
          </div>
     ) : (
          <div className="flex flex-col gap-y-12">
               <TopNav disableNotification={true} imageUrl={profile?.pictureUrl} role={profile?.role}>
                    <div className="flex flex-row items-center gap-x-3">
                         <div className="cursor-pointer hover:text-primary" onClick={() => router.back()}>
                              <ArrowBackIosNewRoundedIcon />
                         </div>
                         <p>เพิ่มสมาชิกในโรงเรียน</p>
                    </div>
               </TopNav>

               <div className="flex flex-row items-center justify-end gap-x-9">
                    <CancelButton className="px-16 bg-white text-[#64748B] py-4" onClick={() => router.back()}>
                         <p>ยกเลิก</p>
                    </CancelButton>
                    <ConfirmButton className="px-16 py-4" onClick={() => setIsConfirmFileModal(true)}>
                         <p>ตกลง</p>
                    </ConfirmButton>
               </div>

               <div className="flex flex-row items-center gap-x-4 h-14">
                    <SearchBar onChange={() => { }} className="h-full"/>
                    <OutlineButton className="text-center w-60 h-full text-base font-semibold text-[#EFA443] border-[#EFA443] hover:bg-yellow-200">
                         <p>ลบข้อมูลซ้ำจากไฟล์</p>
                    </OutlineButton>
                    <OutlineButton className="text-center w-60 h-full text-base font-semibold text-[#EF4343] border-[#EF4343] hover:bg-red-200">
                         <p>ลบข้อมูลซ้ำในระบบ</p>
                    </OutlineButton>
               </div>
               <ImportFileUserTable onClickOption={() => {}}/>
               <ConfirmFilModal isOpen={isOpenConfirmFileModal} onClose={() => setIsConfirmFileModal(false)}/>
          </div>
     )
}