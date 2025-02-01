import React from 'react'

interface Props {
     value?: string,
     onChange: (value: string, name: string) => void
     name?: string,
     validateText?: string,
     isSubmited?: boolean
}

export const TextArea: React.FC<Props> = ({ value, onChange, name, validateText, isSubmited }) => {
     return <>
          <textarea
               value={value}
               name={name}
               className='w-full bg-[#2A3A50] rounded-md p-2 text-zinc-50 focus:outline-[#5572FA]'
               onChange={(e) => onChange(e.target.value, e.target.name)}
          />
          {validateText && !value && isSubmited && <p className="mt-2 text-sm text-[#EF4343]">{validateText}</p>}
     </>
}