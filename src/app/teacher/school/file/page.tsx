'use client'

import { Loading } from "@/components/Loading/Loading"
import { TopNav } from "@/components/Navbar/TopNav"
import { ICreateUser, IFileFormat, IProfile } from "@/types/user"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createMultipleUserBySchoolId, getProfile } from "@/actions/user"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { ConfirmButton } from "@/components/Button/ConfirmButton"
import { CancelButton } from "@/components/Button/CancelButton"
import { SearchBar } from "@/components/Input/SerachBar"
import { OutlineButton } from "@/components/Button/OutlineButton"
import { ImportFileUserTable } from "@/components/Table/ImportFileUserTable/ImportFileUserTable"
import { ConfirmFilModal } from "@/components/Modals/ConfirmFileModal"
import { NotifyType, ValidType } from "@/enum/enum"
import { notify, updateNotify } from "@/utils/toast.util"

export default function Page() {
     const router = useRouter()
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [profile, setProfile] = useState<IProfile>()
     const [fileData, setFileData] = useState<IFileFormat[]>()
     const [user, setUser] = useState<IFileFormat[]>()
     const [search, setSearch] = useState<string>("")
     const [isOpenConfirmFileModal, setIsConfirmFileModal] = useState<boolean>(false)

     useEffect(() => {
          const fetchData = async () => {
               const profile = await getProfile()
               setProfile(profile)
               const fileData = sessionStorage.getItem(`dataFile-${profile.schoolId}`)
               if (fileData) {
                    setFileData(JSON.parse(fileData))
                    setUser(JSON.parse(fileData))
               }else if(fileData === null){
                    setIsLoading(false)
               }
               setIsLoading(false)
          }
          fetchData()
     }, [])

     const onClickOption = (index: number | undefined) => {
          setFileData(prev => prev?.filter((_, i) => i !== index))
          setUser(prev => prev?.filter((_, i) => i !== index))
     }

     const handleClickDuplicate = () => {
          setFileData(prev => prev?.filter((item) => item.validType !== ValidType.DUPLICATE))
          setUser(prev => prev?.filter((item) => item.validType !== ValidType.DUPLICATE))
     }

     const handleClickExist = () => {
          setFileData(prev => prev?.filter((item) => item.validType !== ValidType.EXIST))
          setUser(prev => prev?.filter((item) => item.validType !== ValidType.EXIST))
     }

     const handleOnClickCreateUser = async () => {
          if (!profile || !profile.schoolId) {
                notify(NotifyType.ERROR, "ข้อมูลโรงเรียนไม่ถูกต้อง");
                return;
              }
          const userFormat = user?.map((item) => {
               return {
                    username: item.username,
                    email: item.email,
                    studentNo: item.studentId || '',
                    firstName: item.firstname,
                    lastName: item.lastname,
                    role: item.role,
                    gender: item.gender
               }
          })

          if(userFormat){
               const id = notify(NotifyType.LOADING, 'กำลังสร้างบัญชีผู้ใช้งาน')
               if(id){
                    const {status} = await createMultipleUserBySchoolId(profile?.schoolId, userFormat as ICreateUser[])
                    console.log(status)
                    if(status === 201){
                         updateNotify(id,NotifyType.SUCCESS, 'สร้างบัญชีผู้ใช้งานสำเร็จ')
                         sessionStorage.removeItem(`dataFile-${profile?.schoolId}`)
                    }else{
                         updateNotify(id,NotifyType.ERROR, 'เกิดข้อผิดผลาดในการสร้างบัญชีผู้ใช้งาน')
                    }
               }
          }
     }

     useEffect(() => {
          setUser(() => fileData?.filter(item => item.email?.toLowerCase().includes(search.toLowerCase()) || item.firstname?.toLowerCase().includes(search.toLowerCase()) || item.lastname?.toLowerCase().includes(search.toLowerCase()) || item.studentId?.toLowerCase().includes(search.toLowerCase())))
     }, [search, fileData])

     return isLoading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
               <Loading className="size-20" />
          </div>
     ) : (
          <div className="flex flex-col gap-y-12">
               <TopNav disableNotification={true} imageUrl={profile?.pictureUrl} role={profile?.role} gender={profile?.gender}>
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
                    <SearchBar onChange={(value) => setSearch(value)} className="h-full" />
                    <OutlineButton className="text-center w-60 h-full text-base font-semibold text-[#EFA443] border-[#EFA443] hover:bg-yellow-200" onClick={handleClickDuplicate}>
                         <p>ลบข้อมูลซ้ำจากไฟล์</p>
                    </OutlineButton>
                    <OutlineButton className="text-center w-60 h-full text-base font-semibold text-[#EF4343] border-[#EF4343] hover:bg-red-200" onClick={handleClickExist}>
                         <p>ลบข้อมูลซ้ำในระบบ</p>
                    </OutlineButton>
               </div>
               <ImportFileUserTable onClickOption={(index) => onClickOption(index)} data={user} />
               <ConfirmFilModal isOpen={isOpenConfirmFileModal} onClose={() => setIsConfirmFileModal(false)} onClick={() => handleOnClickCreateUser()} isDuplicate={user?.filter(item => item.validType === ValidType.DUPLICATE).length !== 0} isExist={user?.filter(item => item.validType === ValidType.EXIST).length !== 0}/>
          </div>
     )
}