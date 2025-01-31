import React, { useEffect, useState } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

interface Props {
     name: string;
     options?: string[];
     onChange?: (value: string, name: string) => void;
     onOpenCahnge?: (name: string) => void;
     value?: string;
     className?: string;
     isOpen?: boolean;
}

export const Dropdown: React.FC<Props> = ({options, onChange, value, className, name, isOpen, onOpenCahnge}) => {
     const [displayText, setDisplayText] = useState<string | undefined>("")

     useEffect(() => {
          setDisplayText(value)
     }, [value])

     return <div className={`relative w-full ${className}`}>
          <div
               className="flex flex-row h-10 py-2 px-4 justify-between gap-2.5 self-stretch rounded-[6px] bg-[#2A3A50] cursor-pointer"
               onClick={() => {
                    onOpenCahnge && onOpenCahnge(name)
               }}
          >
               <span className={value ? `text-zinc-50` : 'text-zinc-200'}>{displayText}</span>
               <KeyboardArrowDownRoundedIcon className="text-zinc-50" />
          </div>

          {
               isOpen && <div className="absolute w-full max-h-[200px] overflow-y-auto dropdown top-12 bg-[#2A3A50] border-[1px] border-[#5572FA] rounded-[6px]">
                    {
                         options?.map((option, index) => {
                              return <div key={index} className="py-2 px-4 hover:bg-[#5572FA] cursor-pointer" onClick={() => {
                                   onOpenCahnge && onOpenCahnge(name)
                                   onChange && onChange(option, name)
                              }}>
                                   <span className="text-zinc-50">{option}</span>
                              </div>
                         })
                    }
               </div>
          }
     </div>
}