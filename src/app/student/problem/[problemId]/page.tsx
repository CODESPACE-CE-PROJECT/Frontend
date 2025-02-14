'use client'

import { getProfile } from "@/actions/user"
import { TopNav } from "@/components/Navbar/TopNav"
import { IProfile } from "@/types/user"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { ProblemChoice } from "@/components/Problem/ProblemChoice"
import { SubmissionNo } from "@/components/Problem/submissionNo"
import { ProblemDescription } from "@/components/Problem/ProblemDescription"
import { StateSubmission } from "@/enum/enum"
import { ProblemConstraint } from "@/components/Problem/ProblemConstraint"
import { ProblemTestCase } from "@/components/Problem/ProblemTestCase"
import { ProblemLanguage } from "@/components/Problem/ProblemLaguage"
import { ConfirmButton } from "@/components/Button/ConfirmButton"
import { MonacoTextEditor } from "@/components/Monaco/MonacoTextEditor"
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { NavigateSubmission } from "@/components/Tab/NavigateSubmission"
import { SubmissionTable } from "@/components/Table/SubmissionTable"
import { Loading } from "@/components/Loading/Loading"

export default function Page() {
     const router = useRouter()
     const [profile, setProfile] = useState<IProfile>()
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [indexTab, setIndexTab] = useState<number>(1)
     const data = {
          problemId: "askljdfklasjklfdas",
          title: "พื้นฐานกับ Printf",
          stateSubmission: StateSubmission.FAILED,
     }

     useEffect(() => {
          const fetchData = async () => {
               const profile = await getProfile()
               setProfile(profile)
               setIsLoading(false)
          }
          fetchData()
     }, [])

     return isLoading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
               <Loading className="size-20" />
          </div>
     ) : (<div className="flex flex-col p-10 pb-8 w-full gap-y-6">
          <TopNav disableNotification={false} imageUrl={profile?.pictureUrl} role={profile?.role}>
               <div className="flex flex-row items-center gap-x-3">
                    <div className="cursor-pointer hover:text-primary" onClick={() => router.back()}>
                         <ArrowBackIosNewRoundedIcon />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                         <p className="max-w-[250px] hidden lg:block truncate">C Programming การเขียนโปรแกรมภาษาซี</p>
                         <p className="hidden lg:block">/</p>
                         <p className="max-w-[250px] hidden lg:block truncate">ทดสอบความรู้เบื้องต้น</p>
                         <p className="hidden lg:block">/</p>
                         <p className="max-w-full truncate">1. โปรแกรมหาค่ากำลังสอง</p>
                    </div>
               </div>
          </TopNav>

          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row items-center justify-between">
               <div className="flex flex-col gap-y-6 md:flex-row items-center justify-start md:gap-x-6">
                    <ProblemChoice index={1} data={data} isSelect={true} />
                    <ProblemChoice index={2} data={data} />
                    <ProblemChoice index={3} data={data} />
                    <ProblemChoice index={4} data={data} />
                    <ProblemChoice index={5} data={data} />
                    <ProblemChoice index={6} data={data} />
               </div>
               <SubmissionNo no={3} stateSubmission={StateSubmission.FAILED} />
          </div>

          <div className="flex flex-col gap-y-2 md:flex-row items-center w-full md:gap-x-2">
               <div className="w-full h-[calc(100vh-10rem-56px-10px)] flex flex-col gap-y-4 overflow-y-auto pr-3 dropdown">
                    <NavigateSubmission index={indexTab} onClick={(index) => setIndexTab(index)} />
                    {
                         indexTab === 1 ? (<>
                              <ProblemDescription />
                              <ProblemConstraint />
                              {
                                   Array.from({ length: 10 }).map((_, index) =>
                                        <ProblemTestCase key={index} stateSubmission={StateSubmission.NOTSEND}/>
                                   )
                              }
                         </>
                         ) : <SubmissionTable />
                    }
               </div>

               {/* Text Editor */}
               <div className="w-full h-full flex flex-col gap-y-2">
                    <div className="w-full flex flex-row justify-between">
                         <ProblemLanguage />
                         <div className="flex flex-row items-center gap-x-4">
                              <div 
                                   onClick={() => document.getElementById('sourCodeUpload')?.click()} 
                                   className={`flex flex-row items-center gap-x-3 bg-transparent border-[1px] border-blackground-text hover:bg-gray-500 px-4 py-3 rounded-md cursor-pointer`}>
                                   <input
                                        type="file"
                                        id="sourCodeUpload"
                                        className="hidden"
                                        accept="image/*"
                                   />
                                   <FileUploadOutlinedIcon fontSize="medium" />
                                   <p>อัพโค้ด</p>
                              </div>
                              <ConfirmButton className="flex flex-row items-center gap-x-3 px-4">
                                   <CloudUploadOutlinedIcon fontSize="medium" />
                                   <p className="font-medium">ส่งคำตอบ</p>
                              </ConfirmButton>
                         </div>
                    </div>
                    <MonacoTextEditor />
               </div>
          </div>
     </div>)
}