import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const TopNav = () => {
     return <div className="flex flex-row items-center w-full justify-between">
          <p className="text-3xl font-semibold">คอร์สเรียน</p>
          <div className="flex flex-row items-center gap-x-6">
               <NotificationsNoneIcon fontSize='large' />
               <AccountCircleIcon fontSize='large' />
          </div>
     </div>
}