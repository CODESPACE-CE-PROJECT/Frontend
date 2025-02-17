import { StateSubmission } from "@/enum/enum"

interface Props {
     stateSubmission: StateSubmission
}

export const ProblemTestCase:React.FC<Props> = ({stateSubmission}) => {
     return <div className="flex flex-col gap-y-3">
          <div className={`text-center p-4 ${stateSubmission === StateSubmission.PASS ? 'bg-green-l' : stateSubmission === StateSubmission.FAILED ? 'bg-red-l': 'bg-table-header'} w-full rounded-md max-w-32`}>
               <p>ตัวอย่าง 1</p>
          </div>

          <div className="flex flex-row items-center gap-x-6 w-full">
               {/* Expect Output */}
               <div className="flex flex-col w-1/2 gap-y-3">
                    <p className="text-lg">โจทย์ที่กำหนด</p>
                    <div className="flex flex-col gap-y-[10px] px-4 py-2 bg-blackground-text rounded-md">
                         <p>Input:</p>
                         <p>[5, 5]</p>
                    </div>
                    <div className="flex flex-col gap-y-[10px] px-4 py-2 bg-blackground-text rounded-md">
                         <p>Output:</p>
                         <p>25</p>
                    </div>
               </div>

               {/* Result Submit */}
               <div className="flex flex-col w-1/2 gap-y-3">
                    <p className="text-lg">ผลลัพธ์</p>
                    <div className="flex flex-col gap-y-[10px] px-4 py-2 bg-blackground-text rounded-md">
                         <p>Input:</p>
                         <p>[5, 5]</p>
                    </div>
                    <div className="flex flex-col gap-y-[10px] px-4 py-2 bg-blackground-text rounded-md">
                         <p>Output:</p>
                         <p>25</p>
                    </div>
               </div>
          </div>
     </div>
}