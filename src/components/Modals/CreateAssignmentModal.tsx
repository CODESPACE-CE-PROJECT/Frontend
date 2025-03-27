import { Modal } from "@/components/Modals/Modal";
import InputDateTimePicker from "@/components/Input/InputDateTimePicker";
import { ICreateAssignment } from "@/types/assignment";
import { Label } from "@/components/Input/Label";
import { TextField } from "@/components/Input/TextField/TextField";
import { Dropdown } from "@/components/Input/Dropdown";
import { textAssignmentType, textToAssignmentType } from "@/utils/text.util";
import { CancelButton } from "@/components/Button/CancelButton";
import { ConfirmButton } from "@/components/Button/ConfirmButton";

interface Props {
  isOpen: boolean;
  data: ICreateAssignment;
  onClose: () => void;
  onSubmit: () => void;
  handleInputChange: (value: string | number, name: string) => void;
}

export const CreateAssignmentModal: React.FC<Props> = ({
  isOpen,
  data,
  onClose,
  onSubmit,
  handleInputChange,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" mx-44 my-20">
        <p className="text-xl font-bold text-center text-black">
          สร้างแบบฝึกหัด/การทดสอบ
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col w-full justify-start items-start">
            <Label text="หัวข้อ" isRequired={true} />
            <TextField
              name="title"
              value={data.title}
              className="bg-transparent border-border-text-light"
              placeholder="หัวข้อ"
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col w-full justify-start items-start">
              <Label text="ประเภท" isRequired={true} />
              <Dropdown
                value={textAssignmentType(data.type)}
                name="type"
                onChange={(value, name) => handleInputChange(textToAssignmentType(value) as string, name)}
                options={["แบบฝึกหัด", "การทดสอบออนไซต์", "การทดสอบออนไลน์"]}
                className="border-border-text-light border-[1px] rounded-md w-full"
                bgColor="bg-white"
                topClass="top-12 z-10"
              />
            </div>
            <div className="flex flex-col w-full justify-start items-start">
              <Label text="วันที่ประกาศ" isRequired={true} />
              <InputDateTimePicker
                value={data.announceDate.toString()}
                name="announceDate"
                bgColor="#FFFFFF"
                textColor="#0F1119"
                border="1px solid #D1D5DB"
                onChange={handleInputChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col justify-start items-start">
              <Label text="วันเวลาเริ่ม" isRequired={true} />
              <InputDateTimePicker
                value={data.startAt.toString()}
                name="startAt"
                bgColor="#FFFFFF"
                textColor="#0F1119"
                border="1px solid #D1D5DB"
                onChange={handleInputChange} />
            </div>
            <div className="flex flex-col w-full justify-start items-start">
              <Label text="วันเวลาสิ้นสุด" isRequired={true} />
              <InputDateTimePicker
                value={data.expireAt.toString()}
                name="expireAt"
                bgColor="#FFFFFF"
                textColor="#0F1119"
                border="1px solid #D1D5DB"
                onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <CancelButton
            className="py-3 hover:bg-gray-300 border-border-text-light"
            onClick={onClose}
          >
            ยกเลิก
          </CancelButton>
          <ConfirmButton
            className="px-11 text-white"
            onClick={onSubmit}
          >
            สร้าง
          </ConfirmButton>
        </div>
      </div>
    </Modal>
  );
};
