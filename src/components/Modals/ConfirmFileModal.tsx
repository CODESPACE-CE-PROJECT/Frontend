import { Modal } from "@/components/Modals/Modal"
import { ConfirmButton } from "../Button/ConfirmButton"
import { CancelButton } from "../Button/CancelButton"

interface Props {
     onClose?: () => void,
     isOpen: boolean,
     onClick?: () => void
}

export const ConfirmFilModal:React.FC<Props> = ({onClose, isOpen, onClick}) => {
     return <Modal isOpen={isOpen} onClose={onClose}>
          <div className="flex flex-col items-center justify-center my-4 gap-y-24 mx-28">
               <div className="flex flex-col items-center gap-y-6 text-center">
                    <p className="text-[#0B111B] text-2xl font-semibold">ยืนยันการเพิ่มรายชื่อ</p>
                    <p className="text-black text-xl">กรุณาตรวจสอบก่อนดำเนินการอีกครั้ง</p>
               </div>
               <div className="flex flex-row items-center gap-x-8">
                    <CancelButton className="text-[#64748B] px-16 border-border-text-light" onClick={() => onClose && onClose()}>
                         ยกเลิก
                    </CancelButton>
                    <ConfirmButton className="text-pure-white px-16" onClick={() => onClick && onClick()}>
                         ตกลง
                    </ConfirmButton>
               </div>
          </div>
     </Modal>
}