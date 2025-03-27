import { useState } from "react";
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
  const [subjectName, setSubjectName] = useState<string>("");
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [academicYear, setAcademicYear] = useState<string>("");

  const updateTitle = (
    subject: string,
    level: string,
    sem: string,
    year: string
  ) => {
    const newTitle = `${subject} ${level}/${sem}/${year}`;
    handleInputChange(newTitle, "title");
  };

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

          {/* ชื่อวิชา */}
          <div className="flex flex-col items-start w-full gap-y-2">
            <Label text="ชื่อวิชา" isRequired={true} />
            <TextField
              name="subjectName"
              bgColor="bg-white"
              placeholder="ชื่อวิชา"
              className="border-border-text-light"
              onChange={(value) => {
                setSubjectName(String(value));
                updateTitle(
                  String(value),
                  educationLevel,
                  semester,
                  academicYear
                );
              }}
            />
          </div>

          {/* ระดับชั้นการศึกษา / ภาคเรียน / ปีการศึกษา */}
          <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex flex-col items-start w-full gap-y-2">
              <Label text="ระดับชั้นการศึกษา" isRequired={false} />
              <TextField
                bgColor="bg-white"
                placeholder="ระดับชั้นการศึกษา"
                className="border-border-text-light"
                onChange={(value) => {
                  setEducationLevel(String(value));
                  updateTitle(
                    subjectName,
                    String(value),
                    semester,
                    academicYear
                  );
                }}
              />
            </div>

            <div className="flex flex-col items-start w-full gap-y-2">
              <Label text="ภาคเรียน" isRequired={false} />
              <TextField
                bgColor="bg-white"
                placeholder="ภาคเรียน"
                className="border-border-text-light"
                onChange={(value) => {
                  setSemester(String(value));
                  updateTitle(
                    subjectName,
                    educationLevel,
                    String(value),
                    academicYear
                  );
                }}
              />
            </div>

            <div className="flex flex-col items-start w-full gap-y-2">
              <Label text="ปีการศึกษา" isRequired={false} />
              <TextField
                bgColor="bg-white"
                placeholder="ปีการศึกษา"
                className="border-border-text-light"
                onChange={(value) => {
                  setAcademicYear(String(value));
                  updateTitle(
                    subjectName,
                    educationLevel,
                    semester,
                    String(value)
                  );
                }}
              />
            </div>
          </div>

          {/* รายละเอียด */}
          <div className="flex flex-col items-start w-full gap-y-2">
            <Label text="รายละเอียด" isRequired={false} />
            <TextArea
              name="description"
              bgColor="bg-white"
              placeholder="รายละเอียด"
              className="border-border-text-light"
              onChange={(value) => {
                handleInputChange(value, "description");
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-x-6">
            <CancelButton
              onClick={onClose}
              className="hover:bg-[#f3f4f6] border-border-text-light py-3"
            >
              ยกเลิก
            </CancelButton>
            <ConfirmButton
              onClick={onSubmit}
              className="text-pure-white px-11"
            >
              สร้าง
            </ConfirmButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};