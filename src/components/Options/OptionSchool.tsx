import { Option } from "./Option"
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export const OptionSchool = () => {
     return <Option>
          <div className='flex flex-col'>
               <div className='flex flex-row gap-x-2 p-3 rounded-t-xl hover:bg-[#16233A] cursor-pointer'>
                    <ModeOutlinedIcon fontSize='small' />
                    <p>แก้ไข</p>
               </div>
               <div className='flex flex-row gap-x-2 p-3 rounded-b-xl hover:bg-[#16233A] cursor-pointer'>
                    <DeleteOutlinedIcon fontSize='small' />
                    <p>ลบโรงเรียน</p>
               </div>
          </div>
     </Option>
}