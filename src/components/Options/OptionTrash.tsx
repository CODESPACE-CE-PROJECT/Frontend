import { Option } from "@/components/Options/Option"
import PersonOffIcon from '@mui/icons-material/PersonOff';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
     onClick: (name: string) => void
}

export const OptionTrash:React.FC<Props> = ({onClick}) => {
     return <Option>
          <div className='flex flex-col w-40'>
               <div className='flex flex-row gap-x-2 p-3 rounded-t-xl hover:bg-hover-navbar cursor-pointer' onClick={() => onClick("recover")}>
                    <RefreshIcon fontSize='small' />
                    <p>กู้ข้อมูล</p>
               </div>
               <div className='flex flex-row gap-x-2 p-3 rounded-b-xl hover:bg-hover-navbar cursor-pointer' onClick={() => onClick('delete')}>
                    <PersonOffIcon fontSize="small"/>
                    <p>ลบข้อมูลถาวร</p>
               </div>
          </div>
     </Option>
}