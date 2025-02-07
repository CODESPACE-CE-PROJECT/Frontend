import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";

interface Props {
     className?: string
     onClick?: () => void
     disabled?: boolean
}

export const InpuFileButton: React.FC<Props> = ({ className, onClick, disabled }) => {
     return <button
          type="button"
          className={`${className} bg-white text-primary px-4 hover:bg-gray-300 py-3 rounded-md disabled:bg-blue-400`}
          onClick={onClick}
          disabled={disabled}>
          <NoteAddRoundedIcon fontSize="medium" />
          <p className="hidden lg:block">นำเข้าไฟล์</p>
     </button>
}