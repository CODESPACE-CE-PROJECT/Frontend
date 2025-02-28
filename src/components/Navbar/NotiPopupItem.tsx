import TripOriginIcon from '@mui/icons-material/TripOrigin';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { INotification } from '@/types/notification';
import { useState } from 'react';
import { NotificationType } from '@/enum/enum';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
     data: INotification,
     onClose: (notificationId: string) => void
}

export const NotiPopupItem: React.FC<Props> = ({ data, onClose }) => {
     const [isToggle, setIsToggle] = useState<boolean>(false);
     const pathname = usePathname();
     const prefixPath = pathname.startsWith('/student') ? '/student' : pathname.startsWith('/teacher') ? '/teacher' : '/admin';

     return <div className="flex flex-col items-start font-normal gap-y-3">
          <div className="flex flex-row items-center gap-x-2 w-full">
               <TripOriginIcon className="text-primary" />
               <p className='truncate w-32 text-primary'>{data.detail}</p>
               <p className='text-[#808080] text-nowrap'>{new Date(data.createdAt).toLocaleString('th')}</p>
               <button onClick={() => setIsToggle(prev => !prev)}>
                    {
                         isToggle ?
                              <KeyboardArrowUpIcon className='text-[#808080]' fontSize="medium" />
                              : <KeyboardArrowDownIcon className='text-[#808080]' fontSize="medium" />
                    }
               </button>
          </div>
          {
               isToggle && <>
                    <div className='flex flex-col items-start gap-x-2 w-full text-[15px]'>
                         <p>{data.user.firstName} {data.user.lastName}</p>
                         <p className='text-start text-[#808080]'>{data.detail}</p>
                    </div>
                    <div className='flex flex-row items-center gap-x-2 w-full'>
                         <button className='text-primary w-full hover:bg-primary hover:bg-opacity-25 hover:rounded-md' onClick={() => onClose(data.notificationId)}>ปิด</button>
                         {
                              data.type === NotificationType.ACTION ?
                                   <div className='w-full' />
                                   : <Link href={`${prefixPath}/course/${data.courseId}/${data.type === NotificationType.GENERAL ? 'general': 'announcement'}`} className='text-primary w-full text-center py-1 hover:bg-primary hover:bg-opacity-25 hover:rounded-md'>ดูประกาศ</Link>
                         }
                    </div>
               </>
          }
     </div>
}