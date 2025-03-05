import { Modal } from "@/components/Modals/Modal";
import { useState } from "react";
import InputDateTimePicker from "@/components/Input/InputDateTimePicker";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" mx-44 my-20">
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
              <select
                className="w-full p-2 border border-gray-300 rounded-md text-black"
                onChange={(e) => handleInputChange(e.target.value, "type")}
              >
                <option value="EXERCISE">แบบฝึกหัด</option>
                <option value="EXAMONSITE">การทดสอบ</option>
                <option value="EXAMONLINE">การทดสอบออนไลน์</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-black">
                วันเวลาแจ้งเตือน <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
                onChange={(e) =>
                  handleInputChange(e.target.value, "announceDate")
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium text-black">
                วันเวลาเริ่มต้น <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
                onChange={(e) => handleInputChange(e.target.value, "startAt")}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-black">
                วันเวลาสิ้นสุด <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
                onChange={(e) => handleInputChange(e.target.value, "expireAt")}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className="border-[#CED4DA] border px-6 py-2 rounded-md text-black"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            className="bg-[#5572FA] text-white px-6 py-2 rounded-md"
            onClick={onSubmit}
          >
            สร้าง
          </button>
        </div>
      </div>
    </Modal>
  );
};
