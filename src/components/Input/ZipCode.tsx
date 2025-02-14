import { useEffect, useRef, useState } from "react";

interface Props {
     onChange?: (value: string) => void
     value?: string
}

export const ZipCode:React.FC<Props> = ({onChange, value}) => {
    const [zipcode, setZipcode] = useState<string>("");
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (onChange) {
            onChange(zipcode);
        }
    }, [zipcode, onChange]);

    useEffect(() => {
            if(value){
                setZipcode(value)
            }else{
                setZipcode("")
            }
    }, [value])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length > 1) return;

        const newZipcode = zipcode.split('');
        newZipcode[index] = value; 
        setZipcode(newZipcode.join(''));

        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !zipcode[index]) {
            if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    return (
        <div className="flex w-full gap-3 self-stretch">
            {Array.from({ length: 5 }).map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1} 
                    pattern="\d*"
                    inputMode="numeric"
                    value={zipcode[index] || ""}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                        inputsRef.current[index] = el;
                    }}
                    className="w-10  h-10 text-zinc-50 text-center bg-[#2A3A50] rounded-[6px] focus:outline-[#5572FA]"
                />
            ))}
        </div>
    );
};