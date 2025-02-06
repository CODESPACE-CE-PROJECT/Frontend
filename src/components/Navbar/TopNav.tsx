import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ReactNode, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
     children?: ReactNode,
     imageUrl?: string
}

export const TopNav: FC<Props> = ({ children, imageUrl }) => {
     return <div className="flex flex-row items-center w-full justify-between text-3xl font-semibold">
          {children}
          <div className="flex flex-row items-center gap-x-6">
               <NotificationsNoneIcon fontSize='large' />
               {
                    imageUrl ?
                         <Image
                              src={imageUrl}
                              alt='avatart'
                              priority={true}
                              width={45}
                              height={45}
                         /> :
                         <Link href={"/profile"}>
                              <AccountCircleIcon className='text-[45px]' />
                         </Link>
               }
          </div>
     </div>
}