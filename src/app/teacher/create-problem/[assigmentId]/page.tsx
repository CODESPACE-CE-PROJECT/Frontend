"use client";
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CodeIcon from '@mui/icons-material/Code';
import { MonacoTextEditor } from '@/components/Monaco/MonacoTextEditor';
import ToggleButton from '@/components/Button/ToggleButton';
const Home = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  const [showWarning1, setShowWarning1] = useState(true);
  const [showWarning2, setShowWarning2] = useState(true);
  const [showWarning3, setShowWarning3] = useState(true);


  const [subItems, setSubItems] = useState<string[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // สถานะที่เก็บ index ของข้อย่อยที่เปิดแสดงฟอร์ม
  const [toggleState, setToggleState] = useState(false);
  const [examples, setExamples] = useState<any[]>([]); // New state to toggle the example section
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});


  const addSubItem = () => {
    if (subItems.length < 6) {
      setSubItems((prevSubItems) => [...prevSubItems, `ข้อย่อยข้อที่${prevSubItems.length + 1}`]);
    } else {
      alert("ไม่สามารถเพิ่มข้อย่อยได้มากกว่า 6 ข้อ");
    }
  };


  const deleteSubItem = (index: number) => {
    setSubItems((prevSubItems) => prevSubItems.filter((_, i) => i !== index));
  };


  const handleBlur = (setter: string, warningSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!setter) {
      warningSetter(true);
    } else {
      warningSetter(false);
    }
  };

  const toggleForm = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index)); // สลับการแสดงผล
  };

  const addExample = () => {
    setExamples((prevExamples) => [
      ...prevExamples,
      {
        id: prevExamples.length + 1,
        title: `ตัวอย่าง ${prevExamples.length + 1}`,
      },
    ]);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <div className="text-white font-sans flex justify-between">
        <div className="flex items-center gap-2">
          ตั้งเวลาประกาศ
          <input
            type="datetime-local"
            className="bg-[#2A3A50] ml-4 py-2 px-3 text-white rounded-md cursor-pointer"
          />
        </div>

        <div className="space-x-3">
          <button className="border border-[#2A3A50] w-[120px] h-[43px] rounded-[6px] text-center hover:bg-[#424951]">
            ยกเลิก
          </button>
          <button className="bg-primary w-[120px] h-[43px] rounded-[6px] text-center hover:bg-[#7991f9]">
            บันทึก
          </button>
        </div>
      </div>

      <div className="text-white font-sans flex justify-between mt-10 space-x-6">
        <div className="flex flex-col flex-1">
          <span>ชื่อแบบฝึกหัด {showWarning1 && <span className="text-red-500">*</span>}</span>
          <input
            className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md cursor-pointer"
            value={value}
            placeholder="ชื่อแบบฝึกหัด"
            onChange={(e) => setValue(e.target.value)}
            required
            onBlur={() => handleBlur(value, setShowWarning1)}
          />
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col">
            <span>วันเวลาเริ่มต้น {showWarning2 && <span className="text-red-500">*</span>}</span>
            <input
              type="datetime-local"
              className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md outline-none"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              required
              onBlur={() => handleBlur(value2, setShowWarning2)}
            />
          </div>
          <div className="flex flex-col">
            <span>วันเวลาสิ้นสุด {showWarning3 && <span className="text-red-500">*</span>}</span>
            <input
              type="datetime-local"
              className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md cursor-pointer outline-none"
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
              required
              onBlur={() => handleBlur(value3, setShowWarning3)}
            />
          </div>
        </div>
      </div>

      <div className="justify-between flex flex-row py-5 px-5">
        <div>
          <div>ข้อย่อย</div>
          <div className="mt-1">** ไม่เกิน 6 ข้อ</div>
        </div>
        <div>
          <button
            className="mt-2 border border-[#2A3A50] py-3 w-[7.5rem] rounded-md hover:bg-[#424951]"
            onClick={addSubItem}
          >
            เพิ่มข้อย่อย
          </button>
        </div>
      </div>


      {subItems.map((subItem, index) => (
        <div key={index} className="flex flex-col    ">
          <div className="flex justify-between items-center  border-b border-[#2A3A50] px-5 py-5">
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
                className={`cursor-pointer ${expandedIndex === index ? 'rotate-180' : ''}`} // เพิ่มคลาสสำหรับหมุนไอคอนเมื่อเปิดฟอร์ม
              />
            </div>
          </div>


          {expandedIndex === index && (
            <>
              <div className="text-white font-sans flex justify-between mt-5 space-x-6 ">
                <div className="flex flex-col flex-1 ">
                  <span>หัวข้อ {<span className="text-red-500">*</span>}</span>
                  <input
                    className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md cursor-pointer"
                    placeholder="หัวข้อ"

                  />
                </div>

                <div className="flex flex-row gap-3">
                  <div className="flex flex-col ">
                    <span>ภาษาโปรแกรม {<span className="text-red-500">*</span>}</span>
                    <select
                      className="px-4 w-[160px] rounded-md bg-[#2A3A50] text-white my-2 border border-[#2A3A50]"

                    >
                      <option value="PYTHON">Python</option>
                      <option value="JAVA">Java</option>
                      <option value="C">C</option>
                      <option value="CPP">C++</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <span>คะแนน {<span className="text-red-500">*</span>}</span>
                    <input
                      className="bg-[#2A3A50] mt-2 py-2 px-4 text-white rounded-md cursor-pointer  my-2 w-[160px]"
                      required
                    />
                  </div>

                </div>
              </div>
              <div className="bg-[#16233A] my-3 w-full h-[368px]">text</div>
              <div className="my-3 flex items-center  rounded-lg justify-between">
                <div className=" space-x-2">
                  <CodeIcon className="" />
                  <span className="text-white font-medium">Source Code:</span>
                </div>
                <button className="border border-[#2A3A50] text-white py-3 w-[131px] h-[54px] rounded-md hover:bg-[#424951]">
                  วิเคราะห์ Code
                </button>
              </div>
              <div className="bg-[#16233A]  w-full h-[368px]"><MonacoTextEditor /></div>

              <div className="flex w-full py-9 gap-8">
                <div className="w-1/2  p-6 rounded-lg shadow-lg">
                  <h3 className="text-white font-medium text-lg  pb-2 mb-4">
                    ข้อจำกัดของคีย์เวิร์ดวิเคราะห์ได้จากโค้ดเฉลย
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-[#3049724D] h-[54px] flex items-center  rounded-md text-white font-medium shadow px-4 justify-between">
                      Function (3)
                      <KeyboardArrowDownIcon
                        className={`cursor-pointer transform transition-transform ${expandedSections["function"] ? "rotate-180" : ""
                          }`}
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
                    <div className="bg-[#3049724D] h-[54px] flex items-center  rounded-md text-white font-medium shadow  px-4 justify-between">
                      Methods (0)
                      <KeyboardArrowDownIcon />
                    </div>
                    <div className="bg-[#3049724D] h-[54px] flex items-center  rounded-md text-white font-medium shadow  px-4 justify-between">
                      Classes (0)
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                </div>

                <div className="w-1/2  p-6 rounded-lg shadow-lg">
                  <h3 className="text-white font-medium text-lg pb-2 mb-4">
                    ข้อจำกัดของคีย์เวิร์ดที่กำหนด
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-[#3049724D] h-[54px] flex items-center  rounded-md text-white font-medium shadow px-4 justify-between">
                      Function (3)
                      <KeyboardArrowDownIcon />
                    </div>
                    <div className="bg-[#3049724D] h-[54px] flex items-center  rounded-md text-white font-medium shadow px-4 justify-between">
                      Methods (0)
                      <KeyboardArrowDownIcon />
                    </div>
                    <div className="bg-[#3049724D] h-[54px] flex items-center  rounded-md text-white font-medium shadow px-4 justify-between">
                      Classes (0)
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                </div>
              </div>


              <div className="my-9 flex items-center rounded-lg justify-between ">
                <span className="text-white font-medium text-lg">ตัวอย่าง</span>
                <div className="space-x-3 flex">
                  <button className="border border-[#2A3A50] text-white py-2 px-4 rounded-md min-w-[105px] h-[39px] hover:bg-[#424951]" onClick={addExample}>
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
                    <span className="text-white text-lg font-medium">{example.title}:</span>

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

export default Home;
