import { ConstraintType } from "@/enum/enum"
import { IConstraint } from "@/types/problem"

interface Props {
     data?: IConstraint[]
}

export const ProblemConstraint:React.FC<Props> = ({data}) => {
     return <div className="flex flex-row gap-x-16 w-full px-9 py-3 bg-[#3A1617] rounded-xl">
          <p className="text-xl font-bold">ข้อจำกัด</p>
          <div className="flex flex-col items-center justify-center">
               <ul style={{listStyleType: 'inherit'}} className="text-lg">
                    {
                         data?.map((itme) => <li key={itme.constraintId}>ห้ามใช้ {itme.type === ConstraintType.CLASS ? 'ไลบราลี่ ': 'ฟังก์ชัน '}{itme.keyword}</li>)
                    }
               </ul>
          </div>
     </div>
}