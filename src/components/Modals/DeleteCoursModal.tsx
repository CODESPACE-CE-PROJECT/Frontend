import { Modal } from "@/components/Modals/Modal";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { CancelButton } from "@/components/Button/CancelButton";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

export const DeleteCourseModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[500px]  rounded-lg flex flex-col items-center gap-y-6 ">
        <p className="text-lg font-medium">ยืนยันการลบคอร์สเรียน</p>
        <div className="flex gap-x-4 mt-6">
          <CancelButton className="px-12 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 transition" onClick={onClose}>
            ยกเลิก
          </CancelButton>
          <ConfirmButton className="py-3 px-12 bg-red-600 text-white rounded-md hover:bg-red-700 transition" onClick={onConfirm}>
            ตกลง
          </ConfirmButton>
        </div>
      </div>
    </Modal>
  );
};