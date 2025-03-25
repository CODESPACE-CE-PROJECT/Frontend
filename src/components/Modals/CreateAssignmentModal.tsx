import { Modal } from "@/components/Modals/Modal";
import { useState } from "react";
import InputDateTimePicker from "@/components/Input/InputDateTimePicker";
import { Dropdown } from "../Input/Dropdown";
import { CancelButton } from "../Button/CancelButton";
import { ConfirmButton } from "../Button/ConfirmButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  handleInputChange: (value: string, name: string) => void;
}

export const CreateAssignmentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  handleInputChange,
}) => {
  const [selectedType, setSelectedType] = useState<string>("");

  const handleTypeChange = (value: string, name: string) => {
    let mappedValue = "";
    switch (value) {
      case "แบบฝึกหัด":
        mappedValue = "EXERCISE";
        break;
      case "การทดสอบออนไซต์":
        mappedValue = "EXAMONSITE";
        break;
      case "การทดสอบออนไลน์":
        mappedValue = "EXAMONLINE";
        break;
      default:
        mappedValue = "";
    }
    setSelectedType(mappedValue); 
    handleInputChange(mappedValue, name); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mx-44 my-20">
        <h2 className="text-xl font-bold text-center text-black">
          สร้างแบบฝึกหัด/การทดสอบ
        </h2>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label className="font-medium text-black">
              หัวข้อ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              placeholder="หัวข้อ"
              onChange={(e) => handleInputChange(e.target.value, "title")}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-black">
                ประเภท <span className="text-red-500">*</span>
              </label>
              <Dropdown
                name="type"
                options={["แบบฝึกหัด", "การทดสอบออนไซต์", "การทดสอบออนไลน์"]}
                value={selectedType}
                onChange={handleTypeChange} 
                className="w-full border border-gray-300 rounded-md z-10"
                bgColor="bg-white"
                textColor="text-black"
                border="border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-black">
                วันเวลาแจ้งเตือน <span className="text-red-500">*</span>
              </label>
              <InputDateTimePicker
                value=""
                name="announceDate"
                bgColor="#FFFFFF"
                textColor="#0F1119"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-black">
                วันเวลาเริ่มต้น <span className="text-red-500">*</span>
              </label>
              <InputDateTimePicker
                value=""
                name="startAt"
                bgColor="#FFFFFF"
                textColor="#0F1119"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-black">
                วันเวลาสิ้นสุด <span className="text-red-500">*</span>
              </label>
              <InputDateTimePicker
                value=""
                name="expireAt"
                bgColor="#FFFFFF"
                textColor="#0F1119"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <CancelButton
            className="border-[#CED4DA] border px-4 py-3 rounded-md text-black w-[160px] h-[54px]"
            onClick={onClose}
          >
            ยกเลิก
          </CancelButton>
          <ConfirmButton
            className="bg-[#5572FA] text-white px-4 py-3 rounded-md w-[160px] h-[54px]"
            onClick={onSubmit}
          >
            สร้าง
          </ConfirmButton>
        </div>
      </div>
    </Modal>
  );
};
