import { ReactNode } from "react"

interface Props {
     children: ReactNode | ReactNode []
}

export const Button:React.FC<Props> = ({children}) => {
     return  <button className='hover:bg-gray-600 p-1 rounded-md'>
          {children}
     </button>
}