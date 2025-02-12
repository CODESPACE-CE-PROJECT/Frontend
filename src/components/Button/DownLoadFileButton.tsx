import TaskIcon from '@mui/icons-material/Task';
import Link from 'next/link';

interface Props {
     className?: string
     onClick?: () => void
     disabled?: boolean
}

export const DownLoadFileButton: React.FC<Props> = ({ className, onClick, disabled }) => {
     return <Link
          href="/FileFormat/example-import-file.xlsx"
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