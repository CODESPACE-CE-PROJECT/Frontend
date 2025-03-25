import React from 'react'

interface Props {
     value?: string,
     onChange: (value: string, name: string) => void
     name?: string,
     validateText?: string,
     isSubmited?: boolean,
     textColor?: string,
     bgColor?: string,
     require?: boolean,
     className?: string,
     placeholder?: string
}

export const TextArea: React.FC<Props> = ({ value, onChange, name, validateText, isSubmited, textColor, bgColor, require, className, placeholder }) => {
     return <>
          <textarea
               value={value}
               name={name}
               placeholder={placeholder}
               className={`w-full ${bgColor ? bgColor: 'bg-[#2A3A50] '} ${className} rounded-md p-2 px-4 ${textColor ? textColor: 'text-zinc-50'} focus:outline-[#5572FA]`}
               onChange={(e) => onChange(e.target.value, e.target.name)}
               required={require}
          />
          {validateText && !value && isSubmited && <p className="mt-2 text-sm text-[#EF4343]">{validateText}</p>}
     </>
}