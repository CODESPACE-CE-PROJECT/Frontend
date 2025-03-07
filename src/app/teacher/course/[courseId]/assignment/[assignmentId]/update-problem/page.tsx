"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { ICreateProblems, IProblem, IUpdateProblem } from "@/types/problem";
import { createProblem } from "@/actions/problem";
import { ProblemSubItem } from "@/components/Problem/ProblemSubItem";
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
import InputDateTimePicker from "@/components/Input/InputDateTimePicker";
import { IAssignment, IUpdateAssignment } from "@/types/assignment";
import { getAssignmentByCourseId } from "@/actions/assignment";
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  const param = useParams<{ assignmentId: string, courseId: string }>();
  const [updateAssignmentForm, setUpdateAssignmentForm] = useState<IUpdateAssignment>({
    title: "",
    announceDate: new Date(),
    startAt: new Date(),
    expireAt: new Date()
  })
  const [createProblemForm, setCreateProblemForm] = useState<ICreateProblems>({
    assignmentId: param.assignmentId,
    problem: []
  })
  const [deleteProblem, setDeleteProblem] = useState<string[]>()
  const [updateProblemForm, setUpdateProblemForm] = useState<IUpdateProblem[]>([])
  const [profile, setProfile] = useState<IProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const deleteSubItem = useCallback((index: number, type: "create" | "update", problemId: string | undefined) => {
    if (type === 'update' && problemId) {
      setUpdateProblemForm((prev) => {
        return prev.filter((_, i) => i !== index)
      });
      setDeleteProblem((prev) => ([...(prev || []), problemId]))
    } else {
      setCreateProblemForm((prev) => ({
        ...prev,
        problem: prev.problem.filter((_, i) => i !== index),
      }));
    }
  }, []);

  const handleUpdateAssignment = (value: string | number, name: string) => {
    setUpdateAssignmentForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOnChangeProblem = useCallback(
    (value: string | number, name: string, type: "create" | "update", index: number) => {
      if (type === "update") {
        setUpdateProblemForm((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], [name]: value };
          return updated;
        });
      } else if (type === "create") {
        setCreateProblemForm((prev) => ({
          ...prev,
          problem: prev.problem.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
          ),
        }));
      }
    },
    []
  );

  const addSubItem = () => {
    if (updateProblemForm?.length + createProblemForm?.problem.length < 6) {
      const newProblem = {
        title: "",
        description: `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`,
        hint: "",
        language: LanguageType.PYTHON,
        revaleCode: "",
        isRegex: false,
        score: 0,
        testCases: [],
        constraint: [],
      }
      setCreateProblemForm((prev) => ({
        ...prev,
        problem: [...prev.problem, newProblem]
      }))
    }
  };

  const handleSubmit = async () => {
    console.log(updateProblemForm)
    console.log(deleteProblem)
    console.log(createProblemForm)
    console.log(updateAssignmentForm)
  };

  const memoizedProblemSubItem = useMemo(() => {
    return (
      <ProblemSubItem
        updateData={updateProblemForm}
        createData={createProblemForm.problem}
        deleteSubItem={deleteSubItem}
        onChange={handleOnChangeProblem}
      />
    );
  }, [updateProblemForm, createProblemForm.problem, deleteSubItem, handleOnChangeProblem]);

  useEffect(() => {
    const fetchhData = async () => {
      const profile: IProfile = await getProfile();
      const assignments: IAssignment[] = await getAssignmentByCourseId(param.courseId)
      const assignment = assignments.filter(item => item.assignmentId === param.assignmentId)[0]
      setProfile(profile);
      setUpdateAssignmentForm(assignment)
      setUpdateProblemForm(assignment.problem)
      setIsLoading(false);
    }
    fetchhData()
  }, [param])

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
      <div className="h-full">
        <div className="text-white font-sans flex justify-between">
          <div className="flex items-center gap-x-4">
            <span>ตั้งเวลาประกาศ</span>
            <InputDateTimePicker
              value={updateAssignmentForm.announceDate.toString()}
              onChange={handleUpdateAssignment}
              name="announceDate"
            />
          </div>

          <div className="space-x-3">
            <CancelButton className="hover:bg-gray-600" onClick={() => router.back()}>
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
              name="title"
              value={updateAssignmentForm.title}
              placeholder="ชื่อแบบฝึกหัด"
              className="h-full"
              onChange={handleUpdateAssignment}
            />
          </div>

          <div className="flex flex-row gap-3">
            <div className="flex flex-col items-start gap-y-2">
              <Label text="วันเวลาเริ่มต้น" isRequired={true} />
              <InputDateTimePicker
                name="startAt"
                value={updateAssignmentForm.startAt.toString()}
                onChange={handleUpdateAssignment}
              />
            </div>
            <div className="flex flex-col items-start gap-y-2">
              <Label text="วันเวลาสิ้นสุด" isRequired={true} />
              <InputDateTimePicker
                name="expireAt"
                value={updateAssignmentForm.expireAt.toString()}
                onChange={handleUpdateAssignment}
              />
            </div>
          </div>
        </div>

        <div className="justify-between flex flex-row py-5 px-5 mt-9">
          <div className="flex flex-col">
            <p className="text-xl font-medium">ข้อย่อย</p>
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

        {memoizedProblemSubItem}
      </div>
    </>
  )
};

export default Page;
