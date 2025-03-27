import TaskIcon from '@mui/icons-material/Task';
import Link from 'next/link';

interface Props {
     className?: string
     onClick?: () => void
     disabled?: boolean
}

export const DownLoadFileButton: React.FC<Props> = ({ className, onClick, disabled }) => {
     return <Link
          href="https://drive.usercontent.google.com/download?id=1aTfJ55FhW_c515DYVQIx4521OvnW7y3o&export=download&authuser=3&confirm=t&uuid=4c2e3d60-3c03-4771-a22c-80b0b13db342&at=AEz70l498_Tt5Roqm3dvAAveYhjy:1742231116150"
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} inline-flex items-center bg-white text-primary px-4 py-3 rounded-md hover:bg-gray-100 
     ${disabled ? "pointer-events-none opacity-50" : ""}`}
          onClick={disabled ? undefined : onClick}
     >
          <TaskIcon fontSize="medium" />
          <p className="hidden lg:block ml-2">ดาวน์โหลด</p>
     </Link>
}