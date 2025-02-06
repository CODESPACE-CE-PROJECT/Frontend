import React, { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
    name?: string;
    placeholder?: string;
    onChange: (value: string | number, name: string) => void;
    onKeyDown?: () => void,
    require?: boolean
}

export const TextFieldPassword: React.FC<Props> = ({ placeholder, name, onChange, onKeyDown, require }) => {
    const [type, setType] = useState<boolean>(false)

    return <div className="relative w-full">
        <input
            type={type ? "text" : "password"}
            name={name}
            className="shadow-sm rounded-md w-full px-4 py-2 focus:outline-none bg-[#2A3A50] pr-10"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value, e.target.name)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onKeyDown && onKeyDown()
                }
            }}
            required={require}
        />
        <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setType(prev => !prev)}
        >
            {type ? (
                <VisibilityIcon />
            ) : (
                <VisibilityOffIcon />
            )}
        </span>
    </div>
};
