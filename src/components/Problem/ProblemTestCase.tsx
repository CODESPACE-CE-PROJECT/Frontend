import { ITestCase } from "@/types/problem"
import { ISubmissionResult } from "@/types/submission"
import { MonacoDisplayTestCase } from "@/components/Monaco/MonacoDisplayTestCase"

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
                              <div className="flex flex-col gap-y-[10px] px-4 py-2 bg-[#16233A] rounded-md">
                                   <p>Input:</p>
                                   <MonacoDisplayTestCase
                                        readOnly={true}
                                        value={testCase?.input}
                                   />
                              </div>
                         </div>

                         {
                              submissionResult &&
                              <div className="flex flex-col w-1/2 gap-y-2">
                                   <p className="text-lg">ผลลัพธ์</p>
                                   <div className="flex flex-col gap-y-[10px] px-4 py-2 bg-[#16233A] rounded-md">
                                        <p>Input:</p>
                                        <MonacoDisplayTestCase
                                             readOnly={true}
                                             value={testCase?.input}
                                        />
                                   </div>
                              </div>
                         }
                    </div>

                    {/* Result Submit */}
                    {
                         <div className="flex flex-row w-full gap-x-3">
                              <div className="flex flex-col w-1/2 gap-y-[10px] px-4 py-2 bg-[#16233A] rounded-md">
                                   <p>Output:</p>
                                   <MonacoDisplayTestCase
                                        readOnly={true}
                                        value={testCase?.output}
                                   />
                              </div>

                              {
                                   submissionResult && <div className="flex flex-col w-1/2 gap-y-[10px] px-4 py-2 bg-[#16233A] rounded-md">
                                        <p>Output:</p>
                                        <MonacoDisplayTestCase
                                             readOnly={true}
                                             value={submissionResult?.output}
                                        />
                                   </div>
                              }
                         </div>
                    }
               </div>
          }
     </div>
}