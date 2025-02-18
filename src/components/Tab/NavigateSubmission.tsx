interface Props {
     index: number
     onClick: (index: number) => void
}

export const NavigateSubmission: React.FC<Props> = ({ index, onClick }) => {
     return <div className="relative w-full">
          <div className="flex gap-12">
               <div
                    className={`text-base font-semibold cursor-pointer px-4 py-2 pb-2  
                         ${index === 1 ? "text-white border-b-4 border-primary" : "text-gray-400 hover:text-gray-300  hover:border-b-4 hover:border-gray-300"}`
                    }
                    onClick={() => onClick(1)}
               >
                    รายละเอียดโจทย์ปัญหา
               </div>
               <div
                    className={`text-base font-semibold cursor-pointer px-4 py-2 pb-2  
                         ${index === 2 ? "text-white border-b-4 border-[#5572FA]" : "text-gray-400 hover:text-gray-300  hover:border-b-4 hover:border-gray-300"}`
                    }
                    onClick={() => onClick(2)}
               >
                    รายละเอียดการส่ง
               </div>
          </div>
     </div>
}