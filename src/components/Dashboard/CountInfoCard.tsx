import { ReactNode } from 'react';

interface Props {
     title: string
     count?: string,
     children?: ReactNode
}

export const CountInfoCard: React.FC<Props> = ({ title, count, children }) => {
     return <div className="flex flex-row w-full items-center gap-x-9 bg-[#3049724D] text-neutral-50 p-6 rounded-xl">
          <div className='bg-[#0B111B] rounded-full p-6'>
               {children}
          </div>
          <div className='flex flex-col gap-y-4'>
               <p className='text-2xl font-semibold'>{title}</p>
               {
                    count !== undefined && <p className='text-xl font-normal'>{count}</p>
               }
          </div>
     </div>
}