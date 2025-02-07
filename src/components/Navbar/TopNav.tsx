import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ReactNode, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRole } from '@/utils/text.util';
import { Role } from '@/enum/enum';

interface Props {
     children?: ReactNode,
     disableNotification?: boolean
     imageUrl?: string,
     role?:Role,
}

export const TopNav: FC<Props> = ({ children, imageUrl,role,disableNotification}) => {
     return <div className="flex flex-row items-center w-full justify-between text-3xl font-semibold">
          {children}
          <div className="flex flex-row items-center gap-x-6">
               {
                    !disableNotification && <NotificationsNoneIcon fontSize='large' />
               }

               {
                    imageUrl ?
                         <Link href={`/${getRole(role)}/profile`}>
                              <Image
                                   src={imageUrl}
                                   alt='avatart'
                                   priority={true}
                                   width={45}
                                   height={45}
                                   className='object-cover w-auto h-auto'
                              />
                         </Link> :
                         <Link href={`/${getRole(role)}/profile`}>
                              <AccountCircleIcon className='text-[45px]' />
                         </Link>
               }
          </div>
     </div>
}