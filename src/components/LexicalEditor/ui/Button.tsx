import { ReactNode } from "react"

interface Props {
     children: ReactNode | ReactNode []
     isActive?: boolean,
     disable?: boolean,
     onClick?: () => void
}

export const Button:React.FC<Props> = ({children, isActive, disable, onClick}) => {
     return  <button className={`${isActive ? 'bg-blue-400' : 'hover:bg-gray-600'} p-1 rounded-md disabled:text-gray-500 disabled:bg-transparent`} disabled={disable} onClick={onClick}>
          {children}
     </button>
}