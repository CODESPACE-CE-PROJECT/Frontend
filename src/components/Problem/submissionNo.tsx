import { StateSubmission } from "@/enum/enum"

interface Props {
     no?: number,
     stateSubmission?: StateSubmission
}

export const SubmissionNo: React.FC<Props> = ({ no, stateSubmission }) => {
     return <>
          {
               no && stateSubmission && stateSubmission !== StateSubmission.NOTSEND && 
               <div className={`flex items-center text-black justify-center rounded-md ${stateSubmission === StateSubmission.PASS ? 'bg-green-l' : 'bg-red-l'}  h-full p-4`}>
                    ส่งแล้ว {no} ครั้ง
               </div>
          }
     </>

}