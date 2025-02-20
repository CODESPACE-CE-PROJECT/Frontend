import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CodeIcon from "@mui/icons-material/Code";
import { MonacoTextEditor } from "@/components/Monaco/MonacoTextEditor";
import Constraint from "@/components/Problem/Constraint";
import { ICreateProblems } from "@/types/problem";
import ToggleButton from "@/components/Button/ToggleButton";

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
            <div className="flex items-center">
              <button
                className="border border-[#EF4343] text-[#EF4343] py-3 w-[7.5rem] rounded-md mr-4 hover:bg-[#f15252] hover:text-white"
                onClick={() => deleteSubItem(index)}
              >
                ลบ
              </button>
              <KeyboardArrowDownIcon
                onClick={() => toggleForm(index)}
                className={`cursor-pointer ${expandedIndex === index ? 'rotate-180' : ''}`}
              />
            </div>
          </div>

          {expandedIndex === index && (
            <>
              <div className="text-white font-sans flex justify-between mt-5 space-x-6">
                <div className="flex flex-col flex-1">
                  <span>หัวข้อ <span className="text-red-500">*</span></span>
                  <input
                    className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md"
                    placeholder="หัวข้อ"
                    value={problems[index]?.problem?.[0]?.title || ''}
                    onChange={(e) => updateProblem(index, "title", e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col">
                    <span>ภาษาโปรแกรม <span className="text-red-500">*</span></span>
                    <select
                      className="px-4 w-[160px] rounded-md bg-[#2A3A50] text-white my-2"
                      value={problems[index]?.problem?.[0]?.language || 'C'}
                      onChange={(e) => updateProblem(index, "language", e.target.value)}
                    >
                      <option value="PYTHON">Python</option>
                      <option value="JAVA">Java</option>
                      <option value="C">C</option>
                      <option value="CPP">C++</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <span>คะแนน <span className="text-red-500">*</span></span>
                    <input
                      className="bg-[#2A3A50] mt-2 py-2 px-4 text-white rounded-md w-[160px]"
                      value={problems[index]?.problem?.[0]?.score || 0}
                      onChange={(e) => updateProblem(index, "score", Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <textarea
                className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md"
                placeholder="คำอธิบาย"
                value={problems[index]?.problem?.[0]?.description || ''}
                onChange={(e) => updateProblem(index, "description", e.target.value)}
              />

              <div className="my-3 flex items-center rounded-lg justify-between">
                <div className="space-x-2">
                  <CodeIcon />
                  <span className="text-white font-medium">Source Code:</span>
                </div>
                <button className="border border-[#2A3A50] text-white py-3 w-[131px] h-[54px] rounded-md hover:bg-[#424951]">
                  วิเคราะห์ Code
                </button>
              </div>
              <div className="bg-[#16233A] w-full h-[368px]"><MonacoTextEditor /></div>

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
