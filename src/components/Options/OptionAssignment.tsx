import { Option } from "@/components/Options/Option"
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Link from "next/link";

interface Props {
    assignmentId: string;
    courseId: string;
}
export const OptionAssignment: React.FC<Props> = ({
    assignmentId,
    courseId
}) => {
    return <Option>
        <div className='flex flex-col w-36'>
        <Link href={`/teacher/course/${courseId}/assignment/${assignmentId}/update-problem`}>
            <div className='flex flex-row gap-x-2 p-3 rounded-t-xl hover:bg-[#16233A] cursor-pointer'>
                <ModeOutlinedIcon fontSize='small' />
                    แก้ไข
            </div>
            </Link>
            <div className='flex flex-row gap-x-2 p-3 rounded-b-xl hover:bg-[#16233A] cursor-pointer '>
                <DeleteOutlinedIcon fontSize='small' />
                <p>ลบ</p>
            </div>
        </div>
    </Option>
};
