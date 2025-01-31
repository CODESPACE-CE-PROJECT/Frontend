import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { FormEvent, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

interface Props {
     onInput?: (file: File) => void
}

export const UploadFile: React.FC<Props> = ({ onInput }) => {

     const onDrop = useCallback((acceptedFiles: File[]) => {
          if (onInput) {
               onInput(acceptedFiles[0]);
          }
          console.log(acceptedFiles[0])
     }, [onInput]);

          const { getRootProps, getInputProps } = useDropzone({
               onDrop, 
               accept: { 'image/png': [], 'image/jpeg': []},
               multiple: false,
          })

     return <div {...getRootProps()} className="flex w-[840px] py-[24px] flex-col items-center gap-[16px] rounded-[12px] border-2 border-dashed border-[#2A3A50]">
          <div className="flex w-[450px] h-[116px] flex-col items-center gap-[20px]">
               <CloudUploadOutlinedIcon className="w-8 h-8 text-zinc-50" />
               <span className=" text-zinc-50">เลือกรูปภาพโปรไฟล์ของโรงเรียน</span>
               <span className=" text-[#CED4DA]">JPEG, PNG ขนาดไม่เกิน 50MB</span>
          </div>
          <div onClick={() => document.getElementById('schoolFilePicture')?.click()} className="flex justify-center items-center py-3 px-6 rounded-[6px] border border-[#2A3A50] text-zinc-50 cursor-pointer">
               <input
                    {...getInputProps()}
                    type="file"
                    id="schoolFilePicture"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onInput={(e: FormEvent) => {
                         const target = e.target as HTMLInputElement;
                         onInput && target.files && onInput(target.files[0]);
                    }}
               />
               <p>เลือกไฟล์</p>
          </div>
     </div>
}