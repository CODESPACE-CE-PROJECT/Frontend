import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    text?: string;
    href: string;
    query?: string;
    additionHref?: string;
}

export const NavItem: React.FC<Props> = ({ children, text, href, query, additionHref }) => {
    const currentPath = usePathname();

    const isActive = currentPath.includes(href) || (additionHref && currentPath.includes(additionHref));

    return (
        <Link href={`${href}${query ? `?${query}` : ''}`}>
            <div
                className={`flex flex-col items-center text-center w-full gap-y-4 px-4 py-3 
                ${isActive ? 'bg-[#0E2244]' : 'hover:bg-hover-navbar'} 
                cursor-pointer rounded-lg`}
            >
                {children}
                {text && <p className="hidden xl:block sm:text-sm">{text}</p>}
            </div>
        </Link>
    );
};
