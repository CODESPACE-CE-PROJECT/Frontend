"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ICreateProblems } from "@/types/problem";
import { createProblem } from "@/actions/problem";
import SubItem from "@/components/Problem/SubItem";
import { LanguageType } from "@/enum/enum";
import { ConstraintType } from "@/enum/enum";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { TextField } from "@/components/Input/TextField/TextField";
import { Label } from "@/components/Input/Label";
import { Loading } from "@/components/Loading/Loading";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { CancelButton } from "@/components/Button/CancelButton";

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [value2, setValue2] = useState(Date.now().toString());
  const [value3, setValue3] = useState(Date.now().toString());
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [profile, setProfile] = useState<IProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [showWarning1, setShowWarning1] = useState(true);
  const [showWarning2, setShowWarning2] = useState(true);
  const [showWarning3, setShowWarning3] = useState(true);
  const [subItems, setSubItems] = useState<string[]>([]);
  const [problems, setProblems] = useState<ICreateProblems[]>([]);

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
      const newSubItems = [...subItems, `ข้อย่อยข้อที่ ${subItems.length + 1}`];

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
            constraint: [
              { type: ConstraintType.FUNCTION, keyword: "", quantities: 0 },
            ],
          },
        ],
      };

      // อัปเดตสถานะพร้อมกัน
      setSubItems((prevSubItems) => {
        const updatedSubItems = [
          ...prevSubItems,
          `ข้อย่อยข้อที่${prevSubItems.length + 1}`,
        ];
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
      console.log(
        "Current Problems State Before Submit:",
        JSON.stringify(problems, null, 2)
      );

      const problemData: ICreateProblems = {
        assignmentId: assignmentId || "",
        problem: problems.map((problem) => ({
          ...problem.problem[0],
          title: title.trim() || problem.problem[0].title,
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

  useEffect(() => {
    const fetchhData = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);
      setIsLoading(false);
    }
    fetchhData()
  }, [])

  return isLoading ? (
    <div className="flex flex-col items-center justify-center h-full">
      <Loading className="size-20" />
    </div>
  ) : (
    <>
      <TopNav
        gender={profile?.gender}
        imageUrl={profile?.pictureUrl}
        disableNotification={false}
        role={profile?.role}
        className="mb-6"
      >
        <p>แก้ไขการทดสอบ</p>
      </TopNav>
      <div>
        <div className="text-white font-sans flex justify-between">
          <div className="flex items-center gap-x-4">
            <span>ตั้งเวลาประกาศ</span>
            <input
              type="datetime-local"
              className="bg-[#2A3A50] py-2 px-3 text-white rounded-md cursor-pointer"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
          </div>

          <div className="space-x-3">
            <CancelButton className="hover:bg-gray-600">
              <p>ยกเลิก</p>
            </CancelButton>
            <ConfirmButton onClick={handleSubmit} className="px-11">
              <p>บันทึก</p>
            </ConfirmButton>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-10 gap-x-6">
          <div className="flex flex-col items-start flex-1 gap-y-2">
            <Label text="ชื่อแบบฝึกหัด" isRequired={true} />
            <TextField
              value={title}
              placeholder="ชื่อแบบฝึกหัด"
              onChange={(value, _name) => setTitle(value as string)}
            />
          </div>

          <div className="flex flex-row gap-3">
            <div className="flex flex-col items-start">
              <Label text="วันเวลาเริ่มต้น" isRequired={true} />
              <input
                type="datetime-local"
                className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md outline-none"
                value={value2 ?? Date.now().toString()}
                onChange={(e) => setValue2(e.target.value)}
                onBlur={() => handleBlur(value2, setShowWarning2)}
              />
            </div>
            <div className="flex flex-col items-start">
              <Label text="วันเวลาสิ้นสุด" isRequired={true} />
              <input
                type="datetime-local"
                className="bg-[#2A3A50] mt-2 py-2 px-3 text-white rounded-md cursor-pointer outline-none"
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                onBlur={() => handleBlur(value3, setShowWarning3)}
              />
            </div>
          </div>
        </div>

        <div className="justify-between flex flex-row py-5 px-5">
          <div>
            <p>ข้อย่อย</p>
            <div className="flex flex-row gap-x-2 mt-1 text-red-l text-[15px] font-normal">
              <p>**</p>
              <p>ไม่เกิน 6 ข้อ</p>
            </div>
          </div>
          <CancelButton
            className="px-6 py-2 hover:bg-gray-600"
            onClick={addSubItem}
          >
            เพิ่มข้อย่อย
          </CancelButton>
        </div>

        <SubItem
          subItems={subItems}
          assignmentId={assignmentId}
          problems={problems}
          setProblems={setProblems}
          deleteSubItem={deleteSubItem}

        />
      </div>
    </>
  )
};

export default Page;
