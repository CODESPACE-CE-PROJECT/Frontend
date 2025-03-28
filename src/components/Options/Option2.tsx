import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
     children?: ReactNode | ReactNode[]
}

export const Option2: React.FC<Props> = ({ children }) => {
     const [isOpen, setIsOpen] = useState(false)
     const optionRef = useRef<HTMLDivElement>(null);
     const handleClickOutside = (event: MouseEvent) => {
          if (optionRef.current && !optionRef.current?.contains(event.target as Node)) {
               setIsOpen(false)
          }
     };

     useEffect(() => {
          document.addEventListener("mousedown", handleClickOutside)
          return () => document.removeEventListener("mousedown", handleClickOutside)
     }, [isOpen])

     return <div className='relative' ref={optionRef}>
          <div onClick={() => setIsOpen(prev => !prev)} className="z-0 flex text-center size-10 items-center justify-center cursor-pointer">
               <MoreVertIcon className=" text-neutral-50" />
          </div>
          {
               isOpen && <div className='text-left z-10 absolute right-2 top-9 rounded-lg bg-[#2A3A50]' onClick={() => setIsOpen(prev => !prev)}>
                    {children}
               </div>
          }
     </div>
}