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
                                   width={100}
                                   height={100}
                                   className='w-12 h-12 object-cover border border-blackground-text rounded-full'
                              />
                         </Link> :
                         <Link href={`/${getRole(role)}/profile`}>
                              <AccountCircleIcon fontSize='inherit' className='text-[48px]' />
                         </Link>
               }
          </div>
     </div>
}