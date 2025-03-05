import { Modal } from "@/components/Modals/Modal";
import { DownLoadFileButton } from "@/components/Button/DownLoadFileButton";
import { UploadFileExel } from "@/components/Input/UploadFileExel";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { CancelButton } from "@/components/Button/CancelButton";
import { SearchBar } from "../Input/SerachBar";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: () => void;
  onInput?: (file: File) => void;
}

export const AddPeopleModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onClick,
  onInput,
}) => {
  const [search, setSearch] = useState<string>("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mx-24 my-20 w-[40vw] p-2 rounded-lg">
        <div className="flex flex-col items-center w-full gap-y-6">
          <p className="text-2xl font-semibold text-center text-gray-800">
            เพิ่มสมาชิกในคอร์ส
          </p>

          <div className="flex items-center gap-x-4 justify-between w-full">
            <div className="flex items-center gap-x-2">
              <DownLoadFileButton className="font-semibold items-center gap-x-2 border-[1px] border-primary px-4 py-2 rounded-md" />
              <p className="text-lg text-gray-700">ดาวน์โหลดตัวอย่างไฟล์</p>
            </div>
            <div className="flex items-center">
              <p className="text-lg text-gray-700">นำเข้าไฟล์</p>
            </div>
          </div>

          <SearchBar onChange={(value) => setSearch(value)} />

          <div className="flex gap-x-4 justify-center mt-6">
            <CancelButton
              className="px-12 py-3 bg-gray-100 text-[#64748B] border border-border-text-light rounded-md hover:bg-gray-200 transition"
              onClick={onClose}
            >
              <p>ยกเลิก</p>
            </CancelButton>
            <ConfirmButton
              className="py-3 px-12 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              onClick={onClick}
            >
              <p>ตกลง</p>
            </ConfirmButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
