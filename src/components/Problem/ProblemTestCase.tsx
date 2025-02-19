import { ITestCase } from "@/types/problem"
import { ISubmissionResult } from "@/types/submission"

interface Props {
     testCase?: ITestCase,
     submissionResult?: ISubmissionResult,
     index?: number
}

export const ProblemTestCase: React.FC<Props> = ({ testCase, submissionResult, index }) => {
     return <div className="flex flex-col gap-y-3">
          <div className={`text-center p-4 ${submissionResult?.isPass === true ? 'bg-green-l text-black' : submissionResult?.isPass === false ? 'bg-red-l text-black' : 'bg-table-header'} w-full rounded-md max-w-32`}>
               <p>ตัวอย่าง {index}</p>
          </div>

          {
               !testCase?.isHidden &&
               <div className="flex flex-col items-center gap-y-3 w-full">
                    {/* Expect Output */}
                    <div className="flex flex-row w-full gap-x-3">
                         <div className="flex flex-col w-1/2 gap-y-2">
                              <p className="text-lg">โจทย์ที่กำหนด</p>
                              <div className="flex flex-col gap-y-[10px] px-4 py-2 bg-blackground-text rounded-md">
                                   <p>Input:</p>
                                   <p>{testCase?.input}</p>
                              </div>
                         </div>

                         {
                              submissionResult &&
                              <div className="flex flex-col w-1/2 gap-y-2">
                                   <p className="text-lg">ผลลัพธ์</p>
                                   <div className="flex flex-col gap-y-[10px] px-4 py-2 bg-blackground-text rounded-md">
                                        <p>Input:</p>
                                        <p>{testCase?.input}</p>
                                   </div>
                              </div>
                         }
                    </div>

                    {/* Result Submit */}
                    {
                         <div className="flex flex-row w-full gap-x-3">
                              <div className="flex flex-col w-1/2 gap-y-[10px] px-4 py-2 bg-blackground-text rounded-md">
                                   <p>Output:</p>
                                   <p>{testCase?.output}</p>
                              </div>

                              {
                                   submissionResult && <div className="flex flex-col w-1/2 gap-y-[10px] px-4 py-2 bg-blackground-text rounded-md">
                                        <p>Output:</p>
                                        <p>{submissionResult.output}</p>
                                   </div>
                              }
                         </div>
                    }
               </div>
          }
     </div>
}