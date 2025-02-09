import React, { useEffect, useState } from "react";

interface Props {
    name?: string;
    placeholder?: string;
    value?: string;
    isNumberic?: boolean;
    maxLength?: number;
    onChange: (value: string | number, name: string) => void;
    validateText?: string;
    isSubmited?:boolean,
    textColor?: string,
    bgColor?: string
    onKeyDown?: () => void,
    require?: boolean,
    className?: string
}

export const TextField: React.FC<Props> = ({ placeholder, name, onChange, value, isNumberic, maxLength, validateText, isSubmited, textColor, bgColor, onKeyDown, require, className}) => {
     const [displayText, setDisplayText] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
        if (isNumberic) {
            input = input.replace(/\D/g, "");
        }
        setDisplayText(input);
        onChange(isNumberic && input.length > 0 ? parseInt(input, 10): input, name || "");
    };

    useEffect(() => {
     if(value !== undefined){
          setDisplayText(value)
     }
    }, [value])

    return <>
        <input
            type="text"
            name={name}
            value={displayText}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`h-10 py-2 px-4 gap-2.5 w-full rounded-[6px] outline-0 ${className} ${bgColor ? bgColor : 'bg-[#2A3A50]'} focus:outline-[#5572FA] ${textColor ? textColor:'text-zinc-50'}`}
            onChange={handleChange}
            inputMode={isNumberic ? "numeric" : "text"}
            pattern={isNumberic ? "\\d*" : undefined}
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    onKeyDown && onKeyDown()
                }
            }}
            required={require}
        />
        {validateText && !displayText && isSubmited && <p className="mt-2 text-sm text-red-l">{validateText}</p>}
    </>
};