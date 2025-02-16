import { ButtonHTMLAttributes, forwardRef } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
     isActive?: boolean,
}

export const Button = forwardRef<HTMLButtonElement, Props>(({isActive, ...props}, ref) => {
     return  <button 
               className={`${isActive ? 'bg-blue-400' : 'hover:bg-gray-600'} p-1 rounded-md disabled:text-gray-500 disabled:bg-transparent`}
               ref={ref}
               {...props}
             />
}) 

Button.displayName = "Button"