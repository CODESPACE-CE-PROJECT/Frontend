import { Option } from "@/components/Options/Option"
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface Props {
     onClick: (name: string, allowLogin: boolean | null) => void,
     allowLogin: boolean
}


export const OptionUser: React.FC<Props> = ({ onClick, allowLogin }) => {
     return <Option>
          <div className='flex flex-col w-40'>
               <div className='flex flex-row gap-x-2 p-3 rounded-t-xl hover:bg-hover-navbar cursor-pointer' onClick={() => onClick("edit", null)}>
                    <ModeEditOutlineOutlinedIcon fontSize="small" />
                    <p>แก้ไข</p>
               </div>
               <div className='flex flex-row gap-x-2 p-3 hover:bg-hover-navbar cursor-pointer' onClick={() => onClick('allowLogin', allowLogin)}>
                    <PersonOffIcon fontSize="small" />
                    <p>{allowLogin ? 'ปิดใช้งานบัญชี' : 'เปิดใช้งานบัญชี'}</p>
               </div>
               <div className='flex flex-row gap-x-2 p-3 rounded-b-xl hover:bg-hover-navbar cursor-pointer' onClick={() => onClick('delete', null)}>
                    <DeleteOutlinedIcon fontSize="small" />
                    <p>ลบบัญชี</p>
               </div>
          </div>
     </Option>
}