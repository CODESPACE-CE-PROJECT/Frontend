import React, { useEffect, useState } from "react";

interface Props {
    name?: string;
    placeholder?: string;
    value?: string;
    isNumberic?: boolean;
    numberDigit?: number;
    onChange: (value: string | number, name: string) => void;
    validateText?: string;
    isSubmited?:boolean,
    textColor?: string,
    bgColor?: string
}

export const TextField: React.FC<Props> = ({ placeholder, name, onChange, value, isNumberic, numberDigit, validateText, isSubmited, textColor, bgColor}) => {
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
            maxLength={numberDigit}
            placeholder={placeholder}
            className={`h-10 py-2 px-4 gap-2.5 self-stretch rounded-[6px] ${bgColor ? bgColor : 'bg-[#2A3A50]'} focus:outline-[#5572FA] ${textColor ? textColor:'text-zinc-50'}`}
            onChange={handleChange}
            inputMode={isNumberic ? "numeric" : "text"}
            pattern={isNumberic ? "\\d*" : undefined}
        />
        {validateText && !displayText && isSubmited && <p className="mt-2 text-sm text-[#EF4343]">{validateText}</p>}
    </>
};
