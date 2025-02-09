import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

interface Props {
  name: string;
  options?: string[];
  onChange?: (value: string, name: string) => void;
  value?: string;
  className?: string;
  validateText?: string;
  isSubmited?: boolean;
  topClass?: string;
  bgColor?: string;
  textColor?: string;
}

export const Dropdown: React.FC<Props> = ({
  options = [],
  onChange,
  value,
  className,
  name,
  validateText,
  isSubmited,
  topClass,
  bgColor,
  textColor
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropDownRef}>
      <div
        className={`flex flex-row h-full ${textColor || 'text-zinc-50'} items-center py-2 px-4 justify-between gap-2.5 self-stretch rounded-[6px] ${bgColor || 'bg-[#2A3A50]'} cursor-pointer`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={value ? '' : 'text-zinc-200'}>{value}</span>
        <KeyboardArrowDownRoundedIcon />
      </div>

      {validateText && !value && isSubmited && (
        <p className="mt-2 text-sm text-[#EF4343]">{validateText}</p>
      )}

      {isOpen && (
        <div
          className={`absolute w-full max-h-[200px] ${textColor || 'text-zinc-50'} overflow-y-auto dropdown ${topClass || 'top-12'} ${bgColor || 'bg-[#2A3A50]'} border-[1px] border-[#5572FA] rounded-[6px]`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="py-2 px-4 hover:bg-[#5572FA] cursor-pointer"
              onClick={() => {
                onChange && onChange(option, name);
                setIsOpen(false);
              }}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
