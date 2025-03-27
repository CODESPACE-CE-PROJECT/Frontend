import { Option } from "./Option"
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
interface Props {
     onClick: (name: string) => void,
}

export const OptionSchool: React.FC<Props> = ({ onClick }) => {
     return <Option>
          <div className='flex flex-col w-36'>
               <div className='flex flex-row gap-x-2 p-3 rounded-t-xl hover:bg-hover-navbar cursor-pointer' onClick={() => onClick("edit")}>
                    <ModeOutlinedIcon fontSize='small' />
                    <p>แก้ไข</p>
               </div>
               <div className='flex flex-row gap-x-2 p-3 rounded-b-xl hover:bg-[#3A1617] cursor-pointer' onClick={() => onClick('delete')}>
                    <DeleteOutlinedIcon fontSize='small' />
                    <p>ลบโรงเรียน</p>
               </div>
          </div>
     </Option>
}