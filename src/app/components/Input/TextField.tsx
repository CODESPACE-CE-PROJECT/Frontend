import React, { useEffect, useState } from "react";

interface Props {
    name?: string;
    placeholder?: string;
    value?: string;
    isNumberic?: boolean;
    numberDigit?: number;
    onChange: (value: string | number, name: string) => void;
}

export const TextField: React.FC<Props> = ({ placeholder, name, onChange, value, isNumberic, numberDigit }) => {
     const [displayText, setDisplayText] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
        if (isNumberic) {
            input = input.replace(/\D/g, "");
        }
        
         if (numberDigit && input.length > numberDigit) {
            input = input.slice(0, numberDigit);
        }

        setDisplayText(input);
        onChange(isNumberic ? parseInt(input, 10): input, name || "");
    };

    useEffect(() => {
     if(value !== undefined){
          setDisplayText(value)
     }
    }, [value])

    return (
        <input
            type="text"
            name={name}
            value={displayText}
            placeholder={placeholder}
            className="h-10 py-2 px-4 gap-2.5 self-stretch rounded-[6px] bg-[#2A3A50] focus:outline-[#5572FA] text-zinc-50"
            onChange={handleChange}
            inputMode={isNumberic ? "numeric" : "text"}
            pattern={isNumberic ? "\\d*" : undefined}
        />
    );
};
