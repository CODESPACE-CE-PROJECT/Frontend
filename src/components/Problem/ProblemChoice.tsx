import { StateSubmission } from "@/enum/enum"
import { IOtherProblem } from "@/types/problem"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface Props {
     index: number,
     data?: IOtherProblem,
     isSelect?: boolean
}

export const ProblemChoice: React.FC<Props> = ({ index, data, isSelect }) => {
     const pathname = usePathname()
     return <>
          <Link
           href={`/${pathname.includes('student') ? 'student': 'teacher'}/problem/${data?.problemId}`}
          >
               {
                    data?.stateSubmission === StateSubmission.PASS ? (<div className={`flex flex-row items-center gap-x-1 p-4 text-black bg-green-l rounded-md ${!isSelect ? 'hover:bg-green-200 cursor-pointer px-5' : ''}`}>
                         <p>{index}</p>
                         {
                              isSelect && <p>.</p>
                         }
                         {
                              isSelect && <p>{data?.title}</p>
                         }
                    </div>) : data?.stateSubmission === StateSubmission.FAILED ? (<div className={`flex flex-row items-center text-black bg-red-l gap-x-1 p-4 rounded-md ${!isSelect ? 'hover:bg-red-100 cursor-pointer px-5' : ''}`}>
                         <p>{index}</p>
                         {
                              isSelect && <p>.</p>
                         }
                         {
                              isSelect && <p>{data?.title}</p>
                         }
                    </div>) : (<div className={`flex flex-row items-center gap-x-1 p-4 bg-hover-navbar rounded-md ${!isSelect ? 'hover:bg-gray-600 cursor-pointer px-5' : ''}`}>
                         <p>{index}</p>
                         {
                              isSelect && <p>.</p>
                         }
                         {
                              isSelect && <p>{data?.title}</p>
                         }
                    </div>)
               }
          </Link>
     </>


}