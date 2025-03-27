import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useCallback,useState } from 'react';
import { useDropzone } from 'react-dropzone'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

interface Props {
     onInput?: (file: File) => void,
     texColor?: string,
     className?: string,
}

export const UploadFileExel: React.FC<Props> = ({ onInput, texColor, className}) => {
     const [exelFile, setExelFile] = useState<File>()
     const onDrop = useCallback((acceptedFiles: File[]) => {
          if (onInput) {
               setExelFile(acceptedFiles[0])
               onInput(acceptedFiles[0]);
          }
     }, [onInput]);

     const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':[], 'application/vnd.ms-excel': [] },
          multiple: false,
     })

     return <div {...getRootProps()} className={`flex ${className} flex-col items-center gap-[16px] rounded-[12px] border-2 border-dashed ${isDragActive ? 'bg-zinc-400' : ''}`}>
          {
               exelFile?
                    <div className='flex flex-col items-center justify-center h-48 gap-y-2 text-center'>
                         <InsertDriveFileOutlinedIcon fontSize='inherit' className='size-14 text-blackground-text'/>
                         <p className='text-lg px-4'>{exelFile.name}</p>
                    </div>:
                    <div className="flex h-48 flex-col items-center justify-center gap-[20px]">
                         <CloudUploadOutlinedIcon className="w-8 h-8 text-zinc-50" />
                         <span className={`${texColor ? texColor: 'text-zinc-50'}`}>เลือกไฟล์ Exel เข้าสู่ระบบ</span>
                         <span className=" text-[#8b8e91]">ไฟล์ Exel ขนาดไม่เกิน 50 MB</span>
                    </div>
          }
          <div onClick={() => document.getElementById('schoolFilePicture')?.click()} className={`flex justify-center items-center py-3 px-6 rounded-[6px] border border-[#2A3A50] ${texColor ? texColor: 'text-zinc-50'} cursor-pointer`}>
               <input
                    {...getInputProps()}
               />
               <p>เลือกไฟล์</p>
          </div>
     </div>
}