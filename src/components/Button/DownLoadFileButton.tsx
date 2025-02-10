import TaskIcon from '@mui/icons-material/Task';

interface Props {
     className?: string
     onClick?: () => void
     disabled?: boolean
}

export const DownLoadFileButton: React.FC<Props> = ({ className, onClick, disabled }) => {
     return <button
               type="button"
               className={`${className} bg-white text-primary px-4 hover:bg-gray-100 py-3 rounded-md disabled:bg-blue-400`}
               onClick={onClick}
               disabled={disabled}
          >
          <TaskIcon fontSize="medium" />
          <p className="hidden lg:block">ดาวน์โหลด</p>
     </button>
}