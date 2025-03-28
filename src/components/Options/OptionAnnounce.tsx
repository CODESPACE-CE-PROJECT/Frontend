import { Option2 } from "@/components/Options/Option2"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface Props {
     onClick: (name: string) => void,
}

export const OptionAnnounce: React.FC<Props> = ({ onClick }) => {
     return <Option2>
          <div className='flex flex-col w-40'>
               <div className='flex flex-row gap-x-2 p-3 rounded-lg hover:bg-red-400 hover:text-black cursor-pointer' onClick={() => onClick('delete')}>
                    <DeleteOutlinedIcon fontSize="small" />
                    <p>ลบประกาศ</p>
               </div>
          </div>
     </Option2>
}