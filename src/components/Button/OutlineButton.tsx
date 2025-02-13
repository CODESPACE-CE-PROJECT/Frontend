import { ReactNode } from "react"

interface Props {
     children: ReactNode | ReactNode[],
     className?: string,
     onClick?: () => void
}

export const OutlineButton: React.FC<Props> = ({ children, className, onClick }) => {
     return <button 
               type="button" 
               className={`${className} bg-transparent border-[1px] rounded-md`}
               onClick={onClick}
               >
          {children}
     </button>
}