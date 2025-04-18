"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAssignmentByCourseId } from "@/actions/assignment";
import {
  IAssignment,
  ICreateAssignment,
  IUpdateLock,
} from "@/types/assignment";
import AssignmentTableTeacher from "@/components/Table/AssignmentTableTeacher";
import NavigationTab from "@/components/Tab/NavigationTab";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import { CreateAssignmentModal } from "@/components/Modals/CreateAssignmentModal";
import { createAssignment, deleteAssignmentById } from "@/actions/assignment";
import { AssignmentType } from "@/enum/enum";
import { updatedLockAssignment } from "@/actions/assignment";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";

export default function Assignment() {
  const param = useParams<{ courseId: string }>();

  const [assignments, setAssignments] = useState<IAssignment[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<IProfile>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createData, setCreateData] = useState<ICreateAssignment>({
    title: "",
    type: AssignmentType.EXAMONLINE,
    announceDate: new Date(),
    startAt: new Date(),
    expireAt: new Date(new Date().setDate(new Date().getDate() + 1)),
    courseId: param.courseId,
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);
      const data: IAssignment[] = await getAssignmentByCourseId(param.courseId);
      const filteredAssignments = data.filter((item) => item.type !== AssignmentType.EXERCISE);
      setAssignments(filteredAssignments)
      setLoading(false);
    };
    fetchAssignments();
  }, [param.courseId]);

  const handleInputChange = (value: string | number, name: string) => {
    setCreateData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    const id = notify(NotifyType.LOADING, "กำลังสร้างการทดสอบ");
    const { status } = await createAssignment(createData);
    if (id) {
      if (status === 201) {
        const data: IAssignment[] = await getAssignmentByCourseId(param.courseId);
        const filteredAssignments = data.filter((item) => item.type !== AssignmentType.EXERCISE);
        setAssignments(filteredAssignments)
        updateNotify(id, NotifyType.SUCCESS, "สร้างการทดสอบสำเร็จ");
        setIsModalOpen(false);
      } else {
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดพลาดในการสร้างการทดสอบ");
      }
    }
  };

  const handleToggle = async (updateForm: IUpdateLock) => {
    const id = notify(NotifyType.LOADING, "กำลังแก้ไขการทดสอบ")
    const { status } = await updatedLockAssignment(updateForm);
    if (id) {
      if (status === 200) {
        const data: IAssignment[] = await getAssignmentByCourseId(param.courseId);
        const filteredAssignments = data.filter((item) => item.type !== AssignmentType.EXERCISE);
        setAssignments(filteredAssignments)
        updateNotify(id, NotifyType.SUCCESS, "แก้ไขการทดสอบสำเร็จ")
      } else {
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการแก้ไขการทดสอบ")
      }
    }
  };

  const handleDelete = async (assignmentId: string) => {
    const id = notify(NotifyType.LOADING, "กำลังลบการทดสอบ");
    const { status } = await deleteAssignmentById(assignmentId);
    if (id) {
      if (status === 200) {
        const data: IAssignment[] = await getAssignmentByCourseId(param.courseId);
        const filteredAssignments = data.filter((item) => item.type !== AssignmentType.EXERCISE);
        setAssignments(filteredAssignments)
        updateNotify(id, NotifyType.SUCCESS, "ลบการทดสอบสำเร็จ");
      } else {
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผลาดในการลบการทดสอบ");
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Loading className="size-20" />
        </div>
      ) : (
        <>
          <TopNav
            className="mb-6"
            disableNotification={false}
            imageUrl={profile?.pictureUrl}
            gender={profile?.gender}
            role={profile?.role}
          >
            <p>แบบฝึกหัด</p>
          </TopNav>

          <div className="flex justify-between items-center">
            <NavigationTab
              courseId={param.courseId}
              basePath={`/teacher/course/${param.courseId}/assignment`}
            />
            <ConfirmButton
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5572FA] text-white px-4 py-3 rounded-[6px] text-center h-14 text-nowrap"
            >
              สร้างแบบฝึกหัด/การทดสอบ
            </ConfirmButton>
          </div>

          <div className="mt-4">
            {assignments && (
              <AssignmentTableTeacher
                data={assignments}
                onToggle={handleToggle}
                handleDelete={handleDelete}
                titleTable="การทดสอบ"
              />
            )}
          </div>

          <CreateAssignmentModal
            data={createData}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            handleInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
}
