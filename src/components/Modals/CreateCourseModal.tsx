import { Modal } from "@/components/Modals/Modal";
import { UploadFile } from "@/components/Input/UploadFile";
import { Label } from "@/components/Input/Label";
import { TextField } from "@/components/Input/TextField/TextField";
import { TextArea } from "@/components/Input/TextArea";
import { ConfirmButton } from "../Button/ConfirmButton";
import { CancelButton } from "../Button/CancelButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  handleInputChange: (value: string | number, name: string) => void;
  handleImageUpload: (file: File | null) => void;
}

export const CreateCourseModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  handleInputChange,
  handleImageUpload,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="my-4 mx-28">
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-2xl font-semibold">สร้างคอร์สในโรงเรียน</p>

          <UploadFile
            text="เลือกรูปภาพคอร์สเรียน"
            className="w-[35vw] py-6 border-border-text-light"
            onInput={handleImageUpload}
          />

          <div className="flex flex-col items-start w-full gap-y-2">
            <Label text="ชื่อวิชา" isRequired={true} />
            <TextField
              name="title"
              bgColor="bg-white"
              placeholder="ชื่อวิชา"
              className="border-border-text-light"
              onChange={(value) => handleInputChange(value, "title")} // ✅ ส่งค่า string โดยตรง
            />
          </div>

          <div className="flex flex-col items-start w-full gap-y-2">
            <Label text="รายละเอียด" isRequired={false} />
            <TextArea
              name="description"
              bgColor="bg-white"
              placeholder="รายละเอียด"
              className="border-border-text-light"
              onChange={(value) => handleInputChange(value, "description")} // ✅ ส่งค่า string โดยตรง
            />
          </div>

          <div className="flex flex-row gap-x-6">
            <CancelButton
              onClick={onClose}
              className="hover:bg-[#f3f4f6] border-border-text-light w-[160px] h-[54px]"
            >
              ยกเลิก
            </CancelButton>
            <ConfirmButton
              onClick={onSubmit}
              className="text-pure-white w-[160px] h-[54px]"
            >
              สร้าง
            </ConfirmButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
