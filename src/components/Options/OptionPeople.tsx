import { Option } from "@/components/Options/Option"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface Props {
     onClick: (name: string) => void,
}

export const OptionPeople: React.FC<Props> = ({ onClick }) => {
     return <Option>
          <div className='flex flex-col w-40'>

               <div className='flex flex-row gap-x-2 p-3 rounded-b-xl hover:bg-hover-navbar cursor-pointer' onClick={() => onClick('delete')}>
                    <DeleteOutlinedIcon fontSize="small" />
                    <p>นำออก</p>
               </div>
          </div>
     </Option>
}