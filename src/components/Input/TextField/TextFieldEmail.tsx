import React, { useEffect, useState } from "react";

interface Props {
     name?: string;
     placeholder?: string;
     value?: string;
     maxLength?: number;
     onChange: (value: string, name: string) => void;
     validateText?: string;
     isSubmited?: boolean;
     textColor?: string;
     bgColor?: string;
     onKeyDown?: () => void;
     require?: boolean;
     className?: string;
}

export const TextFieldEmail: React.FC<Props> = ({
     placeholder,
     name,
     onChange,
     value,
     maxLength,
     validateText,
     isSubmited,
     textColor,
     bgColor,
     onKeyDown,
     require,
     className
}) => {
     const [displayText, setDisplayText] = useState<string>("");
     const [isValid, setIsValid] = useState<boolean>(true);

     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

     useEffect(() => {
          if (value !== undefined) {
               setDisplayText(value)
          }
          if(value === ""){
               setIsValid(false)
          }
     }, [value]);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          setDisplayText(newValue);
          onChange(newValue, name || "");
          setIsValid(emailRegex.test(newValue) && newValue.trim() !== "");
     };

     return (
          <div className="w-full">
               <input
                    type="email"
                    name={name}
                    value={displayText}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className={`h-10 py-2 px-4 gap-2.5 w-full rounded-[6px] outline-0 ${className} 
                    ${bgColor ? bgColor : "bg-[#2A3A50]"} 
                    focus:outline-[#5572FA] ${textColor ? textColor : "text-zinc-50"}`}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                         if (e.key === "Enter") {
                              onKeyDown && onKeyDown();
                         }
                    }}
                    required={require}
               />
               {
                    (!isValid && isSubmited) && (
                         <p className="mt-2 text-sm text-red-500">
                              {validateText}
                         </p>
                    )
               }
          </div>
     );
};
