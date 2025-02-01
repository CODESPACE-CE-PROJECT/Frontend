import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import Image from 'next/image';

interface Props {
     onInput?: (file: File) => void
}

export const UploadFile: React.FC<Props> = ({ onInput }) => {
     const [urlImage, setUrlImage] = useState<string>("")

     const onDrop = useCallback((acceptedFiles: File[]) => {
          if (onInput) {
               setUrlImage(URL.createObjectURL(acceptedFiles[0]))
               onInput(acceptedFiles[0]);
          }
     }, [onInput]);

     const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept: { 'image/png': [], 'image/jpeg': [] },
          multiple: false,
     })

     return <div {...getRootProps()} className={`flex w-[840px] py-[24px] flex-col items-center gap-[16px] rounded-[12px] border-2 border-dashed border-[#2A3A50] ${isDragActive ? 'bg-zinc-400' : ''}`}>
          {
               urlImage ?
                    <Image
                         src={urlImage}
                         alt="preview"
                         width={100}
                         height={100}
                         className='w-48 h-48 object-cover'
                    /> :
                    <div className="flex h-48 flex-col items-center justify-center gap-[20px]">
                         <CloudUploadOutlinedIcon className="w-8 h-8 text-zinc-50" />
                         <span className=" text-zinc-50">เลือกรูปภาพโปรไฟล์ของโรงเรียน</span>
                         <span className=" text-[#CED4DA]">JPEG, PNG ขนาดไม่เกิน 50MB</span>
                    </div>
          }
          <div onClick={() => document.getElementById('schoolFilePicture')?.click()} className="flex justify-center items-center py-3 px-6 rounded-[6px] border border-[#2A3A50] text-zinc-50 cursor-pointer">
               <input
                    {...getInputProps()}
               />
               <p>เลือกไฟล์</p>
          </div>
     </div>
}