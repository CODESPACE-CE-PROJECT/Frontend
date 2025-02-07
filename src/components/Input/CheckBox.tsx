import React from "react";
import { Checkbox as CheckBoxMUI } from "@mui/material";

interface Props {
     onChange: (value: boolean) => void;
     isChecked: boolean;
     label?: string;
     className?: string;
     textColor?: string
}

export const CheckBox: React.FC<Props> = ({ onChange, isChecked, label, className, textColor }) => {

     return <div className={`flex flex-row gap-x-2 ${className} ${textColor ? textColor: 'text-zinc-50'}`}>
          <CheckBoxMUI 
                    checked={isChecked}
                    onChange={(e) => onChange(e.target.checked)}
                    sx={
                    {    color: "#5572FA",
                         '&.Mui-checked': {
                              color: "#5572FA",
                         },
                         padding: "0px",
                         margin: "0px"
                    }
               } />
          <p>{label}</p>
     </div> 
};