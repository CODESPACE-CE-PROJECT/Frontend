import { Option } from "@/components/Options/Option"
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
export const OptionUser = () => {
     return <Option>
          <div className='flex flex-col w-36'>
               <div className='flex flex-row gap-x-2 p-3 rounded-t-xl hover:bg-[#16233A] cursor-pointer'>
                    <ModeOutlinedIcon fontSize='small' />
                    <p>แก้ไข</p>
               </div>
               <div className='flex flex-row gap-x-2 p-3 rounded-b-xl hover:bg-[#16233A] cursor-pointer '>
                    <DeleteOutlinedIcon fontSize='small' />
                    <p>ลบ</p>
               </div>
          </div>
     </Option>
}