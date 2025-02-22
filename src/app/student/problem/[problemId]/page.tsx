'use client'

import { getProfile } from "@/actions/user"
import { TopNav } from "@/components/Navbar/TopNav"
import { IProfile } from "@/types/user"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { ProblemChoice } from "@/components/Problem/ProblemChoice"
import { SubmissionNo } from "@/components/Problem/submissionNo"
import { ProblemDescription } from "@/components/Problem/ProblemDescription"
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
import { IProblem } from "@/types/problem"
import { getProblemById } from "@/actions/problem"
import { ISubmission, ISubmitCode } from "@/types/submission"
import { LanguageType, NotifyType, StateSubmission } from "@/enum/enum"
import { submissionCode } from "@/actions/submission"
import { notify, updateNotify } from "@/utils/toast.util"
import { fetchEventSource } from "@microsoft/fetch-event-source"
import { getCookie } from "cookies-next/client"
import { IRealtimeSubmission } from "@/types/realtime"
import { getRealTimeURL } from "@/actions/env"

export default function Page() {
     const router = useRouter()
     const params = useParams<{ problemId: string }>()
     const [profile, setProfile] = useState<IProfile>()
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [indexTab, setIndexTab] = useState<number>(1)
     const [problem, setProblem] = useState<IProblem>()
     const [submission, setSuibmission] = useState<ISubmission>()
     const [sourceCode, setSourceCode] = useState<string>()
     const accessToken = getCookie('accessToken')

     const handleUploadSourceCodeFile = (file: File | null) => {
          if (file) {
               const reader = new FileReader()
               reader.onload = (e) => {
                    const fileContent = e.target?.result as string
                    setSourceCode(fileContent)
               }
               reader.readAsText(file)
          }
     }

     const handleSubmitCode = async () => {
          if (problem) {
               const submitCode: ISubmitCode = {
                    problemId: params.problemId,
                    fileName: problem?.language === LanguageType.JAVA ? 'main' : '',
                    language: problem?.language,
                    sourceCode: sourceCode
               }
               const id = notify(NotifyType.LOADING, "กำลังส่งคำตอบ")
               const { status } = await submissionCode(submitCode)

               if (id) {
                    if (status === 200) {
                         updateNotify(id, NotifyType.SUCCESS, 'ส่งคำตอบสำเร็จ')
                    } else {
                         updateNotify(id, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการส่งคำตอบ')
                    }
               }
          }
     }

     useEffect(() => {
          const fetchData = async () => {
               const profile = await getProfile()
               const { status, data } = await getProblemById(params.problemId)
               const problem: IProblem = data
               setProfile(profile)
               if (status === 200) {
                    setProblem(problem)
                    setSuibmission(problem.submission[0])
                    setSourceCode(problem.submission[0]?.sourceCode)
               }
               const realTimeURL = await getRealTimeURL()
               await fetchEventSource(`${realTimeURL}/compiler/submission`, {
                    method: "GET",
                    headers: {
                         Authorization: `Bearer ${accessToken}`,
                    },
                    async onopen(response) {
                         if (response.ok) {
                              setIsLoading(false)
                         }
                    },
                    async onmessage(ev) {
                         if (ev.data === "ok") {
                              console.log("compiler connected")
                         } else {
                              const data: IRealtimeSubmission = JSON.parse(ev.data)
                              if (data.submissionId && data.submissionState === 'false') {
                                   const { status, data } = await getProblemById(params.problemId)
                                   const problem: IProblem = data
                                   if (status === 200) {
                                        setProblem(problem)
                                        setSuibmission(problem.submission[0])
                                        setSourceCode(problem.submission[0]?.sourceCode)
                                   }
                              }
                         }
                    },
               });
               setIsLoading(false)
          }
          fetchData()
     }, [params, accessToken])

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
                         <p className="max-w-[250px] hidden lg:block truncate">{problem?.courseTitle}</p>
                         <p className="hidden lg:block">/</p>
                         <p className="max-w-[250px] hidden lg:block truncate">{problem?.assignmentTitle}</p>
                         <p className="hidden lg:block">/</p>
                         <p className="max-w-full truncate">{problem?.title}</p>
                    </div>
               </div>
          </TopNav>

          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row items-center justify-between">
               <div className="flex flex-col gap-y-6 md:flex-row items-center justify-start md:gap-x-6">
                    {
                         problem?.other.map((item, index) =>
                              <ProblemChoice
                                   key={item.problemId}
                                   index={index + 1}
                                   data={item}
                                   isSelect={item.problemId === params.problemId}
                              />
                         )
                    }
               </div>
               <SubmissionNo no={submission?.no} stateSubmission={submission?.stateSubmission} />
          </div>

          <div className="flex flex-col gap-y-2 md:flex-row items-center w-full md:gap-x-2">
               <div className="w-full h-[calc(100vh-10rem-56px-10px)] flex flex-col gap-y-4 overflow-y-auto pr-3 dropdown">
                    <NavigateSubmission index={indexTab} onClick={(index) => setIndexTab(index)} />
                    {
                         indexTab === 1 ? (<>
                              <ProblemDescription title={problem?.title} value={problem?.description} />
                              <ProblemConstraint data={problem?.constraint} />
                              {
                                   problem?.testCases.map((item, index) =>
                                        <ProblemTestCase key={index} testCase={item} index={index + 1} submissionResult={submission?.result[index]} />
                                   )
                              }
                         </>
                         ) : <SubmissionTable selectedSubmission={submission} submissions={problem?.submission} onClick={(submission) => { setSuibmission(submission); setSourceCode(submission.sourceCode) }} />
                    }
               </div>

               {/* Text Editor */}
               <div className="w-full h-full flex flex-col gap-y-2">
                    <div className="w-full flex flex-row justify-between">
                         <ProblemLanguage language={problem?.language} />
                         <div className="flex flex-row items-center gap-x-4">
                              {
                                   problem?.submission[0]?.stateSubmission !== StateSubmission.PASS &&
                                   <div
                                        onClick={() => document.getElementById('sourCodeUpload')?.click()}
                                        className={`flex flex-row items-center gap-x-3 bg-transparent border-[1px] border-blackground-text hover:bg-gray-500 px-4 py-3 rounded-md cursor-pointer`}>
                                        <input
                                             type="file"
                                             id="sourCodeUpload"
                                             className="hidden"
                                             accept={`${problem?.language === LanguageType.C
                                                  ? '.c'
                                                  : problem?.language === LanguageType.CPP
                                                       ? '.cpp'
                                                       : problem?.language === LanguageType.JAVA
                                                            ? '.java'
                                                            : '.py'}`}
                                             onChange={(e) => handleUploadSourceCodeFile(e.target.files ? e.target.files[0] : null)}
                                        />
                                        <FileUploadOutlinedIcon fontSize="medium" />
                                        <p>อัพโค้ด</p>
                                   </div>
                              }
                              <ConfirmButton
                                   onClick={handleSubmitCode}
                                   disabled={problem?.submission[0]?.stateSubmission === StateSubmission.PASS}
                                   className="flex flex-row items-center gap-x-3 px-4">
                                   <CloudUploadOutlinedIcon fontSize="medium" />
                                   <p className="font-medium">ส่งคำตอบ</p>
                              </ConfirmButton>
                         </div>
                    </div>
                    <MonacoTextEditor language={problem?.language} sourceCode={sourceCode} onChange={(value) => setSourceCode(value)} />
               </div>
          </div>
     </div>)
}