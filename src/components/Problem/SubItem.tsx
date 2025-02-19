import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import { MonacoTextEditor } from '@/components/Monaco/MonacoTextEditor';
import { ICreateProblems } from "@/types/problem";

interface Props {
  subItems: string[];
  deleteSubItem: (index: number) => void;
 
}

const SubItem: React.FC<Props> = ({ subItems, deleteSubItem }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [examples, setExamples] = useState<{ id: number; input: string; output: string }[]>([]);

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [score, setScore] = useState("");
  const [input, Setinput] = useState("");
  const [output, Setoutput] = useState("");
  const [description, Setdescription] = useState("");


  const toggleForm = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const addExample = () => {
    setExamples((prev) => [
      ...prev,
      { id: prev.length + 1, input: '', output: '' },
    ]);
  };

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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col">
                    <span>ภาษาโปรแกรม <span className="text-red-500">*</span></span>
                    <select
                      className="px-4 w-[160px] rounded-md bg-[#2A3A50] text-white my-2"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
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
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <input
                type="text"
                className="bg-[#16233A] my-3 w-full h-[368px] text-white p-3"
                placeholder="กรอกข้อความ"
                value={description}
                onChange={(e) => Setdescription(e.target.value)}
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

              {/* Section for keyword analysis */}
              <div className="flex w-full py-9 gap-8">
                <div className="w-1/2 p-6 rounded-lg shadow-lg">
                  <p className="text-white font-medium text-lg pb-2 mb-4 flex items-center gap-2">
                    <LightbulbIcon className="w-6 h-6" />
                    ข้อจำกัดของคีย์เวิร์ดวิเคราะห์ได้จากโค้ดเฉลย
                  </p>
                  <div className="space-y-3">
                    <div className="bg-[#3049724D] h-[54px] flex items-center rounded-md text-white font-medium shadow px-4 justify-between">
                      Function (3)
                      <KeyboardArrowDownIcon
                        className={`cursor-pointer transform transition-transform ${expandedSections["function"] ? "rotate-180" : ""}`}
                        onClick={() => toggleSection("function")}
                      />
                    </div>
                    {expandedSections["function"] && (
                      <div className="flex flex-col space-y-2 mt-2">
                        <div className="flex">
                          <div className="bg-[#3049724D] h-[39px] flex items-center px-4 w-[240px] rounded-md">
                            cout
                          </div>
                          <div className="bg-[#3049724D] h-[39px] flex items-center px-4 py-2 w-[80px] ml-3 rounded-md justify-center">
                            3
                          </div>
                        </div>
                        <div className="flex">
                          <div className="bg-[#3049724D] h-[39px] flex items-center px-4 w-[240px] rounded-md">
                            cin
                          </div>
                          <div className="bg-[#3049724D] h-[39px] flex items-center px-4 py-2 w-[80px] ml-3 rounded-md justify-center">
                            1
                          </div>
                        </div>
                        <div className="flex">
                          <div className="bg-[#3049724D] h-[39px] flex items-center px-4 w-[240px] rounded-md">
                            if
                          </div>
                          <div className="bg-[#3049724D] h-[39px] flex items-center px-4 py-2 w-[80px] ml-3 rounded-md justify-center">
                            1
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="bg-[#3049724D] h-[54px] flex items-center rounded-md text-white font-medium shadow  px-4 justify-between">
                      Methods (0)
                      <KeyboardArrowDownIcon />
                    </div>
                    <div className="bg-[#3049724D] h-[54px] flex items-center rounded-md text-white font-medium shadow  px-4 justify-between">
                      Classes (0)
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                </div>

                <div className="w-1/2 p-6 rounded-lg shadow-lg">
                  <p className="text-white font-medium text-lg pb-2 mb-4 flex items-center gap-2">
                    <DescriptionIcon className="w-6 h-6" />
                    ข้อจำกัดของคีย์เวิร์ดที่กำหนด
                  </p>
                  <div className="space-y-3">
                    <div className="bg-[#3049724D] h-[54px] flex items-center rounded-md text-white font-medium shadow px-4 justify-between">
                      Function (3)
                      <KeyboardArrowDownIcon />
                    </div>
                    <div className="bg-[#3049724D] h-[54px] flex items-center rounded-md text-white font-medium shadow px-4 justify-between">
                      Methods (0)
                      <KeyboardArrowDownIcon />
                    </div>
                    <div className="bg-[#3049724D] h-[54px] flex items-center rounded-md text-white font-medium shadow px-4 justify-between">
                      Classes (0)
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/* Example management */}
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

              {/* Display examples */}
              {examples.map((example) => (
                <div key={example.id} className="flex w-full pb-5">
                  <input
                    className="bg-[#16233A] text-white w-1/2 px-4 py-2 outline-none placeholder-gray-400 h-[131px]"
                    placeholder="กรุณาใส่ข้อความ ..."
                    value={example.input}
                    onChange={(e) => Setinput(e.target.value)}
                  />
                  <div className="w-[1px] bg-gray-600"></div>
                  <input
                    className="bg-[#16233A] text-white w-1/2 px-4 py-2 outline-none placeholder-gray-400 h-[131px]"
                    placeholder="กรุณาใส่ข้อความ ..."
                    value={example.output}
                    onChange={(e) => Setoutput(e.target.value)}
                  />
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
