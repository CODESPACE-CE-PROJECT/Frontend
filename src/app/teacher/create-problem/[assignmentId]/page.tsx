"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ICreateProblems } from "@/types/problem";
import { createProblem } from "@/actions/problem";
import SubItem from "@/components/Problem/SubItem";
import { LanguageType } from "@/enum/enum";
import { ConstraintType } from "@/enum/enum";

const Page = () => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const { assignmentId } = useParams<{ assignmentId: string }>();

  const [showWarning1, setShowWarning1] = useState(true);
  const [showWarning2, setShowWarning2] = useState(true);
  const [showWarning3, setShowWarning3] = useState(true);
  const [subItems, setSubItems] = useState<string[]>([]);
  const [problems, setProblems] = useState<ICreateProblems[]>([]); 

  
  useEffect(() => {
    console.log("Updated SubItems:", subItems);
  }, [subItems]);


  useEffect(() => {
    console.log("Updated Problems:", problems);
  }, [problems]);

  const deleteSubItem = (index: number) => {
    setSubItems((prevSubItems) => {
      const newSubItems = prevSubItems.filter((_, i) => i !== index);

      
      setProblems((prevProblems) => {
        return prevProblems.slice(0, newSubItems.length); 
      });

      return newSubItems;
    });
  };

  const handleBlur = (
    setter: string,
    warningSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!setter.trim()) {
      warningSetter(true); 
    } else {
      warningSetter(false);
    }
  };

  const addSubItem = () => {
    if (subItems.length < 6) {
      const newSubItems = [...subItems, `ข้อย่อยข้อที่${subItems.length + 1}`];

      
      const newProblem: ICreateProblems = {
        assignmentId: assignmentId || "",
        problem: [
          {
            title: "",
            description: "",
            hint: "",
            language: LanguageType.C,
            revaleCode: "",
            isRegex: false,
            score: 0,
            testcase: [{ input: "", output: "", isHidden: false }],
            constraint: [{ type: ConstraintType.FUNCTION, keyword: "", quantities: 0 }],
          },
        ],
      };

      // อัปเดตสถานะพร้อมกัน
      setSubItems((prevSubItems) => {
        const updatedSubItems = [...prevSubItems, `ข้อย่อยข้อที่${prevSubItems.length + 1}`];
        return updatedSubItems;
      });

      setProblems((prevProblems) => {
        const updatedProblems = [...prevProblems, newProblem];
        return updatedProblems;
      });

     
      console.log("Updated SubItems:", newSubItems);
      console.log("Updated Problems:", newProblem);
    } else {
      if (subItems.length >= 6) {
        alert("ไม่สามารถเพิ่มข้อย่อยได้มากกว่า 6 ข้อ");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Current Problems State Before Submit:", JSON.stringify(problems, null, 2));

      const problemData: ICreateProblems = {
        assignmentId: assignmentId || "",
        problem: problems.map((problem) => ({
          ...problem.problem[0],
          title: value.trim() || problem.problem[0].title,
          score: problem.problem[0].score ?? 0,
          language: problem.problem[0].language ?? LanguageType.C,
        })),
      };

      console.log("Problem data being submitted:", problemData);

      const result = await createProblem(problemData);
      console.log("Result from backend:", result);
      alert("บันทึกข้อมูลสำเร็จ");
    } catch (error) {
      console.error("Error while creating problem:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <>
      <div className="text-white font-sans flex justify-between">
        <div className="flex items-center gap-2">
          ตั้งเวลาประกาศ
          <input
            type="datetime-local"
            className="bg-[#2A3A50] ml-4 py-2 px-3 text-white rounded-md cursor-pointer"
            value={value2}
            onChange={(e) => setValue2(e.target.value)} // Update state properly
          />
        </div>

        <div className="space-x-3">
          <button
            className="border border-[#2A3A50] w-[120px] h-[43px] rounded-[6px] text-center hover:bg-[#424951]"
            onClick={() => alert("ยกเลิก")}
          >
            ยกเลิก
          </button>
          <button
            className="bg-primary w-[120px] h-[43px] rounded-[6px] text-center hover:bg-[#7991f9]"
            onClick={handleSubmit}
          >
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
            required
            onChange={(e) => setValue(e.target.value)} 
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

      <SubItem
        subItems={subItems}
        assignmentId={assignmentId}
        problems={problems}
        setProblems={setProblems}
        deleteSubItem={deleteSubItem}
      />
    </>
  );
};

export default Page;
