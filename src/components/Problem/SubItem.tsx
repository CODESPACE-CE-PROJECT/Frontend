import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CodeIcon from "@mui/icons-material/Code";
import { MonacoTextEditor } from "@/components/Monaco/MonacoTextEditor";
import {Constraint} from "@/components/Problem/Constraint";
import { ICreateProblems } from "@/types/problem";
import ToggleButton from "@/components/Button/ToggleButton";
import { CancelButton } from "@/components/Button/CancelButton";
import { Label } from "@/components/Input/Label";
import { TextField } from "@/components/Input/TextField/TextField";
import { Dropdown } from "../Input/Dropdown";
import { LexicalEditor } from "@/components/LexicalEditor/LexicalEditor";
interface Props {
  subItems: string[];
  assignmentId: string;
  problems: ICreateProblems[];
  setProblems: React.Dispatch<React.SetStateAction<ICreateProblems[]>>;
  deleteSubItem: (index: number) => void;
}

const SubItem: React.FC<Props> = ({ subItems, assignmentId, problems, setProblems, deleteSubItem }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [examples, setExamples] = useState<{ id: number; input: string; output: string }[]>([]);

  const toggleForm = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const updateProblem = (index: number, key: keyof ICreateProblems["problem"][0], value: any) => {
    setProblems((prev) => {
      const updated = [...prev];
      if (!updated[index]?.problem[0]) {
        console.error(`Problem at index ${index} is not defined or does not have the correct structure.`);
        return prev;
      }
      updated[index] = {
        ...updated[index],
        problem: updated[index].problem.map((item, idx) =>
          idx === 0 ? { ...item, [key]: value } : item
        ),
      };
      return updated;
    });
  };

  const addExample = () => {
    setExamples((prev) => [
      ...prev,
      { id: prev.length + 1, input: '', output: '' },
    ]);
  };

  useEffect(() => {
    console.log("Updated problems:", problems);
  }, [problems]);

  return (
    <>
      {subItems.map((subItem, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex justify-between items-center border-b border-[#2A3A50] px-5 py-5">
            <div>{subItem}</div>
            <div className="flex flex-row items-center gap-x-4">
              <CancelButton
                className="px-12 border-red-l text-red-l hover:bg-red-600 hover:text-pure-white"
                onClick={() => deleteSubItem(index)}
              >
                <p>ลบ</p>
              </CancelButton>
              <KeyboardArrowDownIcon
                onClick={() => toggleForm(index)}
                className={`cursor-pointer ${expandedIndex === index ? 'rotate-180' : ''} hover:text-primary`}
              />
            </div>
          </div>

          {expandedIndex === index && (
            <>
              <div className="text-white font-sans flex justify-between my-5 gap-x-6">
                <div className="flex flex-col items-start flex-1">
                  <Label text="หัวข้อ" isRequired={true} />
                  <TextField
                    className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md"
                    placeholder="หัวข้อ"
                    value={problems[index]?.problem?.[0]?.title || ''}
                    onChange={(value, _name) => updateProblem(index, "title", value)}
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col gap-y-2">
                    <Label text="ภาษาโปรแกรมมิ่ง" isRequired={true} />
                    <Dropdown 
                      name="language" 
                      options={["PYTHON", "JAVA", "C", "CPP"]} 
                      className="z-50" 
                      value={problems[index]?.problem?.[0]?.language || 'C'}
                      onChange={(value, _name) => updateProblem(index, "language", value)}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <Label text="คะแนน" isRequired={true} />
                    <TextField
                      className="bg-[#2A3A50] mt-2 py-2 px-4 text-white rounded-md w-[160px]"
                      value={problems[index]?.problem?.[0]?.score.toString() || "0"}
                      isNumberic={true}
                      onChange={(value, _name) => updateProblem(index, "score", Number(value))}
                    />
                  </div>
                </div>
              </div>

              <LexicalEditor
                className="h-80 overflow-y-auto rounded-md"
                onChange={() => {}}
              />

              <div className="mb-4 mt-9 flex items-center rounded-lg justify-between">
                <div className="flex flex-row items-center gap-x-2">
                  <CodeIcon />
                  <p className="font-medium">Source Code:</p>
                </div>
              </div>

              <div className="w-full h-[368px]">
                <MonacoTextEditor 
                  language={problems[index]?.problem?.[0]?.language || 'C'} 
                />
              </div>

              <Constraint />

              <div className="my-9 flex items-center rounded-lg justify-between">
                <span className="text-white font-medium text-lg">ตัวอย่าง</span>
                <div className="space-x-3 flex">
                  <button
                    className="border border-[#2A3A50] text-white py-2 px-4 rounded-md min-w-[105px] h-[39px] hover:bg-[#424951]"
                    onClick={addExample}
                  >
                    เพิ่มตัวอย่าง
                  </button>
                  <button className="bg-[#00DACC] text-black py-2 px-4 rounded-md hover:bg-[#a7f8f3] min-w-[105px] h-[39px]">
                    รันทุกตัวอย่าง
                  </button>
                  <button className="bg-[#5572FA] text-white py-2 px-4 rounded-md hover:bg-[#8a9ef7] min-w-[105px] h-[39px]">
                    แก้ไข
                  </button>
                </div>
              </div>

              {examples.map((example) => (
                <div key={example.id}>
                  <div className="flex items-center justify-between bg-[#2A3A50] p-4 shadow-md h-[39px] ">
                    <span className="text-white text-lg font-medium">ตัวอย่าง 1:</span>

                    <div className="flex space-x-6">
                      <div className="flex items-center space-x-3">
                        <ToggleButton
                          initialState={true}
                          onToggle={(newState) => console.log("Toggled:", newState)}
                        />
                        <span className="text-white text-sm">วิเคราะห์ช่องว่าง</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <ToggleButton
                          initialState={true}
                          onToggle={(newState) => console.log("Toggled:", newState)}
                        />
                        <span className="text-white text-sm">แสดงตัวอย่างให้นักเรียน</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full pb-5">
                    <input
                      className="bg-[#16233A] text-white w-1/2 px-4 py-2 outline-none placeholder-gray-400 h-[131px]"
                      placeholder="กรุณาใส่ข้อความ ..."
                    />
                    <div className="w-[1px] bg-gray-600"></div>
                    <input
                      className="bg-[#16233A] text-white w-1/2 px-4 py-2 outline-none placeholder-gray-400 h-[131px]"
                      placeholder="กรุณาใส่ข้อความ ..."
                    />
                  </div>
                </div>
              ))}

            </>

          )}
        </div>
      ))}


    </>
  );
};

export default SubItem;
