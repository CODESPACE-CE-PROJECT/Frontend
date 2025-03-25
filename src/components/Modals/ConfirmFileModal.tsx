import { Modal } from "@/components/Modals/Modal"
import { ConfirmButton } from "@/components/Button/ConfirmButton"
import { CancelButton } from "@/components/Button/CancelButton"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface Props {
     onClose?: () => void,
     isOpen: boolean,
     onClick?: () => void,
     isDuplicate?: boolean,
     isExist?: boolean
}

export const ConfirmFilModal: React.FC<Props> = ({ onClose, isOpen, onClick, isDuplicate, isExist }) => {
     return <Modal isOpen={isOpen} onClose={onClose}>
          <div className="flex flex-col items-center justify-center my-4 gap-y-24 mx-28">
               <div className="flex flex-col items-center gap-y-6 text-center">
                    <p className="text-[#0B111B] text-2xl font-semibold">ยืนยันการเพิ่มรายชื่อ</p>
                    {
                         isDuplicate && (<div className="flex flex-row items-center justify-start gap-x-2 w-full">
                              <WarningAmberIcon className="text-[#DE8209]"/>
                              <p className="text-[#DE8209]">ข้อมูลในไฟล์ที่คุณกรอกมีรายชื่อซํ้า</p>
                         </div>
                         )
                    }
                    {
                         isExist && (<div className="flex flex-row items-center justify-start gap-x-2 w-full">
                              <WarningAmberIcon className="text-red-l"/>
                              <p className="text-red-l">ข้อมูลในไฟล์ที่คุณกรอกมีอยู่ในระบบแล้ว</p>
                         </div>)
                    }
                    <p className="text-black text-xl">กรุณาตรวจสอบก่อนดำเนินการอีกครั้ง</p>
               </div>
               <div className="flex flex-row items-center gap-x-8">
                    <CancelButton className="text-[#64748B] px-16 py-3 border-border-text-light" onClick={() => onClose && onClose()}>
                         ยกเลิก
                    </CancelButton>
                    <ConfirmButton className="text-pure-white px-16" onClick={() => onClick && onClick()} disabled={isDuplicate || isExist}>
                         ตกลง
                    </ConfirmButton>
               </div>
          </div>
     </Modal>
}