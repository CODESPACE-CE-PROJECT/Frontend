import { ReactNode } from "react"

interface Props {
     children: ReactNode | ReactNode[],
     onClick?: (children: ReactNode) => void,
     selected?: boolean,
}

export const DropDownItem: React.FC<Props> = ({ children, onClick, selected}) => {
     return <button onClick={() =>  selected || onClick && onClick(children)} className={`flex flex-row w-full items-center gap-x-2 p-2 px-3 my-2 rounded-md ${selected ? 'bg-primary bg-opacity-40' : 'hover:bg-primary hover:bg-opacity-25'}`}>
          {children}
     </button>
}