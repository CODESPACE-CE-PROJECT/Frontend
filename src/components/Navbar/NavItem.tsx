import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
     children?: ReactNode,
     text?: string,
     href: string,
     query?: string 
}

export const NavItem: React.FC<Props> = ({ children, text, href,  query}) => {
     const currentPath = usePathname()
     
     return <Link href={`${href}${query ? `?${query}`:''}`}>
          <div className={`flex flex-col items-center text-center w-full gap-y-4 px-4 py-3 ${!currentPath.includes(href) ? 'hover:bg-hover-navbar': 'bg-[#0E2244]'} cursor-pointer rounded-lg`}>
               {children}
               {
                    text && <p className='hidden xl:block sm:text-sm'>{text}</p>
               }
          </div>
     </Link>
}