"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { IConstraint, ICreateProblems, ITestCase, IUpdateProblem } from "@/types/problem";
import { createProblem, deleteProblemById, updateProblemById } from "@/actions/problem";
import { ProblemSubItem } from "@/components/Problem/ProblemSubItem";
import { LanguageType, NotifyType } from "@/enum/enum";
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
import { getAssignmentByCourseId, updateAssignmentById } from "@/actions/assignment";
import { useRouter } from "next/navigation"
import { notify, updateNotify } from "@/utils/toast.util";

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
  const [isUpdateAssignment, setIsUpdateAssignment] = useState<boolean>(false)
  const [isUpdateProblem, setIsUpdateProblem] = useState<boolean>(false)

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
    setIsUpdateAssignment(true)
  }

  const handleOnChangeProblem = useCallback(
    (value: string | number | boolean, name: string, type: "create" | "update", index: number) => {
      if (type === "update") {
        setUpdateProblemForm((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], [name]: value };
          return updated;
        });
        setIsUpdateProblem(true)
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

  const handleConstraintChange = (item: IConstraint[], type: "create" | "update", index: number) => {
    if(type === "update"){
      setUpdateProblemForm((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], "constraint": item };
        return updated;
      });
    }else if(type === "create"){
       setCreateProblemForm((prev) => ({
          ...prev,
          problem: prev.problem.map((value, i) =>
            i === index ? { ...value, "constraint": item } : value
          ),
       }));
    }
  }

  const handleTestCaseChange = (item: ITestCase[], type: "create" | "update", index: number) => {
    if(type === "update"){
      console.log(item)
      setUpdateProblemForm((prev) => {
        const updated = [...prev]
        updated[index] = { ...updated[index], "testCases": item}
        return updated
      })
    } else if (type === "create") {
      setCreateProblemForm((prev) => ({
        ...prev,
        problem: prev.problem.map((value, i) =>
          i === index ? { ...value, "testCases": item } : value
        ),
     }));
    }
  }

  const handleSubmit = async () => {
      if(isUpdateAssignment){
        const id = notify(NotifyType.LOADING, "กำลังแก้ไขข้อมูลแบบฝึกหัด")
        const {status} = await updateAssignmentById(param.assignmentId, updateAssignmentForm)
        if(id){
          if(status === 200) {
            updateNotify(id, NotifyType.SUCCESS, "แก้ไขข้อมูลแบบฝึกหัดเสร็จสิ้น")
          }else{
            updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการแก้ไขข้อมูลแบบฝึกหัด")
          }
        }
      }
      if(isUpdateProblem && updateProblemForm.length > 0) {
        const id = notify(NotifyType.LOADING, "กำลังแก้ไขข้อมูลข้อย่อย")
        const updatePromises = updateProblemForm.map(item => {
          if(item.problemId){
            const updateProblem: IUpdateProblem = {
              title: item.title,
              hint: item.hint,
              description: item.description,
              isRegex: item.isRegex,
              language: item.language,
              revaleCode: item.revaleCode,
              score: item.score,
              testCases: item.testCases.map((testcase) => {
                return {
                  input: testcase.input,
                  output: testcase.output,
                  isHidden: testcase.isHidden
                }
              }),
              constraint: item.constraint.map((constraint) => {
                return {
                    type: constraint.type,
                    keyword: constraint.keyword,
                    quantities: 0
                }
              })
            }
            return updateProblemById(item.problemId, updateProblem)
          }
          return
        }
        );
        if(id){
          Promise.all(updatePromises).then((result) => {
            const allUpdatedProblem = result.every(res => res && res.status === 200);
            updateNotify(id, allUpdatedProblem ? NotifyType.SUCCESS : NotifyType.ERROR,
              allUpdatedProblem ? "แก้ไขข้อย่อยเสร็จสิ้น" : "เกิดข้อผิดพลาดในการแก้ไขข้อย่อย"
            );
          })
        }
      }
      if(createProblemForm.problem.length > 0) {
        const id = notify(NotifyType.LOADING, "กำลังสร้างข้อย่อย")
        const {status} = await createProblem(createProblemForm)
        if(id){
          if(status === 201){
            updateNotify(id, NotifyType.SUCCESS, 'สร้างข้อย่อยสำเร็จ')
          }else{
            updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลากในการสร้างข้อย่อย")
          }
        }
      }
      if(deleteProblem && deleteProblem?.length > 0){
        const id = notify(NotifyType.LOADING, "กำลังลบข้อย่อย")
        const deletePromise = deleteProblem.map((item) => {
          return deleteProblemById(item)
        })
        if(id){
          Promise.all(deletePromise).then((result) => {
            const allDeleteProblem = result.every(res => res && res.status === 200);
            updateNotify(id, allDeleteProblem ? NotifyType.SUCCESS : NotifyType.ERROR,
              allDeleteProblem ? "ลบข้อย่อยเสร็จสิ้น" : "เกิดข้อผิดพลาดในการลบข้อย่อย"
            );
          })
        }
      }
      router.back()
  };

  const memoizedProblemSubItem = useMemo(() => {
    return (
      <ProblemSubItem
        updateData={updateProblemForm}
        createData={createProblemForm.problem}
        deleteSubItem={deleteSubItem}
        onChange={handleOnChangeProblem}
        onConstraintChange={handleConstraintChange}
        onTestCaseChange={handleTestCaseChange}
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
            <ConfirmButton onClick={handleSubmit} className="px-11" disabled={!isUpdateAssignment && !isUpdateProblem && !deleteProblem && createProblemForm.problem.length === 0}>
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
