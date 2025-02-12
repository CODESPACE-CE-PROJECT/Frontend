import React, { ReactNode, useEffect, useRef, useState } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

interface Props {
     onClick: (isOpen: boolean) => void
     isOpen: boolean,
     children: ReactNode | ReactNode[]
     className?: string
     value?: ReactNode
}

export const DropDown: React.FC<Props> = ({
     children,
     className,
     value,
     isOpen,
     onClick
}) => {
     const dropDownRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                    onClick(false);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, [onClick]);

     return (
          <div className={`relative ${className}`} ref={dropDownRef}>
               <div
                    className={`flex flex-row items-center p-2 justify-between gap-2.5 self-stretch rounded-[6px] cursor-pointer`}
                    onClick={() => onClick(!isOpen)}
               >
                    <div className='flex flex-row items-center gap-x-2'>
                         {value}
                    </div>
                    <KeyboardArrowDownRoundedIcon />
               </div>

               {isOpen && (
                    <div
                         className={`absolute z-40 top-10 px-2 min-w-48 bg-hover-navbar bg-opacity-75 rounded-[6px] shadow-sm`}
                    >
                         {children}
                    </div>
               )}
          </div>
     );
};
