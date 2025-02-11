import { Modal } from "@/components/Modals/Modal"
import { DownLoadFileButton } from "@/components/Button/DownLoadFileButton"
import { UploadFileExel } from "@/components/Input/UploadFileExel"
import { ConfirmButton } from "@/components/Button/ConfirmButton"
import { CancelButton } from "@/components/Button/CancelButton"

interface Props {
     isOpen: boolean,
     onClose?: () => void,
     onClick?: () => void,
     onInput?: (file: File) => void,
}

export const ImportFileModal:React.FC<Props> = ({isOpen, onClose, onClick, onInput}) => {
     return <Modal isOpen={isOpen} onClose={onClose}>
          <div className="my-4 mx-28 w-[40vw]">
               <div className="flex flex-col items-center w-full gap-y-9">
                    <p className="text-2xl font-semibold">
                         นำเข้าไฟล์
                    </p>

                    <div className="flex flex-row items-center gap-x-4">
                         <DownLoadFileButton className="flex flex-row font-semibold items-center gap-x-2 border-[1px] border-primary" />
                         <p className="text-lg">ดาวน์โหลดตัวอย่างไฟล์</p>
                    </div>
                    
                    <UploadFileExel className="w-full py-4" onInput={onInput}/>
                    
                    <div className="flex flex-row gap-x-4">
                         <CancelButton className="px-16 hover:bg-gray-100 text-[#64748B] border-border-text-light" onClick={onClose}>
                              <p>ยกเลิก</p>
                         </CancelButton>
                         <ConfirmButton className="py-4 px-16 text-pure-white" onClick={onClick}>
                              <p>ตกลง</p>
                         </ConfirmButton>    
                    </div>
               </div>
          </div>
     </Modal>
}