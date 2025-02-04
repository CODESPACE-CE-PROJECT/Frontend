import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
     children?: ReactNode | ReactNode[]
}

export const Option: React.FC<Props> = ({ children }) => {
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
          <div onClick={() => setIsOpen(prev => !prev)} className="z-0 flex text-center size-10 items-center justify-center border-[1px] rounded-md border-[#2A3A50] cursor-pointer">
               <MoreHorizOutlinedIcon className=" text-neutral-50" />
          </div>

          {
               isOpen && <div className='z-10 absolute -left-24 top-12 rounded-xl bg-[#2A3A50]'>
                    {children}
               </div>
          }
     </div>
}