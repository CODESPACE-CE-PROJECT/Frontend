import React from 'react'

interface Props {
     value?: string,
     onChange: (value: string, name:string) => void
     name?: string,
}

export const TextArea:React.FC<Props> = ({value, onChange, name}) => {
     return <textarea 
          value={value}
          name={name} 
          className='w-full bg-[#2A3A50] rounded-md p-2 text-zinc-50 focus:outline-[#5572FA]'
          onChange={(e) => onChange(e.target.value, e.target.name)}
     />
}