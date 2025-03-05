import { Option } from "@/components/Options/Option"
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface Props {
     onClick: (name: string, allowLogin: boolean | null) => void,
     allowLogin: boolean
}


export const OptionPeople: React.FC<Props> = ({ onClick, allowLogin }) => {
     return <Option>
          <div className='flex flex-col w-40'>
               
               <div className='flex flex-row gap-x-2 p-3 rounded-b-xl hover:bg-hover-navbar cursor-pointer' onClick={() => onClick('delete', null)}>
                    <DeleteOutlinedIcon fontSize="small" />
                    <p>นำออก</p>
               </div>
          </div>
     </Option>
}