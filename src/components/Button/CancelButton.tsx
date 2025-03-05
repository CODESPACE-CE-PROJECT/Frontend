import { ReactNode } from "react"

interface Props {
     children: ReactNode | ReactNode[],
     className?: string,
     onClick?: () => void
}

export const CancelButton: React.FC<Props> = ({ children, className, onClick }) => {
     return <button 
               type="button" 
               className={`${className} bg-transparent border-[1px] border-blackground-text hover:bg-gray-300 px-11 h-full rounded-md`}
               onClick={onClick}
               >
          {children}
     </button>
}