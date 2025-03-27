import { StateSubmission } from "@/enum/enum"
import { ISubmission } from "@/types/submission"

interface Props {
     selectedSubmission?: ISubmission
     submissions?:ISubmission[]
     onClick?: (submission: ISubmission) => void
}

export const SubmissionTable:React.FC<Props> = ({selectedSubmission,submissions, onClick}) => {
     return <div className="w-full">
     <div className="table w-full rounded-xl">
          <div className="table-header-group bg-[#3049724D] w-full">
               <div className="table-row text-xl font-medium">
                    <div className="table-cell text-center align-middle rounded-l-xl px-8 py-4">ครั้งที่</div>
                    <div className="table-cell text-center align-middle px-8 py-4">วันเวลาที่ส่ง</div>
                    <div className="table-cell text-center align-middle py-4 rounded-r-xl">สถานะ</div>
               </div>
          </div>

          <div className="table-row-group w-full">
               <div className="table-row w-full">
                    <div className="table-cell align-middle py-2" />
               </div>
               {submissions?.map((item) => (
                    <div className={`table-row w-full ${selectedSubmission?.submissionId === item.submissionId ? 'bg-gray-700': 'hover:bg-gray-600 hover:bg-opacity-15'}  text-center cursor-pointer text-lg`}
                         key={item.submissionId}
                         onClick={() => onClick && onClick(item)}
                    >
                         <div className="table-cell rounded-l-md align-middle p-4">{item.no}</div>
                         <div className="table-cell align-middle p-4">{new Date(item.createdAt).toLocaleString('th')}</div>
                         <div className={`table-cell rounded-r-md align-middle p-4 ${item.stateSubmission === StateSubmission.PASS ? 'text-green-l': 'text-red-l'} font-medium`}>{item.stateSubmission === StateSubmission.PASS ? 'ผ่าน': 'ไม่ผ่าน'}</div>
                    </div>
               ))}
          </div>
     </div>
</div>
}