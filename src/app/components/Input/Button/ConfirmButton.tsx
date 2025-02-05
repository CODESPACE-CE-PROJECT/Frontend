import { ReactNode } from "react"

interface Props {
     children: ReactNode | ReactNode[],
     className?: string
     onClick?: () => void
     disabled?: boolean
}

export const ConfirmButton: React.FC<Props> = ({ children, className, onClick, disabled }) => {
     return <button 
               type="button" 
               className={`${className} bg-primary hover:bg-blue-800 px-11 py-3 rounded-md disabled:bg-blue-400`} 
               onClick={onClick} 
               disabled={disabled}>
          {children}
     </button>
}